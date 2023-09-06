import endpoint from '../../config';

import axios from 'axios';
import React, { useEffect, useState } from 'react';

import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

import EmployeesSelected from './EmployeesSelected';
import TestJson from './Testjson.json';

function TestShowManyData() {

    console.log(TestJson);

    // Define the columns for your table
    const columns = React.useMemo(
        () => [
            {
                Header: 'Workplace Name',
                accessor: 'workplaceName',
            },
            {
                Header: 'Date',
                accessor: 'date',
            },
            {
                Header: 'Shift',
                accessor: 'employeeRecord[0].shift', // Assuming you want the shift from the first employeeRecord item
            },
            {
                Header: 'OT Time',
                accessor: 'employeeRecord[0].otTime', // Assuming you want the OT time from the first employeeRecord item
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
        data: TestJson, // Pass the JSON data to the table
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
    )
}

export default TestShowManyData