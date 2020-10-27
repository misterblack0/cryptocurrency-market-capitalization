import React from "react";
import { useEffect, useState, useMemo } from "react";
import axios from "axios";
import { Table } from "./Table";
import "../styles/table.scss";

export const DataFetching = () => {
  // data state to store the CMC API data. It's initial value is an empty array

  const [data, setData] = useState([]);

  // API mount call configuration

  const apiGetData = () => {
    const apiUrl =
      "https://sandbox-api.coinmarketcap.com/v1/cryptocurrency/listings/latest";
    /* "https://pro-api.coinmarketcap.com/v1/cryptocurrency/listings/latest"; */
    const config = {
      headers: {
        "X-CMC_PRO_API_KEY": process.env.REACT_APP_API_KEY,
      },
    };
    axios
      .get(apiUrl, config)
      .then((res) => {
        setData(res.data.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  // Using useEffect to call the API once mounted and set the data

  useEffect(() => {
    apiGetData();
    const interval = setInterval(() => {
      apiGetData();
    }, 15000);
    return () => clearInterval(interval);
  }, []);

  // Format data into a currency value

  const options = { style: "currency", currency: "USD" };
  const numberFormat = new Intl.NumberFormat("en-US", options);

  // Format data into a percentage value

  function percentFormat(x){
    const options1 = {style: 'percent', minimumFractionDigits:2};
    return (x/100).toLocaleString("en-US", options1);
  }


  // React-table columns logic

  const columns = useMemo(() => [
    {
      Header: "Name",
      accessor: "name",
    },
    {
      Header: "Price",
      accessor: "quote.USD.price",
      Cell: (props) => numberFormat.format(props.value),
    },
    {
      Header: "24H",
      accessor: "quote.USD.percent_change_24h",
    },
    {
      Header: "7d",
      accessor: "quote.USD.percent_change_7d",
      Cell: (props) => percentFormat(props.value),
    },
    {
      Header: "Market Cap",
      accessor: "quote.USD.market_cap",
      Cell: (props) => numberFormat.format(props.value),
    },
    {
      Header: "Volume",
      accessor: "quote.USD.volume_24h",
      Cell: (props) => numberFormat.format(props.value),
    },
    {
      Header: "Circulating Supply",
      accessor: "circulating_supply",
    },
  ]);

  return (
    <div>
      <Table columns={columns} data={data} />
    </div>
  );
};
