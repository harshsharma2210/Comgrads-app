import { Button } from "@material-ui/core";
import React from "react";
import "./Login.css";
import { auth, provider } from "../firebase";
import { useStateValue } from "../StateProvider";
import { actionTypes } from "../Reducer";
import Logo from "../images/logo.png";
import { useHistory } from "react-router";

const Login = () => {
  const [state, dispatch] = useStateValue();
  const history = useHistory();
  const signIn = () => {
    auth
      .signInWithPopup(provider)
      .then((result) => {
        console.log(result);

        dispatch({
          type: actionTypes.SET_USER,
          user: result.user,
        });
      })
      .then(() => {
        history.push("/choice");
      })
      .catch((error) => alert(error.message));
  };
  return (
    <div className="login">
      <div className="login__logo">
        <img src={Logo} alt="fb circle" />
        <img
          src="https://res.cloudinary.com/dggwrslgs/image/upload/v1616821626/mnexwtdoymj5wlvwsbqd.png"
          alt="fb text"
        />
      </div>
      <Button type="submit" onClick={signIn}>
        Sign In
      </Button>
    </div>
  );
};

export default Login;
