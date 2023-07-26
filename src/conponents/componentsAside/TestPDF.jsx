import React, { useState } from 'react';
import { jsPDF } from 'jspdf';
import 'jspdf-autotable';

const TestPDF = () => {
  const [data, setData] = useState([]);

  const generatePDF = async () => {
    try {
      const response = await fetch('http://68.183.230.164:3000/users/list');
      const jsonData = await response.json();
      setData(jsonData);
      console.log(jsonData); // Check if the data is received and stored correctly

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

      // Set title with the Thai font
      doc.setFont('THSarabunNew');
      doc.setFontSize(16);
      const titleWidth = doc.getStringUnitWidth(title) * doc.internal.getFontSize() / doc.internal.scaleFactor;
      const pageWidth = doc.internal.pageSize.getWidth();
      const titleX = (pageWidth - titleWidth) / 2;
      doc.text(title, titleX, 10);

      doc.text('ฮ่าโหลๆ ได้ไหม', 10, 10);

      // Create header and data arrays
      const header = ['Name', 'Email', 'Role'];
      const tableData = data.map(({ name, email, role }) => [name, email, role]); // Extract only name, email, and role from the data
      console.log(header);
      console.log(tableData); // Check if the header and tableData are formed correctly

      // Add header and data to the table
      doc.autoTable({
        head: [header],
        body: tableData,
        columnStyles: {
          0: { cellWidth: 40 },
          1: { cellWidth: 70 },
          2: { cellWidth: 40 },
        },
        ...tableOptions,
      });

      doc.save('example.pdf');
    } catch (error) {
      console.error('Error generating PDF:', error);
    }
  };

  return (
    <div>
      <button onClick={generatePDF}>Generate PDF</button>
    </div>
  );
};

export default TestPDF;
