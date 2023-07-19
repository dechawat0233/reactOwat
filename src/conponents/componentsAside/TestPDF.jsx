import React from 'react';
import { jsPDF } from 'jspdf';
import 'jspdf-autotable';

const TestPDF = () => {
    const generatePDF = () => {
        const doc = new jsPDF('landscape');

        // Load the Thai font
        const fontPath = '/assets/fonts/THSarabunNew.ttf';
        doc.addFileToVFS(fontPath);
        doc.addFont(fontPath, 'THSarabunNew', 'normal');

        // Override the default styles for jspdf-autotable
        const styles = {
            font: 'THSarabunNew',
            fontStyle: 'normal',
            fontSize: 20,
        };
        const tableOptions = {
            styles: styles,
            startY: 20,
            margin: { top: 10 },
        };

        const title = 'Sample PDF Title';
        const data = [
            ['Name', 'Age', 'City'],
            ['John Doe', '30', 'New York'],
            ['Jane Smith', '25', 'Los Angeles'],
            ['Bob Johnson', '40', 'Chicago'],
            ['ทดสอบ ว่า', 'ทำงานได้ไหม', 'ฮุฮ่าๆๆ'],
        ];

        // Set title with the Thai font
        doc.setFont('THSarabunNew');
        doc.setFontSize(16);
        const titleWidth = doc.getStringUnitWidth(title) * doc.internal.getFontSize() / doc.internal.scaleFactor;
        const pageWidth = doc.internal.pageSize.getWidth();
        const titleX = (pageWidth - titleWidth) / 2;
        doc.text(title, titleX, 10);

        doc.text('ฮ่าโหลๆ ได้ไหม', 10, 10);

        // Create header and data arrays
        const header = data[0];
        const tableData = data.slice(1);

        // Add header and data to the table
        doc.autoTable({
            head: [header],
            body: tableData,
            columnStyles: {
                0: { cellWidth: 40 },
                1: { cellWidth: 20 },
                2: { cellWidth: 40 },
            },
            ...tableOptions,
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
