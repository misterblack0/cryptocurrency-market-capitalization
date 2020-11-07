import React from "react";
import { useEffect, useState } from "react";
import axios from "axios";
import { percentageFormat, numberFormat } from "./dataFormat";
import "../styles/globalMetrics.scss";

const GlobalMetrics = () => {
  const [globalData, setGlobalData] = useState([]);
  const [defiData, setdefiData] = useState([]);

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

  console.log(globalData.total_cryptocurrencies);

  return (
    <div className="container">
      <span>
        Cryptocurrencies: {numberFormat(globalData.active_cryptocurrencies)}
      </span>
      <span>BTC Dominance: {percentageFormat(globalData.btc_dominance)}</span>
      <span>Exchanges: {numberFormat(globalData.active_exchanges)}</span>
    </div>
  );
};

export default GlobalMetrics;
