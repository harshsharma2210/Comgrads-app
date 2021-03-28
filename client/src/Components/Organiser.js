import React, { useState } from "react";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import LaptopOutlined from "@material-ui/icons/LaptopOutlined";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import { useHistory } from "react-router";
import { useStateValue } from "../StateProvider";
import axios from "../axios";
import { Input } from "@material-ui/core";
import FormData from "form-data";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormHelperText from "@material-ui/core/FormHelperText";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
}));
function Organiser() {
  const [{ user }, dispatch] = useStateValue();
  const [image, setImage] = useState(null);
  const history = useHistory();
  if (!user) {
    history.push("/");
  }
  const [courses, setCourses] = React.useState("");
  const classes = useStyles();
  const [formData, setFormData] = useState({
    name: "",
    imgUrl: "",
    level: "",
    price: "",
    description: "",
    duration: "",
    category: "",
    url: "",
  });
  const handleChange = (e) => {
    if (e.target.files[0]) {
      setImage(e.target.files[0]);
    }
  };
  const clear = () => {
    setFormData({
      name: "",
      imgUrl: "",
      level: "",
      price: "",
      description: "",
      duration: "",
      category: "",
      certification: "",
      language: "",
      url: "",
    });
    setImage(null);
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData();
    data.append("file", image);
    data.append("upload_preset", "comgrads");
    data.append("cloud_name", "dggwrslgs");
    axios
      .post("https://api.cloudinary.com/v1_1/dggwrslgs/image/upload", data)
      .then((data) => {
        axios.post(`/tinder/cards`, {
          user: user.displayName,
          email: user.email,
          imgUrl: data.data.url,
          name: formData.name,
          level: formData.level,
          price: formData.price,
          description: formData.description,
          duration: formData.duration,
          category: courses,
          certification: formData.certification,
          language: formData.language,
          url: formData.url,
        });
      })
      .then(() => {
        clear();
        history.push("/choice");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LaptopOutlined />
        </Avatar>
        <Typography component="h1" variant="h5">
          Please enter details of Course
        </Typography>
        <form className={classes.form} noValidate onSubmit={handleSubmit}>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="title"
            label="Title"
            name="title"
            autoComplete="title"
            autoFocus
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="price"
            label="Price"
            id="price"
            autoComplete="price"
            onChange={(e) =>
              setFormData({ ...formData, price: e.target.value })
            }
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="duration"
            label="Duration"
            id="duration"
            autoComplete="duration"
            onChange={(e) =>
              setFormData({ ...formData, duration: e.target.value })
            }
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="level"
            label="Level"
            id="level"
            autoComplete="level"
            onChange={(e) =>
              setFormData({ ...formData, level: e.target.value })
            }
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="certification"
            label="Certification"
            id="certification"
            autoComplete="certification"
            onChange={(e) =>
              setFormData({ ...formData, certification: e.target.value })
            }
          />
          {/* <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="category"
            label="Category"
            id="category"
            autoComplete="category"
            onChange={(e) =>
              setFormData({ ...formData, category: e.target.value })
            }
          /> */}
          <FormControl className={classes.formControl}>
            <InputLabel id="demo-simple-select-label">Courses</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={courses}
              onChange={(e) => setCourses(e.target.value)}
            >
              <MenuItem value="Python">Python</MenuItem>
              <MenuItem value="C++">C++</MenuItem>
              <MenuItem value="Java">Java</MenuItem>
              <MenuItem value="Web Development">Web Development</MenuItem>
              <MenuItem value="App Development">App Development</MenuItem>
              <MenuItem value="Game Development">Game Development</MenuItem>
              <MenuItem value="Graphic Designing">Graphic Designing</MenuItem>
              <MenuItem value="Data Structures and Algorithm">
                Data Structures and Algorithm
              </MenuItem>
              <MenuItem value="Painting">Painting</MenuItem>
              <MenuItem value="Singing">Singing</MenuItem>
              <MenuItem value="Music">Music Theory</MenuItem>
              <MenuItem value="Literay">Literay</MenuItem>
              <MenuItem value="Photography">Photography</MenuItem>
            </Select>
          </FormControl>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="language"
            label="Language"
            id="language"
            autoComplete="language"
            onChange={(e) =>
              setFormData({ ...formData, language: e.target.value })
            }
          />
          <TextField
            multiline
            rows={4}
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="description"
            label="Description"
            id="description"
            autoComplete="description"
            onChange={(e) =>
              setFormData({ ...formData, description: e.target.value })
            }
          />
          <TextField
            multiline
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="url"
            label="Course Url"
            id="url"
            autoComplete="url"
            onChange={(e) => setFormData({ ...formData, url: e.target.value })}
          />
          <Input
            type="file"
            className="messageSender__fileSelector"
            onChange={handleChange}
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            Submit
          </Button>
        </form>
      </div>
    </Container>
  );
}
export default Organiser;
