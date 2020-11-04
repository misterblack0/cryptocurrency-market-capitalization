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
      <Table columns={columns} data={exchangesData} />
    </div>
  );
};

export default Exchanges;
