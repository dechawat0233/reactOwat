import endpoint from '../../config';

import axios from 'axios';
import React, { useEffect, useState } from 'react';

import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";

function Employee() {
    const [storedEmp , setStoredEmp ] = useState([]);
    const [ newEmp , setNewEmp ] = useState(true);

    //employee data
    const [ employeeId , setEmployeeId ] = useState('');
const [position , setPosition ] = useState(''); //ตำแหน่ง
const [ department , setDepartment] = useState(''); //แผนก
const [ workplace , setWorkplace ] = useState(''); //หน่วยงาน
const [ jobtype , setJobtype] = useState(''); //ประเภทการจ้าง
const [ startjob , setStartjob] = useState(''); //วันที่เริ่มงาน
const [ exceptjob , setExceptjob] = useState(''); //วันที่บรรจุ
const [prefix , setPrefix] = useState(''); //นำหน้าชื่อ
const [name, setName] = useState(''); //ชื่อ
const [lastName , setLastName] = useState(''); //นามสกุล
const [nickName , setNickName] = useState(''); //ชื่อเล่น
const [gender , setGender] = useState(''); //เพศ
const [dateOfBirth , setDateOfBirth] = useState(''); //วดป เกิด
const [age, setAge] = useState(''); //อายุ
const [idCard, setIdCard] = useState(''); //บัตรประชาชน
const [ethnicity, setEthnicity] = useState(''); //เชื้อชาติ
const [religion, setReligion] = useState(''); //ศาสนา
const [maritalStatus, setMaritalStatus] = useState(''); //สถานภาพการสมรส
const [militaryStatus, setMilitaryStatus] = useState(''); //สถานภาพทางการทหาร
const [address , setAddress] = useState(''); //ที่อยู่ตามบัตรประชาชน
const [currentAddress , setCurrentAddress] = useState(''); //ที่อยู่ปัจจุบัน
const [phoneNumber, setPhoneNumber] = useState(''); //เบอร์โทรศัพท์
const [emergencyContactNumber, setEmergencyContactNumber] = useState(''); //เบอร์ติดต่อกรณีฉุกเฉิน
const [idLine, setIdLine] = useState(''); //ไอดีไลน์
const [vaccination , setVaccination] = useState(''); //การรับวัคซีน
const [treatmentRights , setTreatmentRights] = useState(''); //สิทธิการรักษาพยาบาล



async function handleManageEmployee(event) {
    event.preventDefault();

    const data = {
            employeeId : employeeId,
            position: position ,
            department:  department ,
                workplace:  workplace, 
            jobtype : jobtype ,
            startjob : startjob,
            exceptjob : exceptjob,
            prefix : prefix,
            name : name,
            lastName : lastName,
            nickName  : nickName,
            gender  : gender,
            dateOfBirth  : dateOfBirth,
            age : age,
            idCard : idCard,
            ethnicity :ethnicity,
            religion : religion,
            maritalStatus : maritalStatus,
            militaryStatus : militaryStatus,
            address : address,
            currentAddress  : currentAddress,
            phoneNumber : phoneNumber,
            emergencyContactNumber : emergencyContactNumber,
            idLine : idLine,
            vaccination  : vaccination,
            treatmentRights  : treatmentRights,
      };
  

    //check create or update Employee
    if(newEmp){
// alert('create employee');

try {
    const response = await axios.post(endpoint + '/employee/create', data);
    // setEmployeesResult(response.data.employees);

  } catch (error) {
    alert('กรุณาตรวจสอบข้อมูลในช่องกรอกข้อมูล');
    // window.location.reload();

  }

    } else {
        alert('update user');
    }

}


const handleWorkplace = (event) => {
    setWorkplace(event.target.value);
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

//xxx
const handleStartDateChange = (date) => {
    setStartjob(date);
  };
  const handleExceptDateChange = (date) => {
    setExceptjob(date);
  };
  const handleDateOfBirth = (date) => {
    setDateOfBirth (date);
  };

    useEffect(() => {
setNewEmp(false);
        const firstEmployee = storedEmp[0];
        const firstId = firstEmployee ? firstEmployee.employeeId : '';
        // setId(firstId );
if(firstId == ''){
    setNewEmp(true);
}

    }, [storedEmp ]);

    useEffect(() => {
      const storedItem = localStorage.getItem('selectedEmployees');
      if (storedItem) {
        // Item exists in localStorage
        // setStoredEmp(storedItem);
        const parsedData = JSON.parse(storedItem);
        setStoredEmp(parsedData);
  //      console.log('Item exists:', storedItem);
              setNewEmp(true);

  setNewEmp(false);
      } else {
        // Item does not exist in localStorage
        console.log('Item does not exist');
        setNewEmp(true);
      }
  
  
    }, []);
  
  
    useEffect(() => {
      // Listen for the custom event when selectedEmployees change in localStorage
      const handleSelectedEmployeesChange = (event) => {
        const { selectedEmployees } = event.detail;
        setStoredEmp(selectedEmployees);
      };
  
      window.addEventListener('selectedEmployeesChanged', handleSelectedEmployeesChange);
  
      return () => {
        window.removeEventListener('selectedEmployeesChanged', handleSelectedEmployeesChange);
      };
    }, []);
  
    return (
        <body class="hold-transition sidebar-mini">
            <div class="wrapper">
                <div class="content-wrapper">
                    <ol class="breadcrumb">
                        <li class="breadcrumb-item"><i class="fas fa-home"></i> <a href="index.php">หน้าหลัก</a></li>
                        <li class="breadcrumb-item"><a href="#"> ระบบบริหารจัดการข้อมูล</a></li>
                        <li class="breadcrumb-item active">ข้อมูลส่วนบุคคลพนักงาน</li>
                    </ol>
                    <div class="content-header">
                        <div class="container-fluid">
                            <div class="row mb-2">
                                <h1 class="m-0"><i class="far fa-arrow-alt-circle-right"></i> ข้อมูลส่วนบุคคลพนักงาน</h1>
                            </div>
                        </div>
                    </div>
                    <section class="content">
                        <div class="container-fluid">
                        <form onSubmit={handleManageEmployee}>

                            <h2 class="title">ข้อมูลพนักงาน</h2>
                            <section class="Frame">

                                <div class="col-md-12">


                                    <div class="row">
                                        <div class="col-md-3">
                                            <div class="form-group">
                                                <label role="employeeId">รหัสพนักงาน</label>
                                                <input type="text" class="form-control" id="employeeId" placeholder="รหัสพนักงาน" value={employeeId} onChange={(e) => setEmployeeId(e.target.value)} />
                                            </div>
                                        </div>
                                        <div class="col-md-3">
                                            <div class="form-group">
                                                <label role="position">ตำแหน่ง</label>
                                                <input type="text" class="form-control" id="position" placeholder="ตำแหน่ง" value={position} onChange={(e) => setPosition(e.target.value)} />
                                            </div>
                                        </div>
                                        <div class="col-md-3">
                                            <div class="form-group">
                                                <label role="department">แผนก</label>
                                                <input type="text" class="form-control" id="department" placeholder="แผนก" value={department} onChange={(e) => setDepartment(e.target.value)} />
                                            </div>
                                        </div>
                                        <div class="col-md-3">
                                            <div class="form-group">
                                                <label role="workplace">หน่วยงาน</label>
                                                <select id="workplace" name="workplace" class="form-control"
                                                value={workplace} onChange={handleWorkplace }>
                                                    <option value="บริษัท ไทย เอ็นโอเค จำกัด (โรงงานบางประกง)">บริษัท ไทย เอ็นโอเค จำกัด (โรงงานบางประกง)</option>
                                                    <option value="Gulf สำนักงานใหญ่">Gulf สำนักงานใหญ่</option>
                                                </select>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="row">
                                        <div class="col-md-3">
                                            <div class="form-group">
                                                <label role="jobtype">ประเภทการจ้าง</label>
                                                <select id="jobtype" name="jobtype" class="form-control"
                                                value={jobtype} onChange={handleJobtype }>
                                                    <option value="ประจำ">ประจำ</option>
                                                    <option value="ไม่ประจำ">ไม่ประจำ</option>
                                                    <option value="รายวัน">รายวัน</option>
                                                    <option value="รายครั้ง">รายครั้ง</option>
                                                </select>
                                            </div>
                                        </div>
                                        <div class="col-md-3">
                                            <div class="form-group">
                                                <label role="startjob">วันที่เริ่มงาน</label>
                                                <DatePicker id="startjob" name="startjob"
        selected={startjob}
        onChange={handleStartDateChange}
        dateFormat="dd/MM/yyyy" />
                                            </div>
                                        </div>
                                        <div class="col-md-3">
                                            <div class="form-group">
                                                <label role="exceptjob">วันที่บรรจุ</label>
                                                <DatePicker id="exceptjob" name="exceptjob"
        selected={exceptjob}
        onChange={handleExceptDateChange}
        dateFormat="dd/MM/yyyy" />

        </div>                                    
                                        </div>
                                    </div>
                                    <div class="row">
                                        <div class="col-md-6">
                                            <div class="form-group">
                                                <label>อัพโหลดลายนิ้วมือ</label>
                                                <div class="custom-file">
                                                    <input type="file" class="custom-file-input" id="customFile" />
                                                    <label class="custom-file-label" for="customFile">เลือกไฟล์</label>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="col-md-6">
                                            <div class="form-group">
                                                <label>อัพโหลดใบหน้า</label>
                                                <div class="custom-file">
                                                    <input type="file" class="custom-file-input " id="customFile" />
                                                    <label class="custom-file-label" for="customFile">เลือกไฟล์</label>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </section>
                            {/* <!--Frame--> */}
                            <h2 class="title">ข้อมูลส่วนบุคคลพนักงาน</h2>
                            <section class="Frame">
                                <div class="col-md-12">
                                    <div class="row">
                                        <div class="col-md-3">
                                            <div class="form-group">
                                                <label role="prefix">คำนำหน้า</label>
                                                <select id="prefix" name="prefix" class="form-control"
                                                value={prefix} onChange={handlePrefix}>
                                                    <option value="นาย">นาย</option>
                                                    <option value="นาง">นาง</option>
                                                    <option value="นางสาว">นางสาว</option>
                                                </select>
                                            </div>
                                        </div>
                                        <div class="col-md-3">
                                            <div class="form-group">
                                                <label role="name">ชื่อ</label>
                                                <input type="text" name="name" class="form-control" id="name" placeholder="ชื่อ" value={name} onChange={(e) => setName(e.target.value)} />
                                            </div>
                                        </div>
                                        <div class="col-md-3">
                                            <div class="form-group">
                                                <label role="lastName">นามสกุล</label>
                                                <input type="text" name ="lastName" class="form-control" id="lastName" placeholder="นามสกุล" value={lastName} onChange={(e) => setLastName(e.target.value)} />
                                            </div>
                                        </div>

                                        <div class="col-md-3">
                                            <div class="form-group">
                                                <label role="nickName">ชื่อเล่น</label>
                                                <input type="text" name="nickName" class="form-control" id="nickName" placeholder="ชื่อเล่น" value={nickName} onChange={(e) => setNickName(e.target.value)} />
                                            </div>
                                        </div>
                                    </div>
                                    <div class="row">
                                        <div class="col-md-3">
                                            <div class="form-group">
                                                <label role="gender">เพศ</label>
                                                <select name="gender" id="gender" class="form-control"
                                                value={gender} onChange={handleGender}>
                                                    <option value="ชาย">ชาย</option>
                                                    <option value="หญิง">หญิง</option>
                                                </select>
                                            </div>
                                        </div>
                                        <div class="col-md-3">
                                            <div class="form-group">
                                                <label role="dateOfBirth">วันเดือนปีเกิด</label>
                                                <DatePicker id="dateOfBirth" name="dateOfBirth"
        selected={dateOfBirth}
        onChange={handleDateOfBirth}
        dateFormat="dd/MM/yyyy" />

                                            </div>
                                        </div>
                                        <div class="col-md-3">
                                            <div class="form-group">
                                                <label role="age">อายุ</label>
                                                <input type="text" name="age" class="form-control" id="age" placeholder="อายุ" value={age} onChange={(e) => setAge(e.target.value)} />
                                            </div>
                                        </div>

                                        <div class="col-md-3">
                                            <div class="form-group">
                                                <label role="idCard">เลขบัตรประจำตัวประชาชน</label>
                                                <input type="text" name="idCard" class="form-control" id="idCard" placeholder="เลขบัตรประจำตัวประชาชน" value={idCard} onChange={(e) => setIdCard(e.target.value)} />
                                            </div>
                                        </div>
                                    </div>
                                    <div class="row">
                                        <div class="col-md-3">
                                            <div class="form-group">
                                                <label role="ethnicity">เชื้อชาติ</label>
                                                <input type="text" name="ethnicity" class="form-control" id="ethnicity" placeholder="เชื้อชาติ" value={ethnicity} onChange={(e) => setEthnicity(e.target.value)} />
                                            </div>
                                        </div>
                                        <div class="col-md-3">
                                            <div class="form-group">
                                                <label role="religion">ศาสนา</label>
                                                <input type="text" name="religion" class="form-control" id="religion" placeholder="ศาสนา" value={religion} onChange={(e) => setReligion(e.target.value)} />
                                            </div>
                                        </div>
                                        <div class="col-md-3">
                                            <div class="form-group">
                                                <label role="maritalStatus">สถานภาพการสมรส</label>
                                                <input type="text" name="maritalStatus" class="form-control" id="maritalStatus" placeholder="สถานภาพการสมรส" value={maritalStatus} onChange={(e) => setMaritalStatus(e.target.value)} />
                                            </div>
                                        </div>
                                        <div class="col-md-3">
                                            <div class="form-group">
                                                <label role="militaryStatus">สถานภาพทางการทหาร</label>
                                                <select name="militaryStatus" id="militaryStatus" class="form-control"
                                                value="militaryStatus" onChange={handleMilitaryStatus}>
                                                    <option>ยกเว้นการเกณฑ์ทหาร</option>
                                                    <option>ผ่านการเกณฑ์ทหารแล้ว</option>
                                                    <option>ไม่ผ่านการเกณฑ์ทหาร</option>
                                                </select>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="row">
                                        <div class="col-md-6">
                                            <div class="form-group">
                                                <label role="address">ที่อยู่ตามบัตรประชาชน</label>
                                                <textarea name="address" id="address" class="form-control" rows="3" value={address} onChange={(e) => setAddress(e.target.value)} ></textarea>
                                            </div>
                                        </div>
                                        <div class="col-md-6">
                                            <div class="form-group">
                                                <label role="currentAddress">ที่อยู่ปัจจุบัน</label>
                                                <div class="icheck-primary d-inline">
                                                    <input type="radio" id="radio" name="radio1" /> ใช้ที่อยู่ตามบัตรประชาชน
                                                </div>
                                                <textarea name="currentAddress" id="currentAddress" class="form-control" rows="3" value={currentAddress} onChange={(e) => setCurrentAddress(e.target.value)} ></textarea>
                                            </div>
                                        </div>
                                    </div>
                                    {/* <!--row--> */}
                                    <div class="row">
                                        <div class="col-md-3">
                                            <div class="form-group">
                                                <label role="phoneNumber">เบอร์โทรศัพท์</label>
                                                <input type="text" name="phoneNumber" class="form-control" id="phoneNumber" placeholder="เบอร์โทรศัพท์" value={phoneNumber} onChange={(e) => setPhoneNumber(e.target.value)} />
                                            </div>
                                        </div>
                                        <div class="col-md-3">
                                            <div class="form-group">
                                                <label role="emergencyContactNumber">เบอร์ติดต่อกรณีฉุกเฉิน</label>
                                                <input type="text" name="emergencyContactNumber" class="form-control" id="emergencyContactNumber" placeholder="เบอร์ติดต่อกรณีฉุกเฉิน" value={emergencyContactNumber} onChange={(e) => setEmergencyContactNumber(e.target.value)} />
                                            </div>
                                        </div>
                                        <div class="col-md-3">
                                            <div class="form-group">
                                                <label role="idLine">ไอดีไลน์</label>
                                                <input type="text" name="idLine" class="form-control" id="idLine" placeholder="ไอดีไลน์" value={idLine} onChange={(e) => setIdLine(e.target.value)} />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                {/* <!--col-md-12--> */}
                            </section>
                            {/* <!--Frame--> */}
                            <h2 class="title">ข้อมูลสุขภาพ</h2>
                            <section class="Frame">
                                <div class="row">
                                    <div class="form-group">
                                        <label style={{ paddingLeft: "10px" }}>การรับวัคซีน</label>
                                        <div class="col-md-12" style={{ marginTop: "10px" }}>
                                            <div class="icheck-primary d-inline">
                                                <input type="radio" id="radioPrimary1" name="r1" checked="" /> ได้รับวัคซีนแล้ว
                                            </div>
                                            <div class="icheck-primary d-inline">
                                                <input type="radio" id="radioPrimary2" name="r1" />  ยังไม่ได้รับวัคซีน
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div class="row">
                                    <div class="col-md-6">
                                        <div class="form-group">
                                            <label>สิทธิการรักษาพยาบาล</label>
                                            <input type="" class="form-control" id="" placeholder="สิทธิการรักษาพยาบาล" value=""/>
                                        </div>
                                    </div>
                                </div>
                            </section>
                            {/* <!--Frame--> */}
                            <div class="line_btn">

                                { newEmp ? (
                                <button class="btn b_save"><i class="nav-icon fas fa-save"></i> &nbsp;สร้างพนักงานใหม่</button>

                                ):(
                                    <button class="btn b_save"><i class="nav-icon fas fa-save"></i> &nbsp;บันทึก</button>
                                )}

                                {/* <button class="btn b_save"><i class="nav-icon fas fa-save"></i> &nbsp;บันทึก</button> */}

                                <button class="btn clean"><i class="far fa-window-close"></i> &nbsp;ยกเลิก</button>
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

export default Employee