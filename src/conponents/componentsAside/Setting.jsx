import endpoint from '../../config';

import axios from 'axios';
import React, { useEffect, useState } from 'react';

import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

import EmployeesSelected from './EmployeesSelected';

// import { DayPilotCalendar, DayPilotNavigator } from "@daypilot/daypilot-lite-react";
// import "./CalendarStyles.css";
import Calendar from 'react-calendar';


function Setting() {
    const [newWorkplace, setNewWorkplace] = useState(true);

    //Workplace data
    const [workplaceId, setWorkplaceId] = useState(''); //รหัสหน่วยงาน
    const [workplaceName, setWorkplaceName] = useState(''); //ชื่อหน่วยงาน
    const [workplaceArea, setWorkplaceArea] = useState(''); //สถานที่ปฏิบัติงาน
    const [workOfWeek, setWorkOfWeek] = useState(''); //วันทำงานต่อสัปดาห์
    const [workkStart1, setWorkkStart1] = useState(''); //เวลาเริ่มกะเช้า
    const [workEnd1, setWorkEnd1] = useState(''); //เวลาออกกะเช้า
    const [workkStart2, setWorkkStart2] = useState(''); //เวลาเข้ากะบ่าย
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


    //set data to form
    function handleClickResult(workplace ) {
setNewWorkplace(false);

setWorkplaceId(workplace.workplaceId);
setWorkplaceName(workplace.workplaceName);
setWorkplaceArea(workplace.workplaceArea);
setWorkOfWeek(workplace.workOfWeek);
setWorkkStart1(workplace.workkStart1);
setWorkEnd1(workplace.workEnd1);
setWorkkStart2(workplace.workkStart2);
setWorkEnd2(workplace.workEnd2);
setWorkkStart3(workplace.workkStart3);
setWorkEnd3(workplace.workEnd3);
setWorkOfHour(workplace.workOfHour);
setWorkOfOT(workplace.workOfOT);

setWorkRate(workplace.workRate);
setWorkRateOT(workplace.workRateOT);
setWorkTotalPeople(workplace.workTotalPeople);
setWorkRateDayoff(workplace.workRateDayoff);
setWorkRateDayoffHour(workplace.workRateDayoffHour);
setWorkplaceAddress(workplace.workplaceAddress);

}

//data for search
const [searchWorkplaceId, setSearchWorkplaceId] = useState(''); //รหัสหน่วยงาน
const [searchWorkplaceName, setSearchWorkplaceName] = useState(''); //ชื่อหน่วยงาน
const [searchResult , setSearchResult] = useState([]);

    async function handleSearch(event) {
        event.preventDefault();
// alert(searchWorkplaceId);
        // alert(searchWorkplaceName);

//get value from form search        
        const data = {
            searchWorkplaceId : searchWorkplaceId,
            searchWorkplaceName : searchWorkplaceName
        };

        try {
            const response = await axios.post(endpoint + '/workplace/search', data);
         setSearchResult(response.data.workplaces);
            // setMessage(`ผลการค้นหา ${response.data.employees.length} รายการ`);
// alert(response.data.workplaces.length);
if(response.data.workplaces.length <1 ){
    window.location.reload();

}
          } catch (error) {
            // setMessage('ไม่พบผลการค้นหา กรุณาตรวจสอบข้อมูลที่ใช้ในการค้นหาอีกครั้ง');
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
            workkStart1: workkStart1,
            workEnd1: workEnd1,
            workkStart2: workkStart2,
            workEnd2: workEnd2,
            workStart3: workStart3,
            workEnd3: workEnd3,
            workOfHour: workOfHour,
            workOfOT: workOfOT,
            workRate: workRate,
            workRateOT: workRateOT,
            workTotalPeople: workTotalPeople,
            workRateDayoff: workRateDayoff,
            workRateDayoffHour: workRateDayoffHour,
            workplaceAddress: workplaceAddress
        };


        //check create or update Employee
        if (newWorkplace) {
            // alert('Create Workplace');
            try {
                const response = await axios.post(endpoint + '/workplace/create', data);
                // setEmployeesResult(response.data.employees);

            } catch (error) {
                alert('กรุณาตรวจสอบข้อมูลในช่องกรอกข้อมูล');
                // window.location.reload();

            }

        } else {

        }

    }

    return (
        <body class="hold-transition sidebar-mini">
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
                    {/* <!-- /.content-header -->
                    <!-- Main content --> */}
                    <section class="content">
                        <div class="container-fluid">



                            <h2 class="title">ตั้งค่าหน่วยงาน</h2>
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
                                                            onClick={() => handleClickResult(workplace) }
                                                            >
รหัส {workplace.workplaceId} หน่วยงาน {workplace.workplaceName}
                                                            </li>
                                                        )) }


                                                    </ul>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </section>
                            {/* <!--Frame--> */}

                            <form onSubmit={handleManageWorkplace}>
                                <h2 class="title">ตั้งค่าหน่วยงาน</h2>
                                <section class="Frame">
                                    <div class="col-md-12">
                                        <div class="row">
                                            <div class="col-md-6">
                                                <div class="form-group">
                                                    <label role="workplaceId">รหัสหน่วยงาน</label>
                                                    <input type="text" class="form-control" id="workplaceId" placeholder="รหัสหน่วยงาน" value={workplaceId} onChange={(e) => setWorkplaceId(e.target.value)} />
                                                </div>
                                            </div>
                                            <div class="col-md-6">
                                                <div class="form-group">
                                                    <label role="workplaceName">ชื่อหน่วยงาน</label>
                                                    <input type="text" class="form-control" id="workplaceName" placeholder="ชื่อหน่วยงาน" value={workplaceName} onChange={(e) => setWorkplaceName(e.target.value)} />
                                                </div>
                                            </div>

                                        </div>
                                        <div class="row">
                                            <div class="col-md-6">
                                                <div class="form-group">
                                                    <label role="workplaceArea">สถานที่ปฏิบัติงาน</label>
                                                    <input type="text" class="form-control" id="workplaceArea" placeholder="สถานที่ปฏิบัติงาน" value={workplaceArea} onChange={(e) => setWorkplaceArea(e.target.value)} />
                                                </div>
                                            </div>
                                            <div class="col-md-6">
                                                <div class="form-group">
                                                    <label role="workOfWeek">จำนวนวันทำงานต่อสัปดาห์</label>
                                                    <input type="text" class="form-control" id="workOfWeek" placeholder="จำนวนวันทำงานต่อสัปดาห์" value={workOfWeek} onChange={(e) => setWorkOfWeek(e.target.value)} />
                                                </div>
                                            </div>

                                        </div>

                                    </div>
                                </section>
                                {/* <!--Frame--> */}
                                <h2 class="title">เวลา เข้า-ออก งาน</h2>
                                <div class="row">
                                    <div class="col-md-4">
                                        <section class="Frame">
                                            <label>กะเช้า</label>
                                            <div class="col-md-12">
                                                <div class="row">
                                                    <div class="col-md-6">
                                                        <div class="form-group">
                                                            <label role="workkStart1">เวลาเข้างาน</label>
                                                            <input type="text" class="form-control" id="workkStart1" placeholder="เวลาเข้างาน" value={workkStart1} onChange={(e) => setWorkkStart1(e.target.value)} />
                                                        </div>
                                                    </div>
                                                    <div class="col-md-6">
                                                        <div class="form-group">
                                                            <label role="workEnd1">เวลาออกงาน</label>
                                                            <input type="text" class="form-control" id="workEnd1" placeholder="เวลาออกงาน" value={workEnd1} onChange={(e) => setWorkEnd1(e.target.value)} />
                                                        </div>
                                                    </div>
                                                </div>
                                                {/* <!--row--> */}
                                            </div>
                                            {/* <!--col-md-12--> */}
                                        </section>
                                        {/* <!--Frame--> */}
                                    </div>
                                    <div class="col-md-4">
                                        <section class="Frame">
                                            <label>กะบ่าย</label>
                                            <div class="col-md-12">
                                                <div class="row">
                                                    <div class="col-md-6">
                                                        <div class="form-group">
                                                            <label role="workkStart2">เวลาเข้างาน</label>
                                                            <input type="text" class="form-control" id="workkStart2" placeholder="เวลาเข้างาน" value={workkStart2} onChange={(e) => setWorkkStart2(e.target.value)} />
                                                        </div>
                                                    </div>
                                                    <div class="col-md-6">
                                                        <div class="form-group">
                                                            <label role="workEnd2">เวลาออกงาน</label>
                                                            <input type="text" class="form-control" id="workEnd2" placeholder="เวลาออกงาน" value={workEnd2} onChange={(e) => setWorkEnd2(e.target.value)} />
                                                        </div>
                                                    </div>
                                                </div>
                                                {/* <!--row--> */}
                                            </div>
                                            {/* <!--col-md-12--> */}
                                        </section>
                                        {/* <!--Frame--> */}
                                    </div>
                                    <div class="col-md-4">
                                        <section class="Frame">
                                            <label>กะดึก</label>
                                            <div class="col-md-12">
                                                <div class="row">
                                                    <div class="col-md-6">
                                                        <div class="form-group">
                                                            <label role="workStart3">เวลาเข้างาน</label>
                                                            <input type="text" class="form-control" id="workStart3" placeholder="เวลาเข้างาน" value={workStart3} onChange={(e) => setWorkStart3(e.target.value)} />
                                                        </div>
                                                    </div>
                                                    <div class="col-md-6">
                                                        <div class="form-group">
                                                            <label role="workEnd3">เวลาออกงาน</label>
                                                            <input type="text" class="form-control" id="workEnd3" placeholder="เวลาออกงาน" value={workEnd3} onChange={(e) => setWorkEnd3(e.target.value)} />
                                                        </div>
                                                    </div>
                                                </div>
                                                {/* <!--row--> */}
                                            </div>
                                            {/* <!--col-md-12--> */}
                                        </section>
                                        {/* <!--Frame--> */}
                                    </div>
                                </div>

                                <h2 class="title">เวลาทำงาน</h2>
                                <section class="Frame">
                                    <div class="row">
                                        <div class="col-md-4">
                                            <div class="form-group">
                                                <label role="workOfHour">ชั่วโมงทำงาน</label>
                                                <input type="text" class="form-control" id="workOfHour" placeholder="ชั่วโมงทำงาน" value={workOfHour} onChange={(e) => setWorkOfHour(e.target.value)} />
                                            </div>
                                        </div>
                                        <div class="col-md-4">
                                            <div class="form-group">
                                                <label role="workOfOT">ชั่วโมง OT</label>
                                                <input type="text" class="form-control" id="workOfOT" placeholder="ชั่วโมง OT" value={workOfOT} onChange={(e) => setWorkOfOT(e.target.value)} />
                                            </div>
                                        </div>
                                        <div class="col-md-4">
                                            <div class="form-group">
                                                <label >ปฏิทินวันทำงาน</label>
                                                <input type="" class="form-control" id="" placeholder="ปฏิทินวันทำงาน" />
                                            </div>
                                        </div>
                                    </div>
                                </section>
                                {/* <!--Frame--> */}

                                <h2 class="title">ค่าจ้าง</h2>
                                <section class="Frame">
                                    <div class="row">
                                        <div class="col-md-4">
                                            <div class="form-group">
                                                <label role="workRate">อัตราค่าจ้าง รายวัน</label>
                                                <input type="text" class="form-control" id="workRate" placeholder="อัตราค่าจ้าง รายวัน" value={workRate} onChange={(e) => setWorkRate(e.target.value)} />
                                            </div>
                                        </div>
                                        <div class="col-md-4">
                                            <div class="form-group">
                                                <label role="workRateOT">อัตราค่าจ้าง OT รายชั่วโมง</label>
                                                <input type="text" class="form-control" id="workRateOT" placeholder="อัตราค่าจ้าง OT รายชั่วโมง" value={workRateOT} onChange={(e) => setWorkRateOT(e.target.value)} />
                                            </div>
                                        </div>
                                        <div class="col-md-4">
                                            <div class="form-group">
                                                <label role="workTotalPeople">จำนวนพนักงานที่ปฏิบัติงาน</label>
                                                <input type="text" class="form-control" id="workTotalPeople" placeholder="จำนวนพนักงานที่ปฏิบัติงาน" value={workTotalPeople} onChange={(e) => setWorkTotalPeople(e.target.value)} />
                                            </div>
                                        </div>
                                    </div>
                                    <div class="row">
                                        <div class="col-md-4">
                                            <div class="form-group">
                                                <label role="workRateDayoff">อัตราค่าจ้างวันหยุดนักขัตฤกษ์ รายวัน</label>
                                                <input type="text" class="form-control" id="workRateDayoff" placeholder="อัตราค่าจ้างวันหยุดนักขัตฤกษ์ รายวัน" value={workRateDayoff} onChange={(e) => setWorkRateDayoff(e.target.value)} />
                                            </div>
                                        </div>
                                        <div class="col-md-4">
                                            <div class="form-group">
                                                <label role="workRateDayoffHour">อัตราค่าจ้างวันหยุดนักขัตฤกษ์ รายชั่วโมง</label>
                                                <input type="text" class="form-control" id="workRateDayoffHour" placeholder="อัตราค่าจ้างวันหยุดนักขัตฤกษ์ รายชั่วโมง" value={workRateDayoffHour} onChange={(e) => setWorkRateDayoffHour(e.target.value)} />
                                            </div>
                                        </div>
                                    </div>
                                </section>
                                {/* <!--Frame--> */}

                                <h2 class="title">ที่อยู่หน่วยงาน</h2>
                                <section class="Frame">
                                    <div class="row">
                                        <div class="col-md-6">
                                            <div class="form-group">
                                                <label role="workplaceAddress">ที่อยู่หน่วยงาน</label>
                                                <input type="text" class="form-control" id="workplaceAddress" placeholder="ที่อยู่หน่วยงาน" value={workplaceAddress} onChange={(e) => setWorkplaceAddress(e.target.value)} />
                                            </div>
                                        </div>
                                    </div>
                                </section>
                                {/* <!--Frame--> */}
                                <div class="line_btn">
                                    {newWorkplace ? (
                                        <button class="btn b_save"><i class="nav-icon fas fa-save"></i> &nbsp;สร้างหน่วยงานใหม่</button>

                                    ) : (
                                        <button class="btn b_save"><i class="nav-icon fas fa-save"></i> &nbsp;บันทึก</button>

                                    )}

                                    <button class="btn clean"><i class="far fa-window-close"></i> &nbsp;ยกเลิก</button>
                                </div>

                            </form>
                        </div>
                        {/* <!-- /.container-fluid --> */}
                    </section>
                    {/* <!-- /.content --> */}
                </div>

            </div>
        </body>
    );
}

export default Setting