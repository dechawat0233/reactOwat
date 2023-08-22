import endpoint from '../../config';

import axios from 'axios';
import React, { useEffect, useState } from 'react';

import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

import EmployeesSelected from './EmployeesSelected';

import AddsettimeWorkplace from './AddsettimeWorkplace';
import AddsettimeEmployee from './AddsettimeEmployee';
import '../editwindowcss.css';


function Addsettime() {
    const [selectedOption, setSelectedOption] = useState('workplace');

    const handleOptionChange = (event) => {
        setSelectedOption(event.target.value);
    };

    return (
        <body class="hold-transition sidebar-mini" className='editlaout'>
            <div class="wrapper">

                <div class="content-wrapper">
                    {/* <!-- Content Header (Page header) --> */}
                    <ol class="breadcrumb">
                        <li class="breadcrumb-item"><i class="fas fa-home"></i> <a href="index.php">หน้าหลัก</a></li>
                        <li class="breadcrumb-item active">ระบบลงเวลา</li>
                    </ol>
                    <div class="content-header">
                        <div class="container-fluid">
                            <div class="row mb-2">
                                <h1 class="m-0"><i class="far fa-arrow-alt-circle-right"></i> ระบบบันทึกเวลาการทำงานของพนักงาน</h1>
                            </div>
                        </div>
                    </div>
                    {/* <!-- /.content-header -->
                    <!-- Main content --> */}

                    <section class="content">
                        <div class="row">
                            <div class="col-md-12">
                                <div class="container-fluid">
                                    <h2 class="title">ข้อมูลการลงเวลาทำงานของพนักงาน</h2>
                                    <div class="row">
                                        <div class="col-md-12">
                                        </div>
                                    </div>
                                    <div class="col-md-12">
                                        <div class="row">
                                            <div class="col-md-4">
                                                <div class="form-group">
                                                    <label role="formsettime">รูปแบบการลงเวลา</label>
                                                    <select id="selectOption" class="form-control" vvalue={selectedOption} onChange={handleOptionChange}>
                                                        <option value="workplace">รูปแบบหน่วยงาน</option>
                                                        <option value="employee">รูปแบบบุคคล</option>
                                                    </select>


                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    {/* {selectedOption && (
                                        <div>
                                            {formToShow}
                                        </div>
                                    )} */}
                                    {selectedOption === 'workplace' && <AddsettimeWorkplace />}
                                    {selectedOption === 'employee' && <AddsettimeEmployee />}
                                </div>
                            </div>
                        </div>
                        {/* <!-- /.container-fluid --> */}
                    </section>
                    {/* <!-- /.content --> */}
                </div>
            </div>
        </body>
    )
}

export default Addsettime