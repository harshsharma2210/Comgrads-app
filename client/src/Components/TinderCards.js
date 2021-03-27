import React, { useEffect, useState } from "react";
import "./TinderCards.css";
import TinderCard from "react-tinder-card";
import axios from "../axios";
import ModalBox from "./Modal";
import CloseIcon from "@material-ui/icons/Close";
import StarIcon from "@material-ui/icons/Star";
import FavoriteIcon from "@material-ui/icons/Favorite";
import IconButton from "@material-ui/core/IconButton";

function TinderCards() {
  const [people, setPeople] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const req = await axios.get("/tinder/cards");
      setPeople(req.data);
    }
    fetchData();
  }, []);
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
    <div className="tinderCards">
      <div className="tinderCards__cardContainer">
        {people.map((person) => (
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
                  className="swipeButtons__left"
                  onClick={() => swiped("left", person.name)}
                  onCardLeftScreen={() => outOfFrame(person.name)}
                >
                  <CloseIcon fontSize="large" />
                </IconButton>
                <IconButton className="swipeButtons__star">
                  <StarIcon fontSize="large" />
                </IconButton>
                <IconButton
                  className="swipeButtons__right"
                  onClick={() => swiped("right", person.name)}
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
  );
}

export default TinderCards;
