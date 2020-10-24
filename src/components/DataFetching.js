import React from "react";
import { useEffect, useState } from "react";
import Cryptocurrency from "./Cryptocurrency";
import axios from "axios";

const DataFetching = () => {
  const [data, setData] = useState([]);

  const apiGetData = () => {
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
        {data.map((x) => (
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
