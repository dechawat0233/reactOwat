// import React from 'react'
import endpoint from '../../../config';

import axios from 'axios';
import React, { useEffect, useState } from 'react';

import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

import EmployeesSelected from './../EmployeesSelected';
import Calendar from 'react-calendar';
import '../../editwindowcss.css';
import EmployeeWorkDay from '../componentsetting/EmployeeWorkDay';
function Salaryresult() {

  const tableStyle = {
    borderCollapse: 'collapse',
    width: '100%',
  };

  const cellStyle = {
    border: '1px solid black',
    padding: '8px',
    textAlign: 'center',
  };

  const headerCellStyle = {
    ...cellStyle,
    backgroundColor: '#f2f2f2',
  };


  const [searchWorkplaceId, setSearchWorkplaceId] = useState(''); //รหัสหน่วยงาน
  const [searchWorkplaceName, setSearchWorkplaceName] = useState(''); //ชื่อหน่วยงาน
  const [searchResult, setSearchResult] = useState([]);
  const [employeeListResult, setEmployeeListResult] = useState([]);
  const [newWorkplace, setNewWorkplace] = useState(true);


  return (
    // <div>

    // </div>
    // <div>
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
          <section class="content">
            <div class="container-fluid">
              <h2 class="title">ตั้งค่าหน่วยงาน</h2>
              <section class="Frame">
                <div class="col-md-12">
                  <form >
                    <div class="row">
                      <div class="col-md-6">
                        <div class="form-group">
                          <label role="searchWorkplaceId">รหัสหน่วยงาน</label>
                          <input type="text" class="form-control" id="searchWorkplaceId" placeholder="รหัสหน่วยงาน" value={searchWorkplaceId} onChange={(e) => setSearchWorkplaceId(e.target.value)} />
                        </div>
                      </div>
                      <div class="col-md-6">
                        <div class="form-group">
                          <label role="searchWorkplaceName">ชื่อหน่วยงาน</label>
                          <input type="text" class="form-control" id="searchWorkplaceName" placeholder="ชื่อหน่วยงาน" value={searchWorkplaceName} onChange={(e) => setSearchWorkplaceName(e.target.value)} />
                        </div>
                      </div>
                    </div>
                    <div class="d-flex justify-content-center">
                      <button class="btn b_save"><i class="nav-icon fas fa-search"></i> &nbsp; ค้นหา</button>
                    </div>
                  </form>
                  <br />
                  <div class="d-flex justify-content-center">
                    <h2 class="title">ผลลัพธ์ {searchResult.length} รายการ</h2>
                  </div>
                </div>
              </section>
              <h2 class="title">ตั้งค่าหน่วยงาน</h2>
              <section class="Frame">
                <div class="row">
                  <div class="col-md-8">
                    <table border="1" style={tableStyle}>
                      <thead>
                        <tr>
                          <th style={headerCellStyle}>รวมวันทำงาน</th>
                          <th style={headerCellStyle}>รวมชั่วโมงทำงาน</th>
                          <th style={headerCellStyle}>รวใชั่วโมงOT</th>

                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td style={cellStyle}>25</td>
                          <td style={cellStyle}>205</td>
                          <td style={cellStyle}>50</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
                <br />
                <div class="row">
                  <div class="col-md-12">
                    <table border="1" style={tableStyle}>
                      <thead>
                        <tr>
                          <th style={headerCellStyle}>เงินค่าจ้างปกติ</th>
                          <th style={headerCellStyle}>เงินค่าล่วงเวลา</th>
                          <th style={headerCellStyle}>เงินเพิ่มพิเศษ</th>
                          <th style={headerCellStyle}>เงินบวกอื่นๆ</th>
                          <th style={headerCellStyle}>รวมเงินได้</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          {/* <td>325</td>
                          <td>168</td>
                          <td>50</td>
                          <td>205</td>
                          <td>50</td> */}
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
                <br/>

                <div class="row">
                  <div class="col-md-12">
                    <table border="1" style={tableStyle}>
                      <thead>
                        <tr>
                          <th style={headerCellStyle}>หักภาษี</th>
                          <th style={headerCellStyle}>หักประกันสังคม</th>
                          <th style={headerCellStyle}>ธรรมเนียมธนาคาร</th>
                          <th style={headerCellStyle}>หักอื่นๆ</th>
                          <th style={headerCellStyle}>รวมเงินหัก</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          {/* <td>25</td>
                          <td>205</td>
                          <td>50</td> */}
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
<br/>
                <div class="row">
                  <div class="col-md-8">
                    <table border="1" style={tableStyle}>
                      <thead>
                        <tr>
                          <th style={headerCellStyle}>รวมเงินได้</th>
                          <th style={headerCellStyle}>รวมเงินหัก</th>
                          <th style={headerCellStyle}>เงิรสุทธิ</th>

                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          {/* <td>25</td>
                          <td>205</td>
                          <td>50</td> */}
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              </section>
            </div>

          </section>
        </div>
      </div>
    </body>
  )
}

export default Salaryresult