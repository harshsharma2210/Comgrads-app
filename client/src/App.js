import "./App.css";
import Header from "./Components/Header";
import TinderCards from "./Components/TinderCards";
import Login from "./Components/Login";
import { Switch, Route } from "react-router-dom";
import { useStateValue } from "./StateProvider";
import Organiser from "./Components/Organiser";
import Choice from "./Components/Choice";

function App() {
  const [{ user }, dispatch] = useStateValue();
  return (
    <div className="app">
      <Switch>
        <Route exact path="/">
          <Login />
        </Route>
        <Route exact path="/choice">
          <Choice />
        </Route>
        <Route exact path="/organiser">
          <Organiser />
        </Route>
        <Route exact path="/app">
          <Header />
          <TinderCards />
        </Route>
      </Switch>
    </div>
  );
}

export default App;
