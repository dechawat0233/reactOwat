import React from 'react';
import TestJson from './Testjson.json';
import { useTable } from 'react-table';


function TestShowManyData() {
  // Filter the data for the desired workplaceId (e.g., "9999")
  const filteredData = TestJson.filter((item) => item.workplaceId === '9999');

  // Create an array to hold the data for the table
  const tableData = [];

  // Extract employee records from the filtered data
  filteredData.forEach((item) => {
    item.employeeRecord.forEach((record) => {
      const staffId = record.staffId;
      const staffName = record.staffName;
      const shift = record.shift;

      // Create a new object representing a row in the table
      const rowData = {
        staffId,
        staffName,
        shift,
      };

      // Push the row data into the tableData array
      tableData.push(rowData);
    });
  });

  // Define the columns for your table
  const columns = React.useMemo(
    () => [
      {
        Header: 'staffId',
        accessor: 'staffId',
      },
      {
        Header: 'staffName',
        accessor: 'staffName',
      },
      {
        Header: 'shift',
        accessor: 'shift',
      },
    ],
    []
  );

  // Create a table instance
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
  } = useTable({
    columns,
    data: tableData, // Use the transformed tableData
  });

  return (
    <div>
      <h1>Table from JSON Data</h1>
      <table {...getTableProps()} className="table">
        <thead>
          {headerGroups.map((headerGroup) => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map((column) => (
                <th {...column.getHeaderProps()}>{column.render('Header')}</th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps()}>
          {rows.map((row) => {
            prepareRow(row);
            return (
              <tr {...row.getRowProps()}>
                {row.cells.map((cell) => {
                  return <td {...cell.getCellProps()}>{cell.render('Cell')}</td>;
                })}
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

export default TestShowManyData;
