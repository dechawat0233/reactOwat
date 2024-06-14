import endpoint from '../../config';

import axios from 'axios';
import React, { useEffect, useState } from 'react'; import { jsPDF } from 'jspdf';

import 'jspdf-autotable';

import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

import moment from 'moment';
import 'moment/locale/th'; // Import the Thai locale data
function SalarySlipPDF() {
    const [workplacrId, setWorkplacrId] = useState(''); //รหัสหน่วยงาน
    const [workplacrName, setWorkplacrName] = useState(''); //รหัสหน่วยงาน

    const [searchWorkplaceId, setSearchWorkplaceId] = useState('');
    const [workplaceListAll, setWorkplaceListAll] = useState([]);
    const [employeeListAll, setEmployeeListAll] = useState([]);

    const [staffId, setStaffId] = useState(''); //รหัสหน่วยงาน
    const [staffName, setStaffName] = useState(''); //รหัสหน่วยงาน
    const [staffLastname, setStaffLastname] = useState(''); //รหัสหน่วยงาน
    const [staffFullName, setStaffFullName] = useState(''); //รหัสหน่วยงาน

    const [searchEmployeeId, setSearchEmployeeId] = useState('');
    const [searchEmployeeName, setSearchEmployeeName] = useState('');

    const [responseDataAll, setResponseDataAll] = useState([]);

    const [month, setMonth] = useState('');
    const currentYear = new Date().getFullYear(); // 2024

    const [year, setYear] = useState(currentYear);
    const EndYear = 2010;
    const years = Array.from({ length: currentYear - EndYear + 1 }, (_, index) => EndYear + index).reverse();

    const [selectedOption, setSelectedOption] = useState('option1');

    const handleSelectChange = (e) => {
        const value = e.target.value;
        setSelectedOption(value);

        // Set setStaffId based on the selected option
        if (value === 'option1') {
            setStaffId('');
            setSearchEmployeeId('');
            setStaffName('');
            setStaffFullName('');
            setSearchEmployeeName('');

            setResponseDataAll('');
        } else if (value === 'option2') {
            // Set setStaffId to another value if needed
            setWorkplacrId('');
            setWorkplacrName('');

            setResponseDataAll('');

        }
    };


    useEffect(() => {
        // Fetch data from the API when the component mounts
        fetch(endpoint + '/workplace/list')
            .then(response => response.json())
            .then(data => {
                // Update the state with the fetched data
                setWorkplaceListAll(data);
                // alert(data[0].workplaceName);
            })
            .catch(error => {
                console.error('Error fetching data:', error);
            });
    }, []);

    useEffect(() => {
        // Fetch data from the API when the component mounts
        fetch(endpoint + '/employee/list')
            .then(response => response.json())
            .then(data => {
                // Update the state with the fetched data
                setEmployeeListAll(data);
                // alert(data[0].workplaceName);
            })
            .catch(error => {
                console.error('Error fetching data:', error);
            });
    }, []);

    console.log('workplaceListAll', workplaceListAll);

    const [employeeList, setEmployeeList] = useState([]);

    useEffect(() => {
        // Fetch data from the API when the component mounts
        fetch(endpoint + '/employee/list')
            .then(response => response.json())
            .then(data => {
                // Update the state with the fetched data
                setEmployeeList(data);
            })
            .catch(error => {
                console.error('Error fetching data:', error);
            });
    }, []); // The empty array [] ensures that the effect runs only once after the initial render

    console.log(employeeList);


    // useEffect(() => {
    //     const fetchData = () => {
    //         const dataTest = {
    //             year: year,
    //             month: month,
    //         };

    //         axios.post(endpoint + '/accounting/calsalarylist', dataTest)
    //             .then(response => {
    //                 const responseData = response.data;

    //                 console.log('searchWorkplaceId', searchWorkplaceId);

    //                 console.log('responseData', responseData);
    //                 const filteredData = searchWorkplaceId ? responseData.filter(item => item.workplace === searchWorkplaceId) : responseData;

    //                 setResponseDataAll(filteredData);

    //             })
    //             .catch(error => {
    //                 console.error('Error:', error);
    //             });
    //     };

    //     // Call fetchData when year or month changes
    //     fetchData();
    // }, [year, month, searchWorkplaceId]);
    useEffect(() => {
        const fetchData = () => {
            const dataTest = {
                year: year,
                month: month,
            };

            // const dataTest = {
            //     year: '2024',
            //     month: '03',
            // };

            console.log('dataTest', dataTest);
            axios.post(endpoint + '/accounting/calsalarylist', dataTest)
                .then(response => {
                    if (selectedOption == 'option1') {
                        const responseData = response.data;
                        console.log('responseData', responseData);
                        console.log('searchWorkplaceId', searchWorkplaceId);


                        // Filter data based on searchWorkplaceId if provided
                        const filteredData = searchWorkplaceId ? responseData.filter(item => item.workplace === searchWorkplaceId) : responseData;

                        // Sort filteredData by workplace in ascending order
                        filteredData.sort((a, b) => {
                            // Convert workplace values to numbers for comparison
                            const workplaceA = Number(a.workplace);
                            const workplaceB = Number(b.workplace);

                            // Compare workplace values
                            if (workplaceA < workplaceB) {
                                return -1; // a should come before b
                            }
                            if (workplaceA > workplaceB) {
                                return 1; // a should come after b
                            }
                            return 0; // workplace values are equal
                        });
                        // searchEmployeeId
                        setResponseDataAll(filteredData);
                    } else if (selectedOption == 'option2') {
                        const responseData = response.data;
                        console.log('responseData', responseData);
                        console.log('searchEmployeeId', searchEmployeeId);

                        // Filter data based on searchWorkplaceId if provided
                        const filteredData = searchEmployeeId ? responseData.filter(item => item.employeeId === searchEmployeeId) : responseData;

                        // Sort filteredData by workplace in ascending order
                        filteredData.sort((a, b) => {
                            // Convert workplace values to numbers for comparison
                            const workplaceA = Number(a.workplace);
                            const workplaceB = Number(b.workplace);

                            // Compare workplace values
                            if (workplaceA < workplaceB) {
                                return -1; // a should come before b
                            }
                            if (workplaceA > workplaceB) {
                                return 1; // a should come after b
                            }
                            return 0; // workplace values are equal
                        });

                        setResponseDataAll(filteredData);
                    }

                })
                .catch(error => {
                    console.error('Error:', error);
                });
        };

        // Call fetchData when year, month, or searchWorkplaceId changes
        fetchData();
    }, [year, month, searchWorkplaceId, searchEmployeeId]);

    console.log('responseDataAll', responseDataAll);

    // console.log('searchEmployeeId', searchEmployeeId);

    const handleStaffIdChange = (e) => {
        const selectWorkPlaceId = e.target.value;
        setWorkplacrId(selectWorkPlaceId);
        setSearchWorkplaceId(selectWorkPlaceId);
        // Find the corresponding employee and set the staffName
        const selectedWorkplace = workplaceListAll.find(workplace => workplace.workplaceId == selectWorkPlaceId);
        console.log('selectedWorkplace', selectedWorkplace);
        if (selectWorkPlaceId) {
            // setStaffName(selectedEmployee.name);
            // setStaffLastname(selectedEmployee.lastName);
            setWorkplacrName(selectedWorkplace.workplaceName);
        } else {
            setWorkplacrName('');

        }
    };

    const handleStaffNameChange = (e) => {
        const selectWorkplaceName = e.target.value;

        // Find the corresponding employee and set the staffId and staffName
        const selectedEmployee = workplaceListAll.find(workplace => workplace.workplaceName == selectWorkplaceName);
        const selectedEmployeeFName = workplaceListAll.find(workplace => workplace.workplaceName === selectWorkplaceName);

        if (selectedEmployee) {
            setWorkplacrId(selectedEmployee.workplaceId);
            setSearchWorkplaceId(selectedEmployee.workplaceId);
            // setWorkplacrName(selectedEmployee.workplaceName);
        } else {
            setWorkplacrId('');
            // setSearchWorkplaceId('');
            // setWorkplacrName('');
        }
        setWorkplacrName(selectWorkplaceName);
    };

    const handleStaffIdChange2 = (e) => {
        const selectedStaffId = e.target.value;
        setStaffId(selectedStaffId);
        setSearchEmployeeId(selectedStaffId);
        // Find the corresponding employee and set the staffName
        const selectedEmployee = employeeList.find(employee => employee.employeeId === selectedStaffId);
        if (selectedEmployee) {
            // setStaffName(selectedEmployee.name);
            // setStaffLastname(selectedEmployee.lastName);
            setStaffFullName(selectedEmployee.name + ' ' + selectedEmployee.lastName);


        } else {
            setStaffName('');
            setStaffFullName('');
            setSearchEmployeeName('');
        }
    };

    const handleStaffNameChange2 = (e) => {
        const selectedStaffName = e.target.value;

        // Find the corresponding employee and set the staffId
        const selectedEmployee = employeeList.find(employee => (employee.name + " " + employee.lastName) === selectedStaffName);
        const selectedEmployeeFName = employeeList.find(employee => employee.name === selectedStaffName);

        if (selectedEmployee) {
            setStaffId(selectedEmployee.employeeId);
            setSearchEmployeeId(selectedEmployee.employeeId);
        } else {
            setStaffId('');
            // searchEmployeeId('');
        }

        // setStaffName(selectedStaffName);
        setStaffFullName(selectedStaffName);
        setSearchEmployeeName(selectedEmployeeFName);
    };


    const generatePDF = () => {
        const names = ['Alice', 'Bob', 'Charlie', 'David', 'Eva'];
        const ages = [25, 30, 22, 35, 28];

        // Create a new instance of jsPDF
        const pdf = new jsPDF();

        const fontPath = '/assets/fonts/THSarabunNew.ttf';
        pdf.addFileToVFS(fontPath);
        pdf.addFont(fontPath, 'THSarabunNew', 'normal');

        // Add bold font
        const boldFontPath = '/assets/fonts/THSarabunNew Bold.ttf';
        pdf.addFileToVFS(boldFontPath);
        pdf.addFont(boldFontPath, 'THSarabunNew Bold', 'normal');

        // const boldFontPath = '/assets/fonts/THSarabunNew Bold.ttf';
        // pdf.addFileToVFS(boldFontPath);
        // pdf.addFont(boldFontPath, 'THSarabunNew Bold', 'normal');

        // Override the default stylestable for jspdf-autotable
        const stylestable = {
            font: 'THSarabunNew',
            fontStyle: 'normal',
            fontSize: 10,
        };
        const tableOptions = {
            styles: stylestable,
            startY: 25,
            // margin: { top: 10 },
        };

        // Set the initial position for text and frame
        let x = 20;

        // pdf.setFont('THSarabunNew');
        pdf.setFont('THSarabunNew Bold');


        // Loop through the names and ages arrays to add content to the PDF
        for (let i = 0; i < responseDataAll.length; i += 2) {
            // Add a page for each pair of names
            if (i > 0) {
                pdf.addPage();
            }


            // เรียงarray 
            const countSpecialDayListWork = responseDataAll[i].specialDayListWork.length;
            const countcal = responseDataAll[i].accountingRecord.countDay - countSpecialDayListWork;
            console.log('countSpecialDayListWork', countSpecialDayListWork);
            console.log('countcal', countcal);

            // 2.0
            const formattedAmountHoliday2_0 = Number((countSpecialDayListWork * responseDataAll[i].specialDayRate) ?? 0);

            // รถโทรตำแหน่ง
            const formattedAddTel = Number((responseDataAll[i].accountingRecord.tel || 0));
            const formattedAddAmountPosition = Number((responseDataAll[i].accountingRecord.amountPosition || 0));
            const formattedAddTravel = Number((responseDataAll[i].accountingRecord.travel || 0));
            console.log('formattedAddTel', formattedAddTel);
            console.log('formattedAddAmountPosition', formattedAddAmountPosition);
            console.log('formattedAddTravel', formattedAddTravel);
            // console.log('formattedAddTelAmountPositionTravel', formattedAddTelAmountPositionTravel);
            const formattedAddTelAmountPositionTravel = formattedAddTel + formattedAddAmountPosition + formattedAddTravel;

            // เบี้ยขยัน
            const formattedAmountHardWorking = responseDataAll[i].addSalary.filter(item => item.id === "1410");
            // Calculate the sum of SpSalary values in the filtered array
            const sumAmountHardWorking = formattedAmountHardWorking.reduce((total, item) => total + parseFloat(item.SpSalary || 0), 0);

            // นักขัติ
            const countSpecialDayWork = responseDataAll[i].countSpecialDay;
            const formattedAmountHoliday = Number((responseDataAll[i].countSpecialDay * responseDataAll[i].specialDayRate) ?? 0);
            console.log('formattedAmountHoliday', formattedAmountHoliday);

            //เงินพิเศษ
            const formattedSumAddSalaryAfterTax = Number(responseDataAll[i].accountingRecord.sumAddSalaryAfterTax ?? 0).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });

            //หัก
            // คืนเงินเบิกล่วงหน้า
            const advancePayment = parseFloat(responseDataAll[i].accountingRecord.advancePayment || 0).toFixed(2);

            pdf.setFontSize(15);

            pdf.text(`ใบจ่ายเงินเดือน`, 73, 12);

            pdf.text(`บริษัท โอวาท โปร แอนด์ คริก จำกัด`, 55, 18);

            pdf.setFontSize(12);

            const head = 25;
            const head2 = 155;

            pdf.text(`รหัส`, 7, head);
            pdf.text(`ชื่อ-สกุล`, 50, head);
            pdf.text(`แผนก`, 110, head);
            pdf.text(`${responseDataAll[i].workplace}`, 118, head);
            pdf.text(`เลขที่บัญชี`, 165, head);

            const namesWithSpecificIds = responseDataAll[i].addSalary
                // "1230" || item.id === "1520" || item.id === "1350"
                .filter(item => ['1230', '1520', '1350'].includes(item.id)) // Filter based on specific IDs
                .map(item => item.name) // Extract names
            // Concatenate names if there are any
            const concatenatedNames = namesWithSpecificIds.length > 0 ? namesWithSpecificIds.join('/') : '';
            // Show concatenated names in the PDF

            console.log('namesWithSpecificIds', namesWithSpecificIds);
            console.log('concatenatedNames', concatenatedNames);
            // Draw a square frame around the first name
            pdf.rect(7, 28, 155, 74);//ตารางหลัก
            pdf.rect(7, 28, 155, 12);//ตารางหลัก หัวตาราง

            pdf.rect(7, 28, 155, 63); //ตารางหลัก ล่าง
            pdf.rect(7, 28, 44, 63);//ตารางหลัก บน ซ้าย ช่อง1 รายได้
            pdf.text(`รายได้`, 24, 34);//ตารางหลัก รายได้
            pdf.text(`Earnings`, 22, 37);//ตารางหลัก Earnings

            const textArray = [];
            const countArray = [];
            const valueArray = [];

            if (responseDataAll[i].accountingRecord.amountDay != 0 && responseDataAll[i].accountingRecord.amountDay != null) {
                // Push the text to textArray and the value to valueArray
                textArray.push('อัตรา');
                countArray.push('');
                valueArray.push(responseDataAll[i].accountingRecord.amountDay.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ','));
            }
            if (responseDataAll[i].accountingRecord.amountDay != 0 && responseDataAll[i].accountingRecord.amountDay != null) {
                // Push the text to textArray and the value to valueArray
                textArray.push('เงินเดือน');
                countArray.push(countcal);
                valueArray.push(responseDataAll[i].accountingRecord.amountDay.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ','));
            }
            if (0 != 0 && null != null) {
                // Push the text to textArray and the value to valueArray
                textArray.push('ค่าล่วงเวลา 1 เท่า');
                countArray.push('');
                valueArray.push(responseDataAll[i].accountingRecord.amountDay.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ','));
            }
            if (responseDataAll[i].accountingRecord.amountOt != 0 && responseDataAll[i].accountingRecord.amountOt != null) {
                // Push the text to textArray and the value to valueArray
                textArray.push('ค่าล่วงเวลา 1.5 เท่า');
                countArray.push(responseDataAll[i].accountingRecord.countOtHour.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ','));
                valueArray.push(responseDataAll[i].accountingRecord.amountOt.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ','));
            }
            if (responseDataAll[i].specialDayListWork.length !== 0 && responseDataAll[i].specialDayListWork.length !== null) {
                // Push the text to textArray and the value to valueArray
                textArray.push('ค่าล่วงเวลา 2 เท่า');
                countArray.push('');
                valueArray.push(formattedAmountHoliday2_0.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ','));
            }
            console.log('responseDataAll[i].specialDayListWork.length', responseDataAll[i].specialDayListWork.length);
            if (0 != 0 && null != null) {
                // Push the text to textArray and the value to valueArray
                textArray.push('ค่าล่วงเวลา 3 เท่า');
                countArray.push('');
                valueArray.push(responseDataAll[i].accountingRecord.amountDay.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ','));
            }
            //รถโทรตำแหน่ง
            if (formattedAddTelAmountPositionTravel != 0 && formattedAddTelAmountPositionTravel != null) {
                // Push the text to textArray and the value to valueArray
                textArray.push(concatenatedNames);
                countArray.push('');
                valueArray.push(formattedAddTelAmountPositionTravel.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ','));
            }
            if (sumAmountHardWorking != 0 && sumAmountHardWorking != null) {
                textArray.push('เบี้ยขยัน');
                countArray.push('');
                valueArray.push(sumAmountHardWorking.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ','));
            }
            if (countSpecialDayListWork !== 0 && countSpecialDayListWork !== null) {
                textArray.push('วันหยุดนักขัติฤกษ์');
                // countArray.push(countSpecialDayListWork.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ','));
                valueArray.push(formattedAmountHoliday.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ','));
            }

            if (formattedSumAddSalaryAfterTax != 0 && formattedSumAddSalaryAfterTax != null) {
                textArray.push('เงินเพิ่มพิเศษ');
                countArray.push('');
                valueArray.push(formattedSumAddSalaryAfterTax.replace(/\B(?=(\d{3})+(?!\d))/g, ','));
            }
            if (0 != 0 && 0 != null) {
                textArray.push('จ่ายป่วย');
                countArray.push('');
                valueArray.push(0.00);
            }

            const textDedustArray = [];
            const valueDedustArray = [];

            if (advancePayment != 0 && advancePayment != null) {
                textDedustArray.push('คืนเงินเบิกล่วงหน้า');
                valueDedustArray.push(advancePayment);
            }
            if (responseDataAll[i].accountingRecord.tax != 0 && responseDataAll[i].accountingRecord.tax != null) {
                textDedustArray.push('หักภาษีเงินได้');
                valueDedustArray.push(responseDataAll[i].accountingRecord.tax.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ','));
            }
            if (responseDataAll[i].accountingRecord.socialSecurity != 0 && responseDataAll[i].accountingRecord.socialSecurity != null) {
                textDedustArray.push('หักสมทบประกันสังคม');
                valueDedustArray.push(responseDataAll[i].accountingRecord.socialSecurity.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ','));
            }

            console.log('textArray', textArray);
            console.log('valueArray', valueArray);

            // //////////////////////// หัวข้อ
            // pdf.text(`อัตรา`, 8, 44);//ตารางหลัก 
            // pdf.text(`เงินเดือน`, 8, 48.1);//ตารางหลัก Earnings
            // pdf.text(`ค่าล่วงเวลา 1 เท่า`, 8, 52.2);//ตารางหลัก 
            // pdf.text(`ค่าล่วงเวลา 1.5 เท่า`, 8, 56.3);//ตารางหลัก Earnings
            // pdf.text(`ค่าล่วงเวลา 2 เท่า(วันหยุด/นักขัติ)`, 8, 60.4);//ตารางหลัก 
            // pdf.text(`ค่าล่วงเวลา 3 เท่า`, 8, 64.5);//ตารางหลัก Earnings

            // // pdf.text(`ค่าเดินทาง/ตำแหน่ง/โทรศัพท์`, 8, 68.6);//ตารางหลัก Earnings 68.6
            // pdf.text(`${concatenatedNames}`, 8, 68.6);

            // pdf.text(`เบี้ยขยัน`, 8, 72.7);//ตารางหลัก Earnings 72.7
            // pdf.text(`วันหยุดนักขัติฤกษ์`, 8, 76.8);//ตารางหลัก  76.8
            // pdf.text(`เงินเพิ่มพิเศษ/ค่าร้อน/หุงข้าว/ค่ากะ`, 8, 80.9);//ตารางหลัก 
            // pdf.text(`จ่ายป่วย/พักร้อน/ลาคลอด/เลิกจ้าง/อื่นๆ`, 8, 85);//ตารางหลัก Earnings

            pdf.rect(7, 28, 62, 63);//ตารางหลัก บน ซ้าย ช่อง1 จำนวน
            pdf.text(`จำนวน`, 56, 34);//ตารางหลัก จำนวน
            pdf.text(`Number`, 55, 37);//ตารางหลัก Number

            pdf.rect(69, 28, 24, 74);//ตารางหลัก บน ซ้าย ช่อง1 จำนวนเงิน
            pdf.text(`จำนวนเงิน`, 74, 34);//ตารางหลัก จำนวนเงิน
            pdf.text(`Amount`, 75, 37);//ตารางหลัก Amount

            pdf.rect(69, 28, 69, 74);//ตารางหลัก บน ซ้าย ช่อง1 รายการหัก / รายการคืน
            pdf.text(`รายการหัก / รายการคืน`, 102, 34);//รายการหัก / รายการคืน
            // pdf.text(`Amount`, 75, 38);//ตารางหลัก 

            /////////
            // pdf.text(`คืนเงินเบิกล่วงหน้า`, 94, 76.8);//ตารางหลัก Earnings
            // pdf.text(`หักภาษีเงินได้`, 94, 80.9);//ตารางหลัก 
            // pdf.text(`หักสมทบประกันสังคม`, 94, 85);//ตารางหลัก Earnings
            // // pdf.text(`ค่าทำเนียมโอน`, 94, 89.1);//ตารางหลัก Earnings

            ///////// รวมเงินได้
            pdf.text(`รวมเงินได้`, 28, 96);//ตารางหลัก Earnings
            pdf.text(`Tatol Earninng`, 23, 100);//ตารางหลัก Earnings

            /////  รายการหัก / รายการคืน
            pdf.text(`รายการหัก / รายการคืน`, 100, 96);//ตารางหลัก Earnings
            pdf.text(`Tatol Deduction`, 105, 100);//ตารางหลัก Earnings


            pdf.text(`จำนวนเงิน`, 144, 34);//ตารางหลัก จำนวนเงิน
            pdf.text(`Amount`, 145, 37);//ตารางหลัก Amount

            pdf.rect(162 + 9, 28, 25, 25);//ตารางวันที่จ่าย
            pdf.rect(162 + 9, 28, 25, 15);//ตารางวันที่จ่าย
            pdf.text(`วันที่จ่าย`, 180, 35);//ตารางหลัก วันที่จ่าย
            pdf.text(`Payroll Date`, 177, 38);//ตารางหลัก Payroll Date

            pdf.rect(162 + 9, 77, 25, 25);//ตารางเงินรับสุทธิ
            pdf.rect(162 + 9, 77, 25, 15);//ตารางเงินรับสุทธิ
            pdf.text(`เงินรับสุทธิ`, 178, 84);//ตารางหลัก วันที่จ่าย
            pdf.text(`Net To Pay`, 177, 87);//ตารางหลัก Payroll Date

            pdf.rect(7, 104, 155, 13);//ตาราง 2 
            pdf.rect(7, 104, 155, 6.5);//ตาราง 2 เส็นกลาง

            let x1 = 31
            for (let j = 0; j < 5; j++) {
                pdf.rect(7, 104, x1, 13);//ตาราง 2 
                x1 += 31
            };

            pdf.text(`เงินได้สะสมต่อปี`, 9, 108);//ตารางหลัก Earnings
            pdf.text(`ภาษีสะสมต่อปี`, 40, 108);//ตารางหลัก Earnings
            pdf.text(`เงินสะสมกองทุนต่อปี`, 71, 108);//ตารางหลัก Earnings
            pdf.text(`เงินประกันสะสมต่อปี`, 102, 108);//ตารางหลัก Earnings
            pdf.text(`ค่าลดหย่อนอื่นๆ`, 133, 108);//ตารางหลัก Earnings


            // pdf.rect(7, 119, 155, 12);//ตาราง 3
            // pdf.rect(7, 119, 97, 6);//ตาราง 3
            // let x2 = 9.7
            // for (let b = 0; b < 10; b++) {
            //     pdf.rect(7, 119, x2, 12);//ตาราง 2 
            //     x2 += 9.7
            // };
            pdf.rect(112, 119, 50, 12);//ตาราง 3
            pdf.text(`ลงชื่อพนักงาน`, 125, 130);//ตารางหลัก Earnings



            pdf.text(`${responseDataAll[i].employeeId}`, 12, head);
            pdf.text(`${responseDataAll[i].name} ${responseDataAll[i].lastName}`, 60, head);

            // //แถวอัตราจ้าง
            // //  pdf.text(`${countcal.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ',')}`, 68, 48.1, { align: 'right' });
            // pdf.text(`${responseDataAll[i].accountingRecord.amountDay.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ',')}`, 92, 44.0, { align: 'right' });

            // //แถวเงินเดือน
            // pdf.text(`${countcal.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ',')}`, 68, 48.1, { align: 'right' });
            // pdf.text(`${responseDataAll[i].accountingRecord.amountDay.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ',')}`, 92, 48.1, { align: 'right' });

            // //แถวเงินเดือน1.5
            // pdf.text(`${responseDataAll[i].accountingRecord.countOtHour.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ',')}`, 68, 56.3, { align: 'right' });
            // pdf.text(`${responseDataAll[i].accountingRecord.amountOt.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ',')}`, 92, 56.3, { align: 'right' });

            // //แถวเงินเดือน2.0

            // // const formattedAmountHoliday2_0 = Number((countSpecialDayListWork * responseDataAll[i].specialDayRate) ?? 0);
            // pdf.text(`${countSpecialDayListWork.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ',')}`, 68, 60.4, { align: 'right' });
            // pdf.text(`${formattedAmountHoliday2_0.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ',')}`, 92, 60.4, { align: 'right' });

            // //แถวรถ ตน. โทร
            // //  const countSpecialDayWork = responseDataAll[i].countSpecialDay;
            // // const formattedAddTelAmountPositionTravel = Number((responseDataAll[i].tel + responseDataAll[i].amountPosition + responseDataAll[i].travel) ?? 0);
            // // const formattedAddTelAmountPositionTravel = Number((responseDataAll[i].accountingRecord.tel || 0) +
            // //     (responseDataAll[i].accountingRecord.amountPosition || 0) +
            // //     (responseDataAll[i].accountingRecord.travel || 0));

            // // pdf.text(`${countSpecialDayWork.toFixed(2)}`, 68, 76.8, { align: 'right' });
            // pdf.text(`${formattedAddTelAmountPositionTravel.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ',')}`, 92, 68.6, { align: 'right' });

            // //เงินเพิ่ม 1 เบี้ยขยัน
            // pdf.text(`${sumAmountHardWorking.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`,
            //     92, 72.7, { align: 'right' });

            // //แถวนักขัติ
            // pdf.text(`${countSpecialDayWork.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ',')}`,
            //     68, 76.8, { align: 'right' });
            // pdf.text(`${formattedAmountHoliday.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ',')}`,
            //     92, 76.8, { align: 'right' });

            // //เงินเพิ่มพิเศษ 
            // // const formattedSumAddSalaryAfterTax = Number(responseDataAll[i].accountingRecord.sumAddSalaryAfterTax ?? 0).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
            // pdf.text(`${formattedSumAddSalaryAfterTax.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}`, 92, 80.9, { align: 'right' });
            // //จ่ายป่วย 
            // pdf.text(`0.00`, 92, 85, { align: 'right' });

            // //โซนหัก
            // //เงินเบิกล่วงหน้า
            // // const advancePayment = parseFloat(responseDataAll[i].accountingRecord.advancePayment || 0).toFixed(2);
            // pdf.text(`${advancePayment.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}`, 160, 76.8, { align: 'right' });

            // // pdf.text(`${parseFloat(responseDataAll[i].accountingRecord.advancePayment.toFixed(2))}`, 160, 76.8, { align: 'right' });
            // // console.log('responseDataAll[i].accountingRecord.advancePayment.toFixed(2)', responseDataAll[i].accountingRecord.advancePayment.toFixed(2));
            // //หักภาษีเงินได้
            // pdf.text(`${responseDataAll[i].accountingRecord.tax.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ',') ?? 0}`, 160, 80.9, { align: 'right' });
            // //หักประกันสังคม
            // pdf.text(`${responseDataAll[i].accountingRecord.socialSecurity.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ',') ?? 0}`, 160, 85, { align: 'right' });
            // // //ค่าทำเนียมโอน
            // // pdf.text(`${responseDataAll[i].accountingRecord.bank.toFixed(2) ?? 0}`, 160, 89.1, { align: 'right' });

            let y = 44; // Initial y position

            textArray.forEach(text => {
                // Output each element of the textArray at the current y position
                pdf.text(`${text}`, 8, y);

                // Increment y position for the next line
                y += 4.1;
            });

            let y2 = 44; // Initial y position

            countArray.forEach(text => {
                // Output each element of the textArray at the current y position
                pdf.text(`${text}`, 68, y2, { align: 'right' });

                // Increment y position for the next line
                y2 += 4.1;
            });

            let y3 = 44; // Initial y position

            valueArray.forEach(text => {
                // Output each element of the textArray at the current y position
                pdf.text(`${text}`, 92, y3, { align: 'right' });

                // Increment y position for the next line
                y3 += 4.1;
            });

            let y4 = 44; // Initial y position

            textDedustArray.forEach(text => {
                // Output each element of the textArray at the current y position
                pdf.text(`${text}`, 94, y4);

                // Increment y position for the next line
                y4 += 4.1;
            });
            let y5 = 44; // Initial y position

            valueDedustArray.forEach(text => {
                // Output each element of the textArray at the current y position
                pdf.text(`${text}`, 160, y5, { align: 'right' });

                // Increment y position for the next line
                y5 += 4.1;
            });


            //รวมเงินได้
            const sumAddSalaryAfterTax = parseFloat(responseDataAll[i].accountingRecord.sumAddSalaryAfterTax ?? 0);
            const formattedSumAddSalaryAfterTax1 = sumAddSalaryAfterTax.toLocaleString('en-US', {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2
            });
            const sumSalary =
                // responseDataAll[i].accountingRecord.countDay +

                // responseDataAll[i].accountingRecord.amountDay +
                // responseDataAll[i].accountingRecord.amountOt +
                // // Number(formattedAmountHoliday2_0) +
                // Number((countSpecialDayListWork * responseDataAll[i].specialDayRate) ?? 0) +
                // // Number(formattedAmountHoliday) +
                // Number((responseDataAll[i].countSpecialDay * responseDataAll[i].specialDayRate) ?? 0) +
                // // Number(formattedSumAddSalaryAfterTax) +
                // (responseDataAll[i].accountingRecord.sumAddSalaryAfterTax ?? 0) +
                // responseDataAll[i].accountingRecord.addAmountBeforeTax +
                // responseDataAll[i].accountingRecord.addAmountAfterTax
                responseDataAll[i].accountingRecord.amountDay+
                responseDataAll[i].accountingRecord.amountOt+
               responseDataAll[i].addSalary.amountOt 
                ; 
               

            // pdf.text(`${sumSalary.toFixed(2)}`, 92, 96, { align: 'right' });
            pdf.text(`${sumSalary.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ',')}`, 92, 96, { align: 'right' });

            //รวมเงินหัก
            const sumDeductSalary =
                parseFloat(responseDataAll[i].accountingRecord.advancePayment) +
                // advancePayment +
                responseDataAll[i].accountingRecord.tax +
                responseDataAll[i].accountingRecord.socialSecurity +
                responseDataAll[i].accountingRecord.bank;

            pdf.text(`${sumDeductSalary.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ',')}`, 160, 96, { align: 'right' });

            pdf.text(`${(sumSalary - sumDeductSalary).toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ',')}`, 188, 98, { align: 'right' });


            // pdf.text(`Age: ${ages[i]}`, x + 10, 60);

            // Move to the next column
            // x += 80;

            // Draw a square frame around the second name if available
            if (i + 1 < responseDataAll.length) {
                pdf.setFontSize(15);

                // เรียงarray 
                const countSpecialDayListWork = responseDataAll[i + 1].specialDayListWork.length;
                const countcal = responseDataAll[i + 1].accountingRecord.countDay - countSpecialDayListWork;
                console.log('countSpecialDayListWork', countSpecialDayListWork);
                console.log('countcal', countcal);

                // 2.0
                const formattedAmountHoliday2_0 = Number((countSpecialDayListWork * responseDataAll[i + 1].specialDayRate) ?? 0);

                // รถโทรตำแหน่ง
                const formattedAddTel = Number((responseDataAll[i + 1].accountingRecord.tel || 0));
                const formattedAddAmountPosition = Number((responseDataAll[i + 1].accountingRecord.amountPosition || 0));
                const formattedAddTravel = Number((responseDataAll[i + 1].accountingRecord.travel || 0));
                console.log('formattedAddTel', formattedAddTel);
                console.log('formattedAddAmountPosition', formattedAddAmountPosition);
                console.log('formattedAddTravel', formattedAddTravel);
                // console.log('formattedAddTelAmountPositionTravel', formattedAddTelAmountPositionTravel);
                const formattedAddTelAmountPositionTravel = formattedAddTel + formattedAddAmountPosition + formattedAddTravel;

                // เบี้ยขยัน
                const formattedAmountHardWorking = responseDataAll[i + 1].addSalary.filter(item => item.id === "1410");
                // Calculate the sum of SpSalary values in the filtered array
                const sumAmountHardWorking = formattedAmountHardWorking.reduce((total, item) => total + parseFloat(item.SpSalary || 0), 0);

                // นักขัติ
                const countSpecialDayWork = responseDataAll[i + 1].countSpecialDay;
                const formattedAmountHoliday = Number((responseDataAll[i + 1].countSpecialDay * responseDataAll[i + 1].specialDayRate) ?? 0);
                console.log('formattedAmountHoliday', formattedAmountHoliday);

                //เงินพิเศษ
                const formattedSumAddSalaryAfterTax = Number(responseDataAll[i + 1].accountingRecord.sumAddSalaryAfterTax ?? 0).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });

                //หัก
                // คืนเงินเบิกล่วงหน้า
                const advancePayment = parseFloat(responseDataAll[i + 1].accountingRecord.advancePayment || 0).toFixed(2);


                const textArray = [];
                const countArray = [];
                const valueArray = [];

                if (responseDataAll[i + 1].accountingRecord.amountDay != 0 && responseDataAll[i + 1].accountingRecord.amountDay != null) {
                    // Push the text to textArray and the value to valueArray
                    textArray.push('อัตรา');
                    countArray.push('');
                    valueArray.push(responseDataAll[i + 1].accountingRecord.amountDay.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ','));
                }
                if (responseDataAll[i + 1].accountingRecord.amountDay != 0 && responseDataAll[i + 1].accountingRecord.amountDay != null) {
                    // Push the text to textArray and the value to valueArray
                    textArray.push('เงินเดือน');
                    countArray.push(countcal);
                    valueArray.push(responseDataAll[i + 1].accountingRecord.amountDay.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ','));
                }
                if (0 != 0 && null != null) {
                    // Push the text to textArray and the value to valueArray
                    textArray.push('ค่าล่วงเวลา 1 เท่า');
                    countArray.push('');
                    valueArray.push(responseDataAll[i + 1].accountingRecord.amountDay.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ','));
                }
                if (responseDataAll[i + 1].accountingRecord.amountOt != 0 && responseDataAll[i + 1].accountingRecord.amountOt != null) {
                    // Push the text to textArray and the value to valueArray
                    textArray.push('ค่าล่วงเวลา 1.5 เท่า');
                    countArray.push(responseDataAll[i + 1].accountingRecord.countOtHour.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ','));
                    valueArray.push(responseDataAll[i + 1].accountingRecord.amountOt.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ','));
                }
                if (responseDataAll[i + 1].specialDayListWork.length !== 0 && responseDataAll[i + 1].specialDayListWork.length !== null) {
                    // Push the text to textArray and the value to valueArray
                    textArray.push('ค่าล่วงเวลา 2 เท่า');
                    countArray.push('');
                    valueArray.push(formattedAmountHoliday2_0.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ','));
                }
                console.log('responseDataAll[i +1].specialDayListWork.length', responseDataAll[i + 1].specialDayListWork.length);
                if (0 != 0 && null != null) {
                    // Push the text to textArray and the value to valueArray
                    textArray.push('ค่าล่วงเวลา 3 เท่า');
                    countArray.push('');
                    valueArray.push(responseDataAll[i + 1].accountingRecord.amountDay.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ','));
                }
                //รถโทรตำแหน่ง
                if (formattedAddTelAmountPositionTravel != 0 && formattedAddTelAmountPositionTravel != null) {
                    // Push the text to textArray and the value to valueArray
                    textArray.push(concatenatedNames);
                    countArray.push('');
                    valueArray.push(formattedAddTelAmountPositionTravel.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ','));
                }
                if (sumAmountHardWorking != 0 && sumAmountHardWorking != null) {
                    textArray.push('เบี้ยขยัน');
                    countArray.push('');
                    valueArray.push(sumAmountHardWorking.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ','));
                }
                if (countSpecialDayListWork !== 0 && countSpecialDayListWork !== null) {
                    textArray.push('วันหยุดนักขัติฤกษ์');
                    // countArray.push(countSpecialDayListWork.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ','));
                    valueArray.push(formattedAmountHoliday.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ','));
                }

                if (formattedSumAddSalaryAfterTax != 0 && formattedSumAddSalaryAfterTax != null) {
                    textArray.push('เงินเพิ่มพิเศษ');
                    countArray.push('');
                    valueArray.push(formattedSumAddSalaryAfterTax.replace(/\B(?=(\d{3})+(?!\d))/g, ','));
                }
                if (0 != 0 && 0 != null) {
                    textArray.push('จ่ายป่วย');
                    countArray.push('');
                    valueArray.push(0.00);
                }

                const textDedustArray = [];
                const valueDedustArray = [];

                if (advancePayment != 0 && advancePayment != null) {
                    textDedustArray.push('คืนเงินเบิกล่วงหน้า');
                    valueDedustArray.push(advancePayment);
                }
                if (responseDataAll[i + 1].accountingRecord.tax != 0 && responseDataAll[i + 1].accountingRecord.tax != null) {
                    textDedustArray.push('หักภาษีเงินได้');
                    valueDedustArray.push(responseDataAll[i + 1].accountingRecord.tax.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ','));
                }
                if (responseDataAll[i + 1].accountingRecord.socialSecurity != 0 && responseDataAll[i + 1].accountingRecord.socialSecurity != null) {
                    textDedustArray.push('หักสมทบประกันสังคม');
                    valueDedustArray.push(responseDataAll[i + 1].accountingRecord.socialSecurity.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ','));
                }

                console.log('textArray', textArray);
                console.log('valueArray', valueArray);

                pdf.text(`ใบจ่ายเงินเดือน`, 73, 142);
                pdf.text(`บริษัท โอวาท โปร แอนด์ คริก จำกัด`, 55, 148);
                pdf.setFontSize(12);

                pdf.text(`รหัส`, 7, head2);
                pdf.text(`ชื่อ-สกุล`, 50, head2);
                pdf.text(`แผนก`, 110, head2);
                pdf.text(`${responseDataAll[i + 1].workplace}`, 118, head2);

                pdf.text(`เลขที่บัญชี`, 165, head2);

                // pdf.rect(7, 156, 60, 30);


                pdf.rect(7, head2 + 3, 155, 74);//ตารางหลัก
                pdf.rect(7, head2 + 3, 155, 12);//ตารางหลัก หัวตาราง
                pdf.rect(7, head2 + 3, 155, 63); //ตารางหลัก ล่าง
                pdf.rect(7, head2 + 3, 44, 63);//ตารางหลัก บน ซ้าย ช่อง1 รายได้
                pdf.text(`รายได้`, 24, head2 + 9);//ตารางหลัก รายได้
                pdf.text(`Earnings`, 22, head2 + 12);//ตารางหลัก Earnings

                /////////////////

                const namesWithSpecificIds = responseDataAll[i + 1].addSalary
                    // "1230" || item.id === "1520" || item.id === "1350"
                    .filter(item => ['1230', '1520', '1350'].includes(item.id)) // Filter based on specific IDs
                    .map(item => item.name) // Extract names
                // Concatenate names if there are any
                const concatenatedNames = namesWithSpecificIds.length > 0 ? namesWithSpecificIds.join('/') : '';
                // Show concatenated names in the PDF

                //////////////////////// หัวข้อ
                // pdf.text(`อัตรา`, 8, head2 + 19);//ตารางหลัก 
                // pdf.text(`เงินเดือน`, 8, head2 + 23.1);//ตารางหลัก Earnings
                // pdf.text(`ค่าล่วงเวลา 1 เท่า`, 8, head2 + 27.2);//ตารางหลัก 
                // pdf.text(`ค่าล่วงเวลา 1.5 เท่า`, 8, head2 + 31.3);//ตารางหลัก Earnings
                // pdf.text(`ค่าล่วงเวลา 2 เท่า(วันหยุด/นักขัติ)`, 8, head2 + 35.4);//ตารางหลัก 
                // pdf.text(`ค่าล่วงเวลา 3 เท่า`, 8, head2 + 39.5);//ตารางหลัก Earnings

                // // pdf.text(`ค่าเดินทาง/ตำแหน่ง/โทรศัพท์`, 8, head2 + 43.6);//ตารางหลัก Earnings  43.6
                // pdf.text(`${concatenatedNames}`, 8, head2 + 43.6);

                // pdf.text(`เบี้ยขยัน`, 8, head2 + 47.7);//ตารางหลัก Earnings 47.7
                // pdf.text(`วันหยุดนักขัติฤกษ์`, 8, head2 + 51.8);//ตารางหลัก 
                // pdf.text(`เงินเพิ่มพิเศษ/ค่าร้อน/หุงข้าว/ค่ากะ`, 8, head2 + 55.9);//ตารางหลัก 
                // pdf.text(`จ่ายป่วย/พักร้อน/ลาคลอด/เลิกจ้าง/อื่นๆ`, 8, head2 + 60);//ตารางหลัก Earnings

                pdf.rect(7, head2 + 3, 62, 63);//ตารางหลัก บน ซ้าย ช่อง1 จำนวน
                pdf.text(`จำนวน`, 56, head2 + 9);//ตารางหลัก จำนวน
                pdf.text(`Number`, 55, head2 + 12);//ตารางหลัก Number

                pdf.rect(69, head2 + 3, 24, 74);//ตารางหลัก บน ซ้าย ช่อง1 จำนวนเงิน
                pdf.text(`จำนวนเงิน`, 74, head2 + 9);//ตารางหลัก จำนวนเงิน
                pdf.text(`Amount`, 75, head2 + 12);//ตารางหลัก Amount

                pdf.rect(69, head2 + 3, 69, 74);//ตารางหลัก บน ซ้าย ช่อง1 รายการหัก / รายการคืน
                pdf.text(`รายการหัก / รายการคืน`, 102, head2 + 9);//รายการหัก / รายการคืน
                // pdf.text(`Amount`, 75, 38);//ตารางหลัก 

                // /////////
                // pdf.text(`คืนเงินเบิกล่วงหน้า`, 94, head2 + 51.8);//ตารางหลัก Earnings
                // pdf.text(`หักภาษีเงินได้`, 94, head2 + 55.9);//ตารางหลัก 
                // pdf.text(`หักสมทบประกันสังคม`, 94, head2 + 60);//ตารางหลัก Earnings
                // // pdf.text(`ค่าทำเนียมโอน`, 94, head2 + 64.1);//ตารางหลัก Earnings

                ///////// รวมเงินได้
                pdf.text(`รวมเงินได้`, 28, head2 + 71);//ตารางหลัก Earnings
                pdf.text(`Tatol Earninng`, 23, head2 + 75);//ตารางหลัก Earnings

                /////  รายการหัก / รายการคืน
                pdf.text(`รายการหัก / รายการคืน`, 100, head2 + 71);//ตารางหลัก Earnings
                pdf.text(`Tatol Deduction`, 105, head2 + 75);//ตารางหลัก Earnings

                pdf.text(`จำนวนเงิน`, 144, head2 + 9);//ตารางหลัก จำนวนเงิน
                pdf.text(`Amount`, 145, head2 + 12);//ตารางหลัก Amount
                // pdf.rect(162 + 9, 28, 25, 25);//ตารางวันที่จ่าย

                // pdf.rect(162 + 9, 77, 25, 25);//ตารางเงินรับสุทธิ

                pdf.rect(162 + 9, head2 + 3, 25, 25);//ตารางวันที่จ่าย
                pdf.rect(162 + 9, head2 + 3, 25, 15);//ตารางวันที่จ่าย
                pdf.text(`วันที่จ่าย`, 180, head2 + 9);//ตารางหลัก วันที่จ่าย
                pdf.text(`Payroll Date`, 177, head2 + 12);//ตารางหลัก Payroll Date

                pdf.rect(162 + 9, head2 + 52, 25, 25);//ตารางเงินรับสุทธิ
                pdf.rect(162 + 9, head2 + 52, 25, 15);//ตารางเงินรับสุทธิ
                pdf.text(`เงินรับสุทธิ`, 178, head2 + 59);//ตารางหลัก เงินรับสุทธิ
                pdf.text(`Net To Pay`, 177, head2 + 62);//ตารางหลัก Net To Pay

                pdf.rect(7, head2 + 79, 155, 13);//ตาราง 2 
                pdf.rect(7, head2 + 79, 155, 6.5);//ตาราง 2 เส็นกลาง

                let x1 = 31
                for (let j = 0; j < 5; j++) {
                    pdf.rect(7, head2 + 79, x1, 13);//ตาราง 2 
                    x1 += 31
                };
                // 108
                // 83
                pdf.text(`เงินได้สะสมต่อปี`, 9, head2 + 83);//ตารางหลัก Earnings
                pdf.text(`ภาษีสะสมต่อปี`, 40, head2 + 83);//ตารางหลัก Earnings
                pdf.text(`เงินสะสมกองทุนต่อปี`, 71, head2 + 83);//ตารางหลัก Earnings
                pdf.text(`เงินประกันสะสมต่อปี`, 102, head2 + 83);//ตารางหลัก Earnings
                pdf.text(`ค่าลดหย่อนอื่นๆ`, 133, head2 + 83);//ตารางหลัก Earnings

                // pdf.rect(7, head2 + 94, 155, 12);//ตาราง 3
                // pdf.rect(7, head2 + 94, 97, 6);//ตาราง 3
                // let x2 = 9.7
                // for (let b = 0; b < 10; b++) {
                //     pdf.rect(7, head2 + 94, x2, 12);//ตาราง 2 
                //     x2 += 9.7
                // };
                pdf.rect(112, head2 + 94, 50, 12);//ตาราง 3
                pdf.text(`ลงชื่อพนักงาน`, 125, head2 + 105);//ตารางหลัก Earnings

                // // เรียงarray 
                // // pdf.text(`Name: ${names[i + 1]}`, 7, 166);
                // const countSpecialDayListWork = responseDataAll[i + 1].specialDayListWork.length;
                // const countcal = responseDataAll[i + 1].accountingRecord.countDay - countSpecialDayListWork;

                pdf.text(` ${responseDataAll[i + 1].employeeId}`, 12, head2);
                pdf.text(`${responseDataAll[i + 1].name} ${responseDataAll[i + 1].lastName}`, 60, head2);

                // //แถวอัตราจ้าง
                // // pdf.text(`${countcal.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ',')}`, 68, head2 + 23.1, { align: 'right' });
                // pdf.text(`${responseDataAll[i + 1].accountingRecord.amountDay.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ',')}`, 92, head2 + 19.0, { align: 'right' });

                // //แถวเงินเดือน
                // pdf.text(`${countcal.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ',')}`, 68, head2 + 23.1, { align: 'right' });
                // pdf.text(`${responseDataAll[i + 1].accountingRecord.amountDay.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ',')}`, 92, head2 + 23.1, { align: 'right' });

                // //แถวเงินเดือน1.5
                // pdf.text(`${responseDataAll[i + 1].accountingRecord.countOtHour.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ',')}`, 68, head2 + 31.3, { align: 'right' });
                // pdf.text(`${responseDataAll[i + 1].accountingRecord.amountOt.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ',')}`, 92, head2 + 31.3, { align: 'right' });

                // //แถวเงินเดือน2.0
                // const formattedAmountHoliday2_0 = Number((countSpecialDayListWork * responseDataAll[i + 1].specialDayRate) ?? 0);
                // pdf.text(`${countSpecialDayListWork.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ',')}`, 68, head2 + 35.4, { align: 'right' });
                // pdf.text(`${formattedAmountHoliday2_0.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ',')}`, 92, head2 + 35.4, { align: 'right' });

                // //แถวรถ ตน. โทร
                // //  const countSpecialDayWork = responseDataAll[i].countSpecialDay;
                // // const formattedAddTelAmountPositionTravel = Number((responseDataAll[i].tel + responseDataAll[i].amountPosition + responseDataAll[i].travel) ?? 0);
                // const formattedAddTelAmountPositionTravel = Number((+responseDataAll[i + 1].tel || 0) + (+responseDataAll[i + 1].amountPosition || 0) + (+responseDataAll[i + 1].travel || 0));

                // // pdf.text(`${countSpecialDayWork.toFixed(2)}`, 68, 76.8, { align: 'right' });
                // pdf.text(`${formattedAddTelAmountPositionTravel.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ',')}`, 92, head2 + 43.6, { align: 'right' });

                // //แถวนักขัติ
                // const countSpecialDayWork = responseDataAll[i + 1].countSpecialDay;
                // const formattedAmountHoliday = Number((responseDataAll[i + 1].countSpecialDay * responseDataAll[i + 1].specialDayRate) ?? 0);
                // pdf.text(`${countSpecialDayWork.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ',')}`, 68, head2 + 51.8, { align: 'right' });
                // pdf.text(`${formattedAmountHoliday.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ',')}`, 92, head2 + 51.8, { align: 'right' });

                // //บวกอื่นๆ 1
                // pdf.text(`${responseDataAll[i + 1].accountingRecord.addAmountBeforeTax.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ',')}`, 92, head2 + 47.7, { align: 'right' });

                // //เงินเพิ่ม 2 
                // // pdf.text(`${responseDataAll[i + 1].accountingRecord.addAmountAfterTax.toFixed(2)}`, 92, head2 + 55.9, { align: 'right' });
                // //เงินเพิ่มพิเศษ 
                // const formattedSumAddSalaryAfterTax = Number(responseDataAll[i + 1].accountingRecord.sumAddSalaryAfterTax ?? 0).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
                // pdf.text(`${formattedSumAddSalaryAfterTax.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}`, 92, head2 + 55.9, { align: 'right' });
                // //จ่ายป่วย 
                // pdf.text(`0.00`, 92, head2 + 60, { align: 'right' });
                // //โซนหัก
                // //เงินเบิกล่วงหน้า
                // // pdf.text(`${responseDataAll[i + 1].accountingRecord.advancePayment.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ',')}`, 160, head2 + 51.8, { align: 'right' });
                // const advancePayment = parseFloat(responseDataAll[i + 1].accountingRecord.advancePayment || 0).toFixed(2);
                // pdf.text(`${advancePayment.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}`, 160, head2 + 51.8, { align: 'right' });

                // //หักภาษีเงินได้
                // pdf.text(`${responseDataAll[i + 1].accountingRecord.tax.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ',')}`, 160, head2 + 55.9, { align: 'right' });
                // //หักประกันสังคม
                // pdf.text(`${responseDataAll[i + 1].accountingRecord.socialSecurity.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ',')}`, 160, head2 + 60, { align: 'right' });
                // // //ค่าทำเนียมโอน
                // // pdf.text(`${responseDataAll[i + 1].accountingRecord.bank.toFixed(2)}`, 160, head2 + 64.1, { align: 'right' });
                // // pdf.text(`Age: ${ages[i + 1]} `, 7, 176);

                let y = 174; // Initial y position

                textArray.forEach(text => {
                    // Output each element of the textArray at the current y position
                    pdf.text(`${text}`, 8, y);

                    // Increment y position for the next line
                    y += 4.1;
                });

                let y2 = 174; // Initial y position

                countArray.forEach(text => {
                    // Output each element of the textArray at the current y position
                    pdf.text(`${text}`, 68, y2, { align: 'right' });

                    // Increment y position for the next line
                    y2 += 4.1;
                });

                let y3 = 174; // Initial y position

                valueArray.forEach(text => {
                    // Output each element of the textArray at the current y position
                    pdf.text(`${text}`, 92, y3, { align: 'right' });

                    // Increment y position for the next line
                    y3 += 4.1;
                });

                let y4 = 174; // Initial y position

                textDedustArray.forEach(text => {
                    // Output each element of the textArray at the current y position
                    pdf.text(`${text}`, 94, y4);

                    // Increment y position for the next line
                    y4 += 4.1;
                });
                let y5 = 174; // Initial y position

                valueDedustArray.forEach(text => {
                    // Output each element of the textArray at the current y position
                    pdf.text(`${text}`, 160, y5, { align: 'right' });

                    // Increment y position for the next line
                    y5 += 4.1;
                });

                const sumSalary =
                    // responseDataAll[i + 1].accountingRecord.countDay +
                    responseDataAll[i + 1].accountingRecord.amountDay +
                    responseDataAll[i + 1].accountingRecord.amountOt +
                    // Number(formattedAmountHoliday2_0) +
                    Number((countSpecialDayListWork * responseDataAll[i + 1].specialDayRate) ?? 0) +
                    // Number(formattedAmountHoliday) +
                    Number((responseDataAll[i + 1].countSpecialDay * responseDataAll[i + 1].specialDayRate) ?? 0) +
                    // Number(formattedSumAddSalaryAfterTax) +
                    (responseDataAll[i + 1].accountingRecord.sumAddSalaryAfterTax ?? 0) +
                    responseDataAll[i + 1].accountingRecord.addAmountBeforeTax +
                    responseDataAll[i + 1].accountingRecord.addAmountAfterTax;

                // pdf.text(`${sumSalary.toFixed(2)}`, 92, head2 + 71, { align: 'right' });
                pdf.text(`${sumSalary.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ',')}`, 92, head2 + 71, { align: 'right' });


                //รวมเงินหัก
                const sumDeductSalary =
                    responseDataAll[i + 1].accountingRecord.advancePayment +
                    responseDataAll[i + 1].accountingRecord.tax +
                    responseDataAll[i + 1].accountingRecord.socialSecurity +
                    responseDataAll[i + 1].accountingRecord.bank;

                pdf.text(`${sumDeductSalary.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ',')}`, 160, head2 + 71, { align: 'right' });

                // pdf.text(`${(sumSalary - sumDeductSalary).toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ',')}`, 188, head2 + 72, { align: 'right' });
                pdf.text(`${(sumSalary - sumDeductSalary).toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ',')}`, 188, head2 + 72, { align: 'right' });

            }

            // Reset position for the next row
            x = 20;
        }

        // Open the generated PDF in a new tab
        window.open(pdf.output('bloburl'), '_blank');
    };
    return (
        <body class="hold-transition sidebar-mini" className='editlaout'>
            <div class="wrapper">

                <div class="content-wrapper">
                    {/* <!-- Content Header (Page header) --> */}
                    <ol class="breadcrumb">
                        <li class="breadcrumb-item"><i class="fas fa-home"></i> <a href="index.php">หน้าหลัก</a></li>
                        <li class="breadcrumb-item"><a href="#"> สรุปเงินเดือน</a></li>
                        <li class="breadcrumb-item active">ออกสลิปเงินเดือน</li>
                    </ol>
                    <div class="content-header">
                        <div class="container-fluid">
                            <div class="row mb-2">
                                <h1 class="m-0"><i class="far fa-arrow-alt-circle-right"></i> ออกสลิปเงินเดือน</h1>
                            </div>
                        </div>
                    </div>
                    <section class="content">
                        <div class="container-fluid">
                            <h2 class="title">สรุปหน่วยงานทั้งหมด</h2>
                            <section class="Frame">
                                <div class="form-group">
                                    <div class="row">
                                        <div class="col-md-3">
                                            <select
                                                className="form-control"
                                                value={selectedOption}
                                                onChange={handleSelectChange}
                                            >
                                                {/* <option value="">Select Option</option> */}
                                                <option value="option1">แบบหน่วยงาน</option>
                                                <option value="option2">แบบพนักงาน</option>
                                            </select>
                                        </div>
                                    </div>
                                    <br />
                                    {/* Conditionally render content based on the selected option */}
                                    {selectedOption === 'option1' && (
                                        <div>
                                            <h2>แบบหน่วยงาน</h2>
                                            <div class="row">
                                                <div class="col-md-3">
                                                    <label role="searchEmployeeId">รหัสหน่วยงาน</label>
                                                    <input
                                                        type="text"
                                                        className="form-control"
                                                        id="staffId"
                                                        placeholder="รหัสหน่อยงาน"
                                                        value={workplacrId}
                                                        onChange={handleStaffIdChange}
                                                        list="WorkplaceIdList"
                                                    />
                                                    <datalist id="WorkplaceIdList">
                                                        {workplaceListAll.map(workplace => (
                                                            <option key={workplace.workplaceId} value={workplace.workplaceId} />
                                                        ))}
                                                    </datalist>
                                                </div>
                                                <div class="col-md-3">
                                                    <label role="searchname">ชื่อหน่วยงาน</label>
                                                    <input
                                                        type="text"
                                                        className="form-control"
                                                        id="staffName"
                                                        placeholder="ชื่อพนักงาน"
                                                        value={workplacrName}
                                                        onChange={handleStaffNameChange}
                                                        list="WorkplaceNameList"
                                                    />

                                                    <datalist id="WorkplaceNameList">
                                                        {workplaceListAll.map(workplace => (
                                                            <option key={workplace.workplaceId} value={workplace.workplaceName} />
                                                        ))}
                                                    </datalist>
                                                </div>
                                            </div>
                                        </div>
                                    )}

                                    {selectedOption === 'option2' && (
                                        <div>
                                            <h2>แบบพนักงาน</h2>
                                            <div class="row">
                                                <div class="col-md-3">
                                                    <label role="searchEmployeeId">รหัสพนักงาน</label>
                                                    <input
                                                        type="text"
                                                        className="form-control"
                                                        id="staffId"
                                                        placeholder="รหัสพนักงาน"
                                                        value={staffId}
                                                        onChange={handleStaffIdChange2}
                                                        list="staffIdList"
                                                    />
                                                    <datalist id="staffIdList">
                                                        {employeeList.map(employee => (
                                                            <option key={employee.employeeId} value={employee.employeeId} />
                                                        ))}
                                                    </datalist>
                                                </div>
                                                <div class="col-md-3">
                                                    <label role="searchname">ชื่อพนักงาน</label>
                                                    <input
                                                        type="text"
                                                        className="form-control"
                                                        id="staffName"
                                                        placeholder="ชื่อพนักงาน"
                                                        value={staffFullName}
                                                        onChange={handleStaffNameChange2}
                                                        list="staffNameList"
                                                    />
                                                    <datalist id="staffNameList">
                                                        {employeeList.map(employee => (
                                                            <option key={employee.employeeId} value={employee.name + " " + employee.lastName} />
                                                        ))}
                                                    </datalist>
                                                </div>
                                            </div>
                                        </div>
                                    )}
                                    {/* <div class="row">
                                        <div class="col-md-3">
                                            <label role="searchEmployeeId">รหัสหน่อยงาน</label>
                                            <input
                                                type="text"
                                                className="form-control"
                                                id="staffId"
                                                placeholder="รหัสหน่อยงาน"
                                                value={workplacrId}
                                                onChange={handleStaffIdChange}
                                                list="WorkplaceIdList"
                                            />
                                            <datalist id="WorkplaceIdList">
                                                {workplaceListAll.map(workplace => (
                                                    <option key={workplace.workplaceId} value={workplace.workplaceId} />
                                                ))}
                                            </datalist>
                                        </div>
                                        <div class="col-md-3">
                                            <label role="searchname">ชื่อหน่วยงาน</label>
                                            <input
                                                type="text"
                                                className="form-control"
                                                id="staffName"
                                                placeholder="ชื่อพนักงาน"
                                                value={workplacrName}
                                                onChange={handleStaffNameChange}
                                                list="WorkplaceNameList"
                                            />

                                            <datalist id="WorkplaceNameList">
                                                {workplaceListAll.map(workplace => (
                                                    <option key={workplace.workplaceId} value={workplace.workplaceName} />
                                                ))}
                                            </datalist>
                                        </div>
                                    </div> */}
                                    {/* <div class="row">
                                        <div class="col-md-3">
                                            <div class="form-group">
                                                <label role="searchEmployeeId">รหัสพนักงาน</label>
                                                <input
                                                    type="text"
                                                    className="form-control"
                                                    id="staffId"
                                                    placeholder="รหัสพนักงาน"
                                                    value={staffId}
                                                    onChange={handleStaffIdChange2}
                                                    list="staffIdList"
                                                />
                                                <datalist id="staffIdList">
                                                    {employeeList.map(employee => (
                                                        <option key={employee.employeeId} value={employee.employeeId} />
                                                    ))}
                                                </datalist>
                                            </div>
                                        </div>
                                        <div class="col-md-3">
                                            <div class="form-group">
                                                <label role="searchname">ชื่อพนักงาน</label>
                                                <input
                                                    type="text"
                                                    className="form-control"
                                                    id="staffName"
                                                    placeholder="ชื่อพนักงาน"
                                                    value={staffFullName}
                                                    onChange={handleStaffNameChange2}
                                                    list="staffNameList"
                                                />
                                                <datalist id="staffNameList">
                                                    {employeeList.map(employee => (
                                                        <option key={employee.employeeId} value={employee.name + " " + employee.lastName} />
                                                    ))}
                                                </datalist>
                                            </div>
                                        </div>
                                    </div> */}
                                    <div class="row">
                                        <div class="col-md-3">
                                            <label role="agencyname">เดือน</label>
                                            <select className="form-control" value={month} onChange={(e) => setMonth(e.target.value)} >
                                                <option value="01">มกราคม</option>
                                                <option value="02">กุมภาพันธ์</option>
                                                <option value="03">มีนาคม</option>
                                                <option value="04">เมษายน</option>
                                                <option value="05">พฤษภาคม</option>
                                                <option value="06">มิถุนายน</option>
                                                <option value="07">กรกฎาคม</option>
                                                <option value="08">สิงหาคม</option>
                                                <option value="09">กันยายน</option>
                                                <option value="10">ตุลาคม</option>
                                                <option value="11">พฤศจิกายน</option>
                                                <option value="12">ธันวาคม</option>
                                            </select>
                                        </div>

                                        <div class="col-md-3">
                                            <label >ปี</label>

                                            <select className="form-control" value={year} onChange={(e) => setYear(e.target.value)}>
                                                {years.map((y) => (
                                                    <option key={y} value={y}>
                                                        {y + 543}
                                                    </option>
                                                ))}
                                            </select>
                                        </div>
                                    </div>

                                </div>

                                <button onClick={generatePDF} class="btn b_save">
                                    {selectedOption === 'option1' ? 'แบบหน่วยงาน' : selectedOption === 'option2' ? 'แบบพนักงาน' : ''}

                                </button>

                            </section>

                        </div>
                    </section>
                </div>
            </div>
        </body>)
}

export default SalarySlipPDF