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
    <div className="global-metrics">
      <span className="global-metrics__block">
        Cryptocurrencies:{" "}
        <span className="global-metrics__link">
          {numberFormat(globalData.active_cryptocurrencies)}
        </span>
      </span>
      <span className="global-metrics__block">
        BTC Dominance:{" "}
        <span className="global-metrics__link">
          {percentageFormat(globalData.btc_dominance)}
        </span>
      </span>
      <span className="global-metrics__block">
        Exchanges:{" "}
        <span className="global-metrics__link">
          {numberFormat(globalData.active_exchanges)}
        </span>
      </span>
    </div>
  );
};

export default GlobalMetrics;
