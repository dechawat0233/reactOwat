// import React from 'react'
import React, { useState, useEffect } from 'react';
import EmployeesSelected from './EmployeesSelected';

import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

function SocialSecurity() {

    const options = [
        { value: 'option1', label: 'Option 17' },
        { value: 'option2', label: 'Option 92' },
        { value: 'option3', label: 'Option 34' },
        // Add more options as needed
    ];

    // Step 4: Use useState to manage the selected option
    const [selectedOption, setSelectedOption] = useState('');
    const [startjob, setStartjob] = useState(''); //วันที่เริ่มงาน
    const [idPerson, setIdPerson] = useState(''); //เลขบัตรประชาชน
    const [name, setName] = useState(''); //ชื่อ
    const [salary, setSalary] = useState(''); //เงินเดือน
    const [minus, setMinus] = useState('5'); //หัห
    const [socialsecurity, setSocialSecurity] = useState(''); //หักประกันสังคม

    const [minusemployer, setMinusEmployer] = useState('5'); //หัห
    const [socialsecurityemployer, setSocialSecurityEmployer] = useState(''); //หักประกันสังคม


    useEffect(() => {
        if (salary === '') {
            setSocialSecurity(0);
        } else {
            const parsedSalary = parseFloat(salary);
            const parsedMinus = parseFloat(minus) / 100; // Convert the minus percentage to a decimal
            if (parsedSalary < 1650) {
                setSocialSecurity(1650 * parsedMinus);
            } else if (parsedSalary >= 1650 && parsedSalary <= 15000) {
                setSocialSecurity(parsedSalary * parsedMinus);
            } else {
                setSocialSecurity(15000 * parsedMinus);
            }
        }
    }, [salary, minus]);

    useEffect(() => {
        if (salary === '') {
            setSocialSecurityEmployer(0);
        } else {
            const parsedSalary = parseFloat(salary);
            const parsedMinusEmpoyor = parseFloat(minusemployer) / 100; // Convert the minus percentage to a decimal
            if (parsedSalary < 1650) {
                setSocialSecurityEmployer(1650 * parsedMinusEmpoyor);
            } else if (parsedSalary >= 1650 && parsedSalary <= 15000) {
                setSocialSecurityEmployer(parsedSalary * parsedMinusEmpoyor);
            } else {
                setSocialSecurityEmployer(15000 * parsedMinusEmpoyor);
            }
        }
    }, [salary, minusemployer]);

    // Step 5: Event handler to update the selected option
    const handleOptionChange = (event) => {
        setSelectedOption(event.target.value);
    };
    const handleStartDateChange = (date) => {
        setStartjob(date);
    };
    function onEmployeeSelect(empSelect) {
        setStartjob(new Date(empSelect.startjob));
    }
    return (
        <body class="hold-transition sidebar-mini">
            <div class="wrapper">
                <div class="content-wrapper">
                    {/* <!-- Content Header (Page header) --> */}
                    <ol class="breadcrumb">
                        <li class="breadcrumb-item"><i class="fas fa-home"></i> <a href="index.php">หน้าหลัก</a></li>
                        <li class="breadcrumb-item"><a href="#"> ระบบบริหารจัดการข้อมูล</a></li>
                        <li class="breadcrumb-item active">ข้อมูลเงินเดือน</li>
                    </ol>
                    <div class="content-header">
                        <div class="container-fluid">
                            <div class="row mb-2">
                                <h1 class="m-0"><i class="far fa-arrow-alt-circle-right"></i> ประกันสังคม</h1>
                            </div>
                        </div>
                    </div>
                    {/* <!-- /.content-header -->
                    <!-- Main content --> */}
                    <section class="content">
                        <div class="container-fluid">
                            <form action="">
                                <h2 class="title">รายละเอียดประกันสังคม</h2>
                                <div class="form-group row">
                                    <div class="col-md-9">
                                        <section class="Frame">
                                            <div class="form-group row">
                                                <label class="col-md-3 ">หักประกันสังคม</label>
                                                <div class="col-md-5">
                                                    <div class="icheck-primary d-inline">
                                                        <input type="radio" id="radioPrimary1" name="r1" /> หักประกันสังคม
                                                    </div>
                                                    <div class="icheck-primary d-inline">
                                                        <input type="radio" id="radioPrimary2" name="r1" /> ไม่หักประกันสังคม
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="form-group row">
                                                <label class="col-md-3 col-form-label">วิธีหัก</label>
                                                <div class="col-md-5">
                                                    <select class="form-control" value={selectedOption} onChange={handleOptionChange}>
                                                        <option>พนักงานจ่ายเอง</option>
                                                        {options.map((option) => (
                                                            <option key={option.value} value={option.value}>
                                                                {option.label}
                                                            </option>
                                                        ))}
                                                    </select>
                                                </div>
                                            </div>

                                            <div class="form-group row">
                                                <label class="col-md-3 col-form-label">วันที่เริ่มงาน</label>
                                                <div class="col-md-5">
                                                    <div style={{ position: 'relative', zIndex: 9999 }}>
                                                        <DatePicker id="startjob" name="startjob"
                                                            className="form-control"
                                                            popperClassName="datepicker-popper"
                                                            selected={startjob}
                                                            onChange={handleStartDateChange}
                                                            dateFormat="dd/MM/yyyy" />
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="form-group row">
                                                <label class="col-md-3 col-form-label">เลขที่บัตรประชาชน</label>
                                                <div class="col-md-5">
                                                    <input type="" class="form-control" id="" placeholder="เลขที่บัตรประชาชน" value={idPerson} onChange={(e) => setIdPerson(e.target.value)} />
                                                </div>
                                            </div>
                                            <div class="form-group row">
                                                <label class="col-md-3 col-form-label">ชื่อ - นามสกุล</label>
                                                <div class="col-md-5">
                                                    <input type="" class="form-control" id="" placeholder="ชื่อ - นามสุกล" value={name} onChange={(e) => setName(e.target.value)} />
                                                </div>
                                            </div>
                                            <div class="form-group row">
                                                <label class="col-md-3 col-form-label">เงินเดือน</label>
                                                <div class="col-md-5">
                                                    <input type="" class="form-control" id="" placeholder="เงินเดือน" value={salary} onChange={(e) => setSalary(e.target.value)} />
                                                </div>
                                                <label class="col-md-1 col-form-label">หัก%</label>
                                                <div class="col-md-2">
                                                    <input type="" class="form-control" id="" placeholder="เงินเดือน" value={minus} onChange={(e) => setMinus(e.target.value)} />
                                                </div>
                                                <label class="col-md-1 col-form-label">%</label>
                                            </div>
                                            <div class="form-group row">
                                                <label class="col-md-3 col-form-label">หักประกันสังคม</label>
                                                <div class="col-md-5">
                                                    <input type="" class="form-control" id="" placeholder="หักประกันสังคม" value={socialsecurity} onChange={(e) => setSocialSecurity(e.target.value)} />
                                                </div>
                                            </div>
                                            <h4>นายจ้าง</h4>
                                            <div class="form-group row">
                                                <label class="col-md-3 col-form-label">หักประกันสังคม</label>
                                                <div class="col-md-5">
                                                    <input type="" class="form-control" id="" placeholder="หักประกันสังคม" value={socialsecurityemployer} onChange={(e) => setSocialSecurityEmployer(e.target.value)} />
                                                </div>
                                                <label class="col-md-1 col-form-label">หัก%</label>
                                                <div class="col-md-2">
                                                    <input type="" class="form-control" id="" placeholder="เงินเดือน" value={minusemployer} onChange={(e) => setMinusEmployer(e.target.value)} />
                                                </div>
                                                <label class="col-md-1 col-form-label">%</label>
                                            </div>

                                        </section>
                                        {/* <!--Frame--> */}
                                    </div>
                                    <div class="col-md-3">
                                        <section class="Frame"><EmployeesSelected /></section>
                                    </div>
                                </div>

                                <h2 class="title">รหัสสถานรักษาพยาบาลที่พนักงานต้องการ</h2>
                                <div class="form-group row">
                                    <div class="col-md-9">
                                        <section class="Frame">
                                            <div class="form-group row">
                                                <label class="col-md-3 col-form-label">ชื่อสถานรักษาพยาลบาลปัจจุบัน</label>
                                                <div class="col-md-5">
                                                    <select class="form-control">
                                                        <option>ยังไม่ได้ระบุ</option>
                                                        <option>option 2</option>
                                                        <option>option 3</option>
                                                        <option>option 4</option>
                                                        <option>option 5</option>
                                                    </select>
                                                </div>
                                            </div>
                                            <div class="form-group row">
                                                <label class="col-md-3 col-form-label">ต้องการเลือกลำดับที่ 1</label>
                                                <div class="col-md-5">
                                                    <input type="" class="form-control" id="" placeholder="" />
                                                </div>
                                            </div>
                                            <div class="form-group row">
                                                <label class="col-md-3 col-form-label">ต้องการเลือกลำดับที่ 2</label>
                                                <div class="col-md-5">
                                                    <input type="" class="form-control" id="" placeholder="" />
                                                </div>
                                            </div>
                                            <div class="form-group row">
                                                <label class="col-md-3 col-form-label">ต้องการเลือกลำดับที่ 3</label>
                                                <div class="col-md-5">
                                                    <input type="" class="form-control" id="" placeholder="" />
                                                </div>
                                            </div>
                                        </section>
                                        {/* <!--Frame--> */}
                                    </div>
                                </div>
                                {/* <h2 class="title">เฉพาะกรณีพนักงานและบริษัทสมทบอัตราต่างกัน</h2>
                                <div class="form-group row">
                                    <div class="col-md-9">
                                        <section class="Frame">
                                            <div class="form-group row">
                                                <label class="col-md-3 col-form-label">อัตราพนักงานหักเข้ากองทุนประกันสังคม</label>
                                                <div class="col-md-5">
                                                    <input type="" class="form-control" id="" placeholder="" value='5' />
                                                </div>
                                                <label class="col-form-label">%</label>
                                            </div>
                                            <div class="form-group row">
                                                <label class="col-md-3 col-form-label">อัตราบริษัทสมทบกองทุนประกันสังคม</label>
                                                <div class="col-md-5">
                                                    <input type="" class="form-control" id="" placeholder="" />
                                                </div>
                                                <label class="col-form-label">%</label>
                                            </div>
                                        </section>
                                    </div>
                                </div> */}
                                <h2 class="title">เฉพาะกรณีไม่ได้เป็นพนักงานตั้งแต่ต้นปี</h2>
                                <div class="form-group row">
                                    <div class="col-md-9">
                                        <section class="Frame">
                                            <div class="form-group row">
                                                <label class="col-md-3 col-form-label">ยอดเงินประกันสังคมถูกหักก่อนเป็นพนักงาน</label>
                                                <div class="col-md-5">
                                                    <input type="" class="form-control" id="" placeholder="" />
                                                </div>
                                            </div>
                                        </section>
                                        {/* <!--Frame--> */}
                                    </div>
                                </div>
                                <h2 class="title">เฉพาะกรณีที่ไม่ได้ใช้โปรแกรมคำนวณเงินเดือนตั้งแต่ต้นปี</h2>
                                <div class="form-group row">
                                    <div class="col-md-9">
                                        <section class="Frame">
                                            <div class="form-group row">
                                                <label class="col-md-3 col-form-label">ค่าจ้างก่อนใช้โปรแกรม</label>
                                                <div class="col-md-5">
                                                    <input type="" class="form-control" id="" placeholder="" />
                                                </div>
                                                <label class="col-form-label">%</label>
                                            </div>
                                            <div class="form-group row">
                                                <label class="col-md-3 col-form-label">ยอดเงินประกันสังคมถูกหักก่อนใช้โปรแกรม</label>
                                                <div class="col-md-5">
                                                    <input type="" class="form-control" id="" placeholder="" />
                                                </div>
                                                <label class="col-form-label">%</label>
                                            </div>
                                            <div class="form-group row">
                                                <label class="col-md-3 col-form-label">ยอดเงินประกันสังคมบริษัทสมทบก่อนใช้โปรแกรม</label>
                                                <div class="col-md-5">
                                                    <input type="" class="form-control" id="" placeholder="" />
                                                </div>
                                                <label class="col-form-label">%</label>
                                            </div>
                                        </section>
                                        {/* <!--Frame--> */}
                                    </div>
                                </div>
                                <div class="line_btn">
                                    <button type="submit" class="btn b_save"><i class="nav-icon fas fa-save"></i> &nbsp;บันทึก</button>
                                    <button type="reset" class="btn clean"><i class="far fa-window-close"></i> &nbsp;ยกเลิก</button>
                                </div>
                            </form>
                        </div>
                        {/* <!-- /.container-fluid --> */}
                    </section>
                    {/* <!-- /.content --> */}
                </div>
            </div>
        </body>
    )
}

export default SocialSecurity