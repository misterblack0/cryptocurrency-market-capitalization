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
  const [globalData, setglobalData] = useState([]);

  // API mount call configuration

  const fetchData = () => {
    const cryptocurrenciesDataApi =
      "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc";

    const globalDataApi = "https://api.coingecko.com/api/v3/global";
    const config = {
      headers: {
        "X-CMC_PRO_API_KEY": process.env.REACT_APP_API_KEY,
      },
    };

    const getCryptocurrenciesData = axios.get(cryptocurrenciesDataApi, config);
    const getGlobalData = axios.get(globalDataApi, config);

    axios.all([getCryptocurrenciesData, getGlobalData]).then(
      axios.spread((...allData) => {
        const cryptocurrenciesData = allData[0].data;
        const globalData = allData[1].data.data;

        setCryptocurrenciesData(cryptocurrenciesData);
        setglobalData(globalData);
      })
    );
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
      <span>Cryptocurrencies: {globalData.active_cryptocurrencies}</span>
      {/* <span>BTC Dominance: {globalMetrics.market_cap_percentage.btc}</span> */}
      <Table columns={columns} data={cryptocurrenciesData} />
    </div>
  );
};

export default Home;
