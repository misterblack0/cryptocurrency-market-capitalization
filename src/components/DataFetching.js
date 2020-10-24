import React from "react";
import { useEffect, useState } from "react";
import Cryptocurrency from "./Cryptocurrency";
import axios from "axios";
import "./app.scss";

const DataFetching = () => {
  const [price, setPrice] = useState([]);

  useEffect(() => {
    const interval = setInterval(() => {
      const url =
        "https://sandbox-api.coinmarketcap.com/v1/cryptocurrency/listings/latest";

      const config = {
        headers: {
          "X-CMC_PRO_API_KEY": "b54bcf4d-1bca-4e8e-9a24-22ff2c3d462c",
        },
      };

      axios
        .get(url, config)
        .then((res) => {
          setPrice(res.data.data);
          console.log(res.data.data);
        })
        .catch((err) => {
          console.log(err);
        });
    }, 3000);
    return () => clearInterval(interval);
  }, []);
  return (
    <div>
      <ul>
        {price.map((x) => (
          <Cryptocurrency
            key={x.id}
            symbol={x.name}
            currentPrice={x.quote.USD.price}
            percent_change_24h={x.quote.USD.volume_24h}
            percent_change_7d={x.quote.USD.percent_change_7d}
            supply={x.circulating_supply}
            volume={x.quote.USD.volume_24h}
            marketcap={x.quote.USD.market_cap}
          />
        ))}
      </ul>
    </div>
  );
};

export default DataFetching;
