import endpoint from '../../config';

import axios from 'axios';
import React, { useEffect, useState } from 'react';

import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

import EmployeesSelected from './EmployeesSelected';

// import { DayPilotCalendar, DayPilotNavigator } from "@daypilot/daypilot-lite-react";
// import "./CalendarStyles.css";
import Calendar from 'react-calendar';


function Setting() {
const [workplaceId , setWorkplaceId] = useState('');


    const [dailyrate, setDailyrate] = useState(''); //อัตราค่าจ้าง รายวัน   
    const [otrate, setOtrate] = useState(''); //อัตราค่าจ้าง OT รายชั่วโมง

    const [personemployees, setPersonemployees] = useState(''); //จำนวนพนักงานที่ปฏิบัติงาน
    const [holidaydaily, setHolidaydaily] = useState(''); //อัตราค่าจ้างวันหยุดนักขัตฤกษ์ รายวัน

    const [holidayhour, setHolidayhour] = useState(''); //อัตราค่าจ้างวันหยุดนักขัตฤกษ์ รายชั่วโมง
    return (

        <body class="hold-transition sidebar-mini">
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
                                    <div class="row">
                                        <div class="col-md-6">
                                            <div class="form-group">
                                                <label role="workplaceId">รหัสหน่วยงาน</label>
                                                <input type="text" class="form-control" id="workplaceId" placeholder="รหัสหน่วยงาน" value={workplaceId} />
                                            </div>
                                        </div>
                                        <div class="col-md-6">
                                            <div class="form-group">
                                                <label role="workplaceName">ชื่อหน่วยงาน</label>
                                                <input type="" class="form-control" id="" placeholder="ชื่อหน่วยงาน" />
                                            </div>
                                        </div>

                                    </div>
                                    <div class="row">
                                        <div class="col-md-6">
                                            <div class="form-group">
                                                <label>สถานที่ปฏิบัติงาน</label>
                                                <input type="" class="form-control" id="" placeholder="สถานที่ปฏิบัติงาน" />
                                            </div>
                                        </div>
                                        <div class="col-md-6">
                                            <div class="form-group">
                                                <label>จำนวนวันทำงาน</label>
                                                <input type="" class="form-control" id="" placeholder="จำนวนวันทำงาน" />
                                            </div>
                                        </div>

                                    </div>

                                </div>
                            </section>
                            {/* <!--Frame--> */}
                            <h2 class="title">เวลา เข้า-ออก งาน</h2>
                            <div class="row">
                                <div class="col-md-4">
                                    <section class="Frame">
                                        <label>กะเช้า</label>
                                        <div class="col-md-12">
                                            <div class="row">
                                                <div class="col-md-6">
                                                    <div class="form-group">
                                                        <label>เวลาเข้างาน</label>
                                                        <input type="" class="form-control" id="" placeholder="เวลาเข้างาน" />
                                                    </div>
                                                </div>
                                                <div class="col-md-6">
                                                    <div class="form-group">
                                                        <label>เวลาออกงาน</label>
                                                        <input type="" class="form-control" id="" placeholder="เวลาออกงาน" />
                                                    </div>
                                                </div>
                                            </div>
                                            {/* <!--row--> */}
                                        </div>
                                        {/* <!--col-md-12--> */}
                                    </section>
                                    {/* <!--Frame--> */}
                                </div>
                                <div class="col-md-4">
                                    <section class="Frame">
                                        <label>กะบ่าย</label>
                                        <div class="col-md-12">
                                            <div class="row">
                                                <div class="col-md-6">
                                                    <div class="form-group">
                                                        <label>เวลาเข้างาน</label>
                                                        <input type="" class="form-control" id="" placeholder="เวลาเข้างาน" />
                                                    </div>
                                                </div>
                                                <div class="col-md-6">
                                                    <div class="form-group">
                                                        <label>เวลาออกงาน</label>
                                                        <input type="" class="form-control" id="" placeholder="เวลาออกงาน" />
                                                    </div>
                                                </div>
                                            </div>
                                            {/* <!--row--> */}
                                        </div>
                                        {/* <!--col-md-12--> */}
                                    </section>
                                    {/* <!--Frame--> */}
                                </div>
                                <div class="col-md-4">
                                    <section class="Frame">
                                        <label>กะดึก</label>
                                        <div class="col-md-12">
                                            <div class="row">
                                                <div class="col-md-6">
                                                    <div class="form-group">
                                                        <label>เวลาเข้างาน</label>
                                                        <input type="" class="form-control" id="" placeholder="เวลาเข้างาน" />
                                                    </div>
                                                </div>
                                                <div class="col-md-6">
                                                    <div class="form-group">
                                                        <label>เวลาออกงาน</label>
                                                        <input type="" class="form-control" id="" placeholder="เวลาออกงาน" />
                                                    </div>
                                                </div>
                                            </div>
                                            {/* <!--row--> */}
                                        </div>
                                        {/* <!--col-md-12--> */}
                                    </section>
                                    {/* <!--Frame--> */}
                                </div>
                            </div>

                            <h2 class="title">เวลาทำงาน</h2>
                            <section class="Frame">
                                <div class="row">
                                    <div class="col-md-4">
                                        <div class="form-group">
                                            <label>ชั่วโมงทำงาน</label>
                                            <input type="" class="form-control" id="" placeholder="ชั่วโมงทำงาน" />
                                        </div>
                                    </div>
                                    <div class="col-md-4">
                                        <div class="form-group">
                                            <label>ชั่วโมง OT</label>
                                            <input type="" class="form-control" id="" placeholder="ชั่วโมง OT" />
                                        </div>
                                    </div>
                                    <div class="col-md-4">
                                        <div class="form-group">
                                            <label>ปฏิทินวันทำงาน</label>
                                            <input type="" class="form-control" id="" placeholder="ปฏิทินวันทำงาน" />
                                        </div>
                                    </div>
                                </div>
                            </section>
                            {/* <!--Frame--> */}

                            <h2 class="title">ค่าจ้าง</h2>
                            <section class="Frame">
                                <div class="row">
                                    <div class="col-md-4">
                                        <div class="form-group">
                                            <label>อัตราค่าจ้าง รายวัน</label>
                                            <input type="" class="form-control" id="" placeholder="อัตราค่าจ้าง รายวัน" value={dailyrate} onChange={(e) => setDailyrate(e.target.value)} />
                                        </div>
                                    </div>
                                    <div class="col-md-4">
                                        <div class="form-group">
                                            <label>อัตราค่าจ้าง OT รายชั่วโมง</label>
                                            <input type="" class="form-control" id="" placeholder="อัตราค่าจ้าง OT รายชั่วโมง" value={otrate} onChange={(e) => setOtrate(e.target.value)} />
                                        </div>
                                    </div>
                                    <div class="col-md-4">
                                        <div class="form-group">
                                            <label>จำนวนพนักงานที่ปฏิบัติงาน</label>
                                            <input type="" class="form-control" id="" placeholder="จำนวนพนักงานที่ปฏิบัติงาน" value={personemployees} onChange={(e) => setPersonemployees(e.target.value)} />
                                        </div>
                                    </div>
                                </div>
                                <div class="row">
                                    <div class="col-md-4">
                                        <div class="form-group">
                                            <label>อัตราค่าจ้างวันหยุดนักขัตฤกษ์ รายวัน</label>
                                            <input type="" class="form-control" id="" placeholder="อัตราค่าจ้างวันหยุดนักขัตฤกษ์ รายวัน" value={holidaydaily} onChange={(e) => setHolidaydaily(e.target.value)} />
                                        </div>
                                    </div>
                                    <div class="col-md-4">
                                        <div class="form-group">
                                            <label>อัตราค่าจ้างวันหยุดนักขัตฤกษ์ รายชั่วโมง</label>
                                            <input type="" class="form-control" id="" placeholder="อัตราค่าจ้างวันหยุดนักขัตฤกษ์ รายชั่วโมง" value={holidayhour} onChange={(e) => setHolidayhour(e.target.value)} />
                                        </div>
                                    </div>
                                </div>
                            </section>
                            {/* <!--Frame--> */}

                            <h2 class="title">ที่อยู่หน่วยงาน</h2>
                            <section class="Frame">
                                <div class="row">
                                    <div class="col-md-6">
                                        <div class="form-group">
                                            <label>ที่อยู่หน่วยงาน</label>
                                            <input type="" class="form-control" id="" placeholder="ที่อยู่หน่วยงาน" />
                                        </div>
                                    </div>
                                </div>
                            </section>
                            {/* <!--Frame--> */}
                            <div class="line_btn">
                                <button class="btn b_save"><i class="nav-icon fas fa-save"></i> &nbsp;บันทึก</button>
                                <button class="btn clean"><i class="far fa-window-close"></i> &nbsp;ยกเลิก</button>
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

export default Setting