import endpoint from '../../config';

import axios from 'axios';
import React, { useEffect, useState } from 'react';

import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import moment from 'moment';

import EmployeesSelected from './EmployeesSelected';

function Test() {
    const [selectedDates, setSelectedDates] = useState([]);
    const [reason, setReason] = useState('');

    const [day, setDay] = useState('');
    const [month, setMonth] = useState('');
    const [year, setYear] = useState(new Date().getFullYear());

    // const handleDateChange = (date) => {
    //     setSelectedDates((prevDates) => [...prevDates, date]);
    // };

    const handleDateChange = (date) => {
        // Check if the selected date already exists in the array
        if (!selectedDates.includes(date)) {
            setSelectedDates((prevDates) => [...prevDates, date]);
        } else {
            // Alert that the date already exists
            alert('This date is already selected. Please choose a different date.');
        }
    };

    // const handleAddDate = () => {
    //     if (day && month && year) {
    //         const selectedDate = new Date(`${day}/${month}/${year}`);
    //         setSelectedDates((prevDates) => [...prevDates, selectedDate]);
    //         setDay('');
    //         setMonth('');
    //         setYear('');
    //     } else {
    //         // Handle invalid date selection
    //         console.error('Invalid date selection');
    //     }
    // };
    // const handleAddDate = () => {
    //     if (day && month && year) {
    //         const selectedDate = new Date(`${day}/${month}/${year}`);
    //         // Check if the selected date already exists in the array
    //         if (!selectedDates.find((date) => date.getTime() === selectedDate.getTime())) {
    //             setSelectedDates((prevDates) => [...prevDates, selectedDate]);
    //         } else {
    //             // Handle case where the date already exists
    //             console.error('Date already selected');
    //             alert(`${day}/${month}/${year}` + 'ถูกเพิ่มไปแล้ว');
    //         }
    //         setDay('');
    //         setMonth('');
    //         setYear('');
    //     } else {
    //         // Handle invalid date selection
    //         // console.error(day '/' month '/' year'Invalid date selection');
    //         alert(`${day}/${month}/${year}` + 'Invalid date selection. Please select a day, month, and year.');

    //     }
    // };

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

    // const handleRemoveDate = (dateToRemove) => {
    //     setSelectedDates((prevDates) =>
    //         prevDates.filter((date) => date !== dateToRemove)
    //     );
    // };
    const handleRemoveDate = (dateToRemove) => {
        setSelectedDates((prevDates) =>
            prevDates.filter((date) => date.getTime() !== dateToRemove.getTime())
        );
    };

    const handleReasonChange = (event) => {
        setReason(event.target.value);
    };

    // console.log(workOfOT);
    return (
        <section class="content">
            <div class="row">
                <div class="col-md-12">
                    <div class="container-fluid">
                        {/* <h2 class="title">ข้อมูลการลงเวลาทำงานของพนักงาน</h2> */}
                        <form >

                            <section class="Frame">
                                <div class="row">
                                    {/*  */}
                                    {/* <DatePicker
                                        className="form-control"
                                        popperClassName="datepicker-popper"
                                        selected={null}
                                        // Pass the raw date to the handler
                                        onChange={(date) => handleDateChange(new Date(date))}
                                        dateFormat="dd/mm/yyyy"
                                        isClearable
                                        placeholderText="Select a date"
                                    /> */}
                                    {/*  */}
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

                                    {/*  */}
                                    {/* {selectedDates.length > 0 && (
                                        <div>
                                            <h3>วันหยุดหน่วยงาน</h3>
                                            <ul>
                                                {selectedDates.map((date) => (
                                                    <li key={date.toString()}>
                                                        {date.toLocaleDateString()}{' '}
                                                        <button type="button" onClick={() => handleRemoveDate(date)} class="btn clean" style={{ margin: '0.5rem' }}>
                                                            ลบออก
                                                        </button>
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>
                                    )} */}
                                    {/*  */}
                                    {selectedDates.length > 0 && (
                                        <div>
                                            <h3>วันหยุดหน่วยงาน</h3>
                                            {/* <ol>
                                                {selectedDates.map((date, index) => (
                                                    <li key={date.toString()}>
                                                        {date.toLocaleDateString()}{' '}
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
                                            </ol> */}
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
            {/* <!-- /.container-fluid --> */}
        </section>
    )
}

export default Test
