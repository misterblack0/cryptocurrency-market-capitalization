import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { Home } from "./Home";
import { Exchanges } from "./Exchanges";
import { Nav } from "./Nav";

const App = () => (
  <Router>
    <Nav />
    <Switch>
      <Route path="/" exact component={Home} />
      <Route path="/exchanges" component={Exchanges} />
    </Switch>
  </Router>
);

export default App;
