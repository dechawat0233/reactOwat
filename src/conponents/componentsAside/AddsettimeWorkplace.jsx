import endpoint from '../../config';

import axios from 'axios';
import React, { useEffect, useState } from 'react';

import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

import EmployeesSelected from './EmployeesSelected';

function AddsettimeWorkplace() {

    const [newWorkplace, setNewWorkplace] = useState(true);

    //Workplace data
    const [workplaceId, setWorkplaceId] = useState(''); //รหัสหน่วยงาน
    const [workplaceName, setWorkplaceName] = useState(''); //ชื่อหน่วยงาน
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

    useEffect(() => {
        // Fetch data from the API when the component mounts
        fetch(endpoint + '/employee/list')
            .then(response => response.json())
            .then(data => {
                // Update the state with the fetched data
                setEmployeeList(data);
            })
            .catch(error => {
                console.error('Error fetching data:', error);
            });
    }, []); // The empty array [] ensures that the effect runs only once after the initial render

    /////////////////////////////////////////////
    const [staffId, setStaffId] = useState(''); //รหัสหน่วยงาน
    const [staffName, setStaffName] = useState(''); //รหัสหน่วยงาน
    const [startTime, setStartTime] = useState(''); //รหัสหน่วยงาน
    const [endTime, setEndTime] = useState(''); //รหัสหน่วยงาน
    const [allTime, setAllTime] = useState(''); //รหัสหน่วยงาน
    const [otTime, setOtTime] = useState(''); //รหัสหน่วยงาน
    const [shift1start, setShift1start] = useState('');
    const [shift2start, setShift2start] = useState('');
    const [shift3start, setShift3start] = useState('');
    const [shift4start, setShift4start] = useState('');
    const [shift1end, setShift1end] = useState('');
    const [shift2end, setShift2end] = useState('');
    const [shift3end, setShift3end] = useState('');
    const [shift4end, setShift4end] = useState('');


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


            //Search Employee  by id
            if (fieldName == 'staffId') {

                const employeesearch = employeeList.find(employee => employee.employeeId === value);
                //                 alert(JSON.stringify(employeeList, null, 2));
                // alert( employeeList.length);
                if (employeesearch) {
                    //   setEmployeeName(employee.name);
                    newDataList[index] = {
                        ...newDataList[index],
                        ['staffName']: employeesearch.name + '',
                    };

                } else {
                    //   setEmployeeName('Employee not found');
                    newDataList[index] = {
                        ...newDataList[index],
                        ['staffName']: 'ไม่พบชื่อพนักงาน',
                    };

                }

            }

            if (fieldName == 'shift') {

                if (value == 'morning_shift' && shift1start != null) {
                    newDataList[index] = {
                        ...newDataList[index],
                        ['startTime']: shift1start + '',
                        ['endTime']: shift1end + '',
                        ['selectotTime']: shift1end + '',
                    };
                }

                //check shift is afternoon
                if (value == 'afternoon_shift' && shift2start != null) {
                    newDataList[index] = {
                        ...newDataList[index],
                        ['startTime']: shift2start + '',
                        ['endTime']: shift2end + '',
                        ['selectotTime']: shift2end + '',
                    };
                }

                //Check shift is night
                if (value == 'night_shift' && shift3start != null) {
                    newDataList[index] = {
                        ...newDataList[index],
                        ['startTime']: shift3start + '',
                        ['endTime']: shift3end + '',
                        ['selectotTime']: shift3end + '',
                    };
                }

                if (value == 'specialt_shift' && shift4start != null) {
                    newDataList[index] = {
                        ...newDataList[index],
                        ['startTime']: shift4start + '',
                        ['endTime']: shift4end + '',
                        ['selectotTime']: shift4end + '',
                    };
                }

                //specialt_shift
            }




            // Calculate time difference for allTime
            const startHours = parseFloat(newDataList[index].startTime.split('.')[0]);
            const startMinutes = parseFloat(newDataList[index].startTime.split('.')[1] || 0);
            const endHours = parseFloat(newDataList[index].endTime.split('.')[0]);
            const endMinutes = parseFloat(newDataList[index].endTime.split('.')[1] || 0);



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

            const timeDiffFormatted = `${hours}.${minutes}`;

            // Calculate otTime based on selectotTimeOut and endTime
            const otselectHours = parseFloat(newDataList[index].selectotTime.split('.')[0]);
            const otselectMinutes = parseFloat(newDataList[index].selectotTime.split('.')[1] || 0);
            const otHours = parseFloat(newDataList[index].selectotTimeOut.split('.')[0]);
            const otMinutes = parseFloat(newDataList[index].selectotTimeOut.split('.')[1] || 0);

            let otHoursDiff = otHours - otselectHours;
            let otMinutesDiff = otMinutes - otselectMinutes;

            if (otMinutesDiff < 0) {
                otHoursDiff -= 1;
                otMinutesDiff += 60;
            }

            // Handle cases where otTime is on the next day
            if (otHoursDiff < 0) {
                otHoursDiff += 24;
            }
            const otTimeFormatted1 = `${otHoursDiff}.${otMinutesDiff}`;
            const maxOTHours = parseFloat(newDataList[index].workOfOT);
            const maxOTMinutes = 0; // If maxOTHours is always whole numbers

            const totalOTMinutes = otHoursDiff * 60 + otMinutesDiff;
            if (totalOTMinutes > maxOTHours * 60) {
                otHoursDiff = maxOTHours;
                otMinutesDiff = maxOTMinutes;
            }
            const otTimeFormatted2 = `${otHoursDiff}.${otMinutesDiff}`;


            if (fieldName === 'shift') {
                newDataList[index] = {
                    ...newDataList[index],
                    allTime: timeDiffFormatted,
                    otTime: otTimeFormatted2,
                };
            } else {
                newDataList[index] = {
                    ...newDataList[index],
                    allTime: timeDiffFormatted,
                    otTime: otTimeFormatted1,
                };
            }
            // newDataList[index] = {
            //     ...newDataList[index],
            //     allTime: timeDiffFormatted + '1111',
            //     otTime: otTimeFormatted + '3333',
            // };


            // }

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



    ///////////////////
    function handleClickResult(workplace) {
        setSearchWorkplaceId(workplace.workplaceId);
        setSearchWorkplaceName(workplace.workplaceName);
        //
        setWorkplaceId(workplace.workplaceId);
        setWorkplaceName(workplace.workplaceName);

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
            searchWorkplaceId: searchWorkplaceId,
            searchWorkplaceName: searchWorkplaceName,
        };

        try {
            const response = await axios.post(endpoint + '/workplace/search', data);
            setSearchResult(response.data.workplaces);
            if (response.data.workplaces.length < 1) {
                window.location.reload();
            } else {
                // Calculate the time difference
                const startTime = response.data.workplaces[0].workStart1;
                const endTime = response.data.workplaces[0].workEnd1;
                const selectotTime = response.data.workplaces[0].workEnd1;
                const workOfOT = response.data.workplaces[0].workOfOT;

                //get start time and end time for afternoon and night
                const startTime2 = response.data.workplaces[0].workStart2;
                const endTime2 = response.data.workplaces[0].workEnd2;
                const startTime3 = response.data.workplaces[0].workStart3;
                const endTime3 = response.data.workplaces[0].workEnd3;
                const startTime4 = '';
                const endTime4 = '';

                setShift1start(startTime);
                setShift1end(endTime);
                setShift2start(startTime2);
                setShift2end(endTime2);
                setShift3start(startTime3);
                setShift3end(endTime3);

                setShift4start(startTime4);
                setShift4end(endTime4);

                const [startHours, startMinutes] = startTime.split('.').map(parseFloat);
                const [endHours, endMinutes] = endTime.split('.').map(parseFloat);

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

                const timeDiffFormatted = `${hours}.${minutes}`;

                // Populate all the startTime input fields with the search result value
                const updatedRowDataList = rowDataList.map(rowData => ({
                    ...rowData,
                    startTime: startTime,
                    endTime: endTime,
                    selectotTime: selectotTime,
                    allTime: timeDiffFormatted,
                    workOfOT: workOfOT,
                    startTime2: startTime2,
                    endTime2: endTime2,
                    startTime3: startTime3,
                    endTime3: endTime3,
                }));
                setRowDataList(updatedRowDataList);

                // Set search values
                setWorkplaceId(response.data.workplaces[0].workplaceId);
                setWorkplaceName(response.data.workplaces[0].workplaceName);

                setSearchWorkplaceId(response.data.workplaces[0].workplaceId);
                setSearchWorkplaceName(response.data.workplaces[0].workplaceName);

                // console.log('workOfOT:', response.data.workplaces[0].workOfOT);
                // console.log('workOfOT:', endTime);

            }
        } catch (error) {
            alert('กรุณาตรวจสอบข้อมูลในช่องค้นหา');
            window.location.reload();
        }
    }



    async function handleManageWorkplace(event) {
        event.preventDefault();

        //get data from input in useState to data 
        const data = {
            workplaceId: workplaceId,
            workplaceName: workplaceName,
            workplaceArea: workplaceArea,
            workOfWeek: workOfWeek,
            workStart1: workStart1,
            workEnd1: workEnd1,
            workStart2: workStart2,
            workEnd2: workEnd2,
            workStart3: workStart3,
            workEnd3: workEnd3,
            workOfHour: workOfHour,
            workOfOT: workOfOT,
            workRate: workRate,
            workRateOT: workRateOT,
            workTotalPeople: workTotalPeople,
            holiday: holiday,
            holidayHour: holidayHour,
            salaryadd1: salaryadd1,
            salaryadd2: salaryadd2,
            salaryadd3: salaryadd3,
            salaryadd4: salaryadd4,
            salaryadd5: salaryadd5,
            salaryadd6: salaryadd6,
            personalLeave: personalLeave,
            personalLeaveRate: personalLeaveRate,
            sickLeave: sickLeave,
            sickLeaveRate: sickLeaveRate,
            workRateDayoff: workRateDayoff,
            workRateDayoffRate: workRateDayoffRate,
            workplaceAddress: workplaceAddress,
            daysOff: selectedDates,
            reason: reason,

            employeeIdList: employeeIdList,
            employeeNameList: employeeNameList,
        };


        //check create or update Employee
        if (newWorkplace) {
            // alert('Create Workplace');
            try {
                const response = await axios.post(endpoint + '/workplace/create', data);
                // setEmployeesResult(response.data.employees);
                if (response) {
                    alert("บันทึกสำเร็จ");
                }
            } catch (error) {
                alert('กรุณาตรวจสอบข้อมูลในช่องกรอกข้อมูล');
                // window.location.reload();
            }
        } else {
            //update workplace data

            // Make the API call to update the resource by ID
            try {

                const response = await axios.put(endpoint + '/workplace/update/' + _id, data);
                // setEmployeesResult(response.data.employees);
                if (response) {
                    alert("บันทึกสำเร็จ");
                    window.location.reload();

                }
            } catch (error) {
                alert('กรุณาตรวจสอบข้อมูลในช่องกรอกข้อมูล');
                // window.location.reload();
            }

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
                                                                    รหัส {workplace.workplaceId} หน่วยงาน {workplace.workplaceName}
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
                                        <label role="agencynumber">รหัสหน่วยงาน</label>
                                        <input type="text" class="form-control" id="agencynumber" placeholder="รหัสหน่วยงาน" value={workplaceId} onChange={(e) => setWorkplaceId(e.target.value)} />
                                    </div>
                                </div>
                                <div class="col-md-3">
                                    <div class="form-group">
                                        <label role="agencyname">ชื่อหน่วยงาน</label>
                                        <input type="text" class="form-control" id="agencyname" placeholder="ชื่อหน่วยงาน" value={workplaceName} onChange={(e) => setWorkplaceName(e.target.value)} />
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
                                                <th>เวลาเข้า OT</th>
                                                <th>เวลาออก OT</th>
                                                <th>ชั่วโมง OT</th>
                                                {/* <th>เวลาเข้า OT</th>
                                        <th>เวลาออก OT</th> */}
                                            </tr>
                                        </thead>
                                        <tbody>

                                            {rowDataList.map((rowData, index) => (
                                                <tr key={index}>
                                                    <td><input type="text" className="form-control" name="staffId" value={rowData.staffId} onChange={(e) => handleFieldChange(index, 'staffId', e.target.value)} /></td>
                                                    <td><input type="text" className="form-control" name="staffName" value={rowData.staffName} onChange={(e) => handleFieldChange(index, 'staffName', e.target.value)} /></td>
                                                    <td>
                                                        <select className="form-control" value={rowData.shift} onChange={(e) => handleFieldChange(index, 'shift', e.target.value)} style={{ width: '5.5rem' }} >
                                                            <option value="morning_shift">กะเช้า</option>
                                                            <option value="afternoon_shift">กะบ่าย</option>
                                                            <option value="night_shift">กะดึก</option>
                                                            <option value="specialt_shift">กะพิเศษ</option>
                                                        </select>
                                                    </td>
                                                    <td><input type="text" className="form-control" name="startTime" value={rowData.startTime} onChange={(e) => handleFieldChange(index, 'startTime', e.target.value)} style={{ width: '7rem' }} /></td>
                                                    <td><input type="text" className="form-control" name="endTime" value={rowData.endTime} onChange={(e) => handleFieldChange(index, 'endTime', e.target.value)} style={{ width: '7rem' }} /></td>
                                                    <td><input type="text" className="form-control" name="allTime" value={rowData.allTime} onChange={(e) => handleFieldChange(index, 'allTime', e.target.value)} style={{ width: '4rem' }} /></td>
                                                    <td><input type="text" className="form-control" name="selectotTime" value={rowData.selectotTime} onChange={(e) => handleFieldChange(index, 'selectotTime', e.target.value)} style={{ width: '7rem' }} /> </td>
                                                    <td><input type="text" className="form-control" name="selectotTimeOut" value={rowData.selectotTimeOut} onChange={(e) => handleFieldChange(index, 'selectotTimeOut', e.target.value)} style={{ width: '7rem' }} /> </td>
                                                    <td><input type="text" className="form-control" name="otTime" value={rowData.otTime} onChange={(e) => handleFieldChange(index, 'otTime', e.target.value)} style={{ width: '4rem' }} /></td>
                                                    {/* <td><input type="text" className="form-control" name="selectotTime" value={rowData.selectotTime} onChange={(e) => handleFieldChange(index, 'selectotTime', e.target.value)} style={{ width: '7rem' }} /> </td> */}
                                                    {/* <td><input type="text" className="form-control" name="selectotTimeOut" value={rowData.selectotTimeOut} onChange={(e) => handleFieldChange(index, 'selectotTimeOut', e.target.value)} style={{ width: '7rem' }} /> </td> */}

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
                    </div>
                </div>
            </div>
            {/* <!-- /.container-fluid --> */}
        </section>

    )
}

export default AddsettimeWorkplace