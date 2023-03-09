import React from 'react'

function SocialSecurity() {
    return (
        <>
            <body class="hold-transition sidebar-mini">
                {/* <?php include("include/header.php");?> */}
                <div class="wrapper">
                    {/* <!-- Navbar -->
                <?php include("include/top.php");?>
                <!-- /.navbar -->
                <!-- Main Sidebar Container -->
                <?php include("include/aside_left.php");?> */}
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
                                    <section class="Frame">
                                        <div class="row">
                                            <div class="form-group form-check">
                                                <input class="form-check-input" type="checkbox" value="" id="flexCheckChecked" checked />
                                                <label class="form-check-label" for="flexCheckChecked">
                                                    <span class="txt-red">*</span> หักประกันสังคม
                                                </label>
                                            </div>
                                        </div>
                                        <div class="row">
                                            <div class="col-md-4">
                                                <div class="form-group">
                                                    <label>วิธีหัก</label>
                                                    <select class="form-control">
                                                        <option>พนักงานจ่ายเอง</option>
                                                        <option>option 2</option>
                                                        <option>option 3</option>
                                                        <option>option 4</option>
                                                        <option>option 5</option>
                                                    </select>
                                                </div>
                                            </div>
                                            <div class="col-md-4">
                                                <div class="form-group">
                                                    <label>วันที่หัก</label>
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
                                                    <label>เลขที่บัตรประกันสังคม</label>
                                                    <input type="" class="form-control" id="" placeholder="เลขที่บัตรประกันสังคม" />
                                                </div>
                                            </div>
                                        </div>
                                        {/* <!--row--> */}
                                    </section>
                                    {/* <!--Frame--> */}
                                    <h2 class="title">รายละเอียดประกันสังคม</h2>
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
                                    </section>
                                    {/* <!--Frame--> */}
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
                    {/* <?php include("include/footer.php");?> */}
                </div>
            </body>
        </>
    )
}

export default SocialSecurity