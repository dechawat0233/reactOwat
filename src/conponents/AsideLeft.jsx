import { useState } from 'react';
import jwt_decode from 'jwt-decode';

// import React from 'react'
import React, { Component } from 'react'
import Navitems from './Navitems'
// import { Link } from 'react-router-dom';
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";

function AsideLeft() {
  const [showSubMenu, setShowSubMenu] = useState(false);

const token = localStorage.getItem('token');
  const user = JSON.parse(localStorage.getItem('user')) || null;

  function toggleSubMenu() {
    setShowSubMenu(!showSubMenu);
  }


  return (

    <>

      <aside class="main-sidebar sidebar-dark-primary elevation-4">
        <div class="sidebar">
          <div class="Logo-w">
            <a href="dashboard.php" class="brand-link logo-switch">
              <img src="assets/images/logo-xs.png" alt="Logo Small" class="brand-image-xl logo-xs" />
              <img src="assets/images/logo.png" alt=" Docs Logo Large" class="brand-image-xl logo-xl" style={{ borderRadius: "8px" }} />
            </a>
          </div>
          <div class="user-panel mt-3 pb-3 mb-3 d-flex">
            <div class="image">
              <img src="assets/images/admin.jpg" class="img-circle" alt="User Image" />
            </div>
            <div class="info">
              <a href="#" class="d-block">
                <p>คุณสมศรี รักสะอาด</p><i class="nav-icon fas fa-solid fa-user" style={{ fontSsize: "11px", paddingRight: "5px" }}></i> Super Admin 
              </a>
            </div>
          </div>
          <nav class="mt-2">
            <ul class="nav nav-pills nav-sidebar flex-column" data-widget="treeview" role="menu" data-accordion="false">
              <li class="nav-item">
                <Link to="/dashboard" className="nav-link"><i class="nav-icon fas fa-tachometer-alt"></i> หน้าหลัก</Link>
              </li>
              <li class="nav-item">
                <Link to="../content/about.jsx" className="nav-link"><i class="nav-icon fas fa-business-time"></i> ระบบลงเวลา</Link>
              </li>
              <li class="nav-item">
                <a href="#" class="nav-link"><i class="nav-icon fas fa-file-invoice-dollar"></i>
                  <p> ระบบเงินเดือน</p>
                </a>
              </li>
              <li class="nav-item">
                <a href="#" class="nav-link"><i class="nav-icon fas fa-file-import"></i>
                  <p> ระบบออกเอกสาร</p>
                </a>
              </li>
              <li class="nav-item">
                <a href="#" class="nav-link"><i class="nav-icon fas fa-file-alt"></i>
                  <p> ระบบรายงานผู้บริหาร</p>
                </a>
              </li>
              <li class="nav-item">
                <a href="#" class="nav-link" onClick={toggleSubMenu}>
                  <i class="nav-icon fas fa-network-wired"></i>
                  <p> ระบบจัดการพนักงาน <i class="right fas fa-angle-left"></i><i class=""></i></p>
                </a>

                {showSubMenu && (

                  <ul class="nav nav-pills nav-sidebar flex-column" data-widget="treeview" role="menu" data-accordion="false">
                    <li class="nav-item">
                      <Link to="/search" className="nav-link"><i class="nav-icon far fa-dot-circle" style={{ fontSize: "14px" }}></i> ค้นหาพนักงาน</Link>
                    </li>
                    <li class="nav-item">
                      <Link to="/employee" className="nav-link"><i class="nav-icon far fa-dot-circle" style={{ fontSize: "14px" }}></i> ข้อมูลพนักงาน</Link>
                    </li>
                    <li class="nav-item">
                      <Link to="/salary" className="nav-link"><i class="nav-icon far fa-dot-circle" style={{ fontSize: "14px" }}></i> ข้อมูลเงินเดือน</Link>
                    </li>
                    <li class="nav-item">
                      <Link to="/income_tax" className="nav-link"><i class="nav-icon far fa-dot-circle" style={{ fontSize: "14px" }}></i> ภาษีเงินได้</Link>
                    </li>
                    <li class="nav-item">
                      <Link to="/calculate_tax" className="nav-link"><i class="nav-icon far fa-dot-circle" style={{ fontSize: "14px" }}></i> คำนวณภาษี</Link>
                    </li>
                    <li class="nav-item">
                      <Link to="/calculate_tax_deductions" className="nav-link"><i class="nav-icon far fa-dot-circle" style={{ fontSize: "14px" }}></i> คำนวณหักลดหย่อนภาษี</Link>
                    </li>
                    <li class="nav-item">
                      <Link to="/other_expenses" className="nav-link"><i class="nav-icon far fa-dot-circle" style={{ fontSize: "14px" }}></i> ค่าใช้จ่ายอื่นๆ</Link>
                    </li>
                    <li class="nav-item">
                      <Link to="/social_security" className="nav-link"><i class="nav-icon far fa-dot-circle" style={{ fontSize: "14px" }}></i> ประกันสังคม</Link>
                    </li>
                    <li class="nav-item">
                      <Link to="/provident_fund" className="nav-link"><i class="nav-icon far fa-dot-circle" style={{ fontSize: "14px" }}></i> กองทุนสำรอง</Link>
                    </li>
                    <li class="nav-item">
                      <Link to="/collateral" className="nav-link"><i class="nav-icon far fa-dot-circle" style={{ fontSize: "14px" }}></i> เงินค้ำประกัน</Link>
                    </li>
                    <li class="nav-item">
                      <Link to="/document" className="nav-link"><i class="nav-icon far fa-dot-circle" style={{ fontSize: "14px" }}></i> ข้อมูลเอกสาร</Link>
                    </li>
                    <li class="nav-item">
                      <Link to="/application" className="nav-link"><i class="nav-icon far fa-dot-circle" style={{ fontSize: "14px" }}></i> กรอกใบสมัคร</Link>
                    </li>
                  </ul>
                )}

              </li>
              <li class="nav-item">
                <a href="#" class="nav-link">
                  <i class="nav-icon fas fa-shopping-cart"></i>
                  <p> การตั้งค่า <i class="right fas fa-angle-left"></i><i class=""></i></p>
                </a>
                <ul class="nav nav-treeview">
                  <li class="nav-item">
                    <a href="#" class="nav-link"><i class="nav-icon far fa-dot-circle" style={{ fontSize: "14px" }}></i>
                      <p>ผู้ใช้งานระบบ</p>
                    </a>
                  </li>
                  <li class="nav-item">
                    <a href="#" class="nav-link"><i class="nav-icon far fa-dot-circle" style={{ fontSize: "14px" }}></i>
                      <p>กำหนดสิทธิ์ใช้งาน</p>
                    </a>
                  </li>
                </ul>
              </li>
              <li class="nav-item"><a href="#" class="nav-link"><i class="nav-icon fas fa fa-cog"></i>
                <p> การแจ้งเตือน</p>
              </a></li>
              {/* <li class="nav-item"><Link to="/countday" className="nav-link"><i class="nav-icon fas fa fa-cog"></i> Testcount</Link></li> */}
              {/* <li class="nav-item"><Link to="/time" className="nav-link"><i class="nav-icon fas fa fa-cog"></i> Test</Link></li> */}
            </ul>
          </nav>
        </div>
      </aside>
    </>
  )
}

export default AsideLeft