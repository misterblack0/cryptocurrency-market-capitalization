import React from "react";
import { useEffect, useState } from "react";
import Cryptocurrency from "./Cryptocurrency";
import axios from "axios";

const DataFetching = () => {
  const [data, setData] = useState([]);

  const apiGetData = () => {
    const url =
      "https://sandbox-api.coinmarketcap.com/v1/cryptocurrency/listings/latest";
    /* "https://pro-api.coinmarketcap.com/v1/cryptocurrency/listings/latest"; */
    const config = {
      headers: {
        "X-CMC_PRO_API_KEY": "b54bcf4d-1bca-4e8e-9a24-22ff2c3d462c",
        /* "X-CMC_PRO_API_KEY": "e6dcecd7-a6ca-46bd-8ede-c7bda6b5d29d" */
      },
    };
    axios
      .get(url, config)
      .then((res) => {
        setData(res.data.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    apiGetData();
    const interval = setInterval(() => {
      apiGetData();
    }, 15000);
    return () => clearInterval(interval);
  }, []);
  return (
    <div>
      <ul>
        {data.map((coin) => (
          <Cryptocurrency
            key={coin.id}
            symbol={coin.name}
            currentPrice={`${coin.quote.USD.price.toLocaleString("en-US", {
              style: "currency",
              currency: "USD",
            })}`}
            percent_change_24h={`${
              coin.quote.USD.percent_change_24h.toFixed(2) + "%"
            }`}
            percent_change_7d={`${
              coin.quote.USD.percent_change_7d.toFixed(2) + "%"
            }`}
            supply={coin.circulating_supply.toLocaleString("en-US", {
              maximumFractionDigits: 2,
            })}
            volume={`${coin.quote.USD.volume_24h.toLocaleString("en-US", {
              style: "currency",
              currency: "USD",
            })}`}
            marketcap={`${coin.quote.USD.market_cap.toLocaleString("en-US", {
              style: "currency",
              currency: "USD",
            })}`}
          />
        ))}
      </ul>
    </div>
  );
};

export default DataFetching;
