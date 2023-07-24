import axios from 'axios';
import React, { useEffect, useState } from 'react';

function Salarysummary() {
    const styles = {
        th: {
            minWidth: "5rem"
        }
    };
    return (
        // <div>
        <body class="hold-transition sidebar-mini">
            <div class="wrapper">
                <div class="content-wrapper">
                    {/* <!-- Content Header (Page header) --> */}
                    <ol class="breadcrumb">
                        <li class="breadcrumb-item"><i class="fas fa-home"></i> <a href="index.php">หน้าหลัก</a></li>
                        <li class="breadcrumb-item"><a href="#"> ระบบเงินเดือน</a></li>
                        <li class="breadcrumb-item active">สรุปเงินเดือน</li>
                    </ol>
                    <div class="content-header">
                        <div class="container-fluid">
                            <div class="row mb-2">
                                <h1 class="m-0"><i class="far fa-arrow-alt-circle-right"></i> สรุปเงินเดือน</h1>
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
                                            <div class="row">
                                                <div class="col-md-6">
                                                    <div class="form-group">
                                                        <label role="formsettime">ค้นหาด้วย</label>
                                                        <select id="formsettime" name="formsettime" class="form-control" >
                                                            <option value="workplaceId">รหัสหน่วยงาน</option>
                                                            <option value="agencytime">ชื่อหน่วยงาน</option>
                                                            <option value="employeeId">รหัสพนักงาน</option>
                                                            <option value="persontime">ชื่อพนักงาน</option>
                                                        </select>
                                                    </div>
                                                </div>
                                                <div class="col-md-6">
                                                    <div class="form-group">
                                                        <label role="formsettime">ชื่อ</label>
                                                        <input type='text' class="form-control" name='search' value='' />
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="row">
                                                <div class="col-md-12">
                                                    <div class="form-group">
                                                        <button class="btn b_save"><i class="nav-icon fas fa-search"></i> &nbsp; ค้าหา</button>
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="d-flex justify-content-center">
                                                <h2 class="title">ผลลัพธ์</h2>
                                            </div>
                                            <div class="d-flex justify-content-center">
                                                <div class="row">

                                                    <div class="col-md-12">
                                                        <div class="form-group">
                                                            <ul style={{ listStyle: 'none', marginLeft: "-2rem" }}>
                                                                <li >
                                                                    ไทยยั่งยืน
                                                                </li>
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
                                ชื่อ : ไทยยั่งยืน
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
                                            <table id="" class="table table-bordered ">
                                                <thead>
                                                    <tr>
                                                        <th style={styles.th} id="test">จำนวนวันทำงาน</th>
                                                        <th style={styles.th} id="test">เป็นเงิน</th>
                                                        <th style={styles.th} id="test">ค่ารถ</th>
                                                        <th style={styles.th} id="test">ค่าอาหาร</th>
                                                        <th style={styles.th} id="test">เบี้ยขยัน</th>
                                                        <th style={styles.th} id="test">นักขัติฤกษ์</th>
                                                        <th style={styles.th} id="test">เงินพิเศษอื่นๆ</th>
                                                        <th style={styles.th} id="test">ค่าโทรศัพท์</th>
                                                        <th style={styles.th} id="test">เงินประจำตำแหน่ง</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    <tr>
                                                        <td>22 วัน</td>
                                                        <td>7200</td>
                                                        <td>1000</td>
                                                        <td>500</td>
                                                        <td>300</td>
                                                        <td>300</td>
                                                        <td>1000</td>
                                                        <td>500</td>
                                                        <td>1000</td>
                                                    </tr>
                                                    <tr>
                                                        <td>66</td>
                                                        <td>3000</td>
                                                    </tr>
                                                    <tr>
                                                        <td>เป็นเงินทั้งสิ้น</td>
                                                        <td>12800</td>
                                                    </tr>
                                                </tbody>
                                            </table>
                                        </div>
                                    </section>
                                </div>
                            </div>
                            หัก<br />
                            <div class="row">
                                <div class="col-md-9">
                                    <section class="Frame">
                                        <div class="container" style={{ overflowX: 'scroll' }}>
                                            <table id="" class="table table-bordered ">
                                                <thead>
                                                    <tr>
                                                        <th style={styles.th} id="test">หักอื่นๆ</th>
                                                        <th style={styles.th} id="test">หักภาษี</th>
                                                        <th style={styles.th} id="test">หัก ปกส</th>
                                                        <th style={styles.th} id="test">ธรรมเนียม ธ.</th>
                                                        <th style={styles.th} id="test">คืนเงินอื่นๆ</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    <tr>
                                                        <td>0</td>
                                                        <td>0</td>
                                                        <td>399</td>
                                                        <td>0</td>
                                                        <td>0</td>
                                                    </tr>
                                                    <tr>
                                                        <td>เป็นเงินทั้งสิ้น</td>
                                                        <td>399</td>
                                                    </tr>
                                                    <tr>
                                                        <td>สุทธิ</td>
                                                        <td>12101</td>
                                                    </tr>
                                                </tbody>
                                            </table>
                                        </div>
                                    </section>
                                </div>
                            </div>
                        </form>
                        {/* </form> */}
                    </section>
                    {/* <!-- /.content --> */}
                </div>
            </div >
        </body >
    )
}

export default Salarysummary