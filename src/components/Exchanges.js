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
    axios
      .get("https://api.coingecko.com/api/v3/exchanges")
      .then((res) => {
        setExchangesData(res.data);
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
      <h1>test</h1>
      <Table columns={columns} data={exchangesData} />
    </div>
  );
};

export default Exchanges;
