import React from "react";
import "./Header.css";
import IconButton from "@material-ui/core/IconButton";
import ForumIcon from "@material-ui/icons/Forum";
import Logo from "../images/logo.png";
import { useStateValue } from "../StateProvider";
import { Avatar } from "@material-ui/core";
import { useHistory } from "react-router";

function Header() {
  const [{ user }, dispatch] = useStateValue();
  const history = useHistory();
  if (!user) {
    history.push("/");
  }
  return (
    <div className="header">
      <div className="header__info">
        <Avatar src={user.photoURL} />
        <h4>{user.displayName}</h4>
      </div>
      <IconButton
        onClick={() =>
          window.location.replace("https://kkanoo.github.io/Comgrads/")
        }
      >
        <img className="header__logo" src={Logo} alt="logo" />
      </IconButton>
      <IconButton>
        <ForumIcon fontSize="large" className="header__icon" />
      </IconButton>
    </div>
  );
}

export default Header;
