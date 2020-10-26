import React from "react";
import "../styles/cryptocurrency.scss";

const Cryptocurrency = ({
  symbol,
  currentPrice,
  percent_change_24h,
  percent_change_7d,
  supply,
  volume,
  marketcap,
}) => (
  /* to implement react table */
  <li className="crypto">
    <div>{symbol}</div> <div> Price: {currentPrice}</div>{" "}
    <div>24H: {percent_change_24h}</div> 7D: {percent_change_7d}{" "}
    <div>Circulating supply: {supply}</div> <div>Volume: {volume}</div>
    Marketcap: {marketcap}
  </li>
);

export default Cryptocurrency;
