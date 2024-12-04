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

  const randomWorkplace = ["10154", "10175", "10751"];
  const [data, setData] = useState([
    { workplace: "10154", name: "กาวิสา ไพรวิกา", salary: 500, bank: "กาวิสา ไพรวิกา 123-4-56789-0", isChecked: false },
    { workplace: "10175", name: "ไตรศรีมา มิโวหาร", salary: 600, bank: "ไตรศรีมา มิโวหารไพ 234-5-67890-1", isChecked: false },
    { workplace: "10751", name: "ไลการี พีโวกา", salary: 700, bank: "ไตรศรีมา มิโวหาร 345-6-78901-2", isChecked: false },
    { workplace: "10175", name: "ไตรศรีมา มิโวหารไพ", salary: 811, bank: "ไลการีการี พีโวกา 234-5-67890-3", isChecked: false },
    { workplace: "10751", name: "ไลการี พีโวกาฟฟ", salary: 625, bank: "ไตรศรีมา มิโวหาร 345-6-78901-4", isChecked: false },
    { workplace: "10175", name: "ไตรศรีมาดา มิโวหาร", salary: 450, bank: "ไตรศรีมา มิโวหาร 234-5-67890-5", isChecked: false },
    { workplace: "10751", name: "ไลการีการี พีโวกา", salary: 900, bank: "ไตรศรีมาดา มิโวหาร 345-6-78901-6", isChecked: false },
  ]);
  const handleCheckboxChange = (index) => {
    const updatedData = data.map((item, i) => {
      if (i === index) {
        return { ...item, isChecked: !item.isChecked };
      }
      return item;
    });

    setData(updatedData);
  };

  const calculateSalary = (item) => {
    if (item.isChecked) {
      return item.salary; // Cancel the deduction
    }
    return item.salary - item.salary * 0.03; // Apply the deduction
  };

  return (
    <body class="hold-transition sidebar-mini" className="editlaout">
      <div class="wrapper">
        <div class="content-wrapper">
          {/* <!-- Content Header (Page header) --> */}
          <ol class="breadcrumb">
            <li class="breadcrumb-item">
              <i class="fas fa-home"></i> <a href="index.php">หน้าหลัก</a>
            </li>
            {/* <li class="breadcrumb-item">
              <a href="#"> ระบบเงินเดือน</a>
            </li> */}
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
                  <div class="row align-items-end">
                    <div class="col-md-3">
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
                {/* <table className="table table-bordered">
                  <thead>
                    <tr>
                      {randomWorkplace.map((workplace, index) => (
                        <th key={index}>
                          {workplace}
                          <br />
                          <input
                            type="checkbox"
                            onChange={() => handleCheckboxChange(workplace)}
                            checked={selectedWorkplaces.includes(workplace)}
                          />
                        </th>
                      ))}
                    </tr>
                  </thead>
                </table> */}
                <div class="col-md-12">
                  {/* <div class="row">
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
                            <td>{item.workplace}
                              <br />
                              <input type="checkbox" />
                            </td>
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
                  </div> */}
                  <table className="table table-bordered">
                    <thead>
                      <tr>
                        <th>หน่วยงาน</th>
                        <th>ชื่อ-นามสกุล</th>
                        <th>เงิน</th>
                        <th>โอน</th>
                        <th>รายละเอียด</th>
                        <th>สุทธิ</th>
                      </tr>
                    </thead>
                    <tbody>
                      {data.map((item, index) => (
                        <tr key={index}>
                          <td>{item.workplace}</td>
                          <td>{item.name}</td>
                          <td>{item.salary}</td>
                          <td>
                            <input style={{ width: "100%" }} value={item.bank} readOnly />
                          </td>
                          <td>{calculateSalary(item).toFixed(2)}
                            <br />
                            <input
                              type="checkbox"
                              checked={item.isChecked}
                              onChange={() => handleCheckboxChange(index)}
                            />
                            {item.isChecked ? " ไม่หัก 3 %" : " หัก 3 %"}
                          </td>
                          <td>{calculateSalary(item).toFixed(2)}
                          </td>
                          <td><button class="btn b_save" style={{ width: "4rem" }}>แก้ไข</button></td>
                          <td><button class="btn clean" style={{ width: "4rem" }}>ลบ</button></td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
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
