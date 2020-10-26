import React from "react";
import { useEffect, useState, useMemo } from "react";
import { useTable } from "react-table";
/* import { columns } from "./columns"; */
import axios from "axios";
import "../styles/table.scss";

export const BasicTable = () => {


  ////////////////////////////////////////////////////////////////////////////////////////////
    



  ////////////////////////////////////////////////////////////////////////////////////////////

  const [responseData, setResponseData] = useState([]);

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
        setResponseData(res.data.data);
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

  console.log(responseData);


  const column = useMemo(() => columns, []);
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
  } = tableInstance;



  return (
    {/* <table {...getTableProps()}>
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
    </table> */}
  );
};
