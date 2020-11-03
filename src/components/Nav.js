import React from "react";
import { Link } from "react-router-dom";
import "../styles/nav.scss";

const Nav = () => (
  <nav>
    <h3>Logo</h3>
    <ul>
      <Link to="/" style={{ textDecoration: "none" }}>
        <li>Cryptocurrencies</li>
      </Link>
      <Link to="/exchanges" style={{ textDecoration: "none" }}>
        <li>Exchanges</li>
      </Link>
      <Link to="/defi" style={{ textDecoration: "none" }}>
        <li>DeFi</li>
      </Link>
    </ul>
  </nav>
);

export default Nav;
