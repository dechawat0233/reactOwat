
import axios from 'axios';
import React, { useEffect, useState } from 'react';

function Worktimesheet() {
  const styles = {
    th: {
      minWidth: "3rem"
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
              <div class="col-md-3">
                ประจำเดือน กรกฏาคม ตั้งแต่วันที่ 21 มิถุนายน ถึง 20 กรกฏาคม 2566
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
                            <th style={styles.th} id="test">สรุป</th>
                            <th style={styles.th} id="test">21</th>
                            <th style={styles.th} id="test">22</th>
                            <th style={styles.th} id="test">23</th>
                            <th style={styles.th} id="test">24</th>
                            <th style={styles.th} id="test">25</th>
                            <th style={styles.th} id="test">26</th>
                            <th style={styles.th} id="test">27</th>
                            <th style={styles.th} id="test">28</th>
                            <th style={styles.th} id="test">29</th>
                            <th style={styles.th} id="test">30</th>
                            <th style={styles.th} id="test">1</th>
                            <th style={styles.th} id="test">2</th>
                            <th style={styles.th} id="test">3</th>
                            <th style={styles.th} id="test">4</th>
                            <th style={styles.th} id="test">5</th>
                            <th style={styles.th} id="test">6</th>
                            <th style={styles.th} id="test">7</th>
                            <th style={styles.th} id="test">8</th>
                            <th style={styles.th} id="test">9</th>
                            <th style={styles.th} id="test">10</th>
                            <th style={styles.th} id="test">11</th>
                            <th style={styles.th} id="test">12</th>
                            <th style={styles.th} id="test">13</th>
                            <th style={styles.th} id="test">14</th>
                            <th style={styles.th} id="test">15</th>
                            <th style={styles.th} id="test">16</th>
                            <th style={styles.th} id="test">17</th>
                            <th style={styles.th} id="test">18</th>
                            <th style={styles.th} id="test">19</th>
                            <th style={styles.th} id="test">20</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr>
                            <td>22 วัน</td>
                            <td><input type="checkbox" class="form-control" name='' value='' checked /></td>
                            <td><input type="checkbox" class="form-control" name='' value='' checked /></td>
                            <td><input type="checkbox" class="form-control" name='' value='' /></td>
                            <td><input type="checkbox" class="form-control" name='' value='' /></td>
                            <td><input type="checkbox" class="form-control" name='' value='' checked /></td>
                            <td><input type="checkbox" class="form-control" name='' value='' checked /></td>
                            <td><input type="checkbox" class="form-control" name='' value='' checked /></td>
                            <td>
                              1006
                              <br /><input type="checkbox" class="form-control" name='' value='' checked /></td>
                            <td><input type="checkbox" class="form-control" name='' value='' checked /></td>
                            <td><input type="checkbox" class="form-control" name='' value='' checked /></td>
                            <td><input type="checkbox" class="form-control" name='' value='' /></td>
                            <td><input type="checkbox" class="form-control" name='' value='' /></td>
                            <td><input type="checkbox" class="form-control" name='' value='' checked /></td>
                            <td><input type="checkbox" class="form-control" name='' value='' checked /></td>
                            <td><input type="checkbox" class="form-control" name='' value='' checked /></td>
                            <td><input type="checkbox" class="form-control" name='' value='' checked /></td>
                            <td><input type="checkbox" class="form-control" name='' value='' checked /></td>
                            <td><input type="checkbox" class="form-control" name='' value='' /></td>
                            <td><input type="checkbox" class="form-control" name='' value='' /></td>
                            <td><input type="checkbox" class="form-control" name='' value='' checked /></td>
                            <td><input type="checkbox" class="form-control" name='' value='' checked /></td>
                            <td><input type="checkbox" class="form-control" name='' value='' checked /></td>
                            <td><input type="checkbox" class="form-control" name='' value='' checked /></td>
                            <td><input type="checkbox" class="form-control" name='' value='' checked /></td>
                            <td><input type="checkbox" class="form-control" name='' value='' /></td>
                            <td><input type="checkbox" class="form-control" name='' value='' /></td>
                            <td><input type="checkbox" class="form-control" name='' value='' checked /></td>
                            <td><input type="checkbox" class="form-control" name='' value='' checked /></td>
                            <td><input type="checkbox" class="form-control" name='' value='' checked /></td>
                            <td><input type="checkbox" class="form-control" name='' value='' checked /></td>

                          </tr>
                          <tr>
                            <td>66</td>
                            <td><input type="text" class="form-control" name='' value='3' /></td>
                            <td><input type="text" class="form-control" name='' value='3' /></td>
                            <td><input type="text" class="form-control" name='' value='' /></td>
                            <td><input type="text" class="form-control" name='' value='' /></td>
                            <td><input type="text" class="form-control" name='' value='3' /></td>
                            <td><input type="text" class="form-control" name='' value='3' /></td>
                            <td><input type="text" class="form-control" name='' value='3' /></td>
                            <td><input type="text" class="form-control" name='' value='3' /></td>
                            <td><input type="text" class="form-control" name='' value='3' /></td>
                            <td><input type="text" class="form-control" name='' value='3' /></td>
                            <td><input type="text" class="form-control" name='' value='' /></td>
                            <td><input type="text" class="form-control" name='' value='' /></td>
                            <td><input type="text" class="form-control" name='' value='3' /></td>
                            <td><input type="text" class="form-control" name='' value='3' /></td>
                            <td><input type="text" class="form-control" name='' value='3' /></td>
                            <td><input type="text" class="form-control" name='' value='3' /></td>
                            <td><input type="text" class="form-control" name='' value='3' /></td>
                            <td><input type="text" class="form-control" name='' value='' /></td>
                            <td><input type="text" class="form-control" name='' value='' /></td>
                            <td><input type="text" class="form-control" name='' value='3' /></td>
                            <td><input type="text" class="form-control" name='' value='3' /></td>
                            <td><input type="text" class="form-control" name='' value='3' /></td>
                            <td><input type="text" class="form-control" name='' value='3' /></td>
                            <td><input type="text" class="form-control" name='' value='3' /></td>
                            <td><input type="text" class="form-control" name='' value='' /></td>
                            <td><input type="text" class="form-control" name='' value='' /></td>
                            <td><input type="text" class="form-control" name='' value='3' /></td>
                            <td><input type="text" class="form-control" name='' value='3' /></td>
                            <td><input type="text" class="form-control" name='' value='3' /></td>
                            <td><input type="text" class="form-control" name='' value='3' /></td>
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

export default Worktimesheet