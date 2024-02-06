import endpoint from '../../config';

import axios from 'axios';
import React, { useEffect, useState } from 'react';

import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import moment from 'moment';

import EmployeesSelected from './EmployeesSelected';

import jsPDF from 'jspdf';

const dataArray = [
    [
        // 1
        { name: 'John', prime: 'Yes' },
        { name: 'Jane', prime: 'No' },
        { name: 'John', prime: 'Yes' },
        { name: 'Jane', prime: 'No' },
        { name: 'John', prime: 'Yes' },
        { name: 'Jane', prime: 'No' },
        { name: 'John', prime: 'Yes' },
        { name: 'Jane', prime: 'No' },
        { name: 'John', prime: 'Yes' },
        { name: 'Jane', prime: 'No' },
        // 2
        { name: 'John', prime: 'Yes' },
        { name: 'Jane', prime: 'No' },
        { name: 'John', prime: 'Yes' },
        { name: 'Jane', prime: 'No' },
        { name: 'John', prime: 'Yes' },
        { name: 'Jane', prime: 'No' },
        { name: 'John', prime: 'Yes' },
        { name: 'Jane', prime: 'No' },
        { name: 'John', prime: 'Yes' },
        { name: 'Jane', prime: 'No' },
        // 3
        { name: 'John', prime: 'Yes' },
        { name: 'Jane', prime: 'No' },
        { name: 'John', prime: 'Yes' },
        { name: 'Jane', prime: 'No' },
        { name: 'John', prime: 'Yes' },
        { name: 'Jane', prime: 'No' },
        { name: 'John', prime: 'Yes' },
        { name: 'Jane', prime: 'No' },
        { name: 'John', prime: 'Yes' },
        { name: 'Jane', prime: 'No' },
        // 4
        { name: 'John', prime: 'Yes' },
        { name: 'Jane', prime: 'No' },
        { name: 'John', prime: 'Yes' },
        { name: 'Jane', prime: 'No' },
        { name: 'John', prime: 'Yes' },
        { name: 'Jane', prime: 'No' },
        { name: 'John', prime: 'Yes' },
        { name: 'Jane', prime: 'No' },
        { name: 'John', prime: 'Yes' },
        { name: 'Jane', prime: 'No' },
        // 5
        { name: 'John', prime: 'Yes' },
        { name: 'Jane', prime: 'No' },
        { name: 'John', prime: 'Yes' },
        { name: 'Jane', prime: 'No' },
        { name: 'John', prime: 'Yes' },
        { name: 'Jane', prime: 'No' },
        { name: 'John', prime: 'Yes' },
        { name: 'Jane', prime: 'No' },
        { name: 'John', prime: 'Yes' },
        { name: 'Jane', prime: 'No' },
        // 6
        { name: 'John', prime: 'Yes' },
        { name: 'Jane', prime: 'No' },
        { name: 'John', prime: 'Yes' },
        { name: 'Jane', prime: 'No' },
        { name: 'John', prime: 'Yes' },
        { name: 'Jane', prime: 'No' },
        { name: 'John', prime: 'Yes' },
        { name: 'Jane', prime: '1232132132' },

        // ... other data
    ],
    // ... other arrays
    [
        { name: 'Jane', prime: 'No' },
        { name: 'John', prime: 'Yes' },
        { name: 'Jane', prime: 'No' },
        { name: 'John', prime: 'Yes' },
        { name: 'Jane', prime: 'No' },
        { name: 'John', prime: 'Yes' },
        { name: 'qwqwqw', prime: '1232132132' },
    ],
    [
        { name: 'Jane', prime: '1232132132' },
        { name: 'John', prime: 'Yes' },
        { name: 'Jane', prime: 'No' },
        { name: 'John', prime: 'Yes' },
        { name: 'Jane', prime: 'No' },
        { name: 'John', prime: 'Yes' },
        { name: 'qwqwqw', prime: '1232132132' },
    ],
];

const subarrayLengths = dataArray.map(subarray => subarray.length);

console.log('subarrayLengths', subarrayLengths);

function Test() {
    const [selectedDates, setSelectedDates] = useState([]);
    const [reason, setReason] = useState('');

    const [day, setDay] = useState('');
    const [month, setMonth] = useState('');
    const [year, setYear] = useState(new Date().getFullYear());

    // const handleDateChange = (date) => {
    //     setSelectedDates((prevDates) => [...prevDates, date]);
    // };

    const testData = [
        {
            _id: '64d46a67f811c14a70d4b3d7',
            workplaceId: '9999',
            workplaceName: 'ทดสอบการทำงาน101',
            workplaceArea: 'นครปฐม',
            workOfWeek: '5',

        },
        {
            _id: '64d46a67f811c14a70d4b3d7',
            workplaceId: '9999',
            workplaceName: 'ทดสอบการทำงาน101',
            workplaceArea: 'นครปฐม',
            workOfWeek: '5',
            workDay1:
            {
                position: 'head',
                time: '210.00',
                timeEnd: '211.00',
                time2: '213.00',
                timeEnd2: '214.00',
                time3: '219.00',
                timeEnd3: '220.00',
            },
            workDay2:
            {
                position: 'head',
                time: '210.01',
                timeEnd: '211.01',
                time2: '213.01',
                timeEnd2: '214.01',
                time3: '219.01',
                timeEnd3: '220.01',
            },
            workDay3:
            {
                position: 'head',
                time: '210.02',
                timeEnd: '211.02',
                time2: '213.02',
                timeEnd2: '214.02',
                time3: '219.02',
                timeEnd3: '220.02',
            },
            workDay4:
            {
                position: 'head',
                time: '210.03',
                timeEnd: '211.03',
                time2: '213.03',
                timeEnd2: '214.03',
                time3: '219.03',
                timeEnd3: '220.03',
            },
            workDay5:
            {
                position: 'head',
                time: '210.04',
                timeEnd: '211.04',
                time2: '213.04',
                timeEnd2: '214.04',
                time3: '219.04',
                timeEnd3: '220.04',
            },
            workDay6:
            {
                position: 'head',
                time: '210.05',
                timeEnd: '211.05',
                time2: '213.05',
                timeEnd2: '214.05',
                time3: '219.05',
                timeEnd3: '220.05',
            },
            workDay7:
            {
                position: 'head',
                time: '210.06',
                timeEnd: '211.06',
                time2: '213.06',
                timeEnd2: '214.06',
                time3: '219.06',
                timeEnd3: '220.06',
            },
        },
        {
            _id: '64d46a67f811c14a70d4b3d7',
            workplaceId: '9999',
            workplaceName: 'ทดสอบการทำงาน101',
            workplaceArea: 'นครปฐม',
            workOfWeek: '5'
        }
    ];

    const handleDateChange = (date) => {
        // Check if the selected date already exists in the array
        if (!selectedDates.includes(date)) {
            setSelectedDates((prevDates) => [...prevDates, date]);
        } else {
            // Alert that the date already exists
            alert('This date is already selected. Please choose a different date.');
        }
    };



    const handleAddDate = () => {
        if (day && month && year) {
            const selectedDate = new Date(`${month}/${day}/${year}`);
            // Check if the selected date is a valid date
            if (!isNaN(selectedDate.getTime())) {
                // Check if the selected date already exists in the array
                if (!selectedDates.find((date) => date.getTime() === selectedDate.getTime())) {
                    setSelectedDates((prevDates) => [...prevDates, selectedDate]);
                } else {
                    // Show alert for duplicate date selection
                    alert('Selected date already exists in the list.');
                }
                setDay('');
                setMonth('');
                setYear('');
            } else {
                // Show alert for invalid date selection
                alert('Invalid date selection. Please select a valid day, month, and year.');
            }
        } else {
            // Show alert for invalid date selection
            alert('Invalid date selection. Please select a day, month, and year.');
        }
    };

    const handleRemoveDate = (dateToRemove) => {
        setSelectedDates((prevDates) =>
            prevDates.filter((date) => date.getTime() !== dateToRemove.getTime())
        );
    };

    const handleReasonChange = (event) => {
        setReason(event.target.value);
    };

    ////////////////////////////////////////////////////////


    const [workTimeDay, setWorkTimeDay] = useState({
        startDay: '',
        endDay: '',
        allTimes: [],
    });

    const daysOfWeek = ['จันทร์', 'อังคาร', 'พุธ', 'พฤหัสบดี', 'ศุกร์', 'เสาร์', 'อาทิตย์'];

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setWorkTimeDay((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleAddTime = () => {
        setWorkTimeDay((prevData) => ({
            ...prevData,
            allTimes: [...prevData.allTimes, { startTime: '', endTime: '', resultTime: '', startTimeOT: '', endTimeOT: '', resultTimeOT: '' }],
        }));
    };

    const handleTimeChange = (index, timeType, value) => {
        setWorkTimeDay((prevData) => {
            const updatedTimes = prevData.allTimes.map((time, i) =>
                i === index ? { ...time, [timeType]: value } : time
            );

            // Calculate resultTime and resultOT when both startTime and endTime are provided
            if (timeType === 'startTime' || timeType === 'endTime' || timeType === 'startTimeOT' || timeType === 'endTimeOT') {
                const startTime = updatedTimes[index].startTime;
                const endTime = updatedTimes[index].endTime;
                const startTimeOT = updatedTimes[index].startTimeOT;
                const endTimeOT = updatedTimes[index].endTimeOT;

                if (startTime && endTime) {
                    const resultTime = calculateTimeDifference(startTime, endTime);
                    updatedTimes[index].resultTime = resultTime;
                }

                if (startTimeOT && endTimeOT) {
                    const resultOT = calculateTimeDifference(startTimeOT, endTimeOT);
                    updatedTimes[index].resultOT = resultOT;
                }
            }

            return {
                ...prevData,
                allTimes: updatedTimes,
            };
        });
    };

    const calculateTimeDifference = (startTime, endTime) => {
        const [startHour, startMinute] = startTime.split('.').map(Number);
        const [endHour, endMinute] = endTime.split('.').map(Number);

        let resultHour = endHour - startHour;
        let resultMinute = endMinute - startMinute;

        if (resultMinute < 0) {
            resultHour -= 1;
            resultMinute += 60;
        }

        return `${resultHour.toString().padStart(2, '0')}.${resultMinute.toString().padStart(2, '0')}`;
    };


    const arraysPerPage = 10;

    const generatePDF = () => {
        const pdf = new jsPDF();

        const subarrayLengths = dataArray.map(subarray => subarray.length);
        const totalArrays = subarrayLengths.reduce((accumulator, currentValue) => accumulator + currentValue, 0);

        console.log('totalArrays', totalArrays);

        dataArray.forEach((innerArray, index) => {
            const pageCount = Math.ceil(subarrayLengths[index] / arraysPerPage);
            for (let page = 0; page < pageCount; page++) {
                let yOffset = 20;

                const startIdx = page * arraysPerPage;
                const endIdx = Math.min((page + 1) * arraysPerPage, subarrayLengths[index]);

                for (let i = startIdx; i < endIdx; i++) {
                    const currentArray = innerArray[i];

                    if (currentArray) {
                        pdf.text(`Name: ${currentArray.name}, Prime: ${currentArray.prime}`, 10, yOffset);
                        yOffset += 10;
                    }
                }

                // Add footer on the last page
                if (page === pageCount - 1) {
                    pdf.text(`Page ${page + 1}/${pageCount} - Footer`, 150, 280);
                }

                if (page < pageCount) {
                    pdf.addPage();
                }
            }
        });

        // Save or display the PDF
        const pdfContent = pdf.output('bloburl');
        window.open(pdfContent, '_blank');
    };



    return (
        <section class="content">
            <div class="row">
                <div class="col-md-12">
                    <div class="container-fluid">
                        <form >
                            <section class="Frame">
                                <div class="row">
                                    <div>
                                        <label>เดือน:</label>
                                        <select value={month} onChange={(e) => setMonth(e.target.value)}>
                                            <option value="">Select month</option>
                                            {Array.from({ length: 12 }, (_, i) => i + 1).map((month) => (
                                                <option key={month} value={month}>
                                                    {month}
                                                </option>
                                            ))}
                                        </select>
                                        <label>วันที่:</label>
                                        <select value={day} onChange={(e) => setDay(e.target.value)}>
                                            <option value="">Select day</option>
                                            {Array.from({ length: 31 }, (_, i) => i + 1).map((day) => (
                                                <option key={day} value={day}>
                                                    {day}
                                                </option>
                                            ))}
                                        </select>
                                        <label>ปี:</label>
                                        <select value={year} onChange={(e) => setYear(e.target.value)}>
                                            <option value="">Select year</option>
                                            {Array.from({ length: 7 }, (_, i) => new Date().getFullYear() - 3 + i).map(
                                                (year) => (
                                                    <option key={year} value={year}>
                                                        {year}
                                                    </option>
                                                )
                                            )}
                                        </select>

                                        <button type="button" onClick={handleAddDate}>
                                            เพิ่ม
                                        </button>
                                    </div>
                                    {selectedDates.length > 0 && (
                                        <div>
                                            <h3>วันหยุดหน่วยงาน</h3>
                                            <ol>
                                                {selectedDates.map((date, index) => (
                                                    <li key={index}>
                                                        {date instanceof Date && !isNaN(date.getTime())
                                                            ? date.toLocaleDateString()
                                                            : `${day}/${month}/${year} (Invalid Date)`}{' '}
                                                        <button
                                                            type="button"
                                                            onClick={() => handleRemoveDate(date)}
                                                            className="btn clean"
                                                            style={{ margin: '0.5rem' }}
                                                        >
                                                            ลบออก
                                                        </button>
                                                    </li>
                                                ))}
                                            </ol>
                                        </div>
                                    )}
                                </div>
                            </section>

                        </form>

                    </div>
                </div>
            </div>

            {/* /////////////////////////////// */}

            <div class="row">
                <div class="col-md-1">
                    <select name="startDay" value={workTimeDay.startDay} onChange={handleInputChange}>
                        {daysOfWeek.map((day, index) => (
                            <option key={index} value={day}>
                                {day}
                            </option>
                        ))}
                    </select>
                </div>
                <div class="col-md-1">
                    <select name="endDay" value={workTimeDay.endDay} onChange={handleInputChange}>
                        {daysOfWeek.map((day, index) => (
                            <option key={index} value={day}>
                                {day}
                            </option>
                        ))}
                    </select>
                </div>
                <div class="col-md-6">
                    {workTimeDay.allTimes.map((time, index) => (
                        <div key={index}>
                            <div class="row">
                                <div class="col-md-2">
                                    <input
                                        type="text"
                                        class="form-control"
                                        placeholder={`Start Time ${index + 1}`}
                                        value={time.startTime}
                                        onChange={(e) => handleTimeChange(index, 'startTime', e.target.value)}
                                    />
                                </div>
                                <div class="col-md-2">
                                    <input
                                        type="text"
                                        class="form-control"
                                        placeholder={`End Time ${index + 1}`}
                                        value={time.endTime}
                                        onChange={(e) => handleTimeChange(index, 'endTime', e.target.value)}
                                    />
                                </div>
                                <span>Result Time: {time.resultTime}</span>
                                <div class="col-md-2">

                                    <input
                                        type="text"
                                        class="form-control"
                                        placeholder={`Start Time OT ${index + 1}`}
                                        value={time.startTimeOT}
                                        onChange={(e) => handleTimeChange(index, 'startTimeOT', e.target.value)}
                                    />
                                </div>
                                <div class="col-md-2">

                                    <input
                                        type="text"
                                        class="form-control"
                                        placeholder={`End Time OT ${index + 1}`}
                                        value={time.endTimeOT}
                                        onChange={(e) => handleTimeChange(index, 'endTimeOT', e.target.value)}
                                    />
                                </div>
                                <span>Result OT: {time.resultOT}</span>
                            </div>
                        </div>
                    ))}

                </div>
                <div class="col-md-1">
                    <button onClick={handleAddTime}>
                        <i class="fa">&#xf067;</i>
                    </button>
                </div>
            </div>
            <button onClick={() => console.log(workTimeDay)}>Submit</button>
            {/* <button onClick={() => console.log(workTimeDay)}>Submit</button> */}
            {/* ////////////////////////////// */}

            <div>
                <button onClick={generatePDF}>Generate PDF</button>
            </div>
        </section>


    )
}

export default Test
