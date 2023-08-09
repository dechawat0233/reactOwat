import endpoint from '../../config';

import axios from 'axios';
import React, { useEffect, useState } from 'react';

import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

import EmployeesSelected from './EmployeesSelected';

function Addsettime() {

    const [newWorkplace, setNewWorkplace] = useState(true);

    //Workplace data
    const [workplaceId, setWorkplaceId] = useState(''); //รหัสหน่วยงาน
    const [workplaceName, setWorkplaceName] = useState(''); //ชื่อหน่วยงาน
    const [workplacestay, setWorkplacestay] = useState(''); //สังกัด
    const [workplaceArea, setWorkplaceArea] = useState(''); //สถานที่ปฏิบัติงาน
    const [workOfWeek, setWorkOfWeek] = useState(''); //วันทำงานต่อสัปดาห์
    const [workkStart1, setWorkkStart1] = useState(''); //เวลาเริ่มกะเช้า
    const [workEnd1, setWorkEnd1] = useState(''); //เวลาออกกะเช้า
    const [workkStart2, setWorkkStart2] = useState(''); //เวลาเข้ากะบ่าย
    const [workEnd2, setWorkEnd2] = useState(''); //เวลาออกกะบ่าย
    const [workStart3, setWorkStart3] = useState(''); //เวลาเข้ากะเย็น
    const [workEnd3, setWorkEnd3] = useState(''); //เวลาออกกะเย็น
    const [workOfHour, setWorkOfHour] = useState(''); //ชั่วโมงทำงานต่อสัปดาห์
    const [workOfOT, setWorkOfOT] = useState(''); //ชั่วโมง OT ต่อสัปดาห์

    const [workRate, setWorkRate] = useState(''); //ค่าจ้างต่อวัน
    const [workRateOT, setWorkRateOT] = useState(''); //ค่าจ้าง OT ต่อชั่วโมง
    const [workTotalPeople, setWorkTotalPeople] = useState(''); //จำนวนคนในหน่วยงาน
    const [workRateDayoff, setWorkRateDayoff] = useState(''); //ค่าจ้างวันหยุด ต่อวัน
    const [workRateDayoffHour, setWorkRateDayoffHour] = useState(''); //ค่าจ้างวันหยุดต่อชั่วโมง
    const [workplaceAddress, setWorkplaceAddress] = useState(''); //ที่อยู่หน่วยงาน

    /////////////////////////////////////////////
    const [staffId, setStaffId] = useState(''); //รหัสหน่วยงาน
    const [staffName, setStaffName] = useState(''); //รหัสหน่วยงาน
    const [startTime, setStartTime] = useState(''); //รหัสหน่วยงาน
    const [endTime, setEndTime] = useState(''); //รหัสหน่วยงาน
    const [allTime, setAllTime] = useState(''); //รหัสหน่วยงาน
    const [otTime, setOtTime] = useState(''); //รหัสหน่วยงาน

    const [startjob, setStartjob] = useState(''); //วันที่เริ่มงาน
    const handleStartDateChange = (date) => {
        setStartjob(date);
    };

    const [startjob1, setStartjob1] = useState(''); //วันที่เริ่มงาน
    const handleStartDateChange1 = (date) => {
        setStartjob1(date);
    };
    const [startjob2, setStartjob2] = useState(''); //วันที่เริ่มงาน
    const handleStartDateChange2 = (date) => {
        setStartjob2(date);
    };
    const [startjob3, setStartjob3] = useState(''); //วันที่เริ่มงาน
    const handleStartDateChange3 = (date) => {
        setStartjob3(date);
    };



    const numberOfRows = 30; // Fixed number of rows
    const initialRowData = {
        staffId: '',
        staffName: '',
        shift: 'morning_shift',
        startTime: '',
        endTime: '',
        allTime: '',
        otTime: '',
        selectotTime: '',
        selectotTimeOut: '',
    };

    const [rowDataList, setRowDataList] = useState(new Array(numberOfRows).fill(initialRowData));

    const handleFieldChange = (index, fieldName, value) => {
        setRowDataList(prevDataList => {
            const newDataList = [...prevDataList];
            newDataList[index] = {
                ...newDataList[index],
                [fieldName]: value,
            };
            return newDataList;
        });
    };

    const numberOfRows2 = 30; // Fixed number of rows
    const initialRowData2 = {
        staffId: '',
        staffName: '',
        startjob: null, // Use null as initial value for DatePicker
        shift: 'morning_shift',
        startTime: '',
        endTime: '',
        allTime: '',
        otTime: '',
        selectotTime: '',
        selectotTimeOut: '',
    };

    const [rowDataList2, setRowDataList2] = useState(new Array(numberOfRows2).fill(initialRowData2));

    const handleFieldChange2 = (index2, fieldName2, value) => {
        setRowDataList2(prevDataList => {
            const newDataList2 = [...prevDataList];
            newDataList2[index2] = {
                ...newDataList2[index2],
                [fieldName2]: value,
            };
            return newDataList2;
        });
    };

    const handleStartDateChange4 = (index2, date) => {
        handleFieldChange2(index2, 'startjob', date);
    };



    async function handleManageWorkplace(event) {
        event.preventDefault();

        //get data from input in useState to data 
        const data = {
            workplaceId: workplaceId,
            workplaceName: workplaceName,
            workplaceArea: workplaceArea,
            workOfWeek: workOfWeek,
            workkStart1: workkStart1,
            workEnd1: workEnd1,
            workkStart2: workkStart2,
            workEnd2: workEnd2,
            workStart3: workStart3,
            workEnd3: workEnd3,
            workOfHour: workOfHour,
            workOfOT: workOfOT,
            workRate: workRate,
            workRateOT: workRateOT,
            workTotalPeople: workTotalPeople,
            workRateDayoff: workRateDayoff,
            workRateDayoffHour: workRateDayoffHour,
            workplaceAddress: workplaceAddress
        };

        //check create or update Employee
        if (newWorkplace) {
            // alert('Create Workplace');
            try {
                const response = await axios.post(endpoint + '/workplace/create', data);
                // setEmployeesResult(response.data.employees);

            } catch (error) {
                alert('กรุณาตรวจสอบข้อมูลในช่องกรอกข้อมูล');
                // window.location.reload();

            }

        } else {

        }

    }

    /////////////////
    const [selectedOption, setSelectedOption] = useState('');

    const handleOptionChange = (event) => {
        setSelectedOption(event.target.value);
    };

    const handleSubmitForm1 = (event) => {
        event.preventDefault();
        // Handle submission for Form 1
    };

    const handleSubmitForm2 = (event) => {
        event.preventDefault();
        // Handle submission for Form 2
    };

    let formToShow = null;
    if (selectedOption === 'agencytime') {
        formToShow = (
            <form onSubmit={handleSubmitForm1}>
                <form >
                    <div class="row">
                        <div class="col-md-3">
                            <div class="form-group">
                                <label role="agencynumber">รหัสหน่วยงาน</label>
                                <input type="text" class="form-control" id="agencynumber" placeholder="รหัสหน่วยงาน" value={workplaceId} onChange={(e) => setWorkplaceId(e.target.value)} />
                            </div>
                        </div>
                        <div class="col-md-3">
                            <div class="form-group">
                                <label role="agencyname">ชื่อหน่วยงาน</label>
                                <input type="text" class="form-control" id="agencyname" placeholder="ชื่อหน่วยงาน" value={workplaceId} onChange={(e) => setWorkplaceId(e.target.value)} />
                            </div>
                        </div>
                        <div class="col-md-3">
                            <div class="form-group">
                                <label role="datetime">วันที่</label>
                                <div style={{ position: 'relative', zIndex: 9999, marginLeft: "0rem" }}>
                                    <DatePicker id="datetime" name="datetime"
                                        className="form-control" // Apply Bootstrap form-control class
                                        popperClassName="datepicker-popper" // Apply custom popper class if needed
                                        selected={startjob}
                                        onChange={handleStartDateChange}
                                        dateFormat="dd/MM/yyyy" />
                                </div>
                            </div>

                        </div>
                    </div>

                </form>
                <form onSubmit={handleManageWorkplace}>
                    <section class="Frame">
                        <div class="container">
                            <table class="table">
                                <thead>
                                    <tr>
                                        <th>รหัสพนักงาน</th>
                                        <th>ชื่อพนักงาน</th>
                                        <th>กะการทำงาน</th>
                                        <th>เวลาเข้างาน</th>
                                        <th>เวลาออกงาน</th>
                                        <th>ชั่วโมงทำงาน</th>
                                        <th>ชั่วโมง OT</th>
                                        <th>เวลา OT</th>
                                    </tr>
                                </thead>
                                <tbody>

                                    {rowDataList.map((rowData, index) => (
                                        <tr key={index}>
                                            {/* <td>
                                                <input type="text" className="form-control" name="staffId" value={rowData.staffId} onChange={(e) => handleFieldChange(index, 'staffId', e.target.value)} />
                                            </td> */}
                                            <td><input type="text" className="form-control" name="staffId" value={rowData.staffId} onChange={(e) => handleFieldChange(index, 'staffId', e.target.value)} /></td>
                                            <td><input type="text" className="form-control" name="staffName" value={rowData.staffName} onChange={(e) => handleFieldChange(index, 'staffName', e.target.value)} /></td>
                                            <td>
                                                <select className="form-control" value={rowData.shift} onChange={(e) => handleFieldChange(index, 'shift', e.target.value)} style={{ width: '5.5rem' }} >
                                                    <option value="morning_shift">กะเช้า</option>
                                                    <option value="afternoon_shift">กะบ่าย</option>
                                                    <option value="night_shift">กะดึก</option>
                                                </select>
                                            </td>
                                            <td><input type="time" className="form-control" name="startTime" value={rowData.startTime} onChange={(e) => handleFieldChange(index, 'startTime', e.target.value)} style={{ width: '7rem' }} /></td>
                                            <td><input type="time" className="form-control" name="endTime" value={rowData.endTime} onChange={(e) => handleFieldChange(index, 'endTime', e.target.value)} style={{ width: '7rem' }} /></td>
                                            <td><input type="text" className="form-control" name="allTime" value={rowData.allTime} onChange={(e) => handleFieldChange(index, 'allTime', e.target.value)} style={{ width: '4rem' }} /></td>
                                            <td><input type="text" className="form-control" name="otTime" value={rowData.otTime} onChange={(e) => handleFieldChange(index, 'otTime', e.target.value)} style={{ width: '4rem' }} /></td>
                                            <td><input type="time" className="form-control" name="selectotTime" value={rowData.selectotTime} onChange={(e) => handleFieldChange(index, 'selectotTime', e.target.value)} style={{ width: '7rem' }} /> </td>
                                            <td><input type="time" className="form-control" name="selectotTimeOut" value={rowData.selectotTimeOut} onChange={(e) => handleFieldChange(index, 'selectotTimeOut', e.target.value)} style={{ width: '7rem' }} /> </td>

                                            {/* ... other input fields */}
                                            {/* ... other input fields */}
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </section>

                </form>
                <div class="form-group">
                    <button class="btn b_save"><i class="nav-icon fas fa-save"></i> &nbsp; บันทึก</button>
                </div>
            </form>
        );
    } else if (selectedOption === 'persontime') {
        formToShow = (
            <form onSubmit={handleSubmitForm2}>
                <form >
                    <div class="row">
                        <div class="col-md-3">
                            <div class="form-group">
                                <label role="agencynumber">รหัสพนักงาน</label>
                                <input type="text" class="form-control" id="agencynumber" placeholder="รหัสหน่วยงาน" value={workplaceId} onChange={(e) => setWorkplaceId(e.target.value)} />
                            </div>
                        </div>
                        <div class="col-md-3">
                            <div class="form-group">
                                <label role="agencyname">ชื่อพนักงาน</label>
                                <input type="text" class="form-control" id="agencyname" placeholder="ชื่อหน่วยงาน" value={workplaceName} onChange={(e) => setworkplaceName(e.target.value)} />
                            </div>
                        </div>
                        <div class="col-md-3">
                            <div class="form-group">
                                <label role="agencyname">หน่วยงานที่สังกัด</label>
                                <input type="text" class="form-control" id="agencyname" placeholder="หน่วยงานที่สังกัด" value={workplacestay} onChange={(e) => setWorkplacestay(e.target.value)} />
                            </div>
                        </div>
                    </div>

                </form>
                <form onSubmit={handleManageWorkplace}>
                    <section class="Frame">
                        <div class="container">
                            <table class="table">
                                <thead>
                                    <tr>
                                        <th>รหัสหน่วยงาน</th>
                                        <th>ชื่อหน่วยงาน</th>
                                        <th>วันที่</th>
                                        <th>กะการทำงาน</th>
                                        <th>เวลาเข้างาน</th>
                                        <th>เวลาออกงาน</th>
                                        <th>ชั่วโมงทำงาน</th>
                                        <th>ชั่วโมง OT</th>
                                        <th>เวลา OT</th>
                                    </tr>
                                </thead>
                                <tbody>


                                    {rowDataList2.map((rowData2, index2) => (
                                        <tr key={index2}>
                                            <td>
                                                <input type="text" className="form-control" name="staffId" value={rowData2.staffId} onChange={(e) => handleFieldChange2(index2, 'staffId', e.target.value)}
                                                />
                                            </td>
                                            <td>
                                                <input type="text" className="form-control" name="staffName" value={rowData2.staffName} onChange={(e) => handleFieldChange2(index2, 'staffName', e.target.value)}
                                                />
                                            </td>
                                            <td>
                                                <div style={{ position: 'relative', zIndex: 9999, marginLeft: '0rem' }}>
                                                    <DatePicker
                                                        id={`datetime${index2}`}
                                                        name={`datetime${index2}`} // 
                                                        className="form-control"
                                                        popperClassName="datepicker-popper"
                                                        selected={rowData2.startjob}
                                                        onChange={date => handleStartDateChange4(index2, date)}
                                                        dateFormat="dd/MM/yyyy"
                                                        popperPlacement="top-start"
                                                        popperModifiers={{
                                                            preventOverflow: {
                                                                enabled: true,
                                                                boundariesElement: 'viewport',
                                                            },
                                                        }}
                                                    />
                                                </div>
                                            </td>
                                            <td>
                                                <select className="form-control" value={rowData2.shift} onChange={(e) => handleFieldChange2(index2, 'shift', e.target.value)} style={{ width: '5.5rem' }} >
                                                    <option value="morning_shift">กะเช้า</option>
                                                    <option value="afternoon_shift">กะบ่าย</option>
                                                    <option value="night_shift">กะดึก</option>
                                                </select></td>
                                            <td><input type="time" class="form-control" name='startTime' value={rowData2.startTime} onChange={(e) => handleFieldChange2(index2, 'startTime', e.target.value)} /></td>
                                            <td><input type="time" class="form-control" name='endTime' value={rowData2.endTime} onChange={(e) => handleFieldChange2(index2, 'endTime', e.target.value)} /></td>
                                            <td><input type="text" class="form-control" name='allTime' value={rowData2.allTime} onChange={(e) => handleFieldChange2(index2, 'allTime', e.target.value)} style={{ width: '4rem' }}/></td>
                                            <td><input type="text" class="form-control" name='otTime' value={rowData2.otTime} onChange={(e) => handleFieldChange2(index2, 'otTime', e.target.value)} style={{ width: '4rem' }}/></td>
                                            <td><input type="time" className="form-control" name="selectotTime" value={rowData2.selectotTime} onChange={(e) => handleFieldChange2(index2, 'selectotTime', e.target.value)} style={{ width: '7rem' }}/> </td>
                                            <td><input type="time" className="form-control" name="selectotTimeOut" value={rowData2.selectotTimeOut} onChange={(e) => handleFieldChange2(index2, 'selectotTimeOut', e.target.value)} style={{ width: '7rem' }}/> </td>

                                            {/* ... other input fields */}
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </section>

                </form>
                <div class="form-group">
                    <button class="btn b_save"><i class="nav-icon fas fa-save"></i> &nbsp; บันทึก</button>
                </div>
            </form>
        );
    }
    return (
        <body class="hold-transition sidebar-mini">
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
                                            <section class="Frame">
                                                <h2 class="title">ค้นหา</h2>
                                                <div class="col-md-12">
                                                    <div class="row">
                                                        <div class="col-md-6">
                                                            <div class="form-group">
                                                                <label role="formsettime">ค้นหาด้วย</label>
                                                                <select id="formsettime" name="formsettime" class="form-control" value={selectedOption} onChange={handleOptionChange}>
                                                                    <option value="workplaceId">รหัสหน่วยงาน</option>
                                                                    <option value="agencytime">ชื่อหน่วยงาน</option>
                                                                    <option value="employeeId">รหัสพนักงาน</option>
                                                                    <option value="persontime">ชื่อพนักงาน</option>
                                                                </select>
                                                            </div>
                                                        </div>
                                                        <div class="col-md-6">
                                                            <div class="form-group">
                                                                <label role="formsettime">ชื่อ</label>
                                                                <input type='text' class="form-control" name='search' />
                                                            </div>
                                                        </div>
                                                    </div>



                                                    <div class="row">
                                                        <div class="col-md-12">
                                                            <div class="form-group">
                                                                <button class="btn b_save"><i class="nav-icon fas fa-search"></i> &nbsp; ค้าหา</button>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div class="d-flex justify-content-center">
                                                        <h2 class="title">ผลลัพธ์</h2>
                                                    </div>
                                                    <div class="d-flex justify-content-center">
                                                        <div class="row">

                                                            <div class="col-md-12">
                                                                <div class="form-group">
                                                                    <ul style={{ listStyle: 'none', marginLeft: "-2rem" }}>
                                                                        <li >
                                                                            ไทยยั่งยืน
                                                                        </li>
                                                                    </ul>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </section>
                                        </div>
                                    </div>
                                    <div class="col-md-12">
                                        <div class="row">
                                            <div class="col-md-4">
                                                <div class="form-group">
                                                    <label role="formsettime">รูปแบบการลงเวลา</label>
                                                    <select id="formsettime" name="formsettime" class="form-control" value={selectedOption} onChange={handleOptionChange}>
                                                        <option value="agencytime">รูปแบบหน่วยงาน</option>
                                                        <option value="persontime">รูปแบบบุคคล</option>
                                                    </select>


                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    {selectedOption && (
                                        <div>
                                            {formToShow}
                                        </div>
                                    )}
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