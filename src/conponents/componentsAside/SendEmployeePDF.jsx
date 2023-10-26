import React, { useState, useEffect } from 'react';
import jsPDF from 'jspdf';

const SendEmployeePDF = () => {
    const [inputValuesTest, setInputValuesTest] = useState(['']);
    const [formattedDate, setFormattedDate] = useState(['']);


    const handleInputChangeTest = (index, value) => {
        const newInputValues = [...inputValuesTest];
        newInputValues[index] = value;
        setInputValuesTest(newInputValues);
    };

    const addInput = () => {
        const newInputValues = [...inputValuesTest, ''];
        setInputValuesTest(newInputValues);
        // const uniqueNumber = inputValuesTest.length + 1; // Generate a unique number
        // setInputValuesTest([...inputValuesTest, `Input ${uniqueNumber}`]); // Add a new input with a unique number
    };

    // const generateUniqueInput = () => {
    //     const uniqueNumber = inputValuesTest.length + 1; // Generate a unique number
    //     setInputValuesTest([...inputValuesTest, `Input ${uniqueNumber}`]); // Add a new input with a unique number
    //   };

    const deleteInput = (index) => {
        const newInputValues = [...inputValuesTest];
        newInputValues.splice(index, 1);
        setInputValuesTest(newInputValues);
    };
    const [inputValues, setInputValues] = useState({
        input1: 'เรื่อง      ' + 'บริษัท โอวาท โปร แอนด์ ควิก จำกัด ขอขอบพระคุณเป็นอย่างยิ่งที่ท่านได้ไว้วางใจให้บริษัท ฯ ได้รับใช้ทำความสะอาดด้วยดีเสมอมา',
        input2: 'เรียน      ' + 'โอวาท โปร แอนด์ ควิก จำกัด ขอขอบพระคุณเป็นอย่างยิ่งที่ท่านได้ไว้วางใจให้บริษัท ฯ ได้รับใช้ทำความสะอาดด้วยดีเสมอมา',
        input3: 'บริษัท โอวาท โปร แอนด์ ควิก จำกัด ขอขอบพระคุณเป็นอย่างยิ่งที่ท่านได้ไว้วางใจให้บริษัท ฯ ได้รับใช้ทำความสะอาดด้วยดีเสมอมา',
        input4: 'บริษัท ฯ ใคร่ขอแจ้งให้ท่านทราบว่าพนักงานที่มีรายชื่อดั้งต่อไปนี้',
        input5: '',
        date: '',
        // Add more input fields as needed
    });
    const currentYear = new Date().getFullYear();

    const [day, setDay] = useState('01');
    const [month, setMonth] = useState('มกราคม');
    const [year, setYear] = useState(currentYear + 543);

    const handleDayChange = (e) => {
        setDay(e.target.value);
    };

    const handleMonthChange = (e) => {
        setMonth(e.target.value);
    };

    const handleYearChange = (e) => {
        setYear(e.target.value);
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setInputValues({ ...inputValues, [name]: value });
    };

    useEffect(() => {
        // Calculate the formatted date when day, month, or year changes
        const formattedDate = `วันที่ ${day} ${month} ${year}`;
        setInputValues({ ...inputValues, date: formattedDate });
        setFormattedDate(formattedDate);
    }, [day, month, year]);

    const generatePDF = () => {
        const doc = new jsPDF();
        const fontPath = '/assets/fonts/THSarabunNew.ttf';
        doc.addFileToVFS(fontPath);
        doc.addFont(fontPath, 'THSarabunNew', 'normal');

        // const positions = {
        //     input1: { x: 10, y: 40 },
        //     input2: { x: 10, y: 50 },
        //     input3: { x: 10, y: 60 },
        //     input4: { x: 10, y: 80 },
        //     input5: { x: 10, y: 140 },
        //     inputValuesTest: { x: 10, y: 160 }, // Adjust the y position
        //     date: { x: 100, y: 30 }, // Adjust the y position
        //     // Add more positions for additional inputs
        // };
        const positions = {
            input1: { x: 10, y: 20 },
            input2: { x: 10, y: 80 }, // Adjust the initial y position for input2
            input3: { x: 10, y: 0 }, // Adjust the initial y position for input3
            input4: { x: 10, y: 0 }, // Adjust the initial y position for input4
            input5: { x: 10, y: 0 }, // Adjust the initial y position for input5
            inputValuesTest: { x: 10, y: 30 }, // Adjust the y position
            date: { x: 100, y: 30 }, // Adjust the y position
            // Add more positions for additional inputs
        };

        doc.setFont('THSarabunNew');

        // Calculate the total height of the inputValuesTest array

        doc.setFont('THSarabunNew');
        // doc.text('เรื่อง', 20, 40);
        // doc.text('เรียน', 20, 50);
        // doc.text('เรื่อง', positions.input1.x, positions.input1.y);

        let previousInput = 'input1'; // Initialize with the first input


        // for (const name in inputValues) {
        //     if (inputValues.hasOwnProperty(name)) {
        //         const value = inputValues[name];
        //         const position = positions[name];

        //         // Split text to fit within a specific width (adjust width as needed)
        //         const maxWidth = 150; // Adjust the width as needed
        //         const textLines = doc.splitTextToSize(value, maxWidth);

        //         // Add a fixed indentation for all lines
        //         const initialIndentation = 30; // Adjust the initial indentation as needed

        //         // Iterate through text lines
        //         textLines.forEach((line, index) => {
        //             // Calculate indentation based on line index
        //             const indentation = index === 0 ? initialIndentation : 10;

        //             // Set x-position with indentation
        //             const x = position.x + indentation;

        //             // Display the line with the calculated position
        //             doc.text(line, x, position.y + index * 10);
        //         });

        //         // Calculate the Y position for the next input
        //         position.y += doc.internal.getFontSize() * textLines.length + 5;
        //     }
        // }
        // for (const name in inputValues) {
        //     if (inputValues.hasOwnProperty(name)) {
        //         const value = inputValues[name];
        //         const position = positions[name];

        //         // Split text to fit within a specific width (adjust width as needed)
        //         const maxWidth = 150; // Adjust the width as needed
        //         const textLines = doc.splitTextToSize(value, maxWidth);

        //         // Add a fixed indentation for all lines
        //         const initialIndentation = 30; // Adjust the initial indentation as needed

        //         // Calculate the Y position for the current input based on the previous input
        //         // position.y = positions[previousInput].y + doc.internal.getFontSize() * textLines.length + 5;
        //         position.y = positions[previousInput].y + doc.internal.getFontSize() * textLines.length + 5;


        //         // Iterate through text lines
        //         textLines.forEach((line, index) => {
        //             // Calculate indentation based on line index
        //             const indentation = index === 0 ? initialIndentation : 10;

        //             // Set x-position with indentation
        //             const x = position.x + indentation;

        //             // Display the line with the calculated position
        //             doc.text(line, x, position.y + (index * 10));
        //         });

        //         previousInput = name; // Update the previous input for the next iteration
        //     }
        // }

        for (const name in inputValues) {
            if (inputValues.hasOwnProperty(name)) {
                const value = inputValues[name];
                const position = positions[name];
        
                // Split text to fit within a specific width (adjust width as needed)
                const maxWidth = 150; // Adjust the width as needed
                const textLines = doc.splitTextToSize(value, maxWidth);
        
                // Add a fixed indentation for all lines
                const initialIndentation = 30; // Adjust the initial indentation as needed
        
                // Calculate the Y position for the current input based on the previous input
                position.y = positions[previousInput].y + doc.internal.getFontSize() * textLines.length + 5;
        
                // If this is input2, reduce the vertical space from the previous input (input1)
                if (name === 'input2') {
                    position.y -= 15; // Adjust the reduction value as needed
                }
        
                // Iterate through text lines
                textLines.forEach((line, index) => {
                    // Calculate indentation based on line index
                    const indentation = index === 0 ? initialIndentation : 10;
        
                    // Set x-position with indentation
                    const x = position.x + indentation;
        
                    // Display the line with the calculated position
                    doc.text(line, x, position.y + index * 10);
                });
        
                previousInput = name; // Update the previous input for the next iteration
            }
        }

        // Handle inputValuesTest
        inputValuesTest.forEach((value, index) => {
            const position = positions.inputValuesTest;

            doc.setFont('THSarabunNew');

            // Split text to fit within a specific width (adjust width as needed)
            const maxWidth = 100; // Adjust the width as needed
            const textLines = doc.splitTextToSize(value, maxWidth);

            // Add a fixed indentation for all lines
            const initialIndentation = 20; // Adjust the initial indentation as needed

            // Iterate through text lines
            textLines.forEach((line, lineIndex) => {
                // Calculate indentation based on line index
                const indentation = lineIndex === 0 ? initialIndentation : 10;

                // Set x-position with indentation
                const x = position.x + indentation;

                // Display the line with the calculated position
                doc.text(line, x, position.y + index * 10 + lineIndex * 10);
            });
        });

        // Display the formatted date
        // doc.setFont('THSarabunNew');
        // doc.text(formattedDate, positions.date.x, positions.date.y);

        // doc.save('user_input.pdf');
        const pdfContent = doc.output('bloburl'); // Convert the PDF to a blob URL

        // Open the generated PDF in a new tab
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
                                                <h1>Owat Maid</h1>
                                                เรื่อง :<input
                                                    type="text"
                                                    class="form-control"
                                                    name="input1"
                                                    value={inputValues.input1}
                                                    onChange={handleInputChange}
                                                />
                                                <br />
                                                เรียน :<input
                                                    type="text"
                                                    class="form-control"
                                                    name="input2"
                                                    value={inputValues.input2}
                                                    onChange={handleInputChange}
                                                /><br />
                                                {/* <input
                                                    type="text"
                                                    name="input3"
                                                    value={inputValues.input3}
                                                    onChange={handleInputChange}
                                                /> */}
                                                <textarea
                                                    name="input3"
                                                    class="form-control"
                                                    value={inputValues.input3}
                                                    onChange={handleInputChange}
                                                    rows="4" // Set the number of visible rows (adjust as needed)
                                                    cols="50" // Set the number of visible columns (adjust as needed)
                                                ></textarea>
                                                <br />
                                                <input
                                                    type="text"
                                                    class="form-control"
                                                    name="input4"
                                                    value={inputValues.input4}
                                                    onChange={handleInputChange}
                                                /><br />

                                                <div class="row">

                                                    <div class="col-md-2">
                                                        <label role="searchname">วัน</label>

                                                        <select className="form-control" value={day} onChange={handleDayChange}>
                                                            {Array.from({ length: 31 }, (_, i) => (
                                                                <option key={i} value={String(i + 1).padStart(2, '0')}>
                                                                    {String(i + 1).padStart(2, '0')}
                                                                </option>
                                                            ))}
                                                        </select>
                                                    </div>
                                                    <div class="col-md-4">
                                                        <label role="searchname">เดือน</label>

                                                        <select className="form-control" value={month} onChange={handleMonthChange}>
                                                            {/* {Array.from({ length: 12 }, (_, i) => (
                                                        <option key={i} value={String(i + 1).padStart(2, '0')}>
                                                            {String(i + 1).padStart(2, '0')}
                                                        </option>
                                                    ))} */}
                                                            <option value="มกราคม">มกราคม</option>
                                                            <option value="กุมภาพันธ์">กุมภาพันธ์</option>
                                                            <option value="มีนาคม">มีนาคม</option>
                                                            <option value="เมษายน">เมษายน</option>
                                                            <option value="พฤษภาคม">พฤษภาคม</option>
                                                            <option value="มิถุนายน">มิถุนายน</option>
                                                            <option value="กรกฎาคม">กรกฎาคม</option>
                                                            <option value="สิงหาคม">สิงหาคม</option>
                                                            <option value="กันยายน09">กันยายน</option>
                                                            <option value="ตุลาคม">ตุลาคม</option>
                                                            <option value="พฤศจิกายน">พฤศจิกายน</option>
                                                            <option value="ธันวาคม">ธันวาคม</option>
                                                        </select>
                                                    </div>
                                                    <div class="col-md-4">
                                                        <label role="searchname">ปี</label>

                                                        <select className="form-control" value={year} onChange={handleYearChange}>
                                                            {Array.from({ length: 100 }, (_, i) => (
                                                                <option key={i} value={String((currentYear - i) + 543)}>
                                                                    {String((currentYear - i) + 543)}
                                                                </option>
                                                            ))}
                                                        </select>
                                                    </div>
                                                </div>


                                                {/* Add more input fields as needed */}
                                                <textarea
                                                    name="input5"
                                                    class="form-control"
                                                    value={inputValues.input5}
                                                    onChange={handleInputChange}
                                                    rows="4" // Set the number of visible rows (adjust as needed)
                                                    cols="50" // Set the number of visible columns (adjust as needed)
                                                ></textarea>
                                                {inputValuesTest.map((value, index) => (
                                                    <div className="row" key={index}>

                                                        <div class="col-md-6">
                                                            <label style={{ position: 'absolute', bottom: '0' }}>{index + 1}.</label>
                                                            <input
                                                                type="text"
                                                                class="form-control"
                                                                value={value}
                                                                style={{ marginLeft: '1rem' }}
                                                                onChange={(e) => handleInputChangeTest(index, e.target.value)}
                                                            />
                                                        </div>
                                                        <div class="col-md-6">
                                                            <button class="btn btn-danger" onClick={() => deleteInput(index)}>Delete</button>
                                                        </div>



                                                    </div>
                                                ))}
                                                <button class="btn b_save" onClick={addInput}>Add Input</button>
                                                <br />
                                                <br />
                                                <div className="row">
                                                    <div class="col-md-6">
                                                        <button class="btn b_save" onClick={generatePDF}>Generate PDF</button>
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

export default SendEmployeePDF;
