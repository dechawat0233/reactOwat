import endpoint from "../../config";

import axios from "axios";
import React, { useEffect, useState } from "react";
import { jsPDF } from "jspdf";
import "jspdf-autotable";
import { ThaiDatePicker } from "thaidatepicker-react";
import { FaCalendarAlt } from "react-icons/fa"; // You can use any icon library

import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

import moment from "moment";
import "moment/locale/th"; // Import the Thai locale data

import th from "date-fns/locale/th"; // Import Thai locale data from date-fns
import en from "date-fns/locale/en-US";

import { addYears } from "date-fns";

import * as XLSX from "xlsx";
import { saveAs } from "file-saver";

function ReplaceReport({ employeeList, workplaceList }) {
  const [workDate, setWorkDate] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [selectedDate, setSelectedDate] = useState(null);
  const [formattedDate321, setFormattedDate] = useState(null);

  const handleDatePickerChange = (date) => {
    setSelectedDate(date);
    setShowDatePicker(false); // Hide date picker after selecting a date
    const newDate = new Date(date);
    setWorkDate(newDate);
  };
  const toggleDatePicker = () => {
    setShowDatePicker(!showDatePicker);
  };

  useEffect(() => {
    // Function to format a given date
    const formatDate = (date) => {
      const day = date.getDate().toString().padStart(2, "0");
      const month = (date.getMonth() + 1).toString().padStart(2, "0");
      const year = (date.getFullYear() + 543).toString();
      return `${day}/${month}/${year}`;
    };

    if (selectedDate) {
      // Convert the selected date string to a Date object and format it
      const date = new Date(selectedDate);
      const formattedDate = formatDate(date);
      setFormattedDate(formattedDate);
    } else {
      // If selectedDate is null, use the current date
      const currentDate = new Date();
      const formattedCurrentDate = formatDate(currentDate);
      setFormattedDate(formattedCurrentDate);
      setSelectedDate(currentDate); // Set the initial selected date to the current date
    }
  }, [selectedDate]);

  function generateRandomData(count) {
    const randomArray = [];
    const randomName = ['มิวะ', 'ซิวะริ', 'ปรีนา', 'ปลาใส', 'พรมาร', 'มาริกา', 'กาศิลา', 'สาวดี', 'ศรีทา', 'การะมาร'];
    const randomLastName = ['พงศิไทย', 'สมกามา', 'มาริมาร', 'กรกล', 'กลนพา', 'ภาษิกา', 'หรศรี', 'ณทิกา', 'ราสิกา', 'ศงการมาร'];

    const generateBankNumber = () => {
      const part1 = Math.floor(Math.random() * 900) + 100; // 3-digit number
      const part2 = Math.floor(Math.random() * 10); // 1-digit number
      const part3 = Math.floor(Math.random() * 90000) + 10000; // 5-digit number
      const part4 = Math.floor(Math.random() * 10); // 1-digit number
      return `${part1}-${part2}-${part3}-${part4}`;
    };

    for (let i = 0; i < count; i++) {
      const name = randomName[Math.floor(Math.random() * randomName.length)];
      const lastName = randomLastName[Math.floor(Math.random() * randomLastName.length)];
      const workplace = Math.floor(Math.random() * 90000) + 10000; // Random 5-digit number
      // const bank = generateBankNumber(); // Generate formatted bank number
      const bank = `${name} ${lastName} - ${generateBankNumber()}`; // Add random name and lastname to bank
      const salary = Math.floor(Math.random() * 900) + 100; // Random 3-digit number
      const salaryCalculate = salary - (salary * 0.03); // Calculate salary
      const result = salaryCalculate; // Same as salaryCalculate

      randomArray.push({
        name: `${name} ${lastName}`,
        workplace,
        bank,
        salary,
        salaryCalculate: salaryCalculate.toFixed(2),
        result: salaryCalculate.toFixed(2),
      });
    }

    return randomArray;
  }

  // Generate 10 random entries
  const randomData = generateRandomData(10);
  console.log(randomData);
  const [data, setData] = useState(generateRandomData(10)); // Generate 10 random entries

  return (
    <body class="hold-transition sidebar-mini" className="editlaout">
      <div class="wrapper">
        <div class="content-wrapper">
          {/* <!-- Content Header (Page header) --> */}
          <ol class="breadcrumb">
            <li class="breadcrumb-item">
              <i class="fas fa-home"></i> <a href="index.php">หน้าหลัก</a>
            </li>
            <li class="breadcrumb-item">
              <a href="#"> ระบบเงินเดือน</a>
            </li>
            <li class="breadcrumb-item active">ออกรายงาน แทนพนักงาน </li>
          </ol>
          <div class="content-header">
            <div class="container-fluid">
              <div class="row mb-2">
                <h1 class="m-0">
                  <i class="far fa-arrow-alt-circle-right"></i>{" "}
                  ออกรายงาน แทนพนักงาน
                </h1>
              </div>
            </div>
          </div>
          <section class="content">
            <div class="container-fluid">
              <h2 class="title">ออกรายงาน แทนพนักงาน </h2>
              <section class="Frame">
                <div class="col-md-12">
                  <div class="row">
                    <div class="col-md-3">
                      <label role="searchEmployeeId">รหัสหน่อยงาน</label>
                      <label role="datetime">พิมพ์วันที่</label>
                      <div
                        onClick={toggleDatePicker}
                        style={{
                          position: "relative",
                          zIndex: 9999,
                          marginLeft: "0rem",
                        }}
                      >
                        <FaCalendarAlt size={20} />
                        <span style={{ marginLeft: "8px" }}>
                          {formattedDate321 ? formattedDate321 : "Select Date"}
                        </span>
                      </div>
                      {showDatePicker && (
                        <div style={{ position: "absolute", zIndex: 1000 }}>
                          <ThaiDatePicker
                            className="form-control"
                            value={selectedDate}
                            onChange={handleDatePickerChange}
                          />
                        </div>
                      )}
                    </div>
                    <div class="col-md-3">
                      <button class="btn b_save">ค้นหา</button>
                    </div>
                  </div>
                  <br />
                </div>
                <br />
              </section>
              <section class="Frame">
                <div class="col-md-12">
                  <div class="row">
                    <table className="table table-bordered">
                      <thead>
                        <tr>
                          <th>#</th>
                          <th>ชื่อ-นามสกุล</th>
                          <th>หน่วยงาน</th>
                          <th>โอน</th>
                          <th>รายละเอียด</th>
                          <th>คำนวณหลังหัก</th>
                          <th>ยอดรวม</th>
                        </tr>
                      </thead>
                      <tbody>
                        {data.map((item, index) => (
                          <tr key={index}>
                            <td>{index + 1}</td>
                            <td>{item.name}</td>
                            <td>{item.workplace}</td>
                            <td><input style={{ width: "100%" }} value={item.bank} /></td>
                            <td>{item.salary}</td>
                            <td>{item.salaryCalculate}</td>
                            <td>{item.result}</td>
                            <td><button class="btn b_save" style={{ width: "4rem" }}>แก้ไข</button></td>
                            <td><button class="btn clean" style={{ width: "4rem" }}>ลบ</button></td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                    {/* <button
                      className="btn btn-primary"
                      onClick={() => setData(generateRandomData(10))}
                    >
                      Generate New Data
                    </button> */}
                  </div>
                </div>
              </section>

            </div>
          </section>
        </div>
      </div>
    </body>
    // </div>
  );
}

export default ReplaceReport;
