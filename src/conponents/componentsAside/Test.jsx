import endpoint from '../../config';

import axios from 'axios';
import React, { useEffect, useState } from 'react';

import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import moment from 'moment';

import EmployeesSelected from './EmployeesSelected';

function Test() {
    const bordertable = {
        borderLeft: '2px solid #000'
    };

    const [staffId, setStaffId] = useState(''); //รหัสหน่วยงาน
    const [staffName, setStaffName] = useState(''); //รหัสหน่วยงาน
    const [shift, setShift] = useState('');
    const [startTime, setStartTime] = useState(''); //รหัสหน่วยงาน
    const [endTime, setEndTime] = useState(''); //รหัสหน่วยงาน
    const [allTime, setAllTime] = useState(''); //รหัสหน่วยงาน
    const [otTime, setOtTime] = useState(''); //รหัสหน่วยงาน
    const [selectotTime, setSelectotTime] = useState('');
    const [selectotTimeOut, setSelectotTimeOut] = useState('');

    // Function to add a new row to the rowDataList with specific values
    const addRow = (newRowData) => {
        // Create a copy of the current state
        const newDataList = [...rowDataList];
        // Push a new row with specific data
        // newDataList.push({ ...initialRowData, ...newRowData });
        newDataList.unshift(newRowData);

        // Update the state with the new data
        setRowDataList(newDataList);
    };

    // Function to handle deleting a row
    const handleDeleteRow = (index) => {
        // Create a copy of the current state
        const newDataList = [...rowDataList];
        // Remove the row at the specified index
        newDataList.splice(index, 1);
        // Update the state with the new data
        setRowDataList(newDataList);
    };

    const [rowDataList, setRowDataList] = useState([]);

    ///////////////////

    async function handleManageWorkplace(event) {
        event.preventDefault();

        const newRowData = {
            // staffId: staffId || '',
            staffName: staffName || '',
            shift: shift || '',
            startTime: startTime || '',
            endTime: endTime || '',
            allTime: allTime || '',
            otTime: otTime || '',
            selectotTime: selectotTime || '',
            selectotTimeOut: selectotTimeOut || '',
        };

        addRow(newRowData);

        //clean form
        // setStaffId('');
        setShift('');
        setStaffName('');
        setStartTime('');
        setEndTime('');
        setAllTime('');
        setOtTime('');
        setSelectotTime('');
        setSelectotTimeOut('');
        // alert(rowDataList.length);

    }

    // console.log(workOfOT);
    return (
        <section class="content">
            <div class="row">
                <div class="col-md-12">
                    <div class="container-fluid">
                        {/* <h2 class="title">ข้อมูลการลงเวลาทำงานของพนักงาน</h2> */}
                        <form onSubmit={handleManageWorkplace}>

                            <section class="Frame">
                                <div class="row">
                                    {/* <div class="col-md-2">
                                        <div class="form-group">
                                            <label role="staffId">รหัสพนักงาน</label>
                                            <input type="text" class="form-control" id="staffId" placeholder="รหัสพนักงาน" value={staffId} onChange={(e) => setStaffId(e.target.value)} />
                                        </div>
                                    </div> */}
                                    <div class="col-md-2">
                                        <div class="form-group">
                                            <label role="staffName">ชื่อพนักงาน</label>
                                            <input type="text" class="form-control" id="staffName" placeholder="ชื่อพนักงาน" value={staffName} onChange={(e) => setStaffName(e.target.value)} />
                                        </div>
                                    </div>
                                
                                    <div class="col-md-1">
                                        <div class="form-group">
                                            <label role="startTime">เวลาเข้างาน</label>
                                            <input type="text" class="form-control" id="startTime" placeholder="เวลาเข้างาน" value={startTime} onChange={(e) => setStartTime(e.target.value)} />
                                        </div>
                                    </div>
                                    <div class="col-md-1">
                                        <div class="form-group">
                                            <label role="endTime">เวลาออกงาน</label>
                                            <input type="text" class="form-control" id="endTime" placeholder="เวลาออกงาน" value={endTime} onChange={(e) => setEndTime(e.target.value)} />
                                        </div>
                                    </div>
                                    <div class="col-md-1">
                                        <div class="form-group">
                                            <label role="allTime">ชั่วโมงทำงาน</label>
                                            <input type="text" class="form-control" id="allTime" placeholder="ชั่วโมงทำงาน" value={allTime} onChange={(e) => setAllTime(e.target.value)} />
                                        </div>
                                    </div>
                                    <div class="col-md-1">
                                        <div class="form-group">
                                            <label role="selectotTime">เวลาเข้า OT</label>
                                            <input type="text" class="form-control" id="selectotTime" placeholder="เวลาเข้า OT" value={selectotTime} onChange={(e) => setSelectotTime(e.target.value)} />
                                        </div>
                                    </div>
                                    <div class="col-md-1">
                                        <div class="form-group">
                                            <label role="selectotTimeOut">เวลาออก OT</label>
                                            <input type="text" class="form-control" id="selectotTimeOut" placeholder="เวลาออก OT" value={selectotTimeOut} onChange={(e) => setSelectotTimeOut(e.target.value)} />
                                        </div>
                                    </div>
                                    <div class="col-md-1">
                                        <div class="form-group">
                                            <label role="otTime">ชั่วโมง OT</label>
                                            <input type="text" class="form-control" id="otTime" placeholder="ชั่วโมง OT" value={otTime} onChange={(e) => setOtTime(e.target.value)} />
                                        </div>
                                    </div>

                                </div>

                            </section>

                            <div class="form-group">
                                <button class="btn b_save" >
                                    <i class="fas fa-check"></i> &nbsp; เพิ่ม
                                </button>
                            </div>

                        </form>

                        <form onSubmit={handleManageWorkplace}>

                            <section class="Frame">
                                <div class="row">
                                    <div class="col-md-12">
                                        <div class="row">
                                            <div class="col-md-2"> รหัสพนักงาน </div>
                                            <div class="col-md-2"> ชื่อพนักงาน </div>
                                            <div class="col-md-1"> กะการทำงาน </div>
                                            <div class="col-md-1"> เวลาเข้างาน </div>
                                            <div class="col-md-1"> เวลาออกงาน </div>
                                            <div class="col-md-1"> ชั่วโมงทำงาน </div>
                                            <div class="col-md-1"> เวลาเข้า OT </div>
                                            <div class="col-md-1"> เวลาออก OT</div>
                                        </div>
                                    </div>
                                </div>
                                <div class="row">
                                    <div class="col-md-12">

                                        {rowDataList.map((rowData, index) => (
                                            // rowData.staffId && ( // Check if staffId is set (truthy)
                                                <div key={index}>
                                                    <div class="row" style={{ marginBottom: '1rem', borderBottom: '2px solid #000' }}>
                                                        <div class="col-md-2" style={bordertable}> {rowData.staffId} </div>
                                                        <div class="col-md-2" style={bordertable}> {rowData.staffName} </div>
                                                        <div class="col-md-1" style={bordertable}> {rowData.startTime} </div>
                                                        <div class="col-md-1" style={bordertable}> {rowData.endTime} </div>
                                                        <div class="col-md-1" style={bordertable}> {rowData.allTime} </div>
                                                        <div class="col-md-1" style={bordertable}> {rowData.selectotTime} </div>
                                                        <div class="col-md-1" style={bordertable}> {rowData.selectotTimeOut} </div>
                                                        <div class="col-md-1" style={bordertable}> {rowData.otTime} </div>

                                                        <div class="col-md-2" style={bordertable}>
                                                            {/* <button onClick={() => handleEditRow(index)}>Edit</button> */}
                                                            <button class="btn btn-xs btn-danger" style={{ padding: '0.3rem ' }} onClick={() => handleDeleteRow(index)}>Delete</button>
                                                        </div>
                                                    </div>
                                                </div>
                                            // )
                                        ))}
                                    </div>
                                </div>
                            </section>
                        </form>

                    </div>
                </div>
            </div>
            {/* <!-- /.container-fluid --> */}
        </section>
    )
}

export default Test
