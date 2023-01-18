import React from "react";
import "./assets/css/styles.css";
import Home from "./Pages/Home";
import Procedures from "./Pages/Procedures";
import Persons from "./Pages/Persons";
import Employees from "./Pages/Employees";
import { Route, Switch } from "react-router-dom";
import Drawer from "./components/Drawer";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles({
  container: {
    display: "flex"
  }
});

export default function App() {
  const classes = useStyles();
  return (
    <div className={classes.container}>
      <Drawer />
      <Switch>
        <Route exact from="/" render={props => <Home {...props} />} />
        <Route exact path="/procedures" render={props => <Procedures {...props} />} />
        <Route exact path="/persons" render={props => <Persons {...props} />} />
        <Route exact path="/employees" render={props => <Employees {...props} />} />
      </Switch>
    </div>
  );
}
