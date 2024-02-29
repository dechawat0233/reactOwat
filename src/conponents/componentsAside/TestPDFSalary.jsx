import React, { useState } from 'react';
import { jsPDF } from 'jspdf';
import 'jspdf-autotable';

function TestPDFSalary() {

    const generatePDF = () => {
        const names = ['Alice', 'Bob', 'Charlie', 'David', 'Eva', 'Frank'];
        const ages = [25, 30, 22, 35, 28, 40];
    
        // Create a new instance of jsPDF
        const pdf = new jsPDF();
    
        // Set the initial position for text and frame
        let x = 20;
    
        // Loop through the names and ages arrays to add content to the PDF
        for (let i = 0; i < names.length; i += 2) {
          // Add a page for each pair of names
          if (i > 0) {
            pdf.addPage();
          }
    
          // Draw a square frame around the first name
          pdf.rect(x, 10, 60, 30);
          pdf.text(`Name: ${names[i]}`, x + 5, 20);
          pdf.text(`Age: ${ages[i]}`, x + 5, 30);
    
          // Move to the next column
          x += 80;
    
          // Draw a square frame around the second name if available
          if (i + 1 < names.length) {
            pdf.rect(x, 50, 60, 30);
            pdf.text(`Name: ${names[i + 1]}`, x + 5, 60);
            pdf.text(`Age: ${ages[i + 1]}`, x + 5, 70);
          }
    
          // Reset position for the next row
          x = 20;
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