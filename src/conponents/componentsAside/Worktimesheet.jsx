import endpoint from '../../config';

import axios from 'axios';
import React, { useEffect, useState } from 'react';
import '../editwindowcss.css';
// import TestPDF from './TestPDF';

import { jsPDF } from 'jspdf';
import 'jspdf-autotable';

function Worktimesheet() {
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



  function getListDayOff(month, month1, errorCallback ) {
    alert('hi');
    setM(month);
    setM1(month1);
    setY(searchResult[0].timerecordId);

    const emp_workplace = employeelist.find(item => item.employeeId === searchResult[0].employeeId);
    const wid = emp_workplace.workplace;
    const empWorkplace = workplaceList.find(item => item.workplaceId === wid);

    const df = [];
    if (empWorkplace.workday7 !== "true") {
      df.push('1');
    }
    if (empWorkplace.workday6 !== "true") {
      df.push('7');
    }
    if (empWorkplace.workday5 !== "true") {
      df.push('6');
    }
    if (empWorkplace.workday4 !== "true") {
      df.push('5');
    }
    if (empWorkplace.workday3 !== "true") {
      df.push('4');
    }
    if (empWorkplace.workday2 !== "true") {
      df.push('3');
    }
    if (empWorkplace.workday1 !== "true") {
      df.push('2');
    }

    setListDayOff(df);
// alert(listDayOff);
  }


  // Generate an array containing numbers from 21 to 31
  const range1 = Array.from({ length: 11 }, (_, i) => i + 21);

  // Generate an array containing numbers from 1 to 20
  const range2 = Array.from({ length: 20 }, (_, i) => i + 1);

  // Combine the two ranges into a single array
  const combinedRange = [...range1, ...range2];


  const [countWork, setCountWork] = useState(0);
  const [countWorkSTime, setCountWorkSTime] = useState(0);


  const [checked1, setChecked1] = useState(false);
  const [checked2, setChecked2] = useState(false);
  const [checked3, setChecked3] = useState(false);
  const [checked4, setChecked4] = useState(false);
  const [checked5, setChecked5] = useState(false);
  const [checked6, setChecked6] = useState(false);
  const [checked7, setChecked7] = useState(false);
  const [checked8, setChecked8] = useState(false);
  const [checked9, setChecked9] = useState(false);
  const [checked10, setChecked10] = useState(false);
  const [checked11, setChecked11] = useState(false);
  const [checked12, setChecked12] = useState(false);
  const [checked13, setChecked113] = useState(false);
  const [checked14, setChecked14] = useState(false);
  const [checked15, setChecked15] = useState(false);
  const [checked16, setChecked16] = useState(false);
  const [checked17, setChecked17] = useState(false);
  const [checked18, setChecked18] = useState(false);
  // const [checked1, setChecked1] = useState(false);
  // const [checked2, setChecked2] = useState(false);
  // const [checked3, setChecked3] = useState(false);
  // const [checked1, setChecked1] = useState(false);
  // const [checked2, setChecked2] = useState(false);
  // const [checked3, setChecked3] = useState(false);
  // const [checked1, setChecked1] = useState(false);
  // const [checked2, setChecked2] = useState(false);
  // const [checked3, setChecked3] = useState(false);

  const [checked28, setChecked28] = useState(false);
  const [checked31, setChecked31] = useState(false);


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
    if (searchEmployeeId === '' && searchEmployeeName === '') {
      // Both employeeId and employeeName are null
      alert("error");
      // You can use window.location.reload() to reload the web page
      window.location.reload();
    } else {
      // At least one of them is not null
      console.log(searchEmployeeId);
    }
    const data = await {
      employeeId: searchEmployeeId,
      employeeName: searchEmployeeName,
      month: month
    }; console.log(searchEmployeeId);

    const parsedNumber = await parseInt(month, 10) - 1;
    const formattedResult = await String(parsedNumber).padStart(2, '0');
    // await alert(formattedResult );

    const data1 = await {
      employeeId: searchEmployeeId,
      employeeName: searchEmployeeName,
      month: formattedResult
    };

    console.log('data1', data1.month);
    console.log('data2', data.month);

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

    // Set the calendar data in the state
    // setCalendarData1(dates1); 
    // setCalendarData2(dates2);
    // console.log('calendarData1', calendarData1);
    // console.log('calendarData2', calendarData2);
    const filteredDates1 = dates1.map((dayData) => ({
      ...dayData,
      dates: dayData.dates.filter((date) => date >= 21 && date <= 31), // Adjusted filtering condition
    })).filter((dayData) => dayData.dates.length > 0);


    const filteredDates2 = dates2.map((dayData) => ({
      ...dayData,
      dates: dayData.dates.filter((date) => date < 20), // Adjusted filtering condition
    })).filter((dayData) => dayData.dates.length > 0);

    console.log('calendarData1 filteredDates1:', filteredDates1);
    console.log('calendarData2 filteredDates2:', filteredDates2);
    setCalendarData1(filteredDates1); // Assuming you have a separate state for data1.month
    setCalendarData2(filteredDates2);
    try {

      const response = await axios.post(endpoint + '/timerecord/searchemp', data);

      if (response.data.recordworkplace.length >= 1) {
        await setSearchResult(response.data.recordworkplace);
        await setResult_data(response.data.recordworkplace);
      } else {
        alert("ไม่พบข้อมูล 1 ถึง 20 " + getMonthName(data.month));
      }


      // const empId = await axios.post(endpoint + '/employee/search', searchResult.employeeId);
      // if (empId.data.recordworkplace.length >= 1) {
      //   await setEmpId(empId.data.recordworkplace);
      // } else {
      //   alert("ไม่พบข้อมูล 1 ถึง 20 " + getMonthName(data.month));
      // }
      // console.log('empId',empId);

      // if (data1.month == '00') {
      //   data1.month = '12';
      // }
      // const response1 = await axios.post(endpoint + '/timerecord/searchemp', data1);
      // if (response1.data.recordworkplace.length >= 1) {
      //   await setSearchResult1(response1.data.recordworkplace);
      // } else {
      //   alert("ไม่พบข้อมูล 21 ถึง สิ้นเดือน " + getMonthName(data1.month ) );
      // }

      // // await alert(data1.month + ' : '+ response1.data.recordworkplace.length )
      // // await alert(data.month + ' : '+ response.data.recordworkplace.length )

      // // await alert(searchResult[0].employee_workplaceRecord.length);

      // // alert(JSON.stringify(response.data , null, 2) );
      // // await alert(searchResult[0].employee_workplaceRecord[0].workplaceId );

      const employeeWorkplaceRecords = await response.data.recordworkplace[0].employee_workplaceRecord || '';
      // const employeeWorkplaceRecords1 = await response1.data.recordworkplace[0].employee_workplaceRecord || '';

      // // xx
      // if (employeeWorkplaceRecords1.length > 0) {
      //   const dates1 = employeeWorkplaceRecords1.map(record => record.date);
      //   // const otTime = employeeWorkplaceRecords.map(record => record.otTime);

      //   const allTimeA1 = employeeWorkplaceRecords1.map((record) => record.allTime);

      //   const workplaceId1 = employeeWorkplaceRecords1.map(record => record.workplaceId);

      //   const otTime1 = employeeWorkplaceRecords1.map((record) => record.otTime);

      //   // setDataset(
      //   //   employeeWorkplaceRecords1.filter((record) => record.date) // Filter out records with null or undefined dates
      //   //     .map((record) => {
      //   //       return record;
      //   //     })
      //   // );

      //   setTableData((prevState) => {
      //     const updatedData = [...prevState];
      //     dates1.forEach((date1, index) => {
      //       const dataIndex1 = parseInt(date1, 10) - 1; // Subtract 1 because indices are zero-based
      //       if (dataIndex1 >= 0 && dataIndex1 < updatedData.length) {

      //         if (dataIndex1 >= 21 && dataIndex1 <= 31) {
      //           // alert(dataIndex1 +' .');

      //           updatedData[(dataIndex1 - 20)].isChecked = true;
      //           updatedData[(dataIndex1 - 20)].otTime = otTime1[index];
      //           updatedData[(dataIndex1 - 20)].allTimeA = allTimeA1[index];
      //           updatedData[(dataIndex1 - 20)].workplaceId = workplaceId1[index]; // Set otTime at the same index as dates
      //           updatedData[(dataIndex1 - 20)].date = dates1[index]; // Set otTime at the same index as dates

      //           // Set otTime at the same index as dates

      //         }

      //       }
      //     });
      //     const filteredData = updatedData.filter((record) => record.isChecked == true);
      //     setDataset(filteredData);
      //     return updatedData;

      //   });

      //   // setWoekplace(dates);

      // }
      // // xx

      if (employeeWorkplaceRecords.length > 0) {
        const dates = employeeWorkplaceRecords.map(record => record.date);
        // const otTime = employeeWorkplaceRecords.map(record => record.otTime);

        const allTimeA = employeeWorkplaceRecords.map((record) => record.allTime);

        const workplaceId = employeeWorkplaceRecords.map(record => record.workplaceId);

        const otTime = employeeWorkplaceRecords.map((record) => record.otTime);

        // setDataset(
        //   employeeWorkplaceRecords
        //     .filter((record) => record.date) // Filter out records with null or undefined dates
        //     .map((record) => {
        //       return record;
        //     })
        // );

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

          // const filteredData = [
          //   { isChecked: true, textValue: '', workplaceId: '1001', date: '30', otTime: '1.0', allTime: '8.0' },
          //   { isChecked: true, textValue: '', workplaceId: '1001', date: '01', otTime: '2.0', allTime: '4.0' },
          //   { isChecked: true, textValue: '', workplaceId: '1002', date: '03', otTime: '6.0', allTime: '8.0' },
          //   { isChecked: false, textValue: '', workplaceId: '1003', date: '04', otTime: '2.0', allTime: '8.0' }
          // ];
          // const workplaceIds = filteredData.map((record) => record.workplaceId)
          const workplaceIds = [...new Set(filteredData.map((record) => record.workplaceId))];

          // const workplaceIdCounts = {};
          // 
          // Extract unique workplaceId values and count occurrences
          // filteredData.forEach((record) => {
          //   if (record.isChecked) {
          //     const { workplaceId } = record;
          //     if (workplaceIdCounts[workplaceId]) {
          //       workplaceIdCounts[workplaceId]++;
          //     } else {
          //       workplaceIdCounts[workplaceId] = 1;
          //     }
          //   }
          // });
          // // const uniqueWorkplaceIds = [...new Set(updatedData.map((record) => record.workplaceId))];
          // const result = Object.entries(workplaceIdCounts).map(([workplaceId, count]) => ({ workplaceId, count }));

          const workplaceIdCounts = {};
          const workplaceIdAllTimes = {};
          const workplaceIdOtTimes = {};


          filteredData.forEach((record) => {
            if (record.isChecked) {
              const { workplaceId, otTime, allTime } = record;
              if (workplaceIdCounts[workplaceId]) {
                workplaceIdCounts[workplaceId]++;
                const allTimeAsNumber = parseFloat(allTime); // Parse allTime to a number
                const otTimeAsNumber = parseFloat(otTime); // Parse otTime to a number

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
              } else {
                workplaceIdCounts[workplaceId] = 1;
                const allTimeAsNumber = parseFloat(allTime); // Parse allTime to a number
                const otTimeAsNumber = parseFloat(otTime); // Parse otTime to a number
                if (!isNaN(allTimeAsNumber)) {
                  if (allTimeAsNumber > 5.0) {
                    workplaceIdAllTimes[workplaceId] = 1;
                  } else {
                    workplaceIdAllTimes[workplaceId] = 0.5;
                  }
                }
                if (!isNaN(otTimeAsNumber)) {
                  workplaceIdOtTimes[workplaceId] = otTimeAsNumber;
                }
              }
            }
          });

          const result = Object.entries(workplaceIdCounts).map(([workplaceId, count]) => ({
            workplaceId,
            count,
            allTime: workplaceIdAllTimes[workplaceId].toFixed(1),
            otTime: workplaceIdOtTimes[workplaceId].toFixed(2), // Format otTime to 2 decimal places
          }));

          // Calculate the total allTime
          const totalAllTime = Object.values(workplaceIdAllTimes).reduce((sum, allTime) => sum + allTime, 0).toFixed(1);

          console.log('Result:', result);
          console.log('Total AllTime:', totalAllTime);
          setDataset(filteredData);

          const count = filteredData.length;
          setCountWork((count));
          setCountWorkSTime(totalAllTime);
          setWorkplaceIdList(result);


          return updatedData;
        });

      }
      // console.log('Result:');
      // console.log(result);
      /////////

      // alert(response.data.recordworkplace.length);
      if (response.data.recordworkplace.length < 1) {
        window.location.reload();
        alert('ไม่พบข้อมูล');
      } else {

        // Set search values
        await setEmployeeId(response.data.recordworkplace[0].employeeId);
        await setName(response.data.recordworkplace[0].employeeName);
        // console.log('Name', name);

        // setWoekplace(response.data.recordworkplace[0].employee_workplaceRecord[0].workplaceName);

        // setSearchEmployeeId(response.data.employees[0].employeeId);
        // setSearchEmployeeName(response.data.employees[0].name);
        setSearchEmployeeId('');
        setSearchEmployeeName('');

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
        if (!result_data) {
          await setResult_data(response1.data.recordworkplace);
        }

      } else {
        alert("ไม่พบข้อมูล 21 ถึง สิ้นเดือน " + getMonthName(data1.month));
      }

      // await alert(data1.month + ' : '+ response1.data.recordworkplace.length )
      // await alert(data.month + ' : '+ response.data.recordworkplace.length )

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
          // console.log('updatedData', updatedData);
          // const workplaceIds = filteredData.map((record) => record.workplaceId)

          // const filteredData = [
          //   { isChecked: true, textValue: '', workplaceId: '1001', date: '30', otTime: '1.0', allTime: '8.0' },
          //   { isChecked: true, textValue: '', workplaceId: '1001', date: '01', otTime: '2.0', allTime: '4.0' },
          //   { isChecked: true, textValue: '', workplaceId: '1002', date: '03', otTime: '6.0', allTime: '8.0' },
          //   { isChecked: false, textValue: '', workplaceId: '1003', date: '04', otTime: '2.0', allTime: '8.0' }
          // ];

          const workplaceIds = [...new Set(filteredData.map((record) => record.workplaceId))];
          // const workplaceIdCounts = {};
          // const workplaceIdOtTimes = {};
          // Extract unique workplaceId values and count occurrences
          // filteredData.forEach((record) => {
          //   if (record.isChecked) {
          //     const { workplaceId } = record;
          //     if (workplaceIdCounts[workplaceId]) {
          //       workplaceIdCounts[workplaceId]++;
          //     } else {
          //       workplaceIdCounts[workplaceId] = 1;
          //     }
          //   }
          // });
          // // const uniqueWorkplaceIds = [...new Set(updatedData.map((record) => record.workplaceId))];
          // const result = Object.entries(workplaceIdCounts).map(([workplaceId, count, allTime, otTime]) => ({ workplaceId, count, allTime, otTime }));

          const workplaceIdCounts = {};
          const workplaceIdAllTimes = {};
          const workplaceIdOtTimes = {};


          filteredData.forEach((record) => {
            if (record.isChecked) {
              const { workplaceId, otTime, allTime } = record;
              if (workplaceIdCounts[workplaceId]) {
                workplaceIdCounts[workplaceId]++;
                const allTimeAsNumber = parseFloat(allTime); // Parse allTime to a number
                const otTimeAsNumber = parseFloat(otTime); // Parse otTime to a number

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
              } else {
                workplaceIdCounts[workplaceId] = 1;
                const allTimeAsNumber = parseFloat(allTime); // Parse allTime to a number
                const otTimeAsNumber = parseFloat(otTime); // Parse otTime to a number
                if (!isNaN(allTimeAsNumber)) {
                  if (allTimeAsNumber > 5.0) {
                    workplaceIdAllTimes[workplaceId] = 1;
                  } else {
                    workplaceIdAllTimes[workplaceId] = 0.5;
                  }
                }
                if (!isNaN(otTimeAsNumber)) {
                  workplaceIdOtTimes[workplaceId] = otTimeAsNumber;
                }
              }
            }
          });

          const result = Object.entries(workplaceIdCounts).map(([workplaceId, count]) => ({
            workplaceId,
            count,
            allTime: workplaceIdAllTimes[workplaceId].toFixed(1),
            otTime: workplaceIdOtTimes[workplaceId].toFixed(2), // Format otTime to 2 decimal places
          }));

          // Calculate the total allTime
          const totalAllTime = Object.values(workplaceIdAllTimes).reduce((sum, allTime) => sum + allTime, 0).toFixed(1);

          console.log('Result:', result);
          console.log('Total AllTime:', totalAllTime);

          console.log('filteredData', filteredData);

          const count = filteredData.length;

          setDataset(filteredData);
          setCountWork((count));
          setCountWorkSTime(totalAllTime);
          setWorkplaceIdList(result);

          return updatedData;

        });
        // setWoekplace(dates);


      }
    }

    catch (error) {
      alert('กรุณาตรวจสอบข้อมูลในช่องค้นหา', error);
      // window.location.reload();
    }

    //check day off form select month
    getListDayOff(data.month, data1.month , () =>{
      // alert(listDayOff.length);
    });

  }
  console.log('workplaceIdList', workplaceIdList);


  console.log('calendarData1 updated:', calendarData1);
  console.log('calendarData2 updated:', calendarData2);

  //set salaty calculate
  const [workRate, setWorkRate] = useState(''); //ค่าจ้างต่อวัน
  const [workRateOT, setWorkRateOT] = useState(''); //ค่าจ้าง OT ต่อชั่วโมง
  const [holiday, setHoliday] = useState(''); //ค่าจ้างวันหยุดนักขัตฤกษ์ 
  const [holidayHour, setHolidayHour] = useState(''); //ค่าจ้างวันหยุดนักขัตฤกษ์ รายชั่วโมง
  const [addSalary, setAddSalary] = useState([]); //เงิ่นเพิ่มพิเศษ

  const [workplaceIdListSearch, setWorkplaceIdListSearch] = useState([]); //หน่วยงานที่ค้นหาและทำงาน
  const [calculatedValues, setCalculatedValues] = useState([]);

  useEffect(() => {
    // Extract workplaceId values from workplaceIdList
    const selectedWorkplaceIds = workplaceIdList.map((item) => item.workplaceId);

    // Filter workplaceList based on selected workplaceIds
    const filteredWorkplaces = workplaceList.filter((workplace) =>
      selectedWorkplaceIds.includes(workplace.workplaceId)
    );

    // Extract the filtered workplaceIds
    // const filteredWorkplaceIds = filteredWorkplaces.map((workplace) => workplace.workplaceId);

    // Set the result in workplaceIdListSearch 

    setWorkplaceIdListSearch(filteredWorkplaces);

    const calculatedResults = workplaceIdList.map((item) => {
      const workplaceId = item.workplaceId;
      const count = item.count;
      const allTime = item.allTime;
      const otTime = item.otTime;

      const workplace = workplaceList.find((w) => w.workplaceId === workplaceId);
      if (workplace) {
        const workRate = workplace.workRate;
        const workRateOT = workplace.workRateOT;
        const workOfHour = workplace.workOfHour;

        return { workplaceId, calculatedValue: workRate * allTime, allTime, otTime, calculatedOT: (workRate / workOfHour) * workRateOT * otTime };
      }
      return null;
    });

    // Remove null values from the result
    const filteredResults = calculatedResults.filter((result) => result !== null);

    // Calculate the total sum
    const totalSum = filteredResults.reduce((sum, result) => sum + result.calculatedValue, 0);
    // const totalSum = filteredResults.reduce((sum, result) => sum + result.calculatedValue, 0);



    setWorkRate(totalSum);

    setCalculatedValues(filteredResults);
    console.log('Total Sum:', totalSum);
    console.log('Total Sum2:', filteredResults);
    console.log('Total Sum3:', calculatedResults);


  }, [workplaceList, workplaceIdList]);
  console.log(workplaceList);

  console.log('searchResult', searchResult);
  // get employee data
  const [MinusSearch, setMinusSearch] = useState(0); // Example: February (you can set it dynamically)

  useEffect(() => {
    // Extract employeeIds from searchResult
    const employeeIds = searchResult.map((obj) => obj.employeeId);

    // Filter employeelist based on employeeIds
    const filteredEmployeeList = employeelist.filter((employee) =>
      employeeIds.includes(employee.employeeId)
    );

    const selectedAddSalaryIds = filteredEmployeeList.map((obj) => obj.selectAddSalary).flat();
    const selectedMinus = filteredEmployeeList.map((obj) => obj.minus);
    // const selectedMinus = filteredEmployeeList.map((obj) => obj.minus.toFixed(2));
    // const selectedMinus = filteredEmployeeList.map((obj) => parseFloat(obj.minus.toFixed(2)));
    console.log('selectedMinus', selectedMinus);

    const filteredAddSalary = [];

    filteredEmployeeList.forEach((employee) => {
      employee.addSalary.forEach((salary) => {
        if (selectedAddSalaryIds.includes(salary._id)) {
          filteredAddSalary.push(salary);
        }
      });
    });

    console.log('test', filteredEmployeeList);
    setMinusSearch(selectedMinus);
    setAddSalary(filteredAddSalary);
  }, [searchResult, employeelist]);
  // console.log('employee', employee);
  console.log('addSalary', addSalary);



  // console.log('workRate', workplaceIdListSearch);
  // console.log('allworkRate', calculatedValues);


  // const handleCheckboxChange = (event) => {
  //   const { name, checked } = event.target;
  //   if (name === 'checked28') {
  //     setChecked28(checked);
  //   } else if (name === 'checked31') {
  //     setChecked31(checked);
  //   }
  // };



  const [tableData, setTableData] = useState(
    combinedRange.map((index) => ({
      isChecked: false, // Initial state of the checkbox
      textValue: '',    // Initial state of the text value
      workplaceId: index, // Store the workplaceId
      date: '', // Store the workplaceId
    }))
  );
  // const [tableData, setTableData] = useState(
  //   new Array(31).fill('').map((_, index) => ({
  //     isChecked: false,
  //     textValue: '',
  //   }))
  // );

  // useEffect(() => {
  //   const dates = ['28', '29']; // Example dates

  //   setTableData((prevState) => {
  //     const updatedData = [...prevState];
  //     dates.forEach((date) => {
  //       const index = parseInt(date, 10) - 1; // Subtract 1 because indices are zero-based
  //       if (index >= 0 && index < updatedData.length) {
  //         updatedData[index].isChecked = true;
  //       }
  //     });
  //     return updatedData;
  //   });
  // }, []); // The empty dependency array ensures this effect runs only once on component mount

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

  useEffect(() => {
    setMonthset(month);
    // const calculatedValuesAllTime = calculatedValues.map((value) => value.calculatedValue);
    // const calculatedValuesminus = EmployeeSearch.map((value) => parseFloat(value.minus));

    const calculatedValuesAllTime = calculatedValues.map((value) => parseFloat(value.calculatedValue));
    const calculatedValuesOtTime = calculatedValues.map((value) => parseFloat(value.calculatedOT));
    const calculatedValuesaddSalary = addSalary.map((value) => parseFloat(value.SpSalary));

    const calculatedValuesminus = calculatedValues.map((value) => parseFloat(value.minus));

    // const testre = EmployeeSearch.map((value) => parseFloat(value.minus));

    const sumAlltime = calculatedValuesAllTime.reduce((total, currentValue) => total + currentValue, 0);
    const sumOtTime = calculatedValuesOtTime.reduce((total, currentValue) => total + currentValue, 0);
    const sumSalary = calculatedValuesaddSalary.reduce((total, currentValue) => total + currentValue, 0);
    // const summinus = calculatedValuesminus.reduce((total, currentValue) => total + currentValue, 0);

    const Sumall = sumAlltime + sumSalary + sumOtTime;
    const Minus = parseFloat((Sumall * (MinusSearch / 100)).toFixed(2));

    console.log('testRe1', Sumall);
    console.log('testRe2', Minus);
    console.log('testRe3', MinusSearch);


    // console.log('all', calculatedValues);

    setMinusSS(Minus);
    setResult(Sumall - Minus);
    // countWork
    console.log('testcal ++', monthset);

  }, [month, calculatedValues, addSalary]);
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
      dataset.forEach((data) => {
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


      doc.save('example.pdf');
    } catch (error) {
      console.error('Error generating PDF:', error);
    }
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
                              <label role="searchEmployeeId">รหัสพนักงาน</label>
                              <input type="text" class="form-control" id="searchEmployeeId" placeholder="รหัสพนักงาน" value={searchEmployeeId} onChange={(e) => setSearchEmployeeId(e.target.value)} />
                            </div>
                          </div>
                          <div class="col-md-3">
                            <div class="form-group">
                              <label role="searchname">ชื่อพนักงาน</label>
                              <input type="text" class="form-control" id="searchname" placeholder="ชื่อพนักงาน" value={searchEmployeeName} onChange={(e) => setSearchEmployeeName(e.target.value)} />
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
                      <table class="table table-bordered ">
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
                            <td>วันทำงาน</td>
                            {tableData.map((data, index) => (
                              <td key={index}>
                                <input
                                  type="checkbox"
                                  className="form-control custom-checkbox"
                                  checked={data.isChecked}
                                  disabled={true}
                                  onChange={() => handleCheckboxChange(index)}
                                  style={{ color: 'black' }}
                                />
                                {data.workplaceId}

                              </td>

                            ))}

                          </tr>
                          <tr>
                            <td>ช.ม. ทำงาน</td>
                            {tableData.map((data, index) => (
                              <td key={index}>
                                <input
                                  type="text"
                                  class="form-control"
                                  value={data.allTime}
                                  onChange={(event) => handleTextChange(index, event)}
                                />
                              </td>
                            ))}
                          </tr>
                          <tr>
                            <td>ช.ม. โอที</td>
                            {tableData.map((data, index) => (
                              <td key={index}>
                                <input
                                  type="text"
                                  class="form-control"
                                  value={data.otTime}
                                  onChange={(event) => handleTextChange(index, event)}
                                />
                              </td>
                            ))}
                          </tr>
                        </tbody>
                      </table>
                    </div>
                    {/* <label>
                      <input
                        type="checkbox"
                        name="checked28"
                        checked={checked28}
                        onChange={handleCheckboxChange}
                      />
                      Checked 28
                    </label>
                    <br />
                    <label>
                      <input
                        type="checkbox"
                        name="checked31"
                        checked={checked31}
                        onChange={handleCheckboxChange}
                      />
                      Checked 31
                    </label> */}
                    {/* Add more checkboxes as needed */}

                    {/* <ul>
                      {woekplace.map((date, index) => (
                        <li key={index}><input type="date" value={date}/></li>
                      ))}
                    </ul> */}

                  </section>
                </div>
                <div class="col-md-3">
                  {/* <div style={{
                    position: "absolute",
                    bottom: "2rem",
                    right: "0px"
                  }}>
                    <TestPDF />
                  </div> */}
                  <div>
                    <button id="generatePdfButton" onClick={generatePDF}>Generate PDF</button>
                    {/* <TestPDF /> */}
                  </div>
                </div>
              </div>
            </form>
            {/* </form> */}
            <div class="row">
              <div class="col-md-9">
                <section class="Frame">
                  <div class="container" style={{ overflowX: 'scroll' }}>
                    <table class="table table-bordered ">
                      <thead>
                        <tr>
                          <th>เงินค่าจ้าง</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td>
                            รวมวันทำงาน
                          </td>
                          {calculatedValues.map((value, index) => (
                            <td>
                              {value.workplaceId}, {value.calculatedValue} ({value.allTime})
                            </td>
                          ))}
                        </tr>
                        <tr>
                          <td>
                            รวมวันทำงาน OT
                          </td>
                          {calculatedValues.map((value, index) => (
                            <td>
                              {value.calculatedOT} ({value.otTime})
                            </td>
                          ))}
                        </tr>
                        <tr>
                          <th>เงินเพิ่มพิเศษ</th>
                        </tr>
                        {addSalary.map((value, index) => (
                          <tr key={index}>
                            <td>{value.name}</td>
                            <td>{value.SpSalary} บาท</td>
                          </tr>
                        ))}
                        <tr>
                          <td>วันหยุดนักขัตฤกษ์</td>
                        </tr>
                        <tr>
                          <td>จ่ายป่วย</td>
                        </tr>
                        <tr>
                          <td>ชดเชยพักร้อน</td>
                        </tr>
                        <tr>
                          <td>หักประกันสังคม</td>
                          <td>{MinusSS} ({MinusSearch} %)</td>

                        </tr>
                        <tr>
                          <td>เงินสุทธิ</td>
                          <td>{result}</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </section>
              </div>
            </div>
          </section>

          {/* <!-- /.content --> */}
        </div >
      </div >


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
  const daysOfWeek = ['7', '1', '2', '3', '4', '5', '6'];
  return daysOfWeek[dayOfWeek];
  // console.log('dayOfWeek',dayOfWeek);
};
// console.log('',getDateDayOfWeek);


export default Worktimesheet