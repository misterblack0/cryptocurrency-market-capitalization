import { useEffect, useState } from "react";
import axios from "axios";
import "./app.scss";

const DataFetching = () => {
  const [price, setPrice] = useState();

  useEffect(() => {
    axios
      .get("https://www.bitstamp.net/api/v2/ticker/btcusd")
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  });
  return <div></div>;
};

export default DataFetching;
