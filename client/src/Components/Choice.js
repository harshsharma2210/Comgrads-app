import { Button, Container, Typography, Paper, Box } from "@material-ui/core";
import React from "react";
import { useHistory } from "react-router-dom";
import { useStateValue } from "../StateProvider";
import "./Choice.css";
import { makeStyles } from "@material-ui/core/styles";

const Choice = () => {
  const [{ user }, dispatch] = useStateValue();
  const history = useHistory();
  if (!user) {
    history.push("/");
  }
  const student = () => {
    history.push("/app");
  };
  const organiser = () => {
    history.push("/organiser");
  };

  return (
    <Box display="flex" height="100vh" flexDirection="column" justifyContent="center" m={1} p={1} alignContent="flex-end">
      <Box p={1} >
        <div className="choice">
          <Container maxWidth="sm" align="center">
            <Paper className="paper">
              <Typography variant="h6" align="center">
                Are you a Student or Event Organiser? Click the button to redirect
                to the respective page.
          </Typography>
              <Button variant="contained" color="primary" onClick={student}>
                Student
          </Button>
              <Button variant="contained" color="secondary" onClick={organiser}>
                Organiser
          </Button>
            </Paper>
          </Container>
        </div>
      </Box>
    </Box>
  );
};

export default Choice;
