import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Nav from "./Nav";
import GlobalMetrics from "./GlobalMetrics";
import Home from "./Home";
import Exchanges from "./Exchanges";

const Header = () => (
  <div>
    <GlobalMetrics />
    <Router>
      <Switch>
        <Route path="/" exact component={Home} />
        <Route path="/exchanges" exact component={Exchanges} />
      </Switch>
    </Router>
  </div>
);

export default Header;
