import React from 'react'

function Search() {
    return (
        <body class="hold-transition sidebar-mini">
            <div class="wrapper">
                <div class="content-wrapper">
                    {/* <!-- Content Header (Page header) --> */}
                    <ol class="breadcrumb">
                        <li class="breadcrumb-item"><i class="fas fa-home"></i> <a href="index.php">หน้าหลัก</a></li>
                        <li class="breadcrumb-item"><a href="#"> ระบบบริหารจัดการข้อมูล</a></li>
                        <li class="breadcrumb-item active">ค้นหาพนักงาน</li>
                    </ol>
                    <div class="content-header">
                        <div class="container-fluid">
                            <div class="row mb-2">
                                <h1 class="m-0"><i class="far fa-arrow-alt-circle-right"></i> ค้นหาพนักงาน</h1>
                            </div>
                        </div>
                    </div>
                    {/* <!-- /.content-header -->
                    <!-- Main content --> */}
                    <section class="content">
                        <div class="container-fluid">
                            <h2 class="title"> ค้นหาพนักงาน</h2>
                            <section class="Frame">
                                <div class="col-md-10 offset-md-1">
                                    <form action="search_results.php">
                                        <div class="row">
                                            <div class="col-md-6">
                                                <div class="form-group">
                                                    <label>รหัสพนักงาน</label>
                                                    <input type="" class="form-control" id="" placeholder="รหัสพนักงาน" />
                                                </div>
                                            </div>
                                            <div class="col-md-6">
                                                <div class="form-group">
                                                    <label>ชื่อพนักงาน</label>
                                                    <input type="" class="form-control" id="" placeholder="ชื่อพนักงาน" />
                                                </div>
                                            </div>
                                        </div>
                                        <div class="row">
                                            <div class="col-md-6">
                                                <div class="form-group">
                                                    <label>หมายเลขบัตรประชาชน</label>
                                                    <input type="" class="form-control" id="" placeholder="หมายเลขบัตรประชาชน" />
                                                </div>
                                            </div>
                                            <div class="col-md-6">
                                                <div class="form-group">
                                                    <label>หน่วยงาน</label>
                                                    <input type="" class="form-control" id="" placeholder="หน่วยงาน" />
                                                </div>
                                            </div>
                                        </div>
                                        <div class="line_btn_search">
                                            <button type="submit" value="Submit" class="btn_search"><i class="fa fa-search"></i>  &nbsp;ค้นหา</button>
                                        </div>
                                    </form>
                                </div>
                            </section>
                        </div>
                        {/* <!-- /.container-fluid --> */}
                    </section>
                    {/* <!-- /.content --> */}
                </div>
            </div>
        </body>
    )
}

export default Search