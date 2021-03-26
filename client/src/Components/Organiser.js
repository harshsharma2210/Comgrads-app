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
}));
function Organiser() {
  const [{ user }, dispatch] = useStateValue();
  const history = useHistory();
  if (!user) {
    history.push("/");
  }
  const classes = useStyles();
  const [formData, setFormData] = useState({
    name: "",
    imgUrl: "",
    level: "",
    price: "",
    description: "",
    duration: "",
    category: "",
  });
  const handleChange = (e) => {
    if (e.target.files[0]) {
      setFormData({ ...formData, imgUrl: e.target.files[0] });
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
    });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    // const data = new FormData();
    // data.append("file", image);
    // data.append("upload_preset", "facebook-clone");
    // data.append("cloud_name", "dggwrslgs");
    axios
      .post("https://api.cloudinary.com/v1_1/dggwrslgs/image/upload", formData)
      .then((data) => {
        axios.post(`/upload/post`, {
          user: user.displayName,
          email: user.email,
          imgName: formData.imgUrl,
          name: formData.title,
          level: formData.level,
          price: formData.price,
          description: formData.description,
          duration: formData.duration,
          category: formData.category,
        });
      })
      .catch((err) => {
        console.log(err);
      });
    clear();
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
            onChange={(e) =>
              setFormData({ ...formData, title: e.target.value })
            }
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
              setFormData({ ...formData, title: e.target.value })
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
              setFormData({ ...formData, title: e.target.value })
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
              setFormData({ ...formData, title: e.target.value })
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
              setFormData({ ...formData, title: e.target.value })
            }
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
