import endpoint from '../../config';

import axios from 'axios';
import React, { useEffect, useState } from 'react';

import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

import EmployeesSelected from './EmployeesSelected';
import '../editwindowcss.css';


function Salary() {
    const [storedEmp, setStoredEmp] = useState([]);
    const [newEmp, setNewEmp] = useState(true);
    // const [employeeselection , setEmployeeselection] = useState([]);
const [workplaceSelection , setWorkplaceSelection] = useState([]);

    useEffect(() => {
        const storedValue = sessionStorage.getItem('empSelect');
        if (storedValue) {
            // setEmployeeselection(storedValue);
        }

        fetch(endpoint + '/workplace/listselect') // Update with your API endpoint
        .then(response => response.json())
        .then(data => {setWorkplaceSelection(data);
}
        )
        .catch(error => console.error('Error fetching employees:', error));
  
    }, []);

    //employee data
    const [employeeId, setEmployeeId] = useState('');
    const [position, setPosition] = useState(''); //ตำแหน่ง
    const [department, setDepartment] = useState(''); //แผนก
    const [workplace, setWorkplace] = useState(''); //หน่วยงาน
    const [workplacearia , setWorkplacearia ] = useState('');
    const [costtype, setCosttype] = useState(''); //ลงบัญชีเป็นค่าใช้จ่าย
    const [worktable, setWorktable] = useState(''); //ตารางงาน
    const [workexcept, setWorkexcept] = useState(''); //ผู้อนุมัต
    const [worktimerecord, setWorktimerecord] = useState(''); //ผู้บันทึกเวลา
    const [workrecord, setWorkrecord] = useState(''); //ผู้บันทึกข้อมูลแทน

    const [jobtype, setJobtype] = useState(''); //ประเภทการจ้าง
    const [startjob, setStartjob] = useState(''); //วันที่เริ่มงาน
    const [exceptjob, setExceptjob] = useState(''); //วันที่บรรจุ

    //Salary Data

    const [startcount, setStartcount] = useState(''); //วันเริ่มคำนวน
    const [salary, setSalary] = useState(''); //อัตราเงินเดือน
    const [salarytype, setSalarytype] = useState(''); //อัตราเงินเดือน
    const [money , setMoney] = useState(''); //หน่วยของเงิน
    const [salaryupdate, setSalaryupdate] = useState(''); //เงินเดือนปรับเมื่อ
    const [salaryout, setSalaryout] = useState(''); //เงินเดือนปรับเมื่อ
    const [salarypayment, setSalarypayment] = useState(''); //วิธีจ่ายเงิน
    const [ paymentType , setPaymentType] = useState(''); //วิธีจ่ายเงิน
    const [salarybank, setSalarybank] = useState(''); //ธนาคาร
    const [banknumber, setBanknumber] = useState(''); //เลขบัญชี

    const [salaryadd1, setSalaryadd1] = useState(''); //เงินเพิ่มพิเศษ ค่ารถ
    const [salaryadd2, setSalaryadd2] = useState(''); //เงินเพิ่มพิเศษ ค่าอาหาร
    const [salaryadd3, setSalaryadd3] = useState(''); //เงินเพิ่มพิเศษ เบี้ยขยัน
    const [salaryadd4, setSalaryadd4] = useState(''); //เงินเพิ่มพิเศษ โทรศัพท์
    const [salaryadd5, setSalaryadd5] = useState(''); //เงินเพิ่มพิเศษ เงินประจำตำแหน่ง

    const [salaryaddtype, setSalaryaddtype] = useState(''); //เพิ่มพิเศษแบบ ต่อวัน ต่อเดือน
    const [salaryaddsum, setSalaryaddsum] = useState(''); //เพิ่มพิเศษแบบ ต่อวัน ต่อเดือน

    const [salaryadd1v, setSalaryadd1v] = useState(''); //จำนวนเงินเพิ่มพิเศษ ค่ารถ 
    const [salaryadd2v, setSalaryadd2v] = useState(''); //จำนวนเงินเพิ่มพิเศษ ค่าอาหาร
    const [salaryadd3v, setSalaryadd3v] = useState(''); //จำนวนเงินเพิ่มพิเศษ เบี้ยขยัน 
    const [salaryadd4v, setSalaryadd4v] = useState(''); //จำนวนเงินเพิ่มพิเศษ โทรศัพท์
    const [salaryadd5v, setSalaryadd5v] = useState(''); //จำนวนเงินเพิ่มพิเศษ เงินประจำตำแหน่ง 
//////
    const [remainbusinessleave, setRemainbusinessleave] = useState(''); //ลาคงเหลือ วันลากิจคงเหลือ 
    const [businessleavesalary, setBusinessleavesalary] = useState(''); //ลาคงเหลือ จำนวนเงินต่อวัน

    const [remainsickleave, setRemainsickleave] = useState(''); //ลาคงเหลือ วันลาป่วยคงเหลือ 
    const [sickleavesalary, setSickleavesalary] = useState(''); //ลาคงเหลือ จำนวนเงินต่อวัน

    const [remainvacation, setRemainvacation] = useState(''); //ลาคงเหลือ วันลาพักร้อนคงเหลือ 
    const [vacationsalary, setVacationsalary] = useState(''); //ลาคงเหลือ จำนวนเงินต่อวัน 

    const [maternityleave, setMaternityLeave] = useState(''); //ลาคงเหลือ วันลาคลอดคงเหลือ 
    const [maternityleavesalary, setMaternityleavesalary] = useState(''); //ลาคงเหลือ จำนวนเงินต่อวัน 
    const [militaryleave, setMilitaryleave] = useState(''); //ลาคงเหลือ วันลาเพื่อเกณฑ์ทหารคงเหลือ 
    const [militaryleavesalary, setMilitaryleavesalary] = useState(''); //ลาคงเหลือ จำนวนเงินต่อวัน 
    const [sterilization, setSterilization] = useState(''); //ลาคงเหลือ วันลาเพื่อทำหมันคงเหลือ 
    const [sterilizationsalary, setSterilizationsalary] = useState(''); //ลาคงเหลือ จำนวนเงินต่อวัน 
    const [leavefortraining, setLeavefortraining] = useState(''); //ลาคงเหลือ วันลาเพื่อฝึกอบรมคงเหลือ 
    const [leavefortrainingsalary, setLeavefortrainingsalary] = useState(''); //ลาคงเหลือ จำนวนเงินต่อวัน 



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

    const handleWorktable = (event) => {
        setWorktable(event.target.value);
    };

    const handleWorkexcept = (event) => {
        setWorkexcept(event.target.value);
    };

    const handleWorktimerecord = (event) => {
        setWorktimerecord(event.target.value);
    };


    const handleSalarytype = (event) => {
        setSalarytype(event.target.value);
    };
    const handleSalaryupdate = (event) => {
        setSalaryupdate(event.target.value);
    };
    const handleSalaryout = (event) => {
        setSalaryout(event.target.value);
    };
    const handleSalarypayment = (event) => {
        setSalarypayment(event.target.value);
    };
    const handleSalarybank = (event) => {
        setSalarybank(event.target.value);
    };

    const handleSalaryadd1 = (event) => {
        if (salaryadd1 !== '') {
            setSalaryadd1('');
        } else {
            setSalaryadd1(event.target.value);
        }
    };
    const handleSalaryadd2 = (event) => {
        if (salaryadd2 !== '') {
            setSalaryadd2('');
        } else {
            setSalaryadd2(event.target.value);
        }
    };
    const handleSalaryadd3 = (event) => {
        if (salaryadd3 !== '') {
            setSalaryadd3('');
        } else {
            setSalaryadd3(event.target.value);
        }
    };
    const handleSalaryadd4 = (event) => {
        if (salaryadd4 !== '') {
            setSalaryadd4('');
        } else {
            setSalaryadd4(event.target.value);
        }
    };
    const handleSalaryadd5 = (event) => {
        if (salaryadd5 !== '') {
            setSalaryadd5('');
        } else {
            setSalaryadd5(event.target.value);
        }
    };
    const handleSalaryaddtype = (event) => {
        setSalaryaddtype(event.target.value);
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
    const handleStartcount = (date) => {
        setStartcount(date);
    };

    const handleDateOfBirth = (date) => {
        setDateOfBirth(date);
    };

    async function handleManageSalary(event) {
        event.preventDefault();
    }

    function onEmployeeSelect(empSelect) {
        setEmployeeId(empSelect.employeeId);
        setPosition(empSelect.position);
        setDepartment(empSelect.department);
        setWorkplace(empSelect.workplace);
        setJobtype(empSelect.jobtype);
        setStartjob(new Date(empSelect.startjob));
        setExceptjob(new Date(empSelect.exceptjob));
        setPrefix(empSelect.prefix);
        setName(empSelect.name);
        setLastName(empSelect.lastName);
        setNickName(empSelect.nickName);
        setGender(empSelect.gender);

        setIdCard(empSelect.idCard);

    }


    return (
        <body class="hold-transition sidebar-mini" className='editlaout'>
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
                            <form onSubmit={handleManageSalary}>

                                <h2 class="head-title">เงินเดือนและสวัสดิการ</h2>
                                <h2 class="title">ข้อมูลพนักงาน</h2>
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
                                                                <option value="ยังไม่ระบุหน่วยงาน">ยังไม่ระบุหน่วยงาน</option>
                                                                {workplaceSelection.map(wp => (
                                                                <option key={wp._id} value={wp.workplaceName}>{wp.workplaceName}</option>
    
))}
                                                            </select>
                                                        </div>
                                                    </div>
                                                    <div class="col-md-4">
                                                        <div class="form-group">
                                                            <label role="workplacearia">สถานที่ปฏิบัติงาน</label>
                                                            <input type="text" class="form-control" id="workplacearia" placeholder="สถานที่ปฏิบัติงาน" value={workplacearia} onChange={(e) => setWorkplacearia(e.target.value)} />
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
                                <h2 class="title">การบันทึกเวลาและการลา</h2>
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
                                                {/* <div class="row"><h2 class="title">             ปฏิบัติงาน</h2></div> */}
                                                {/* <div class="row"> */}

                                                    {/* <div class="col-md-4">
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
                                                    </div> */}
                                                {/* </div> */}
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
                                                <div class="col-md-5">
                                                    <div class="row">
                                                        <h2 class="title">วันที่เริ่มงาน</h2>
                                                    </div>
                                                    <div class="form-group row">

                                                        <label role="startjob">วันที่เริ่มงาน</label>
                                                        <div style={{ position: 'relative', zIndex: 9999, marginLeft: "2rem" }}>
                                                            <DatePicker id="startjob" name="startjob"
                                                                className="form-control" // Apply Bootstrap form-control class
                                                                popperClassName="datepicker-popper" // Apply custom popper class if needed
                                                                selected={startjob}
                                                                onChange={handleStartDateChange}
                                                                dateFormat="dd/MM/yyyy" />
                                                        </div>
                                                    </div>
                                                    <div class="form-group row">
                                                        <label role="exceptjob">วันที่บรรจุ</label>
                                                        <div style={{ position: 'relative', zIndex: 9999, marginLeft: "2rem" }}>
                                                            <DatePicker id="exceptjob" name="exceptjob"
                                                                className="form-control" // Apply Bootstrap form-control class
                                                                popperClassName="datepicker-popper" // Apply custom popper class if needed
                                                                selected={exceptjob}
                                                                onChange={handleExceptDateChange}
                                                                dateFormat="dd/MM/yyyy" />
                                                        </div>
                                                    </div>
                                                    <div class="form-group row">
                                                        <label role="startcount">วันที่เริ่มต้นคำนวณ</label>
                                                        <div style={{ position: 'relative', zIndex: 9999, marginLeft: "2rem" }}>
                                                            <DatePicker id="startcount" name="startcount"
                                                                className="form-control" // Apply Bootstrap form-control class
                                                                popperClassName="datepicker-popper" // Apply custom popper class if needed
                                                                selected={startcount}
                                                                onChange={handleStartcount}
                                                                dateFormat="dd/MM/yyyy" />
                                                        </div>
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
                                                        <div class="col-md-6">
                                                            <div class="row">
                                                                <label role="salarytype" class="col-sm-3 col-form-label">*ต่อ</label>
                                                                <div class="col-sm-6">
                                                                    <select id="salarytype" name="salarytype" class="form-control"
                                                                        value={salarytype} onChange={handleSalarytype}>
                                                                        <option value="ต่อวัน">ต่อวัน</option>
                                                                        <option value="ต่อเดือน">ต่อเดือน</option>
                                                                    </select>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div class="col-md-6">
                                                            <div class="row">
                                                                <label class="col-sm-6 col-form-label">สกุลเงิน</label>
                                                                <div class="col-sm-6">
                                                                    <select class="form-control">
                                                                        <option>บาท</option>
                                                                        <option>จ๊าต - พม่า</option>
                                                                        <option>เรียล - กัมพูชา</option>
                                                                        <option>กีบ - ลาว</option>

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
                                                        </div>
                                                    </div>
                                                </div>
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
                                                        <option value="10 วัน">10 วัน</option>
                                                        <option value="งวดพิเศษ">งวดพิเศษ</option>
                                                    </select>
                                                </div>
                                            </div>
                                            {/* <!--row--> */}
                                            <div class="form-group row">
                                                <label role="salarypayment" class="col-sm-4">วิธีจ่ายเงิน</label>
                                                <div class="col-sm-9">
                                                    <div class="icheck-primary d-inline">
                                                        <input type="radio" id="salarypayment" name="salarypayment"
                                                            value="เงินสด"
                                                            checked={salarypayment === 'เงินสด'}
                                                            onChange={handleSalarypayment}
                                                        /> เงินสด
                                                    </div>
                                                    <div class="icheck-primary d-inline">
                                                        <input type="radio" id="salarypayment" name="salarypayment"
                                                            value="โอนผ่านธนาคาร"
                                                            checked={salarypayment === 'โอนผ่านธนาคาร'}
                                                            onChange={handleSalarypayment}
                                                        /> โอนผ่านธนาคาร
                                                    </div>
                                                </div>
                                            </div>
                                            {/* <!--row--> */}
                                            <div class="row">
                                                <div class="col-md-6">
                                                    <div class="form-group row">
                                                        <label role="salarybank" class="col-sm-3 col-form-label">ชื่อธนาคาร</label>
                                                        <div class="col-sm-9">
                                                            <select id="salarybank" name="salarybank" class="form-control"
                                                                value={salarybank} onChange={handleSalarybank}>
                                                                <option value="ธนาคารกรุงเทพ">ธนาคารกรุงเทพ</option>
                                                                <option value="ธนาคารกสิกรไทย">ธนาคารกสิกรไทย</option>
                                                                <option value="ธนาคารกรุงไทย">ธนาคารกรุงไทย</option>
                                                                <option value="ธนาคารทหารไทยธนชาต">ธนาคารทหารไทยธนชาต</option>
                                                                <option value="ธนาคารไทยพาณิชย์">ธนาคารไทยพาณิชย์</option>
                                                                <option value="ธนาคารกรุงศรีอยุธยา">ธนาคารกรุงศรีอยุธยา</option>
                                                                <option value="ธนาคารเกียรตินาคินภัทร">ธนาคารเกียรตินาคินภัทร</option>
                                                                <option value="ธนาคารซีไอเอ็มบีไทย">ธนาคารซีไอเอ็มบีไทย</option>
                                                                <option value="ธนาคารทิสโก้">ธนาคารทิสโก้</option>
                                                                <option value="ธนาคารยูโอบี">ธนาคารยูโอบี</option>
                                                                <option value="ธนาคารไทยเครดิตเพื่อรายย่อย">ธนาคารไทยเครดิตเพื่อรายย่อย</option>
                                                                <option value="ธนาคารแลนด์ แอนด์ เฮ้าส์">ธนาคารแลนด์ แอนด์ เฮ้าส์</option>
                                                                <option value="ธนาคารไอซีบีซี (ไทย)">ธนาคารไอซีบีซี (ไทย)</option>
                                                                <option value="ธนาคารพัฒนาวิสาหกิจขนาดกลางและขนาดย่อมแห่งประเทศไทย">ธนาคารพัฒนาวิสาหกิจขนาดกลางและขนาดย่อมแห่งประเทศไทย</option>
                                                                <option value="ธนาคารเพื่อการเกษตรและสหกรณ์การเกษตร">ธนาคารเพื่อการเกษตรและสหกรณ์การเกษตร</option>
                                                                <option value="ธนาคารเพื่อการส่งออกและนำเข้าแห่งประเทศไทย">ธนาคารเพื่อการส่งออกและนำเข้าแห่งประเทศไทย</option>
                                                                <option value="ธนาคารออมสิน">ธนาคารออมสิน</option>
                                                                <option value="ธนาคารอาคารสงเคราะห์">ธนาคารอาคารสงเคราะห์</option>
                                                            </select>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div class="col-md-6">
                                                    <div class="form-group row">
                                                        <label role="banknumber" class="col-sm-3 col-form-label">เลขที่บัญชี</label>
                                                        <div class="col-sm-9">
                                                            <input type="text" class="form-control" id="banknumber" placeholder="เลขที่บัญชี" value={banknumber} onChange={(e) => setBanknumber(e.target.value)} />
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            {/* <!--row--> */}
                                        </section>
                                        {/* <!--Frame--> */}
                                    </div>
                                </div>
                                <h2 class="title">เงินเพิ่มพิเศษ</h2>
                                <div class="row">
                                    <div class="col-md-9">
                                        <section class="Frame">
                                            <div class="col-md-12">
                                                <div class="row">
                                                    <div class="col-md-4">
                                                        <div class="form-group">
                                                            <label>รายการเงินเพิ่มพิเศษ</label>
                                                            <label>
                                                                <input
                                                                    type="checkbox"
                                                                    checked={salaryadd1}
                                                                    onChange={handleSalaryadd1}
                                                                />
                                                                ค่ารถ
                                                            </label>
                                                            <label>
                                                                <input
                                                                    type="checkbox"
                                                                    checked={salaryadd2}
                                                                    onChange={handleSalaryadd2}
                                                                />
                                                                ค่าอาหาร
                                                            </label>

                                                            <label>
                                                                <input
                                                                    type="checkbox"
                                                                    checked={salaryadd3}
                                                                    onChange={handleSalaryadd3}
                                                                />
                                                                เบี้ยขยัน
                                                            </label>
                                                            <label>
                                                                <input
                                                                    type="checkbox"
                                                                    checked={salaryadd4}
                                                                    onChange={handleSalaryadd4}
                                                                />
                                                                ค่าโทรศัพท์
                                                            </label>
                                                            <label>
                                                                <input
                                                                    type="checkbox"
                                                                    checked={salaryadd5}
                                                                    onChange={handleSalaryadd5}
                                                                />
                                                                เงินประจำตำแหน่ง
                                                            </label>
                                                        </div>
                                                    </div>

                                                    <div class="col-md-4">
                                                        <div class="form-group">
                                                            <label role="salaryaddtype">เพิ่มพิเศษแบบ</label>
                                                            <select id="salaryaddtype" name="salaryaddtype" class="form-control"
                                                                value={salaryaddtype} onChange={handleSalaryaddtype}>
                                                                <option value="ต่อเดือน">ต่อเดือน</option>
                                                                <option value="ต่อวัน">ต่อวัน</option>
                                                            </select>
                                                        </div>
                                                    </div>

                                                    {salaryadd1 && (
                                                        <div class="col-md-4">
                                                            <div class="form-group">
                                                                <label role="salaryadd1v">เงินเพิ่มค่ารถ</label>
                                                                <input type="text" class="form-control" id="salaryadd1v" placeholder="ค่ารถ" value={salaryadd1v} onChange={(e) => setSalaryadd1v(e.target.value)} />
                                                            </div>
                                                        </div>
                                                    )}

                                                    {salaryadd2 && (
                                                        <div class="col-md-4">
                                                            <div class="form-group">
                                                                <label role="salaryadd2v">เงินเพิ่มค่าอาหาร</label>
                                                                <input type="text" class="form-control" id="salaryadd2v" placeholder="ค่าอาหาร" value={salaryadd2v} onChange={(e) => setSalaryadd1v(e.target.value)} />
                                                            </div>
                                                        </div>
                                                    )}

                                                    {salaryadd3 && (
                                                        <div class="col-md-4">
                                                            <div class="form-group">
                                                                <label role="salaryadd3v">ค่าเบี้ยขยัน</label>
                                                                <input type="text" class="form-control" id="salaryadd3v" placeholder="ค่าเบี้ยขยัน" value={salaryadd3v} onChange={(e) => setSalaryadd3v(e.target.value)} />
                                                            </div>
                                                        </div>
                                                    )}

                                                    {salaryadd4 && (
                                                        <div class="col-md-4">
                                                            <div class="form-group">
                                                                <label role="salaryadd4v">ค่าโทรศัพท์</label>
                                                                <input type="text" class="form-control" id="salaryadd4v" placeholder="โทรศัพท์" value={salaryadd4v} onChange={(e) => setSalaryadd4v(e.target.value)} />
                                                            </div>
                                                        </div>
                                                    )}

                                                    {salaryadd5 && (
                                                        <div class="col-md-4">
                                                            <div class="form-group">
                                                                <label role="salaryadd5v">เงินประจำตำแหน่ง</label>
                                                                <input type="text" class="form-control" id="salaryadd5v" placeholder="เงินประจำตำแหน่ง" value={salaryadd5v} onChange={(e) => setSalaryadd5v(e.target.value)} />
                                                            </div>
                                                        </div>
                                                    )}

                                                    <div class="col-md-4">
                                                        <div class="form-group">
                                                            <label role="salaryaddsum">เงินเพิ่มพิเศษรวม</label>
                                                            <input type="text" class="form-control" id="salaryaddsum" placeholder="จำนวนเงิน" value={salaryaddsum} onChange={(e) => setSalaryaddsum(e.target.value)} />
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
                                <h2 class="title">สวัสดิการวันลา</h2>
                                <div class="row">
                                    <div class="col-md-9">
                                        <section class="Frame">
                                            <div class="col-md-12">
                                                <div class="row">
                                                    <div class="col-md-6">
                                                        <div class="form-group">
                                                            <label role="remainbusinessleave">วันลากิจคงเหลือ</label>
                                                            <input type="text" class="form-control" id="remainbusinessleave" placeholder="วันลากิจคงเหลือ" value={remainbusinessleave} onChange={(e) => setRemainbusinessleave(e.target.value)} />
                                                        </div>
                                                    </div>

                                                    <div class="col-md-6">
                                                        <div class="form-group">
                                                            <label role="businessleavesalary">จำนวนเงินต่อวัน</label>
                                                            <input type="text" class="form-control" id="businessleavesalary" placeholder="จำนวนเงินต่อวัน" value={businessleavesalary} onChange={(e) => setBusinessleavesalary(e.target.value)} />
                                                        </div>
                                                    </div>
                                                </div>
                                                {/* <!--row--> */}
                                                <div class="row">
                                                    <div class="col-md-6">
                                                        <div class="form-group">
                                                            <label role="remainsickleave">วันลาป่วยคงเหลือ</label>
                                                            <input type="text" class="form-control" id="remainsickleave" placeholder="วันลาป่วยคงเหลือ" value={remainsickleave} onChange={(e) => setRemainsickleave(e.target.value)} />
                                                        </div>
                                                    </div>

                                                    <div class="col-md-6">
                                                        <div class="form-group">
                                                            <label role="sickleavesalary">จำนวนเงินต่อวัน</label>
                                                            <input type="text" class="form-control" id="sickleavesalary" placeholder="จำนวนเงินต่อวัน" value={sickleavesalary} onChange={(e) => setSickleavesalary(e.target.value)} />
                                                        </div>
                                                    </div>
                                                </div>
                                                {/* <!--row--> */}
                                                <div class="row">
                                                    <div class="col-md-6">
                                                        <div class="form-group">
                                                            <label role="remainvacation">วันลาพักร้อนคงเหลือ</label>
                                                            <input type="text" class="form-control" id="remainvacation" placeholder="วันลาพักร้อนคงเหลือ" value={remainvacation} onChange={(e) => setRemainvacation(e.target.value)} />
                                                        </div>
                                                    </div>

                                                    <div class="col-md-6">
                                                        <div class="form-group">
                                                            <label role="maternityleave">จำนวนเงินต่อวัน</label>
                                                            <input type="text" class="form-control" id="maternityleave" placeholder="จำนวนเงินต่อวัน" value={maternityleave} onChange={(e) => setMaternityLeave(e.target.value)} />
                                                        </div>
                                                    </div>
                                                </div>
                                                {/* <!--row--> */}
                                                <div class="row">
                                                    <div class="col-md-6">
                                                        <div class="form-group">
                                                            <label role="maternityleavesalary">วันลาคลอดคงเหลือ</label>
                                                            <input type="text" class="form-control" id="maternityleavesalary" placeholder="วันลาคลอดคงเหลือ" value={maternityleavesalary} onChange={(e) => setMaternityleavesalary(e.target.value)} />
                                                        </div>
                                                    </div>

                                                    <div class="col-md-6">
                                                        <div class="form-group">
                                                            <label role="vacationsalary">จำนวนเงินต่อวัน</label>
                                                            <input type="text" class="form-control" id="vacationsalary" placeholder="จำนวนเงินต่อวัน" value={vacationsalary} onChange={(e) => setVacationsalary(e.target.value)} />
                                                        </div>
                                                    </div>
                                                </div>
                                                {/* <!--row--> */}
                                                <div class="row">
                                                    <div class="col-md-6">
                                                        <div class="form-group">
                                                            <label role="militaryleave">วันลาเพื่อเกณฑ์ทหารคงเหลือ</label>
                                                            <input type="text" class="form-control" id="militaryleave" placeholder="วันลาเพื่อเกณฑ์ทหารคงเหลือ" value={militaryleave} onChange={(e) => setMilitaryleave(e.target.value)} />
                                                        </div>
                                                    </div>

                                                    <div class="col-md-6">
                                                        <div class="form-group">
                                                            <label role="militaryleavesalary">จำนวนเงินต่อวัน</label>
                                                            <input type="text" class="form-control" id="militaryleavesalary" placeholder="จำนวนเงินต่อวัน" value={militaryleavesalary} onChange={(e) => setMilitaryleavesalary(e.target.value)} />
                                                        </div>
                                                    </div>
                                                </div>
                                                {/* <!--row--> */}
                                                <div class="row">
                                                    <div class="col-md-6">
                                                        <div class="form-group">
                                                            <label role="sterilization">วันลาเพื่อทำหมันคงเหลือ</label>
                                                            <input type="text" class="form-control" id="sterilization" placeholder="วันลาเพื่อทำหมันคงเหลือ" value={sterilization} onChange={(e) => setSterilization(e.target.value)} />
                                                        </div>
                                                    </div>

                                                    <div class="col-md-6">
                                                        <div class="form-group">
                                                            <label role="sterilizationsalary">จำนวนเงินต่อวัน</label>
                                                            <input type="text" class="form-control" id="sterilizationsalary" placeholder="จำนวนเงินต่อวัน" value={sterilizationsalary} onChange={(e) => setSterilizationsalary(e.target.value)} />
                                                        </div>
                                                    </div>
                                                </div>
                                                {/* <!--row--> */}
                                                <div class="row">
                                                    <div class="col-md-6">
                                                        <div class="form-group">
                                                            <label role="leavefortraining">วันลาเพื่อฝึกอบรมคงเหลือ</label>
                                                            <input type="text" class="form-control" id="leavefortraining" placeholder="วันลาเพื่อฝึกอบรมคงเหลือ" value={leavefortraining} onChange={(e) => setLeavefortraining(e.target.value)} />
                                                        </div>
                                                    </div>

                                                    <div class="col-md-6">
                                                        <div class="form-group">
                                                            <label role="[leavefortrainingsalary, ">จำนวนเงินต่อวัน</label>
                                                            <input type="text" class="form-control" id="[leavefortrainingsalary, " placeholder="จำนวนเงินต่อวัน" value={leavefortrainingsalary} onChange={(e) => setLeavefortrainingsalary(e.target.value)} />
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