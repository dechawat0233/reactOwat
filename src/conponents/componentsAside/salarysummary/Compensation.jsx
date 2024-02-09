// import React from 'react'
// import React from 'react'
import endpoint from '../../../config';

import axios from 'axios';
import React, { useEffect, useState } from 'react';

import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

import EmployeesSelected from './../EmployeesSelected';
import Calendar from 'react-calendar';
import '../../editwindowcss.css';
import EmployeeWorkDay from '../componentsetting/EmployeeWorkDay';
import Modal from 'react-modal';
import './styleCom.css';
Modal.setAppElement('#root'); // Set the root element for accessibility


function Compensation() {

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

  const [searchWorkplaceId, setSearchWorkplaceId] = useState(''); //รหัสหน่วยงาน
  const [searchWorkplaceName, setSearchWorkplaceName] = useState(''); //ชื่อหน่วยงาน
  const [searchResult, setSearchResult] = useState([]);
  const [employeeListResult, setEmployeeListResult] = useState([]);
  const [newWorkplace, setNewWorkplace] = useState(true);


  const [modalIsOpen, setModalIsOpen] = useState(false);

  const openModal = () => {
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
  };


  // const CheckMonth = parseInt(month, 10);
  // const CheckYear = year;
  const CheckMonth = 5;
  const CheckYear = 2023;

  let countdownMonth;
  let countdownYear;

  if (CheckMonth === 1) {
    countdownMonth = 12;
    countdownYear = 2023 - 1;
  } else {
    countdownMonth = CheckMonth - 1;
    countdownYear = CheckYear;

  }
  function getDaysInMonth(month, year) {
    // Months are 0-based, so we subtract 1 from the provided month
    const lastDayOfMonth = new Date(year, month, 0).getDate();
    return lastDayOfMonth;
  }

  const daysInMonth = getDaysInMonth(countdownMonth, CheckYear);
  const startDay = 21;
  // Create an array from startDay to daysInMonth
  const firstPart = Array.from({ length: daysInMonth - startDay + 1 }, (_, index) => (startDay + index) + '/' + countdownMonth + '/' + (countdownYear + 543));

  // Create an array from 1 to 20
  const secondPart = Array.from({ length: 20 }, (_, index) => index + 1 + '/' + CheckMonth + '/' + (CheckYear + 543));

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
  const daysInCountdownMonth = getDaysInMonth2(countdownMonth, CheckYear);

  // const array1 = createDaysArray(CheckMonth, CheckYear, daysInMonth2, (day) => day <= 20);
  // const array2 = createDaysArray(countdownMonth, CheckYear, daysInCountdownMonth, (day) => day > 21);
  const array1 = createDaysArray(CheckMonth, CheckYear, daysInMonth2, (day) => day <= 20);
  const array2 = createDaysArray(countdownMonth, CheckYear, daysInCountdownMonth, (day) => day >= 21);


  console.log('Array 1 (March):', array1);
  console.log('Array 2 (Countdown):', array2);

  const commonNumbers = new Set([...array1.Mon, ...array2.Mon]);

  // const commonNumbers = [...new Set([...array1.Mon, ...array2.Mon])];
  console.log('commonNumbers', commonNumbers);

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



  return (
    // <div>
    <body class="hold-transition sidebar-mini" className='editlaout'>
      <div class="wrapper">

        <div class="content-wrapper">
          {/* <!-- Content Header (Page header) --> */}
          <ol class="breadcrumb">
            <li class="breadcrumb-item"><i class="fas fa-home"></i> <a href="index.php">หน้าหลัก</a></li>
            <li class="breadcrumb-item"><a href="#"> การตั้งค่า</a></li>
            <li class="breadcrumb-item active">ตั้งค่าหน่วยงาน</li>
          </ol>
          <div class="content-header">
            <div class="container-fluid">
              <div class="row mb-2">
                <h1 class="m-0"><i class="far fa-arrow-alt-circle-right"></i> ตั้งค่าหน่วยงาน</h1>
              </div>
            </div>
          </div>
          <section class="content">
            <div class="container-fluid">
              <h2 class="title">ตั้งค่าหน่วยงาน</h2>
              <section class="Frame">
                <div class="col-md-12">
                  <form >
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
              <section class="Frame">
                <div class="row">
                  <div class="col-md-12">
                    <div class="form-group">
                      <table border="1" style={tableStyle}>
                        <thead>
                          <tr>
                            <th style={headerCellStyle}>วันที่</th>
                            <th style={headerCellStyle}>หน่วงงาน</th>
                            <th style={headerCellStyle}>ชั่วโมงทำงาน</th>
                            <th style={headerCellStyle}>ค่าจ้างปกติ</th>
                            <th style={headerCellStyle}>ชั่วโมง OT</th>
                            <th style={headerCellStyle}>ค่าล่วงเวลา OT</th>
                            <th style={headerCellStyle}>เงินเพิ่ม</th>
                            <th style={headerCellStyle}>เงินหัก OT</th>
                            <th style={headerCellStyle}>แก้/ลบ</th>
                          </tr>
                        </thead>
                        <tbody>
                          {/* {resultArray.map((value, index) => (
                                             // <tr key={index}>
                                             //     <td>{resultArray{$index}}</td>
                                             // </tr>
                                             <tr key={index}>
                                                 <td style={cellStyle}>{value}</td>
                                             </tr>
                                         ))} */}

                          {resultArray.map((value, index) => (
                            <tr key={index}>
                              <td style={commonNumbers.has(resultArray2[index]) ? { ...cellStyle, backgroundColor: 'yellow' } : cellStyle}>
                                {value}
                              </td>
                              <td style={commonNumbers.has(resultArray2[index]) ? { ...cellStyle, backgroundColor: 'yellow' } : cellStyle}>
                                399-689
                              </td>
                              <td style={commonNumbers.has(resultArray2[index]) ? { ...cellStyle, backgroundColor: 'yellow' } : cellStyle}>
                                8
                              </td>
                              <td style={commonNumbers.has(resultArray2[index]) ? { ...cellStyle, backgroundColor: 'yellow' } : cellStyle}>
                                350
                              </td>
                              <td style={commonNumbers.has(resultArray2[index]) ? { ...cellStyle, backgroundColor: 'yellow' } : cellStyle}>
                                1
                              </td>
                              <td style={commonNumbers.has(resultArray2[index]) ? { ...cellStyle, backgroundColor: 'yellow' } : cellStyle}>
                                65
                              </td>
                              <td style={commonNumbers.has(resultArray2[index]) ? { ...cellStyle, backgroundColor: 'yellow' } : cellStyle}>
                                1000
                              </td>
                              <td style={commonNumbers.has(resultArray2[index]) ? { ...cellStyle, backgroundColor: 'yellow' } : cellStyle}>

                              </td>
                              <td style={commonNumbers.has(resultArray2[index]) ? { ...cellStyle, backgroundColor: 'yellow' } : cellStyle}>
                                ลบ/
                                {/* <button onClick={handleButtonClick}>แก้ไข</button> */}
                                <button onClick={openModal}>แก้ไข</button>

                                <Modal
                                  isOpen={modalIsOpen}
                                  onRequestClose={closeModal}
                                  contentLabel="Example Modal"
                                  style={{
                                    overlay: {
                                      backgroundColor: 'rgba(100, 100, 100, 0.5)',
                                      zIndex: 10,
                                    },
                                    content: {
                                      width: '50rem',
                                      margin: 'auto',
                                      borderRadius: '8px',
                                      boxShadow: '0 0 10px rgba(0, 0, 0, 0.3)',
                                    },
                                  }}
                                >
                                  {/* Your form content goes here */}
                                  <form>
                                    {/* <label>
                                      Form Input:
                                      <input type="text" />
                                    </label>
                                    <button type="submit">Submit</button> */}
                                    {workTimeDayPerson.allTimesPerson.map((time, index) => (
                                      <div key={index} className="row">

                                        <div className="col-md-3">
                                          <select
                                            name="CodeSalary"
                                            className="form-control"
                                            value={time.CodeSalary}
                                            onChange={(e) => handleInputChangePerson(e, index)}
                                          >
                                            <option value="">เลือกตำแหน่ง</option>

                                            {positionWork.map((position, positionIndex) => (
                                              <option key={positionIndex} value={position}>
                                                {position}
                                              </option>
                                            ))}
                                          </select>
                                        </div>

                                        <div className="col-md-3">
                                          <select
                                            name="positionWork"
                                            className="form-control"
                                            value={time.positionWork}
                                            onChange={(e) => handleInputChangePerson(e, index)}
                                          >
                                            <option value="">เลือกตำแหน่ง</option>

                                            {positionWork.map((position, positionIndex) => (
                                              <option key={positionIndex} value={position}>
                                                {position}
                                              </option>
                                            ))}
                                          </select>
                                        </div>
                                        <div className="col-md-3">
                                          {/* <input
                                                            type="text"
                                                            className="form-control"
                                                            placeholder={`Person ${index + 1}`}
                                                            value={time.countPerson}
                                                            onChange={(e) => handleInputChangePerson(e, index)}
                                                        /> */}
                                          <input
                                            type="text"
                                            className="form-control"
                                            placeholder={`Person ${index + 1}`}
                                            name="countPerson" // Make sure the name attribute is set to "countPerson"
                                            value={time.countPerson}
                                            onChange={(e) => handleInputChangePerson(e, index)}
                                          />

                                        </div>
                                        <div class="col-md-2">
                                          {index >= 1 ? (
                                            <button type='button'
                                              onClick={() => handleRemoveTimePerson(index)}
                                              style={{ width: '2.5rem' }}
                                              className="btn btn-danger ml-auto"

                                            >
                                              ลบ
                                            </button>
                                          ) : (

                                            <>
                                              <button type="button" aria-label="เพิ่ม"
                                                onClick={handleAddTimePerson} className="btn btn-primary" style={{ width: '2.5rem' }}>
                                                <i className="fa">&#xf067;</i>
                                              </button>
                                            </>
                                          )}
                                        </div>
                                        <br />
                                        <br />
                                        <br />

                                      </div>
                                    ))}
                                    <button type="button" onClick={closeModal}>
                                      Close
                                    </button>
                                  </form>
                                </Modal>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>

                  </div>
                </div>

                <div class="line_btn">
                  {newWorkplace ? (
                    <button class="btn b_save"><i class="nav-icon fas fa-save"></i> &nbsp;สร้างหน่วยงานใหม่</button>
                  ) : (
                    <button class="btn b_save"><i class="nav-icon fas fa-save"></i> &nbsp;บันทึก</button>

                  )}
                  <button class="btn clean"><i class="far fa-window-close"></i> &nbsp;ยกเลิก</button>
                </div>
              </section>
            </div>
          </section>
        </div>
      </div>
    </body>
    // </div>  )
  )
}
export default Compensation