import endpoint from '../../config';

import axios from 'axios';
import React, { useState, useEffect } from 'react';
import jsPDF from 'jspdf';

const SendEmployeePDF2 = () => {
    // const [input1, setInput1] = useState('');
    // const [input2, setInput2] = useState('');

    // const [inputValuesTest, setInputValuesTest] = useState([
    //     { input1: '', input2: '' } // Initial object structure
    // ]);

    // const handleInputChangeTest = (index, inputField, value) => {
    //     const newInputValues = [...inputValuesTest];
    //     newInputValues[index][inputField] = value;
    //     setInputValuesTest(newInputValues);
    // };

    // const addInput = () => {
    //     setInputValuesTest([...inputValuesTest, { input1: '', input2: '' }]);
    // };

    // const deleteInput = (index) => {
    //     const newInputValues = [...inputValuesTest];
    //     newInputValues.splice(index, 1);
    //     setInputValuesTest(newInputValues);
    // };
    const [employeeList, setEmployeeList] = useState([]);

    useEffect(() => {
        // Fetch data from the API when the component mounts
        fetch(endpoint + '/employee/list')
            .then(response => response.json())
            .then(data => {
                // Update the state with the fetched data
                setEmployeeList(data);
            })
            .catch(error => {
                console.error('Error fetching data:', error);
            });
    }, []); // The empty array [] ensures that the effect runs only once after the initial render
    console.log(employeeList);

    const [input1, setInput1] = useState('');
    const [input2, setInput2] = useState('');

    const [lastName, setLastName] = useState('');
    const [age, setAge] = useState('');
    const [dateOfBirth, setDateOfBirth] = useState('');
    const [idCard, setIdCard] = useState('');
    const [address, setAddress] = useState('');
    const [currentAddress, setCurrentAddress] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [maritalStatus, setMaritalStatus] = useState('');
    const [emergencyContactNumber, setEmergencyContactNumber] = useState('');

    const [inputValuesTest, setInputValuesTest] = useState([]);

    useEffect(() => {
        if (input1 && employeeList.length > 0) {
            const employee = employeeList.find(emp => emp.employeeId === input1);
            if (employee) {
                setInput2(employee.name);

                setLastName(employee.lastName);
                setAge(employee.age);
                setDateOfBirth(employee.dateOfBirth);
                setIdCard(employee.idCard);
                setAddress(employee.address);
                setCurrentAddress(employee.currentAddress);
                setPhoneNumber(employee.phoneNumber);
                setMaritalStatus(employee.maritalStatus);
                setEmergencyContactNumber(employee.emergencyContactNumber);
            }
        }
    }, [input1, employeeList]);

    const addInput = () => {
        // e.preventDefault();
        setInputValuesTest([
            ...inputValuesTest,
            {
                Id: input1, Name: input2 + ' ' + lastName, age: age, dateOfBirth: dateOfBirth, idCard: idCard, address: address,
                currentAddress: currentAddress, phoneNumber: phoneNumber, maritalStatus: maritalStatus, emergencyContactNumber: emergencyContactNumber
            }
        ]);
        setInput1(''); // Clear the input1 field after adding
        setInput2(''); // Clear the input2 field after adding
    };
    useEffect(() => {
        const handleKeyPress = (event) => {
            if (event.key === 'Enter') {
                addInput();
            }
        };

        document.addEventListener('keydown', handleKeyPress);

        return () => {
            document.removeEventListener('keydown', handleKeyPress);
        };
    }, [addInput]);

    const deleteInput = (index) => {
        const newInputValues = inputValuesTest.filter((_, i) => i !== index);
        setInputValuesTest(newInputValues);
    };

    const generatePDF2 = () => {
        // const doc = new jsPDF();
        const doc = new jsPDF({
            orientation: 'portrait', // 'portrait' or 'landscape'
            unit: 'mm', // measurement unit (you can choose from 'pt', 'mm', 'cm', or 'in')
            format: 'a4' // sets the document format to A4
        });
        // const fontPath = '/assets/fonts/THSarabunNew.ttf';
        // doc.addFileToVFS(fontPath);
        // doc.addFont(fontPath, 'THSarabunNew', 'normal');
        const fontPath = '/assets/fonts/THSarabunNew Bold.ttf';
        doc.addFileToVFS(fontPath);
        doc.addFont(fontPath, 'THSarabunNew-Bold', 'normal');
        doc.setFont('THSarabunNew-Bold');
        doc.setFontSize(14);

        // doc.setFont('THSarabunNew');

        inputValuesTest.forEach((value, index) => {
            if (index > 0) {
                doc.addPage(); // Add a new page for each set of inputs after the first
            }
            const x = 60;
            const x2 = 100;
            const y = 60;
            const y2 = 10;

            // const y2 = 100;

            const maxWidth = 100; // Adjust the width as needed
            const text = 'Some text that might be really long and is intended to exceed the maximum width, causing it to be split into multiple lines because it is too long to fit on a single line.';
            const textLines2 = doc.splitTextToSize(text + 'Extra long string', maxWidth);
            // console.log(textLines2.length);
            // doc.text(`${textLines2.length}`, x2, y + 10);
            const textLines = doc.splitTextToSize(value.address + '55555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555', maxWidth);
            // doc.text(textLines.length, x, y + 10);

            textLines.forEach((line, index) => {
                doc.text(line, x2, y + (y2 * 7) + index * 10); // Use appropriate Y positioning for each line
            });
            doc.setFontSize(20);
            // doc.setFontStyle('bold');
            doc.setLineWidth(1); // Increase line width for boldness
            doc.rect(20, 20, 100, 100); // (x, y, width, height)

            doc.text(`ประวัติพนักงาน`, 80, y);
            const textWidth = doc.getStringUnitWidth('ประวัติพนักงาน') * doc.internal.getFontSize() / doc.internal.scaleFactor;
            // Add an underline
            doc.setLineWidth(0.1);
            doc.line(80, y + 3, 110, y + 3);

            doc.setFontSize(14);
            // doc.text(textLines.length, x, y + 10);

            doc.text(`ไอดี: `, x, y + (y2 * 2));
            doc.text(`ชื่อ: `, x, y + (y2 * 3));
            doc.text(`อายุ: `, x, y + (y2 * 4));
            doc.text(`วัน/เดือน/ปี เกิด: `, x, y + (y2 * 5));
            doc.text(`เลขบัตรประชาชน: `, x, y + (y2 * 6));
            doc.text(`ที่อยู่(ตามบัตรประชาชน): `, x, y + (y2 * 7));
            doc.text(`ที่อยู่(ที่สามารถติดต่อได้): `, x, y + (y2 * (7 + textLines.length)));
            doc.text(`เบอร์โทรศัพท์: `, x, y + (y2 * (8 + textLines.length)));
            doc.text(`สถานะภาพ: `, x, y + (y2 * (9 + textLines.length)));
            doc.text(`กรณีฉุกเฉินติดต่อได้: `, x, y + (y2 * (10 + textLines.length)));


            doc.text(`${value.Id}`, x2, y + (y2 * 2));
            doc.text(`${value.Name}`, x2, y + (y2 * 3));
            doc.text(`${value.age}`, x2, y + (y2 * 4));
            doc.text(`${value.dateOfBirth}`, x2, y + (y2 * 5));
            doc.text(`${value.idCard}`, x2, y + (y2 * 6));
            // doc.text(`${value.address}`, x2, y + 70);
            doc.text(`${value.currentAddress}`, x2, (y2 * (7 + textLines.length)));
            doc.text(`${value.phoneNumber}`, x2, y + (y2 * (8 + textLines.length)));
            doc.text(`${value.maritalStatus}`, x2, y + (y2 * (9 + textLines.length)));
            doc.text(`${value.emergencyContactNumber}`, x2, y + (y2 * (10 + textLines.length)));
        });

        const pdfContent = doc.output('bloburl');
        window.open(pdfContent, '_blank');
    };



    return (
        <div>
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
                                    <h1 class="m-0"><i class="far fa-arrow-alt-circle-right"></i> ใบลงเวลาการปฏิบัติงาน</h1>
                                </div>
                            </div>
                        </div>
                        {/* <!-- /.content-header -->
<!-- Main content --> */}
                        <section class="content">
                            <div class="row">
                                <div class="col-md-7">
                                    <section class="Frame">
                                        <div class="col-md-12">
                                            <div class="col-md-12">
                                                {/* {inputValuesTest.map((value, index) => (
                                                    <div className="row" key={index}>
                                                        <div className="col-md-3">
                                                            <label style={{ position: 'absolute', bottom: '0' }}>{index + 1}.</label>
                                                            <input
                                                                type="text"
                                                                className="form-control"
                                                                value={value.input1}
                                                                style={{ marginLeft: '1rem' }}
                                                                onChange={(e) => handleInputChangeTest(index, 'input1', e.target.value)}
                                                            />
                                                        </div>
                                                        <div className="col-md-3">
                                                            <label style={{ position: 'absolute', bottom: '0' }}>{index + 1}.</label>
                                                            <input
                                                                type="text"
                                                                className="form-control"
                                                                value={value.input2}
                                                                style={{ marginLeft: '1rem' }}
                                                                onChange={(e) => handleInputChangeTest(index, 'input2', e.target.value)}
                                                            />
                                                        </div>
                                                        <div className="col-md-6">
                                                            <button className="btn btn-danger" onClick={() => deleteInput(index)}>Delete</button>
                                                        </div>
                                                    </div>
                                                ))}

                                                <br />
                                                <button className="btn b_save" onClick={addInput}>Add Input</button> */}
                                                <div className="row">
                                                    <div className="col-md-3">
                                                        <label>Input 1:</label>
                                                        <input
                                                            type="text"
                                                            className="form-control"
                                                            value={input1}
                                                            onChange={(e) => setInput1(e.target.value)}
                                                        />
                                                    </div>
                                                    <div className="col-md-3">
                                                        <label>Input 2:</label>
                                                        <input
                                                            type="text"
                                                            className="form-control"
                                                            value={input2}
                                                            onChange={(e) => setInput2(e.target.value)}
                                                        />
                                                    </div>
                                                    <div className="col-md-6">
                                                        <button className="btn b_save" type="submit" onClick={addInput}>Add Input</button>
                                                    </div>
                                                </div>
                                                <br />
                                                {inputValuesTest.map((value, index) => (
                                                    <div className="row" key={index} style={{ border: '1px solid #000', padding: '5px', marginBottom: '5px' }}>
                                                        <div className="col-md-1" style={{ borderRight: '1px solid #000' }}>
                                                            {index + 1}
                                                        </div>
                                                        <div className="col-md-4" style={{ borderRight: '1px solid #000' }}>
                                                            {value.Id}
                                                        </div>
                                                        <div className="col-md-4" style={{ borderRight: '1px solid #000' }}>
                                                            {value.Name}
                                                        </div>
                                                        <div className="col-md-2">
                                                            <button className="btn b_save" style={{ width: '5rem' }} onClick={() => deleteInput(index)}>Delete</button>
                                                        </div>
                                                    </div>

                                                ))}
                                                <br />
                                                <br />
                                                <div className="row">
                                                    <div className="col-md-6">
                                                        <button className="btn b_save" onClick={generatePDF2}>Generate PDF</button>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </section>
                                </div>
                            </div>
                        </section>
                    </div>
                </div>
            </body>

        </div>
    );
};

export default SendEmployeePDF2;
