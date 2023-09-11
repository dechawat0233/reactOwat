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
    const [workplaceSelection, setWorkplaceSelection] = useState([]);
    const [employeeData, setEmployeeData] = useState({});

    useEffect(() => {
        const storedValue = sessionStorage.getItem('empSelect');
        if (storedValue) {
            // setEmployeeselection(storedValue);
        }

        //get all Workplace from API
        fetch(endpoint + '/workplace/listselect') // Update with your API endpoint
            .then(response => response.json())
            .then(data => {
                setWorkplaceSelection(data);
            }
            )
            .catch(error => console.error('Error fetching employees:', error));

    }, []);

    // const handleChange = (e, field) => {
    //     // setEmployeeData(prevData => ({
    //     //     ...prevData,
    //     //     [field]: e.target.value,
    //     //     [field]: !prevData[field],
    //     // }));

    //     if (field === 'salaryadd1') {
    //         setEmployeeData(prevData => ({
    //             ...prevData,
    //             [field]: !prevData[field],
    //         }));
    //     } if (field === 'salaryadd2') {
    //         setEmployeeData(prevData => ({
    //             ...prevData,
    //             [field]: !prevData[field],
    //         }));
    //     } if (field === 'salaryadd3') {
    //         setEmployeeData(prevData => ({
    //             ...prevData,
    //             [field]: !prevData[field],
    //         }));
    //     } if (field === 'salaryadd4') {
    //         setEmployeeData(prevData => ({
    //             ...prevData,
    //             [field]: !prevData[field],
    //         }));
    //     } if (field === 'salaryadd5') {
    //         setEmployeeData(prevData => ({
    //             ...prevData,
    //             [field]: !prevData[field],
    //         }));
    //     } else {
    //         setEmployeeData(prevData => ({
    //             ...prevData,
    //             [field]: e.target.value,
    //         }));
    //     }

    // };

    const handleChange = (e, field) => {
        switch (field) {
            case 'salaryadd1':
            case 'salaryadd2':
            case 'salaryadd3':
            case 'salaryadd4':
            case 'salaryadd5':
                setEmployeeData(prevData => ({
                    ...prevData,
                    [field]: !prevData[field],
                }));
                break;
            default:
                setEmployeeData(prevData => ({
                    ...prevData,
                    [field]: e.target.value,
                }));
                break;
        }
    };

    //employee data
    const [employeeId, setEmployeeId] = useState('');
    const [position, setPosition] = useState(''); //ตำแหน่ง
    const [department, setDepartment] = useState(''); //แผนก
    const [workplace, setWorkplace] = useState(''); //หน่วยงาน
    const [workplacearea, setWorkplacearea] = useState('');
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
    const [money, setMoney] = useState(''); //หน่วยของเงิน
    const [salaryupdate, setSalaryupdate] = useState(''); //เงินเดือนปรับเมื่อ
    const [salaryout, setSalaryout] = useState(''); //เงินเดือนปรับเมื่อ
    const [salarypayment, setSalarypayment] = useState(''); //วิธีจ่ายเงิน
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
        setEmployeeData(prevData => ({
            ...prevData,
            ['workplace']: event.target.value
        }));

        const filtered = workplaceSelection.filter(wp =>
            event.target.value === '' || wp.workplaceName === event.target.value
        )
        // alert(JSON.stringify(filtered , null, 2) );
        // alert(filtered[0].workplaceArea );
        if (filtered !== '') {
            if (employeeData.workplace == '') {
                setWorkplacearea('');
            } else {
                setWorkplacearea(filtered[0].workplaceArea);
            }

        } else {
            setWorkplacearea('');
        }

        // setWorkplacearea(filtered[0].workplaceArea );
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


    const handleStartDateChange = (date) => {
        setStartjob(date);

        //add new startjob to employeeData
        setEmployeeData(prevData => ({
            ...prevData,
            ['startjob']: date
        }));
    };

    const handleExceptDateChange = (date) => {
        setExceptjob(date);
        //add new exceptjob to employeeData
        setEmployeeData(prevData => ({
            ...prevData,
            ['exceptjob']: date
        }));
    };
    const handleStartcount = (date) => {
        setStartcount(date);
        //add new startcount to employeeData
        setEmployeeData(prevData => ({
            ...prevData,
            ['startcount']: date
        }));
    };

    const handleSalaryupdate = (date) => {
        setSalaryupdate(date);
        //add new salaryupdate to employeeData
        setEmployeeData(prevData => ({
            ...prevData,
            ['salaryupdate']: date
        }));
    };


    async function handleManageSalary(event) {
        event.preventDefault();
        // alert(employeeData._id);
        // Make the API call to update the resource by ID
        //   if(){


        // try {
        //     const response = await axios.put(endpoint + '/employee/update/' + employeeData._id, employeeData);
        //     // setEmployeesResult(response.data.employees);
        //     if (response) {
        //         alert("บันทึกสำเร็จ");
        //         // localStorage.setItem('selectedEmployees' , JSON.stringify(response.data.employees));

        //         // window.location.reload();

        //     }
        // } catch (error) {
        //     alert('กรุณาตรวจสอบข้อมูลในช่องกรอกข้อมูล');
        //     alert(error);
        //     // window.location.reload();
        // }
        // // }

    }

    async function updateEmployee(_id) {
        // alert('hi');
        // Make the API call to update the resource by ID
        try {
            const response = await axios.put(endpoint + '/employee/update/' + employeeData._id, employeeData);
            // setEmployeesResult(response.data.employees);
            if (response) {
                alert("บันทึกสำเร็จ");
                // localStorage.setItem('selectedEmployees' , JSON.stringify(response.data.employees));

                // window.location.reload();

            }
        } catch (error) {
            alert('กรุณาตรวจสอบข้อมูลในช่องกรอกข้อมูล');
            alert(error);
            // window.location.reload();
        }

    }

    async function onEmployeeSelect(empSelect) {
        await setEmployeeData(empSelect);
        await setWorkplace(empSelect.workplace || '');

        const filtered = await workplaceSelection.filter(wp =>
            empSelect.workplace === '' || wp.workplaceName === empSelect.workplace
        )
        if (filtered !== '') {
            if (employeeData.workplace == '') {
                setWorkplacearea('');
            } else {
                setWorkplacearea(filtered[0].workplaceArea || '');
            }
        } else {
            setWorkplacearea('');
        }

        await setStartjob(new Date(empSelect.startjob || ''));
        await setExceptjob(new Date(empSelect.exceptjob || ''));
        await setStartcount(empSelect.startcount ? new Date(empSelect.startcount) : '');
        await setSalaryupdate(empSelect.salaryupdate ? new Date(empSelect.salaryupdate) : '');

        setSalaryadd5(empSelect.salaryadd5);
        setSalaryadd5v(empSelect.salaryadd5v);

    }
    console.log(salaryadd5 + " 1");
    console.log(salaryadd5v + " 2");
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
                                                            <input type="text" class="form-control" id="employeeId" placeholder="รหัสพนักงาน" value={employeeData.employeeId || ''} onChange={(e) => handleChange(e, 'employeeId')} />
                                                        </div>
                                                    </div>
                                                    <div class="col-md-4">
                                                        <div class="form-group">
                                                            <label role="position">ตำแหน่ง</label>
                                                            <input type="text" class="form-control" id="position" placeholder="ตำแหน่ง" value={employeeData.position || ''} onChange={(e) => handleChange(e, 'position')} />
                                                        </div>
                                                    </div>
                                                    <div class="col-md-4">
                                                        <div class="form-group">
                                                            <label role="department">แผนก</label>
                                                            <input type="text" class="form-control" id="department" placeholder="แผนก" value={employeeData.department || ''} onChange={(e) => handleChange(e, 'department')} />
                                                        </div>
                                                    </div>
                                                </div>
                                                <div class="row">
                                                    <div class="col-md-4">
                                                        <div class="form-group">
                                                            <label role="workplace">หน่วยงาน</label>
                                                            <select id="workplace" name="workplace" class="form-control"
                                                                value={workplace} onChange={handleWorkplace}>
                                                                <option value="">ยังไม่ระบุหน่วยงาน</option>
                                                                {workplaceSelection.map(wp => (
                                                                    <option key={wp._id} value={wp.workplaceName}>{wp.workplaceName}</option>

                                                                ))}
                                                            </select>
                                                        </div>
                                                    </div>
                                                    <div class="col-md-4">
                                                        <div class="form-group">
                                                            <label role="workplacearea">สถานที่ปฏิบัติงาน</label>
                                                            <input type="text" class="form-control" id="workplacearea" placeholder="สถานที่ปฏิบัติงาน" value={workplacearea} readonly />
                                                        </div>
                                                    </div>


                                                    <div class="col-md-4">
                                                        <div class="form-group">
                                                            <label role="jobtype">ประเภทการจ้าง</label>
                                                            <select id="jobtype" name="jobtype" class="form-control"
                                                                value={employeeData.jobtype || ''} onChange={(e) => handleChange(e, 'jobtype')} >
                                                                <option value="">ไม่ระบุ</option>
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
                                                                    <input type="radio" id="costtype" name="costtype" value="ทางตรง" checked={employeeData.costtype === "ทางตรง"} onChange={(e) => handleChange(e, 'costtype')}
                                                                    /> ทางตรง
                                                                </div>
                                                                <div class="icheck-primary d-inline">
                                                                    <input type="radio" id="costtype" name="costtype" value="ทางอ้อม" checked={employeeData.costtype === "ทางอ้อม"} onChange={(e) => handleChange(e, 'costtype')}
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
                                                                value={employeeData.worktable || ''} onChange={(e) => handleChange(e, 'worktable')}
                                                            >
                                                                <option value="">ไม่ระบุ</option>
                                                            </select>
                                                        </div>
                                                    </div>
                                                    <div class="col-md-4">
                                                        <div class="form-group">
                                                            <label role="workexcept">ผู้อนุมัติ</label>
                                                            <select id="workexcept" name="workexcept" class="form-control"
                                                                value={employeeData.workexcept || ''} onChange={(e) => handleChange(e, 'workexcept')}
                                                            >
                                                                <option value="">ไม่ระบุ</option>
                                                            </select>
                                                        </div>
                                                    </div>
                                                    <div class="col-md-4">
                                                        <div class="form-group">
                                                            <label role="worktimerecord">ผู้บันทึกเวลา</label>
                                                            <select id="worktimerecord" name="worktimerecord" class="form-control"
                                                                value={employeeData.worktimerecord || ''} onChange={(e) => handleChange(e, 'worktimerecord')}
                                                            >
                                                                <option value="บันทึกผ่านเว็บ">บันทึกผ่านเว็บ</option>
                                                            </select>
                                                        </div>
                                                    </div>
                                                </div>
                                                {/* <!--row--> */}
                                                {/* <div class="row"><h2 class="title">             ปฏิบัติงาน</h2></div> */}
                                                {/* <div class="row"> */}


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
                                                        <div
                                                        // style={{ position: 'relative', zIndex: 9999, marginLeft: "2rem" }}
                                                        >
                                                            <DatePicker id="startjob" name="startjob"
                                                                className="form-control" // Apply Bootstrap form-control class
                                                                // popperClassName="datepicker-popper" // Apply custom popper class if needed
                                                                selected={startjob}
                                                                onChange={handleStartDateChange}
                                                                dateFormat="dd/MM/yyyy" />
                                                        </div>
                                                    </div>
                                                    <div class="form-group row">
                                                        <label role="exceptjob">วันที่บรรจุ</label>
                                                        <div
                                                        // style={{ position: 'relative', zIndex: 9999, marginLeft: "2rem" }}
                                                        >
                                                            <DatePicker id="exceptjob" name="exceptjob"
                                                                className="form-control" // Apply Bootstrap form-control class
                                                                // popperClassName="datepicker-popper" // Apply custom popper class if needed
                                                                selected={exceptjob}
                                                                onChange={handleExceptDateChange}
                                                                dateFormat="dd/MM/yyyy" />
                                                        </div>
                                                    </div>
                                                    <div class="form-group row">
                                                        <label role="startcount">วันที่เริ่มต้นคำนวณ</label>
                                                        <div
                                                        // style={{ position: 'relative', zIndex: 9999, marginLeft: "2rem" }}
                                                        >
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
                                                            <input type="text" class="form-control" id="salary" placeholder="จำนวนเงิน" value={employeeData.salary || ''} onChange={(e) => handleChange(e, 'salary')}
                                                            />

                                                        </div>
                                                    </div>
                                                    <div class="form-group row">
                                                        <div class="col-md-6">
                                                            <div class="row">
                                                                <label role="salarytype" class="col-sm-3 col-form-label">*ต่อ</label>
                                                                <div class="col-sm-6">
                                                                    <select id="salarytype" name="salarytype" class="form-control"
                                                                        value={employeeData.salarytype || ''} onChange={(e) => handleChange(e, 'salarytype')} >
                                                                        <option value="">ไม่ระบุ</option>
                                                                        <option value="ต่อวัน">ต่อวัน</option>
                                                                        <option value="ต่อเดือน">ต่อเดือน</option>
                                                                    </select>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div class="col-md-6">
                                                            <div class="row">
                                                                <label role="money" class="col-sm-6 col-form-label">สกุลเงิน</label>
                                                                <div class="col-sm-6">
                                                                    <select id="money" name="money" class="form-control" value={employeeData.money || ''} onChange={(e) => handleChange(e, 'money')} >
                                                                        <option value="">ไม่ระบุ</option>
                                                                        <option value="บาท">บาท</option>
                                                                        <option value="จ๊าต">จ๊าต - พม่า</option>
                                                                        <option value="เรียล">เรียล - กัมพูชา</option>
                                                                        <option value="กีบ">กีบ - ลาว</option>
                                                                    </select>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div class="form-group row">
                                                        <label role="salaryupdate" class="col-sm-3 col-form-label">วันที่ปรับปรุง</label>
                                                        <div class="col-sm-9">
                                                            <div
                                                            // style={{ position: 'relative', zIndex: 9999 }}
                                                            >
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
                                                        value={employeeData.salaryout || ''} onChange={(e) => handleChange(e, 'salaryout')} >
                                                        <option value="">ไม่ระบุ</option>
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
                                                            checked={employeeData.salarypayment === 'เงินสด'}
                                                            onChange={(e) => handleChange(e, 'salarypayment')}
                                                        /> เงินสด
                                                    </div>
                                                    <div class="icheck-primary d-inline">
                                                        <input type="radio" id="salarypayment" name="salarypayment"
                                                            value="โอนผ่านธนาคาร"
                                                            checked={employeeData.salarypayment === 'โอนผ่านธนาคาร'}
                                                            onChange={(e) => handleChange(e, 'salarypayment')}
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
                                                                value={employeeData.salarybank || ''} onChange={(e) => handleChange(e, 'salarybank')} >
                                                                <option value="">ไม่ระบุ</option>
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
                                                            <input type="text" class="form-control" id="banknumber" placeholder="เลขที่บัญชี" value={employeeData.banknumber || ''} onChange={(e) => handleChange(e, 'banknumber')}
                                                            />
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
                                                                    checked={employeeData.salaryadd1}
                                                                    onChange={(e) => handleChange(e, 'salaryadd1')}
                                                                />
                                                                ค่ารถ
                                                            </label>
                                                            <label>
                                                                <input
                                                                    type="checkbox"
                                                                    checked={employeeData.salaryadd2}
                                                                    onChange={(e) => handleChange(e, 'salaryadd2')}
                                                                />
                                                                ค่าอาหาร
                                                            </label>

                                                            <label>
                                                                <input
                                                                    type="checkbox"
                                                                    checked={employeeData.salaryadd3}
                                                                    onChange={(e) => handleChange(e, 'salaryadd3')}
                                                                />
                                                                เบี้ยขยัน
                                                            </label>
                                                            <label>
                                                                <input
                                                                    type="checkbox"
                                                                    checked={employeeData.salaryadd4}
                                                                    onChange={(e) => handleChange(e, 'salaryadd4')}
                                                                />
                                                                ค่าโทรศัพท์
                                                            </label>
                                                            <label>
                                                                <input
                                                                    type="checkbox"
                                                                    checked={employeeData.salaryadd5}
                                                                    onChange={(e) => handleChange(e, 'salaryadd5')}
                                                                />
                                                                เงินประจำตำแหน่ง
                                                            </label>
                                                            {console.log(salaryadd5 + 'test')}
                                                        </div>
                                                    </div>

                                                    <div class="col-md-4">
                                                        <div class="form-group">
                                                            <label role="salaryaddtype">เพิ่มพิเศษแบบ</label>
                                                            <select id="salaryaddtype" name="salaryaddtype" class="form-control"
                                                                value={employeeData.salaryaddtype || ''} onChange={(e) => handleChange(e, 'salaryaddtype')} >
                                                                <option value="">ไม่ระบุ</option>
                                                                <option value="ต่อเดือน">ต่อเดือน</option>
                                                                <option value="ต่อวัน">ต่อวัน</option>
                                                            </select>
                                                        </div>
                                                    </div>

                                                    {employeeData.salaryadd1 && (
                                                        <div class="col-md-4">
                                                            <div class="form-group">
                                                                <label role="salaryadd1v">เงินเพิ่มค่ารถ</label>
                                                                <input type="text" class="form-control" id="salaryadd1v" placeholder="ค่ารถ" value={employeeData.salaryadd1v} onChange={(e) => handleChange(e, 'salaryadd1v')}
                                                                />
                                                            </div>
                                                        </div>
                                                    )}

                                                    {employeeData.salaryadd2 && (
                                                        <div class="col-md-4">
                                                            <div class="form-group">
                                                                <label role="salaryadd2v">เงินเพิ่มค่าอาหาร</label>
                                                                <input type="text" class="form-control" id="salaryadd2v" placeholder="ค่าอาหาร" value={employeeData.salaryadd2v} onChange={(e) => handleChange(e, 'salaryadd2v')}
                                                                />
                                                            </div>
                                                        </div>
                                                    )}

                                                    {employeeData.salaryadd3 && (
                                                        <div class="col-md-4">
                                                            <div class="form-group">
                                                                <label role="salaryadd3v">ค่าเบี้ยขยัน</label>
                                                                <input type="text" class="form-control" id="salaryadd3v" placeholder="ค่าเบี้ยขยัน" value={employeeData.salaryadd3v} onChange={(e) => handleChange(e, 'salaryadd3v')}
                                                                />
                                                            </div>
                                                        </div>
                                                    )}

                                                    {employeeData.salaryadd4 && (
                                                        <div class="col-md-4">
                                                            <div class="form-group">
                                                                <label role="salaryadd4v">ค่าโทรศัพท์</label>
                                                                <input type="text" class="form-control" id="salaryadd4v" placeholder="โทรศัพท์" value={employeeData.salaryadd4v} onChange={(e) => handleChange(e, 'salaryadd4v')}
                                                                />
                                                            </div>
                                                        </div>
                                                    )}

                                                    {employeeData.salaryadd5 && (
                                                        <div class="col-md-4">
                                                            <div class="form-group">
                                                                <label role="salaryadd5v">เงินประจำตำแหน่ง</label>
                                                                <input type="text" class="form-control" id="salaryadd5v" placeholder="เงินประจำตำแหน่ง" value={employeeData.salaryadd5v} onChange={(e) => handleChange(e, 'salaryadd5v')}
                                                                />
                                                            </div>
                                                        </div>
                                                    )}

                                                    <div class="col-md-4">
                                                        <div class="form-group">
                                                            <label role="salaryaddsum">เงินเพิ่มพิเศษรวม</label>
                                                            <input type="text" class="form-control" id="salaryaddsum" placeholder="จำนวนเงิน" value={salaryaddsum} readOnly />
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
                                                            <input type="text" class="form-control" id="remainbusinessleave" placeholder="วันลากิจคงเหลือ" value={employeeData.remainbusinessleave} onChange={(e) => handleChange(e, 'remainbusinessleave')}
                                                            />
                                                        </div>
                                                    </div>

                                                    <div class="col-md-6">
                                                        <div class="form-group">
                                                            <label role="businessleavesalary">จำนวนเงินต่อวัน</label>
                                                            <input type="text" class="form-control" id="businessleavesalary" placeholder="จำนวนเงินต่อวัน" value={employeeData.businessleavesalary} onChange={(e) => handleChange(e, 'businessleavesalary')}
                                                            />
                                                        </div>
                                                    </div>
                                                </div>
                                                {/* <!--row--> */}
                                                <div class="row">
                                                    <div class="col-md-6">
                                                        <div class="form-group">
                                                            <label role="remainsickleave">วันลาป่วยคงเหลือ</label>
                                                            <input type="text" class="form-control" id="remainsickleave" placeholder="วันลาป่วยคงเหลือ" value={employeeData.remainsickleave} onChange={(e) => handleChange(e, 'remainsickleave')}
                                                            />
                                                        </div>
                                                    </div>

                                                    <div class="col-md-6">
                                                        <div class="form-group">
                                                            <label role="sickleavesalary">จำนวนเงินต่อวัน</label>
                                                            <input type="text" class="form-control" id="sickleavesalary" placeholder="จำนวนเงินต่อวัน" value={employeeData.sickleavesalary} onChange={(e) => handleChange(e, 'sickleavesalary')}
                                                            />
                                                        </div>
                                                    </div>
                                                </div>
                                                {/* <!--row--> */}
                                                <div class="row">
                                                    <div class="col-md-6">
                                                        <div class="form-group">
                                                            <label role="remainvacation">วันลาพักร้อนคงเหลือ</label>
                                                            <input type="text" class="form-control" id="remainvacation" placeholder="วันลาพักร้อนคงเหลือ" value={employeeData.remainvacation} onChange={(e) => handleChange(e, 'remainvacation')}
                                                            />
                                                        </div>
                                                    </div>

                                                    <div class="col-md-6">
                                                        <div class="form-group">
                                                            <label role="maternityleave">จำนวนเงินต่อวัน</label>
                                                            <input type="text" class="form-control" id="maternityleave" placeholder="จำนวนเงินต่อวัน" value={employeeData.maternityleave} onChange={(e) => handleChange(e, 'maternityleave')}
                                                            />
                                                        </div>
                                                    </div>
                                                </div>
                                                {/* <!--row--> */}
                                                <div class="row">
                                                    <div class="col-md-6">
                                                        <div class="form-group">
                                                            <label role="maternityleavesalary">วันลาคลอดคงเหลือ</label>
                                                            <input type="text" class="form-control" id="maternityleavesalary" placeholder="วันลาคลอดคงเหลือ" value={employeeData.maternityleavesalary} onChange={(e) => handleChange(e, 'maternityleavesalary')}
                                                            />
                                                        </div>
                                                    </div>

                                                    <div class="col-md-6">
                                                        <div class="form-group">
                                                            <label role="vacationsalary">จำนวนเงินต่อวัน</label>
                                                            <input type="text" class="form-control" id="vacationsalary" placeholder="จำนวนเงินต่อวัน" value={employeeData.vacationsalary} onChange={(e) => handleChange(e, 'vacationsalary')}
                                                            />
                                                        </div>
                                                    </div>
                                                </div>
                                                {/* <!--row--> */}
                                                <div class="row">
                                                    <div class="col-md-6">
                                                        <div class="form-group">
                                                            <label role="militaryleave">วันลาเพื่อเกณฑ์ทหารคงเหลือ</label>
                                                            <input type="text" class="form-control" id="militaryleave" placeholder="วันลาเพื่อเกณฑ์ทหารคงเหลือ" value={employeeData.militaryleave} onChange={(e) => handleChange(e, 'militaryleave')}
                                                            />
                                                        </div>
                                                    </div>

                                                    <div class="col-md-6">
                                                        <div class="form-group">
                                                            <label role="militaryleavesalary">จำนวนเงินต่อวัน</label>
                                                            <input type="text" class="form-control" id="militaryleavesalary" placeholder="จำนวนเงินต่อวัน" value={employeeData.militaryleavesalary} onChange={(e) => handleChange(e, 'militaryleavesalary')}
                                                            />
                                                        </div>
                                                    </div>
                                                </div>
                                                {/* <!--row--> */}
                                                <div class="row">
                                                    <div class="col-md-6">
                                                        <div class="form-group">
                                                            <label role="sterilization">วันลาเพื่อทำหมันคงเหลือ</label>
                                                            <input type="text" class="form-control" id="sterilization" placeholder="วันลาเพื่อทำหมันคงเหลือ" value={employeeData.sterilization} onChange={(e) => handleChange(e, 'sterilization')}
                                                            />
                                                        </div>
                                                    </div>

                                                    <div class="col-md-6">
                                                        <div class="form-group">
                                                            <label role="sterilizationsalary">จำนวนเงินต่อวัน</label>
                                                            <input type="text" class="form-control" id="sterilizationsalary" placeholder="จำนวนเงินต่อวัน" value={employeeData.sterilizationsalary} onChange={(e) => handleChange(e, 'sterilizationsalary')}
                                                            />
                                                        </div>
                                                    </div>
                                                </div>
                                                {/* <!--row--> */}
                                                <div class="row">
                                                    <div class="col-md-6">
                                                        <div class="form-group">
                                                            <label role="leavefortraining">วันลาเพื่อฝึกอบรมคงเหลือ</label>
                                                            <input type="text" class="form-control" id="leavefortraining" placeholder="วันลาเพื่อฝึกอบรมคงเหลือ" value={employeeData.leavefortraining} onChange={(e) => handleChange(e, 'leavefortraining')}
                                                            />
                                                        </div>
                                                    </div>

                                                    <div class="col-md-6">
                                                        <div class="form-group">
                                                            <label role="[leavefortrainingsalary, ">จำนวนเงินต่อวัน</label>
                                                            <input type="text" class="form-control" id="[leavefortrainingsalary, " placeholder="จำนวนเงินต่อวัน" value={employeeData.leavefortrainingsalary} onChange={(e) => handleChange(e, 'leavefortrainingsalary')}
                                                            />
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
                                    <button type="submit" class="btn b_save" onClick={updateEmployee}><i class="nav-icon fas fa-save"></i> &nbsp;บันทึก</button>
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