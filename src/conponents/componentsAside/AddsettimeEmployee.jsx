import endpoint from '../../config';

import axios from 'axios';
import React, { useEffect, useState } from 'react';

import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

import EmployeesSelected from './EmployeesSelected';

function AddsettimeEmployee() {

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

    //Workplace data
    const [employeeId, setEmployeeId] = useState(''); //รหัสหน่วยงาน
    const [name, setName] = useState(''); //ชื่อหน่วยงาน
    const [workplacestay, setWorkplacestay] = useState(''); //สังกัด
    const [workplaceArea, setWorkplaceArea] = useState(''); //สถานที่ปฏิบัติงาน
    const [workOfWeek, setWorkOfWeek] = useState(''); //วันทำงานต่อสัปดาห์
    const [workStart1, setWorkStart1] = useState(''); //เวลาเริ่มกะเช้า
    const [workEnd1, setWorkEnd1] = useState(''); //เวลาออกกะเช้า
    const [workStart2, setWorkStart2] = useState(''); //เวลาเข้ากะบ่าย
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

    /////////////////////////////////////////////

    const numberOfRows2 = 30; // Fixed number of rows
    const initialRowData2 = {
        workplaceId: '',
        workplaceName: '',
        date: '', // Use null as initial value for DatePicker
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


            //Search workplace by id
            if (fieldName2 == 'workplaceId') {
                const workplaceIdSearch = workplaceList.find(workplace => workplace.workplaceId === value);
                //                 alert(JSON.stringify(employeeList, null, 2));
                // alert( employeeList.length);
                if (workplaceIdSearch) {
                    //   setEmployeeName(employee.name);
                    newDataList2[index2] = {
                        ...newDataList2[index2],
                        ['workplaceName']: workplaceIdSearch.workplaceName + '',
                        ['shift']: 'morning_shift',
                        ['startTime']: workplaceIdSearch.workStart1 + '',
                        ['endTime']: workplaceIdSearch.workEnd1 + '',
                        ['allTime']: workplaceIdSearch.workOfHour + '',
                        ['otTime']: workplaceIdSearch.workOfOT + '',
                        ['selectotTime']: workplaceIdSearch.workStartOt1 + '',
                        ['selectotTimeOut']: workplaceIdSearch.workEndOt1 + '',
                    };
                } else {
                    //   setEmployeeName('Employee not found');
                    newDataList2[index2] = {
                        ...newDataList2[index2],
                        ['workplaceName']: 'ไม่พบชื่อหน่วยงาน',
                    };
                }
            }

            //Search workplace by name
            if (fieldName2 == 'workplaceName') {
                const workplaceNameSearch = workplaceList.find(workplace => workplace.workplaceName === value);
                //                 alert(JSON.stringify(employeeList, null, 2));
                // alert( employeeList.length);
                if (workplaceNameSearch) {
                    //   setEmployeeName(employee.name);
                    newDataList2[index2] = {
                        ...newDataList2[index2],
                        ['workplaceId']: workplaceNameSearch.workplaceId + '',
                    };
                } else {
                    //   setEmployeeName('Employee not found');
                    newDataList2[index2] = {
                        ...newDataList2[index2],
                        ['workplaceId']: 'ไม่พบรหัสหน่วยงาน',
                    };
                }
            }


            //Select shift then set time of work 
            if (fieldName2 == 'shift') {
                // alert(value);
                //Check Selected workplace by workplaceId is notnull
                if (newDataList2[index2].workplaceId !== '') {
                    // alert(newDataList2[index2].workplaceId );
                    //get workplace data by  workplaceId from select workplace and search workplace then set worktime to row of table
                    const workplaceIdSearch = workplaceList.find(workplace => workplace.workplaceId === newDataList2[index2].workplaceId);
                    if (workplaceIdSearch) {
                        //check shift by switch case
                        switch (value) {
                            case 'morning_shift':
                                newDataList2[index2] = {
                                    ...newDataList2[index2],
                                    ['startTime']: workplaceIdSearch.workStart1 || '' + '',
                                    ['endTime']: workplaceIdSearch.workEnd1 || ''+ '',
                                    ['allTime']: calTime(workplaceIdSearch.workStart1 || '', workplaceIdSearch.workEnd1|| '', workplaceIdSearch.workOfHour || '') || '' + '',
                                    ['otTime']: calTime(workplaceIdSearch.workStartOt1 || '', workplaceIdSearch.workEndOt1 || '', workplaceIdSearch.workOfOT || '') || '' + '',
                                    ['selectotTime']: workplaceIdSearch.workStartOt1 || ''+ '',
                                    ['selectotTimeOut']: workplaceIdSearch.workEndOt1 || '' + '',
                                };
                                break;
                            case 'afternoon_shift':
                                newDataList2[index2] = {
                                    ...newDataList2[index2],
                                    ['startTime']: workplaceIdSearch.workStart2 || '' + '',
                                    ['endTime']: workplaceIdSearch.workEnd2 || '' + '',
                                    ['allTime']: calTime(workplaceIdSearch.workStart2 || '', workplaceIdSearch.workEnd2 || '', workplaceIdSearch.workOfHour || '') || '' + '',
                                    ['otTime']: calTime(workplaceIdSearch.workStartOt2 || '', workplaceIdSearch.workEndOt2 || '', workplaceIdSearch.workOfOT || '') || '' + '',
                                    ['selectotTime']: workplaceIdSearch.workStartOt2 || '' + '',
                                    ['selectotTimeOut']: workplaceIdSearch.workEndOt2 || '' + '',
                                };
                                break;
                            case 'night_shift':
                                newDataList2[index2] = {
                                    ...newDataList2[index2],
                                    ['startTime']: workplaceIdSearch.workStart3 || '' + '',
                                    ['endTime']: workplaceIdSearch.workEnd3 || '' + '',
                                    ['allTime']: calTime(workplaceIdSearch.workStart3 || '', workplaceIdSearch.workEnd3 || '', workplaceIdSearch.workOfHour || '') || '' + '',
                                    ['otTime']: calTime(workplaceIdSearch.workStartOt3 || '', workplaceIdSearch.workEndOt3 || '', workplaceIdSearch.workOfOT || '') || ''+ '',
                                    ['selectotTime']: workplaceIdSearch.workStartOt3 || '' + '',
                                    ['selectotTimeOut']: workplaceIdSearch.workEndOt3 || '' + '',
                                };
                                break;
                            default:
                                newDataList2[index2] = {
                                    ...newDataList2[index2],
                                    ['startTime']: '',
                                    ['endTime']: '',
                                    ['allTime']: '',
                                    ['otTime']: '',
                                    ['selectotTime']: '',
                                    ['selectotTimeOut']: '',
                                };
                        } //end switch
                    }


                } else {
                    //emty workplaceId 
                    newDataList2[index2] = {
                        ...newDataList2[index2],
                        ['workplaceId']: 'กรุณาระบุหน่วยงาน',
                        ['workplaceName']: 'กรุณาระบุหน่วยงาน',
                    };
                }
            }

            //update time of work 
            if ((fieldName2 == 'startTime') ||
                (fieldName2 == 'endTime') ||
                (fieldName2 == 'selectotTime') ||
                (fieldName2 == 'selectotTimeOut')
            ) {
                //Check Selected workplace by workplaceId is notnull
                if (newDataList2[index2].workplaceId !== '') {
                    // alert(newDataList2[index2].workplaceId );
                    //get workplace data by  workplaceId from select workplace and search workplace then set worktime to row of table
                    const workplaceIdSearch = workplaceList.find(workplace => workplace.workplaceId === newDataList2[index2].workplaceId);
                    if (workplaceIdSearch) {
                        //check specialt_shift 
                        if (newDataList2[index2].shift !== 'specialt_shift') {
                            newDataList2[index2] = {
                                ...newDataList2[index2],
                                ['startTime']: newDataList2[index2].startTime + '',
                                ['endTime']: newDataList2[index2].endTime + '',
                                ['allTime']: calTime(newDataList2[index2].startTime, newDataList2[index2].endTime, workplaceIdSearch.workOfHour) + '',
                                ['otTime']: calTime(newDataList2[index2].selectotTime, newDataList2[index2].selectotTimeOut, workplaceIdSearch.workOfOT) + '',
                                ['selectotTime']: newDataList2[index2].selectotTime + '',
                                ['selectotTimeOut']: newDataList2[index2].selectotTimeOut + '',
                            };
                        } else {
                            newDataList2[index2] = {
                                ...newDataList2[index2],
                                ['startTime']: newDataList2[index2].startTime + '',
                                ['endTime']: newDataList2[index2].endTime + '',
                                ['allTime']: calTime(newDataList2[index2].startTime, newDataList2[index2].endTime, 24) + '',
                                ['otTime']: calTime(newDataList2[index2].selectotTime, newDataList2[index2].selectotTimeOut, 24) + '',
                                ['selectotTime']: newDataList2[index2].selectotTime + '',
                                ['selectotTimeOut']: newDataList2[index2].selectotTimeOut + '',
                            };
                        }

                    } else {
                        //emty workplaceId 
                        newDataList2[index2] = {
                            ...newDataList2[index2],
                            ['workplaceId']: 'กรุณาระบุหน่วยงาน',
                            ['workplaceName']: 'กรุณาระบุหน่วยงาน',
                        };
                    }

                }

            }

            return newDataList2;
        });
    };


    function calTime(start, end, limit) {

        const startHours = parseFloat(start.split('.')[0]);
        const startMinutes = parseFloat(start.split('.')[1] || 0);
        const endHours = parseFloat(end.split('.')[0]);
        const endMinutes = parseFloat(end.split('.')[1] || 0);
        let hours = endHours - startHours;
        let minutes = endMinutes - startMinutes;
        if (minutes < 0) {
            hours -= 1;
            minutes += 60;
        }
        // Handle cases where endTime is on the next day
        if (hours < 0) {
            hours += 24;
        }
        //check employee working >= 5 hours 
        if (hours >= 5) {
            hours -= 1;
        }

        // Calculate the total time difference in minutes
        const totalMinutes = hours * 60 + minutes;
        // check employee working > 5 hours
        // Cap the time difference at the maximum work hours
        const cappedTotalMinutes = Math.min(totalMinutes, limit * 60);
        // Convert the capped time difference back to hours and minutes
        const cappedHours = Math.floor(cappedTotalMinutes / 60);
        const cappedMinutes = cappedTotalMinutes % 60;
        const timeDiffFormatted = `${cappedHours}.${cappedMinutes}`;
        if (isNaN(timeDiffFormatted)) {
            return '0';
        }

        return timeDiffFormatted;
    }



    const handleStartDateChange4 = (index2, date) => {
        alert(index2);
        handleFieldChange2(index2, 'date', date);
    };



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



    async function handleManageWorkplace(event) {
        event.preventDefault();

        //get data from input in useState to data 
    }



    async function handleCreateWorkplaceTimerecord(event) {
        event.preventDefault();
        // alert('test');

        //get data from input in useState to data 
        const data = {
            employeeId: employeeId,
            employeeName: name,
            month: month,
            employee_workplaceRecord: rowDataList2
        };


        try {
            const response = await axios.post(endpoint + '/timerecord/createemp', data);
            // setEmployeesResult(response.data.employees);
            if (response) {
                alert("บันทึกสำเร็จ");
            }
        } catch (error) {
            alert('กรุณาตรวจสอบข้อมูลในช่องกรอกข้อมูล');
            // window.location.reload();
        }

    }


    /////////////////
    const [selectedOption, setSelectedOption] = useState('agencytime');

    const handleOptionChange = (event) => {
        setSelectedOption(event.target.value);
    };

    const handleSubmitForm1 = (event) => {
        event.preventDefault();
        // Handle submission for Form 1
    };

    return (
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
                        <form onSubmit={handleManageWorkplace}>
                            <div class="row">
                                <div class="col-md-3">
                                    <div class="form-group">
                                        <label role="agencynumber">รหัสพนักงาน</label>
                                        <input type="text" class="form-control" id="agencynumber" placeholder="รหัสพนักงาน" value={employeeId} onChange={(e) => setEmployeeId(e.target.value)} />
                                    </div>
                                </div>
                                <div class="col-md-3">
                                    <div class="form-group">
                                        <label role="agencyname">ชื่อพนักงาน</label>
                                        <input type="text" class="form-control" id="agencyname" placeholder="ชื่อพนักงาน" value={name} onChange={(e) => setname(e.target.value)} />
                                    </div>
                                </div>

                                <div class="col-md-2">
                                    <div class="form-group">
                                        <label role="agencyname">เดือน</label>
                                        <select className="form-control" value={month} onChange={(e) => setMonth(e.target.value)} >
                                            <option value="01">มกราคม</option>
                                            <option value="02">กุมภาพันธ์</option>
                                            <option value="03">มีนาคม</option>
                                            <option value="04">เมษายน</option>
                                            <option value="05">พฤษภาคม</option>
                                            <option value="06">มิถุนายน</option>
                                            <option value="07">กรกฎาคม</option>
                                            <option value="08">สิงหาคม</option>
                                            <option value="09">กันยายน</option>
                                            <option value="10">ตุลาคม</option>
                                            <option value="11">พฤศจิกายน</option>
                                            <option value="12">ธันวาคม</option>
                                        </select>
                                    </div>
                                </div>
                                {/* <div class="col-md-2">
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

                                </div> */}
                                <div class="col-md-3">
                                    <label role="button"></label>
                                    <div class="d-flex align-items-end">
                                        <button class="btn b_save"><i class="nav-icon fas fa-search"></i> &nbsp; ตรวจสอบ</button>
                                    </div>
                                </div>
                            </div>
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
                                                <th>เวลาเข้า OT</th>
                                                <th>เวลาออก OT</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {rowDataList2.map((rowData2, index2) => (
                                                <tr key={index2}>
                                                    <td>
                                                        <input type="text" className="form-control" name="workplaceId" value={rowData2.workplaceId} onChange={(e) => handleFieldChange2(index2, 'workplaceId', e.target.value)}
                                                        />
                                                    </td>
                                                    <td>
                                                        <input type="text" className="form-control" name="workplaceName" value={rowData2.workplaceName} onChange={(e) => handleFieldChange2(index2, 'workplaceName', e.target.value)}
                                                        />
                                                    </td>
                                                    <td>
                                                        {/* <div style={{ position: 'relative', zIndex: 9999, marginLeft: '0rem' }}>
                                                            <DatePicker
                                                                id={`datetime${index2}`}
                                                                name={`datetime${index2}`} // 
                                                                className="form-control"
                                                                popperClassName="datepicker-popper"
                                                                selected={rowData2.date}
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
                                                        </div> */}
                                                        <select className="form-control" value={rowData2.date} onChange={(e) => handleFieldChange2(index2, 'date', e.target.value)} style={{ width: '5.5rem' }} >
                                                            <option value="">เลือกวัน</option>
                                                            {options}
                                                        </select>
                                                    </td>
                                                    <td>
                                                        <select className="form-control" value={rowData2.shift} onChange={(e) => handleFieldChange2(index2, 'shift', e.target.value)} style={{ width: '5.5rem' }} >
                                                            <option value="morning_shift">กะเช้า</option>
                                                            <option value="afternoon_shift">กะบ่าย</option>
                                                            <option value="night_shift">กะดึก</option>
                                                            <option value="specialt_shift">กะพิเศษ</option>
                                                        </select>
                                                    </td>
                                                    <td><input type="text" class="form-control" name='startTime' value={rowData2.startTime} onChange={(e) => handleFieldChange2(index2, 'startTime', e.target.value)} /></td>
                                                    <td><input type="text" class="form-control" name='endTime' value={rowData2.endTime} onChange={(e) => handleFieldChange2(index2, 'endTime', e.target.value)} /></td>
                                                    <td><input type="text" class="form-control" name='allTime' value={rowData2.allTime} onChange={(e) => handleFieldChange2(index2, 'allTime', e.target.value)} style={{ width: '4rem' }} /></td>
                                                    <td><input type="text" class="form-control" name='otTime' value={rowData2.otTime} onChange={(e) => handleFieldChange2(index2, 'otTime', e.target.value)} style={{ width: '4rem' }} /></td>
                                                    <td><input type="text" className="form-control" name="selectotTime" value={rowData2.selectotTime} onChange={(e) => handleFieldChange2(index2, 'selectotTime', e.target.value)} style={{ width: '7rem' }} /> </td>
                                                    <td><input type="text" className="form-control" name="selectotTimeOut" value={rowData2.selectotTimeOut} onChange={(e) => handleFieldChange2(index2, 'selectotTimeOut', e.target.value)} style={{ width: '7rem' }} /> </td>

                                                    {/* ... other input fields */}
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            </section>
                            <div class="form-group">
                                <button class="btn b_save" onClick={handleCreateWorkplaceTimerecord}><i class="nav-icon fas fa-save"></i> &nbsp; บันทึก</button>
                            </div>
                        </form>

                    </div>
                </div>
            </div>
            {/* <!-- /.container-fluid --> */}
        </section>

    )
}

export default AddsettimeEmployee