import React from "react";
import { useEffect, useState } from "react";
import Cryptocurrency from "./Cryptocurrency";
import axios from "axios";
import "./app.scss";

const DataFetching = () => {
  const [price, setPrice] = useState([{ symbol: "", price: "" }]);

  useEffect(() => {
    const interval = setInterval(() => {
      axios
        .all([
          axios.get(
            "https://api.binance.com/api/v1/ticker/price?symbol=BTCUSDT"
          ),
          axios.get(
            "https://api.binance.com/api/v1/ticker/price?symbol=ETHUSDT"
          ),
        ])

        .then(
          axios.spread((obj1, obj2) => {
            setPrice([obj1.data, obj2.data]);
          })
        )
        .catch((err) => {
          console.log(err);
        });
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div>
      <ul>
        {price.map((x) => (
          <Cryptocurrency symbol={x.symbol} price={x.price} />
        ))}
      </ul>
    </div>
  );
};

export default DataFetching;
