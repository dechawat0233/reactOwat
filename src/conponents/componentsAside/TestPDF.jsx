import React from 'react';
import { jsPDF } from 'jspdf';
import 'jspdf-autotable';

const TestPDF = () => {
    const generatePDF = () => {
        const doc = new jsPDF('landscape');

        const title = 'Sample PDF Title';
        const data = [
            ['Name', 'Age', 'City'],
            ['John Doe', '30', 'New York'],
            ['Jane Smith', '25', 'Los Angeles'],
            ['Bob Johnson', '40', 'Chicago'],
        ];

        // Set title
        doc.setFontSize(16);
        const titleWidth = doc.getStringUnitWidth(title) * doc.internal.getFontSize() / doc.internal.scaleFactor;
        const pageWidth = doc.internal.pageSize.getWidth();
        const titleX = (pageWidth - titleWidth) / 2;
        doc.text(title, titleX, 10);

        // Create header and data arrays
        const header = data[0];
        const tableData = data.slice(1);

        // Set table options
        const options = {
            startY: 20, // Position the table below the title
            margin: { top: 10 }, // Reduce the space between header and body
        };

        // Add header and data to the table
        doc.autoTable({
            head: [header],
            body: tableData,
            columnStyles: {
                0: { cellWidth: 40 }, // Width of the first column
                1: { cellWidth: 20 }, // Width of the second column
                2: { cellWidth: 40 }, // Width of the third column
            },
            ...options,
        });

        doc.save('example.pdf');
    };

    return (
        <div>
            <button onClick={generatePDF}>Generate PDF</button>
        </div>
    );
};

export default TestPDF;
