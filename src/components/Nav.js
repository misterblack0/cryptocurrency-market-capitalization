import React from "react";
import { Link } from "react-router-dom";

const Nav = () => (
  <nav>
    <h3>Logo</h3>
    <ul>
      <Link to="/">
        <li>Cryptocurrencies</li>
      </Link>
      <Link to="/exchanges">
        <li>Exchanges</li>
      </Link>
      <Link to="/defi">
        <li>DeFi</li>
      </Link>
    </ul>
  </nav>
);

export default Nav;
