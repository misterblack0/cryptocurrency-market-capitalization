import React from "react";
import DataFetching from "./DataFetching";
import "./app.scss";

const Cryptocurrency = ({
  symbol,
  currentPrice,
  percent_change_24h,
  percent_change_7d,
  supply,
  volume,
  marketcap,
}) => (
  <li>
    {symbol}, Price: {currentPrice}, 24H: {percent_change_24h}, 7D:{" "}
    {percent_change_7d} Circulating supply: {supply}, Volume: {volume},
    Marketcap: {marketcap}
  </li>
);

export default Cryptocurrency;
