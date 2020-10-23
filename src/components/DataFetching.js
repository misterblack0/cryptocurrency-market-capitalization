import React from "react";
import { useEffect, useState } from "react";
import axios from "axios";
import "./app.scss";

const DataFetching = () => {
  const [price, setPrice] = useState();

  useEffect(() => {
    const interval = setInterval(() => {
      axios
        .get("https://api.binance.com/api/v1/ticker/price?symbol=BTCUSDT")
        .then((res) => {
          console.log(res.data.price);
          setPrice(res.data.price);
        })
        .catch((err) => {
          console.log(err);
        });
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div>
      {price}
    </div>
  );
};

export default DataFetching;
