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

    // useEffect(() => {
    //     const storedValue = sessionStorage.getItem('empSelect');
    //     if (storedValue) {
    //         // setEmployeeselection(storedValue);
    //     }

    //     //get all Workplace from API
    //     fetch(endpoint + '/workplace/listselect') // Update with your API endpoint
    //         .then(response => response.json())
    //         .then(data => {
    //             setWorkplaceSelection(data);
    //         }
    //         )
    //         .catch(error => console.error('Error fetching employees:', error));

    // }, []);


    function handleSalaryadd1() {
        alert(employeeData.salaryadd1);

        // const { checked } = await e.target;
        // awaitsetEmployeeData(prevData => ({
        //     ...prevData,
        //     [field]: checked,
        // }));

    }

    const handleChange = async (e, field) => {
        // if ((field == 'salaryadd1') || (field == 'salaryadd2') || (field == 'salaryadd3') || (field == 'salaryadd4') || (field == 'salaryadd5')) {
        //     const { checked } = await e.target;
        //     if (!checked) {
        //         checked = '';
        //     } else {
        //         checked = on;
        //     }
        //     alert(checked);

        //     await setEmployeeData(prevData => ({
        //         ...prevData,
        //         [field]: checked,
        //     }));
        // } else {
        setEmployeeData(prevData => ({
            ...prevData,
            [field]: e.target.value,
        }));

        // }

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

    const [salaryadd1, setSalaryadd1] = useState(false); //เงินเพิ่มพิเศษ ค่ารถ
    const [salaryadd2, setSalaryadd2] = useState(false); //เงินเพิ่มพิเศษ ค่าอาหาร
    const [salaryadd3, setSalaryadd3] = useState(false); //เงินเพิ่มพิเศษ เบี้ยขยัน
    const [salaryadd4, setSalaryadd4] = useState(false); //เงินเพิ่มพิเศษ โทรศัพท์
    const [salaryadd5, setSalaryadd5] = useState(false); //เงินเพิ่มพิเศษ เงินประจำตำแหน่ง

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

        setSalaryadd1(empSelect.salaryadd1);
        setSalaryadd1v(parseFloat(empSelect.salaryadd1v) || 0);
        setSalaryadd2(empSelect.salaryadd2);
        setSalaryadd2v(parseFloat(empSelect.salaryadd2v) || 0);
        setSalaryadd3(empSelect.salaryadd3);
        setSalaryadd3v(parseFloat(empSelect.salaryadd3v) || 0);
        setSalaryadd4(empSelect.salaryadd4);
        setSalaryadd4v(parseFloat(empSelect.salaryadd4v) || 0);
        setSalaryadd5(empSelect.salaryadd5);
        setSalaryadd5v(parseFloat(empSelect.salaryadd5v) || 0);

    }
    // console.log(salaryadd1v + " 1");
    // console.log(salaryadd2v + " 2");
    // console.log(salaryadd3v + " 3");
    // console.log(salaryadd4v + " 4");
    // console.log(salaryadd5v + " 5x");

    const toggleCheckbox1 = () => {
        setSalaryadd1(prevValue => !prevValue); // Toggle the checkbox state
        handleChange({ target: { type: 'checkbox', checked: !employeeData.salaryadd1 } }, 'salaryadd1');
        // alert('1');
    };

    const toggleCheckbox2 = () => {
        setSalaryadd2(prevValue => !prevValue); // Toggle the checkbox state
        handleChange({ target: { type: 'checkbox', checked: !employeeData.salaryadd2 } }, 'salaryadd2');
    };

    const toggleCheckbox3 = () => {
        setSalaryadd3(prevValue => !prevValue); // Toggle the checkbox state
        handleChange({ target: { type: 'checkbox', checked: !employeeData.salaryadd3 } }, 'salaryadd3');
    };

    const toggleCheckbox4 = () => {
        setSalaryadd4(prevValue => !prevValue); // Toggle the checkbox state
        handleChange({ target: { type: 'checkbox', checked: !employeeData.salaryadd4 } }, 'salaryadd4');
    };

    const toggleCheckbox5 = () => {
        setSalaryadd5(prevValue => !prevValue); // Toggle the checkbox state
        handleChange({ target: { type: 'checkbox', checked: !employeeData.salaryadd5 } }, 'salaryadd5');
    };

    console.log(salaryadd1 + " 1");
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
                            <div class="col-md-3">
                                <section class="Frame">
                                    <EmployeesSelected onEmployeeSelect={onEmployeeSelect} />
                                </section>

                            </div>
                            <form onSubmit={handleManageSalary}>


                                <h2 class="title">เงินเพิ่มพิเศษ</h2>
                                <div class="row">
                                    <div class="col-md-9">
                                        <section class="Frame">
                                            <div class="col-md-12">
                                                <div class="row">
                                                    <div class="col-md-4">
                                                        <div class="form-group">
                                                            <label>รายการเงินเพิ่มพิเศษ</label>
                                                            <label>รายการเงินเพิ่มพิเศษ</label>
                                                            <button onClick={() => toggleCheckbox1('salaryadd1')} style={{ margin: '0.5rem' }}>ค่ารถ</button>
                                                            <label>
                                                                <input
                                                                    type="checkbox"
                                                                    id="salaryadd1"
                                                                    checked={employeeData.salaryadd1}
                                                                    // onChange={e => handleChange(e, 'salaryadd1')}
                                                                    style={{ display: 'none' }}
                                                                />
                                                            </label>
                                                            <button onClick={() => toggleCheckbox2('salaryadd2')} style={{ margin: '0.5rem' }}>ค่าอาหาร</button>
                                                            <label>
                                                                <input
                                                                    type="checkbox"
                                                                    id="salaryadd2"
                                                                    checked={employeeData.salaryadd2}
                                                                    // onChange={e => handleChange(e, 'salaryadd2')}
                                                                    style={{ display: 'none' }} />
                                                            </label>
                                                            <button onClick={() => toggleCheckbox3('salaryadd3')} style={{ margin: '0.5rem' }}>เบี้ยขยัน</button>
                                                            <label>
                                                                <input
                                                                    type="checkbox"
                                                                    id="salaryadd3"
                                                                    checked={employeeData.salaryadd3}
                                                                    // onChange={e => handleChange(e, 'salaryadd3')}
                                                                    style={{ display: 'none' }} />
                                                            </label>
                                                            <button onClick={() => toggleCheckbox4('salaryadd4')} style={{ margin: '0.5rem' }}>ค่าโทรศัพท์</button>

                                                            <label>
                                                                <input
                                                                    type="checkbox"
                                                                    id="salaryadd4"
                                                                    checked={employeeData.salaryadd4}
                                                                    // onChange={e => handleChange(e, 'salaryadd4')}
                                                                    style={{ display: 'none' }}
                                                                />
                                                            </label>

                                                            <button onClick={() => toggleCheckbox5('salaryadd5')} style={{ margin: '0.5rem' }}>เงินประจำตำแหน่ง</button>

                                                            <label >
                                                                <input
                                                                    type="checkbox"
                                                                    id="salaryadd5"
                                                                    checked={employeeData.salaryadd5}
                                                                    // onChange={e => handleChange(e, 'salaryadd5')}
                                                                    style={{ display: 'none' }} />
                                                            </label>
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

                                                    {/* {employeeData.salaryadd1 && ( */}
                                                    <div class="col-md-4">
                                                        <div class="form-group">
                                                            <label role="salaryadd1v">เงินเพิ่มค่ารถ</label>
                                                            <label htmlFor="salaryadd1" style={{ cursor: 'pointer' }}>
                                                                <div className={`custom-checkbox ${salaryadd1 ? 'checked' : ''}`}>
                                                                    <i className={`fa ${salaryadd1 ? 'fa-check' : 'fa-times'}`} />
                                                                </div>
                                                            </label>
                                                            <input type="text" class="form-control" id="salaryadd1v" placeholder="ค่ารถ" value={employeeData.salaryadd1v} onChange={(e) => handleChange(e, 'salaryadd1v')}
                                                            />
                                                        </div>
                                                    </div>
                                                    {/* )} */}

                                                    {/* {employeeData.salaryadd2 && ( */}
                                                    <div class="col-md-4">
                                                        <div class="form-group">
                                                            <label role="salaryadd2v">เงินเพิ่มค่าอาหาร</label>
                                                            <label htmlFor="salaryadd2" style={{ cursor: 'pointer' }}>
                                                                <div className={`custom-checkbox ${salaryadd2 ? 'checked' : ''}`}>
                                                                    <i className={`fa ${salaryadd2 ? 'fa-check' : 'fa-times'}`} />
                                                                </div>
                                                            </label>
                                                            <input type="text" class="form-control" id="salaryadd2v" placeholder="ค่าอาหาร" value={employeeData.salaryadd2v} onChange={(e) => handleChange(e, 'salaryadd2v')}
                                                            />
                                                        </div>
                                                    </div>
                                                    {/* )} */}

                                                    {/* {employeeData.salaryadd3 && ( */}
                                                    <div class="col-md-4">
                                                        <div class="form-group">
                                                            <label role="salaryadd3v">ค่าเบี้ยขยัน</label>
                                                            <label htmlFor="salaryadd3" style={{ cursor: 'pointer' }}>
                                                                <div className={`custom-checkbox ${salaryadd3 ? 'checked' : ''}`}>
                                                                    <i className={`fa ${salaryadd3 ? 'fa-check' : 'fa-times'}`} />
                                                                </div>
                                                            </label>
                                                            <input type="text" class="form-control" id="salaryadd3v" placeholder="ค่าเบี้ยขยัน" value={employeeData.salaryadd3v} onChange={(e) => handleChange(e, 'salaryadd3v')}
                                                            />
                                                        </div>
                                                    </div>
                                                    {/* )} */}

                                                    {/* {employeeData.salaryadd4 && ( */}
                                                    <div class="col-md-4">
                                                        <div class="form-group">
                                                            <label role="salaryadd4v">ค่าโทรศัพท์</label>
                                                            <label htmlFor="salaryadd4" style={{ cursor: 'pointer' }}>
                                                                <div className={`custom-checkbox ${salaryadd4 ? 'checked' : ''}`}>
                                                                    <i className={`fa ${salaryadd4 ? 'fa-check' : 'fa-times'}`} />
                                                                </div>
                                                            </label>
                                                            <label htmlFor="salaryadd4" style={{ cursor: 'pointer' }}>
                                                                <div className={`custom-checkbox ${salaryadd4 ? 'checked' : ''}`}>
                                                                    {salaryadd4 ? (
                                                                        <input
                                                                            type="text"
                                                                            className="form-control"
                                                                            id="salaryadd4v"
                                                                            placeholder="ค่ารถ"
                                                                            value={employeeData.salaryadd4v}
                                                                            onChange={(e) => handleChange(e, 'salaryadd4v')}

                                                                        />
                                                                    ) : null}
                                                                </div>
                                                            </label>

                                                        </div>
                                                    </div>
                                                    {/* )} */}

                                                    {/* {employeeData.salaryadd5 && ( */}
                                                    <div class="col-md-4">
                                                        <div class="form-group">
                                                            <label role="salaryadd5v">เงินประจำตำแหน่ง</label>
                                                            <label htmlFor="salaryadd5" style={{ cursor: 'pointer' }}>
                                                                <div className={`custom-checkbox ${salaryadd5 ? 'checked' : ''}`}>
                                                                    <i className={`fa ${salaryadd5 ? 'fa-check' : 'fa-times'}`} />
                                                                </div>
                                                            </label>
                                                            <input type="text" class="form-control" id="salaryadd5v" placeholder="เงินประจำตำแหน่ง" value={employeeData.salaryadd5v} onChange={(e) => handleChange(e, 'salaryadd5v')}
                                                            />
                                                        </div>
                                                    </div>
                                                    {/* )} */}
                                                    <div class="col-md-4">
                                                        <div class="form-group">
                                                            <label role="salaryaddsum">เงินเพิ่มพิเศษรวม</label>
                                                            <input type="text" class="form-control" id="salaryaddsum" placeholder="จำนวนเงิน" value={employeeData.salaryaddsum} readOnly />
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