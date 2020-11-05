import React from "react";
import { useState } from "react";
import { useTable, useFilters, useSortBy, usePagination } from "react-table";
import Nav from "./Nav";

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
    page,
    nextPage,
    previousPage,
    canNextPage,
    canPreviousPage,
    pageOptions,
    gotoPage,
    pageCount,
    setPageSize,
    state,
    prepareRow, // Prepare the row (this function needs to be called for each row before getting the row props)
    setFilter, // The Hook that provides a way to set the filter
  } = useTable(
    {
      columns,
      data,
      initialState: { pageIndex: 0, pageSize: 20 },
    },
    useFilters, // Plugin Hook to search through name column
    useSortBy, //Plugin Hook to sort through table columns
    usePagination
  );

  // Render the UI for the table
  // react-table doesn't have UI, it's headless. You just need to put the react-table props from the Hooks, and it will do its magic automatically

  const { pageIndex, pageSize } = state;

  return (
    <div>
      <div className="nav_container">
        <Nav />
        <div className="search__container">
          <input
            className="search__field"
            value={filterInput}
            onChange={handleFilterChange}
            placeholder={"Search"}
          />
          {/* <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            height="16px"
            width="16px"
            viewBox="0 0 24 24"
            class="Box-sc-16r8icm-0 dLcfZ"
          >
            <path
              d="M16.4153 16.4153L20 20M18.5455 11.2727C18.5455 15.2893 15.2894 18.5454 11.2728 18.5454C7.25612 18.5454 4 15.2893 4 11.2727C4 7.2561 7.25612 4 11.2728 4C15.2894 4 18.5455 7.2561 18.5455 11.2727Z"
              stroke="currentColor"
              stroke-width="2"
              stroke-miterlimit="10"
              stroke-linecap="round"
              stroke-linejoin="round"
            ></path>
          </svg> */}
        </div>
      </div>
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
          {page.map((row, i) => {
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              height="16px"
              width="16px"
              viewBox="0 0 24 24"
              class="Box-sc-16r8icm-0 dLcfZ"
            >
              <path
                d="M16.4153 16.4153L20 20M18.5455 11.2727C18.5455 15.2893 15.2894 18.5454 11.2728 18.5454C7.25612 18.5454 4 15.2893 4 11.2727C4 7.2561 7.25612 4 11.2728 4C15.2894 4 18.5455 7.2561 18.5455 11.2727Z"
                stroke="currentColor"
                stroke-width="2"
                stroke-miterlimit="10"
                stroke-linecap="round"
                stroke-linejoin="round"
              ></path>
            </svg>;
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

      <div className="pagination">
        <span>
          Page{" "}
          <strong>
            {pageIndex + 1} out of {pageOptions.length}
          </strong>{" "}
        </span>
        {/* Go to page functionality */}
        {/* <span>
          |Go to page:{" "}
          <input
            type="number"
            defaultValue={pageIndex + 1}
            onChange={(e) => {
              const pageNumber = e.target.value
                ? Number(e.target.value) - 1
                : 0;
              gotoPage(pageNumber);
            }}
          />
        </span> */}
        <div>
          <button
            className="btn btn-primary"
            onClick={() => gotoPage(0)}
            disabled={!canPreviousPage}
          >
            {"«"}
          </button>
          <button
            className="btn btn-primary"
            onClick={() => previousPage()}
            disabled={!canPreviousPage}
          >
            {"« Prev page"}
          </button>
          <button
            className="btn btn-primary"
            onClick={() => nextPage()}
            disabled={!canNextPage}
          >
            {"Next page »"}
          </button>
          <button
            className="btn btn-primary"
            onClick={() => gotoPage(pageCount - 1)}
            disabled={!canNextPage}
          >
            {"»"}
          </button>
        </div>
        <div className="page-size">
          <span>Rows per page:</span>
          <select
            value={pageSize}
            onChange={(e) => setPageSize(Number(e.target.value))}
          >
            {[10, 25, 50].map((pageSize) => (
              <option key={pageSize} value={pageSize}>
                {pageSize}
              </option>
            ))}
          </select>
        </div>
      </div>
    </div>
  );
};
