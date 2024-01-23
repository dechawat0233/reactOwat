import endpoint from '../../config';

import axios from 'axios';
import React, { useEffect, useState } from 'react';

import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

import EmployeesSelected from './EmployeesSelected';

function AddEditSalaryEmployee() {

    const bordertable = {
        borderLeft: '2px solid #000'
    };

    const [newWorkplace, setNewWorkplace] = useState(true);

    const [searchEmployeeId, setSearchEmployeeId] = useState('');
    const [searchEmployeeName, setSearchEmployeeName] = useState('');
    const [month, setMonth] = useState('');

    useEffect(() => {
        setMonth("01");
    }, []);

    const options = [];

    for (let i = 1; i <= 31; i++) {
        // Use padStart to add leading zeros to numbers less than 10
        const formattedValue = i.toString().padStart(2, '0');
        options.push(<option key={i} value={formattedValue}>{formattedValue}</option>);
    }

    //employeedata
    const [employeeId, setEmployeeId] = useState(''); //รหัสพนักงาน
    const [name, setName] = useState(''); //ชื่อพนักงาน
    const [lastName, setLastName] = useState(''); //นามสกุลพนักงาน
const [dataResult , setDataResult] = useState([]);



    //////////////////////////////
    const [employeeList, setEmployeeList] = useState([]);
    const [workplaceList, setWorkplaceList] = useState([]);
    const [currentDate, setCurrentDate] = useState('');

    useEffect(() => {
        // Fetch data from the API when the component mounts
        fetch(endpoint + '/workplace/list')
            .then(response => response.json())
            .then(data => {
                // Update the state with the fetched data
                setWorkplaceList(data);
                // alert(data[0].workplaceName);
            })
            .catch(error => {
                console.error('Error fetching data:', error);
            });

            const currentDate = new Date();
            const day = currentDate.getDate();
            const month = currentDate.getMonth() + 1; // Months are zero-based
            const year = currentDate.getFullYear();
        
            // Formatting the date to dd/mm/yyyy format
            const formattedDate = `${day < 10 ? '0' : ''}${day}/${month < 10 ? '0' : ''}${month}/${year}`;
        
            setCurrentDate(formattedDate);
    }, []); // The empty array [] ensures that the effect runs only once after the initial render

    console.log(workplaceList);



//x1
    /////////////////////////////////////////////
    const [addSalaryId, setAddSalaryId] = useState('');
    const [addSalaryName, setAddSalaryName] = useState('');
    const [addSalary, setAddSalary] = useState('');
    const [message, setMessage] = useState('');

    const [minusId, setMinusId] = useState('');
    const [misnusName, setMisnusName] = useState('');
    const [minusSalary, setMinusSalary] = useState('');
    const [minusmessage, setMinusmessage] = useState('');




    // const numberOfRows2 = 30; // Fixed number of rows
    const numberOfRows2 = 1; // Fixed number of rows

    const initialRowData2 = {
        id: '',
        name: '',
        SpSalary: '',
        roundOfSalary: '',
        StaffType: '',
        nameType: '',
        message: '',
    };

    const [rowDataList2, setRowDataList2] = useState(new Array(numberOfRows2).fill(initialRowData2));

    const numberOfRows = 1; // Fixed number of rows

    const initialRowData = {
        id: '',
        name: '',
        SpSalary: '',
        roundOfSalary: '',
        StaffType: '',
        nameType: '',
        message: '',
    };

    const [rowDataList, setRowDataList] = useState(new Array(numberOfRows).fill(initialRowData));

///////////////////
    function handleClickResult(emp) {
        // Populate all the startTime input fields with the search result value
        // alert(emp.employeeId);
        setEmployeeId(emp.employeeId);
        setName(emp.name);

//select employee
    }


    //data for search
    const [searchWorkplaceId, setSearchWorkplaceId] = useState(''); //รหัสหน่วยงาน
    const [searchWorkplaceName, setSearchWorkplaceName] = useState(''); //ชื่อหน่วยงาน
    const [searchResult, setSearchResult] = useState([]);

    async function handleSearch(event) {
        event.preventDefault();
setRowDataList2([]);
setRowDataList([]);

        // get value from form search
        const data = {
            employeeId: searchEmployeeId,
            name: searchEmployeeName,
            idCard: '',
            workPlace: '',
        };
// alert(JSON.stringify(data,null,2));

        try {
            const response = await axios.post(endpoint + '/employee/search', data);
            setSearchResult(response.data.employees);
            // alert(response.data.employees.length);
            if (response.data.employees.length < 1) {
                // window.location.reload();
                setEmployeeId('');
                setName('');
                alert('ไม่พบข้อมูล');
            } else {
                // alert(response.data.employees.length);

                //clean form 
                setSearchEmployeeId('');
                setSearchEmployeeName('');

                //result = 1 
                if(response.data.employees.length > 0){
                // Set search values
                setEmployeeId(response.data.employees[0].employeeId);
                setName(response.data.employees[0].name);
                setLastName(response.data.employees[0].lastName);
setDataResult(response.data.employees[0] );
//  alert(response.data.employees[0].addSalary.length );
const newDataList = [];

response.data.employees[0].addSalary.map(item => {
    let newRowData = {
    id: item.id,
    name: item.name,
    SpSalary: item.SpSalary,
    roundOfSalary: item.roundOfSalary,
    StaffType: item.StaffType,
    nameType: item.nameType,
    message: item.message,
}


// Push a new row with specific data
newDataList.unshift(newRowData );

});

// Update the state with the new data
setRowDataList2(newDataList);

//deduct salary
const newDataList1 = [];
// alert(JSON.stringify(response.data.employees[0].deductSalary,null,2));

response.data.employees[0].deductSalary.map(item => {
    let newRowData1 = {
    id: item.id,
    name: item.name,
    SpSalary: item.SpSalary,
    roundOfSalary: item.roundOfSalary,
    StaffType: item.StaffType,
    nameType: item.nameType,
    message: item.message,
}
alert(item.id);

// Push a new row with specific data
newDataList1 .unshift(newRowData1 );

});

// Update the state with the new data
setRowDataList(newDataList1);


//x33

                }

            }
        } catch (error) {
            alert('กรุณาตรวจสอบข้อมูลในช่องค้นหา');
            window.location.reload();
        }
    }



    async function handleManageWorkplace(event) {
        event.preventDefault();
        //get data from input in useState to data 
        const newRowData = await {
            id: addSalaryId || '',
            name: addSalaryName || '',
            SpSalary: addSalary || '',
            roundOfSalary: '',
            StaffType: '',
            nameType: '',
            message: message || '',
        };

        const newRowData2 = await {
            id: minusId || '',
            name: misnusName || '',
            SpSalary: minusSalary || '',
            roundOfSalary: '',
            StaffType: '',
            nameType: '',
            message: minusmessage || '',
        };
        await addRow(newRowData);
        await addRow2(newRowData2);


        await setAddSalaryId('');
        await setAddSalaryName('');
        await setAddSalary('');
        await setMessage('');

        await setMinusId('');
        await setMisnusName('');
        await setMinusSalary('');
        await setMinusmessage('');

    }


    // Function to add a new row to the rowDataList with specific values
    const addRow = (newRowData) => {
        // Create a copy of the current state
        const newDataList = [...rowDataList2];
        // Push a new row with specific data
        // newDataList.push({ ...initialRowData, ...newRowData });
        newDataList.unshift(newRowData);
        // Update the state with the new data
        setRowDataList2(newDataList);
    };

    const addRow2 = (newRowData2) => {
        // Create a copy of the current state
        const newDataList = [...rowDataList];
        // Push a new row with specific data
        // newDataList.push({ ...initialRowData, ...newRowData });
        newDataList.unshift(newRowData2);
        // Update the state with the new data
        setRowDataList(newDataList);
    };

    // Function to handle editing a row
    const handleEditRow = async (index) => {
        // You can implement the edit logic here, e.g., open a modal for editing
        // console.log('Edit row at index:', index);
        const tmp = await rowDataList2[index];
        // alert(tmp.staffId);
        await setAddSalaryId(tmp.workplaceId);
        await setAddSalaryName(tmp.workplaceName);

    };

    // Function to handle deleting a row
    const handleDeleteRow = (index) => {
        // Create a copy of the current state
        const newDataList = [...rowDataList2];
        // Remove the row at the specified index
        newDataList.splice(index, 1);
        // Update the state with the new data
        setRowDataList2(newDataList);
    };

    const handleDeleteRow2 = (index) => {
        // Create a copy of the current state
        const newDataList = [...rowDataList];
        // Remove the row at the specified index
        newDataList.splice(index, 1);
        // Update the state with the new data
        setRowDataList(newDataList);
    };


    async function handleCreateAddSalary(event) {
        event.preventDefault();
// alert(dataResult._id);
// alert(dataResult.addSalary);
// alert(rowDataList2);
dataResult.addSalary = await rowDataList2;
dataResult.deductSalary = await rowDataList;

try {
    const response = await axios.put(endpoint + '/employee/update/' + dataResult._id, dataResult);
    // setEmployeesResult(response.data.employees);
    if (response) {
        alert("บันทึกสำเร็จ");
        // localStorage.setItem('selectedEmployees' , JSON.stringify(response.data.employees));

        // window.location.reload();

    }
} catch (error) {
    alert('กรุณาตรวจสอบข้อมูลในช่องกรอกข้อมูล');
    alert(error);
    // window.location.reload();
}

        // //get data from input in useState to data 
        // const data = {
        //     employeeId: employeeId,
        //     employeeName: name,
        //     onUpdate: currentDate || '',
        //     addSalary: rowDataList2,
        //     minusSalary: rowDataList,
        // };
        

        // try {
            // const response = await axios.post(endpoint + '/addsalary/create', data);
            // setEmployeesResult(response.data.employees);
            // if (response) {
                // alert("บันทึกสำเร็จ");
                            // window.location.reload();

            // }
        // } catch (error) {
            // alert('กรุณาตรวจสอบข้อมูลในช่องกรอกข้อมูล');
            // window.location.reload();
        // }

    }
    console.log("rowDataList2", rowDataList2);

    console.log("rowDataList", rowDataList);

    /////////////////
    const [selectedOption, setSelectedOption] = useState('agencytime');

    const handleOptionChange = (event) => {
        setSelectedOption(event.target.value);
    };

    const handleSubmitForm1 = (event) => {
        event.preventDefault();
        // Handle submission for Form 1
    };

    return (
        <body class="hold-transition sidebar-mini" className='editlaout'>
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
                                <h1 class="m-0"><i class="far fa-arrow-alt-circle-right"></i> เงินเพิ่ม เงินหักพนักงาน</h1>
                            </div>
                        </div>
                    </div>
                    {/* <!-- /.content-header -->
<!-- Main content --> */}
                    <section class="content">
                        <div class="row">
                            <div class="col-md-12">
                                <div class="container-fluid">
                                    <div class="row">
                                        <div class="col-md-12">
                                            <section class="Frame">
                                                <div class="col-md-12">
                                                    <form onSubmit={handleSearch}>
                                                        <div class="row">
                                                            <div class="col-md-6">
                                                                <div class="form-group">
                                                                    <label role="searchEmployeeId">รหัสพนักงาน</label>
                                                                    <input type="text" class="form-control" id="searchEmployeeId" placeholder="รหัสพนักงาน" value={searchEmployeeId} onChange={(e) => setSearchEmployeeId(e.target.value)} />
                                                                </div>
                                                            </div>
                                                            <div class="col-md-6">
                                                                <div class="form-group">
                                                                    <label role="searchname">ชื่อพนักงาน</label>
                                                                    <input type="text" class="form-control" id="searchname" placeholder="ชื่อพนักงาน" value={searchEmployeeName} onChange={(e) => setSearchEmployeeName(e.target.value)} />
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div class="d-flex justify-content-center">
                                                            <button class="btn b_save"><i class="nav-icon fas fa-search"></i> &nbsp; ค้นหา</button>
                                                        </div>
                                                    </form>
                                                    <br />
                                                    <div class="d-flex justify-content-center">
                                                        <h2 class="title">ผลลัพธ์ {searchResult.length} รายการ</h2>
                                                    </div>
                                                    <div class="d-flex justify-content-center">
                                                        <div class="row">
                                                            <div class="col-md-12">
                                                                <div class="form-group">
                                                                    <ul style={{ listStyle: 'none', marginLeft: "-2rem" }}>
                                                                        {searchResult.map(employee => (
                                                                            <li
                                                                                key={employee.id}
                                                                                onClick={() => handleClickResult(employee)}
                                                                            >
                                                                                รหัส {employee.employeeId} ชื่อ{employee.name}
                                                                            </li>
                                                                        ))}
                                                                    </ul>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </section>
                                            {/* <!--Frame--> */}
                                        </div>
                                    </div>
                                    <form onSubmit={handleManageWorkplace}>

                                    <div class="row">
                                            <div class="col-md-12">
                                                <h3>ข้อมูลพนักงาน</h3>
                                                <div class="row">
                                                        <div class="col-md-2">
                                                            <div class="form-group">
                                                                <label role="addSalaryId">{employeeId}</label>
                                                            </div>
                                                        </div>

                                                        <div class="col-md-3">
                                                            <div class="form-group">
                                                                <label role="addSalaryName">{name} {lastName} </label>
                                                            </div>
                                                        </div>
                                                        <div class="col-md-2">
                                                            <div class="form-group">
                                                                <label role="addSalary">ปรับปรุงเงินเพิ่ม/เงินหักเมื่อ</label>
                                                            </div>
                                                        </div>
                                                        <div class="col-md-3">
                                                            <div class="form-group">
                                                                <label role="message"> พบข้อมูลเงินเพิ่มเงินหัก / ไม่พบข้อมูลเงินเพิ่มเงินหัก</label>
                                                            </div>
                                                        </div>
                                                    </div>


</div>
</div>
                                        <div class="row">
                                            <div class="col-md-6">
                                                <h3>เงินเพิ่ม</h3>
                                                <section class="Frame">

                                                    <div class="row">
                                                        <div class="col-md-2">
                                                            <div class="form-group">
                                                                <label role="addSalaryId">รหัส</label>
                                                            </div>
                                                        </div>

                                                        <div class="col-md-3">
                                                            <div class="form-group">
                                                                <label role="addSalaryName">ชื่อ</label>
                                                            </div>
                                                        </div>
                                                        <div class="col-md-2">
                                                            <div class="form-group">
                                                                <label role="addSalary">จำนวนเงิน</label>
                                                            </div>
                                                        </div>
                                                        <div class="col-md-3">
                                                            <div class="form-group">
                                                                <label role="message">หมายเหตุ</label>
                                                            </div>
                                                        </div>
                                                    </div>

                                                    <div class="row">
                                                        <div class="col-md-2">
                                                            <div class="form-group">
                                                                <input type="text" class="form-control" id="addSalaryId" placeholder="รหัส" value={addSalaryId} onChange={(e) => setAddSalaryId(e.target.value)} />
                                                            </div>
                                                        </div>

                                                        <div class="col-md-3">
                                                            <div class="form-group">
                                                                <input type="text" class="form-control" id="addSalaryName" placeholder="ชื่อ" value={addSalaryName} onChange={(e) => setAddSalaryName(e.target.value)} />
                                                            </div>
                                                        </div>

                                                        <div class="col-md-2">
                                                            <input type="text" class="form-control" id="addSalary" placeholder="จำนวนเงิน" value={addSalary} onChange={(e) => setAddSalary(e.target.value)} />
                                                        </div>
                                                        <div class="col-md-2">
                                                            <input type="text" class="form-control" id="message" placeholder="หมายเหตุ" value={message} onChange={(e) => setMessage(e.target.value)} />
                                                        </div>
                                                        <div class="col-md-2">
                                                            <div class="d-flex align-items-end">
                                                                <button class="btn b_save"><i class="fas fa-check"></i> &nbsp; เพิ่ม</button>
                                                            </div>
                                                        </div>

                                                    </div>


                                                    <section class="Frame">
                                                        <div class="row">
                                                            <div class="col-md-12">
                                                                <div class="row">
                                                                    <div class="col-md-2"> รหัส</div>
                                                                    <div class="col-md-2"> ชื่อ </div>
                                                                    <div class="col-md-2"> จำนวนเงิน</div>
                                                                    <div class="col-md-2"> หมายเหตุ </div>
                                                                    <div class="col-md-3">  </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div class="row">
                                                            <div class="col-md-12">

                                                                {rowDataList2.map((item , index) => (
                                                                    item.name&& (
                                                                        <div key={index}>
                                                                            <div class="row" style={{ marginBottom: '1rem', borderBottom: '2px solid #000' }}>
                                                                                <div class="col-md-2" style={bordertable}> {item.id}</div>
                                                                                <div class="col-md-2" style={bordertable}> {item.name} </div>
                                                                                <div class="col-md-2" style={bordertable}> {item.SpSalary} </div>
                                                                                <div class="col-md-2" style={bordertable}> {item.message} </div>
                                                                                <div class="col-md-3" style={bordertable}>
                                                                                    {/* <button onClick={() => handleEditRow(index)}>Edit</button> */}
                                                                                    <button class="btn btn-xs btn-danger" style={{ padding: '0.3rem ', addSalaryIdth: '8rem' }} onClick={() => handleDeleteRow(index)}>Delete</button>
                                                                                </div>

                                                                            </div>
                                                                        </div>
                                                                    )
                                                                ))}

                                                            </div>
                                                        </div>
                                                    </section>
                                                </section>
                                            </div>

                                            <div class="col-md-6">
                                                <h3>เงินหัก</h3>
                                                <section class="Frame">
                                                    <div class="row">
                                                        <div class="col-md-2">
                                                            <div class="form-group">
                                                                <label role="addSalaryId">รหัส</label>
                                                            </div>
                                                        </div>

                                                        <div class="col-md-3">
                                                            <div class="form-group">
                                                                <label role="addSalaryName">ชื่อ</label>
                                                            </div>
                                                        </div>
                                                        <div class="col-md-2">
                                                            <div class="form-group">
                                                                <label role="addSalaryName">จำนวนเงิน</label>
                                                            </div>
                                                        </div>
                                                        <div class="col-md-3">
                                                            <div class="form-group">
                                                                <label role="addSalaryName">หมายเหตุ</label>
                                                            </div>
                                                        </div>
                                                    </div>

                                                    <div class="row">
                                                        <div class="col-md-2">
                                                            <div class="form-group">
                                                                <input type="text" class="form-control" id="addSalaryId" placeholder="รหัส" value={minusId} onChange={(e) => setMinusId(e.target.value)} />
                                                            </div>
                                                        </div>

                                                        <div class="col-md-3">
                                                            <div class="form-group">
                                                                <input type="text" class="form-control" id="addSalaryName" placeholder="ชื่อ" value={misnusName} onChange={(e) => setMisnusName(e.target.value)} />
                                                            </div>
                                                        </div>

                                                        <div class="col-md-2">
                                                            <input type="text" class="form-control" id="addSalaryName" placeholder="จำนวนเงิน" value={minusSalary} onChange={(e) => setMinusSalary(e.target.value)} />
                                                        </div>
                                                        <div class="col-md-2">
                                                            <input type="text" class="form-control" id="addSalaryName" placeholder="หมายเหตุ" value={minusmessage} onChange={(e) => setMinusmessage(e.target.value)} />
                                                        </div>
                                                        <div class="col-md-2">
                                                            <div class="d-flex align-items-end">
                                                                <button class="btn b_save"><i class="fas fa-check"></i> &nbsp; เพิ่ม</button>
                                                            </div>
                                                        </div>

                                                    </div>
                                                    <section class="Frame">
                                                        <div class="row">
                                                            <div class="col-md-12">
                                                                <div class="row">
                                                                    <div class="col-md-2"> รหัส</div>
                                                                    <div class="col-md-2"> ชื่อ </div>
                                                                    <div class="col-md-2"> จำนวนเงิน</div>
                                                                    <div class="col-md-2"> หมายเหตุ </div>
                                                                    <div class="col-md-3">  </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div class="row">
                                                            <div class="col-md-12">


                                                                {rowDataList.map((item , index) => (
                                                                    item.name && (
                                                                        <div key={index}>
                                                                            <div class="row" style={{ marginBottom: '1rem', borderBottom: '2px solid #000' }}>
                                                                                <div class="col-md-2" style={bordertable}> {item.id}</div>
                                                                                <div class="col-md-2" style={bordertable}> {item.name} </div>
                                                                                <div class="col-md-2" style={bordertable}> {item.SpSalary} </div>
                                                                                <div class="col-md-2" style={bordertable}> {item.message} </div>
                                                                                <div class="col-md-3" style={bordertable}>
                                                                                    {/* <button onClick={() => handleEditRow(index)}>Edit</button> */}
                                                                                    <button class="btn btn-xs btn-danger" style={{ padding: '0.3rem ', addSalaryIdth: '8rem' }} onClick={() => handleDeleteRow2(index)}>Delete</button>
                                                                                </div>

                                                                            </div>
                                                                        </div>
                                                                    )
                                                                ))}
                                                            </div>
                                                        </div>
                                                    </section>
                                                </section>
                                            </div>
                                        </div>
                                        <div class="row">
                                            <div class="col-md-6">
                                                <h3>เงินคงค้าง</h3>
                                                <section class="Frame">
                                                    0
                                                </section>
                                            </div>
                                        </div>






                                        <div class="form-group">

                                            <button class="btn b_save" onClick={handleCreateAddSalary}><i class="nav-icon fas fa-save"></i> &nbsp; บันทึก</button>
                                            
                                            </div>
                                    </form>

                                </div>
                            </div>
                        </div>
                        {/* <!-- /.container-fluid --> */}
                    </section>
                </div>

            </div>
            {/* {JSON.stringify(rowDataList2,null,2)} */}

        </body>

    )
}

export default AddEditSalaryEmployee