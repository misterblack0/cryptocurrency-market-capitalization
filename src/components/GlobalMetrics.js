import React from "react";
import { useEffect, useState } from "react";
import axios from "axios";
import numberFormat from "./dataFormat.js";
import "../styles/globalMetrics.scss";

const GlobalMetrics = () => {
  const [globalData, setGlobalData] = useState([]);

  // API mount call configuration

  const fetchData = () => {
    const globalDataApi =
      "https://sandbox-api.coinmarketcap.com/v1/global-metrics/quotes/latest";
    const config = {
      headers: {
        "X-CMC_PRO_API_KEY": process.env.REACT_APP_API_KEY,
      },
    };

    axios
      .get(globalDataApi, config)
      .then((res) => {
        setGlobalData(res.data.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  // Using useEffect to call the API once mounted and set the data

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="container">
      <span>Cryptocurrencies: {globalData.total_cryptocurrencies}</span>
      <span>BTC Dominance: {globalData.btc_dominance}</span>
      <span>Exchanges: {globalData.active_exchanges}</span>
      {/*     <span>Market Cap: {globalData.quote.USD.total_market_cap}</span>
    <span>24h Vol: {globalData.quote.USD.total_volume_24h}</span>
    <span>Altcoins Market Cap: {globalData.quote.USD.altcoin_market_cap}</span>
    <span>Altcoins 24h Vol: {globalData.quote.USD.altcoin_volume_24h}</span> */}
    </div>
  );
};

export default GlobalMetrics;
