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
    const cryptocurrenciesDataApi =
      "https://sandbox-api.coinmarketcap.com/v1/cryptocurrency/listings/latest";
    const config = {
      headers: {
        "X-CMC_PRO_API_KEY": process.env.REACT_APP_API_KEY,
      },
    };

    axios
      .get(cryptocurrenciesDataApi, config)
      .then((res) => {
        setCryptocurrenciesData(res.data.data);
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
      accessor: "cmc_rank",
    },
    {
      Header: "Name",
      accessor: "name",
    },
    {
      Header: "Price",
      accessor: "quote.USD.price",
      Cell: ({ value }) => priceFormat(value),
    },
    {
      Header: "24h",
      accessor: "quote.USD.percent_change_24h",
      Cell: ({ value }) => percentageFormat(value),
    },
    {
      Header: "7d",
      accessor: "quote.USD.percent_change_7d",
      Cell: ({ value }) => percentageFormat(value),
    },
    {
      Header: "Market Cap",
      accessor: "quote.USD.market_cap",
      Cell: ({ value }) => currencyFormat(value),
    },
    {
      Header: "24h Volume",
      accessor: "quote.USD.volume_24h",
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
