import endpoint from '../../config';

import axios from 'axios';
import React, { useEffect, useState } from 'react';

import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import EmployeesSelected from './EmployeesSelected';

import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import '../editwindowcss.css';


function Employee() {

    useEffect(() => {
        document.title = 'ข้อมูลพนักงาน';
        // You can also return a cleanup function if needed
        // return () => { /* cleanup code */ };
    }, []);

    const [storedEmp, setStoredEmp] = useState([]);
    const [newEmp, setNewEmp] = useState(true);
    const [employeeselection, setEmployeeselection] = useState([]);
    const [buttonValue, setButtonValue] = useState('');

    const [workplaceSelection, setWorkplaceSelection] = useState([]);

    useEffect(() => {
        const storedValue = sessionStorage.getItem('empSelect');
        if (storedValue) {
            // setEmployeeselection(storedValue);
        }

        //get all Workplace from API
        fetch(endpoint + '/workplace/listselect') // Update with your API endpoint
            .then(response => response.json())
            .then(data => {
                setWorkplaceSelection(data);
                console.log(data);

            }
            )
            .catch(error => console.error('Error fetching employees:', error));

    }, []);

    //employee data
    const [_id, set_id] = useState('');
    const [employeeId, setEmployeeId] = useState('');
    const [position, setPosition] = useState(''); //ตำแหน่ง
    const [department, setDepartment] = useState(''); //แผนก
    const [workplace, setWorkplace] = useState(''); //หน่วยงาน
    const [employeeData, setEmployeeData] = useState({});
    const [jobtype, setJobtype] = useState(''); //ประเภทการจ้าง
    const [startjob, setStartjob] = useState(''); //วันที่เริ่มงาน
    const [endjob, setEndjob] = useState(''); //วันที่ลาออก
    const [exceptjob, setExceptjob] = useState(''); //วันที่บรรจุ
    const [prefix, setPrefix] = useState(''); //นำหน้าชื่อ
    const [name, setName] = useState(''); //ชื่อ
    const [lastName, setLastName] = useState(''); //นามสกุล
    const [nickName, setNickName] = useState(''); //ชื่อเล่น
    const [gender, setGender] = useState(''); //เพศ
    const [dateOfBirth, setDateOfBirth] = useState(''); //วดป เกิด
    const [age, setAge] = useState(''); //อายุ
    const [idCard, setIdCard] = useState(''); //บัตรประชาชน
    const [ethnicity, setEthnicity] = useState(''); //เชื้อชาติ
    const [religion, setReligion] = useState(''); //ศาสนา
    const [maritalStatus, setMaritalStatus] = useState(''); //สถานภาพการสมรส
    const [militaryStatus, setMilitaryStatus] = useState(''); //สถานภาพทางการทหาร
    const [address, setAddress] = useState(''); //ที่อยู่ตามบัตรประชาชน
    const [currentAddress, setCurrentAddress] = useState(''); //ที่อยู่ปัจจุบัน
    const [phoneNumber, setPhoneNumber] = useState(''); //เบอร์โทรศัพท์
    const [emergencyContactNumber, setEmergencyContactNumber] = useState(''); //เบอร์ติดต่อกรณีฉุกเฉิน
    const [idLine, setIdLine] = useState(''); //ไอดีไลน์
    const [vaccination, setVaccination] = useState([]); //การรับวัคซีน
    const [treatmentRights, setTreatmentRights] = useState(''); //สิทธิการรักษาพยาบาล

    const [images, setImages] = useState([]);//อัพรูป
    const [imageURLs, setImageURLs] = useState([]);

    //setup file upload
    const [selectedFile, setSelectedFile] = useState(null);

    const handleFileChange = (e) => {
      setSelectedFile(e.target.files[0]);
    };
  
    const handleUpload = () => {

        //set image and employeeId for upload then employeeId.imageType
const formData = new FormData();
formData.append('image', selectedFile);

const headers = {
  'Content-Type': 'multipart/form-data',
  'Employee-Id': employeeId,
};

axios.post(endpoint + '/imgemployee/upload', formData, { headers })
  .then(response => {
    console.log(response.data);
  })
  .catch(error => {
    console.error(error);
  });

      };

//Update localStorage
function updateEmployeeLocal(emp) {
    let employeeLocal = JSON.parse(localStorage.getItem("selectedEmployees"));
    // alert(JSON.stringify(employeeLocal, null, 2));
  
    const employeeLocalUpdate = employeeLocal.map(item => {
      if (item._id === emp._id) {
        // Update the item here
        // return { ...item, id: emp.id, /* other properties you want to update */ };
        const data = {
            employeeId: employeeId,
            position: position,
            department: department,
            workplace: workplace,
            jobtype: jobtype,
            startjob: startjob,
            endjob: endjob,
            exceptjob: exceptjob,
            prefix: prefix,
            name: name,
            lastName: lastName,
            nickName: nickName,
            gender: gender,
            dateOfBirth: dateOfBirth,
            age: age,
            idCard: idCard,
            ethnicity: ethnicity,
            religion: religion,
            maritalStatus: maritalStatus,
            militaryStatus: militaryStatus,
            address: address,
            currentAddress: currentAddress,
            phoneNumber: phoneNumber,
            emergencyContactNumber: emergencyContactNumber,
            idLine: idLine,
            vaccination: vaccination,
            treatmentRights: treatmentRights,
        };

return data;
      }
  
      return item;
    });
  
    localStorage.setItem("selectedEmployees", JSON.stringify(employeeLocalUpdate));
  }
  
    
    const handleChange = (e, field) => {
        setEmployeeData(prevData => ({
            ...prevData,
            [field]: e.target.value
        }));
    };

    useEffect(() => {
        if (images.length < 1) return;
        const newImageUrls = [];
        images.forEach((image) => newImageUrls.push(URL.createObjectURL(image)))

        setImageURLs(newImageUrls);
    }, [images]);

    function onImageChange(e) {
        setImages([...e.target.files]);
        setSelectedFile(e.target.files[0]);

    }

    const [newVaccination, setNewVaccination] = useState('');
    const handleVaccination = (event) => {
        setNewVaccination(event.target.value);
    };

    const handleAddVaccination = () => {
        if (newVaccination.trim() !== '') {
            setVaccination([...vaccination, newVaccination]);
            setNewVaccination('');
        }
    };


    const handleRemoveVaccination = (vaccinationToRemove) => {
        setVaccination((prevVaccination) =>
            prevVaccination.filter((v) => v !== vaccinationToRemove)
        );
    };


    const [copyAddress, setCopyAddress] = useState(false);

    const handleCheckboxChange = () => {
        setCopyAddress(!copyAddress); // Toggle the value of copyAddress
        if (!copyAddress) {
            setCurrentAddress(address); // Copy address to currentAddress
        } else {
            setCurrentAddress(''); // Reset currentAddress
        }
    };

    function onEmployeeSelect(empSelect) {
        // alert(empSelect.dateOfBirth);
        set_id(empSelect._id);
        setEmployeeselection(empSelect);
        setEmployeeId(empSelect.employeeId);
        setPosition(empSelect.position);
        setDepartment(empSelect.department);
        setWorkplace(empSelect.workplace);
        setJobtype(empSelect.jobtype);
        setStartjob(empSelect.startjob ? new Date(empSelect.startjob) : '');
        setEndjob(empSelect.endjob ? new Date(empSelect.startjob) : '');
        setExceptjob(empSelect.exceptjob ? new Date(empSelect.exceptjob) : '');
        setPrefix(empSelect.prefix);
        setName(empSelect.name);
        setLastName(empSelect.lastName);
        setNickName(empSelect.nickName);
        setGender(empSelect.gender);

        setDateOfBirth(new Date(empSelect.dateOfBirth));
        setAge(empSelect.age);
        setIdCard(empSelect.idCard);
        setEthnicity(empSelect.ethnicity);
        setReligion(empSelect.religion);
        setMaritalStatus(empSelect.maritalStatus);
        setMilitaryStatus(empSelect.militaryStatus);
        setAddress(empSelect.address);
        setCurrentAddress(empSelect.currentAddress);
        setPhoneNumber(empSelect.phoneNumber);
        setEmergencyContactNumber(empSelect.emergencyContactNumber);
        setIdLine(empSelect.idLine);
        // setVaccination(empSelect.vaccination);
        const temp = empSelect.vaccination.map((item) => [...item]);
        //        alert(temp);
        setVaccination(temp);
        setTreatmentRights(empSelect.treatmentRights);

    }

    async function handleManageEmployee(event) {
        event.preventDefault();

        const data = {

            employeeId: employeeId,
            position: position,
            department: department,
            workplace: workplace,
            jobtype: jobtype,
            startjob: startjob,
            endjob: endjob,
            exceptjob: exceptjob,
            prefix: prefix,
            name: name,
            lastName: lastName,
            nickName: nickName,
            gender: gender,
            dateOfBirth: dateOfBirth,
            age: age,
            idCard: idCard,
            ethnicity: ethnicity,
            religion: religion,
            maritalStatus: maritalStatus,
            militaryStatus: militaryStatus,
            address: address,
            currentAddress: currentAddress,
            phoneNumber: phoneNumber,
            emergencyContactNumber: emergencyContactNumber,
            idLine: idLine,
            vaccination: vaccination,
            treatmentRights: treatmentRights,
        };


        //check create or update Employee
        if (newEmp) {
            // alert('create employee');

            if (buttonValue == 'create') {

            try {
                const response = await axios.post(endpoint + '/employee/create', data);
                setEmployeesResult(response.data.employees);
handleUpload();

            } catch (error) {
                alert('กรุณาตรวจสอบข้อมูลในช่องกรอกข้อมูล');
                // window.location.reload();

            }

        }

        } else {
            if (buttonValue == 'save') {
                // Make the API call to update the resource by ID
                try {
                    const response = await axios.put(endpoint + '/employee/update/' + _id, data);
                    // setEmployeesResult(response.data.employees);
                    if (response) {
                        handleUpload();

                        alert("บันทึกสำเร็จ");
updateEmployeeLocal(response.data);

                        window.location.reload();

                    }
                } catch (error) {
                    alert('กรุณาตรวจสอบข้อมูลในช่องกรอกข้อมูล');
                    alert(error);
                    window.location.reload();
                }


            }

        }

    }


    const handleWorkplace = (event) => {
        setWorkplace(event.target.value);
        setEmployeeData(prevData => ({
            ...prevData,
            ['workplace']: event.target.value
        }));

        const filtered = workplaceSelection.filter(wp =>
            event.target.value === '' || wp.workplaceName === event.target.value
        )
        // alert(JSON.stringify(filtered , null, 2) );
        // alert(filtered[0].workplaceArea );
        if (filtered !== '') {
            if (employeeData.workplace == '') {
                setWorkplacearea('');
            } else {
                setWorkplacearea(filtered[0].workplaceArea);
            }

        } else {
            setWorkplacearea('');
        }

        // setWorkplacearea(filtered[0].workplaceArea );
    };
    const handleJobtype = (event) => {
        setJobtype(event.target.value);
    };
    const handlePrefix = (event) => {
        setPrefix(event.target.value);
    };
    const handleGender = (event) => {
        setGender(event.target.value);
    };
    const handleMilitaryStatus = (event) => {
        setMilitaryStatus(event.target.value);
    };

    const handleStartDateChange = (date) => {
        setStartjob(date);
    };
    const handleEndDateChange = (date) => {
        setEndjob(date);
    };
    const handleExceptDateChange = (date) => {
        setExceptjob(date);
    };
    const handleDateOfBirth = (date) => {
        setDateOfBirth(date);
    };

    //check create employee or update employee by click select employee
    useEffect(() => {
        // setNewEmp(true);
        if (employeeselection.length > 0) {
            setNewEmp(true);
        } else {
            setNewEmp(false);
        }

    }, [employeeselection]);

    useEffect(() => {
        const storedItem = localStorage.getItem('selectedEmployees');
        if (storedItem) {
            // Item exists in localStorage
            // setStoredEmp(storedItem);
            const parsedData = JSON.parse(storedItem);
            setStoredEmp(parsedData);
            //      console.log('Item exists:', storedItem);
            setNewEmp(true);

            // setNewEmp(false);
        } else {
            // Item does not exist in localStorage
            console.log('Item does not exist');
            setNewEmp(true);
        }
    }, []);


    useEffect(() => {
        // Listen for the custom event when selectedEmployees change in localStorage
        const handleSelectedEmployeesChange = (event) => {
            const { selectedEmployees } = event.detail;
            setStoredEmp(selectedEmployees);
        };

        window.addEventListener('selectedEmployeesChanged', handleSelectedEmployeesChange);

        return () => {
            window.removeEventListener('selectedEmployeesChanged', handleSelectedEmployeesChange);
        };
    }, []);

    console.log(vaccination);
    return (
        <body class="hold-transition sidebar-mini" className='editlaout'>
            <div class="wrapper">
                <div class="content-wrapper">
                    <ol class="breadcrumb">
                        <li class="breadcrumb-item"><i class="fas fa-home"></i> <a href="index.php">หน้าหลัก</a></li>
                        <li class="breadcrumb-item"><a href="#"> ระบบบริหารจัดการข้อมูล</a></li>
                        <li class="breadcrumb-item active">ข้อมูลส่วนบุคคลพนักงาน</li>
                    </ol>
                    <div class="content-header">
                        <div class="container-fluid">
                            <div class="row mb-2">
                                <h1 class="m-0"><i class="far fa-arrow-alt-circle-right"></i> ข้อมูลส่วนบุคคลพนักงาน</h1>
                            </div>
                        </div>
                    </div>
                    <section class="content">
                        <div class="container-fluid">
                            <form onSubmit={handleManageEmployee}>
                                <h2 class="title">ข้อมูลพนักงาน</h2>
                                <div class="row">
                                    <div class="col-md-9">
                                        <section class="Frame">
                                            <div class="col-md-12">
                                                <div class="row">
                                                    <div class="col-md-3">
                                                        <div class="form-group">
                                                            <label role="employeeId">รหัสพนักงาน</label>
                                                            <input type="text" class="form-control" id="employeeId" placeholder="รหัสพนักงาน" value={employeeId} onChange={(e) => setEmployeeId(e.target.value)} />
                                                        </div>
                                                    </div>
                                                    <div class="col-md-3">
                                                        <div class="form-group">
                                                            <label role="position">ตำแหน่ง</label>
                                                            <input type="text" class="form-control" id="position" placeholder="ตำแหน่ง" value={position} onChange={(e) => setPosition(e.target.value)} />
                                                        </div>
                                                    </div>
                                                    <div class="col-md-3">
                                                        <div class="form-group">
                                                            <label role="department">แผนก</label>
                                                            <input type="text" class="form-control" id="department" placeholder="แผนก" value={department} onChange={(e) => setDepartment(e.target.value)} />
                                                        </div>
                                                    </div>
                                                    <div class="col-md-3">
                                                        <div class="form-group">
                                                            <label role="workplace">หน่วยงาน</label>
                                                            {/* <select id="workplace" name="workplace" class="form-control"
                                                                value={workplace} onChange={handleWorkplace}>
                                                                <option value="บริษัท ไทย เอ็นโอเค จำกัด (โรงงานบางประกง)">บริษัท ไทย เอ็นโอเค จำกัด (โรงงานบางประกง)</option>
                                                                <option value="Gulf สำนักงานใหญ่">Gulf สำนักงานใหญ่</option>
                                                            </select> */}
                                                            {/* <select id="workplace" name="workplace" class="form-control"
                                                                value={workplace} onChange={handleWorkplace}>
                                                                <option value="">ยังไม่ระบุหน่วยงาน</option>
                                                                {workplaceSelection.map(wp => (
                                                                    <option key={wp._id} value={wp.workplaceId}> {wp.workplaceName}</option>

                                                                ))}
                                                            </select> */}
                                                            <input
                                                                type="text"
                                                                id="workplace"
                                                                name="workplace"
                                                                list="workplaces"
                                                                className="form-control"
                                                                value={workplace}
                                                                onChange={handleWorkplace}
                                                            />

                                                            <datalist id="workplaces">
                                                                <option value="">ยังไม่ระบุหน่วยงาน</option>
                                                                {workplaceSelection.map((wp) => (
                                                                    <option key={wp._id} value={wp.workplaceId}>
                                                                        {wp.workplaceName}
                                                                    </option>
                                                                ))}
                                                            </datalist>

                                                        </div>
                                                    </div>
                                                </div>
                                                <div class="row">
                                                    <div class="col-md-3">
                                                        <div class="form-group">
                                                            <label role="jobtype">ประเภทการจ้าง</label>
                                                            <select id="jobtype" name="jobtype" class="form-control"
                                                                value={jobtype} onChange={handleJobtype}>
                                                                <option value="ประจำ">ประจำ</option>
                                                                <option value="ไม่ประจำ">ไม่ประจำ</option>
                                                                <option value="รายวัน">รายวัน</option>
                                                                <option value="รายครั้ง">รายครั้ง</option>
                                                            </select>
                                                        </div>
                                                    </div>
                                                    <div class="col-md-3">
                                                        <div class="form-group">
                                                            <label role="startjob">วันที่เริ่มงาน</label>
                                                            <div style={{ position: 'relative', zIndex: 9999 }}>
                                                                <DatePicker id="startjob" name="startjob"
                                                                    className="form-control"
                                                                    popperClassName="datepicker-popper"
                                                                    selected={startjob}
                                                                    onChange={handleStartDateChange}
                                                                    dateFormat="dd/MM/yyyy" />
                                                            </div>
                                                        </div>
                                                    </div>

                                                    <div class="col-md-3">
                                                        <div class="form-group">
                                                            <label role="endjob">วันที่ลาออก/หมดสัญญา</label>
                                                            <div style={{ position: 'relative', zIndex: 9999 }}>
                                                                <DatePicker id="endjob" name="endjob"
                                                                    className="form-control"
                                                                    popperClassName="datepicker-popper"
                                                                    selected={endjob}
                                                                    onChange={handleEndDateChange}
                                                                    dateFormat="dd/MM/yyyy" />
                                                            </div>
                                                        </div>
                                                    </div>


                                                    <div class="col-md-3">
                                                        <div class="form-group">
                                                            <label role="exceptjob">วันที่บรรจุ</label>
                                                            <div style={{ position: 'relative', zIndex: 9999 }}>
                                                                <DatePicker id="exceptjob" name="exceptjob"
                                                                    className="form-control"
                                                                    popperClassName="datepicker-popper"
                                                                    selected={exceptjob}
                                                                    onChange={handleExceptDateChange}
                                                                    dateFormat="dd/MM/yyyy" />
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div class="row">
                                                    <div class="col-md-6">
                                                        <div class="form-group">
                                                            <label>อัพโหลดลายนิ้วมือ</label>
                                                            <div class="custom-file">
                                                                <input type="file" class="custom-file-input" id="customFile" />
                                                                <label class="custom-file-label" for="customFile">เลือกไฟล์</label>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div class="col-md-6">
                                                        <div class="form-group">
                                                            <label>อัพโหลดใบหน้า</label>
                                                            <div class="custom-file">
                                                            {/* <input type="file" onChange={handleFileChange} /> */}
                                                                <input type="file" class="custom-file-input " id="customFile" multiple accept='image/*' onChange={onImageChange} />
                                                                <label class="custom-file-label" for="customFile">เลือกไฟล์</label>
                                                            </div>
                                                        </div>
                                                        {imageURLs.map((imageSrc, idx) => (
                                                            <img key={idx} width="150rem" height="250rem" src={imageSrc} />
                                                        ))}
                                                    </div>
                                                </div>
                                            </div>
                                        </section>
                                        {/* <!--Frame--> */}
                                    </div>
                                    <div class="col-md-3">
                                        <section class="Frame">
                                            <EmployeesSelected onEmployeeSelect={onEmployeeSelect} />
                                        </section>
                                    </div>
                                </div>
                                <h2 class="title">ข้อมูลส่วนบุคคลพนักงาน</h2>
                                <div class="row">
                                    <div class="col-md-9">
                                        <section class="Frame">
                                            <div class="col-md-12">
                                                <div class="row">
                                                    <div class="col-md-3">
                                                        <div class="form-group">
                                                            <label role="prefix">คำนำหน้า</label>
                                                            <select id="prefix" name="prefix" class="form-control"
                                                                value={prefix} onChange={handlePrefix}>
                                                                <option value="นาย">นาย</option>
                                                                <option value="นาง">นาง</option>
                                                                <option value="นางสาว">นางสาว</option>
                                                            </select>
                                                        </div>
                                                    </div>
                                                    <div class="col-md-3">
                                                        <div class="form-group">
                                                            <label role="name">ชื่อ</label>
                                                            <input type="text" name="name" class="form-control" id="name" placeholder="ชื่อ" value={name} onChange={(e) => setName(e.target.value)} />
                                                        </div>
                                                    </div>
                                                    <div class="col-md-3">
                                                        <div class="form-group">
                                                            <label role="lastName">นามสกุล</label>
                                                            <input type="text" name="lastName" class="form-control" id="lastName" placeholder="นามสกุล" value={lastName} onChange={(e) => setLastName(e.target.value)} />
                                                        </div>
                                                    </div>

                                                    <div class="col-md-3">
                                                        <div class="form-group">
                                                            <label role="nickName">ชื่อเล่น</label>
                                                            <input type="text" name="nickName" class="form-control" id="nickName" placeholder="ชื่อเล่น" value={nickName} onChange={(e) => setNickName(e.target.value)} />
                                                        </div>
                                                    </div>
                                                </div>
                                                <div class="row">
                                                    <div class="col-md-3">
                                                        <div class="form-group">
                                                            <label role="gender">เพศ</label>
                                                            <select name="gender" id="gender" class="form-control"
                                                                value={gender} onChange={handleGender}>
                                                                <option value="ชาย">ชาย</option>
                                                                <option value="หญิง">หญิง</option>
                                                            </select>
                                                        </div>
                                                    </div>

                                                    <div class="col-md-3">
                                                        <div class="form-group">
                                                            <label role="dateOfBirth">วันเดือนปีเกิด</label>
                                                            <div style={{ position: 'relative', zIndex: 9999 }}>
                                                                <DatePicker id="dateOfBirth" name="dateOfBirth"
                                                                    className="form-control"
                                                                    popperClassName="datepicker-popper"
                                                                    selected={dateOfBirth}
                                                                    onChange={handleDateOfBirth}
                                                                    dateFormat="dd/MM/yyyy" />
                                                            </div>
                                                        </div>
                                                    </div>

                                                    {/* <div class="col-md-3">
                                                        <div class="form-group">
                                                            <label role="dateOfBirth">วันเดือนปีเกิด</label>
                                                            <DatePicker id="dateOfBirth" name="dateOfBirth"
                                                                selected={dateOfBirth}
                                                                onChange={handleDateOfBirth}
                                                                dateFormat="dd/MM/yyyy" />
                                                        </div>
                                                    </div> */}

                                                    <div class="col-md-3">
                                                        <div class="form-group">
                                                            <label role="age">อายุ</label>
                                                            <input type="text" name="age" class="form-control" id="age" placeholder="อายุ" value={age} onChange={(e) => setAge(e.target.value)} />
                                                        </div>
                                                    </div>

                                                    <div class="col-md-3">
                                                        <div class="form-group">
                                                            <label role="idCard">เลขบัตรประจำตัวประชาชน</label>
                                                            <input type="text" name="idCard" class="form-control" id="idCard" placeholder="เลขบัตรประจำตัวประชาชน" value={idCard} onChange={(e) => setIdCard(e.target.value)} />
                                                        </div>
                                                    </div>
                                                </div>
                                                <div class="row">
                                                    <div class="col-md-3">
                                                        <div class="form-group">
                                                            <label role="ethnicity">เชื้อชาติ</label>
                                                            <input type="text" name="ethnicity" class="form-control" id="ethnicity" placeholder="เชื้อชาติ" value={ethnicity} onChange={(e) => setEthnicity(e.target.value)} />
                                                        </div>
                                                    </div>
                                                    <div class="col-md-3">
                                                        <div class="form-group">
                                                            <label role="religion">ศาสนา</label>
                                                            <input type="text" name="religion" class="form-control" id="religion" placeholder="ศาสนา" value={religion} onChange={(e) => setReligion(e.target.value)} />
                                                        </div>
                                                    </div>
                                                    <div class="col-md-3">
                                                        <div class="form-group">
                                                            <label role="maritalStatus">สถานภาพการสมรส</label>
                                                            <input type="text" name="maritalStatus" class="form-control" id="maritalStatus" placeholder="สถานภาพการสมรส" value={maritalStatus} onChange={(e) => setMaritalStatus(e.target.value)} />
                                                        </div>
                                                    </div>
                                                    <div class="col-md-3">
                                                        <div class="form-group">
                                                            <label role="militaryStatus">สถานภาพทางการทหาร</label>
                                                            <select name="militaryStatus" id="militaryStatus" class="form-control"
                                                                value={militaryStatus} onChange={handleMilitaryStatus}>
                                                                <option value="ยกเว้นการเกณฑ์ทหาร">ยกเว้นการเกณฑ์ทหาร</option>
                                                                <option value="ผ่านการเกณฑ์ทหารแล้ว">ผ่านการเกณฑ์ทหารแล้ว</option>
                                                                <option value="ไม่ผ่านการเกณฑ์ทหาร">ไม่ผ่านการเกณฑ์ทหาร</option>
                                                            </select>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div class="row">
                                                    <div class="col-md-6">
                                                        <div class="form-group">
                                                            <label role="address">ที่อยู่ตามบัตรประชาชน</label>
                                                            <textarea name="address" id="address" class="form-control" rows="3" value={address} onChange={(e) => setAddress(e.target.value)} ></textarea>
                                                        </div>
                                                    </div>
                                                    <div class="col-md-6">
                                                        <div class="form-group">
                                                            <label role="currentAddress">ที่อยู่ปัจจุบัน</label>
                                                            <div class="icheck-primary d-inline">
                                                                <input type="checkbox" checked={copyAddress} id="" name="radio1" onChange={handleCheckboxChange}
                                                                /> ใช้ที่อยู่ตามบัตรประชาชน
                                                            </div>
                                                            <textarea name="currentAddress" id="currentAddress" class="form-control" rows="3" value={currentAddress} onChange={(e) => setCurrentAddress(e.target.value)} ></textarea>
                                                        </div>
                                                    </div>
                                                </div>
                                                {/* <!--row--> */}
                                                <div class="row">
                                                    <div class="col-md-3">
                                                        <div class="form-group">
                                                            <label role="phoneNumber">เบอร์โทรศัพท์</label>
                                                            <input type="text" name="phoneNumber" class="form-control" id="phoneNumber" placeholder="เบอร์โทรศัพท์" value={phoneNumber} onChange={(e) => setPhoneNumber(e.target.value)} />
                                                        </div>
                                                    </div>
                                                    <div class="col-md-3">
                                                        <div class="form-group">
                                                            <label role="emergencyContactNumber">เบอร์ติดต่อกรณีฉุกเฉิน</label>
                                                            <input type="text" name="emergencyContactNumber" class="form-control" id="emergencyContactNumber" placeholder="เบอร์ติดต่อกรณีฉุกเฉิน" value={emergencyContactNumber} onChange={(e) => setEmergencyContactNumber(e.target.value)} />
                                                        </div>
                                                    </div>
                                                    <div class="col-md-3">
                                                        <div class="form-group">
                                                            <label role="idLine">ไอดีไลน์</label>
                                                            <input type="text" name="idLine" class="form-control" id="idLine" placeholder="ไอดีไลน์" value={idLine} onChange={(e) => setIdLine(e.target.value)} />
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            {/* <!--col-md-12--> */}
                                        </section>
                                        {/* <!--Frame--> */}
                                    </div>
                                </div>
                                <h2 class="title">ข้อมูลสุขภาพ</h2>
                                <div class="row">
                                    <div class="col-md-9">
                                        <section class="Frame">

                                            <div>
                                                <label role="vaccination">การรับวัคซีน:</label>
                                                <input
                                                    class="form-control"
                                                    type="text"
                                                    name="vaccination"
                                                    id="vaccination"
                                                    value={newVaccination}
                                                    onChange={handleVaccination}
                                                    placeholder="เพิ่มวัคซีนที่ได้รับ"
                                                />
                                                <br />
                                                <button type="button" class="btn btn-primary" onClick={handleAddVaccination}>เพิ่มวัคซีน</button>
                                                <br />
                                                <br />
                                                {/* <h2 class="title">วัคซีนที่ได้รับ</h2> */}
                                                <label style={{ paddingLeft: "10px" }}>วัคซีนที่ได้รับ</label>

                                                <ul>
                                                    {vaccination.map((item, index) => (
                                                        <li key={index}>{item}
                                                            <button type="button" onClick={() => handleRemoveVaccination(item)} class="btn btn-info" style={{ margin: '0.5rem', width: "4rem" }}>ลบ</button></li>
                                                        // <li key={index}>{item}<button class="btn btn-info" style={{ margin: '0.5rem', width: "4rem" }}>ลบ</button></li>
                                                        // <li key={index}>{item}<button class="btn btn-info" style={{ margin: '0.5rem', width: "4rem" }}>ลบ</button></li>
                                                    ))}
                                                </ul>
                                            </div>


                                            {/* <div class="row">
                                                <div class="form-group">
                                                    <label style={{ paddingLeft: "10px" }}>การรับวัคซีน</label>
                                                    <div class="col-md-12" style={{ marginTop: "10px" }}>
                                                        <div class="icheck-primary d-inline">
                                                            <input type="radio" id="radioPrimary1" name="r1" /> ได้รับวัคซีนแล้ว
                                                        </div>
                                                        <div class="icheck-primary d-inline">
                                                            <input type="radio" id="radioPrimary2" name="r1" />  ยังไม่ได้รับวัคซีน
                                                        </div>
                                                    </div>
                                                </div>
                                            </div> */}
                                            <div class="row">
                                                <div class="col-md-6">
                                                    <div class="form-group">
                                                        <label>สิทธิการรักษาพยาบาล</label>
                                                        <input type="text" name="treatmentRights" class="form-control" id="treatmentRights" placeholder="สิทธิการรักษาพยาบาล" value={treatmentRights} onChange={(e) => setTreatmentRights(e.target.value)} />
                                                    </div>
                                                </div>
                                            </div>
                                        </section>
                                        {/* <!--Frame--> */}
                                    </div>
                                </div>
                                <div class="line_btn">
                                    {newEmp ? (
                                        <button type="submit" name="save" value="create" onClick={() => setButtonValue('create')} class="btn b_save"><i class="nav-icon fas fa-save"></i> &nbsp;สร้างพนักงานใหม่</button>
                                    ) : (
                                        <button type="submit" name="save" value="save" onClick={() => setButtonValue('save')} class="btn b_save"><i class="nav-icon fas fa-save"></i> &nbsp;บันทึก</button>
                                    )}
                                    <button class="btn clean"><i class="far fa-window-close"></i> &nbsp;ยกเลิก</button>
                                </div>

                            </form>
                        </div>
                        {/* <!-- /.container-fluid --> */}
                    </section>
                    {/* <!-- /.content --> */}
                </div>
            </div>
        </body>

    )
}

export default Employee