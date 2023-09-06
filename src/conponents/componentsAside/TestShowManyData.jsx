import endpoint from '../../config';

import axios from 'axios';
import React, { useEffect, useState } from 'react';

import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

import EmployeesSelected from './EmployeesSelected';

function TestShowManyData() {
    const [searchWorkplaceId, setSearchWorkplaceId] = useState('');
    const [employeeId, setEmployeeId] = useState('');
    const [searchResult, setSearchResult] = useState([]);

    const endpoint = 'YOUR_API_ENDPOINT'; // Replace with your API endpoint

    async function handleSearch(event) {
        event.preventDefault();

        // get value from form search
        const data = {
            workplaceId: searchWorkplaceId,
            idCard: '',
            workPlace: '',
        };

        try {
            const response = await axios.post(endpoint + '/workplace/search', data);
            setSearchResult(response.data.workplace);

            if (response.data.workplace.length < 1) {
                alert('ไม่พบข้อมูล');
            } else {
                // Extract the list of matching employeeIds
                const matchingEmployeeIds = response.data.workplace.map(
                    (employee) => employee.employeeId
                );

                // Set search values
                setEmployeeId(matchingEmployeeIds.join(', '));

                setSearchWorkplaceId(searchWorkplaceId);
            }
        } catch (error) {
            alert('กรุณาตรวจสอบข้อมูลในช่องค้นหา');
        }
    }
    return (
        <div>
            <h1>Employee Search</h1>
            <form onSubmit={handleSearch}>
                <label>
                    Employee ID:
                    <input
                        type="text"
                        value={searchWorkplaceId}
                        onChange={(e) => setSearchWorkplaceId(e.target.value)}
                    />
                </label>
                <button type="submit">Search</button>
            </form>
            <h2>Search Results:</h2>
            <p>Employee ID: {employeeId}</p>
            <ul>
                {searchResult.map((employee) => (
                    <li key={employee.employeeId}>
                        Employee ID: {employee.employeeId}, Name: {employee.name}
                    </li>
                ))}
            </ul>
        </div>
    )
}

export default TestShowManyData