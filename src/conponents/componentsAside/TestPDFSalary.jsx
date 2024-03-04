import React, { useState } from 'react';
import { jsPDF } from 'jspdf';
import 'jspdf-autotable';

import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

import moment from 'moment';
import 'moment/locale/th'; // Import the Thai locale data

function TestPDFSalary() {
  const [workDate, setWorkDate] = useState(new Date());
  const formattedWorkDate = moment(workDate).format('DD/MM/YYYY');
  const handleWorkDateChange = (date) => {
    setWorkDate(date);
  };
  const [present, setPresent] = useState('DATAOWAT');
  const [presentfilm, setPresentfilm] = useState("\\10.10.110.20\payrolldata\Report\User\PRUSR101.RPT");

  const formattedDate = workDate.toLocaleString('en-TH', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
    second: 'numeric',
    timeZone: 'Asia/Bangkok', // Thailand timezone
  });

  // const generatePDF = () => {
  //     const names = ['Alice', 'Bob', 'Charlie', 'David', 'Eva', 'Frank'];
  //     const ages = [25, 30, 22, 35, 28, 40];

  //     // Create a new instance of jsPDF
  //     const pdf = new jsPDF();

  //     // Set the initial position for text and frame
  //     let x = 20;

  //     // Loop through the names and ages arrays to add content to the PDF
  //     for (let i = 0; i < names.length; i += 2) {
  //         // Add a page for each pair of names
  //         if (i > 0) {
  //             pdf.addPage();
  //         }

  //         // Draw a square frame around the first name
  //         pdf.rect(x, 10, 60, 30);
  //         pdf.text(`Name: ${names[i]}`, x + 5, 20);
  //         pdf.text(`Age: ${ages[i]}`, x + 5, 30);

  //         // Move to the next column
  //         x += 80;

  //         // Draw a square frame around the second name if available
  //         if (i + 1 < names.length) {
  //             pdf.rect(x, 50, 60, 30);
  //             pdf.text(`Name: ${names[i + 1]}`, x + 5, 60);
  //             pdf.text(`Age: ${ages[i + 1]}`, x + 5, 70);
  //         }

  //         // Reset position for the next row
  //         x = 20;
  //     }

  //     // Open the generated PDF in a new tab
  //     window.open(pdf.output('bloburl'), '_blank');
  // };
  const workplaceList = [
    { name: 'Thai', workplaceId: '1001-25' },
    { name: 'Total', workplaceId: '1021-25' },
    { name: 'Miliral', workplaceId: '1031-25' },
    { name: 'Raimon', workplaceId: '1801-25' },
  ];

  const employees = [
    { name: 'pop', empID: '1525', workplaceId: '1001-25', salary: '200' },
    { name: 'popsd', empID: '1585', workplaceId: '1021-25', salary: '200' },
    { name: 'popsd', empID: '1585', workplaceId: '1021-25', salary: '200' },
    { name: 'popsd', empID: '1585', workplaceId: '1021-25', salary: '200' },
    { name: 'popsd', empID: '1585', workplaceId: '1021-25', salary: '200' },
    { name: 'popsd', empID: '1585', workplaceId: '1021-25', salary: '200' },
    { name: 'popsd', empID: '1585', workplaceId: '1021-25', salary: '200' },
    { name: 'popsd', empID: '1585', workplaceId: '1021-25', salary: '200' },
    { name: 'popsd', empID: '1585', workplaceId: '1021-25', salary: '200' },
    { name: 'popsd', empID: '1585', workplaceId: '1021-25', salary: '201' },
    { name: 'popsd', empID: '1585', workplaceId: '1021-25', salary: '200' },
    { name: 'popsd', empID: '1585', workplaceId: '1021-25', salary: '200' },
    { name: 'popsd', empID: '1585', workplaceId: '1021-25', salary: '200' },
    { name: 'popsd', empID: '1585', workplaceId: '1021-25', salary: '200' },
    { name: 'popsd', empID: '1585', workplaceId: '1021-25', salary: '200' },
    { name: 'popsd', empID: '1585', workplaceId: '1021-25', salary: '200' },
    { name: 'popsd', empID: '1585', workplaceId: '1021-25', salary: '200' },
    { name: 'popsd', empID: '1585', workplaceId: '1021-25', salary: '200' },
    { name: 'popsd', empID: '1585', workplaceId: '1021-25', salary: '200' },
    { name: 'popsd', empID: '1585', workplaceId: '1021-25', salary: '200' },
    { name: 'popsd', empID: '1585', workplaceId: '1021-25', salary: '200' },
    { name: 'popsd', empID: '1585', workplaceId: '1021-25', salary: '200' },

    { name: 'pffff', empID: '1425', workplaceId: '1021-25', salary: '200' },
    { name: 'plkioij', empID: '1625', workplaceId: '1021-25', salary: '200' },
    { name: 'bvcde', empID: '1595', workplaceId: '1021-25', salary: '200' },
    { name: 'wsxd', empID: '1425', workplaceId: '1031-25', salary: '200' },
    { name: 'dodod', empID: '15225', workplaceId: '1031-25', salary: '200' },
    { name: 'maassaa', empID: '1575', workplaceId: '1031-25', salary: '200' },
    { name: 'dodod', empID: '15225', workplaceId: '1031-25', salary: '200' },
    { name: 'maassaa', empID: '1575', workplaceId: '1031-25', salary: '200' },
    { name: 'dodod', empID: '15225', workplaceId: '1031-25', salary: '200' },
    { name: 'maassaa', empID: '1575', workplaceId: '1031-25', salary: '200' },
    { name: 'dodod', empID: '15225', workplaceId: '1031-25', salary: '200' },
    { name: 'maassaa', empID: '1575', workplaceId: '1031-25', salary: '200' },
    { name: 'dodod', empID: '15225', workplaceId: '1031-25', salary: '200' },
    { name: 'maassaa', empID: '1575', workplaceId: '1031-25', salary: '200' },
    { name: 'dodod', empID: '15225', workplaceId: '1031-25', salary: '200' },
    { name: 'maassaa', empID: '1575', workplaceId: '1031-25', salary: '200' },
    { name: 'dodod', empID: '15225', workplaceId: '1031-25', salary: '200' },
    { name: 'maassaa', empID: '1575', workplaceId: '1031-25', salary: '200' },
    { name: 'dodod', empID: '15225', workplaceId: '1031-25', salary: '200' },
    { name: 'maassaa', empID: '1575', workplaceId: '1031-25', salary: '200' },
    { name: 'dodod', empID: '15225', workplaceId: '1031-25', salary: '200' },
    { name: 'maassaa', empID: '1575', workplaceId: '1031-25', salary: '200' },
    { name: 'dodod', empID: '15225', workplaceId: '1031-25', salary: '200' },
    { name: 'maassaa', empID: '1575', workplaceId: '1031-25', salary: '200' },
    { name: 'dodod', empID: '15225', workplaceId: '1031-25', salary: '200' },
    { name: 'maassaa', empID: '1575', workplaceId: '1031-25', salary: '200' },
    { name: 'dodod', empID: '15225', workplaceId: '1031-25', salary: '200' },
    { name: 'maassaa', empID: '1575', workplaceId: '1031-25', salary: '200' },
    { name: 'maakksj', empID: '15995', workplaceId: '1801-25', salary: '200' },
    { name: 'ywywy', empID: '1225', workplaceId: '1801-25', salary: '200' },
  ];

  // // Grouping employees by workplace
  // const groupedByWorkplace = employees.reduce((acc, employee) => {
  //     const { workplace } = employee;
  //     acc[workplace] = acc[workplace] || [];
  //     acc[workplace].push(employee);
  //     return acc;
  // }, {});

  // // Now 'groupedByWorkplace' contains the employees grouped by workplace
  // console.log('groupedByWorkplace', groupedByWorkplace);

  const generatePDFTest = () => {
    // const groupedByWorkplace = employees.reduce((acc, employee) => {
    //     const { workplace, salary } = employee;
    //     acc[workplace] = acc[workplace] || { employees: [], totalSalary: 0 };
    //     acc[workplace].employees.push(employee);
    //     acc[workplace].totalSalary += parseInt(salary);
    //     return acc;
    //   }, {});

    //   const doc = new jsPDF({ orientation: 'landscape' });

    //   Object.keys(groupedByWorkplace).forEach((workplace, index) => {
    //     const { employees, totalSalary } = groupedByWorkplace[workplace];

    //     const startY = index === 0 ? 10 : doc.previousAutoTable.finalY + 15;

    //     doc.text(`Workplace: ${workplace}`, 10, startY);

    //     // Set the cellStyles option to customize cell styles, including cellHeight
    //     doc.autoTable({
    //       head: [['Name', 'Employee ID', 'Salary']],
    //       body: employees.map(({ name, empID, salary }) => [name, empID, salary]),
    //       startY: startY + 10,
    //       cellStyles: { cellHeight: 2 }, // Set the cellHeight
    //     });

    //     const totalRow = ['Total Salary', '', totalSalary.toString()];

    //     // Set the cellStyles option to customize cell styles, including cellHeight
    //     doc.autoTable({
    //       body: [totalRow],
    //       startY: doc.previousAutoTable.finalY + 10,
    //       margin: { left: 10 },
    //       cellStyles: { cellHeight: 2 }, // Set the cellHeight
    //     });

    //     doc.text(`Total Salary: ${totalSalary}`, 10, doc.previousAutoTable.finalY + 10);
    //   });

    //   window.open(doc.output('bloburl'), '_blank');


    ///////////////////////////////////////////////////////

    const groupedByWorkplace = employees.reduce((acc, employee) => {
      const { workplaceId, salary } = employee;
      acc[workplaceId] = acc[workplaceId] || { employees: [], totalSalary: 0 };
      acc[workplaceId].employees.push(employee);
      acc[workplaceId].totalSalary += parseInt(salary);
      return acc;
    }, {});

    const doc = new jsPDF({ orientation: 'landscape' });

    let currentY = 20;
    moment.locale('th');

    const formattedWorkDateDD = moment(workDate).format('DD');
    const formattedWorkDateMM = moment(workDate).format('MM');
    const formattedWorkDateYYYY = moment(workDate).format('YYYY');

    const fontPath = '/assets/fonts/THSarabunNew.ttf';
    const fontName = 'THSarabunNew';

    doc.addFileToVFS(fontPath);
    doc.addFont(fontPath, fontName, 'normal');

    // Set the font for the document
    doc.setFont(fontName);

    const numRows = 7;
    const numCols = 1;
    const cellWidth = 15;
    const cellHeight = 3.5;
    const startX = 5; // Adjust the starting X-coordinate as needed
    const startY = 55; // Adjust the starting Y-coordinate as needed
    const borderWidth = 0.5; // Adjust the border width as needed

    // Function to draw a cell with borders
    // const drawCell = (x, y, width, height) => {
    //     doc.rect(x, y, width, height);
    // };
    const drawCell = (x, y, width, height, text) => {
      // Draw the cell border
      doc.rect(x, y, width, height);

      // Calculate the center of the cell
      const centerX = x + width / 2;
      const centerY = y + height / 2;

      // Add text to the center of the cell
      doc.setFontSize(12);

      doc.text(text, centerX, centerY, { align: 'center', valign: 'middle' });
    };

    const numRowsTop = 1;
    const startXTop = 50; // Adjust the starting X-coordinate as needed
    const startYTop = 5; // Adjust the starting Y-coordinate as needed
    const cellHeightTop = 10;

    // const drawTableTop = () => {
    //     for (let i = 0; i < numRowsTop; i++) {
    //         for (let j = 0; j < numCols; j++) {
    //             const x = startX + j * cellWidth;
    //             const y = startYTop + i * cellHeightTop;
    //             drawCell(x, y, cellWidth, cellHeightTop);
    //         }
    //     }
    // };

    const drawID = () => {
      for (let i = 0; i < numRowsTop; i++) {
        for (let j = 0; j < numCols; j++) {
          const x = startX + j * cellWidth;
          const y = startYTop + i * cellHeightTop;

          // Add text for each cell
          const cellText = `รหัส`;
          drawCell(x, y, cellWidth, cellHeightTop, cellText);
          const cellText2 = ``;
          // drawCell(x, 195, cellWidth, cellHeightTop, cellText2);

        }
      }
    };


    const cellWidthName = 40;
    const startXName = 20; // Adjust the starting X-coordinate as needed
    const startYName = 55; // Adjust the starting Y-coordinate as needed

    const drawName = () => {
      for (let i = 0; i < numRowsTop; i++) {
        for (let j = 0; j < numCols; j++) {
          const x = startXName + j * cellWidthName;
          const y = startYTop + i * cellHeightTop;

          // Add text for each cell
          const cellText = `ชื่อ - สกุล`;
          drawCell(x, y, cellWidthName, cellHeightTop, cellText);
          const cellText2 = ``;
          // drawCell(x, 195, cellWidthName, cellHeightTop, cellText2);
        }
      }
    };

    const cellWidthAllDay = 10;
    const startXAllDay = 60; // Adjust the starting X-coordinate as needed
    const startYAllDay = 55; // Adjust the starting Y-coordinate as needed

    const drawAllDay = () => {
      for (let i = 0; i < numRowsTop; i++) {
        for (let j = 0; j < numCols; j++) {
          const x = startXAllDay + j * cellWidthAllDay;
          const y = startYTop + i * cellHeightTop;

          // Add text for each cell
          const cellText = `วัน`;
          drawCell(x, y, cellWidthAllDay, cellHeightTop, cellText);
          const cellText2 = ``;
          // drawCell(x, 195, cellWidthAllDay, cellHeightTop, cellText2);
        }
      }
    };

    const cellWidthSalary = 15;
    const startXSalary = 70; // Adjust the starting X-coordinate as needed
    const startYSalary = 55; // Adjust the starting Y-coordinate as needed

    const drawSalary = () => {
      for (let i = 0; i < numRowsTop; i++) {
        for (let j = 0; j < numCols; j++) {
          const x = startXSalary + j * cellWidthSalary;
          const y = startYTop + i * cellHeightTop;

          // Add text for each cell
          const cellText = `เงินเดือน`;
          drawCell(x, y, cellWidthSalary, cellHeightTop, cellText);
          const cellText2 = ``;
          // drawCell(x, 195, cellWidth, cellHeightTop, cellText2);
        }
      }
    };

    const cellWidthOT = 15;
    const startXOT = 70 + (cellWidthOT * 1); // Adjust the starting X-coordinate as needed
    const startYOT = 55; // Adjust the starting Y-coordinate as needed

    const drawOT = () => {
      for (let i = 0; i < numRowsTop; i++) {
        for (let j = 0; j < numCols; j++) {
          const x = startXOT + j * cellWidthOT;
          const y = startYTop + i * cellHeightTop;

          // Add text for each cell
          const cellText = `ค่าล่วงเวลา`;
          drawCell(x, y, cellWidthOT, cellHeightTop, cellText);
          const cellText2 = ``;
          // drawCell(x, 195, cellWidth, cellHeightTop, cellText2);
        }
      }
    };

    const cellWidthWelfare = 15;
    // const startXWelfare = 110; // Adjust the starting X-coordinate as needed
    const startXWelfare = 70 + (cellWidthOT * 2)
    const startYWelfare = 55; // Adjust the starting Y-coordinate as needed

    const drawWelfare = () => {
      for (let i = 0; i < numRowsTop; i++) {
        for (let j = 0; j < numCols; j++) {
          const x = startXWelfare + j * cellWidthWelfare;
          const y = startYTop + i * cellHeightTop;

          // Add text for each cell
          const cellText = `สวัสดิการ\nพิเศษ`;
          drawCell(x, y, cellWidthWelfare, cellHeightTop, cellText);
          const cellText2 = ``;
          // drawCell(x, 195, cellWidth, cellHeightTop, cellText2);
        }
      }
    };

    const cellWidthRoleWork = 15;
    // const startXRoleWork = 130; // Adjust the starting X-coordinate as needed
    const startXRoleWork = 70 + (cellWidthOT * 3)
    const startYRoleWork = 55; // Adjust the starting Y-coordinate as needed

    const drawRoleWork = () => {
      for (let i = 0; i < numRowsTop; i++) {
        for (let j = 0; j < numCols; j++) {
          const x = startXRoleWork + j * cellWidthRoleWork;
          const y = startYTop + i * cellHeightTop;

          // Add text for each cell
          const cellText = `ค่าตำแหน่ง`;
          drawCell(x, y, cellWidthRoleWork, cellHeightTop, cellText);
          const cellText2 = ``;
          // drawCell(x, 195, cellWidth, cellHeightTop, cellText2);
        }
      }
    };

    const cellWidthDiligenceAllowance = 15;
    // const startXResult = 310; // Adjust the starting X-coordinate as needed
    const startXDiligenceAllowance = 70 + (cellWidthOT * 4)
    const startYDiligenceAllowance = 55; // Adjust the starting Y-coordinate as needed

    const drawDiligenceAllowance = () => {
      for (let i = 0; i < numRowsTop; i++) {
        for (let j = 0; j < numCols; j++) {
          const x = startXDiligenceAllowance + j * cellWidthDiligenceAllowance;
          const y = startYTop + i * cellHeightTop;

          // Add text for each cell
          const cellText = `เบี้ยขยัน`;
          drawCell(x, y, cellWidthDiligenceAllowance, cellHeightTop, cellText);
          const cellText2 = ``;
          // drawCell(x, 195, cellWidth, cellHeightTop, cellText2);
        }
      }
    };

    const cellWidthHoliday = 15;
    // const startXHoliday = 150; // Adjust the starting X-coordinate as needed
    const startXHoliday = 70 + (cellWidthOT * 5)
    const startYHoliday = 55; // Adjust the starting Y-coordinate as needed

    const drawHoliday = () => {
      for (let i = 0; i < numRowsTop; i++) {
        for (let j = 0; j < numCols; j++) {
          const x = startXHoliday + j * cellWidthHoliday;
          const y = startYTop + i * cellHeightTop;

          // Add text for each cell
          const cellText = `นักขัตฤกษ์`;
          drawCell(x, y, cellWidthHoliday, cellHeightTop, cellText);
          const cellText2 = ``;
          // drawCell(x, 195, cellWidth, cellHeightTop, cellText2);
        }
      }
    };

    const cellWidthAddBeforeDeductTax = 15;
    // const startXAddBeforeDeductTax = 170; // Adjust the starting X-coordinate as needed
    const startXAddBeforeDeductTax = 70 + (cellWidthOT * 6)
    const startYAddBeforeDeductTax = 55; // Adjust the starting Y-coordinate as needed

    const drawAddBeforeDeductTax = () => {
      for (let i = 0; i < numRowsTop; i++) {
        for (let j = 0; j < numCols; j++) {
          const x = startXAddBeforeDeductTax + j * cellWidthAddBeforeDeductTax;
          const y = startYTop + i * cellHeightTop;

          // Add text for each cell
          const cellText = `บวกอื่นๆ\nก่อนหัก`;
          drawCell(x, y, cellWidthAddBeforeDeductTax, cellHeightTop, cellText);
          const cellText2 = ``;
          // drawCell(x, 195, cellWidth, cellHeightTop, cellText2);
        }
      }
    };

    const cellWidthMinusBeforeDeductTax = 15;
    // const startXMinusBeforeDeductTax = 190; // Adjust the starting X-coordinate as needed
    const startXMinusBeforeDeductTax = 70 + (cellWidthOT * 7)
    const startYMinusBeforeDeductTax = 55; // Adjust the starting Y-coordinate as needed

    const drawMinuseforeDeductTax = () => {
      for (let i = 0; i < numRowsTop; i++) {
        for (let j = 0; j < numCols; j++) {
          const x = startXMinusBeforeDeductTax + j * cellWidthMinusBeforeDeductTax;
          const y = startYTop + i * cellHeightTop;

          // Add text for each cell
          const cellText = `หักอื่นๆ\nก่อนภาษี`;
          drawCell(x, y, cellWidthMinusBeforeDeductTax, cellHeightTop, cellText);
          const cellText2 = ``;
          // drawCell(x, 195, cellWidth, cellHeightTop, cellText2);
        }
      }
    };


    const cellWidthDeductTax = 15;
    // const startXDeductTax = 210; // Adjust the starting X-coordinate as needed
    const startXDeductTax = 70 + (cellWidthOT * 8)
    const startYDeductTax = 55; // Adjust the starting Y-coordinate as needed

    const drawDeductTax = () => {
      for (let i = 0; i < numRowsTop; i++) {
        for (let j = 0; j < numCols; j++) {
          const x = startXDeductTax + j * cellWidthDeductTax;
          const y = startYTop + i * cellHeightTop;

          // Add text for each cell
          const cellText = `หักภาษี`;
          drawCell(x, y, cellWidthDeductTax, cellHeightTop, cellText);
          const cellText2 = ``;
          // drawCell(x, 195, cellWidth, cellHeightTop, cellText2);
        }
      }
    };

    const cellWidthDeductTaxSocialSecurity = 15;
    // const startXDeductTaxSocialSecurity = 230; // Adjust the starting X-coordinate as needed
    const startXDeductTaxSocialSecurity = 70 + (cellWidthOT * 9)
    const startYDeductTaxSocialSecurity = 55; // Adjust the starting Y-coordinate as needed

    const drawDeductTaxSocialSecurity = () => {
      for (let i = 0; i < numRowsTop; i++) {
        for (let j = 0; j < numCols; j++) {
          const x = startXDeductTaxSocialSecurity + j * cellWidthDeductTaxSocialSecurity;
          const y = startYTop + i * cellHeightTop;

          // Add text for each cell
          const cellText = `หัก ปกส`;
          drawCell(x, y, cellWidthDeductTaxSocialSecurity, cellHeightTop, cellText);
          const cellText2 = ``;
          // drawCell(x, 195, cellWidth, cellHeightTop, cellText2);
        }
      }
    };

    const cellWidthAddAfterDeductTax = 15;
    // const startXAddAfterDeductTax = 250; // Adjust the starting X-coordinate as needed
    const startXAddAfterDeductTax = 70 + (cellWidthOT * 10)
    const startYAddAfterDeductTax = 55; // Adjust the starting Y-coordinate as needed

    const drawAddAfterDeductTax = () => {
      for (let i = 0; i < numRowsTop; i++) {
        for (let j = 0; j < numCols; j++) {
          const x = startXAddAfterDeductTax + j * cellWidthAddAfterDeductTax;
          const y = startYTop + i * cellHeightTop;

          // Add text for each cell
          const cellText = `บวกอื่นๆ\nหลังภาษี`;
          drawCell(x, y, cellWidthAddAfterDeductTax, cellHeightTop, cellText);
          const cellText2 = ``;
          // drawCell(x, 195, cellWidth, cellHeightTop, cellText2);
        }
      }
    };

    const cellWidthAdvancePayment = 15;
    // const startXAdvancePayment = 270; // Adjust the starting X-coordinate as needed
    const startXAdvancePayment = 70 + (cellWidthOT * 11)
    const startYAdvancePayment = 55; // Adjust the starting Y-coordinate as needed

    const drawAdvancePayment = () => {
      for (let i = 0; i < numRowsTop; i++) {
        for (let j = 0; j < numCols; j++) {
          const x = startXAdvancePayment + j * cellWidthAdvancePayment;
          const y = startYTop + i * cellHeightTop;

          // Add text for each cell
          const cellText = `เบิกล่วงหน้า`;
          drawCell(x, y, cellWidthAdvancePayment, cellHeightTop, cellText);
          const cellText2 = ``;
          // drawCell(x, 195, cellWidth, cellHeightTop, cellText2);
        }
      }
    };

    const cellWidthMinusAfterDeductTax = 15;
    // const startXMinusAfterDeductTax = 290; // Adjust the starting X-coordinate as needed
    const startXMinusAfterDeductTax = 70 + (cellWidthOT * 12)
    const startYMinusAfterDeductTax = 55; // Adjust the starting Y-coordinate as needed

    const drawMinusAfterDeductTax = () => {
      for (let i = 0; i < numRowsTop; i++) {
        for (let j = 0; j < numCols; j++) {
          const x = startXMinusAfterDeductTax + j * cellWidthMinusAfterDeductTax;
          const y = startYTop + i * cellHeightTop;

          // Add text for each cell
          const cellText = `หักอื่นๆ\nหลังภาษี`;
          drawCell(x, y, cellWidthMinusAfterDeductTax, cellHeightTop, cellText);
          const cellText2 = ``;
          // drawCell(x, 195, cellWidth, cellHeightTop, cellText2);
        }
      }
    };

    const cellWidthBank = 15;
    // const startXBank = 290; // Adjust the starting X-coordinate as needed
    const startXBank = 70 + (cellWidthOT * 13)
    const startYBank = 55; // Adjust the starting Y-coordinate as needed

    const drawBank = () => {
      for (let i = 0; i < numRowsTop; i++) {
        for (let j = 0; j < numCols; j++) {
          const x = startXBank + j * cellWidthBank;
          const y = startYTop + i * cellHeightTop;

          // Add text for each cell
          const cellText = `ค่าธนาคาร\nโอน`;
          drawCell(x, y, cellWidthBank, cellHeightTop, cellText);
          const cellText2 = ``;
          // drawCell(x, 195, cellWidth, cellHeightTop, cellText2);
        }
      }
    };

    const cellWidthResult = 15;
    // const startXResult = 310; // Adjust the starting X-coordinate as needed
    const startXResult = 70 + (cellWidthOT * 14)
    const startYResult = 55; // Adjust the starting Y-coordinate as needed

    const drawResult = () => {
      for (let i = 0; i < numRowsTop; i++) {
        for (let j = 0; j < numCols; j++) {
          const x = startXResult + j * cellWidthResult;
          const y = startYTop + i * cellHeightTop;

          // Add text for each cell
          const cellText = `สุทธิ`;
          drawCell(x, y, cellWidthResult, cellHeightTop, cellText);
          const cellText2 = ``;
          // drawCell(x, 195, cellWidth, cellHeightTop, cellText2);
        }
      }
    };

    Object.keys(groupedByWorkplace).forEach((workplaceKey, index) => {
      const { employees, totalSalary } = groupedByWorkplace[workplaceKey];

      // Find the corresponding workplace from workplaceList
      const workplaceDetails = workplaceList.find(w => w.workplace === workplaceKey) || { name: 'Unknown' };
      const workplaceName = workplaceDetails.name;

      // Display workplace heading
      doc.setFontSize(12);

      doc.text(`Workplace: ${workplaceKey}`, 25, currentY);
      currentY += 5;

      // Display employee information
      employees.forEach(({ name, empID, salary }) => {

        drawID();
        drawName();
        drawAllDay();
        drawSalary();
        drawOT();
        drawWelfare();
        drawRoleWork();
        drawDiligenceAllowance();
        drawHoliday();
        drawAddBeforeDeductTax();
        drawMinuseforeDeductTax();
        drawDeductTax();
        drawDeductTaxSocialSecurity();
        drawAddAfterDeductTax();
        drawAdvancePayment();
        drawMinusAfterDeductTax();
        drawBank();
        drawResult();

        doc.text(`${empID}`, 10, currentY);
        doc.text(` ${name}`, 25, currentY);
        doc.text(`${salary}`, 70, currentY);

        currentY += 5;

        // Check if there's not enough space on the current page
        if (currentY > doc.internal.pageSize.height - 20) {
          // Add a new page
          doc.addPage({ orientation: 'landscape' });
          // Reset Y coordinate
          currentY = 20;
        }
      });

      // Display total salary
      doc.text(`Total Salary: ${totalSalary}   ${workplaceName}`, 10, currentY);
      currentY += 5;

      // Add some space between workplaces
      // currentY += 5;
      doc.text(`พิมพ์วันที่ ${formattedWorkDateDD}/${formattedWorkDateMM}/${parseInt(formattedWorkDateYYYY, 10) + 543}`, 10, 200);
      doc.text(`รายงานโดย ${present}`, 100, 200);
      doc.text(`แฟ้มรายงาน ${presentfilm}`, 200, 200);

    });

    window.open(doc.output('bloburl'), '_blank');
  };

  return (
    <div>
      {/* <button onClick={generatePDF}>Generate PDF</button> */}
      <label role="datetime">พิมพ์วันที่</label>
      <div style=
        {{ position: 'relative', zIndex: 9999, marginLeft: "0rem" }}>
        <DatePicker id="datetime" name="datetime"
          className="form-control" // Apply Bootstrap form-control class
          popperClassName="datepicker-popper" // Apply custom popper class if needed
          selected={workDate}
          onChange={handleWorkDateChange}
          dateFormat="dd/MM/yyyy"
        // showMonthYearPicker
        />
      </div>
      <div class="row">
        <div class="col-md-3">
          <input type="text" class="form-control" id="searchWorkplaceId" placeholder="รายงานโดย" value={present} onChange={(e) => setPresent(e.target.value)} />

        </div>
      </div>
      <div class="row">
        <div class="col-md-3">
          <input type="text" class="form-control" id="searchWorkplaceId" placeholder="แฟ้มรายงาน" value={presentfilm} onChange={(e) => setPresentfilm(e.target.value)} />

        </div>
      </div>

      <button onClick={generatePDFTest}>Generate PDFTest</button>

    </div>
  )
}

export default TestPDFSalary