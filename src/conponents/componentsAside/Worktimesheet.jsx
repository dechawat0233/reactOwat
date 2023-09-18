import endpoint from '../../config';

import axios from 'axios';
import React, { useEffect, useState } from 'react';
import '../editwindowcss.css';

function Worktimesheet() {
  const styles = {
    th: {
      minWidth: "4rem"
    }
  };
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
  const [month, setMonth] = useState('');
  
  useEffect(() => {
    setMonth("01");
  }, []);

  const [searchWorkplaceId, setSearchWorkplaceId] = useState(''); //รหัสหน่วยงาน
  const [searchWorkplaceName, setSearchWorkplaceName] = useState(''); //ชื่อหน่วยงาน
  const [searchEmployeeId, setSearchEmployeeId] = useState('');
  const [searchEmployeeName, setSearchEmployeeName] = useState('');
  const [searchResult, setSearchResult] = useState([]);

  const [woekplace, setWoekplace] = useState([]);

  async function handleSearch(event) {
    event.preventDefault();
    // get value from form search
    const data = await {
      employeeId: searchEmployeeId,
      employeeName: searchEmployeeName,
      month: month
    }; console.log(searchEmployeeId);
    try {

      const response = await axios.post(endpoint + '/timerecord/searchemp', data);

      await setSearchResult(response.data.recordworkplace);

      // alert(JSON.stringify(response.data , null, 2) );
      // await alert(searchResult[0].employee_workplaceRecord[0].workplaceId );

      const employeeWorkplaceRecords = await response.data.recordworkplace[0].employee_workplaceRecord;
// alert(employeeWorkplaceRecords );

      if (employeeWorkplaceRecords.length > 0) {
        const dates = employeeWorkplaceRecords.map(record => record.date);
        // const otTime = employeeWorkplaceRecords.map(record => record.otTime);
        const otTime = employeeWorkplaceRecords.map((record) => record.otTime);

        setTableData((prevState) => {
          const updatedData = [...prevState];
          dates.forEach((date, index) => {
            const dataIndex = parseInt(date, 10) - 1; // Subtract 1 because indices are zero-based
            if (dataIndex >= 0 && dataIndex < updatedData.length) {
              updatedData[dataIndex].isChecked = true;
              updatedData[dataIndex].textValue = otTime[index]; // Set otTime at the same index as dates
            }
          });
          return updatedData;
        });

        // setTableData((prevState) => {
        //   const updatedData = [...prevState];
        //   dates.forEach((date) => {
        //     const index = parseInt(date, 10) - 1; // Subtract 1 because indices are zero-based
        //     if (index >= 0 && index < updatedData.length) {
        //       updatedData[index].isChecked = true;
        //     }
        //   });
        //   return updatedData;
        // });

        // const updatedTableData = tableData.map((data, index) => ({
        //   ...data,
        //   textValue: otTime[index] || '', // Use the otTime value if available, or an empty string if not
        // }));

        // Set the updated tableData state
        // setTableData(updatedTableData);

        setWoekplace(dates);

        console.log('Dates:', dates);
        console.log('time:', otTime);
      }

      // alert(response.data.recordworkplace.length);
      if (response.data.recordworkplace.length < 1) {
        window.location.reload();
        alert('ไม่พบข้อมูล');
      } else {

        // Set search values
        await setEmployeeId(response.data.recordworkplace[0].employeeId);
        await setName(response.data.recordworkplace[0].employeeName);


        // setWoekplace(response.data.recordworkplace[0].employee_workplaceRecord[0].workplaceName);

        // setSearchEmployeeId(response.data.employees[0].employeeId);
        // setSearchEmployeeName(response.data.employees[0].name);
        setSearchEmployeeId('');
        setSearchEmployeeName('');

      }
    } catch (error) {
      alert('กรุณาตรวจสอบข้อมูลในช่องค้นหา');
      window.location.reload();
    }
  }
  console.log(searchResult);
  console.log(woekplace);

  // const handleCheckboxChange = (event) => {
  //   const { name, checked } = event.target;
  //   if (name === 'checked28') {
  //     setChecked28(checked);
  //   } else if (name === 'checked31') {
  //     setChecked31(checked);
  //   }
  // };




  const [tableData, setTableData] = useState(
    new Array(31).fill('').map((_, index) => ({
      isChecked: false,
      textValue: '',
    }))
  );

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
              <div class="col-md-6">
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
                              <div class="form-group">
                                <button class="btn b_save"><i class="nav-icon fas fa-search"></i> &nbsp; ค้นหา</button>
                              </div>
                            </div>
                          </div>
                        </div>
                      </form>
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
                                    key={workplace.employeeId}
                                    onClick={() => handleClickResult(workplace)}
                                  >
                                    รหัส {workplace.employeeId || ''} ชื่อพนักงาน {workplace.employeeName ||''}
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
               {searchResult.map((
                employeerecord) => (
                  employeerecord.employeeId +': ชื่อพนักงาน ' + employeerecord.employeeName)
               )}
              </div>
            </div>
            <br />

            <div class="row">
              <div class="col-md-2">
                {searchResult.map((
                employeerecord) => (
                  '                ชื่อ :                   ' + employeerecord.employeeName)
               )}
              </div>
              <div class="col-md-3">
              {searchResult.map((
                employeerecord) => (
                  'ประจำเดือน ' + getMonthName( employeerecord.month) 
                +'ตั้งแต่วันที่ 21 ' + getMonthName(  parseInt(employeerecord.month , 10) -1) 
+'ถึง 20 ' + getMonthName( employeerecord.month) )
+'  ' + (parseInt(employeerecord.timerecordId , 10) +543)
               )}
              </div>
            </div>
            <br />
            <div class="row">
              <div class="col-md-2">
                ทั้งหมด 22 วัน
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
                            <th style={styles.th}>Number</th>
                            {Array.from({ length: 31 }, (_, index) => (
                              <th key={index} style={styles.th}>{index + 1}</th>
                            ))}
                          </tr>
                        </thead>
                        <tbody>
                          <tr>
                            <td>Text</td>
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
                              </td>
                            ))}
                          </tr>
                          <tr>
                            <td>Input</td>
                            {tableData.map((data, index) => (
                              <td key={index}>
                                <input
                                  type="text"
                                  class="form-control"
                                  value={data.textValue}
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
              </div>
            </form>
            {/* </form> */}
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
export default Worktimesheet