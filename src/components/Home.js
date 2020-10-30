import React from "react";
import { useEffect, useState, useMemo } from "react";
import axios from "axios";
import { Table } from "./Table";
import {
  priceFormat,
  currencyFormat,
  percentageFormat,
  numberFormat,
} from "./dataFormat";
import "../styles/table.scss";

const Home = () => {
  const [cryptocurrenciesData, setCryptocurrenciesData] = useState([]);

  // API mount call configuration

  const fetchData = () => {
    axios
      .get(
        "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc"
      )
      .then((res) => {
        setCryptocurrenciesData(res.data);
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
      accessor: "market_cap_rank",
    },
    {
      Header: "Name",
      accessor: "name",
    },
    {
      Header: "Price",
      accessor: "current_price",
      Cell: ({ value }) => priceFormat(value),
    },
    {
      Header: "24h",
      accessor: "price_change_percentage_24h",
      Cell: ({ value }) => percentageFormat(value),
    },
    {
      Header: "ATH",
      accessor: "ath",
      Cell: ({ value }) => priceFormat(value),
    },
    {
      Header: "Market Cap",
      accessor: "market_cap",
      Cell: ({ value }) => currencyFormat(value),
    },
    {
      Header: "24h Volume",
      accessor: "total_volume",
      Cell: ({ value }) => currencyFormat(value),
    },
    {
      Header: "Circulating Supply",
      accessor: "circulating_supply",
      Cell: ({ value }) => numberFormat(value),
    },
  ]);

  return (
    <div>
      <Table columns={columns} data={cryptocurrenciesData} />
    </div>
  );
};

export default Home;
