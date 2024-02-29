import React, { useState } from 'react';
import { jsPDF } from 'jspdf';
import 'jspdf-autotable';

function TestPDFSalary() {

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

    const employees = [
        { name: 'pop', empID: '1525', workplace: '1001-25', salary: '200' },
        { name: 'popsd', empID: '1585', workplace: '1021-25', salary: '200' },
        { name: 'popsd', empID: '1585', workplace: '1021-25', salary: '200' },
        { name: 'popsd', empID: '1585', workplace: '1021-25', salary: '200' },
        { name: 'popsd', empID: '1585', workplace: '1021-25', salary: '200' },
        { name: 'popsd', empID: '1585', workplace: '1021-25', salary: '200' },
        { name: 'popsd', empID: '1585', workplace: '1021-25', salary: '200' },
        { name: 'popsd', empID: '1585', workplace: '1021-25', salary: '200' },
        { name: 'popsd', empID: '1585', workplace: '1021-25', salary: '200' },
        { name: 'popsd', empID: '1585', workplace: '1021-25', salary: '201' },
        { name: 'popsd', empID: '1585', workplace: '1021-25', salary: '200' },
        { name: 'popsd', empID: '1585', workplace: '1021-25', salary: '200' },
        { name: 'popsd', empID: '1585', workplace: '1021-25', salary: '200' },
        { name: 'popsd', empID: '1585', workplace: '1021-25', salary: '200' },
        { name: 'popsd', empID: '1585', workplace: '1021-25', salary: '200' },
        { name: 'popsd', empID: '1585', workplace: '1021-25', salary: '200' },
        { name: 'popsd', empID: '1585', workplace: '1021-25', salary: '200' },
        { name: 'popsd', empID: '1585', workplace: '1021-25', salary: '200' },
        { name: 'popsd', empID: '1585', workplace: '1021-25', salary: '200' },
        { name: 'popsd', empID: '1585', workplace: '1021-25', salary: '200' },
        { name: 'popsd', empID: '1585', workplace: '1021-25', salary: '200' },
        { name: 'popsd', empID: '1585', workplace: '1021-25', salary: '200' },

        { name: 'pffff', empID: '1425', workplace: '1021-25', salary: '200' },
        { name: 'plkioij', empID: '1625', workplace: '1021-25', salary: '200' },
        { name: 'bvcde', empID: '1595', workplace: '1021-25', salary: '200' },
        { name: 'wsxd', empID: '1425', workplace: '1031-25', salary: '200' },
        { name: 'dodod', empID: '15225', workplace: '1031-25', salary: '200' },
        { name: 'maassaa', empID: '1575', workplace: '1031-25', salary: '200' },
        { name: 'maakksj', empID: '15995', workplace: '1801-25', salary: '200' },
        { name: 'ywywy', empID: '1225', workplace: '1801-25', salary: '200' },
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
            const { workplace, salary } = employee;
            acc[workplace] = acc[workplace] || { employees: [], totalSalary: 0 };
            acc[workplace].employees.push(employee);
            acc[workplace].totalSalary += parseInt(salary);
            return acc;
          }, {});
      
          const doc = new jsPDF({ orientation: 'landscape' });
      
          let currentY = 10;
      
          Object.keys(groupedByWorkplace).forEach((workplace, index) => {
            const { employees, totalSalary } = groupedByWorkplace[workplace];
      
            // Display workplace heading
            doc.text(`Workplace: ${workplace}`, 10, currentY);
            currentY += 10;
      
            // Display employee information
            employees.forEach(({ name, empID, salary }) => {
              doc.text(`Name: ${name}, Employee ID: ${empID}, Salary: ${salary}`, 10, currentY);
              currentY += 10;
      
              // Check if there's not enough space on the current page
              if (currentY > doc.internal.pageSize.height - 10) {
                // Add a new page
                doc.addPage({ orientation: 'landscape' });
                // Reset Y coordinate
                currentY = 10;
              }
            });
      
            // Display total salary
            doc.text(`Total Salary: ${totalSalary}`, 10, currentY);
            currentY += 10;
      
            // Add some space between workplaces
            currentY += 10;
          });
      
          window.open(doc.output('bloburl'), '_blank');
    };

    return (
        <div>
            {/* <button onClick={generatePDF}>Generate PDF</button> */}
            <button onClick={generatePDFTest}>Generate PDFTest</button>

        </div>
    )
}

export default TestPDFSalary