import React from "react";
import { useEffect, useState, useMemo } from "react";
import axios from "axios";
import "../styles/table.scss";
import Table from "./Table";

export const Test = () => {
  ////////////////////////////////////////////////////////////////////////////////////////////

  const [data, setData] = useState([]);

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

  useEffect(() => {
    apiGetData();
    const interval = setInterval(() => {
      apiGetData();
    }, 15000);
    return () => clearInterval(interval);
  }, []);

  ////////////////////////////////////////////////////////////////////////////////////////////

  const columns = useMemo(() => [
    {
      Header: "Id",
      accessor: "data.id",
    },
    {
      Header: "Name",
      accessor: "data.name",
    },
    {
      Header: "Price",
      accessor: "data.quote.USD.price",
    },
    {
      Header: "24H",
      accessor: "data.quote.USD.percent_change_24h",
    },
    {
      Header: "7d",
      accessor: "data.quote.USD.percent_change_7d",
    },
    {
      Header: "Market Cap",
      accessor: "data.quote.USD.market_cap",
    },
    {
      Header: "Volume",
      accessor: "volume_24h.quote.USD.percent_change_24h",
    },
    {
      Header: "Circulating Supply",
      accessor: "data.circulating_supply",
    },
  ]);

  /* const column = useMemo(() => columns, []);
  const data = useMemo(() => responseData, []);

  const tableInstance = useTable({
    columns,
    data,
  });

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
  } = tableInstance; */

  return (
    <div>
      <Table columns={columns} data={data} />
    </div>
    /* <table {...getTableProps()}>
      <thead>
        {headerGroups.map((headerGroup) => (
          <tr {...headerGroup.getHeaderGroupProps()}>
            {headerGroup.headers.map((column) => (
              <th {...column.getHeaderGroupProps()}>
                {column.render("Header")}
              </th>
            ))}
          </tr>
        ))}
      </thead>
      <tbody {...getTableBodyProps()}>
        {rows.map((row) => {
          prepareRow(row);
          return (
            <tr {...row.getRowProps}>
              {row.cells.map((cell) => {
                return <td {...cell.getCellProps()}>{cell.render("Cell")}</td>;
              })}
            </tr>
          );
        })}
      </tbody>
    </table> */
  );
};
