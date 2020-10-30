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

const Exchanges = () => {
  const [exchangesData, setExchangesData] = useState([]);
  const [derivativesData, setDerivativesData] = useState([]);
  const [derivativesExchanges, setDerivativesExchanges] = useState([]);

  // API mount call configuration

  const fetchData = () => {
    const exchangesDataApi = "https://api.coingecko.com/api/v3/exchanges";

    const derivativesDataApi = "https://api.coingecko.com/api/v3/derivatives";

    const derivativesExchangesApi =
      "https://api.coingecko.com/api/v3/derivatives/exchanges";

    const config = {
      headers: {
        "X-CMC_PRO_API_KEY": process.env.REACT_APP_API_KEY,
      },
    };

    const getExchangesData = axios.get(exchangesDataApi, config);
    const getDerivativesData = axios.get(derivativesDataApi, config);
    const getDerivativesExchanges = axios.get(derivativesExchangesApi, config);

    axios
      .all([getExchangesData, getDerivativesData, getDerivativesExchanges])
      .then(
        axios.spread((...allData) => {
          const exchangeData = allData[0].data;
          const derivativesData = allData[1].data;
          const derivativesExchanges = allData[2].data;

          setExchangesData(exchangeData);
          setDerivativesData(derivativesData);
          setDerivativesExchanges(derivativesExchanges);
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
      accessor: "trust_score_rank",
    },
    {
      Header: "Name",
      accessor: "name",
    },
    {
      Header: "Trust Score",
      accessor: "trust_score",
      Cell: ({ value }) => numberFormat(value),
    },
    {
        Header: "Launched",
        accessor: "year_established",
      },
  ]);

  console.log(exchangesData);

  return (
    <div>
      <h1>test</h1>
      <Table columns={columns} data={exchangesData} />
    </div>
  );
};

export default Exchanges;
