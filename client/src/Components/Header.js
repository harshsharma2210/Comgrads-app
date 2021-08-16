import React from "react";
import "./Header.css";
import Person from "@material-ui/icons/PersonOutline";
import Logo from "../images/logo.png";
import { useStateValue } from "../StateProvider";
import { Avatar, IconButton } from "@material-ui/core";
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
          window.location.replace(
            "https://github.com/kkanoo/Comgrads_Resources"
          )
        }
      >
        <img className="header__logo" src={Logo} alt="logo" />
      </IconButton>
      <IconButton
        onClick={() => window.location.replace("http://c286dc68361a.ngrok.io/")}
      >
        <Person fontSize="large" className="header__icon" />
      </IconButton>
    </div>
  );
}

export default Header;
