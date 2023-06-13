import endpoint from '../../config';

import React from 'react'
import axios from 'axios';
import { useState } from 'react';


function Search() {

    const [ message , setMessage ] = useState('');

    const [ employeeId , setEmployeeId] = useState('');
    const [ name , setName] = useState('');
    const [ idCard , setIdCard] = useState('');
    const [ workPlace, setWorkPlace] = useState('');

  const [employeesResult , setEmployeesResult] = useState([]);

    function handleEmployeeIdChange(event) {
        setEmployeeId(event.target.value);
    }

    function handleNameChange(event) {
        setName(event.target.value);
    }

    function handleIdCardChange(event) {
        setIdCard(event.target.value);
    }

    function handleWorkPlaceChange(event) {
        setWorkPlace(event.target.value);
    }


    function handleSearch(event) {
        event.preventDefault();

        const data = {
            employeeId : employeeId ,
            name : name ,
            idCard : idCard ,
            workPlace: workPlace ,
        };

        axios.post(endpoint + '/employee/search' , data )
            .then(response => {
//                setMessage('ผลการค้นหา');
                const { employees } = response.data;
                setMessage('ผลการค้นหา'+ employees.length + 'รายการ' );


    //localStorage.setItem('searchResults', JSON.stringify(response ));
//      localStorage.setItem('employee', JSON.stringify(employee));

      setEmployeesResult(JSON.stringify(response.data ));
            })
            .catch(error => {
                setMessage('ไม่พบผลการค้นหา กรุณาตรวจสอบข้อมูลที่ใช้ในการค้นหาอีกครั้ง');
            });
    
    }


    return (
        <body class="hold-transition sidebar-mini">
            <div class="wrapper">
                <div class="content-wrapper">
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
                                    <form onSubmit={handleSearch}>
                                        <div class="row">
                                            <div class="col-md-6">
                                                <div class="form-group">
                                                    <label role="employeeId">รหัสพนักงาน</label>
                                                    <input type="text" name="employeeId" class="form-control" id="employeeId" placeholder="รหัสพนักงาน" 
onChange={handleEmployeeIdChange} />
                                                </div>
                                            </div>
                                            <div class="col-md-6">
                                                <div class="form-group">
                                                    <label role="name">ชื่อพนักงาน</label>
                                                    <input type="text" name="name" class="form-control" id="name" placeholder="ชื่อพนักงาน" 
onChange={handleNameChange} />
                                                </div>
                                            </div>
                                        </div>
                                        <div class="row">
                                            <div class="col-md-6">
                                                <div class="form-group">
                                                    <label role="idCard">หมายเลขบัตรประชาชน</label>
                                                    <input type="text" name="idCard" class="form-control" id="idCard" placeholder="หมายเลขบัตรประชาชน" 
onChange={handleIdCardChange} />
                                                </div>
                                            </div>
                                            <div class="col-md-6">
                                                <div class="form-group">
                                                    <label role="workPlace">หน่วยงาน</label>
                                                    <input type="text" name="workPlace" class="form-control" id="workPlace" placeholder="หน่วยงาน" 
onChange={handleWorkPlaceChange} />
                                                </div>
                                            </div>
                                        </div>
                                        <div class="line_btn_search">
                                            <button type="submit" value="Submit" class="btn_search"><i class="fa fa-search"></i>  &nbsp;ค้นหา</button>
                                        </div>
                                    </form>
                                </div>

<div>
<h2>{message}</h2>

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