import endpoint from '../../config';

import axios from 'axios';
import React, { useEffect, useState } from 'react'; import { jsPDF } from 'jspdf';

import 'jspdf-autotable';

import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

import moment from 'moment';
import 'moment/locale/th'; // Import the Thai locale data
function TestPDFResultSalay() {
    const [workplacrId, setWorkplacrId] = useState(''); //รหัสหน่วยงาน
    const [workplacrName, setWorkplacrName] = useState(''); //รหัสหน่วยงาน

    const [searchWorkplaceId, setSearchWorkplaceId] = useState('');
    const [workplaceListAll, setWorkplaceListAll] = useState([]);
    const [responseDataAll, setResponseDataAll] = useState([]);

    const [month, setMonth] = useState('');
    const [year, setYear] = useState('');
    const EndYear = 2010;
    const currentYear = new Date().getFullYear(); // 2024
    const years = Array.from({ length: currentYear - EndYear + 1 }, (_, index) => EndYear + index).reverse();

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

    console.log('workplaceListAll', workplaceListAll);

    useEffect(() => {
        const fetchData = () => {
            const dataTest = {
                year: year,
                month: month,
            };

            axios.post(endpoint + '/accounting/calsalarylist', dataTest)
                .then(response => {
                    const responseData = response.data;

                    console.log('searchWorkplaceId', searchWorkplaceId);

                    console.log('responseData', responseData);
                    const filteredData = searchWorkplaceId ? responseData.filter(item => item.workplace === searchWorkplaceId) : responseData;

                    setResponseDataAll(filteredData);

                })
                .catch(error => {
                    console.error('Error:', error);
                });
        };

        // Call fetchData when year or month changes
        fetchData();
    }, [year, month, searchWorkplaceId]);
    console.log('responseDataAll', responseDataAll);

    const handleStaffIdChange = (e) => {
        const selectWorkPlaceId = e.target.value;
        setWorkplacrId(selectWorkPlaceId);
        setSearchWorkplaceId(selectWorkPlaceId);
        // Find the corresponding employee and set the staffName
        const selectedWorkplace = workplaceListAll.find(employee => employee.workplaceId == selectWorkPlaceId);
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
        const selectWorkPlaceId = e.target.value;

        // Find the corresponding employee and set the staffId
        const selectedEmployee = workplaceListAll.find(employee => employee.workplaceName == selectWorkPlaceId);
        const selectedEmployeeFName = workplaceListAll.find(employee => employee.workplaceName === selectWorkPlaceId);

        if (selectedEmployee) {
            setWorkplacrId(selectedEmployee.workplaceId);
            setSearchWorkplaceId(selectedEmployee.workplaceId);
            setWorkplacrName(selectedEmployee.workplaceName);

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
            pdf.setFontSize(15);

            pdf.text(`ใบจ่ายเงินเดือน`, 73, 12);

            // pdf.text(`ใบจ่ายเงินเดือน`, 73.05, 12);
            // pdf.text(`ใบจ่ายเงินเดือน`, 72.95, 12);
            // pdf.text(`ใบจ่ายเงินเดือน`, 73, 12.05);
            // pdf.text(`ใบจ่ายเงินเดือน`, 73, 11.95);

            pdf.text(`บริษัท โอวาท โปร แอนด์ คริก จำกัด`, 55, 18);

            pdf.setFontSize(12);

            const head = 25;
            const head2 = 150;

            pdf.text(`รหัส`, 7, head);
            pdf.text(`ชื่อ-สกุล`, 50, head);
            pdf.text(`แผนก`, 110, head);
            pdf.text(`เลขที่บัญชี`, 165, head);

            // Draw a square frame around the first name
            pdf.rect(7, 28, 155, 74);//ตารางหลัก
            pdf.rect(7, 28, 155, 12);//ตารางหลัก หัวตาราง

            pdf.rect(7, 28, 155, 63); //ตารางหลัก ล่าง
            pdf.rect(7, 28, 44, 63);//ตารางหลัก บน ซ้าย ช่อง1 รายได้
            pdf.text(`รายได้`, 24, 34);//ตารางหลัก รายได้
            pdf.text(`Earnings`, 22, 37);//ตารางหลัก Earnings
            //////////////////////// หัวข้อ
            pdf.text(`อัตรา`, 8, 44);//ตารางหลัก 
            pdf.text(`เงินเดือน`, 8, 48.1);//ตารางหลัก Earnings
            pdf.text(`ค่าล่วงเวลา 1 เท่า`, 8, 52.2);//ตารางหลัก 
            pdf.text(`ค่าล่วงเวลา 1.5 เท่า`, 8, 56.3);//ตารางหลัก Earnings
            pdf.text(`ค่าล่วงเวลา 2 เท่า(วันหยุด/นักขัติ)`, 8, 60.4);//ตารางหลัก 
            pdf.text(`ค่าล่วงเวลา 3 เท่า`, 8, 64.5);//ตารางหลัก Earnings
            pdf.text(`วันหยุดนักขัติฤกษ์`, 8, 68.6);//ตารางหลัก 
            pdf.text(`ค่าเดินทาง/ตำแหน่ง/โทรศัพท์`, 8, 72.7);//ตารางหลัก Earnings
            pdf.text(`เบี้ยขยัน`, 8, 76.8);//ตารางหลัก Earnings
            pdf.text(`เงินเพิ่มพิเศษ/ค่าร้อน/หุงข้าว/ค่ากะ`, 8, 80.9);//ตารางหลัก 
            pdf.text(`จ่าย่วย/พักร้อน/ลาคลอด/เลิกจ้าง/อื่นๆ`, 8, 85);//ตารางหลัก Earnings
            // pdf.text(`อัตรา`, 8, 44);//ตารางหลัก 


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
            pdf.text(`คืนเงินเบิกล่วงหน้า`, 94, 76.8);//ตารางหลัก Earnings
            pdf.text(`หักภาษีเงินได้`, 94, 80.9);//ตารางหลัก 
            pdf.text(`หักสมทบประกันสังคม`, 94, 85);//ตารางหลัก Earnings
            pdf.text(`ค่าทำเนียมโอน`, 94, 89.1);//ตารางหลัก Earnings

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


            pdf.rect(7, 119, 155, 12);//ตาราง 3
            pdf.rect(7, 119, 97, 6);//ตาราง 3
            let x2 = 9.7
            for (let b = 0; b < 10; b++) {
                pdf.rect(7, 119, x2, 12);//ตาราง 2 
                x2 += 9.7
            };
            pdf.text(`ลงชื่อพนักงาน`, 125, 130);//ตารางหลัก Earnings

            // เรียงarray 
            pdf.text(` ${responseDataAll[i].employeeId}`, 12, head);
            pdf.text(`${responseDataAll[i].name} ${responseDataAll[i].lastName}`, 60, head);

            //แถวเงินเดือน
            pdf.text(`${responseDataAll[i].accountingRecord.countDay.toFixed(2)}`, 68, 48.1, { align: 'right' });
            pdf.text(`${responseDataAll[i].accountingRecord.amountDay.toFixed(2)}`, 92, 48.1, { align: 'right' });

            //แถวเงินเดือน1.5
            pdf.text(`${responseDataAll[i].accountingRecord.countOtHour.toFixed(2)}`, 68, 56.3, { align: 'right' });
            pdf.text(`${responseDataAll[i].accountingRecord.amountOt.toFixed(2)}`, 92, 56.3, { align: 'right' });

            //เงินเพิ่ม 1 
            pdf.text(`${responseDataAll[i].accountingRecord.addAmountBeforeTax.toFixed(2)}`, 92, 72.7, { align: 'right' });
            //เงินเพิ่ม 2 
            pdf.text(`${responseDataAll[i].accountingRecord.addAmountAfterTax.toFixed(2)}`, 92, 76.8, { align: 'right' });

            //โซนหัก
            //เงินเบิกล่วงหน้า
            pdf.text(`${responseDataAll[i].accountingRecord.advancePayment.toFixed(2)}`, 160, 76.8, { align: 'right' });
            //หักภาษีเงินได้
            pdf.text(`${responseDataAll[i].accountingRecord.tax.toFixed(2)}`, 160, 80.9, { align: 'right' });
            //หักประกันสังคม
            pdf.text(`${responseDataAll[i].accountingRecord.socialSecurity.toFixed(2)}`, 160, 85, { align: 'right' });
            //ค่าทำเนียมโอน
            pdf.text(`${responseDataAll[i].accountingRecord.bank.toFixed(2)}`, 160, 89.1, { align: 'right' });


            //รวมเงินได้
            const sumSalary =
                responseDataAll[i].accountingRecord.countDay +
                responseDataAll[i].accountingRecord.amountDay +
                responseDataAll[i].accountingRecord.amountOt +
                responseDataAll[i].accountingRecord.addAmountBeforeTax +
                responseDataAll[i].accountingRecord.addAmountAfterTax;

            pdf.text(`${sumSalary.toFixed(2)}`, 92, 96, { align: 'right' });

            //รวมเงินหัก
            const sumDeductSalary =
                responseDataAll[i].accountingRecord.advancePayment +
                responseDataAll[i].accountingRecord.tax +
                responseDataAll[i].accountingRecord.socialSecurity +
                responseDataAll[i].accountingRecord.bank;

            pdf.text(`${sumDeductSalary.toFixed(2)}`, 160, 96, { align: 'right' });

            pdf.text(`${(sumSalary - sumDeductSalary).toFixed(2)}`, 188, 98, { align: 'right' });


            // pdf.text(`Age: ${ages[i]}`, x + 10, 60);

            // Move to the next column
            // x += 80;

            // Draw a square frame around the second name if available
            if (i + 1 < responseDataAll.length) {
                pdf.setFontSize(15);

                pdf.text(`ใบจ่ายเงินเดือน`, 73, 137);
                pdf.text(`บริษัท โอวาท โปร แอนด์ คริก จำกัด`, 55, 143);
                pdf.setFontSize(12);

                pdf.text(`รหัส`, 7, head2);
                pdf.text(`ชื่อ-สกุล`, 50, head2);
                pdf.text(`แผนก`, 110, head2);
                pdf.text(`เลขที่บัญชี`, 165, head2);

                // pdf.rect(7, 156, 60, 30);


                pdf.rect(7, head2 + 3, 155, 74);//ตารางหลัก
                pdf.rect(7, head2 + 3, 155, 12);//ตารางหลัก หัวตาราง
                pdf.rect(7, head2 + 3, 155, 63); //ตารางหลัก ล่าง
                pdf.rect(7, head2 + 3, 44, 63);//ตารางหลัก บน ซ้าย ช่อง1 รายได้
                pdf.text(`รายได้`, 24, head2 + 9);//ตารางหลัก รายได้
                pdf.text(`Earnings`, 22, head2 + 12);//ตารางหลัก Earnings

                /////////////////
                //////////////////////// หัวข้อ
                pdf.text(`อัตรา`, 8, head2 + 19);//ตารางหลัก 
                pdf.text(`เงินเดือน`, 8, head2 + 23.1);//ตารางหลัก Earnings
                pdf.text(`ค่าล่วงเวลา 1 เท่า`, 8, head2 + 27.2);//ตารางหลัก 
                pdf.text(`ค่าล่วงเวลา 1.5 เท่า`, 8, head2 + 31.3);//ตารางหลัก Earnings
                pdf.text(`ค่าล่วงเวลา 2 เท่า(วันหยุด/นักขัติ)`, 8, head2 + 35.4);//ตารางหลัก 
                pdf.text(`ค่าล่วงเวลา 3 เท่า`, 8, head2 + 39.5);//ตารางหลัก Earnings
                pdf.text(`วันหยุดนักขัติฤกษ์`, 8, head2 + 43.6);//ตารางหลัก 
                pdf.text(`ค่าเดินทาง/ตำแหน่ง/โทรศัพท์`, 8, head2 + 47.7);//ตารางหลัก Earnings
                pdf.text(`เบี้ยขยัน`, 8, head2 + 51.8);//ตารางหลัก Earnings
                pdf.text(`เงินเพิ่มพิเศษ/ค่าร้อน/หุงข้าว/ค่ากะ`, 8, head2 + 55.9);//ตารางหลัก 
                pdf.text(`จ่าย่วย/พักร้อน/ลาคลอด/เลิกจ้าง/อื่นๆ`, 8, head2 + 60);//ตารางหลัก Earnings

                pdf.rect(7, head2 + 3, 62, 63);//ตารางหลัก บน ซ้าย ช่อง1 จำนวน
                pdf.text(`จำนวน`, 56, head2 + 9);//ตารางหลัก จำนวน
                pdf.text(`Number`, 55, head2 + 12);//ตารางหลัก Number

                pdf.rect(69, head2 + 3, 24, 74);//ตารางหลัก บน ซ้าย ช่อง1 จำนวนเงิน
                pdf.text(`จำนวนเงิน`, 74, head2 + 9);//ตารางหลัก จำนวนเงิน
                pdf.text(`Amount`, 75, head2 + 12);//ตารางหลัก Amount

                pdf.rect(69, head2 + 3, 69, 74);//ตารางหลัก บน ซ้าย ช่อง1 รายการหัก / รายการคืน
                pdf.text(`รายการหัก / รายการคืน`, 102, head2 + 9);//รายการหัก / รายการคืน
                // pdf.text(`Amount`, 75, 38);//ตารางหลัก 

                /////////
                pdf.text(`คืนเงินเบิกล่วงหน้า`, 94, head2 + 51.8);//ตารางหลัก Earnings
                pdf.text(`หักภาษีเงินได้`, 94, head2 + 55.9);//ตารางหลัก 
                pdf.text(`หักสมทบประกันสังคม`, 94, head2 + 60);//ตารางหลัก Earnings
                pdf.text(`ค่าทำเนียมโอน`, 94, head2 + 64.1);//ตารางหลัก Earnings

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

                pdf.rect(7, head2 + 94, 155, 12);//ตาราง 3
                pdf.rect(7, head2 + 94, 97, 6);//ตาราง 3
                let x2 = 9.7
                for (let b = 0; b < 10; b++) {
                    pdf.rect(7, head2 + 94, x2, 12);//ตาราง 2 
                    x2 += 9.7
                };

                pdf.text(`ลงชื่อพนักงาน`, 125, head2 + 105);//ตารางหลัก Earnings

                // เรียงarray 
                // pdf.text(`Name: ${names[i + 1]}`, 7, 166);
                pdf.text(` ${responseDataAll[i].employeeId}`, 12, head2);
                pdf.text(`${responseDataAll[i + 1].name} ${responseDataAll[i + 1].lastName}`, 60, head2);

                //แถวเงินเดือน
                pdf.text(`${responseDataAll[i + 1].accountingRecord.countDay.toFixed(2)}`, 68, head2 + 23.1, { align: 'right' });
                pdf.text(`${responseDataAll[i + 1].accountingRecord.amountDay.toFixed(2)}`, 92, head2 + 23.1, { align: 'right' });

                //แถวเงินเดือน1.5
                pdf.text(`${responseDataAll[i + 1].accountingRecord.countOtHour.toFixed(2)}`, 68, head2 + 31.3, { align: 'right' });
                pdf.text(`${responseDataAll[i + 1].accountingRecord.amountOt.toFixed(2)}`, 92, head2 + 31.3, { align: 'right' });

                //บวกอื่นๆ 1
                pdf.text(`${responseDataAll[i + 1].accountingRecord.addAmountBeforeTax.toFixed(2)}`, 92, head2 + 47.7, { align: 'right' });
                //เงินเพิ่ม 2 
                pdf.text(`${responseDataAll[i + 1].accountingRecord.addAmountAfterTax.toFixed(2)}`, 92, head2 + 51.8, { align: 'right' });

                //โซนหัก
                //เงินเบิกล่วงหน้า
                pdf.text(`${responseDataAll[i + 1].accountingRecord.advancePayment.toFixed(2)}`, 160, head2 + 51.8, { align: 'right' });
                //หักภาษีเงินได้
                pdf.text(`${responseDataAll[i + 1].accountingRecord.tax.toFixed(2)}`, 160, head2 + 55.9, { align: 'right' });
                //หักประกันสังคม
                pdf.text(`${responseDataAll[i + 1].accountingRecord.socialSecurity.toFixed(2)}`, 160, head2 + 60, { align: 'right' });
                //ค่าทำเนียมโอน
                pdf.text(`${responseDataAll[i + 1].accountingRecord.bank.toFixed(2)}`, 160, head2 + 64.1, { align: 'right' });
                // pdf.text(`Age: ${ages[i + 1]} `, 7, 176);


                const sumSalary =
                    responseDataAll[i + 1].accountingRecord.countDay +
                    responseDataAll[i + 1].accountingRecord.amountDay +
                    responseDataAll[i + 1].accountingRecord.amountOt +
                    responseDataAll[i + 1].accountingRecord.addAmountBeforeTax +
                    responseDataAll[i + 1].accountingRecord.addAmountAfterTax;

                pdf.text(`${sumSalary.toFixed(2)}`, 92, head2 + 71, { align: 'right' });

                //รวมเงินหัก
                const sumDeductSalary =
                    responseDataAll[i + 1].accountingRecord.advancePayment +
                    responseDataAll[i + 1].accountingRecord.tax +
                    responseDataAll[i + 1].accountingRecord.socialSecurity +
                    responseDataAll[i + 1].accountingRecord.bank;

                pdf.text(`${sumDeductSalary.toFixed(2)}`, 160, head2 + 71, { align: 'right' });

                pdf.text(`${(sumSalary - sumDeductSalary).toFixed(2)}`, 188, head2 + 72, { align: 'right' });

            }

            // Reset position for the next row
            x = 20;
        }

        // Open the generated PDF in a new tab
        window.open(pdf.output('bloburl'), '_blank');
    };
    return (
        <div>
            <div class="form-group">
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
                <label >ปี</label>
                <select className="form-control" value={year} onChange={(e) => setYear(e.target.value)}>
                    {years.map((y) => (
                        <option key={y} value={y}>
                            {y}
                        </option>
                    ))}
                </select>
                <label role="searchEmployeeId">รหัสหน่อยงาน</label>
                {/* <input type="text" class="form-control" id="searchEmployeeId" placeholder="รหัสพนักงาน" value={searchEmployeeId} onChange={(e) => setSearchWorkplaceId(e.target.value)} /> */}
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
                <label role="searchname">ชื่อหน่วยงาน</label>
                {/* <input type="text" class="form-control" id="searchname" placeholder="ชื่อพนักงาน" value={searchEmployeeName} onChange={(e) => setSearchEmployeeName(e.target.value)} /> */}
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
            <button onClick={generatePDF}>Generate PDF</button>

        </div>
    )
}

export default TestPDFResultSalay