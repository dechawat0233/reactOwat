import React from 'react'
// import Top from "./Top"
// import AsideLeft from './AsideLeft'
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import '../editwindowcss.css';


function Dashboard() {
  return (
    <body class="hold-transition sidebar-mini" className='editlaout'>
      <div class="wrapper">
        <div class="content-wrapper">
          {/* <!-- Content Header (Page header) --> */}
          <ol class="breadcrumb">
            <li class="breadcrumb-item"><i class="fas fa-home"></i> <a href="index.php">หน้าหลัก</a></li>
          </ol>
          <div class="content-header">
            <div class="container-fluid">
              <div class="row mb-2">
                <h1 class="m-0"><i class="far fa-arrow-alt-circle-right"></i> แดชบอร์ด</h1>
              </div>
            </div>
          </div>
          {/* <!-- /.content-header -->
        <!-- Main content --> */}
          <section class="content">
            <div class="container-fluid">
              <div class="Inner-dash">
                <div class="row">
                  <a href="" class="btn-d btn-app" style={{ background: "#ff6c60" }}><i class="fas fa-business-time"></i> ระบบลงเวลา</a>
                  <a href="" class="btn-d btn-app" style={{ background: "#58c9f3" }}><i class="fas fa-file-invoice-dollar"></i> ระบบเงินเดือน</a>
                  <a href="" class="btn-d btn-app" style={{ background: "#41cac0" }}><i class="fas fa-paste"></i> ระบบออกเอกสาร</a>
                  <a href="" class="btn-d btn-app" style={{ background: "#8175c7" }}><i class="fas fa-file-alt"></i> ระบบรายงานผู้บริหาร</a>
                  {/* <a href="search.php" class="btn-d btn-app" style="background:#ffc107;"><i class="fas fa-network-wired"></i> ระบบบริหารจัดการ<br>พนักงาน</a> */}
                  <Link to="/search" className="btn-d btn-app" style={{ background: "#ffc107" }}><i class="fas fa-network-wired"></i> ระบบบริหารจัดการ<br />พนักงาน</Link>
                  <a href="" class="btn-d btn-app" style={{ background: "#aebece" }}><i class="fas fa-cog"></i> การตั้งค่า</a>
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

export default Dashboard