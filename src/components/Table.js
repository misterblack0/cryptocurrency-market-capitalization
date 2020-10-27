import React from "react";
import { useState } from "react";
import { useFilters, useSortBy, useTable } from "react-table";

export const Table = ({ columns, data }) => {
  // Create a state for filter
  const [filterInput, setFilterInput] = useState("");

  const handleFilterChange = (e) => {
    const value = e.target.value || undefined;
    setFilter("name", value); // Update the name filter. Now our table will filter and show only the rows which have a matching value
    setFilterInput(value);
  };

  // Use the useTable Hook to send the columns and data to build the table
  const {
    getTableProps, // table props from react-table
    getTableBodyProps, // table body props from react-table
    headerGroups, // headerGroups, if your table has groupings
    rows, // rows for the table based on the data passed
    prepareRow, // Prepare the row (this function needs to be called for each row before getting the row props)
    setFilter, // The useFilter Hook provides a way to set the filter
  } = useTable(
    {
      columns,
      data,
    },
    useFilters, // Plugin Hook to search through name column
    useSortBy //Plugin Hook to sort our table columns
  );

  // Render the UI for the table
  // react-table doesn't have UI, it's headless. You just need to put the react-table props from the Hooks, and it will do its magic automatically

  return (
    <div>
      <input
        value={filterInput}
        onChange={handleFilterChange}
        placeholder={"Search name"}
      />
      <table {...getTableProps()}>
        <thead>
          {headerGroups.map((headerGroup) => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map((column) => (
                <th
                  {...column.getHeaderProps(column.getSortByToggleProps())}
                  className={
                    column.isSorted
                      ? column.isSortedDesc
                        ? "sort-desc"
                        : "sort-asc"
                      : ""
                  }
                >
                  {column.render("Header")}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps()}>
          {rows.map((row, i) => {
            prepareRow(row); // This line is necessary to prepare the rows and get the row props from react-table dynamically

            // Each row can be rendered directly as a string using the react-table render method
            return (
              <tr {...row.getRowProps()}>
                {row.cells.map((cell) => {
                  return (
                    <td {...cell.getCellProps()}>{cell.render("Cell")}</td>
                  );
                })}
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};
