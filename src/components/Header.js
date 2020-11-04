import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Nav from "./Nav";
import GlobalMetrics from "./GlobalMetrics";
import Home from "./Home";
import Exchanges from "./Exchanges";
import DefiData from "./DefiData";

const Header = () => (
  <div>
    <GlobalMetrics />
    <Router>
      <Nav />
      <Switch>
        <Route path="/defi" exact component={DefiData} />
        <Route path="/" exact component={Home} />
        <Route path="/exchanges" exact component={Exchanges} />
      </Switch>
    </Router>
  </div>
);

export default Header;
