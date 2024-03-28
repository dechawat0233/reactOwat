import endpoint from '../../config';

import axios from 'axios';
import React, { useEffect, useState } from 'react';

import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

import EmployeesSelected from './EmployeesSelected';
import Calendar from 'react-calendar';
import '../editwindowcss.css';
import EmployeeWorkDay from './componentsetting/EmployeeWorkDay';
import './salarysummary/styleCom.css';

function Salaryresult() {
  document.title = 'สรุปเงินเดือน';

  const tableStyle = {
    borderCollapse: 'collapse',
    width: '100%',
  };

  const cellStyle = {
    border: '1px solid black',
    padding: '8px',
    textAlign: 'center',
  };

  const headerCellStyle = {
    ...cellStyle,
    backgroundColor: '#f2f2f2',
  };

  //variable
  // const [socialSecurity, setSocialSecurity] = useState(0); // ประกันสังคม
  // const [tax, setTax] = useState(0); //ภาษี 

  const [bankCustom, setBankCustom] = useState(0); //ค่าทำเนียม
  const [sumDeduct, setSumDeduct] = useState(0); //sum deduct immedate
  const [sumDeductInstallment, setSumDeductInstallment] = useState(0); //sum deduct installment

  const [employeeId, setEmployeeId] = useState(''); //รหัสหน่วยงาน
  const [name, setName] = useState(''); //ชื่อหน่วยงาน
  const [lastName, setLastname] = useState(''); //ชื่อหน่วยงาน

  const [searchWorkplaceId, setSearchWorkplaceId] = useState(''); //รหัสหน่วยงาน
  const [searchWorkplaceName, setSearchWorkplaceName] = useState(''); //ชื่อหน่วยงาน

  const [searchResult, setSearchResult] = useState([]);
  const [searchResultLower, setSearchResultLower] = useState([]);

  const [totalCount, setTotalCount] = useState(0);
  const [overallAllTimesSum, setOverallAllTimesSum] = useState(0);
  const [overallOtTimesSum, setOverallOtTimesSum] = useState(0);
  const [overWorkRateSum, setOverWorkRateSum] = useState(0);
  const [overWorkRateOTSum, setOverWorkRateOTSum] = useState(0);
  const [overAddSalaryDaySum, setOverAddSalaryDaySum] = useState(0);
  const [sumSpSalaryResult, setSumSpSalaryResult] = useState(0);

  const [anySpSalary, setAnySpSalary] = useState(0);
  const [anyMinus, setAnyMinus] = useState(0);

  const [employeeListResult, setEmployeeListResult] = useState([]);
  const [newWorkplace, setNewWorkplace] = useState(true);
  const [timerecordAllList, setTimerecordAllList] = useState([]);
  const [calsalaryAlllist, setSalsalaryAlllist] = useState([]);


  const [employeeList, setEmployeeList] = useState([]);
  const [workplaceList, setWorkplaceList] = useState([]);
  const [concludeList, setConcludeList] = useState([]);
  const [calsalarylist, setCalsalarylist] = useState([]);

  const [searchEmployeeId, setSearchEmployeeId] = useState('');
  const [searchEmployeeName, setSearchEmployeeName] = useState('');
  const [staffId, setStaffId] = useState(''); //รหัสหน่วยงาน
  const [staffName, setStaffName] = useState(''); //รหัสหน่วยงาน
  const [staffLastname, setStaffLastname] = useState(''); //รหัสหน่วยงาน
  const [staffFullName, setStaffFullName] = useState(''); //รหัสหน่วยงาน

  const [alldaywork, setAlldaywork] = useState([]);
  const [alldayworkLower, setAlldayworkLower] = useState([]);
  //   const [month, setMonth] = useState('');
  //   const [year, setYear] = useState('');
  const [month, setMonth] = useState('01');
  const [year, setYear] = useState(new Date().getFullYear());
  const [employee, setEmployee] = useState({});

  const thaiMonthNames = [
    'มกราคม', 'กุมภาพันธ์', 'มีนาคม', 'เมษายน', 'พฤษภาคม', 'มิถุนายน',
    'กรกฎาคม', 'สิงหาคม', 'กันยายน', 'ตุลาคม', 'พฤศจิกายน', 'ธันวาคม'
  ];
  const getThaiMonthName = (monthNumber) => {
    return thaiMonthNames[monthNumber - 1];
  };

  useEffect(() => {
    setMonth("01");

    const currentYear = new Date().getFullYear();
    setYear(currentYear);
  }, []); // Run this effect only once on component mount
  const EndYear = 2010;
  const currentYear = new Date().getFullYear(); // 2024
  const years = Array.from({ length: currentYear - EndYear + 1 }, (_, index) => EndYear + index).reverse();

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


  const handleStaffIdChange = (e) => {
    const selectedStaffId = e.target.value;
    setStaffId(selectedStaffId);
    setSearchEmployeeId(selectedStaffId);
    // Find the corresponding employee and set the staffName
    const selectedEmployee = employeeList.find(employee => employee.employeeId === selectedStaffId);
    if (selectedEmployee) {
      // setStaffName(selectedEmployee.name);
      // setStaffLastname(selectedEmployee.lastName);
      setStaffFullName(selectedEmployee.name + ' ' + selectedEmployee.lastName);

    } else {
      setStaffName('');
      setStaffFullName('');
      setSearchEmployeeName('');
    }
  };

  const handleStaffNameChange = (e) => {
    const selectedStaffName = e.target.value;

    // Find the corresponding employee and set the staffId
    const selectedEmployee = employeeList.find(employee => (employee.name + " " + employee.lastName) === selectedStaffName);
    const selectedEmployeeFName = employeeList.find(employee => employee.name === selectedStaffName);

    if (selectedEmployee) {
      setStaffId(selectedEmployee.employeeId);
      setSearchEmployeeId(selectedEmployee.employeeId);
      setStaffFullName(selectedEmployee.employeeName);
    } else {
      setStaffId('');
      // searchEmployeeId('');
    }

    // setStaffName(selectedStaffName);
    setStaffFullName(selectedEmployeeFName);
    setSearchEmployeeName(selectedEmployeeFName);
  };

  // useEffect(() => {
  //   // Fetch data from the API when the component mounts
  //   fetch(endpoint + '/workplace/list')
  //     .then(response => response.json())
  //     .then(data => {
  //       // Update the state with the fetched data
  //       setWorkplaceList(data);
  //     })
  //     .catch(error => {
  //       console.error('Error fetching data:', error);
  //     });
  // }, []);

  useEffect(() => {
    // Fetch data from the API when the component mounts
    fetch(endpoint + '/conclude/list')
      .then(response => response.json())
      .then(data => {
        // Update the state with the fetched data
        setConcludeList(data);
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
  }, []);
  console.log('concludeList', concludeList);


  // useEffect(() => {
  //   // Fetch data from the API when the component mounts
  //   fetch(endpoint + '/accounting/calsalarylist')
  //     .then(response => response.json())
  //     .then(data => {
  //       // Update the state with the fetched data
  //       setCalsalarylist(data);
  //       // alert(data[0].workplaceName);
  //     })
  //     .catch(error => {
  //       console.error('Error fetching data:', error);
  //     });
  // }, []);
  const [addSalaryList, setAddSalaryList] = useState([]);
  const [deductSalaryList, setDeductSalaryList] = useState([]);

  useEffect(() => {
    const fetchData = () => {
      const dataTest = {
        employeeId: staffId,
        year: year,
        month: month,
      };

      axios.post(endpoint + '/accounting/calsalarylist', dataTest)
        .then(response => {
          const responseData = response.data;
          if (response) {
            setAddSalaryList(response.data[0].addSalary);
            setDeductSalaryList(response.data[0].deductSalary);
            // alert(JSON.stringify(response.data[0].addSalary,null,2));
          }
          console.log('responseData', responseData);
          const filteredData = responseData.filter(item => item.employeeId === staffId);
          console.log('filteredData', filteredData);
          setCalsalarylist(filteredData);

          // Now you can use the data as needed
          // For example, you can iterate over the array of data
          // responseData.forEach(item => {
          //   console.log(item);
          //   // Your logic with each item
          // });
        })
        .catch(error => {
          console.error('Error:', error);
        });
    };

    // Call fetchData when year or month changes
    fetchData();
  }, [year, month, staffId]);

  console.log('calsalarylist', calsalarylist);

  const countDay = calsalarylist ? calsalarylist[0]?.accountingRecord.countDay : null;
  const amountDay = calsalarylist ? calsalarylist[0]?.accountingRecord.amountDay : null;
  const amountOt = calsalarylist ? calsalarylist[0]?.accountingRecord.amountOt : null;
  const tax = calsalarylist ? calsalarylist[0]?.accountingRecord.tax : null;
  const amountPosition = calsalarylist ? calsalarylist[0]?.accountingRecord.amountPosition : null;
  const amountHardWorking = calsalarylist ? calsalarylist[0]?.accountingRecord.amountHardWorking : null;
  const amountSpecial = calsalarylist ? calsalarylist[0]?.accountingRecord.amountSpecial : null;
  const advancePayment = calsalarylist ? calsalarylist[0]?.accountingRecord.advancePayment : null;
  const amountHoliday = calsalarylist ? calsalarylist[0]?.accountingRecord.amountHoliday : null;
  const addAmountBeforeTax = calsalarylist ? calsalarylist[0]?.accountingRecord.addAmountBeforeTax : null;
  const deductBeforeTax = calsalarylist ? calsalarylist[0]?.accountingRecord.deductBeforeTax : null;
  const socialSecurity = calsalarylist ? calsalarylist[0]?.accountingRecord.socialSecurity : null;
  const addAmountAfterTax = calsalarylist ? calsalarylist[0]?.accountingRecord.addAmountAfterTax : null;
  const deductAfterTax = calsalarylist ? calsalarylist[0]?.accountingRecord.deductAfterTax : null;
  const bank = calsalarylist ? calsalarylist[0]?.accountingRecord.bank : null;
  const total = calsalarylist ? calsalarylist[0]?.accountingRecord.total : null;
  const sumSalaryForTax = calsalarylist ? calsalarylist[0]?.accountingRecord.sumSalaryForTax : null;
  console.log('amountDay', amountDay);


  // console.error('workplaceList', workplaceList);

  console.log(employeeList);


  const [modalIsOpen, setModalIsOpen] = useState(false);

  const openModal = () => {
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
  };

  const handleAnySpSalaryChange = (event) => {
    const newValue = parseFloat(event.target.value) || 0;
    setAnySpSalary(newValue);
  };

  const handleAnyMinusChange = (event) => {
    const newValue = parseFloat(event.target.value) || 0;
    setAnyMinus(newValue);
  };


  const [workTimeDayPerson, setWorkTimeDayPerson] = useState({
    // startDay: '',
    // endDay: '',
    allTimesPerson: [{ CodeSalary: '', positionWork: '', countPerson: '' }],
  });

  const [workTimeDayPersonList, setWorkTimeDayPersonList] = useState([]);

  // const daysOfWeek = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
  // const shiftWork = ['Shift 1', 'Shift 2', 'Shift 3'];
  const positionWork = ['หัวหน้า', 'ทำความสะอาด', 'กวาดพื้น'];


  const handleInputPersonChange = (e) => {
    const { name, value } = e.target;

    setWorkTimeDayPerson((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleInputChangePerson = (e, index) => {
    const { name, value } = e.target;

    setWorkTimeDayPerson((prevData) => {
      const updatedAllTimesPerson = [...prevData.allTimesPerson];
      updatedAllTimesPerson[index] = {
        ...updatedAllTimesPerson[index],
        [name]: value,
      };
      return {
        ...prevData,
        allTimesPerson: updatedAllTimesPerson,
      };
    });

  };

  const handleAddTimePerson = () => {
    setWorkTimeDayPerson((prevData) => ({
      ...prevData,
      allTimesPerson: [...prevData.allTimesPerson, { CodeSalary: '', positionWork: '', countPerson: '' }],
    }));
  };


  const handleRemoveTimePerson = (indexToRemove) => {
    setWorkTimeDayPerson((prevData) => ({
      ...prevData,
      allTimesPerson: prevData.allTimesPerson.filter((_, index) => index !== indexToRemove),
    }));
  };


  const handleAddTimePersonList = () => {
    setWorkTimeDayPersonList((prevList) => [...prevList, workTimeDayPerson]);
    //xxss
    //clean data
    setWorkTimeDayPerson({
      // startDay: '',
      // endDay: '',
      allTimesPerson: [{ CodeSalary: '', positionWork: '', countPerson: '' }],
    });
  };

  const handleRemoveTimePersonList = (index) => {
    setWorkTimeDayPersonList((prevList) => {
      const updatedList = [...prevList];
      updatedList.splice(index, 1);
      return updatedList;
    });
  };

  console.log(employeeList);

  // 
  // useEffect(() => {
  //   // Fetch data from the API when the component mounts
  //   fetch(endpoint + '/accounting/calsalarylist')
  //     .then(response => response.json())
  //     .then(data => {
  //       // Update the state with the fetched data
  //       setTimerecordAllList(data);
  //       // alert(data[0].workplaceName);
  //     })
  //     .catch(error => {
  //       console.error('Error fetching data:', error);
  //     });
  // }, []);

  const CheckMonth = parseInt(month, 10);
  const CheckYear = year;
  // const CheckMonth = 5;
  // const CheckYear = 2023;
  console.log('CheckMonth', CheckMonth);
  console.log('CheckYear', CheckYear);

  let countdownMonth;
  let countdownYear;

  if (CheckMonth === 1) {
    countdownMonth = 12;
    countdownYear = CheckYear - 1;
  } else {
    countdownMonth = CheckMonth - 1;
    countdownYear = CheckYear;

  }
  const base = 543;
  function getDaysInMonth(month, year) {
    // Months are 0-based, so we subtract 1 from the provided month
    const lastDayOfMonth = new Date(year, month, 0).getDate();
    return lastDayOfMonth;
  }

  const daysInMonth = getDaysInMonth(countdownMonth, CheckYear);
  const startDay = 21;
  // Create an array from startDay to daysInMonth
  const firstPart = Array.from({ length: daysInMonth - startDay + 1 }, (_, index) => (startDay + index) + '/' + countdownMonth + '/' + (parseInt(countdownYear, 10) + parseInt(base, 10)));

  // Create an array from 1 to 20
  const secondPart = Array.from({ length: 20 }, (_, index) => index + 1 + '/' + CheckMonth + '/' + (parseInt(CheckYear, 10) + parseInt(base, 10)));

  // Concatenate the two arrays
  const resultArray = [...firstPart, ...secondPart];

  const firstPart2 = Array.from({ length: daysInMonth - startDay + 1 }, (_, index) => (startDay + index));

  // Create an array from 1 to 20
  const secondPart2 = Array.from({ length: 20 }, (_, index) => index + 1);

  // Concatenate the two arrays
  const resultArray2 = [...firstPart2, ...secondPart2];

  console.log('resultArrayresultArray', resultArray);
  console.log('resultArrayresultArray2', resultArray2);


  function getDaysInMonth2(month, year) {
    // Months are 0-based, so we subtract 1 from the provided month
    return new Date(year, month, 0).getDate();
  }
  // Function to create an array of days for a given month and year
  function createDaysArray(month, year, endDay, filter) {
    const daysArray = {};

    for (let day = 1; day <= endDay; day++) {
      const date = new Date(year, month - 1, day);
      const weekday = date.toLocaleDateString('en-US', { weekday: 'short' });

      if (!daysArray[weekday]) {
        daysArray[weekday] = [];
      }

      if (filter(day)) {
        daysArray[weekday].push(day);
      }
    }

    return daysArray;
  }

  const daysInMonth2 = getDaysInMonth(CheckMonth, CheckYear);
  const daysInCountdownMonth = getDaysInMonth2(countdownMonth, countdownYear);

  // const array1 = createDaysArray(CheckMonth, CheckYear, daysInMonth2, (day) => day <= 20);
  // const array2 = createDaysArray(countdownMonth, CheckYear, daysInCountdownMonth, (day) => day > 21);
  const array1 = createDaysArray(CheckMonth, CheckYear, daysInMonth2, (day) => day <= 20);
  const array2 = createDaysArray(countdownMonth, countdownYear, daysInCountdownMonth, (day) => day >= 21);


  console.log('Array 1 (March):', array1);
  console.log('Array 2 (Countdown):', array2);

  const commonNumbers = new Set([...array2.Mon, ...array1.Mon]);

  // const commonNumbers = [...new Set([...array1.Mon, ...array2.Mon])];
  console.log('commonNumbers', commonNumbers);


  let monthLower;
  let timerecordIdLower;
  // get value from form search
  if (month == "01") {
    monthLower = "12";
    timerecordIdLower = year - 1;
  } else {
    const monthNumber = parseInt(month, 10);
    monthLower = (monthNumber - 1).toString().padStart(2, '0');  // Convert back to string, pad with leading zero if needed
    // monthLower = month - 1;
    timerecordIdLower = year
  }
  monthLower
  console.log('monthLower', monthLower);
  console.log('month', month);
  console.log('year', year);
  console.log('timerecordIdLower', timerecordIdLower);

  const thaiMonthName = getThaiMonthName(parseInt(CheckMonth, 10));
  const thaiMonthLowerName = getThaiMonthName(parseInt(countdownMonth, 10));

  useEffect(() => {
    setMonth("01");

    const currentYear = new Date().getFullYear();
    setYear(currentYear);

    const getdata = async () => {

      const savedEmployeeId = await localStorage.getItem('employeeId');
      const savedEmployeeName = await localStorage.getItem('employeeName') || '';
      const savedMonth = await localStorage.getItem('month');
      const savedYear = await localStorage.getItem('year');
      if (savedEmployeeId) {
        await setSearchEmployeeId(savedEmployeeId);
        await setSearchEmployeeName(savedEmployeeName);
        await setStaffId(savedEmployeeId);
        // setStaffFullName(savedEmployeeName);

        const event = await new Event('submit'); // Creating a synthetic event object
        await handleSearch(event); // Call handleSearch with the event
        await localStorage.removeItem('employeeId');
      }
      if (savedMonth) {
        await setMonth(savedMonth);
        await localStorage.removeItem('month');
      }
      if (savedYear) {
        await setYear(savedYear);
        await localStorage.removeItem('year');
      }
    }

    getdata();

  }, []); // Run this effect only once on component mount

  async function handleSearch(event) {
    event.preventDefault();

    const data = await {
      employeeId: searchEmployeeId,
      // name: searchEmployeeName,
      // employeeName: searchEmployeeName,
      month: month,
      timerecordId: year,

    };
    const dataLower = await {
      employeeId: searchEmployeeId,
      // name: searchEmployeeName,
      // employeeName: searchEmployeeName,
      month: monthLower,
      timerecordId: timerecordIdLower,
    };
    // alert(data.name);
    try {
      //get employee data
      await setEmployee(findEmployeeById(searchEmployeeId));

      // const response = await axios.post(endpoint + '/timerecord/listemp', data);
      // const responseLower = await axios.post(endpoint + '/timerecord/listemp', dataLower);

      const filteredEntries = concludeList.filter(entry =>
        entry.employeeId === searchEmployeeId &&
        entry.month === month
        &&
        entry.year == year
      );

      setSearchResult(filteredEntries);
      console.log('filteredEntries', filteredEntries);

      const concludeRecordArray = filteredEntries.map(entry => entry.concludeRecord);
      console.log('concludeRecordArray', concludeRecordArray);
      setAlldaywork(concludeRecordArray);

      const workplaceIdCounts = {};

      // concludeRecordArray.forEach(record => {
      //   if (record.workplaceId) {
      //     const workplaceId = record.workplaceId;
      //     workplaceIdCounts[workplaceId] = (workplaceIdCounts[workplaceId] || 0) + 1;
      //   }
      // });

      concludeRecordArray.forEach(recordArray => {
        recordArray.forEach(record => {
          if (record.workplaceId) {
            const workplaceId = record.workplaceId;
            workplaceIdCounts[workplaceId] = (workplaceIdCounts[workplaceId] || 0) + 1;
          }
        });
      });

      console.log('workplaceIdCounts', workplaceIdCounts);

      const totalCount = Object.values(workplaceIdCounts).reduce((sum, count) => sum + count, 0);
      setTotalCount(totalCount);

      console.log('Total Count:', totalCount);

      const filteredEntriesCalsalary = calsalarylist.filter(entry =>
        entry.employeeId === searchEmployeeId &&
        entry.month === month
        &&
        entry.year == year
      );
      console.log('searchResult', searchResult);

      console.log('filteredEntriesCalsalary', filteredEntriesCalsalary);

      const filteredEntriesEmp = employeeList.filter(entry =>
        entry.employeeId === searchEmployeeId
      );

      console.log('filteredEntriesEmp', filteredEntriesEmp);

      // Assuming filteredEntriesEmp is an array with one element
      if (filteredEntriesEmp.length > 0) {
        const addSalaryMonthly = filteredEntriesEmp[0].addSalary.filter(salary => salary.roundOfSalary === "monthly");

        console.log('addSalaryMonthly', addSalaryMonthly);

        // Now addSalaryMonthly contains only the items with roundOfSalary === "monthly"
        // You can access SpSalary values from addSalaryMonthly array
      }

      if (filteredEntriesEmp.length > 0) {
        const addSalaryMonthly = filteredEntriesEmp[0].addSalary.filter(salary => salary.roundOfSalary === "monthly");

        //get deduct data with immedate
        const deductSalary = filteredEntriesEmp[0].deductSalary.filter(deduct => deduct.payType === "immedate");
        let sum = 0;
        //loop forget socialSecurity and tax
        deductSalary.map((item, index) => {

          //check 0001 is social security
          if (item.id == "0001") {
            // alert(item.amount);
            if (item.amount.includes("%")) {
              let tmp = item.amount.replace(/%/g, "");
              tmp = tmp / 100;
              setSocialSecurity(tmp);
            } else {
              setSocialSecurity(item.amount);
            }
          }
          //check 0002 is tax
          else if (item.id == "0002") {
            // alert(item.amount);
            if (item.amount.includes("%")) {
              let tmp = item.amount.replace(/%/g, "");
              tmp = tmp / 100;
              setTax(tmp);
            } else {
              setTax(item.amount);
            }
          }
          //check 0003 is bank custom
          else if (item.id == "0003") {
            // alert(item.amount);\
            // setBankCustom(item.amount);
            setBankCustom(0);

          }
          else {
            sum = sum + parseFloat(item.amount);
          }
        })
        setSumDeduct(sum);
        // alert(deductSalary.length);

        //get deduct data with installment
        const deductSalaryInstallment = filteredEntriesEmp[0].deductSalary.filter(deduct => deduct.payType === "installment");
        let sumInstallment = 0;
        //loop forget socialSecurity and tax
        deductSalaryInstallment.map((item, index) => {
          let amount = parseFloat(item.amount);
          let installment = parseFloat(item.installment);
          sumInstallment = sumInstallment + parseFloat((amount / installment).toFixed(2));
        });
        setSumDeductInstallment(sumInstallment);

        console.log('addSalaryMonthly', addSalaryMonthly);

        // Now addSalaryMonthly contains only the items with roundOfSalary === "monthly"

        // Summing SpSalary values using reduce
        const sumSpSalary = addSalaryMonthly.reduce((sum, salary) => sum + parseFloat(salary.SpSalary || 0), 0);

        console.log('sumSpSalary', sumSpSalary);

        setSumSpSalaryResult(sumSpSalary);
        console.log('setSumSpSalaryResult', sumSpSalaryResult);

      }

      const entriesData = filteredEntries.map(entry =>
        entry.concludeRecord
          .filter(record => record.date <= 20)
          .map(record => {
            const matchedWorkplace = workplaceList.find(workplace => workplace.workplaceId === record.workplaceId);
            return {
              workplaceId: record.workplaceId,
              dates: record.date,
              workOfHour: matchedWorkplace ? matchedWorkplace.workOfHour : '', // Default value if not found
              workRate: matchedWorkplace ? matchedWorkplace.workRate : '', // Default value if not found
              workRateOT: matchedWorkplace ? matchedWorkplace.workRateOT : '',
              allTimes: record.allTime,
              otTimes: record.otTime,
              startTime: record.startTime,
              endTime: record.endTime,
              selectotTime: record.selectotTime,
              selectotTimeOut: record.selectotTimeOut,
            };
          })
      );


      // const concludeRecordArray = filteredEntries[0].concludeRecord;
      // const concludeRecordArray = filteredEntries.map(entry => entry.concludeRecord);
      // console.log('searchResult123', searchResult);

      // setAlldaywork(concludeRecordArray);
      // console.log('concludeRecordArray', concludeRecordArray);

      // const sumCounts = concludeRecordArray.reduce((accumulator, record) => {
      //   const allTimesValue = parseFloat(record.allTimes) || 0;
      //   const workRateValue = parseFloat(record.workRate) || 0;
      //   const otTimesValue = parseFloat(record.otTimes) || 0;

      //   // Extracting values inside parentheses and adding them to the sum
      //   const workRateOTMatch = record.workRateOT.match(/\((.*?)\)/);
      //   const workRateOTValue = workRateOTMatch ? parseFloat(workRateOTMatch[1]) || 0 : 0;

      //   const addSalaryDayValue = parseFloat(record.addSalaryDay) || 0;

      //   // Summing up the values
      //   accumulator.allTimes += allTimesValue;
      //   accumulator.workRate += workRateValue;
      //   accumulator.otTimes += otTimesValue;
      //   accumulator.workRateOT += workRateOTValue;
      //   accumulator.addSalaryDay += addSalaryDayValue;

      //   return accumulator;
      // }, {
      //   allTimes: 0,
      //   workRate: 0,
      //   otTimes: 0,
      //   workRateOT: 0,
      //   addSalaryDay: 0,
      // });

      // console.log('sumCounts', sumCounts);

      // Grouping records by workplaceId

      // const workplaceIdCounts = {};

      // concludeRecordArray.forEach(record => {
      //   if (record.workplaceId) {
      //     const workplaceId = record.workplaceId;
      //     workplaceIdCounts[workplaceId] = (workplaceIdCounts[workplaceId] || 0) + 1;
      //   }
      // });

      // console.log('workplaceIdCounts', workplaceIdCounts);

      // const totalCount = Object.values(workplaceIdCounts).reduce((sum, count) => sum + count, 0);
      // setTotalCount(totalCount);

      // console.log('Total Count:', totalCount);

      // const groupedRecords = concludeRecordArray.reduce((groups, record) => {
      //   const workplaceId = record.workplaceId || 'default'; // Use a default key if workplaceId is not available

      //   if (!groups[workplaceId]) {
      //     groups[workplaceId] = [];
      //   }

      //   groups[workplaceId].push(record);
      //   return groups;
      // }, {});

      // Calculating sum for each group

      // const sumCountsByWorkplace = {};

      // Object.keys(groupedRecords).forEach(workplaceId => {

      //   sumCountsByWorkplace[workplaceId] = groupedRecords[workplaceId].reduce((accumulator, record) => {
      //     const allTimesValue = parseFloat(record.allTimes) || 0;
      //     const workRateValue = parseFloat(record.workRate) || 0;
      //     const otTimesValue = parseFloat(record.otTimes) || 0;

      //     // const workRateOTMatch = record.workRateOT.match(/\((.*?)\)/);
      //     // const workRateOTValue = workRateOTMatch ? parseFloat(workRateOTMatch[1]) || 0 : 0;

      //     const workRateOTMatch = record.workRateOT.match(/(\d+\.?\d*)/);
      //     const workRateOTValue = workRateOTMatch ? parseFloat(workRateOTMatch[0]) || 0 : 0;


      //     const addSalaryDayValue = parseFloat(record.addSalaryDay) || 0;

      //     accumulator.allTimes += allTimesValue;
      //     accumulator.workRate += workRateValue;
      //     // accumulator.workRate = workRateValue;
      //     accumulator.otTimes += otTimesValue;
      //     // accumulator.workRateOT += workRateOTValue;
      //     accumulator.workRateOT += workRateOTValue;
      //     accumulator.addSalaryDay += addSalaryDayValue;
      //     accumulator.count += 1;

      //     return accumulator;
      //   }, {
      //     allTimes: 0,
      //     workRate: 0,
      //     otTimes: 0,
      //     workRateOT: 0,
      //     addSalaryDay: 0,
      //   });
      // });

      // console.log('sumCountsByWorkplace', sumCountsByWorkplace);

      // const otTimesSumByWorkplace = {};

      // Object.keys(sumCountsByWorkplace).forEach(workplaceId => {
      //   const workplaceData = sumCountsByWorkplace[workplaceId];
      //   const allTimesSum = workplaceData.otTimes;

      //   otTimesSumByWorkplace[workplaceId] = allTimesSum;
      // });

      // console.log('otTimesSumByWorkplace:', otTimesSumByWorkplace);

      // const overallAllTimesSum = Object.values(sumCountsByWorkplace).reduce((sum, workplaceData) => {
      //   return sum + workplaceData.allTimes;
      // }, 0);

      // console.log('overallAllTimesSum:', overallAllTimesSum);
      // setOverallAllTimesSum(overallAllTimesSum);
      // alert('overallAllTimesSum');

      const overallOtTimesSum = Object.values(sumCountsByWorkplace).reduce((sum, workplaceData) => {
        return sum + workplaceData.otTimes;
      }, 0);

      console.log('overallOtTimesSum:', overallOtTimesSum);
      setOverallOtTimesSum(overallOtTimesSum);

      const overWorkRateSum = Object.values(sumCountsByWorkplace).reduce((sum, workplaceData) => {
        return sum + workplaceData.workRate;
      }, 0);

      console.log('overWorkRateSum:', overWorkRateSum);
      setOverWorkRateSum(overWorkRateSum);

      const overWorkRateOTSum = Object.values(sumCountsByWorkplace).reduce((sum, workplaceData) => {
        return sum + workplaceData.workRateOT;
      }, 0);

      console.log('overWorkRateOTSum:', overWorkRateOTSum);
      setOverWorkRateOTSum(overWorkRateOTSum);

      const overAddSalaryDaySum = Object.values(sumCountsByWorkplace).reduce((sum, workplaceData) => {
        return sum + workplaceData.addSalaryDay;
      }, 0);

      console.log('overAddSalaryDaySum:', overAddSalaryDaySum);
      setOverAddSalaryDaySum(overAddSalaryDaySum);

      setAlldaywork(sumCounts);

      if (response.data.employees.length < 1) {
        // window.location.reload();
        setEmployeeId('');
        setName('');
        setLastname('');
        alert('ไม่พบข้อมูล');

      } else {
        // alert(response.data.employees.length);

        //clean form 
        setSearchEmployeeId('');
        setSearchEmployeeName('');

        // Set search values
        setEmployeeId(response.data.employees[0].employeeId);
        setName(response.data.employees[0].name);
        setLastname(response.data.employees[0].lastName);

      }
    } catch (error) {
      // alert('กรุณาตรวจสอบข้อมูลในช่องค้นหา', error);

      // alert(error);

      // window.location.reload();
    }
  }
  console.log('alldaywork', alldaywork);

  // const overallAllTimesSumSum = alldaywork.reduce((sum, record) => {
  //   // Convert allTimes to number using parseFloat
  //   const allTimesValue = parseFloat(record.allTimes) || 0;
  //   return sum + allTimesValue;
  // }, 0);

  // setOverallAllTimesSum(overallAllTimesSumSum);
  // console.log('overallAllTimesSumSum:', overallAllTimesSumSum);

  const flattenedArray = alldaywork.flat();

  // Sum up allTimes property
  const overallAllTimesSum123 = flattenedArray.reduce((sum, record) => {
    const allTimesValue = parseFloat(record.allTimes) || 0;
    return sum + allTimesValue;
  }, 0);
  // setOverallAllTimesSum(overallAllTimesSum123);
  console.log('overallAllTimesSum123:', overallAllTimesSum123);

  const overallOtTimesSum123 = flattenedArray.reduce((sum, record) => {
    const otTimesValue = parseFloat(record.otTimes) || 0;
    return sum + otTimesValue;
  }, 0);
  // overallOtTimesSum(overallOtTimesSum123);
  console.log('overallOtTimesSum123:', overallOtTimesSum123);

  const groupedRecords = alldaywork.reduce((groups, record) => {
    const workplaceId = record.workplaceId || 'default'; // Use a default key if workplaceId is not available

    if (!groups[workplaceId]) {
      groups[workplaceId] = [];
    }

    groups[workplaceId].push(record);
    return groups;
  }, {});

  console.log('groupedRecords', groupedRecords);

  const sumCountsByWorkplace = {};

  Object.keys(groupedRecords).forEach(workplaceId => {

    sumCountsByWorkplace[workplaceId] = groupedRecords[workplaceId].reduce((accumulator, record) => {
      const allTimesValue = parseFloat(record.allTimes) || 0;
      const workRateValue = parseFloat(record.workRate) || 0;
      const otTimesValue = parseFloat(record.otTimes) || 0;

      // const workRateOTMatch = record.workRateOT.match(/\((.*?)\)/);
      // const workRateOTValue = workRateOTMatch ? parseFloat(workRateOTMatch[1]) || 0 : 0;

      // const workRateOTMatch = record.workRateOT.match(/(\d+\.?\d*)/);
      let workRateOTValue = 0;
      if (record.workRateOT) {
        const workRateOTMatch = record.workRateOT.match(/(\d+\.?\d*)/);
        workRateOTValue = workRateOTMatch ? parseFloat(workRateOTMatch[1]) || 0 : 0;
      }
      // const workRateOTValue = workRateOTMatch ? parseFloat(workRateOTMatch[0]) || 0 : 0;


      const addSalaryDayValue = parseFloat(record.addSalaryDay) || 0;

      accumulator.allTimes += allTimesValue;
      accumulator.workRate += workRateValue;
      // accumulator.workRate = workRateValue;
      accumulator.otTimes += otTimesValue;
      // accumulator.workRateOT += workRateOTValue;
      accumulator.workRateOT += workRateOTValue;
      accumulator.addSalaryDay += addSalaryDayValue;
      accumulator.count += 1;

      return accumulator;
    }, {
      allTimes: 0,
      workRate: 0,
      otTimes: 0,
      workRateOT: 0,
      addSalaryDay: 0,
    });
  });

  console.log('sumCountsByWorkplace', sumCountsByWorkplace);

  const findEmployeeById = (id) => {
    return employeeList.find(employee => employee.employeeId === id);
  };


  const [addSalaryDay, setAddSalaryDay] = useState(0);
  useEffect(() => {

    setAddSalaryDay(0);

    if (employee?.addSalary?.length > 0) {
      // alert(employee.addSalary.length);
      //cal addSalary day
      const ans = 0;
      for (let i = 0; i < employee.addSalary.length; i++) {
        // alert(employee.addSalary[i].roundOfSalary || '');
        let tmp = employee.addSalary[i].roundOfSalary || '';
        if (tmp == 'daily') {
          // alert(employee.addSalary[i].SpSalary || 0);
          let tmp1 = employee.addSalary[i].SpSalary || 0;
          // alert(tmp1);
          setAddSalaryDay(addSalaryDay + parseInt(employee.addSalary[i].SpSalary || 0));
        }
      }
      // setAddSalaryDay(ans);

    }

  }, [employee]);

  console.log('searchResult', searchResult);
  console.log('searchResultLower', searchResultLower);

  // console.log('alldaywork', alldaywork);
  // console.log('alldayworkLower', alldayworkLower);

  // const allwork = [...alldayworkLower, ...alldaywork];
  // console.log('allwork', allwork);

  // const result = resultArray2.map((number) => {
  //   const matchingEntry = alldaywork.find((entry) => entry.dates === (number < 10 ? '0' + number : '' + number));

  //   if (matchingEntry) {
  //     return `${number}, workplaceId: '${matchingEntry.workplaceId}', allTimes: '${matchingEntry.allTimes}', otTimes: '${matchingEntry.otTimes}'`;
  //   } else {
  //     return `${number}, workplaceId: '', allTimes: '', otTimes: ''`;
  //   }
  // });
  // console.log('result', result);


  // Convert 'dates' to numbers
  // const allworkWithNumberDates = allwork.map(item => ({
  //     ...item,
  //     dates: parseInt(item.dates, 10)
  // }));
  // const allworkFlattened = allwork.flat();

  // console.log(allworkFlattened);

  // // Filter unique entries based on 'workplaceId' and 'dates'
  // const uniqueEntries = allworkFlattened.reduce((acc, curr) => {
  //   const key = `${curr.workplaceId}-${curr.dates}`;
  //   if (!acc[key]) {
  //     acc[key] = curr;
  //   }
  //   return acc;
  // }, {});

  // // Extract values from the object to get the final array
  // const resultAllwork = Object.values(uniqueEntries);

  // console.log('resultAllwork', resultAllwork);

  // const resultArrayWithWorkplaceRecords = resultArray2.map(date => {
  //   const matchingRecord = resultAllwork.find(record => record.dates == date);
  //   return matchingRecord ? { ...matchingRecord } : '';
  // });

  // console.log('resultArrayWithWorkplaceRecords', resultArrayWithWorkplaceRecords);

  // const combinedArray = resultArray.map((date, index) => {
  //   const workplaceRecord = resultArrayWithWorkplaceRecords[index];
  //   return [workplaceRecord, date];
  // });

  // console.log('combinedArray', combinedArray);


  const callHandleStaffNameChangeWithEmployeeId = (employeeId) => {
    // Assuming you have access to the event object or you can create a synthetic event
    // You can create a synthetic event using `new Event('change')`
    const syntheticEvent = new Event('change');

    // You need to attach a `target` property to the synthetic event
    // with a `value` property containing the employeeId
    syntheticEvent.target = { value: employeeId };

    // Call handleStaffNameChange with the synthetic event
    handleStaffNameChange(syntheticEvent);
  };


  // const sumTime = resultArrayWithWorkplaceRecords.reduce((accumulator, workplaceRecord) => {
  //   const workTime = parseFloat(workplaceRecord.allTimes);
  //   return !isNaN(workTime) ? accumulator + workTime : accumulator;
  // }, 0);

  // const sumTimeOT = resultArrayWithWorkplaceRecords.reduce((accumulator, workplaceRecord) => {
  //   const workTimeOT = parseFloat(workplaceRecord.otTimes);
  //   return !isNaN(workTimeOT) ? accumulator + workTimeOT : accumulator;
  // }, 0);

  // const sumWorkRate = resultArrayWithWorkplaceRecords.reduce((accumulator, workplaceRecord) => {
  //   const workRateValue = parseFloat(workplaceRecord.workRate);
  //   return !isNaN(workRateValue) ? accumulator + workRateValue : accumulator;
  // }, 0);
  // const sumWorkRateOT = resultArrayWithWorkplaceRecords.reduce((accumulator, workplaceRecord) => {
  //   const workRateValue = parseFloat(workplaceRecord.workRate);//352
  //   const workRateOTValue = parseFloat(workplaceRecord.workRateOT);//1.5
  //   const workTimeValue = parseFloat(workplaceRecord.workOfHour);//8 work
  //   const workTimeOTValue = parseFloat(workplaceRecord.otTimes);//3 workot

  //   return !isNaN(workRateValue) ? accumulator + (((workRateValue / workTimeValue) * workRateOTValue) * workTimeOTValue) : accumulator;
  // }, 0);

  const Compensation = ({ staffId, month, year }) => {
    setStaffId(staffId);
    setMonth(month);
    setYear(year);
  };

  // const sumWorkRate1 = resultArrayWithWorkplaceRecords.reduce((accumulator, workplaceRecord) => {
  //   const workRateValue = parseFloat(workplaceRecord.workRate);
  //   if (!isNaN(workRateValue)) {
  //     accumulator.sum += workRateValue;
  //     accumulator.count++;
  //   }
  //   return accumulator;
  // }, { sum: 0, count: 0 });

  // console.log("Sum:", sumWorkRate.sum);
  // console.log("Count:", sumWorkRate.count);

  // const totalSumSalary =
  //   parseFloat(overWorkRateSum) +
  //   parseFloat(overWorkRateOTSum) +
  //   parseFloat(overAddSalaryDaySum) +
  //   parseFloat(sumSpSalaryResult) +
  //   parseFloat(anySpSalary);

  const totalSumSalary =
    parseFloat(amountDay) +
    parseFloat(amountOt) +
    parseFloat(amountPosition) +
    parseFloat(amountHardWorking) +
    parseFloat(amountHoliday) +
    parseFloat(addAmountAfterTax) +
    parseFloat(amountSpecial);

  //   overWorkRateSum + overWorkRateOTSum + overAddSalaryDaySum + sumSpSalaryResult

  const totalSumDeduct =
    // parseInt(anyMinus) +
    // parseInt(tax) +
    // (parseInt(overWorkRateSum) + parseFloat(overWorkRateOTSum) + parseFloat(overAddSalaryDaySum) + parseFloat(sumSpSalaryResult) + parseInt(anySpSalary)) * parseFloat(socialSecurity) +
    // parseInt(bankCustom) +
    // parseInt(sumDeduct) +
    // parseInt(sumDeductInstallment);
    parseFloat(deductBeforeTax) +
    parseFloat(deductAfterTax) +
    parseFloat(tax) +
    parseFloat(socialSecurity) +
    parseFloat(bank);

  const namelist = [];


  // const namelist = [
  //   { name: 'pop', empID: '1525', workplaceId: '1001-25', salary: '123' },
  //   { name: 'top', empID: '1585', workplaceId: '1021-25', salary: '498' },
  //   { name: 'cop', empID: '1585', workplaceId: '1021-25', salary: '753' },
  // ];

  const [showPopup, setShowPopup] = useState(false);
  const [color, setColor] = useState('blue');

  const sumSalary = namelist.reduce((acc, curr) => acc + parseInt(curr.salary), 0);

  const togglePopup = () => {
    setShowPopup(!showPopup);
    setColor(color === 'blue' ? 'red' : 'blue');

  };

  return (
    // <div>

    // </div>
    // <div>


    < body class="hold-transition sidebar-mini" className='editlaout' >
      <div class="wrapper">

        <div class="content-wrapper">
          {/* <!-- Content Header (Page header) --> */}
          <ol class="breadcrumb">
            <li class="breadcrumb-item"><i class="fas fa-home"></i> <a href="index.php">หน้าหลัก</a></li>
            <li class="breadcrumb-item"><a href="#"> การตั้งค่า</a></li>
            <li class="breadcrumb-item active">สรุปเงินเดือน</li>
          </ol>
          <div class="content-header">
            <div class="container-fluid">
              <div class="row mb-2">
                <h1 class="m-0"><i class="far fa-arrow-alt-circle-right"></i> สรุปเงินเดือน</h1>
              </div>
            </div>
          </div>
          <section class="content">
            <div class="container-fluid">
              <h2 class="title">สรุปเงินเดือน</h2>
              <section class="Frame">
                <div class="col-md-12">
                  <form onSubmit={handleSearch}>
                    <div class="row">
                      <div class="col-md-6">
                        <div class="form-group">
                          <label role="searchEmployeeId">รหัสพนักงาน</label>
                          {/* <input type="text" class="form-control" id="searchEmployeeId" placeholder="รหัสพนักงาน" value={searchEmployeeId} onChange={(e) => setSearchEmployeeId(e.target.value)} /> */}
                          <input
                            type="text"
                            className="form-control"
                            id="staffId"
                            placeholder="รหัสพนักงาน"
                            value={staffId == "null" ? '' : staffId}
                            onChange={handleStaffIdChange}
                            list="staffIdList"
                          />
                          <datalist id="staffIdList">
                            {employeeList.map(employee => (
                              <option key={employee.employeeId} value={employee.employeeId} />
                            ))}
                          </datalist>
                        </div>
                      </div>
                      <div class="col-md-6">
                        <div class="form-group">
                          <label role="searchname">ชื่อพนักงาน</label>
                          {/* <input type="text" class="form-control" id="searchname" placeholder="ชื่อพนักงาน" value={searchEmployeeName} onChange={(e) => setSearchEmployeeName(e.target.value)} /> */}
                          <input
                            type="text"
                            className="form-control"
                            id="staffName"
                            placeholder="ชื่อพนักงาน"
                            value={staffFullName == "null" ? '' : staffFullName}
                            onChange={handleStaffNameChange}
                            list="staffNameList"
                          />
                          <datalist id="staffNameList">
                            {employeeList.map(employee => (
                              <option key={employee.employeeId} value={employee.name + " " + employee.lastName} />
                            ))}
                          </datalist>
                        </div>
                      </div>
                    </div>


                    <div class="row">
                      <div class="col-md-6">
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
                      <div class="col-md-6">
                        <div class="form-group">
                          <label >ปี</label>
                          <select className="form-control" value={year} onChange={(e) => setYear(e.target.value)}>
                            {years.map((y) => (
                              <option key={y} value={y}>
                                {y + 543}
                              </option>
                            ))}
                          </select>
                        </div>
                      </div>
                    </div>
                    <div class="d-flex justify-content-center">
                      <button class="btn b_save" onClick={handleSearch()} ><i class="nav-icon fas fa-search"></i> &nbsp; ค้นหา</button>
                    </div>
                  </form>
                  <br />
                  {/* <div class="d-flex justify-content-center">
                    <h2 class="title">ผลลัพธ์ {searchResult.length} รายการ</h2>
                  </div> */}
                </div>
              </section>
              <h2 class="title">สรุปเงินเดือน</h2>
              <section class="Frame">
                {staffFullName ? (
                  <div class="row">
                    <div class="col-md-12">
                      ชื่อ: {staffFullName}
                    </div>
                  </div>) : (
                  <div>
                    {/* Content to show when staffFullName is not set */}
                  </div>
                )}

                {/* {month ? (
                                    <div class="row">
                                        <div class="col-md-12">
                                            ตั้งแต่วันที่ 20 {thaiMonthLowerName} - 21 {thaiMonthName} ปี {year}
                                        </div>
                                    </div>) : (
                                    <div>
                                    </div>
                                )} */}

                <div class="row">
                  <div class="col-md-12">
                    ตั้งแต่วันที่ 21 {thaiMonthLowerName} - 20 {thaiMonthName} ปี {parseInt(year, 10) + 543}
                  </div>
                </div>
                <br />
                <div class="row">
                  <div class="col-md-8">
                    <table border="1" style={tableStyle}>
                      <thead>
                        <tr>
                          <th style={headerCellStyle}>รวมวันทำงาน</th>
                          <th style={headerCellStyle}>รวมชั่วโมงทำงาน</th>
                          <th style={headerCellStyle}>รวมชั่วโมงOT</th>

                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td style={cellStyle}>{totalCount}</td>
                          <td style={cellStyle}>{(overallAllTimesSum123).toFixed(2)}</td>
                          <td style={cellStyle}>{(overallOtTimesSum123).toFixed(2)}</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
                <br />
                <div class="row">
                  <div class="col-md-12">
                    <table border="1" style={tableStyle}>
                      <thead>
                        <tr>
                          <th style={headerCellStyle}>เงินค่าจ้างปกติ</th>
                          <th style={headerCellStyle}>เงินค่าล่วงเวลา</th>
                          <th style={headerCellStyle}>เงินเพิ่ม</th>
                          {/* <th style={headerCellStyle}>เงินบวกอื่นๆ</th> */}
                          <th style={headerCellStyle}>รวมเงินได้</th>
                          <th style={headerCellStyle}>แก้ไข</th>
                        </tr>
                      </thead>
                      <tbody>
                        {/* sumSpSalary */}
                        <tr>
                          {/* <td style={cellStyle}>{(overWorkRateSum).toFixed(2)}</td>
                          <td style={cellStyle}>{(overWorkRateOTSum).toFixed(2)}</td> */}

                          <td style={cellStyle}>{isNaN(Number(amountDay)) ? 0.00 : Number(amountDay).toFixed(2)}</td>
                          <td style={cellStyle}>{isNaN(Number(amountOt)) ? 0.00 : Number(amountOt).toFixed(2)}</td>

                          {/* <td style={cellStyle}>{(overAddSalaryDaySum).toFixed(2) + (sumSpSalary).toFixed(2)}</td> */}
                          {/* <td style={cellStyle}>{(overAddSalaryDaySum + sumSpSalaryResult).toFixed(2) + `(` + (overAddSalaryDaySum).toFixed(2) + `+` + (sumSpSalaryResult).toFixed(2) + `)`}</td> */}
                          <td style={cellStyle}>
                            <p onClick={togglePopup} style={{ color: color, cursor: 'pointer' }}>
                              {isNaN(Number(addAmountBeforeTax + addAmountAfterTax)) ? 0.00 : Number(addAmountBeforeTax + addAmountAfterTax).toFixed(2)}
                            </p>
                            {showPopup && (
                              <div className="popup">
                                <h4>รายการเงินเพิ่ม</h4>
                                <ul style={{ listStyleType: 'none', padding: 0, margin: 0 }}>
                                  {addSalaryList && (
                                  addSalaryList.map((addsalary, index) => (
                                    (addsalary.name !== '' && (
                                      <li key={index} style={{ marginBottom: '10px' }}>
                                        {addsalary.name} - จำนวน: {addsalary.SpSalary} {addsalary.roundOfSalary == 'daily' && (<>* {addsalary.message} วัน</>)}
                                      </li>
                                    ))
                                  )))}

                                </ul>
                                <button onClick={togglePopup}>Close</button>
                              </div>
                            )
                            }

                            {/* {(overAddSalaryDaySum + sumSpSalaryResult).toFixed(2)} */}

                            {/* {namelist.map((employee, index) => (
                              <tr key={index}>
                                <th style={headerCellStyle}>{employee.name}</th>
                                <td style={cellStyle}>{employee.salary}</td>
                              </tr>
                            ))} */}
                            {/* {isNaN(Number(addAmountBeforeTax + addAmountAfterTax)) ? 0.00 : Number(addAmountBeforeTax + addAmountAfterTax).toFixed(2)} */}

                          </td>
                          {/* <td style={cellStyle}>
                            <input
                              type="text"
                              className="form-control"
                              id="anySpSalary"
                              placeholder="เงินบวกอื่นๆ"
                              value={anySpSalary}
                              style={{ width: '50%' }}
                              onChange={handleAnySpSalaryChange}
                            />
                          </td> */}
                          {/* <td style={cellStyle}>{(overWorkRateSum + overWorkRateOTSum + overAddSalaryDaySum + sumSpSalaryResult).toFixed(2)}</td> */}
                          <td style={cellStyle}>{(amountDay + amountOt + addAmountBeforeTax + addAmountAfterTax).toFixed(2)}</td>

                          <td style={cellStyle}>
                            <button class="btn btn-danger" style={{ width: '3rem' }}>แก้ไข</button>
                          </td>

                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
                <br />

                <div class="row">
                  <div class="col-md-12">
                    <table border="1" style={tableStyle}>
                      <thead>
                        <tr>
                          <th style={headerCellStyle}>หักภาษี</th>
                          <th style={headerCellStyle}>หักประกันสังคม</th>
                          <th style={headerCellStyle}>ธรรมเนียมธนาคาร</th>
                          <th style={headerCellStyle}>เงินหัก</th>
                          <th style={headerCellStyle}>รวมเงินหัก</th>
                          <th style={headerCellStyle}>แก้ไข</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td style={cellStyle}>{isNaN(Number(tax)) ? 0.00 : Number(tax).toFixed(2)}</td>
                          {/* <td style={cellStyle}>{((overWorkRateSum + overWorkRateOTSum + overAddSalaryDaySum + sumSpSalaryResult + anySpSalary) * socialSecurity).toFixed(2)}</td> */}
                          {/* <td style={cellStyle}>{isNaN(Number(socialSecurity)) ? 0 : Number(socialSecurity).toFixed(0)}</td> */}
                          <td style={cellStyle}>{isNaN(Number(socialSecurity)) ? 0 : Math.ceil(Number(socialSecurity))}</td>
                          <td style={cellStyle}>{isNaN(Number(bank)) ? 0.00 : Number(bank).toFixed(2)}</td>
                          {/* <td style={cellStyle}>
                            <input
                              type="text"
                              className="form-control"
                              id="anyMinus"
                              placeholder="หักอื่นๆ"
                              value={anyMinus}
                              style={{ width: '50%' }}
                              onChange={handleAnyMinusChange}
                            />
                          </td> */}
                          <td style={cellStyle}>
                            <p onClick={togglePopup} style={{ color: color, cursor: 'pointer' }}>
                              {isNaN(Number(deductBeforeTax) + Number(deductAfterTax)) ? 0.00 : (Number(deductBeforeTax) + Number(deductAfterTax)).toFixed(2)}
                            </p>
                            {showPopup && (
                              <div className="popup">
                                <h4>รายการงินหัก</h4>
                                <ul style={{ listStyleType: 'none', padding: 0, margin: 0 }}>
                                  {deductSalaryList && (
                                  deductSalaryList.map((deductsalary, index) => {
                                    {
                                      deductsalary.name !== '' && (

                                        <li key={index} style={{ marginBottom: '10px' }}>
                                          {deductsalary.name} - หัก: {deductsalary.amount} ฿
                                        </li>
                                      )
                                    }

                                  }))}

                                </ul>
                                <button onClick={togglePopup}>Close</button>
                              </div>
                            )}
                            {/* {isNaN(Number(deductBeforeTax) + Number(deductAfterTax)) ? 0.00 : (Number(deductBeforeTax) + Number(deductAfterTax)).toFixed(2)} */}
                          </td>
                          <td style={cellStyle}>{isNaN(Number(deductBeforeTax) + Number(deductAfterTax) + Number(tax) + Number(socialSecurity) + Number(bank)) ? 0.00 : (Number(deductBeforeTax) + Number(deductAfterTax) + Number(tax) + Number(socialSecurity) + Number(bank)).toFixed(2)}</td>
                          {/* <td style={cellStyle}>({anyMinus} + {tax} + {((overWorkRateSum + overWorkRateOTSum + overAddSalaryDaySum + sumSpSalaryResult + anySpSalary) * socialSecurity).toFixed()} + {bankCustom} + {sumDeduct} + {sumDeductInstallment})</td> */}
                          <td style={cellStyle}>
                            <button class="btn btn-danger" style={{ width: '3rem' }}>แก้ไข</button>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                  {/* <div class="col-md-2">
                    <button>แก้ไข</button>
                  </div> */}
                </div>
                <br />
                <div class="row">
                  <div class="col-md-8">
                    <table border="1" style={tableStyle}>
                      <thead>
                        <tr>
                          <th style={headerCellStyle}>รวมเงินได้</th>
                          <th style={headerCellStyle}>รวมเงินหัก</th>
                          <th style={headerCellStyle}>เงินสุทธิ</th>

                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          {/* <td style={cellStyle}>{(totalSumSalary).toFixed(2)}</td>
                          <td style={cellStyle}>{(totalSumDeduct).toFixed(2)}</td>
                          <td style={cellStyle}>{(totalSumSalary - totalSumDeduct).toFixed(2)}</td> */}

                          <td style={cellStyle}>{isNaN(totalSumSalary) ? 0.00 : (totalSumSalary).toFixed(2)}</td>
                          <td style={cellStyle}>{isNaN(totalSumDeduct) ? 0.00 : (totalSumDeduct).toFixed(2)}</td>
                          <td style={cellStyle}>{isNaN(totalSumSalary - totalSumDeduct) ? 0.00 : (totalSumSalary - totalSumDeduct).toFixed(2)}</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              </section>
              <div class="line_btn">
                <button type="button" class="btn b_save"><i class="nav-icon fas fa-save"></i> &nbsp;ปิดงวด</button>

                {/* <Link to="/Salaryresult"> */}
                <button type="button" class="btn clean"><i class="far fa-window-close"></i> &nbsp;ยกเลิก</button>
                {/* </Link > */}

              </div>
              {/* {JSON.stringify(employee.addSalary,null,2)} */}
            </div>

          </section>
        </div>
      </div>

    </body >
  )
}

export default Salaryresult