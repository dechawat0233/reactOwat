import endpoint from '../../config';

import axios from 'axios';
import React, { useEffect, useState } from 'react';

import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

import EmployeesSelected from './EmployeesSelected';

function Salary() {
    const [storedEmp, setStoredEmp] = useState([]);
    const [newEmp, setNewEmp] = useState(true);
    const [employeeselection  , setEmployeeselection  ] = useState([]);



        //employee data
        const [employeeId, setEmployeeId] = useState('');
        const [position, setPosition] = useState(''); //ตำแหน่ง
        const [department, setDepartment] = useState(''); //แผนก
        const [workplace, setWorkplace] = useState(''); //หน่วยงาน
        const [costtype , setCosttype] = useState(''); //ลงบัญชีเป็นค่าใช้จ่าย
        const [worktable , setWorktable] = useState(''); //ตารางงาน
        const [workexcept , setWorkexcept] = useState(''); //ผู้อนุมัต
        const [worktimerecord , setWorktimerecord ] = useState(''); //ผู้บันทึกเวลา
        const [workrecord , setWorkrecord] = useState(''); //ผู้บันทึกข้อมูลแทน

        const [jobtype, setJobtype] = useState(''); //ประเภทการจ้าง
        const [startjob, setStartjob] = useState(''); //วันที่เริ่มงาน
        const [exceptjob, setExceptjob] = useState(''); //วันที่บรรจุ
        const [startcount , setStartcount] = useState(''); //วันที่บรรจุ
        const [salary , setSalary] = useState(''); //อัตราเงินเดือน
        const [salarytype , setSalarytype] = useState(''); //อัตราเงินเดือน
        const [salaryupdate , setSalaryupdate] = useState(''); //เงินเดือนปรับเมื่อ
        const [salaryout , setSalaryout] = useState(''); //เงินเดือนปรับเมื่อ


        const [prefix, setPrefix] = useState(''); //นำหน้าชื่อ
        const [name, setName] = useState(''); //ชื่อ
        const [lastName, setLastName] = useState(''); //นามสกุล
        const [nickName, setNickName] = useState(''); //ชื่อเล่น
        const [gender, setGender] = useState(''); //เพศ
        const [idCard, setIdCard] = useState(''); //บัตรประชาชน
        const [copyAddress, setCopyAddress] = useState(false);

        
         const handleWorkplace = (event) => {
            setWorkplace(event.target.value);
        };

        const handleWorktable= (event) => {
            setWorktable(event.target.value);
        };
        
        const handleWorkexcept= (event) => {
            setWorkexcept(event.target.value);
        };

        const handleWorktimerecord= (event) => {
            setWorktimerecord(event.target.value);
        };


        const handleSalarytype= (event) => {
            setSalarytype(event.target.value);
        };
        const handleSalaryupdate= (event) => {
            setSalaryupdate(event.target.value);
        };
        const handleSalaryout= (event) => {
            setSalaryout(event.target.value);
        };

        const handleJobtype = (event) => {
            setJobtype(event.target.value);
        };
        const handlePrefix = (event) => {
            setPrefix(event.target.value);
        };
        const handleGender = (event) => {
            setGender(event.target.value);
        };
        const handleMilitaryStatus = (event) => {
            setMilitaryStatus(event.target.value);
        };
    
        const handleStartDateChange = (date) => {
            setStartjob(date);
        };
        const handleExceptDateChange = (date) => {
            setExceptjob(date);
        };
        const handleStartcount= (date) => {
            setStartcount(date);
        };

        const handleDateOfBirth = (date) => {
            setDateOfBirth(date);
        };
    
        //check create employee or update employee by click select employee
        // useEffect(() => {
        //     // setNewEmp(true);
        //     if (employeeselection.length >0 ) {
        //         setNewEmp(true);
        //     } else{
        //         setNewEmp(false);
        //     }
    
        // }, [employeeselection]);
    
    
        function onEmployeeSelect(empSelect){
            // alert(empSelect.dateOfBirth);
            // setEmployeeselection(empSelect);
                setEmployeeId(empSelect.employeeId);
            // setPosition(empSelect.position);
            // setDepartment(empSelect.department);
            // setWorkplace(empSelect.workplace);
            // setJobtype(empSelect.jobtype);
            // setStartjob( new Date(empSelect.startjob) );
            // setExceptjob(new Date(empSelect.exceptjob));
            // setPrefix(empSelect.prefix);
            // setName(empSelect.name);
            // setLastName(empSelect.lastName);
            // setNickName(empSelect.nickName);
            // setGender(empSelect.gender);
            
            // setIdCard(empSelect.idCard);
            
            }
            
                
    return (
        <body class="hold-transition sidebar-mini">
            <div class="wrapper">
                <div class="content-wrapper">
                    {/* <!-- Content Header (Page header) --> */}
                    <ol class="breadcrumb">
                        <li class="breadcrumb-item"><i class="fas fa-home"></i> <a href="index.php">หน้าหลัก</a></li>
                        <li class="breadcrumb-item"><a href="#"> ระบบบริหารจัดการข้อมูล</a></li>
                        <li class="breadcrumb-item active">ข้อมูลเงินเดือน</li>
                    </ol>
                    <div class="content-header">
                        <div class="container-fluid">
                            <div class="row mb-2">
                                <h1 class="m-0"><i class="far fa-arrow-alt-circle-right"></i> ข้อมูลเงินเดือน</h1>
                            </div>
                        </div>
                    </div>
                    {/* <!-- /.content-header -->
                    <!-- Main content --> */}
                    <section class="content">
                        <div class="container-fluid">
                            <form action="">
                                <h2 class="head-title">ข้อมูลพนักงาน</h2>
                                <h2 class="title">สังกัดหน่วยงาน</h2>
                                <div class="row">
                                    <div class="col-md-9">
                                        <section class="Frame">
                                            <div class="col-md-12">
                                                <div class="row">
                                                    <div class="col-md-4">
                                                        <div class="form-group">
                                                            <label role="employeeId">รหัสพนักงาน</label>
                                                            <input type="text" class="form-control" id="employeeId" placeholder="รหัสพนักงาน" value={employeeId} onChange={(e) => setEmployeeId(e.target.value)} />
                                                        </div>
                                                    </div>
                                                    <div class="col-md-4">
                                                        <div class="form-group">
                                                            <label role="position">ตำแหน่ง</label>
                                                            <input type="text" class="form-control" id="position" placeholder="ตำแหน่ง" value={position} onChange={(e) => setPosition(e.target.value)} />
                                                        </div>
                                                    </div>
                                                    <div class="col-md-4">
                                                        <div class="form-group">
                                                            <label role="department">แผนก</label>
                                                            <input type="text" class="form-control" id="department" placeholder="แผนก" value={department} onChange={(e) => setDepartment(e.target.value)} />
                                                        </div>
                                                    </div>
                                                </div>
                                                <div class="row">
                                                    <div class="col-md-4">
                                                        <div class="form-group">
                                                            <label role="workplace">หน่วยงาน</label>
                                                            <select id="workplace" name="workplace" class="form-control"
                                                                value={workplace} onChange={handleWorkplace}>
                                                                                                                                    <option value="ยังไม่มีหน่วยงาน">ยังไม่มีหน่วยงาน</option>
                                                                <option value="บริษัท ไทย เอ็นโอเค จำกัด (โรงงานบางประกง)">บริษัท ไทย เอ็นโอเค จำกัด (โรงงานบางประกง)</option>
                                                                <option value="Gulf สำนักงานใหญ่">Gulf สำนักงานใหญ่</option>
                                                            </select>
                                                        </div>
                                                    </div>
                                                    <div class="col-md-4">
                                                        <div class="form-group">
                                                            <label role="jobtype">ประเภทการจ้าง</label>
                                                            <select id="jobtype" name="jobtype" class="form-control"
                                                                value={jobtype} onChange={handleJobtype}>
                                                                <option value="ประจำ">ประจำ</option>
                                                                <option value="ไม่ประจำ">ไม่ประจำ</option>
                                                                <option value="รายวัน">รายวัน</option>
                                                                <option value="รายครั้ง">รายครั้ง</option>
                                                            </select>
                                                        </div>
                                                    </div>
                                                    <div class="col-md-4">
                                                        <div class="form-group">
                                                            <label role="costtype">ลงบัญชีเป็นค่าใช้จ่าย</label>
                                                            <div class="" style={{ marginTop: "10px" }}>
                                                                <div class="icheck-primary d-inline">
                                                                    <input type="radio" id="costtype" name="costtype" value="ทางตรง" checked={costtype === "ทางตรง"} onChange={() => setCosttype("ทางตรง")}
        /> ทางตรง
                                                                </div>
                                                                <div class="icheck-primary d-inline">
                                                                <input type="radio" id="costtype" name="costtype" value="ทางอ้อม" checked={costtype === "ทางอ้อม"} onChange={() => setCosttype("ทางอ้อม")}
        /> ทางอ้อม
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                                {/* <!--row--> */}
                                            </div>
                                        </section>
                                    </div>
                                    <div class="col-md-3">
                                        <section class="Frame">
                                        <EmployeesSelected onEmployeeSelect={onEmployeeSelect} />
                                            </section>

                                    </div>
                                </div>
                                {/* <!--Frame--> */}
                                <h2 class="title">ระบบบันทึกเวลาและระบบลา</h2>
                                <div class="row">
                                    <div class="col-md-9">
                                        <section class="Frame">
                                            <div class="col-md-12">
                                                <div class="row">
                                                    <div class="col-md-4">
                                                        <div class="form-group">
                                                            <label role="worktable">ตารางงาน</label>
                                                            <select id="worktable" name="worktable" class="form-control"
                                                                value={worktable} onChange={handleWorktable}>
                                                                <option value="ไม่ระบุ">ไม่ระบุ</option>
                                                            </select>

                                                        </div>
                                                    </div>
                                                    <div class="col-md-4">
                                                        <div class="form-group">
                                                            <label role="workexcept">ผู้อนุมัติ</label>
                                                            <select id="workexcept" name="workexcept" class="form-control"
                                                                value={workexcept} onChange={handleWorkexcept}>
                                                                <option value="ไม่ระบุ">ไม่ระบุ</option>
                                                            </select>
                                                        </div>
                                                    </div>
                                                    <div class="col-md-4">
                                                        <div class="form-group">
                                                            <label role="worktimerecord">ผู้บันทึกเวลา</label>
                                                            <select id="worktimerecord" name="worktimerecord" class="form-control"
                                                                value={worktimerecord} onChange={handleWorktimerecord}>
                                                                <option value="บันทึกผ่านเว็บ">บันทึกผ่านเว็บ</option>
                                                            </select>

                                                        </div>
                                                    </div>
                                                </div>
                                                {/* <!--row--> */}
                                                <div class="row"><h2 class="title">สถานที่ปฏิบัติงาน</h2></div>
                                                <div class="row">
                                                    <div class="col-md-4">
                                                        <div class="form-group">
                                                        <label role="jobtype">ประเภทการจ้าง</label>
                                                            <select id="jobtype" name="jobtype" class="form-control"
                                                                value={jobtype} onChange={handleJobtype}>
                                                                <option value="ประจำ">ประจำ</option>
                                                                <option value="ไม่ประจำ">ไม่ประจำ</option>
                                                                <option value="รายวัน">รายวัน</option>
                                                                <option value="รายครั้ง">รายครั้ง</option>
                                                            </select>

                                                        </div>
                                                    </div>
                                                    <div class="col-md-4">
                                                        <div class="form-group">
                                                        <label role="workplace">หน่วยงาน</label>
                                                            <select id="workplace" name="workplace" class="form-control"
                                                                value={workplace} onChange={handleWorkplace}>
                                                                <option value="บริษัท ไทย เอ็นโอเค จำกัด (โรงงานบางประกง)">บริษัท ไทย เอ็นโอเค จำกัด (โรงงานบางประกง)</option>
                                                                <option value="Gulf สำนักงานใหญ่">Gulf สำนักงานใหญ่</option>
                                                            </select>

                                                        </div>
                                                    </div>
                                                    <div class="col-md-4">
                                                        <div class="form-group">
                                                            <label role="workrecord">ผู้บันทึกข้อมูลแทน</label>
                                                            <input type="text" class="form-control" id="workrecord" placeholder="ผู้บันทึกข้อมูลแทน" value={workrecord} onChange={(e) => setWorkrecord(e.target.value)} />

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
                                <div class="row">
                                    <div class="col-md-9">
                                        <section class="Frame">
                                            <div class="row">
                                                <div class="col-md-6">
                                                    <div class="row">
                                                        <h2 class="title">วันที่เริ่มงาน</h2>
                                                    </div>
                                                    <div class="form-group row">

                                                    <label role="startjob">วันที่เริ่มงาน</label>
                                                            <div style={{ position: 'relative', zIndex: 9999 }}>
                                                                <DatePicker id="startjob" name="startjob"
                                                                    className="form-control" // Apply Bootstrap form-control class
                                                                    popperClassName="datepicker-popper" // Apply custom popper class if needed
                                                                    selected={startjob}
                                                                    onChange={handleStartDateChange}
                                                                    dateFormat="dd/MM/yyyy" />
                                                            </div>

                                                        {/* <label class="col-sm-3 col-form-label">วันที่เริ่มงาน</label>
                                                        <div class="col-sm-9">
                                                            <div class="input-group date" id="reservationdate" data-target-input="nearest">
                                                                <input type="text" class="form-control datetimepicker-input" data-target="#reservationdate" value="28/11/2022" />
                                                                <div class="input-group-append" data-target="#reservationdate" data-toggle="datetimepicker">
                                                                    <div class="input-group-text"><i class="fa fa-calendar-alt"></i></div>
                                                                </div>
                                                            </div>
                                                        </div> */}

                                                    </div>
                                                    <div class="form-group row">
                                                    <label role="exceptjob">วันที่บรรจุ</label>
                                                            <div style={{ position: 'relative', zIndex: 9999 }}>
                                                                <DatePicker id="exceptjob" name="exceptjob"
                                                                    className="form-control" // Apply Bootstrap form-control class
                                                                    popperClassName="datepicker-popper" // Apply custom popper class if needed
                                                                    selected={exceptjob}
                                                                    onChange={handleExceptDateChange}
                                                                    dateFormat="dd/MM/yyyy" />
                                                            </div>

                                                        {/* <label class="col-sm-3 col-form-label">วันที่บรรจุ</label>
                                                        <div class="col-sm-9">
                                                            <div class="input-group date" id="reservationdate" data-target-input="nearest">
                                                                <input type="text" class="form-control datetimepicker-input" data-target="#reservationdate" value="01/12/2022" />
                                                                <div class="input-group-append" data-target="#reservationdate" data-toggle="datetimepicker">
                                                                    <div class="input-group-text"><i class="fa fa-calendar-alt"></i></div>
                                                                </div>
                                                            </div>
                                                        </div> */}

                                                    </div>
                                                    <div class="form-group row">
                                                    <label role="startcount">วันที่เริ่มต้นคำนวณ</label>
                                                            <div style={{ position: 'relative', zIndex: 9999 }}>
                                                                <DatePicker id="startcount" name="startcount"
                                                                    className="form-control" // Apply Bootstrap form-control class
                                                                    popperClassName="datepicker-popper" // Apply custom popper class if needed
                                                                    selected={startcount}
                                                                    onChange={handleStartcount}
                                                                    dateFormat="dd/MM/yyyy" />
                                                            </div>

                                                        {/* <label class="col-sm-3 col-form-label">วันที่เริ่มต้นคำนวณ</label>
                                                        <div class="col-sm-9">
                                                            <div class="input-group date" id="reservationdate" data-target-input="nearest">
                                                                <input type="text" class="form-control datetimepicker-input" data-target="#reservationdate" value="15/12/2022" />
                                                                <div class="input-group-append" data-target="#reservationdate" data-toggle="datetimepicker">
                                                                    <div class="input-group-text"><i class="fa fa-calendar-alt"></i></div>
                                                                </div>
                                                            </div>
                                                        </div> */}

                                                    </div>
                                                </div>
                                                {/* <!--col-md-6--> */}
                                                <div class="col-md-6">
                                                    <div class="row">
                                                        <h2 class="title">เงินเดือนปัจจุบัน</h2>
                                                    </div>
                                                    <div class="form-group row">
                                                        <label role="salary" class="col-sm-2 col-form-label">*อัตรา</label>
                                                        <div class="col-sm-10">
                                                        <input type="text" class="form-control" id="salary" placeholder="จำนวนเงิน" value={salary} onChange={(e) => setSalary(e.target.value)} />
                                                            
                                                        </div>
                                                    </div>
                                                    <div class="form-group row">
                                                        <div class="col-md-8">
                                                            <div class="row">
                                                                <label role="salarytype" class="col-sm-3 col-form-label">*ต่อ</label>
                                                                <div class="col-sm-9">
                                                                <select id="salarytype" name="salarytype" class="form-control"
                                                                value={salarytype} onChange={handleSalarytype}>
                                                                <option value="ต่อวัน">ต่อวัน</option>
                                                                <option value="ต่อเดือน">ต่อเดือน</option>
                                                            </select>

                                                                    {/* <select class="form-control">
                                                                        <option>ต่อวัน</option>
                                                                        <option></option>
                                                                        <option></option>
                                                                    </select> */}
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div class="col-md-4">
                                                            <div class="row">
                                                                <label class="col-sm-5 col-form-label">สกุลเงิน</label>
                                                                <div class="col-sm-7">
                                                                    <select class="form-control">
                                                                        <option>บาท</option>
                                                                        <option></option>
                                                                        <option></option>
                                                                    </select>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div class="form-group row">
                                                        <label role="salaryupdate" class="col-sm-3 col-form-label">วันที่ปรับปรุง</label>
                                                        <div class="col-sm-9">

                                                        <div style={{ position: 'relative', zIndex: 9999 }}>
                                                                <DatePicker id="salaryupdate" name="salaryupdate"
                                                                    className="form-control" // Apply Bootstrap form-control class
                                                                    popperClassName="datepicker-popper" // Apply custom popper class if needed
                                                                    selected={salaryupdate}
                                                                    onChange={handleSalaryupdate}
                                                                    dateFormat="dd/MM/yyyy" />
                                                            </div>

                                                            {/* <div class="input-group date" id="reservationdate" data-target-input="nearest">
                                                                <input type="text" class="form-control datetimepicker-input" data-target="#reservationdate" value="30/01/2023" />
                                                                <div class="input-group-append" data-target="#reservationdate" data-toggle="datetimepicker">
                                                                    <div class="input-group-text"><i class="fa fa-calendar-alt"></i></div>
                                                                </div>
                                                            </div> */}

                                                        </div>
                                                    </div>
                                                </div>
                                                {/* <!--col-md-6--> */}
                                            </div>
                                            {/* <!--row--> */}
                                            <div class="form-group row">
                                                <label role="salaryout" class="col-sm-1">งวดจ่ายเงิน</label>
                                                <div class="col-sm-9">

                                                <select id="salaryout" name="salaryout" class="form-control"
                                                                value={salaryout} onChange={handleSalaryout}>
                                                                <option value="เดือน">เดือน</option>
                                                                <option value="ครึ่งเดือน">ครึ่งเดือน</option>
                                                                <option value="สัปดาห์">สัปดาห์</option>
                                                                <option value="สัปดาห์">10 วัน</option>
                                                                <option value="สัปดาห์">งวดพิเศษ</option>

                                                            </select>

                                                    {/* <div class="icheck-primary d-inline">
                                                        <input type="radio" id="" name="" checked="" /> เดือน
                                                    </div>
                                                    <div class="icheck-primary d-inline">
                                                        <input type="radio" id="" name="" />  ครึ่งเดือน
                                                    </div>
                                                    <div class="icheck-primary d-inline">
                                                        <input type="radio" id="" name="" checked="" /> สัปดาห์
                                                    </div>
                                                    <div class="icheck-primary d-inline">
                                                        <input type="radio" id="" name="" />  งวดพิเศษ
                                                    </div>
                                                    <div class="icheck-primary d-inline">
                                                        <input type="radio" id="" name="" />  10 วัน
                                                    </div> */}

                                                </div>
                                            </div>
                                            {/* <!--row--> */}
                                            <div class="form-group row">
                                                <label class="col-sm-4">วิธีจ่ายเงิน</label>
                                                <div class="col-sm-9">
                                                    <div class="icheck-primary d-inline">
                                                        <input type="radio" id="" name="" checked="" /> เงินสด
                                                    </div>
                                                    <div class="icheck-primary d-inline">
                                                        <input type="radio" id="" name="" />  โอนผ่านธนาคาร
                                                    </div>
                                                </div>
                                            </div>
                                            {/* <!--row--> */}
                                            <div class="row">
                                                <div class="col-md-6">
                                                    <div class="form-group row">
                                                        <label class="col-sm-3 col-form-label">ชื่อธนาคาร</label>
                                                        <div class="col-sm-9">
                                                            <select class="form-control">
                                                                <option>กสิกรไทย</option>
                                                                <option>กสิกรไทย</option>
                                                                <option>กสิกรไทย</option>
                                                            </select>
                                                        </div>
                                                    </div>
                                                </div>
                                                {/* <!--col-md-6--> */}
                                                <div class="col-md-6">
                                                    <div class="form-group row">
                                                        <label class="col-sm-2 col-form-label">เลขที่บัญชี</label>
                                                        <div class="col-sm-10">
                                                            <input type="" class="form-control" id="" placeholder="เลขที่บัญชี" value="6972152992" />
                                                        </div>
                                                    </div>
                                                </div>
                                                {/* <!--col-md-6--> */}
                                            </div>
                                            {/* <!--row--> */}
                                        </section>
                                        {/* <!--Frame--> */}
                                    </div>
                                </div>
                                <h2 class="title">ช่องเงินพิเศษ</h2>
                                <div class="row">
                                    <div class="col-md-9">
                                        <section class="Frame">
                                            <div class="col-md-12">
                                                <div class="row">
                                                    <div class="col-md-4">
                                                        <div class="form-group">
                                                            <label>ตารางงาน</label>
                                                            <select class="form-control">
                                                                <option>ไม่กำหนด</option>
                                                                <option></option>
                                                                <option></option>
                                                            </select>
                                                        </div>
                                                    </div>
                                                    <div class="col-md-4">
                                                        <div class="form-group">
                                                            <label>ผู้อนุมัติ</label>
                                                            <select class="form-control">
                                                                <option>ไม่ได้ใช้งาน</option>
                                                                <option></option>
                                                                <option></option>
                                                            </select>
                                                        </div>
                                                    </div>
                                                    <div class="col-md-4">
                                                        <div class="form-group">
                                                            <label>ผู้บันทึกเวลา</label>
                                                            <select class="form-control">
                                                                <option>บันทึกผ่านเว็บ</option>
                                                                <option></option>
                                                                <option></option>
                                                            </select>
                                                        </div>
                                                    </div>
                                                </div>
                                                {/* <!--row--> */}
                                                <div class="row"><h2 class="title">สถานที่ปฎิบัติงานประจำ</h2></div>
                                                <div class="row">
                                                    <div class="col-md-4">
                                                        <div class="form-group">
                                                            <label>ประเภทการจ้าง</label>
                                                            <select class="form-control">
                                                                <option>รายวัน</option>
                                                                <option></option>
                                                                <option></option>
                                                            </select>
                                                        </div>
                                                    </div>
                                                    <div class="col-md-4">
                                                        <div class="form-group">
                                                            <label>เป็นหน่วยงาน</label>
                                                            <select class="form-control">
                                                                <option>ไม่จำกัด</option>
                                                                <option></option>
                                                                <option></option>
                                                            </select>
                                                        </div>
                                                    </div>
                                                    <div class="col-md-4">
                                                        <div class="form-group">
                                                            <label>ผู้บันทึกข้มูลแทน</label>
                                                            <select class="form-control">
                                                                <option>บันทึกผ่านเว็บ</option>
                                                                <option></option>
                                                                <option></option>
                                                            </select>
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
                                <div class="line_btn">
                                    <button type="submit" class="btn b_save"><i class="nav-icon fas fa-save"></i> &nbsp;บันทึก</button>
                                    <button type="reset" class="btn clean"><i class="far fa-window-close"></i> &nbsp;ยกเลิก</button>
                                </div>
                            </form>
                        </div>
                        {/* <!-- /.container-fluid --> */}
                    </section>
                    {/* <!-- /.content --> */}
                </div>
            </div>
        </body>
    )
}

export default Salary