import React, { useState } from 'react';
import jsPDF from 'jspdf';

const SendEmployeePDF = () => {
    const [inputValues, setInputValues] = useState({
        input1: '',
        input2: '',
        date: '',
        // Add more input fields as needed
    });
    const [day, setDay] = useState('01');
    const [month, setMonth] = useState('01');
    const [year, setYear] = useState('2023');

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

    const generatePDF = () => {
        const doc = new jsPDF();
        const fontPath = '/assets/fonts/THSarabunNew.ttf';
        doc.addFileToVFS(fontPath);
        doc.addFont(fontPath, 'THSarabunNew', 'normal');
        // doc.setFont('THSarabunNew');

        // Concatenate the selected day, month, and year into a single input value
        const formattedDate = `${day}/${month}/${year}`;
        setInputValues({ ...inputValues, date: formattedDate });

        // Add the formatted date to the PDF with the Thai font
        doc.text(`Selected Date: ${formattedDate}`, 10, 10);

        // Define positions for each input's text
        const positions = {
            input1: { x: 50, y: 100 },
            input2: { x: 50, y: 120 },
            date: { x: 50, y: 140 },
            // Add more positions for additional inputs
        };

        // Set the font for specific fields
        doc.setFont('THSarabunNew');

        // Iterate through input values and positions
        for (const name in inputValues) {
            if (inputValues.hasOwnProperty(name)) {
                const value = inputValues[name];
                const position = positions[name];
                doc.setFont('THSarabunNew');
                doc.text(value, position.x, position.y);
            }
        }
        // Save the PDF with a filename
        doc.save('user_input.pdf');
    };

    return (
        <div>
            <h1>Create PDF with Positioned Text Inputs</h1>
            <input
                type="text"
                name="input1"
                value={inputValues.input1}
                onChange={handleInputChange}
            />
            <input
                type="text"
                name="input2"
                value={inputValues.input2}
                onChange={handleInputChange}
            />
            <select value={day} onChange={handleDayChange}>
                {Array.from({ length: 31 }, (_, i) => (
                    <option key={i} value={String(i + 1).padStart(2, '0')}>
                        {String(i + 1).padStart(2, '0')}
                    </option>
                ))}
            </select>
            <select value={month} onChange={handleMonthChange}>
                {Array.from({ length: 12 }, (_, i) => (
                    <option key={i} value={String(i + 1).padStart(2, '0')}>
                        {String(i + 1).padStart(2, '0')}
                    </option>
                ))}
            </select>
            <select value={year} onChange={handleYearChange}>
                {Array.from({ length: 50 }, (_, i) => (
                    <option key={i} value={String(2023 - i)}>
                        {String(2023 - i)}
                    </option>
                ))}
            </select>
            {/* Add more input fields as needed */}
            <button onClick={generatePDF}>Generate PDF</button>
        </div>
    );
};

export default SendEmployeePDF;
