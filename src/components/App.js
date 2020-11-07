import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Header from "./Header";
import Home from "./Home";
import Exchanges from "./Exchanges";
import "../styles/index.scss";

const App = () => (
  <>
    <Header />
    <Router>
      <Switch>
        <Route path="/" exact component={Home} />
        <Route path="/exchanges" exact component={Exchanges} />
      </Switch>
    </Router>
  </>
);

export default App;
