import React from "react";
import DataFetching from "./DataFetching";
import "./app.scss";

const Cryptocurrency = ({ symbol, price, last24, last7, supply, volume, marketcap }) => (
  <li>
    {symbol}, Price: {price}, 24H: {last24}, 7D: {last7} Circulating supply: {supply}, Volume: {volume}, Marketcap: {marketcap}
  </li>
);

export default Cryptocurrency;
