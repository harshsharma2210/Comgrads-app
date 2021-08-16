import React, { useEffect, useState } from "react";
import "./TinderCards.css";
import TinderCard from "react-tinder-card";
import axios from "../axios";
import ModalBox from "./Modal";
import CloseIcon from "@material-ui/icons/Close";
import StarIcon from "@material-ui/icons/Star";
import FavoriteIcon from "@material-ui/icons/Favorite";
import IconButton from "@material-ui/core/IconButton";
import { makeStyles } from "@material-ui/core/styles";
import { FormControl, InputLabel, MenuItem, Select } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
}));

function TinderCards() {
  const [people, setPeople] = useState([]);
  const [filteredPeople, setFilteredPeople] = useState([]);
  const [courses, setCourses] = useState("");
  const classes = useStyles();

  useEffect(() => {
    async function fetchData() {
      const req = await axios.get("/tinder/cards");
      setPeople(req.data);
      setFilteredPeople(req.data);
    }
    fetchData();
  }, []);
  useEffect(() => {
    setFilteredPeople([]);
    if (courses === "All") {
      setFilteredPeople(people);
    } else {
      for (let i = 0; i < people.length; i++) {
        if (people[i].category === courses) {
          setFilteredPeople((oldArray) => [...oldArray, people[i]]);
        }
      }
    }
  }, [courses]);
  console.log(filteredPeople);
  console.log(people);

  const swiped = (direction, nameToDelete, url) => {
    console.log(`${direction}` + nameToDelete);
    if (direction === "right") {
      window.open(url);
    }
  };

  const outOfFrame = (name) => {
    console.log(name + " left the screen");
  };

  return (
    <>
      <FormControl
        className={classes.formControl}
        
        style={{ display: "flex", justifyContent: "center" }}
      >
        <InputLabel id="demo-simple-select-label">Courses</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={courses}
          onChange={(e) => setCourses(e.target.value)}
        >
          <MenuItem value="All">All</MenuItem>
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
          <MenuItem value="Literary">Literary</MenuItem>
          <MenuItem value="Photography">Photography</MenuItem>
        </Select>
      </FormControl>
      <div className="tinderCards">
        <div className="tinderCards__cardContainer">
          {filteredPeople.map((person) => (
            <>
              <TinderCard
                className="swipe"
                preventSwipe={["up", "down"]}
                onSwipe={(dir) => swiped(dir, person.name, person.url)}
                onCardLeftScreen={() => outOfFrame(person.name)}
                key={person._id}
              >
                <div>
                  <ModalBox person={person} />
                </div>
                <div
                  style={{ backgroundImage: `url(${person?.imgUrl})` }}
                  className="card"
                >
                  <h3>{person?.name}</h3>
                </div>
                <div>
                  <IconButton
                    className="swipeButtons__right"
                    onClick={() => swiped("right", person.name, person.url)}
                    onCardLeftScreen={() => outOfFrame(person.name)}
                  >
                    <FavoriteIcon fontSize="large" />
                  </IconButton>
                </div>
              </TinderCard>
            </>
          ))}
        </div>
      </div>
    </>
  );
}

export default TinderCards;
