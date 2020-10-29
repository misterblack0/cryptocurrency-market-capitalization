import React from "react";
import { useEffect, useState, useMemo } from "react";
import axios from "axios";
import { Table } from "./Table";
import "../styles/table.scss";

export const DataFetching = () => {
  // data state to store the CMC API data. It's initial value is an empty array

  const [cryptoData, setCryptoData] = useState([]);
  const [globalMetrics, setGlobalMetrics] = useState([]);

  // API mount call configuration

  const fetchData = () => {
    const cryptoApi =
      "https://sandbox-api.coinmarketcap.com/v1/cryptocurrency/listings/latest";

    const metricsApi =
      "https://sandbox-api.coinmarketcap.com/v1/global-metrics/quotes/latest";
    // In production change the URL from "sandbox-api" to "pro-api" and change the api key from .env

    const config = {
      headers: {
        "X-CMC_PRO_API_KEY": process.env.REACT_APP_API_KEY,
      },
    };

    const getCryptoData = axios.get(cryptoApi, config);
    const getMetricsData = axios.get(metricsApi, config);

    axios.all([getCryptoData, getMetricsData]).then(
      axios.spread((...allData) => {
        const cryptoData = allData[0].data.data;
        const metricsData = allData[1].data.data;

        setCryptoData(cryptoData);
        setGlobalMetrics(metricsData);
      })
    );
  };

  // Using useEffect to call the API once mounted and set the data

  useEffect(() => {
    fetchData();
    /* const interval = setInterval(() => { // If you want to use an interval to update the data from the API
      fetchData();
    }, 15000);
    return () => clearInterval(interval); */
  }, []);

  // Format data in a currency value for the price, with fraction digits ---------work in progress----------

  const priceFormat = (num) => {
    const options = {
      style: "currency",
      currency: "USD",
      /* maximumFractionDigits: 6, */
    };
    return new Intl.NumberFormat("en-US", options).format(num);
  };

  // Format data in a currency value

  const currencyFormat = (num) => {
    const options = {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    };
    return new Intl.NumberFormat("en-US", options).format(num);
  };

  // Format data in a percentage value

  const percentageFormat = (num) => {
    const options = { style: "percent", minimumFractionDigits: 2 };
    // num < 0 ? to implement red color style on "< 0" number and green on "0 >" number
    return (num / 100).toLocaleString("en-US", options);
  };

  // Format data in a number value with a minimum number of significant digits

  const numberFormat = (num) => {
    const options = { maximumFractionDigits: 0 };
    return new Intl.NumberFormat("en-US", options).format(num);
  };

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

  console.log(globalMetrics);

  return (
    <div>
      <Table columns={columns} data={cryptoData} />
    </div>
  );
};
