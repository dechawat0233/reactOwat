import endpoint from '../../config';

import axios from 'axios';
import React, { useEffect, useState, useRef } from 'react';
import '../editwindowcss.css';
import { jsPDF } from 'jspdf';
import 'jspdf-autotable';
import html2pdf from 'html2pdf.js';
import { useTable } from 'react-table';

function Worktimesheet() {

  //set style
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

const styles = {
  th: {
    minWidth: "4rem"
  }
};

//variable
const [dataset, setDataset] = useState([]);
const [workplaceList, setWorkplaceList] = useState([]);
const [result_data, setResult_data] = useState([]);

const [employeelist, setEmployeelist] = useState([]);
const [employee, setEmployee] = useState([]);
const [listDayOff, setListDayOff] = useState([]);
const [y, setY] = useState('');
const [m, setM] = useState('');
const [m1, setM1] = useState('');

  //data for show in table
  const [listTableDayoff, setListTableDayoff] = useState([]);
  //data for check list dayoff
  const [data_listDayoff, setData_listDayoff] = useState([]);
  const [spDayoff, setSpDayoff] = useState(null);
  const [lastName, setLastName] = useState('');

  //count day work and dayoff and special dayoff
  const [dw, setDw] = useState(0); //รวมวันทำงาน
  const [doff, setDoff] = useState(0); //รวมทำวันหยุดในสัปดาห์
  const [dspe, setDspe] = useState(0); //รวมทำงานวันหยุดพิเศษ
  const [listDf, setListDf] = useState([]);
  const [listSp, setListSp] = useState([]);
  const [csp, setCsp] = useState(0);
  const [cdf, setCdf] = useState(0);
  const [cdw, setCdw] = useState(0);

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

  const [Datasetsec, setDatasetsec] = useState([]);

  //set salaty calculate
  const [workRate, setWorkRate] = useState(''); //ค่าจ้างต่อวัน
  const [workRateOT, setWorkRateOT] = useState(''); //ค่าจ้าง OT ต่อชั่วโมง
  const [holiday, setHoliday] = useState(''); //ค่าจ้างวันหยุดนักขัตฤกษ์ 
  const [holidayHour, setHolidayHour] = useState(''); //ค่าจ้างวันหยุดนักขัตฤกษ์ รายชั่วโมง
  const [addSalary, setAddSalary] = useState([]); //เงิ่นเพิ่มพิเศษ

  const [workplaceIdListSearch, setWorkplaceIdListSearch] = useState([]); //หน่วยงานที่ค้นหาและทำงาน
  const [calculatedValues, setCalculatedValues] = useState([]);

  // get employee data
  const [MinusSearch, setMinusSearch] = useState(0); // Example: February (you can set it dynamically)
  const [EmpData, setEmpData] = useState([]); // Example: February (you can set it dynamically)

//pdf
const [monthset, setMonthset] = useState(''); // Example: February (you can set it dynamically)
const [MinusSS, setMinusSS] = useState(0); // Example: February (you can set it dynamically)
const [result, setResult] = useState(''); // Example: February (you can set it dynamically)

const [year, setYear] = useState(2023); // Example year (you can set it dynamically)

const [workMonth, setWorkMonth] = useState([]);



//set variable first load
useEffect(() => {
  document.title = 'ใบลงเวลาการปฏิบัติงาน';
  setMonth("01");

  // You can also return a cleanup function if needed
  // return () => { /* cleanup code */ };
}, []);


//function
//function search
async function handleSearch(event) {

};


//view
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
                    <h2 class="title">ผลลัพธ์ {result_data.length > 0 ? ('1') : ('0')} รายการ</h2>
                  </div>
                  <div class="d-flex justify-content-center">
                    <div class="row">
                      <div class="col-md-12">
                        <div class="form-group">
                          <ul style={{ listStyle: 'none', marginLeft: "-2rem" }}>
                            {/* {result_data.map((workplace, index) => (
                              <li
                                key={workplace.employeeId}
                                onClick={() => handleClickResult(workplace)}
                              >
                                {index === 0 ? (
                                  <span>
                                    รหัส {workplace.employeeId || ''} ชื่อพนักงาน {workplace.employeeName || ''}
                                  </span>
                                ) : null}
                              </li>
                            ))} */}
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
            {/* {result_data.slice(0, 1).map((
              employeerecord) => (
              employeerecord.employeeId + ': ' + employeerecord.employeeName + ' ' + lastName)
            )} */}
          </div>
        </div>
        <br />

        <div class="row">
          {/* {result_data.slice(0, 1).map((employeerecord) => {

            if (getMonthName(month) == "มกราคม") {
              return (
                <div class="col-md-5" key={employeerecord.timerecordId}>

                  {'ประจำเดือน ' + getMonthName(month)}
                  {' ตั้งแต่วันที่ 1 ' + getMonthName(parseInt(month, 10))}
                  {' ถึง 20 ' + getMonthName(month)}
                  {'  ' + (parseInt(employeerecord.timerecordId, 10) + 543)}

                </div>

              );
            } else {


              return (
                <div class="col-md-5" key={employeerecord.timerecordId}>

                  {'ประจำเดือน ' + getMonthName(month)}
                  {' ตั้งแต่วันที่ 21 ' + getMonthName(parseInt(month, 10) - 1)}
                  {' ถึง 20 ' + getMonthName(month)}
                  {'  ' + (parseInt(employeerecord.timerecordId, 10) + 543)}

                </div>
              );
            }

          }

          )} */}
        </div>
        <br />
        <div class="row">
          <div class="col-md-3">
            วันทำงานทั้งหมด {countWork} วัน
          </div>
        </div>
        
<p>form</p>

        <div class="row">
          <div class="col-md-9">
            <section class="Frame">
              <div class="container" style={{ overflowX: 'scroll' }}>
                <table class="table table-bordered ">
                  <thead>
                    <tr>
                      <th>เงินค่าจ้าง</th>
                      {/* {calculatedValues.map((value, index) => (
                        <th>
                          {value.workplaceId}
                        </th>
                      ))} */}

                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>
                        รวมวันทำงาน
                      </td>
                      {/* {calculatedValues.map((value, index) => (
                        <td>
                          {value.calculatedValue} ({value.allTime} วัน)
                        </td>
                      ))} */}

                    </tr>
                    <tr>
                      <td>
                        รวมวันทำงาน OT
                      </td>
                      {/* {calculatedValues.map((value, index) => (
                        <td>
                          {value.calculatedOT} ({value.otTime} ช.ม.)
                        </td>
                      ))} */}

                    </tr>
                    <tr>
                      <th>เงินเพิ่มพิเศษ</th>
                    </tr>
                    {/* {addSalary.map((value, index) => (
                      <tr key={index}>
                        <td>{value.name}</td>
                        <td>{value.SpSalary} บาท</td>
                      </tr>
                    ))} */}
                    <tr>
                      <td>วันหยุดนักขัตฤกษ์</td>
                      {/* {calculatedValues.map((value, index) => (
                        <td>
                          {value.calculatedValueDayoff} ({value.dayoffAllTime} ช.ม.)
                        </td>
                      ))} */}
                    </tr>
                    <tr>
                      <td>วันหยุดนักขัตฤกษ์ OT</td>
                      {/* {calculatedValues.map((value, index) => (
                        <td>
                          {value.calculatedValueDayoffOt} ({value.dayoffOtTime} ช.ม.)
                        </td>
                      ))} */}
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
                <table style={vertical1}>
                  <thead>
                    <tr>
                      <th style={verticalTextHeader}>Header 1</th>
                      <th style={verticalTextHeader}>Header 2</th>
                      {/* Add more header columns as needed */}
                    </tr>
                  </thead>

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

);
}

export default Worktimesheet