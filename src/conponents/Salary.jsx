import React from 'react'
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";

function Salary() {
    return (
        <>
            <div class="wrapper">
                <div class="content-wrapper">
                    <ol class="breadcrumb">
                        <li class="breadcrumb-item"><i class="fas fa-home"></i> <a href="index.php">หน้าหลัก</a></li>
                        <li class="breadcrumb-item"><a href="#"> ระบบบริหารจัดการข้อมูล</a></li>
                        <li class="breadcrumb-item active">ข้อมูลเงินเดือน</li>
                    </ol>
                    <div class="content-header">
                        <div class="container-fluid">
                            <div class="row mb-2">
                                <h1 class="m-0"><i class="far fa-arrow-alt-circle-right"></i> ข้อมูลเงินเดือน</h1>
                            </div>
                        </div>
                    </div>
                    <section class="content">
                        <div class="container-fluid">
                            <form action="">
                                <h2 class="head-title">ผลลัพท์การค้นหาพนักงาน</h2>
                                <h2 class="title">หน่วยงานสังกัด</h2>
                                <section class="Frame">
                                    <div class="col-md-12">
                                        <div class="row">
                                            <div class="col-md-4">
                                                <div class="form-group">
                                                    <label>รหัสพนักงาน</label>
                                                    <input type="" class="form-control" id="" placeholder="รหัสพนักงาน" />
                                                </div>
                                            </div>
                                            <div class="col-md-4">
                                                <div class="form-group">
                                                    <label>ตำแหน่ง</label>
                                                    <input type="" class="form-control" id="" placeholder="ตำแหน่ง" />
                                                </div>
                                            </div>
                                            <div class="col-md-4">
                                                <div class="form-group">
                                                    <label>แผนก</label>
                                                    <select class="form-control">
                                                        <option>แผนก 1</option>
                                                        <option>option 2</option>
                                                        <option>option 3</option>
                                                        <option>option 4</option>
                                                        <option>option 5</option>
                                                    </select>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="row">
                                            <div class="col-md-4">
                                                <div class="form-group">
                                                    <label>หน่วยงาน</label>
                                                    <select class="form-control">
                                                        <option>ไม่สังกัดหน่วยงาน</option>
                                                        <option>option 2</option>
                                                        <option>option 3</option>
                                                        <option>option 4</option>
                                                        <option>option 5</option>
                                                    </select>
                                                </div>
                                            </div>
                                            <div class="col-md-4">
                                                <div class="form-group">
                                                    <label>ประเภทการจ้าง</label>
                                                    <select class="form-control">
                                                        <option>รายวัน</option>
                                                        <option>option 2</option>
                                                        <option>option 3</option>
                                                        <option>option 4</option>
                                                        <option>option 5</option>
                                                    </select>
                                                </div>
                                            </div>
                                            <div class="col-md-4">
                                                <div class="form-group">
                                                    <label>ลงบัญชีเป็นค่าใช้จ่าย</label>
                                                    <div class="" style={{ marginTop: "10px"}} >
                                                        <div class="icheck-primary d-inline">
                                                            <input type="radio" id="radioPrimary1" name="r1" checked=""/> ทางตรง
                                                        </div>
                                                        <div class="icheck-primary d-inline">
                                                            <input type="radio" id="radioPrimary2" name="r1"/> ทางอ้อม
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </section>
                            </form>
                        </div>
                    </section>
                </div>
            </div>
        </>
    )
}

export default Salary