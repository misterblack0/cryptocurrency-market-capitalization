import React from "react";
import DataFetching from "./DataFetching";
import "./app.scss";

const Cryptocurrency = ({symbol, price}) => (
  <li>Symbol: {symbol}, Price: {price}</li>
);

export default Cryptocurrency;
