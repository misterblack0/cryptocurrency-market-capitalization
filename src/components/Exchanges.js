import React from "react";
import { useEffect, useState, useMemo } from "react";
import axios from "axios";
import { Table } from "./Table";
import { currencyFormat, percentageFormat, numberFormat } from "./dataFormat";
import "../styles/table.scss";

const Exchanges = () => {
  const [exchangesData, setExchangesData] = useState([]);

  // API mount call configuration

  const fetchData = () => {
    const exchangesDataApi =
      "https://sandbox-api.coinmarketcap.com/v1/exchange/listings/latest";
    const config = {
      headers: {
        "X-CMC_PRO_API_KEY": process.env.REACT_APP_API_KEY,
      },
    };

    axios
      .get(exchangesDataApi, config)
      .then((res) => {
        setExchangesData(res.data.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  // Using useEffect to call the API once mounted and set the data

  useEffect(() => {
    fetchData();
  }, []);

  // React-table columns logic

  const columns = useMemo(() => [
    {
      Header: "#",
      accessor: "id",
    },
    {
      Header: "Name",
      accessor: "name",
    },
    {
      Header: "Market Pairs",
      accessor: "num_market_pairs",
      Cell: ({ value }) => numberFormat(value),
    },
    {
      Header: "24h",
      accessor: "quote.USD.percent_change_volume_24h",
      Cell: ({ value }) => (
        <span style={value < 0 ? { color: "#EA3943" } : { color: "#16C784" }}>
          {percentageFormat(value)}
        </span>
      ),
    },
    {
      Header: "7d",
      accessor: "quote.USD.percent_change_volume_7d",
      Cell: ({ value }) => (
        <span style={value < 0 ? { color: "#EA3943" } : { color: "#16C784" }}>
          {percentageFormat(value)}
        </span>
      ),
    },
    {
      Header: "30d",
      accessor: "quote.USD.percent_change_volume_30d",
      Cell: ({ value }) => (
        <span style={value < 0 ? { color: "#EA3943" } : { color: "#16C784" }}>
          {percentageFormat(value)}
        </span>
      ),
    },
    {
      Header: "24h Volume",
      accessor: "quote.USD.volume_24h_adjusted",
      Cell: ({ value }) => currencyFormat(value),
    },
    {
      Header: "7d Volume",
      accessor: "quote.USD.volume_7d",
      Cell: ({ value }) => currencyFormat(value),
    },
    {
      Header: "30d Volume",
      accessor: "quote.USD.volume_30d",
      Cell: ({ value }) => currencyFormat(value),
    },
  ]);

  return (
    <div>
      <Table columns={columns} data={exchangesData} />
    </div>
  );
};

export default Exchanges;
