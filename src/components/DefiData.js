import React from "react";
import { useEffect, useState, useMemo } from "react";
import axios from "axios";
import {
  priceFormat,
  currencyFormat,
  percentageFormat,
  numberFormat,
} from "./dataFormat";

const DefiData = () => {
  const [defiData, setdefiData] = useState([]);

  // API mount call configuration

  const fetchData = () => {
    axios
      .get("https://api.coingecko.com/api/v3/global/decentralized_finance_defi")
      .then((res) => {
        setdefiData(res.data.data);
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
    <div>
    <h1>DEFI</h1>
      <h3>{defiData.defi_market_cap}</h3>
      <h3>{defiData.trading_volume_24h}</h3>
      <h3>{defiData.defi_dominance}</h3>
      <h3>
        Top Defi Coin: {defiData.top_coin_name} with a dominance of{" "}
        {defiData.top_coin_defi_dominance}
      </h3>
    </div>
  );
};

export default DefiData;
