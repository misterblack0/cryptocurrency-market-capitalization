import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Nav from "./Nav";
import Home from "./Home";
import Exchanges from "./Exchanges";
import DefiData from "./DefiData";

const App = () => (
  <Router>
  
    <Nav />
    <Switch>
    <Route path="/defi" exact component={DefiData} />
      <Route path="/" exact component={Home} />
      <Route path="/exchanges" exact component={Exchanges} />
    </Switch>
  </Router>
);

export default App;
