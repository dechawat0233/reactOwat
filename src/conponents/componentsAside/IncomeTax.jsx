import React from 'react'
import EmployeesSelected from './EmployeesSelected';
import '../editwindowcss.css';
import TestPDF from './TestPDF';

function IncomeTax() {
    return (
        <body class="hold-transition sidebar-mini" className='editlaout'>
            <div class="wrapper">
                <div class="content-wrapper">
                    {/* <!-- Content Header (Page header) --> */}
                    <ol class="breadcrumb">
                        <li class="breadcrumb-item"><i class="fas fa-home"></i> <a href="index.php">หน้าหลัก</a></li>
                        <li class="breadcrumb-item"><a href="#">ระบบบริหารจัดการข้อมูล</a></li>
                        <li class="breadcrumb-item active">ภาษีเงินได้</li>
                    </ol>
                    <div class="content-header">
                        <div class="container-fluid">
                            <div class="row mb-2">
                                <h1 class="m-0"><i class="far fa-arrow-alt-circle-right"></i> ภาษีเงินได้</h1>
                            </div>
                        </div>
                    </div>
                    {/* <!-- /.content-header -->
                    <!-- Main content --> */}
                    <section class="content">
                        <div class="container-fluid">
                            <h2 class="title"> ภาษีเงินได้</h2>
                            <div class="row">
                                <div class="col-md-9">
                                    <section class="Frame">
                                        <div class="col-md-12">
                                            <form action="">
                                                <div class="row">
                                                    <div class="col-md-4">
                                                        <div class="form-group">
                                                            <label>วันที่เริ่มงาน</label>
                                                            <div class="input-group date" id="reservationdate" data-target-input="nearest">
                                                                <input type="text" class="form-control datetimepicker-input" data-target="#reservationdate" />
                                                                <div class="input-group-append" data-target="#reservationdate" data-toggle="datetimepicker">
                                                                    <div class="input-group-text"><i class="fa fa-calendar-alt"></i></div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div class="col-md-4">
                                                        <div class="form-group">
                                                            <label>วันที่บรรจุงาน</label>
                                                            <div class="input-group date" id="reservationdate2" data-target-input="nearest">
                                                                <input type="text" class="form-control datetimepicker-input" data-target="#reservationdate2" />
                                                                <div class="input-group-append" data-target="#reservationdate2" data-toggle="datetimepicker">
                                                                    <div class="input-group-text"><i class="fa fa-calendar-alt"></i></div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div class="col-md-4">
                                                        <div class="form-group">
                                                            <label>อัตราเงินจ้าง</label>
                                                            <input type="" class="form-control" id="" placeholder="อัตราเงินจ้าง" />
                                                        </div>
                                                    </div>
                                                </div>
                                                {/* <!-- row --> */}
                                                <div class="line_btn_search">
                                                    <button type="submit" value="Submit" class="btn_search"><i class="fa fa-search"></i>  &nbsp;ค้นหา</button>
                                                </div>
                                            </form>
                                        </div>
                                    </section>
                                </div>
                                <div class="col-md-3">
                                    <section class="Frame"><EmployeesSelected /></section>
                                    {/* <TestPDF /> */}
                                </div>
                            </div>
                        </div>
                        {/* <!-- /.container-fluid --> */}
                    </section>
                    {/* <!-- /.content --> */}
                </div>
            </div>
        </body>
    )
}

export default IncomeTax