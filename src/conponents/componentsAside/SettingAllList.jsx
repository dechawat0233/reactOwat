import endpoint from '../../config';

import axios from 'axios';
import React, { useEffect, useState } from 'react';

import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

import EmployeesSelected from './EmployeesSelected';
import Calendar from 'react-calendar';
import '../editwindowcss.css';
import EmployeeWorkDay from './componentsetting/EmployeeWorkDay';
import { Link } from 'react-router-dom';


function SettingAllList() {
    const [searchTerm, setSearchTerm] = useState('');
    const [workplaceList, setWorkplaceList] = useState([]);

    useEffect(() => {
        // Fetch data from the API when the component mounts
        fetch(endpoint + '/workplace/list')
            .then(response => response.json())
            .then(data => {
                // Update the state with the fetched data
                setWorkplaceList(data);
                // alert(data[0].workplaceName);
            })
            .catch(error => {
                console.error('Error fetching data:', error);
            });
    }, []); // The empty array [] ensures that the effect runs only once after the initial render

    const extractedData = workplaceList.map(item => ({
        workplaceId: item.workplaceId,
        workplaceName: item.workplaceName
    }));

    console.log(extractedData);

    const handleInputChange = (event) => {
        setSearchTerm(event.target.value);
    };

    // Filter the extracted data based on search term
    const filteredData = extractedData.filter(data =>
        data.workplaceId.toLowerCase().includes(searchTerm.toLowerCase()) ||
        data.workplaceName.toLowerCase().includes(searchTerm.toLowerCase())
    );

    filteredData.sort((a, b) => a.workplaceId.localeCompare(b.workplaceId));


    return (
        <body class="hold-transition sidebar-mini" className='editlaout'>
            <div class="wrapper">

                <div class="content-wrapper">
                    {/* <!-- Content Header (Page header) --> */}
                    <ol class="breadcrumb">
                        <li class="breadcrumb-item"><i class="fas fa-home"></i> <a href="index.php">หน้าหลัก</a></li>
                        <li class="breadcrumb-item"><a href="#"> การตั้งค่า</a></li>
                        <li class="breadcrumb-item active">ตั้งค่าหน่วยงาน</li>
                    </ol>
                    <div class="content-header">
                        <div class="container-fluid">
                            <div class="row mb-2">
                                <h1 class="m-0"><i class="far fa-arrow-alt-circle-right"></i> ตั้งค่าหน่วยงาน</h1>
                            </div>
                        </div>
                    </div>
                    {/* <!-- /.content-header -->
                    <!-- Main content --> */}
                    <section class="content">
                        <div class="container-fluid">
                            <h2 class="title">ตั้งค่าหน่วยงาน</h2>
                            <section class="Frame">
                                <div class="col-md-12">
                                    <form>
                                        {/* <h2>รายชื่อหน่วยงานทั้งหมด</h2>
                                        <ul>
                                            {extractedData.map((data, index) => (
                                                <li key={index}>
                                                    <strong>รหัส:</strong> {data.workplaceId}
                                                    <span> </span> {data.workplaceName}
                                                </li>
                                            ))}
                                        </ul> */}
                                        {/* Input for filtering */}
                                        <div className="row">
                                            <div className="col-md-6">
                                                <input
                                                    type="text"
                                                    className="form-control"
                                                    placeholder="Search..."
                                                    value={searchTerm}
                                                    onChange={handleInputChange}
                                                />
                                            </div>
                                        </div>
                                        <br />
                                        {/* Display filtered data */}
                                        <ul>
                                            {/* {filteredData.map((data, index) => (
                                                <li key={index}>
                                                    <strong>Workplace ID:</strong> {data.workplaceId},
                                                    <strong> Workplace Name:</strong> {data.workplaceName}
                                                </li>
                                            ))} */}
                                            {filteredData.map((data, index) => (
                                                <li key={index}>
                                                    <Link to={`/setting?workplaceId=${data.workplaceId}&workplaceName=${data.workplaceName}`}>
                                                        <strong>Workplace ID:</strong> {data.workplaceId},
                                                        <strong> Workplace Name:</strong> {data.workplaceName}
                                                    </Link>
                                                </li>
                                            ))}
                                        </ul>
                                    </form>
                                </div>
                            </section>
                        </div>
                    </section>
                </div>
            </div>
        </body>
    )
}

export default SettingAllList