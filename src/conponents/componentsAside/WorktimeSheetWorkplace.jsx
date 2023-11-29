import endpoint from '../../config';
// import React, { useRef } from 'react';

import axios from 'axios';
import React, { useEffect, useState, useRef } from 'react';
import '../editwindowcss.css';
// import TestPDF from './TestPDF';
import { jsPDF } from 'jspdf';
import 'jspdf-autotable';
import html2pdf from 'html2pdf.js';
import { useTable } from 'react-table';


function WorktimeSheetWorkplace() {
    const vertical1 = {
        borderCollapse: "collapse",
        width: "100%",
    };

    const verticalText = {
        writingMode: "vertical-rl",
        textAlign: "center", // Adjust as needed
        whiteSpace: "nowrap", // Prevent text wrapping
    };
    const verticalTextHeader = {
        writingMode: "vertical-rl",
        textAlign: "center",
        whiteSpace: "nowrap",
        transform: "rotate(180deg)", // Rotate the text 180 degrees
    };


    useEffect(() => {
        document.title = 'ใบลงเวลาการปฏิบัติงาน';
        // You can also return a cleanup function if needed
        // return () => { /* cleanup code */ };
    }, []);

    const styles = {
        th: {
            minWidth: "4rem"
        }
    };
    const [dataset, setDataset] = useState([]);

    const [workplaceList, setWorkplaceList] = useState([]);
    const [result_data, setResult_data] = useState([]);


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

    console.log(workplaceList);

    const [employeelist, setEmployeelist] = useState([]);
    const [employee, setEmployee] = useState([]);
    const [listDayOff, setListDayOff] = useState([]);
    const [y, setY] = useState('');
    const [m, setM] = useState('');
    const [m1, setM1] = useState('');


    useEffect(() => {
        // Fetch data from the API when the component mounts
        fetch(endpoint + '/employee/list')
            .then(response => response.json())
            .then(data => {
                // Update the state with the fetched data
                setEmployeelist(data);
                // alert(data[0].workplaceName);
            })
            .catch(error => {
                console.error('Error fetching data:', error);
            });
    }, []); // The empty array [] ensures that the effect runs only once after the initial render

    console.log('employeelist', employeelist);

    //data for show in table
    const [listTableDayoff, setListTableDayoff] = useState([]);
    //data for check list dayoff
    const [data_listDayoff, setData_listDayoff] = useState([]);

    // useEffect(() => {
    //     setListDayOff({});
    //     const emp_workplace = employeelist.find(item => item.employeeId === result_data[0].employeeId);
    //     console.log('emp_workplace', emp_workplace);

    //     if (emp_workplace) {
    //         const wid = emp_workplace.workplace;
    //         const empWorkplace = workplaceList.find(item => item.workplaceId === wid);
    //         // alert(JSON.stringify(empWorkplace ,null,2));
    //         console.log('empWorkplace', empWorkplace);
    //         console.log('wid', wid);

    //         const df = [];
    //         if (empWorkplace.workday7 !== "true") {
    //             df.push('1');
    //         }
    //         if (empWorkplace.workday6 !== "true") {
    //             df.push('7');
    //         }
    //         if (empWorkplace.workday5 !== "true") {
    //             df.push('6');
    //         }
    //         if (empWorkplace.workday4 !== "true") {
    //             df.push('5');
    //         }
    //         if (empWorkplace.workday3 !== "true") {
    //             df.push('4');
    //         }
    //         if (empWorkplace.workday2 !== "true") {
    //             df.push('3');
    //         }
    //         if (empWorkplace.workday1 !== "true") {
    //             df.push('2');
    //         }

    //         setListDayOff(df);

    //         //get totalday of month
    //         let m = parseInt(result_data[0].month, 10); // Convert month to integer and subtract 1
    //         // alert(result_data[0].month );
    //         let totalDay = new Date(result_data[0].timerecordId, m, 0).getDate()
    //         // alert(JSON.stringify(result_data , null,2));
    //         // alert(totalDay );
    //         let dateString = result_data[0].timerecordId + '/' + m + '/21';
    //         let dateObj = new Date(dateString);
    //         // alert(dateObj);
    //         let numstartDay = getDateDayOfWeek(dateObj);
    //         numstartDay = parseInt(numstartDay, 10);
    //         console.log('numstartDay', numstartDay);
    //         let dayoffTable = [];
    //         let dayoffCheck = [];
    //         // alert(numstartDay );

    //         for (let i = 21; i <= totalDay; i++) {
    //             if (numstartDay > 7) {
    //                 numstartDay = 1;
    //             }

    //             if (df.includes(numstartDay.toString())) {
    //                 // alert(i);
    //                 dayoffTable.push({ [i]: "หยุด" });
    //                 dayoffCheck.push(i);

    //             } else {
    //                 dayoffTable.push({ [i]: " " });
    //             }

    //             //next day
    //             numstartDay = numstartDay + 1;
    //         } //end for

    //         //any month < 31 day , add to 31 day for show in table
    //         if (totalDay < 31) {
    //             for (let j = totalDay + 1; j <= 31; j++) {
    //                 dayoffTable.push({ [j]: " " });
    //             }
    //         }
    //         // alert(dayoffTable.length);
    //         //next month 1 - 20 
    //         // m = m +1;
    //         m = parseInt(result_data[0].month, 10); // Convert month to integer and subtract 1

    //         // alert(m);
    //         let s = result_data[0].timerecordId + '/' + (m + 1) + '/1';
    //         let sObj = new Date(s);
    //         // alert(sObj);
    //         let numstartDay1 = getDateDayOfWeek(sObj);
    //         numstartDay1 = parseInt(numstartDay1, 10);
    //         // alert('x' + numstartDay1 );
    //         for (let l = 1; l <= 20; l++) {
    //             if (numstartDay1 > 7) {
    //                 numstartDay1 = 1;
    //             }
    //             // alert("วันที่ " + l + "ตัวเลข" + numstartDay1  );  
    //             if (df.includes(numstartDay1.toString())) {
    //                 // alert(i);
    //                 dayoffTable.push({ [l]: "หยุด" });
    //                 // alert(l + "หยุด")
    //                 dayoffCheck.push(l);
    //                 //next day
    //                 numstartDay1 = numstartDay1 + 1;

    //             } else {
    //                 dayoffTable.push({ [l]: " " });
    //                 //next day
    //                 numstartDay1 = numstartDay1 + 1;

    //             }

    //         } //end for
    //         // alert(dayoffTable.length);


    //         setData_listDayoff(dayoffCheck);
    //         setListTableDayoff(dayoffTable);

    //         // alert(df);
    //         // alert(dayoffCheck);
    //         //xx

    //     }

    // }, [result_data]);

    console.log('data_listDayoff', data_listDayoff);
    console.log('listTableDayoff', listTableDayoff);
    console.log('df', listDayOff);


    // Generate an array containing numbers from 21 to 31
    const range1 = Array.from({ length: 11 }, (_, i) => i + 21);

    // Generate an array containing numbers from 1 to 20
    const range2 = Array.from({ length: 20 }, (_, i) => i + 1);

    // Combine the two ranges into a single array
    const combinedRange = [...range1, ...range2];


    const [countWork, setCountWork] = useState(0);
    const [countWorkSTime, setCountWorkSTime] = useState(0);


    const [employeeId, setEmployeeId] = useState('');
    const [name, setName] = useState('');
    const [workplaceIdList, setWorkplaceIdList] = useState([]);

    const [month, setMonth] = useState('');

    useEffect(() => {
        setMonth("01");
    }, []);

    const [searchWorkplaceId, setSearchWorkplaceId] = useState(''); //รหัสหน่วยงาน
    const [searchWorkplaceName, setSearchWorkplaceName] = useState(''); //ชื่อหน่วยงาน
    const [searchEmployeeId, setSearchEmployeeId] = useState('');
    const [searchEmployeeName, setSearchEmployeeName] = useState('');
    const [searchResult, setSearchResult] = useState([]);
    const [empId, setEmpId] = useState([]);

    const [searchResult1, setSearchResult1] = useState([]);

    const [woekplace, setWoekplace] = useState([]);

    const [calendarData1, setCalendarData1] = useState([]);
    const [calendarData2, setCalendarData2] = useState([]);
    const yeartest = 2023;
    const monthtest = 3; // 3 represents March using 1-based indexing
    async function handleSearch(event) {
        event.preventDefault();
        // get value from form search
        if (searchWorkplaceId === '' && searchWorkplaceName === '') {
            // Both employeeId and employeeName are null
            alert("กรุณากรอกรหัสหรือชื่อพนักงาน");
            // You can use window.location.reload() to reload the web page
            // window.location.reload();
        } else {
            // At least one of them is not null
            console.log('searchWorkplaceId', searchWorkplaceId);
        }
        const data = await {
            // workplaceId: searchWorkplaceId,
            // workplaceName: searchWorkplaceName,
            month: month,
            'employee_workplaceRecord.workplaceId': searchWorkplaceId,
            // 'employee_workplaceRecord.workplaceName': searchWorkplaceName,

        }; console.log(searchWorkplaceId);

        const parsedNumber = await parseInt(month, 10) - 1;
        const formattedResult = await String(parsedNumber).padStart(2, '0');
        // await alert(formattedResult );

        const data1 = await {
            workplaceId: searchWorkplaceId,
            workplaceName: searchWorkplaceName,
            month: formattedResult
        };

        console.log('datadata', data);


        // date day

        // Calculate the formatted month based on data1.month
        const parsedNumber1 = parseInt(data1.month, 10) - 1;
        const formattedResult1 = String(parsedNumber1).padStart(2, '0');

        // Calculate the formatted month based on data.month
        const parsedNumber2 = parseInt(data.month, 10) - 1;
        const formattedResult2 = String(parsedNumber2).padStart(2, '0');


        // Create a Date object for the first day of data1.month
        const firstDayOfMonth1 = new Date(yeartest, parsedNumber1, 1);

        // Create a Date object for the first day of data.month
        const firstDayOfMonth2 = new Date(yeartest, parsedNumber2, 1);

        console.log('formattedResult1', firstDayOfMonth1);
        console.log('formattedResult2', firstDayOfMonth2);
        const daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
        const dates1 = [];
        const dates2 = [];

        // Loop through the days of the week
        for (let i = 0; i < 7; i++) {
            const day = daysOfWeek[i];
            const dayDates1 = [];
            const dayDates2 = [];

            // Start from the first day of data1.month
            let currentDate1 = new Date(firstDayOfMonth1);
            let currentDate2 = new Date(firstDayOfMonth2);

            // Find the first day of the week
            while (currentDate1.getDay() !== i) {
                currentDate1.setDate(currentDate1.getDate() + 1);
            }
            while (currentDate2.getDay() !== i) {
                currentDate2.setDate(currentDate2.getDate() + 1);
            }

            // Continue adding dates while still in the same month for data1.month
            while (currentDate1.getMonth() === parsedNumber1) {
                dayDates1.push(currentDate1.getDate());
                currentDate1.setDate(currentDate1.getDate() + 7); // Move to the next occurrence of the day
            }

            // Continue adding dates while still in the same month for data.month
            while (currentDate2.getMonth() === parsedNumber2) {
                dayDates2.push(currentDate2.getDate());
                currentDate2.setDate(currentDate2.getDate() + 7); // Move to the next occurrence of the day
            }

            dates1.push({ day, dates: dayDates1 });
            dates2.push({ day, dates: dayDates2 });
            console.log('dates1', dates1);
            console.log('dates2', dates2);

        }

        const filteredDates1 = dates1.map((dayData) => ({
            ...dayData,
            dates: dayData.dates.filter((date) => date >= 21 && date <= 31), // Adjusted filtering condition
        })).filter((dayData) => dayData.dates.length > 0);


        const filteredDates2 = dates2.map((dayData) => ({
            ...dayData,
            dates: dayData.dates.filter((date) => date < 20), // Adjusted filtering condition
        })).filter((dayData) => dayData.dates.length > 0);

        //dddd
        console.log('calendarData1 filteredDates1:', filteredDates1);
        console.log('calendarData2 filteredDates2:', filteredDates2);
        setCalendarData1(filteredDates1); // Assuming you have a separate state for data1.month
        setCalendarData2(filteredDates2);

        //check reload pag

        console.log(searchWorkplaceId);
        let check = 0;
        try {

            const response = await axios.post(endpoint + '/timerecord/searchemp', data);
            console.log('response123', response.data.recordworkplace);

            if (response.data.recordworkplace.length >= 1) {
                await setSearchResult(response.data.recordworkplace);
                await setResult_data(response.data.recordworkplace);
            } else {
                alert("ไม่พบข้อมูล 1 ถึง 20 " + getMonthName(data.month));
                check = check + 1;
                // window.location.reload();
            }

            const employeeWorkplaceRecords = await response.data.recordworkplace[0].employee_workplaceRecord || '';

            if (employeeWorkplaceRecords.length > 0) {
                const dates = employeeWorkplaceRecords.map(record => record.date);
                // const otTime = employeeWorkplaceRecords.map(record => record.otTime);

                const allTimeA = employeeWorkplaceRecords.map((record) => record.allTime);

                const workplaceId = employeeWorkplaceRecords.map(record => record.workplaceId);

                const otTime = employeeWorkplaceRecords.map((record) => record.otTime);

                setTableData((prevState) => {
                    const updatedData = [...prevState];
                    dates.forEach((date, index) => {
                        const dataIndex = parseInt(date, 10) - 1; // Subtract 1 because indices are zero-based
                        // alert(index);
                        if (dataIndex >= 0 && dataIndex < updatedData.length) {
                            if (dataIndex <= 20) {
                                // setCountWork((countWork + 1));
                                // alert((dataIndex + 11));

                                updatedData[(dataIndex + 11)].isChecked = true;
                                updatedData[(dataIndex + 11)].otTime = otTime[index];
                                updatedData[(dataIndex + 11)].allTime = allTimeA[index];
                                updatedData[(dataIndex + 11)].workplaceId = workplaceId[index]; // Set otTime at the same index as dates
                                updatedData[(dataIndex + 11)].date = dates[index]; // Set otTime at the same index as dates


                                // Set otTime at the same index as dates
                            }

                        }
                    });
                    const filteredData = updatedData.filter((record) => record.isChecked == true);

                    const workplaceIds = [...new Set(filteredData.map((record) => record.workplaceId))];


                    setDataset(filteredData);
                    return updatedData;
                });


                console.log('tableData', tableData);
                console.log('updatedData', dataset);

            }
            if (response.data.recordworkplace.length < 1) {
                // window.location.reload();
                alert('ไม่พบข้อมูล');
                // window.location.reload();
            } else {

                // Set search values
                await setEmployeeId(response.data.recordworkplace[0].employeeId);
                await setName(response.data.recordworkplace[0].employeeName);

                setSearchWorkplaceId('');
                setSearchWorkplaceName('');

            }
        } catch (error) {
            alert('กรุณาตรวจสอบข้อมูลในช่องค้นหา');
            // window.location.reload();
        }

        try {

            if (data1.month == '00') {
                data1.month = '12';
            }
            const response1 = await axios.post(endpoint + '/timerecord/searchemp', data1);
            if (response1.data.recordworkplace.length >= 1) {
                await setSearchResult1(response1.data.recordworkplace);
                // if (!result_data) {
                await setResult_data(response1.data.recordworkplace);
                // }

            } else {
                alert("ไม่พบข้อมูล 21 ถึง สิ้นเดือน " + getMonthName(data1.month));
                check = check + 1;
                if (check > 1) {
                    // alert('reload');
                    // window.location.reload();
                }

            }

            const employeeWorkplaceRecords1 = await response1.data.recordworkplace[0].employee_workplaceRecord || '';

            if (employeeWorkplaceRecords1.length > 0) {

                const dates1 = await employeeWorkplaceRecords1.map(record => record.date);
                // const otTime = employeeWorkplaceRecords.map(record => record.otTime);

                const allTimeA1 = await employeeWorkplaceRecords1.map((record) => record.allTime);

                const workplaceId1 = await employeeWorkplaceRecords1.map(record => record.workplaceId);

                const otTime1 = await employeeWorkplaceRecords1.map((record) => record.otTime);

                await setTableData((prevState) => {
                    const updatedData = [...prevState];
                    dates1.forEach((date1, index) => {
                        const dataIndex1 = parseInt(date1, 10) - 1; // Subtract 1 because indices are zero-based
                        // if (dataIndex1 >= 0 && dataIndex1 < updatedData.length) {
                        // alert(index);
                        if (dataIndex1 >= 20 && dataIndex1 <= 31) {
                            // alert(dataIndex1 +' .');
                            // setCountWork((countWork + 1));
                            // alert((dataIndex1 - 20));

                            updatedData[(dataIndex1 - 20)].isChecked = true;
                            updatedData[(dataIndex1 - 20)].otTime = otTime1[index];
                            updatedData[(dataIndex1 - 20)].allTime = allTimeA1[index];
                            updatedData[(dataIndex1 - 20)].workplaceId = workplaceId1[index]; // Set otTime at the same index as dates
                            updatedData[(dataIndex1 - 20)].date = dates1[index]; // Set otTime at the same index as dates
                            // updatedData[(dataIndex1 - 20)].month = month[index]; // Set otTime at the same index as dates


                            // Set otTime at the same index as dates
                        }

                        // }

                    });
                    console.log('updatedData', updatedData);

                    const filteredData = updatedData.filter((record) => record.isChecked == true);
                    const workplaceIds = [...new Set(filteredData.map((record) => record.workplaceId))];
                    setDataset(filteredData);
                    return updatedData;

                });
                // setWoekplace(dates);
            }
        }

        catch (error) {
            alert('กรุณาตรวจสอบข้อมูลในช่องค้นหา', error);
            // window.location.reload();
        }
        //xx
        // alert(result_data[0].employeeId);
    }

    console.log('workplaceIdList', workplaceIdList);
    console.log('calendarData1 updated:', calendarData1);
    console.log('calendarData2 updated:', calendarData2);

    const [Datasetsec, setDatasetsec] = useState([]);

    useEffect(() => {
        // Create a mapping of date to dayoff from listTableDayoff
        const dayoffMap = listTableDayoff.reduce((acc, day) => {
            const date = Object.keys(day)[0];
            const dayoff = day[date].trim(); // Remove extra spaces
            if (dayoff !== '') {
                acc[date] = dayoff;
            }
            return acc;
        }, {});

        // Update the Dataset with the dayoff property for matching dates
        const updatedDataset = dataset.map(item => ({
            ...item,
            dayoff: dayoffMap[item.date] || '' // Add 'dayoff' property if the date exists in the map

            // test set time ot 

        }));
        const workplaceIdCounts = {};
        const workplaceIdAllTimes = {};
        const workplaceIdOtTimes = {};

        const workplaceIdDayoffAllTimes = {};
        const workplaceIdDayoffOtTimes = {};


        updatedDataset.forEach((record) => {
            if (record.isChecked) {
                const { workplaceId, otTime, allTime, dayoff } = record;
                const allTimeAsNumber = parseFloat(allTime); // Parse allTime to a number
                const otTimeAsNumber = parseFloat(otTime); // Parse otTime to a number

                if (!workplaceIdCounts[workplaceId]) {
                    workplaceIdCounts[workplaceId] = 0;
                    workplaceIdAllTimes[workplaceId] = 0;
                    workplaceIdOtTimes[workplaceId] = 0;
                    workplaceIdDayoffAllTimes[workplaceId] = 0;
                    workplaceIdDayoffOtTimes[workplaceId] = 0;
                }

                workplaceIdCounts[workplaceId]++;

                if (dayoff === 'หยุด' && !isNaN(allTimeAsNumber)) {
                    workplaceIdDayoffAllTimes[workplaceId] += allTimeAsNumber;
                    workplaceIdDayoffOtTimes[workplaceId] += otTimeAsNumber;
                } else {
                    if (!isNaN(allTimeAsNumber)) {
                        if (allTimeAsNumber > 5.0) {
                            workplaceIdAllTimes[workplaceId] += 1;
                        } else {
                            workplaceIdAllTimes[workplaceId] += 0.5;
                        }
                    }
                    if (!isNaN(otTimeAsNumber)) {
                        workplaceIdOtTimes[workplaceId] += otTimeAsNumber;
                    }
                }
            }
        });
        const result = Object.entries(workplaceIdCounts).map(([workplaceId, count]) => ({
            workplaceId,
            count,
            allTime: workplaceIdAllTimes[workplaceId].toFixed(1),
            otTime: workplaceIdOtTimes[workplaceId].toFixed(2), // Format otTime to 2 decimal places
            dayoffAllTime: workplaceIdDayoffAllTimes[workplaceId].toFixed(2), // Format otTime to 2 decimal places
            dayoffOtTime: workplaceIdDayoffOtTimes[workplaceId].toFixed(2), // Format otTime to 2 decimal places
        }));

        // Calculate the total allTime
        const totalAllTime = Object.values(workplaceIdAllTimes).reduce((sum, allTime) => sum + allTime, 0).toFixed(1);

        console.log('listTableDayofflistTableDayoff:', listTableDayoff);

        console.log('Result:', result);
        console.log('Total AllTime:', totalAllTime);
        console.log('datasetdataset', dataset);

        const count = dataset.length;

        // Create a mapping of date to dayoff from listTableDayoff

        setCountWork((count));
        setCountWorkSTime(totalAllTime);
        setWorkplaceIdList(result);

        setDatasetsec(updatedDataset);
    }, [dataset, listTableDayoff]);

    console.log('datasetTest', Datasetsec);


    //set salaty calculate
    const [workRate, setWorkRate] = useState(''); //ค่าจ้างต่อวัน
    const [workRateOT, setWorkRateOT] = useState(''); //ค่าจ้าง OT ต่อชั่วโมง
    const [holiday, setHoliday] = useState(''); //ค่าจ้างวันหยุดนักขัตฤกษ์ 
    const [holidayHour, setHolidayHour] = useState(''); //ค่าจ้างวันหยุดนักขัตฤกษ์ รายชั่วโมง
    const [addSalary, setAddSalary] = useState([]); //เงิ่นเพิ่มพิเศษ

    const [workplaceIdListSearch, setWorkplaceIdListSearch] = useState([]); //หน่วยงานที่ค้นหาและทำงาน
    const [calculatedValues, setCalculatedValues] = useState([]);


    console.log('searchResult', searchResult);
    // get employee data
    const [MinusSearch, setMinusSearch] = useState(0); // Example: February (you can set it dynamically)
    const [EmpData, setEmpData] = useState([]); // Example: February (you can set it dynamically)
    // const [EmpDataWorkplace, setEmpDataWorkplace] = useState([]); // Example: February (you can set it dynamically)

    // useEffect(() => {
    //     // Extract employeeIds from searchResult
    //     const employeeIds = searchResult.map((obj) => obj.employeeId);

    //     // Filter employeelist based on employeeIds
    //     const filteredEmployeeList = employeelist.filter((employee) =>
    //         employeeIds.includes(employee.employeeId)
    //     );

    //     const selectedAddSalaryIds = filteredEmployeeList.map((obj) => obj.selectAddSalary).flat();
    //     const selectedMinus = filteredEmployeeList.map((obj) => obj.minus);
    //     const selectedaddSalary = filteredEmployeeList.map((obj) => obj.addSalary).flat();

    //     const updatedAddSalary = selectedaddSalary.map((salaryObject) => {
    //         const { SpSalary, roundOfSalary } = salaryObject;

    //         if (roundOfSalary === 'daily') {
    //             return {
    //                 ...salaryObject,
    //                 SpSalary: SpSalary * countWork,
    //             };
    //         }
    //         return salaryObject;
    //     });
    //     console.log('result123', updatedAddSalary);
    //     console.log('countWork', countWork);

    //     console.log('selectedMinus', selectedMinus);

    //     const filteredAddSalary = [];

    //     filteredEmployeeList.forEach((employee) => {
    //         employee.addSalary.forEach((salary) => {
    //             if (selectedAddSalaryIds.includes(salary._id)) {
    //                 filteredAddSalary.push(salary);
    //             }
    //         });
    //     });
    //     // const testtest2 = filteredEmployeeList.map((item) => item.department);

    //     console.log('testtest', filteredEmployeeList);
    //     // console.log('testtest2', testtest2);

    //     setEmpData(filteredEmployeeList);
    //     // setEmpDataWorkplace(filteredEmployeeList.department);

    //     setMinusSearch(selectedMinus);
    //     // setAddSalary(filteredAddSalary);
    //     setAddSalary(updatedAddSalary);
    // }, [searchResult, employeelist, countWork]);

    // console.log('employee', employee);
    console.log('addSalary123', addSalary);
    console.log('setEmpData', EmpData);
    // console.log('EmpData', EmpData);

    // useEffect(() => {
    //     // Extract workplaceId values from workplaceIdList
    //     const selectedWorkplaceIds = workplaceIdList.map((item) => item.workplaceId);

    //     // Filter workplaceList based on selected workplaceIds
    //     const filteredWorkplaces = workplaceList.filter((workplace) =>
    //         selectedWorkplaceIds.includes(workplace.workplaceId)
    //     );

    //     setWorkplaceIdListSearch(filteredWorkplaces);

    //     const EmpDatamain = EmpData.map((item) => item.workplace);

    //     const workplaceData = workplaceList.find((w) => EmpDatamain.includes(w.workplaceId));

    //     const workRate = workplaceData?.workRate ?? 0;
    //     const workRateOT = workplaceData?.workRateOT ?? 0;
    //     const workOfHour = workplaceData?.workOfHour ?? 0;

    //     const holiday = workplaceData?.holiday ?? 0;
    //     const holidayOT = workplaceData?.holidayOT ?? 0;

    //     console.log('workRate', workRate);
    //     console.log('workRateOT', workRateOT);
    //     console.log('workOfHour', workOfHour);

    //     console.log('holiday', holiday);
    //     console.log('holidayOT', holidayOT);

    //     // console.log('EmpData', EmpData);
    //     console.log('EmpDatamain', EmpDatamain);
    //     // console.log('matchingWorkplaceData', matchingWorkplaceData);


    //     const calculatedResults = workplaceIdList.map((item) => {
    //         const workplaceId = item.workplaceId;
    //         const allTime = parseFloat(item.allTime) || 0; // Convert to a number
    //         const otTime = parseFloat(item.otTime) || 0; // Convert to a number
    //         const dayoffAllTime = parseFloat(item.dayoffAllTime) || 0; // Convert to a number
    //         const dayoffOtTime = parseFloat(item.dayoffOtTime) || 0; // Convert to a number

    //         const calculatedValue = workRate * allTime;
    //         const calculatedOT = (workRate / workOfHour) * workRateOT * otTime;
    //         const calculatedValueDayoff = (workRate / workOfHour) * holiday * dayoffAllTime;
    //         const calculatedValueDayoffOt = (workRate / workOfHour) * holidayOT * dayoffOtTime;

    //         return { workplaceId, calculatedValue, allTime, otTime, dayoffAllTime, dayoffOtTime, calculatedOT, calculatedValueDayoff, calculatedValueDayoffOt };
    //     });

    //     console.log('workplaceIdList', workplaceIdList);



    //     // Remove null values from the result
    //     const filteredResults = calculatedResults.filter((result) => result !== null);

    //     // Calculate the total sum
    //     const totalSum = filteredResults.reduce((sum, result) => sum + result.calculatedValue, 0);
    //     // const totalSum = filteredResults.reduce((sum, result) => sum + result.calculatedValue, 0);

    //     setWorkRate(totalSum);

    //     setCalculatedValues(filteredResults);
    //     console.log('Total Sum:', totalSum);
    //     console.log('Total Sum2:', filteredResults);
    //     console.log('Total Sum3:', calculatedResults);


    // }, [workplaceList, workplaceIdList, EmpData]);
    console.log('workplaceList', workplaceList);
    console.log('workplaceIdList', workplaceIdList);
    console.log('EmpData', EmpData); // Can access EmpData here

    const [tableData, setTableData] = useState(
        combinedRange.map((index) => ({
            isChecked: false, // Initial state of the checkbox
            textValue: '',    // Initial state of the text value
            workplaceId: index, // Store the workplaceId
            date: '', // Store the workplaceId
        }))
    );
    const handleCheckboxChange = (index) => {
        setTableData((prevState) => {
            const updatedData = [...prevState];
            updatedData[index].isChecked = !updatedData[index].isChecked;
            return updatedData;
        });
    };

    const handleTextChange = (index, event) => {
        const { value } = event.target;
        setTableData((prevState) => {
            const updatedData = [...prevState];
            updatedData[index].textValue = value;
            return updatedData;
        });
    };


    ///PDF///////////////////////
    // const [dataset, setDataset] = useState([]);
    const [monthset, setMonthset] = useState(''); // Example: February (you can set it dynamically)

    const [MinusSS, setMinusSS] = useState(0); // Example: February (you can set it dynamically)

    const [result, setResult] = useState(''); // Example: February (you can set it dynamically)

    // useEffect(() => {
    //     setMonthset(month);

    //     const calculatedValuesAllTime = calculatedValues.map((value) => parseFloat(value.calculatedValue));
    //     const calculatedValuesOtTime = calculatedValues.map((value) => parseFloat(value.calculatedOT));

    //     const calculatedValuesDayoffAllTime = calculatedValues.map((value) => parseFloat(value.calculatedValueDayoff));
    //     const calculatedValuesDayoffOtTime = calculatedValues.map((value) => parseFloat(value.calculatedValueDayoffOt));
    //     const calculatedValuesaddSalary = addSalary.map((value) => parseFloat(value.SpSalary));



    //     const calculatedValuesminus = calculatedValues.map((value) => parseFloat(value.minus));

    //     // const testre = EmployeeSearch.map((value) => parseFloat(value.minus));

    //     const sumAlltime = calculatedValuesAllTime.reduce((total, currentValue) => total + currentValue, 0);
    //     const sumOtTime = calculatedValuesOtTime.reduce((total, currentValue) => total + currentValue, 0);

    //     const sumDayoffAlltime = calculatedValuesDayoffAllTime.reduce((total, currentValue) => total + currentValue, 0);
    //     const sumDayoffOtTime = calculatedValuesDayoffOtTime.reduce((total, currentValue) => total + currentValue, 0);

    //     const sumSalary = calculatedValuesaddSalary.reduce((total, currentValue) => total + currentValue, 0);
    //     // const summinus = calculatedValuesminus.reduce((total, currentValue) => total + currentValue, 0);

    //     const Sumall = sumAlltime + sumSalary + sumOtTime + sumDayoffAlltime + sumDayoffOtTime;
    //     const Minus = parseFloat((Sumall * (MinusSearch / 100)).toFixed(2));

    //     console.log('testRe11', calculatedValuesAllTime);


    //     console.log('testRe1', Sumall);
    //     console.log('testRe2', Minus);
    //     console.log('testRe3', MinusSearch);

    //     console.log('calculatedValuesaddSalary', calculatedValuesaddSalary);


    //     // console.log('all', calculatedValues);

    //     setMinusSS(Minus);
    //     setResult(Sumall - Minus);
    //     // countWork
    //     console.log('testcal ++', monthset);

    // }, [month, calculatedValues, addSalary]);
    console.log('testcal', monthset);
    console.log('testRe', result);


    // useState(() => {
    //   const tableDataDate = tableData.filter(item => item.date !== null && item.date !== '');
    //   setDataset(tableDataDate);
    // }, [tableData]);

    // useState(() => {
    //   const filteredData = tableData.filter((record) => record.isChecked == false);
    //   setDataset(filteredData);
    // }, [tableData]);

    // setDataset(
    //   employeeWorkplaceRecords
    //     .filter((record) => record.date) // Filter out records with null or undefined dates
    //     .map((record) => {
    //       return record;
    //     })
    // );


    const [year, setYear] = useState(2023); // Example year (you can set it dynamically)
    // const [calendarData, setCalendarData] = useState([]);

    const [workMonth, setWorkMonth] = useState([]);

    const generateText = () => {
        return searchResult.map((employeerecord) => (
            'ประจำเดือน ' + getMonthName(employeerecord.month) +
            ' ตั้งแต่วันที่ 21 ' + getMonthName(parseInt(employeerecord.month, 10) - 1) +
            ' ถึง 20 ' + getMonthName(employeerecord.month) +
            ' ' + (parseInt(employeerecord.timerecordId, 10) + 543)
        )).join(' '); // Join the generated text into a single string
    };

    // Call generateText when the component mounts or when searchResult changes
    useEffect(() => {
        const text = generateText();
        setWorkMonth(text);
    }, [searchResult]);

    const generatePDF = async () => {
        try {
            const doc = new jsPDF('landscape');

            // Load the Thai font
            const fontPath = '/assets/fonts/THSarabunNew.ttf';
            doc.addFileToVFS(fontPath);
            doc.addFont(fontPath, 'THSarabunNew', 'normal');

            // Override the default stylestable for jspdf-autotable
            const stylestable = {
                font: 'THSarabunNew',
                fontStyle: 'normal',
                fontSize: 10,
            };
            const tableOptions = {
                styles: stylestable,
                startY: 25,
                // margin: { top: 10 },
            };

            const title = ' ใบลงเวลาการปฏิบัติงาน';

            // Set title with the Thai font
            doc.setFont('THSarabunNew');
            doc.setFontSize(16);
            const titleWidth = doc.getStringUnitWidth(title) * doc.internal.getFontSize() / doc.internal.scaleFactor;
            const pageWidth = doc.internal.pageSize.getWidth();
            const titleX = (pageWidth - titleWidth) / 2;
            doc.text(title, titleX, 10);

            const subTitle = workMonth; // Replace with your desired subtitle text
            doc.setFontSize(12); // You can adjust the font size for the subtitle
            const subTitleWidth = doc.getStringUnitWidth(subTitle) * doc.internal.getFontSize() / doc.internal.scaleFactor;
            const subTitleX = (pageWidth - subTitleWidth) / 2;
            doc.text(subTitle, subTitleX, 20); // Adjust the vertical position as needed

            // Calculate the number of days in the month, considering February and leap years
            const daysInMonth = (monthset === '02' && ((year % 4 === 0 && year % 100 !== 0) || year % 400 === 0)) ? 29 :
                (monthset === '02') ? 28 :
                    [4, 6, 9, 11].includes(monthset) ? 30 : 31;

            // Calculate the starting point for the table header
            let startingDay = 21;

            // Generate the header with a single cycle of "01" to "20" followed by "21" to the last day of the month
            const header = Array.from({ length: daysInMonth }, (_, index) => {
                const day = (index + startingDay) > daysInMonth ? (index + startingDay - daysInMonth) : (index + startingDay);

                // Add leading zeros for days 1 to 9
                const formattedDay = day < 10 ? `0${day}` : day.toString();

                return formattedDay;
            });

            // Assuming that 'date' contains values like '01', '02', ..., '28', '29', '30', '31'
            // You can replace 'date' with the actual field name containing the date information in your data
            const dateOt = ['25', '09', '10'];

            const dateFieldName = 'date';

            // Create an object to store data rows by date
            const rowDataByDate = {};

            // Organize the dataset into the rowDataByDate object
            Datasetsec.forEach((data) => {
                // dataset.forEach((data) => {

                const date = data[dateFieldName];
                if (!rowDataByDate[date]) {
                    rowDataByDate[date] = { workplaceId: [], otTime: [], dateFieldName: [], allTime: [] };
                }
                rowDataByDate[date].workplaceId.push(data.workplaceId);
                rowDataByDate[date].otTime.push(data.otTime);
                rowDataByDate[date].allTime.push(data.allTime);
                rowDataByDate[date].dateFieldName.push(data[dateFieldName]);
            });

            // Map the header to transposedTableData using the rowDataByDate object
            const transposedTableData = header.map((headerDay) => {
                const rowData = rowDataByDate[headerDay];

                if (rowData) {
                    return [
                        rowData.workplaceId.join(', '),
                        rowData.allTime.join(', '),
                        rowData.otTime.join(', '),
                        // rowData.dateFieldName.join(', '),
                    ];
                } else {
                    return ['', '', ''];
                }
            });

            // Transpose the transposedTableData to sort horizontally
            const sortedTableData = Array.from({ length: 3 }, (_, index) =>
                transposedTableData.map((row) => row[index])
            );

            const textColumn = [name, 'เวลา ทำงาน', 'เวลา OT'];

            const sortedTableDataWithText = sortedTableData.map((data, index) => {
                const text = [textColumn[index]];
                return [...text, ...data];
            });

            // Now, sortedTableDataWithText contains the text column followed by sorted data columns.

            const customHeaders = [
                ['วันที่', ...header],
            ];


            // Add custom headers and data to the table
            // doc.autoTable({
            //   head: customHeaders,
            //   body: sortedTableDataWithText,
            //   ...tableOptions,
            // });
            // Create a function to check if the cell should have a background color
            function shouldHighlightCell(text) {
                return dateOt.includes(text);
            }

            doc.autoTable({
                head: customHeaders,
                body: sortedTableDataWithText,
                ...tableOptions,
                didDrawCell: function (data) {
                    if (data.cell.section === 'head' && shouldHighlightCell(data.cell.raw)) {
                        // Set the background color for header cells with the location number found in dateOt
                        doc.setFillColor(255, 255, 0); // Yellow background color
                        doc.rect(data.cell.x, data.cell.y, data.cell.width, data.cell.height, 'F');
                    }
                },
            });



            const additionalTableData = [
                ['เงินค่าจ้าง', '', '', '', '', '', '55'],
                ['Cell 4', 'Cell 5', 'Cell 6'],
                ['Cell 7', 'Cell 8', 'Cell 9'],
            ];

            // const calculatedValuesAllTime = calculatedValues.map((value) => [
            //   `รวมวันทำงาน:`, ` ${value.workplaceId}, ${value.calculatedValue} (${value.allTime})`
            // ]);

            // const calculatedValuesOt = calculatedValues.map((value) => [
            //   `รวมวันทำงาน OT:`, ` ${value.calculatedOT} (${value.otTime})`
            // ]);
            // const combinedTableData = [...additionalTableData, ...calculatedValuesAllTime, ...calculatedValuesOt];
            // /////////////////////////////////////////////////////////////////
            // const calculatedValuesAllTime = calculatedValues.map((value) => [
            //   `รวมวันทำงาน:`, ` ${value.workplaceId}, ${value.calculatedValue} (${value.allTime})`,
            // ]);

            const calculatedValuesAllTime = calculatedValues.map((value) =>
                `${value.workplaceId}, ${value.calculatedValue} (${value.allTime})`
            );

            // Combine the calculated values into a single array
            const combinedCalculatedValues = ['รวมวันทำงาน:', ...calculatedValuesAllTime];

            const calculatedValuesOt = calculatedValues.map((value) => [
                `${value.calculatedOT} (${value.otTime})`,
            ]);

            const combinedCalculatedValuesOt = ['รวมวันทำงาน OT:', ...calculatedValuesOt];

            const combinedTableData = [...additionalTableData, combinedCalculatedValues, combinedCalculatedValuesOt];
            // Combine the calculated values into a single array
            // const combinedCalculatedValues = calculatedValuesAllTime.map((value, index) => [value, calculatedValuesOt[index]]);

            // const combinedTableData = [...additionalTableData, ...combinedCalculatedValues, ...calculatedValuesOt];

            const firstColumnWidth = 30; // Adjust the width as needed

            // Define column styles, including the width of the first column
            const columnStyles = {
                0: { columnWidth: firstColumnWidth }, // Index 0 corresponds to the first column
            };

            // Define options for the additional table
            const additionalTableOptions = {
                startY: 80, // Adjust the vertical position as needed
                margin: { top: 10 },
                columnStyles: columnStyles, // Assign the column stylestable here
                styles: stylestable,
            };

            // Add the additional table to the PDF
            // doc.autoTable({
            //   body: combinedTableData,
            //   ...additionalTableOptions,
            // });

            // Define the text to add background color to
            const textWithBackgroundColor = ['รวมวันทำงาน:', 'รวมวันทำงาน OT:'];

            // Add the additional table to the PDF
            doc.autoTable({
                body: combinedTableData,
                ...additionalTableOptions,
                didDrawCell: function (data) {
                    if (data.cell.section === 'body') {
                        // Check if the cell contains text that should have a background color
                        const text = data.cell.raw;
                        if (textWithBackgroundColor.includes(text)) {
                            // Set the background color
                            doc.setFillColor(255, 255, 0); // Yellow background color
                            doc.rect(data.cell.x, data.cell.y, data.cell.width, data.cell.height, 'F');

                            // Reset text color for better visibility
                            doc.setTextColor(0, 0, 0);
                        }
                    }
                },
            });
            const titletest = 'รวมวันทำงาน:';
            const titletest2 = 'รวมวันทำงาน OT:';

            // Set title with the Thai font
            doc.setFont('THSarabunNew');
            doc.setFontSize(14);
            doc.text(titletest, 15, 108);
            doc.text(titletest2, 15, 115);


            // doc.save('example.pdf');
            const pdfContent = doc.output('bloburl');
            window.open(pdfContent, '_blank');
        } catch (error) {
            console.error('Error generating PDF:', error);
        }
    };

    // const tableRef = useRef(null);

    const tableRef = useRef(null);

    const generatePDFTest = () => {
        const doc = new jsPDF({
            orientation: 'landscape',
            unit: 'mm',
            format: 'a4',
        });
        const table = tableRef.current;
        const fontPath = '/assets/fonts/THSarabunNew.ttf';
        doc.addFileToVFS(fontPath);
        doc.addFont(fontPath, 'THSarabunNew', 'normal');

        // Override the default stylestable for jspdf-autotable
        const stylestable = {
            font: 'THSarabunNew',
            fontStyle: 'normal',
            fontSize: 10,
        };

        // Set title with the Thai font
        const title = ' ใบลงเวลาการปฏิบัติงาน';

        doc.setFont('THSarabunNew');
        doc.setFontSize(16);
        const titleWidth = doc.getStringUnitWidth(title) * doc.internal.getFontSize() / doc.internal.scaleFactor;
        const pageWidth = doc.internal.pageSize.getWidth();
        const titleX = (pageWidth - titleWidth) / 2;
        doc.text(title, titleX, 10);

        // const titleY = (doc.internal.pageSize.getHeight() - titleWidth) / 2;

        doc.text(title, titleX, 30, { angle: 90 });

        const subTitle = workMonth; // Replace with your desired subtitle text
        doc.setFontSize(12); // You can adjust the font size for the subtitle
        const subTitleWidth = doc.getStringUnitWidth(subTitle) * doc.internal.getFontSize() / doc.internal.scaleFactor;
        const subTitleX = (pageWidth - subTitleWidth) / 2;
        // doc.text(subTitle, subTitleX, 20); // Adjust the vertical position as needed

        // Convert the table to a PDF using jsPDF and jsPDF-AutoTable

        // doc.autoTable({
        //     html: table,
        //     styles: stylestable,
        //     margin: { top: 30 },
        // });
        function getDaysInMonth(month, year) {
            // Months are 0-based, so we subtract 1 from the provided month
            const lastDayOfMonth = new Date(year, month, 0).getDate();
            return lastDayOfMonth;
        }

        // const CheckMonth = 2; 
        // const CheckYear = 2023;

        // const daysInMonth = getDaysInMonth(CheckMonth, CheckYear);

        // doc.text('จำนวนวัน' + daysInMonth, 10, 10);

        const CheckMonth = 2;
        const CheckYear = 2023;

        const daysInMonth = getDaysInMonth(CheckMonth, CheckYear);
        // const daysInMonth = 30;

        doc.text('จำนวนวัน' + daysInMonth, 10, 10);

        const numRows = 7;
        const numCols = daysInMonth;
        const cellWidth = 4.125;
        const cellHeight = 3.5;
        const startX = 50; // Adjust the starting X-coordinate as needed
        const startY = 55; // Adjust the starting Y-coordinate as needed
        const borderWidth = 0.5; // Adjust the border width as needed

        // Function to draw a cell with borders
        const drawCell = (x, y, width, height) => {
            doc.rect(x, y, width, height);
        };

        // Function to draw the entire table
        // const drawTable = () => {
        //     for (let i = 0; i < numRows; i++) {
        //         for (let j = 0; j < numCols; j++) {
        //             const x = startX + j * cellWidth;
        //             const y = startY + i * cellHeight;
        //             drawCell(x, y, cellWidth, cellHeight);
        //         }
        //     }
        // };
        const drawTable = (tableNumber) => {
            for (let i = 0; i < numRows; i++) {
                for (let j = 0; j < numCols; j++) {
                    const x = startX + j * cellWidth;
                    const y = startY + i * cellHeight + tableNumber * (numRows * cellHeight + 1);
                    drawCell(x, y, cellWidth, cellHeight);
                }
            }
        };

        const numRowsLeftHead = 7;
        const numColsLeftHead = 1;
        const cellWidthLeftHead = 40;
        const cellHeightLeftHead = 3.5;
        const startXLeftHead = 10; // Adjust the starting X-coordinate as needed
        // const startYLeftHead = 20; // Adjust the starting Y-coordinate as needed
        const borderWidthLeftHead = 0.5; // Adjust the border width as needed

        const drawTableLeftHead = (tableNumber) => {
            for (let i = 0; i < numRows; i++) {
                for (let j = 0; j < numColsLeftHead; j++) {
                    const x = startXLeftHead + j * cellWidthLeftHead;
                    const y = startY + i * cellHeight + tableNumber * (numRows * cellHeight + 1);
                    drawCell(x, y, cellWidthLeftHead, cellHeight);
                }
            }
        };
        const numRowsNumHead = 7;
        const numColsNumHead = 1;
        const cellWidthNumHead = 10;
        const cellHeightNumHead = 3.5;
        const startXNumHead = 10; // Adjust the starting X-coordinate as needed
        // const startYNumHead = 20; // Adjust the starting Y-coordinate as needed
        const borderWidthNumHead = 0.5; // Adjust the border width as needed

        const drawTableNumHead = (tableNumber) => {
            for (let i = 0; i < numRows; i++) {
                for (let j = 0; j < numColsNumHead; j++) {
                    const x = startXNumHead + j * cellWidthNumHead;
                    const y = startY + i * cellHeight + tableNumber * (numRows * cellHeight + 1);
                    drawCell(x, y, cellWidthNumHead, cellHeight);
                }
            }
        };

        const numRowsSpSalary = 7;
        const numColsSpSalary = 8;
        const cellWidthSpSalary = 10;
        const cellHeightSpSalary = 3.5;
        const borderWidthSpSalary = 0.5; // Adjust the border width as needed

        let startXSpSalary; // Declare startXSpSalary before using it

        if (daysInMonth === 28) {
            startXSpSalary = 165.5;
        } else if (daysInMonth === 29) {
            startXSpSalary = 169.5;
        } else if (daysInMonth === 30) {
            startXSpSalary = 173.75;
        } else if (daysInMonth === 31) {
            startXSpSalary = 177.75;
        };
        // console.log('startXSpSalary:', startXSpSalary);
        // console.log('cellHeightSpSalary:', cellHeightSpSalary);

        // const startXSpSalary = 182; // Adjust the starting X-coordinate as needed
        // const startYSpSalary = 20; // Adjust the starting Y-coordinate as needed

        const drawTableSpSalary = (tableNumber) => {
            for (let i = 0; i < numRows; i++) {
                for (let j = 0; j < numColsSpSalary; j++) {
                    const x = startXSpSalary + j * cellWidthSpSalary;
                    const y = startY + i * cellHeight + tableNumber * (numRows * cellHeight + 1);
                    drawCell(x, y, cellWidthSpSalary, cellHeight);
                }
            }
        };

        const numRowsMess = 7;
        const numColsMess = 1;
        const cellWidthMess = 25;
        const cellHeightMess = 3.5;
        let startXMess; // Declare startXSpSalary before using it

        if (daysInMonth === 28) {
            startXMess = 245.5;
        } else if (daysInMonth === 29) {
            startXMess = 249.5;
        } else if (daysInMonth === 30) {
            startXMess = 253.75;
        } else if (daysInMonth === 31) {
            startXMess = 257.75;
        };
        // const startXMess = 262; // Adjust the starting X-coordinate as needed
        // const startYMess = 20; // Adjust the starting Y-coordinate as needed
        const borderWidthMess = 0.5; // Adjust the border width as needed

        const drawTableMess = (tableNumber) => {
            for (let i = 0; i < numRows; i++) {
                for (let j = 0; j < numColsMess; j++) {
                    const x = startXMess + j * cellWidthMess;
                    const y = startY + i * cellHeight + tableNumber * (numRows * cellHeight + 1);
                    drawCell(x, y, cellWidthMess, cellHeight);
                }
            }
        };

        // Draw the table
        // drawTable();
        for (let i = 0; i < 5; i++) {
            drawTable(i);
            drawTableLeftHead(i);
            drawTableNumHead(i);
            drawTableSpSalary(i);
            drawTableMess(i);
        }
        // body table//////////////////////////////////////////////////////////////////////////////////////////////////////

        // const numRows = 1;
        // const numCols = daysInMonth;
        // const cellWidth = 4.125;
        // const cellHeight = 3.5;
        // const startX = 50; // Adjust the starting X-coordinate as needed
        // const startY = 55; // Adjust the starting Y-coordinate as needed
        // const borderWidth = 0.5; // Adjust the border width as needed

        const drawTableTop = (tableNumber) => {
            for (let i = 0; i < numRows; i++) {
                for (let j = 0; j < numCols; j++) {
                    const x = startX + j * cellWidth;
                    const y = startY + i * cellHeight + tableNumber * (numRows * cellHeight + 1);
                    drawCell(x, y, cellWidth, cellHeight);
                }
            }
        };
        const drawTableLeftHeadTop = (tableNumber) => {
            for (let i = 0; i < numRows; i++) {
                for (let j = 0; j < numColsLeftHead; j++) {
                    const x = startXLeftHead + j * cellWidthLeftHead;
                    const y = startY + i * cellHeight + tableNumber * (numRows * cellHeight + 1);
                    drawCell(x, y, cellWidthLeftHead, cellHeight);
                }
            }
        };
        const drawTableNumHeadTop = (tableNumber) => {
            for (let i = 0; i < numRows; i++) {
                for (let j = 0; j < numColsNumHead; j++) {
                    const x = startXNumHead + j * cellWidthNumHead;
                    const y = startY + i * cellHeight + tableNumber * (numRows * cellHeight + 1);
                    drawCell(x, y, cellWidthNumHead, cellHeight);
                }
            }
        };
        const drawTableSpSalaryTop = (tableNumber) => {
            for (let i = 0; i < numRows; i++) {
                for (let j = 0; j < numColsSpSalary; j++) {
                    const x = startXSpSalary + j * cellWidthSpSalary;
                    const y = startY + i * cellHeight + tableNumber * (numRows * cellHeight + 1);
                    drawCell(x, y, cellWidthSpSalary, cellHeight);
                }
            }
        };
        const drawTableMessTop = (tableNumber) => {
            for (let i = 0; i < numRows; i++) {
                for (let j = 0; j < numColsMess; j++) {
                    const x = startXMess + j * cellWidthMess;
                    const y = startY + i * cellHeight + tableNumber * (numRows * cellHeight + 1);
                    drawCell(x, y, cellWidthMess, cellHeight);
                }
            }
        };


        // doc.save('your_table.pdf');
        const pdfContent = doc.output('bloburl');
        window.open(pdfContent, '_blank');
    };

    return (
        // <div>
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
                            <div class="col-md-7">
                                <section class="Frame">
                                    <div class="col-md-12">
                                        <h2 class="title">ค้นหา</h2>
                                        <div class="col-md-12">
                                            <form onSubmit={handleSearch}>
                                                <div class="row">
                                                    <div class="col-md-3">
                                                        <div class="form-group">
                                                            <label role="searchWorkplaceId">หน่วยงาน</label>
                                                            <input type="text" class="form-control" id="searchWorkplaceId" placeholder="หน่วยงาน" value={searchWorkplaceId} onChange={(e) => setSearchWorkplaceId(e.target.value)} />
                                                        </div>
                                                    </div>
                                                    <div class="col-md-3">
                                                        <div class="form-group">
                                                            <label role="searchWorkplaceName">ชื่อหน่วยงาน</label>
                                                            <input type="text" class="form-control" id="searchWorkplaceName" placeholder="ชื่อหน่วยงาน" value={searchWorkplaceName} onChange={(e) => setSearchWorkplaceName(e.target.value)} />
                                                        </div>
                                                    </div>
                                                    <div class="col-md-3">
                                                        <div class="form-group">
                                                            <label role="searchEmployeeId">เดือน</label>
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
                                                    <div class="row">
                                                        <div class="col-md-12">
                                                            <div class="form-group" style={{ position: 'absolute', bottom: '0' }}>
                                                                <button class="btn b_save"><i class="nav-icon fas fa-search"></i> &nbsp; ค้นหา</button>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </form>
                                            <div class="d-flex justify-content-center">
                                                <h2 class="title">ผลลัพธ์ {result_data.length} รายการ</h2>
                                            </div>
                                            <div class="d-flex justify-content-center">
                                                <div class="row">
                                                    <div class="col-md-12">
                                                        <div class="form-group">
                                                            <ul style={{ listStyle: 'none', marginLeft: "-2rem" }}>
                                                                {result_data.map(workplace => (
                                                                    <li
                                                                        key={workplace.employeeId}
                                                                        onClick={() => handleClickResult(workplace)}
                                                                    >
                                                                        รหัส {workplace.employeeId || ''} ชื่อพนักงาน {workplace.employeeName || ''}
                                                                    </li>
                                                                ))}
                                                            </ul>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </section>
                            </div>

                        </div>

                        <div class="row">
                            <div class="col-md-2">
                                {result_data.map((
                                    employeerecord) => (
                                    employeerecord.employeeId + ': ชื่อพนักงาน ' + employeerecord.employeeName)
                                )}
                            </div>
                        </div>
                        <br />

                        <div class="row">
                            <div class="col-md-2">
                                {result_data.map((
                                    employeerecord) => (
                                    '                ชื่อ :                   ' + employeerecord.employeeName)
                                )}
                            </div>
                            <div class="col-md-3">
                                {result_data.map((
                                    employeerecord) => (
                                        'ประจำเดือน ' + getMonthName(month)
                                        + 'ตั้งแต่วันที่ 21 ' + getMonthName(parseInt(month, 10) - 1)
                                        + ' ถึง 20 ' + getMonthName(month))
                                    + '  ' + (parseInt(employeerecord.timerecordId, 10) + 543)
                                )}
                            </div>
                        </div>
                        <br />
                        <div class="row">
                            <div class="col-md-3">
                                วันทำงานทั้งหมด {countWork} วัน
                            </div>
                        </div>

                        <form>
                            <div class="row">
                                <div class="col-md-9">
                                    <section class="Frame">
                                        <div class="container" style={{ overflowX: 'scroll' }}>
                                            {/* <table class="table table-bordered "> */}
                                            <button onClick={generatePDFTest}>Generate PDF</button>
                                            <table ref={tableRef} className="table table-bordered">
                                                <thead>
                                                    <tr>
                                                        <th style={styles.th}></th>
                                                        {combinedRange.map((number, index) => (
                                                            <th key={index} style={styles.th}>{number}</th>
                                                        ))}
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    <tr>
                                                        <td style={verticalTextHeader} >วันทำงาน</td>
                                                        {tableData.map((data, index) => (
                                                            <td key={index}>
                                                                {data.workplaceId <= 31 ? null : data.workplaceId}

                                                            </td>

                                                        ))}

                                                    </tr>
                                                    <tr>
                                                        <td></td>
                                                        {listTableDayoff.map((item, index) => {
                                                            const [day, s] = Object.entries(item)[0];

                                                            return (
                                                                <td key={index}>{s}</td>
                                                            )

                                                        }

                                                        )}
                                                    </tr>
                                                    <tr>
                                                        <td>ช.ม. ทำงาน</td>
                                                        {tableData.map((data, index) => (
                                                            <td key={index}>
                                                                {data.allTime}
                                                            </td>
                                                        ))}
                                                    </tr>
                                                    <tr>
                                                        <td>ช.ม. โอที</td>
                                                        {tableData.map((data, index) => (
                                                            <td key={index}>
                                                                {data.otTime}
                                                            </td>
                                                        ))}
                                                    </tr>
                                                </tbody>
                                            </table>
                                        </div>

                                    </section>
                                </div>
                            </div>
                        </form>
                        {/* </form> */}
                    </section>
                    {/* <!-- /.content --> */}
                </div >
            </div >

            {/* {JSON.stringify(listDayOff,null,2)} */}

        </body >
    )
}

function getMonthName(monthNumber) {
    const months = [
        'มกราคม', 'กุมภาพันธ์', 'มีนาคม', 'เมษายน', 'พฤษภาคม', 'มิถุนายน',
        'กรกฎาคม', 'สิงหาคม', 'กันยายน', 'ตุลาคม', 'พฤศจิกายน', 'ธันวาคม'
    ];

    // Ensure the monthNumber is within a valid range (1-12)
    if (monthNumber >= 1 && monthNumber <= 12) {
        return months[monthNumber - 1]; // Months array is 0-based
    } else {
        // return 'Invalid Month';
        return months[12]; // Months array is 12 -based
    }
}

const getDateDayOfWeek = (dateString) => {
    // Create a Date object with the input date string in the format YYYY/mm/dd
    const date = new Date(dateString);

    // Get the day of the week (0 = Sunday, 1 = Monday, ..., 6 = Saturday)
    const dayOfWeek = date.getDay();
    // Return the day of the week (Sunday, Monday, etc.)
    // const daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    //overide
    const daysOfWeek = ['1', '2', '3', '4', '5', '6', '7'];
    return daysOfWeek[dayOfWeek];
    // console.log('dayOfWeek',dayOfWeek);
};
// console.log('',getDateDayOfWeek);


export default WorktimeSheetWorkplace