import endpoint from '../../config';

import axios from 'axios';
import React, { useEffect, useState } from 'react';

import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

import EmployeesSelected from './EmployeesSelected';

function AddEditEmployee() {
    const [storedEmp, setStoredEmp] = useState([]);

    const [buttonValue, setButtonValue] = useState('');
    const [newEmp, setNewEmp] = useState(true);
    const [employeeselection, setEmployeeselection] = useState([]);

    const bordertable = {
        borderLeft: '2px solid #000'
    };

    const [newWorkplace, setNewWorkplace] = useState(true);

    const [searchEmployeeId, setSearchEmployeeId] = useState('');
    const [searchEmployeeName, setSearchEmployeeName] = useState('');
    const [month, setMonth] = useState('');

    useEffect(() => {
        setMonth("01");
    }, []);

    const options = [];

    for (let i = 1; i <= 31; i++) {
        // Use padStart to add leading zeros to numbers less than 10
        const formattedValue = i.toString().padStart(2, '0');
        options.push(<option key={i} value={formattedValue}>{formattedValue}</option>);
    }



    const [_id, set_id] = useState('');
    const [employeeId, setEmployeeId] = useState('');
    const [position, setPosition] = useState(''); //ตำแหน่ง
    const [department, setDepartment] = useState(''); //แผนก
    const [workplace, setWorkplace] = useState(''); //หน่วยงาน
    const [employeeData, setEmployeeData] = useState({});
    const [jobtype, setJobtype] = useState(''); //ประเภทการจ้าง
    const [salary, setSalary] = useState(''); //เงินจ้าง

    const [startjob, setStartjob] = useState(''); //วันที่เริ่มงาน
    const [endjob, setEndjob] = useState(''); //วันที่ลาออก
    const [exceptjob, setExceptjob] = useState(''); //วันที่บรรจุ
    const [prefix, setPrefix] = useState(''); //นำหน้าชื่อ
    const [name, setName] = useState(''); //ชื่อ
    const [lastName, setLastName] = useState(''); //นามสกุล
    const [nickName, setNickName] = useState(''); //ชื่อเล่น
    const [gender, setGender] = useState(''); //เพศ
    const [dateOfBirth, setDateOfBirth] = useState(''); //วดป เกิด
    const [age, setAge] = useState(''); //อายุ
    const [idCard, setIdCard] = useState(''); //บัตรประชาชน
    const [ethnicity, setEthnicity] = useState(''); //เชื้อชาติ
    const [religion, setReligion] = useState(''); //ศาสนา
    const [maritalStatus, setMaritalStatus] = useState(''); //สถานภาพการสมรส
    const [militaryStatus, setMilitaryStatus] = useState(''); //สถานภาพทางการทหาร
    const [address, setAddress] = useState(''); //ที่อยู่ตามบัตรประชาชน
    const [currentAddress, setCurrentAddress] = useState(''); //ที่อยู่ปัจจุบัน
    const [phoneNumber, setPhoneNumber] = useState(''); //เบอร์โทรศัพท์
    const [emergencyContactNumber, setEmergencyContactNumber] = useState(''); //เบอร์ติดต่อกรณีฉุกเฉิน
    const [idLine, setIdLine] = useState(''); //ไอดีไลน์
    const [vaccination, setVaccination] = useState([]); //การรับวัคซีน
    const [treatmentRights, setTreatmentRights] = useState(''); //สิทธิการรักษาพยาบาล
    const [workplacearea, setWorkplacearea] = useState(''); //



    const [workplaceSelection, setWorkplaceSelection] = useState([]);

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
                console.log(data);

            }
            )
            .catch(error => console.error('Error fetching employees:', error));

    }, []);


    const handleDateOfBirth = (date) => {
        setDateOfBirth(date);
    };
    const handleMilitaryStatus = (event) => {
        setMilitaryStatus(event.target.value);
    };
    const [copyAddress, setCopyAddress] = useState(false);

    const handleCheckboxChange = () => {
        setCopyAddress(!copyAddress); // Toggle the value of copyAddress
        if (!copyAddress) {
            setCurrentAddress(address); // Copy address to currentAddress
        } else {
            setCurrentAddress(''); // Reset currentAddress
        }
    };

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
        // if (filtered !== '') {
        //     if (employeeData.workplace == '') {
        //         setWorkplacearea('');
        //     } else {
        //         setWorkplacearea(filtered[0].workplaceArea);
        //     }

        // } else {
        //     setWorkplacearea('');
        // }

        // setWorkplacearea(filtered[0].workplaceArea );
    };

    //////////////////////////////
    const [employeeList, setEmployeeList] = useState([]);
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

    useEffect(() => {
        // setNewEmp(true);
        if (employeeselection.length > 0) {
            setNewEmp(true);
        } else {
            setNewEmp(false);
        }

    }, [employeeselection]);

    useEffect(() => {
        const storedItem = localStorage.getItem('selectedEmployees');
        if (storedItem) {
            // Item exists in localStorage
            // setStoredEmp(storedItem);
            const parsedData = JSON.parse(storedItem);
            setStoredEmp(parsedData);
            //      console.log('Item exists:', storedItem);
            setNewEmp(true);

            // setNewEmp(false);
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

    console.log(workplaceList);

    //search employee name by employeeId
    // console.log(workplaceList);
    // console.log(workplaceList);



    /////////////////////////////////////////////
    const [wId, setWId] = useState('');
    const [wName, setWName] = useState('');
    const [wDate, setWDate] = useState('');
    const [wShift, setWShift] = useState('');
    const [wStartTime, setWStartTime] = useState('');
    const [wEndTime, setWEndTime] = useState('');
    const [wAllTime, setWAllTime] = useState('');
    const [wOtTime, setWOtTime] = useState('');
    const [wSelectOtTime, setWSelectOtTime] = useState('');
    const [wSelectOtTimeout, setWSelectOtTimeout] = useState('');

    ///////////////////
    function handleClickResult(workplace) {
        // Populate all the startTime input fields with the search result value
        const updatedRowDataList = rowDataList.map(rowData => ({
            ...rowData,
            startTime: workplace.workStart1,
            endTime: workplace.workEnd1,
            selectotTime: workplace.workEnd1,
        }));

        // Update the state
        setRowDataList(updatedRowDataList);
    }


    //data for search
    const [searchWorkplaceId, setSearchWorkplaceId] = useState(''); //รหัสหน่วยงาน
    const [searchWorkplaceName, setSearchWorkplaceName] = useState(''); //ชื่อหน่วยงาน
    const [searchResult, setSearchResult] = useState([]);

    async function handleSearch(event) {
        event.preventDefault();


        // get value from form search
        const data = {
            employeeId: searchEmployeeId,
            name: searchEmployeeName,
            idCard: '',
            workPlace: '',
        };

        try {
            const response = await axios.post(endpoint + '/employee/search', data);
            setSearchResult(response.data.employees);
            // alert(response.data.employees.length);
            if (response.data.employees.length < 1) {
                // window.location.reload();
                setEmployeeId('');
                setName('');
                alert('ไม่พบข้อมูล');
            } else {
                // alert(response.data.employees.length);

                //clean form 
                setSearchEmployeeId('');
                setSearchEmployeeName('');

                // Set search values
                setEmployeeId(response.data.employees[0].employeeId);
                setName(response.data.employees[0].name);

                // setSearchEmployeeId(response.data.employees[0].employeeId);
                // setSearchEmployeeName(response.data.employees[0].name);

                // console.log('workOfOT:', response.data.workplaces[0].workOfOT);
                // console.log('workOfOT:', endTime);

            }
        } catch (error) {
            alert('กรุณาตรวจสอบข้อมูลในช่องค้นหา');
            // window.location.reload();
        }
    }



    async function handleManageEmployee(event) {
        event.preventDefault();
        const data = {
            employeeId: employeeId,
            position: position,
            department: department,
            workplace: workplace,
            jobtype: jobtype,
            salary: salary,
            startjob: startjob,
            endjob: endjob,
            exceptjob: exceptjob,
            prefix: prefix,
            name: name,
            lastName: lastName,
            nickName: nickName,
            gender: gender,
            dateOfBirth: dateOfBirth,
            age: age,
            idCard: idCard,
            ethnicity: ethnicity,
            religion: religion,
            maritalStatus: maritalStatus,
            militaryStatus: militaryStatus,
            address: address,
            currentAddress: currentAddress,
            phoneNumber: phoneNumber,
            emergencyContactNumber: emergencyContactNumber,
            idLine: idLine,
            // vaccination: vaccination,
            // treatmentRights: treatmentRights,
        };
        console.log(data);

        //check create or update Employee
        if (newEmp) {
            // alert('create employee');

            try {
                const response = await axios.post(endpoint + '/employee/create', data);
                // setEmployeesResult(response.data.employees);
                alert('บันทึกสำเร็จ');

                window.location.reload();

            } catch (error) {
                alert('กรุณาตรวจสอบข้อมูลในช่องกรอกข้อมูล', error);
                console.error('Error:', error);
                console.error('Response Data:', error.response.data);


                // window.location.reload();

            }

        } else {
            if (buttonValue == 'save') {
                // Make the API call to update the resource by ID
                try {
                    const response = await axios.put(endpoint + '/employee/update/' + _id, data);
                    // setEmployeesResult(response.data.employees);
                    if (response) {
                        alert("บันทึกสำเร็จ");
                        window.location.reload();

                    }
                } catch (error) {
                    alert('กรุณาตรวจสอบข้อมูลในช่องกรอกข้อมูล');
                    alert(error);
                    window.location.reload();
                }


            }

        }

    }


    /////////////////
    const [selectedOption, setSelectedOption] = useState('agencytime');

    return (
        <body class="hold-transition sidebar-mini" className='editlaout'>
            <div class="wrapper">
                <div class="content-wrapper">
                    {/* <!-- Content Header (Page header) --> */}
                    <ol class="breadcrumb">
                        <li class="breadcrumb-item"><i class="fas fa-home"></i> <a href="index.php">หน้าหลัก</a></li>
                        <li class="breadcrumb-item"><a href="#"> ระบบเงินเดือน</a></li>
                        <li class="breadcrumb-item active">ใบลงเวลาการปฏิบัติงาน</li>
                    </ol>
                    <div class="content-header">
                        <div class="container-fluid">
                            <div class="row mb-2">
                                <h1 class="m-0"><i class="far fa-arrow-alt-circle-right"></i> ใบลงเวลาการปฏิบัติงาน</h1>
                            </div>
                        </div>
                    </div>
                    {/* <!-- /.content-header -->
<!-- Main content --> */}
                    <section class="content">
                        <div class="row">
                            <div class="col-md-12">
                                <div class="container-fluid">
                                    {/* <h2 class="title">ข้อมูลการลงเวลาทำงานของพนักงาน</h2> */}
                                    <div class="row">
                                        <div class="col-md-12">
                                            <section class="Frame">
                                                <div class="col-md-12">
                                                    <form onSubmit={handleSearch}>
                                                        <div class="row">
                                                            <div class="col-md-6">
                                                                <div class="form-group">
                                                                    <label role="searchEmployeeId">รหัสพนักงาน</label>
                                                                    <input type="text" class="form-control" id="searchEmployeeId" placeholder="รหัสพนักงาน" value={searchEmployeeId} onChange={(e) => setSearchEmployeeId(e.target.value)} />
                                                                </div>
                                                            </div>
                                                            <div class="col-md-6">
                                                                <div class="form-group">
                                                                    <label role="searchname">ชื่อพนักงาน</label>
                                                                    <input type="text" class="form-control" id="searchname" placeholder="ชื่อพนักงาน" value={searchEmployeeName} onChange={(e) => setSearchEmployeeName(e.target.value)} />
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
                                                    <div class="d-flex justify-content-center">
                                                        <div class="row">
                                                            <div class="col-md-12">
                                                                <div class="form-group">
                                                                    <ul style={{ listStyle: 'none', marginLeft: "-2rem" }}>
                                                                        {searchResult.map(workplace => (
                                                                            <li
                                                                                key={workplace.id}
                                                                                onClick={() => handleClickResult(workplace)}
                                                                            >
                                                                                รหัส {workplace.employeeId} ชื่อ{workplace.name}
                                                                            </li>
                                                                        ))}
                                                                    </ul>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </section>
                                            {/* <!--Frame--> */}
                                        </div>
                                    </div>
                                    <form onSubmit={handleManageEmployee}>
                                        <h2 class="title">ข้อมูลส่วนบุคคลพนักงาน</h2>
                                        <div class="row">
                                            <div class="col-md-12">
                                                <section class="Frame">
                                                    <div class="col-md-12">
                                                        <div class="row">
                                                            <div class="col-md-3">
                                                                <div class="form-group">
                                                                    <label role="prefix">รหัส</label>
                                                                    <input type="text" class="form-control" id="employeeId" placeholder="รหัสพนักงาน" value={employeeId} onChange={(e) => setEmployeeId(e.target.value)} />

                                                                </div>
                                                            </div>
                                                            <div class="col-md-3">
                                                                <div class="form-group">
                                                                    <label role="name">หน่วยงาน</label>
                                                                    <input
                                                                        type="text"
                                                                        id="workplace"
                                                                        name="workplace"
                                                                        list="workplaces"
                                                                        className="form-control"
                                                                        value={workplace}
                                                                        onChange={handleWorkplace}
                                                                    />

                                                                    <datalist id="workplaces">
                                                                        <option value="">ยังไม่ระบุหน่วยงาน</option>
                                                                        {workplaceSelection.map((wp) => (
                                                                            <option key={wp._id} value={wp.workplaceId}>
                                                                                {wp.workplaceName}
                                                                            </option>
                                                                        ))}
                                                                    </datalist>
                                                                </div>
                                                            </div>
                                                            <div class="col-md-3">
                                                                <div class="form-group">
                                                                    <label role="lastName">ตำแหน่ง</label>
                                                                    <input type="text" class="form-control" id="position" placeholder="ตำแหน่ง" value={position} onChange={(e) => setPosition(e.target.value)} />
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div class="row">
                                                            <div class="col-md-3">
                                                                <div class="form-group">
                                                                    <label role="prefix">เงินจ้าง</label>
                                                                    <input type="text" name="salary" class="form-control" id="name" placeholder="เงินจ้าง" value={salary} onChange={(e) => setSalary(e.target.value)} />

                                                                </div>
                                                            </div>
                                                            <div class="col-md-3">
                                                                <div class="form-group">
                                                                    <label role="name">ประเภทการจ้าง</label>
                                                                    <input type="text" name="jobtype" class="form-control" id="jobtype" placeholder="ประเภทการจ้าง" value={jobtype} onChange={(e) => setJobtype(e.target.value)} />
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div class="row">
                                                            <div class="col-md-3">
                                                                <div class="form-group">
                                                                    <label role="prefix">คำนำหน้า</label>
                                                                    <input type="text" name="prefix" class="form-control" id="name" placeholder="คำนำหน้า" value={prefix} onChange={(e) => setPrefix(e.target.value)} />

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
                                                                    <input type="text" name="lastName" class="form-control" id="lastName" placeholder="นามสกุล" value={lastName} onChange={(e) => setLastName(e.target.value)} />
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
                                                                    <input type="text" name="gender" class="form-control" id="gender" placeholder="ชื่อเล่น" value={gender} onChange={(e) => setGender(e.target.value)} />
                                                                </div>
                                                            </div>

                                                            <div class="col-md-3">
                                                                <div class="form-group">
                                                                    <label role="dateOfBirth">วันเดือนปีเกิด</label>
                                                                    <div style={{ position: 'relative', zIndex: 9999 }}>
                                                                        <DatePicker id="dateOfBirth" name="dateOfBirth"
                                                                            className="form-control"
                                                                            popperClassName="datepicker-popper"
                                                                            selected={dateOfBirth}
                                                                            onChange={handleDateOfBirth}
                                                                            dateFormat="dd/MM/yyyy" />
                                                                    </div>
                                                                </div>
                                                            </div>

                                                            {/* <div class="col-md-3">
                                                        <div class="form-group">
                                                            <label role="dateOfBirth">วันเดือนปีเกิด</label>
                                                            <DatePicker id="dateOfBirth" name="dateOfBirth"
                                                                selected={dateOfBirth}
                                                                onChange={handleDateOfBirth}
                                                                dateFormat="dd/MM/yyyy" />
                                                        </div>
                                                    </div> */}

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
                                                                        value={militaryStatus} onChange={handleMilitaryStatus}>
                                                                        <option value="ยกเว้นการเกณฑ์ทหาร">ยกเว้นการเกณฑ์ทหาร</option>
                                                                        <option value="ผ่านการเกณฑ์ทหารแล้ว">ผ่านการเกณฑ์ทหารแล้ว</option>
                                                                        <option value="ไม่ผ่านการเกณฑ์ทหาร">ไม่ผ่านการเกณฑ์ทหาร</option>
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
                                                                        <input type="checkbox" checked={copyAddress} id="" name="radio1" onChange={handleCheckboxChange}
                                                                        /> ใช้ที่อยู่ตามบัตรประชาชน
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
                                            </div>
                                        </div>


                                        <div class="form-group">
                                            {newEmp ? (
                                                <button type="submit" name="save" value="create" onClick={() => setButtonValue('create')} class="btn b_save"><i class="nav-icon fas fa-save"></i> &nbsp;สร้างพนักงานใหม่</button>
                                            ) : (
                                                <button type="submit" name="save" value="save" onClick={() => setButtonValue('save')} class="btn b_save"><i class="nav-icon fas fa-save"></i> &nbsp;บันทึก</button>
                                            )}
                                            <button class="btn clean"><i class="far fa-window-close"></i> &nbsp;ยกเลิก</button>                                        </div>
                                    </form>

                                </div>
                            </div>
                        </div>
                        {/* <!-- /.container-fluid --> */}
                    </section>
                </div>

            </div>

        </body>

    )
}

export default AddEditEmployee