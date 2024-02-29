import React, { useState } from 'react';
import { jsPDF } from 'jspdf';
import 'jspdf-autotable';

function TestPDFSalary() {

    const generatePDF = () => {
        const names = ['Alice', 'Bob', 'Charlie', 'David', 'Eva'];
        const ages = [25, 30, 22, 35, 28];

        // Create a new instance of jsPDF
        const pdf = new jsPDF();

        // Set the initial position for text
        let x = 20;
        let y = 20;

        // Loop through the names and ages arrays to add content to the PDF
        for (let i = 0; i < names.length; i += 2) {
            // Add a page for each pair of names
            if (i > 0) {
                pdf.addPage();
            }

            // Add the first name and age
            pdf.text(`Name: ${names[i]}`, x, y);
            pdf.text(`Age: ${ages[i]}`, x, y + 10);

            // Move to the next column
            x += 80;

            // Add the second name and age if available
            if (i + 1 < names.length) {
                pdf.text(`Name: ${names[i + 1]}`, x, y);
                pdf.text(`Age: ${ages[i + 1]}`, x, y + 10);
            }

            // Reset position for the next row
            x = 20;
            y = 40;
        }

        // Open the generated PDF in a new tab
        window.open(pdf.output('bloburl'), '_blank');
    };
    return (
        <div>
            <button onClick={generatePDF}>Generate PDF</button>
        </div>
    )
}

export default TestPDFSalary