
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import EmployeesSelected from './EmployeesSelected';

function OtherExpenses() {
    const [id, setId] = useState('');
    const [name, setName] = useState('');
    const [agency, setAgency] = useState(0);
    //////////////////////////////////
    const [number1, setNumber1] = useState('');
    const [number2, setNumber2] = useState('');
    const [sum, setSum] = useState(0);

    const handleNumber1Change = (event) => {
        const value = Number(event.target.value);
        setNumber1(value);
        calculateSum(value, number2);
    };

    const handleNumber2Change = (event) => {
        const value = Number(event.target.value);
        setNumber2(value);
        calculateSum(number1, value);
    };

    const calculateSum = (num1, num2) => {
        const result = num1 * num2;
        setSum(result);
    };
    ////////////////////////////////////
    const [input1, setInput1] = useState('');
    const [input2, setInput2] = useState('');
    const [input3, setInput3] = useState('');
    const [anything, setAnything] = useState('');
    const [sum2, setSum2] = useState(0);


    const handleInputChange1 = (event) => {
        setInput1(Number(event.target.value));
        calculateSum2(Number(event.target.value), input2, input3);
    };

    const handleInputChange2 = (event) => {
        setInput2(Number(event.target.value));
        calculateSum2(input1, Number(event.target.value), input3);
    };

    const handleInputChange3 = (event) => {
        setInput3(Number(event.target.value));
        calculateSum2(input1, input2, Number(event.target.value));
    };

    const calculateSum2 = (num11, num22, num33) => {
        const result2 = num11 + num22 + num33;
        setSum2(result2);
    };
    ////////////////////////////////////
    const [crimeinvestigation, setCrimeinvestigation] = useState(0);
    // const [inputValue, setInputValue] = useState('');

    const handleInputCrimeChange = (event) => {
        setCrimeinvestigation(event.target.value);
    };
    ////////////////////////////////////
    const [shirt, setShirt] = useState(0);
    const [shirtcount, setShirtcount] = useState(0);
    const [trousers, setTrousers] = useState(0);
    const [trouserscount, setTrouserscount] = useState(0);
    const [wholeset, setWholeset] = useState(0);
    const [wholesetcount, setWholesetcount] = useState(0);
    const [saveftyShoes, setSaveftyShoes] = useState(0);
    const [saveftyShoescount, setSaveftyShoescount] = useState(0);
    const [apron, setApron] = useState(0);
    const [aproncount, setAproncount] = useState(0);
    const [hat, setHat] = useState(0);
    const [hatcount, setHatcount] = useState(0);
    const [custom, setcustom] = useState(0);

    const handlesetShirt = (event) => {
        const newShirt = Number(event.target.value);
        setShirt(newShirt);
        setcustom((prevCustom) =>
            calculateCostume(newShirt, shirtcount, trousers, trouserscount, wholeset, wholesetcount, saveftyShoes, saveftyShoescount, apron, aproncount, hat, hatcount)
        );
    };

    const handlesetShirtcount = (event) => {
        const newShirtcount = Number(event.target.value);
        setShirtcount(newShirtcount);
        setcustom((prevCustom) =>
            calculateCostume(shirt, newShirtcount, trousers, trouserscount, wholeset, wholesetcount, saveftyShoes, saveftyShoescount, apron, aproncount, hat, hatcount)
        );
    };

    const handlesetTrousers = (event) => {
        const newTrousers = Number(event.target.value);
        setTrousers(newTrousers);
        setcustom((prevCustom) =>
            calculateCostume(shirt, shirtcount, newTrousers, trouserscount, wholeset, wholesetcount, saveftyShoes, saveftyShoescount, apron, aproncount, hat, hatcount)
        );
    };

    const handlesetTrouserscount = (event) => {
        const newTrouserscount = Number(event.target.value);
        setTrouserscount(newTrouserscount);
        setcustom((prevCustom) =>
            calculateCostume(shirt, shirtcount, trousers, newTrouserscount, wholeset, wholesetcount, saveftyShoes, saveftyShoescount, apron, aproncount, hat, hatcount)
        );
    };

    const handlesetWholeset = (event) => {
        const newWholeset = Number(event.target.value);
        setWholeset(newWholeset);
        setcustom((prevCustom) =>
            calculateCostume(shirt, shirtcount, trousers, trouserscount, newWholeset, wholesetcount, saveftyShoes, saveftyShoescount, apron, aproncount, hat, hatcount)
        );
    };

    const handlesetWholesetcount = (event) => {
        const newWholesetcount = Number(event.target.value);
        setWholesetcount(newWholesetcount);
        setcustom((prevCustom) =>
            calculateCostume(shirt, shirtcount, trousers, trouserscount, wholeset, newWholesetcount, saveftyShoes, saveftyShoescount, apron, aproncount, hat, hatcount)
        );
    };
    const handlesetSaveftyShoes = (event) => {
        const newSaveftyShoes = Number(event.target.value);
        setSaveftyShoes(newSaveftyShoes);
        setcustom((prevCustom) =>
            calculateCostume(shirt, shirtcount, trousers, trouserscount, wholeset, wholesetcount, newSaveftyShoes, saveftyShoescount, apron, aproncount, hat, hatcount)
        );
    };

    const handlesetSaveftyShoescount = (event) => {
        const newSaveftyShoescount = Number(event.target.value);
        setSaveftyShoescount(newSaveftyShoescount);
        setcustom((prevCustom) =>
            calculateCostume(shirt, shirtcount, trousers, trouserscount, wholeset, wholesetcount, saveftyShoes, newSaveftyShoescount, apron, aproncount, hat, hatcount)
        );
    };

    const handlesetApron = (event) => {
        const newApron = Number(event.target.value);
        setApron(newApron);
        setcustom((prevCustom) =>
            calculateCostume(shirt, shirtcount, trousers, trouserscount, wholeset, wholesetcount, saveftyShoes, saveftyShoescount, newApron, aproncount, hat, hatcount)
        );
    };

    const handlesetAproncount = (event) => {
        const newAproncount = Number(event.target.value);
        setAproncount(newAproncount);
        setcustom((prevCustom) =>
            calculateCostume(shirt, shirtcount, trousers, trouserscount, wholeset, wholesetcount, saveftyShoes, saveftyShoescount, apron, newAproncount, hat, hatcount)
        );
    };

    const handlesetHat = (event) => {
        const newHat = Number(event.target.value);
        setHat(newHat);
        setcustom((prevCustom) =>
            calculateCostume(shirt, shirtcount, trousers, trouserscount, wholeset, wholesetcount, saveftyShoes, saveftyShoescount, apron, aproncount, newHat, hatcount)
        );
    };

    const handlesetHatcount = (event) => {
        const newHatcount = Number(event.target.value);
        setHatcount(newHatcount);
        setcustom((prevCustom) =>
            calculateCostume(shirt, shirtcount, trousers, trouserscount, wholeset, wholesetcount, saveftyShoes, saveftyShoescount, apron, aproncount, hat, newHatcount)
        );
    };

    const calculateCostume = (shirt, shirtcount, trousers, trouserscount, wholeset, wholesetcount, saveftyShoes, saveftyShoescount, apron, aproncount, hat, hatcount) => {
        return (
            shirt * shirtcount +
            trousers * trouserscount +
            wholeset * wholesetcount +
            saveftyShoes * saveftyShoescount +
            apron * aproncount +
            hat * hatcount
        );
    };
    /////////////////////////////////////////////
    const [admoney1, setAdmoney1] = useState('');
    const [admoney2, setAdmoney2] = useState('');
    const [admoney3, setAdmoney3] = useState('');

    const [commentadmoney1, setCommentAdmoney1] = useState('');
    const [commentadmoney2, setCommentAdmoney2] = useState('');
    const [commentadmoney3, setCommentAdmoney3] = useState('');

    const [sumadmoney, setSumAdmoney] = useState(0);
    const handleAdmoney1 = (event) => {
        setAdmoney1(Number(event.target.value));
        calculateSumAdmoney(Number(event.target.value), admoney2, admoney3);
    };

    const handleAdmoney2 = (event) => {
        setAdmoney2(Number(event.target.value));
        calculateSumAdmoney(admoney1, Number(event.target.value), admoney3);
    };

    const handleAdmoney3 = (event) => {
        setAdmoney3(Number(event.target.value));
        calculateSumAdmoney(admoney1, admoney2, Number(event.target.value));
    };

    const calculateSumAdmoney = (num11, num22, num33) => {
        const resultAdmoney = num11 + num22 + num33;
        setSumAdmoney(resultAdmoney);
    };
    //////////////////////////////////////////////
    const [sumall, setSumAll] = useState(0);
    const [sumall2, setSumAll2] = useState(0);
    const [divide, setDivide] = useState(0);
    const [divideall, setDivideAll] = useState(0);
    useEffect(() => {
        const sumall = Number(sum) + Number(sum2) + Number(crimeinvestigation) + Number(custom);
        setSumAll(sumall);
    }, [sum, sum2, crimeinvestigation, custom]);

    useEffect(() => {
        const sumall2 = Number(sum) + Number(sum2) + Number(crimeinvestigation) + Number(custom) + Number(sumadmoney);
        setSumAll2(sumall2);
    }, [sum, sum2, crimeinvestigation, custom, sumadmoney]);

    useEffect(() => {
        const divideAllValue = sumall2 / divide;
        setDivideAll(divideAllValue);
    }, [sumall, divide]);
    return (
        <body class="hold-transition sidebar-mini">
            <div class="wrapper">
                <div class="content-wrapper">
                    {/* <!-- Content Header (Page header) --> */}
                    <ol class="breadcrumb">
                        <li class="breadcrumb-item"><i class="fas fa-home"></i> <a href="index.php">หน้าหลัก</a></li>
                        <li class="breadcrumb-item"><a href="#"> ระบบบริหารจัดการข้อมูล</a></li>
                        <li class="breadcrumb-item active">ค่าใช้จ่ายอื่นๆ</li>
                    </ol>
                    <div class="content-header">
                        <div class="container-fluid">
                            <div class="row mb-2">
                                <h1 class="m-0"><i class="far fa-arrow-alt-circle-right"></i> ค่าใช้จ่ายอื่นๆ</h1>
                            </div>
                        </div>
                    </div>
                    {/* <!-- /.content-header -->
                    <!-- Main content --> */}
                    <section class="content">
                        <div class="container-fluid">
                            <form action="">
                                <h2 class="title">ข้อมูลพนักงาน</h2>
                                <div class="row">
                                    <div class="col-md-9">
                                        <section class="Frame">
                                            <div class="row">
                                                <div class="col-md-4">
                                                    <div class="form-group row">
                                                        <div class="col-md-2 col-form-label"><span class="txt-w">รหัส </span></div>
                                                        <div class="col-md-10">
                                                            <input type="text" class="form-control" id="id" placeholder="รหัส" value={id} onChange={(e) => setId(e.target.value)} />
                                                            {/* <input type="number" pattern="[0-9]*" value={number2} onChange={handleNumber2Change} /> */}
                                                        </div>
                                                    </div>
                                                </div>
                                                <div class="col-md-4">
                                                    <div class="form-group row">
                                                        <div class="col-md-2 col-form-label"><span class="txt-w">ชื่อ </span></div>
                                                        <div class="col-md-10">
                                                            <input type="text" class="form-control" id="name" placeholder="ชื่อ" value={name} onChange={(e) => setName(e.target.value)} />
                                                            {/* <input type="number" pattern="[0-9]*" value={number2} onChange={handleNumber2Change} /> */}
                                                        </div>
                                                    </div>
                                                </div>
                                                <div class="col-md-4">
                                                    <div class="form-group row">
                                                        <div class="col-md-2 col-form-label"><span class="txt-w">หน่วยงาน </span></div>
                                                        <div class="col-md-10">
                                                            <input type="text" class="form-control" id="agency" placeholder="หน่วยงาน" value={agency} onChange={(e) => setAgency(e.target.value)} />
                                                            {/* <input type="number" pattern="[0-9]*" value={number2} onChange={handleNumber2Change} /> */}
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </section>
                                        {/* <!--Frame--> */}
                                    </div>
                                    <div class="col-md-3">
                                        <section class="Frame"><EmployeesSelected /></section>
                                    </div>
                                </div>
                                <h2 class="title">บัตรพนักงาน</h2>
                                <div class="row">
                                    <div class="col-md-9">
                                        <section class="Frame">
                                            <div class="row">
                                                <div class="col-md-6">
                                                    <div class="form-group row">
                                                        <div class="col-md-4 col-form-label"><span class="txt-w">ทำบัตรใหม่ </span><span class="txt-label">อันละ</span></div>
                                                        <div class="col-md-4">
                                                            <input type="number" class="form-control" pattern="[0-9]*" value={number1} onChange={handleNumber1Change} />
                                                        </div>
                                                        <label class="col-md-1 col-form-label">บาท</label>
                                                    </div>
                                                </div>
                                                <div class="col-md-6">
                                                    <div class="row">
                                                        <label class="col-md-2 col-form-label">จำนวน</label>
                                                        <div class="col-md-3">
                                                            <input type="number" class="form-control" pattern="[0-9]*" value={number2} onChange={handleNumber2Change} />
                                                        </div>
                                                        <label class="col-md-1 col-form-label">อัน</label>
                                                    </div>
                                                </div>
                                            </div>
                                        </section>
                                        {/* <!--Frame--> */}
                                    </div>
                                </div>
                                <h2 class="title">สุขภาพ</h2>
                                <div class="row">
                                    <div class="col-md-9">
                                        <section class="Frame">
                                            <div class="row form-group">
                                                <label class="col-md-4 col-form-label">ตรวจสุขภาพก่อนเริ่มงาน</label>
                                                <div class="col-md-2">
                                                    <input type="text" class="form-control" value={input1} onChange={handleInputChange1} />
                                                </div>
                                                <label class="col-md-1 col-form-label">บาท</label>
                                            </div>
                                            <div class="row form-group">
                                                <label class="col-md-4 col-form-label">ตรวจสุขภาพประจำปี</label>
                                                <div class="col-md-2">
                                                    <input type="text" class="form-control" value={input2} onChange={handleInputChange2} />
                                                </div>
                                                <label class="col-md-1 col-form-label">บาท</label>
                                            </div>
                                            <div class="row form-group">
                                                <label class="col-md-2 col-form-label">อื่นๆ</label>
                                                <div class="col-md-2">
                                                    <input type="text" class="form-control" id="salaryadd1v" placeholder="อื่นๆ" value={anything} onChange={(e) => setAnything(e.target.value)} />

                                                </div>
                                                <div class="col-md-2">
                                                    <input type="text" class="form-control" value={input3} onChange={handleInputChange3} />
                                                </div>
                                                <label class="col-md-1 col-form-label">บาท</label>
                                            </div>
                                        </section>
                                        {/* <!--Frame--> */}
                                    </div>
                                </div>
                                <h2 class="title">ค่าตรวจสอบอาชญากรรม</h2>
                                <div class="row">
                                    <div class="col-md-9">
                                        <section class="Frame">
                                            <div class="row form-group">
                                                <label class="col-md-2 col-form-label">รวมเป็นเงิน</label>
                                                <div class="col-md-3">
                                                    <input type="" class="form-control" id="" placeholder="00.00" value={crimeinvestigation} onChange={handleInputCrimeChange} />
                                                </div>
                                                <div class="col-md-1 col-form-label">บาท</div>
                                            </div>
                                        </section>
                                    </div>
                                </div>
                                <h2 class="title">เครื่องแต่งกาย</h2>
                                <div class="row">
                                    <div class="col-md-9">
                                        <section class="Frame">
                                            <div class="row">
                                                <div class="col-md-6">
                                                    <div class="form-group row">
                                                        <div class="col-md-5 col-form-label"><span class="txt-w">เสื้อ </span><span class="txt-label">ตัวละ</span></div>
                                                        <div class="col-md-4">
                                                            <input type="" class="form-control" id="" placeholder="00.00" value={shirt} onChange={handlesetShirt} />
                                                        </div>
                                                        <label class="col-md-1 col-form-label">บาท</label>
                                                    </div>
                                                </div>
                                                <div class="col-md-6">
                                                    <div class="row">
                                                        <label class="col-md-2 col-form-label">จำนวน</label>
                                                        <div class="col-md-3">
                                                            <input type="" class="form-control" id="" placeholder="00.00" value={shirtcount} onChange={handlesetShirtcount} />
                                                        </div>
                                                        <label class="col-md-1 col-form-label">ตัว</label>
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="row">
                                                <div class="col-md-6">
                                                    <div class="form-group row">
                                                        <div class="col-md-5 col-form-label"><span class="txt-w">กางเกง </span><span class="txt-label">ตัวละ</span></div>
                                                        <div class="col-md-4">
                                                            <input type="" class="form-control" id="" placeholder="00.00" value={trousers} onChange={handlesetTrousers} />
                                                        </div>
                                                        <label class="col-md-1 col-form-label">บาท</label>
                                                    </div>
                                                </div>
                                                <div class="col-md-6">
                                                    <div class="row">
                                                        <label class="col-md-2 col-form-label">จำนวน</label>
                                                        <div class="col-md-3">
                                                            <input type="" class="form-control" id="" placeholder="00.00" value={trouserscount} onChange={handlesetTrouserscount} />
                                                        </div>
                                                        <label class="col-md-1 col-form-label">ตัว</label>
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="row">
                                                <div class="col-md-6">
                                                    <div class="form-group row">
                                                        <div class="col-md-5 col-form-label"><span class="txt-w">ทั้งชุด </span><span class="txt-label">ชุดละ</span></div>
                                                        <div class="col-md-4">
                                                            <input type="" class="form-control" id="" placeholder="00.00" value={wholeset} onChange={handlesetWholeset} />
                                                        </div>
                                                        <label class="col-md-1 col-form-label">บาท</label>
                                                    </div>
                                                </div>
                                                <div class="col-md-6">
                                                    <div class="row">
                                                        <label class="col-md-2 col-form-label">จำนวน</label>
                                                        <div class="col-md-3">
                                                            <input type="" class="form-control" id="" placeholder="00.00" value={wholesetcount} onChange={handlesetWholesetcount} />
                                                        </div>
                                                        <label class="col-md-1 col-form-label">ชุด</label>
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="row">
                                                <div class="col-md-6">
                                                    <div class="form-group row">
                                                        <div class="col-md-5 col-form-label"><span class="txt-w">รองเท้า Savefty </span><span class="txt-label">คู่ละ</span></div>
                                                        <div class="col-md-4">
                                                            <input type="" class="form-control" id="" placeholder="00.00" value={saveftyShoes} onChange={handlesetSaveftyShoes} />
                                                        </div>
                                                        <label class="col-md-1 col-form-label">บาท</label>
                                                    </div>
                                                </div>
                                                <div class="col-md-6">
                                                    <div class="row">
                                                        <label class="col-md-2 col-form-label">จำนวน</label>
                                                        <div class="col-md-3">
                                                            <input type="" class="form-control" id="" placeholder="00.00" value={saveftyShoescount} onChange={handlesetSaveftyShoescount} />
                                                        </div>
                                                        <label class="col-md-1 col-form-label">คู่</label>
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="row">
                                                <div class="col-md-6">
                                                    <div class="form-group row">
                                                        <div class="col-md-5 col-form-label"><span class="txt-w">ผ้ากันเปื้อน </span><span class="txt-label">ชุดละ</span></div>
                                                        <div class="col-md-4">
                                                            <input type="" class="form-control" id="" placeholder="00.00" value={apron} onChange={handlesetApron} />
                                                        </div>
                                                        <label class="col-md-1 col-form-label">บาท</label>
                                                    </div>
                                                </div>
                                                <div class="col-md-6">
                                                    <div class="row">
                                                        <label class="col-md-2 col-form-label">จำนวน</label>
                                                        <div class="col-md-3">
                                                            <input type="" class="form-control" id="" placeholder="00.00" value={aproncount} onChange={handlesetAproncount} />
                                                        </div>
                                                        <label class="col-md-1 col-form-label">ชุด</label>
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="row">
                                                <div class="col-md-6">
                                                    <div class="form-group row">
                                                        <div class="col-md-5 col-form-label"><span class="txt-w">หมวก </span><span class="txt-label">ใบละ</span></div>
                                                        <div class="col-md-4">
                                                            <input type="" class="form-control" id="" placeholder="00.00" value={hat} onChange={handlesetHat} />
                                                        </div>
                                                        <label class="col-md-1 col-form-label">บาท</label>
                                                    </div>
                                                </div>
                                                <div class="col-md-6">
                                                    <div class="row">
                                                        <label class="col-md-2 col-form-label">จำนวน</label>
                                                        <div class="col-md-3">
                                                            <input type="" class="form-control" id="" placeholder="00.00" value={hatcount} onChange={handlesetHatcount} />
                                                        </div>
                                                        <label class="col-md-1 col-form-label">ใบ
                                                        </label>
                                                    </div>
                                                </div>
                                            </div>
                                        </section>
                                        {/* <!--Frame--> */}
                                    </div>
                                </div>
                                <h2 class="title">เงินเบิกล่วงหน้า</h2>
                                <div class="row">
                                    <div class="col-md-9">
                                        <section class="Frame">
                                            <div class="row">
                                                <div class="col-md-6">
                                                    <div class="form-group row">
                                                        <div class="col-md-3 col-form-label">รายการที่ 1</div>
                                                        <div class="col-md-8">
                                                            <input type="text" class="form-control" id="commentadmoney1" placeholder="อื่นๆ" value={commentadmoney1} onChange={(e) => setCommentAdmoney1(e.target.value)} />

                                                        </div>
                                                    </div>
                                                </div>
                                                <div class="col-md-6">
                                                    <div class="row">
                                                        <label class="col-md-3 col-form-label">เป็นจำนวนเงิน</label>
                                                        <div class="col-md-4">
                                                            <input type="" class="form-control" placeholder="00.00" value={admoney1} onChange={handleAdmoney1} />
                                                        </div>
                                                        <label class="col-md-1 col-form-label">บาท</label>
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="row">
                                                <div class="col-md-6">
                                                    <div class="form-group row">
                                                        <div class="col-md-3 col-form-label">รายการที่ 2</div>
                                                        <div class="col-md-8">
                                                            <input type="text" class="form-control" id="commentadmoney2" placeholder="รายการที่ 2" value={commentadmoney2} onChange={(e) => setCommentAdmoney2(e.target.value)} />
                                                        </div>
                                                    </div>
                                                </div>
                                                <div class="col-md-6">
                                                    <div class="row">
                                                        <label class="col-md-3 col-form-label">เป็นจำนวนเงิน</label>
                                                        <div class="col-md-4">
                                                            <input type="" class="form-control" placeholder="00.00" value={admoney2} onChange={handleAdmoney2} />
                                                        </div>
                                                        <label class="col-md-1 col-form-label">บาท</label>
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="row">
                                                <div class="col-md-6">
                                                    <div class="form-group row">
                                                        <div class="col-md-3 col-form-label">รายการที่ 3</div>
                                                        <div class="col-md-8">
                                                            <input type="text" class="form-control" id="commentadmoney3" placeholder="รายการที่ 3" value={commentadmoney3} onChange={(e) => setCommentAdmoney3(e.target.value)} />
                                                        </div>
                                                    </div>
                                                </div>
                                                <div class="col-md-6">
                                                    <div class="row">
                                                        <label class="col-md-3 col-form-label">เป็นจำนวนเงิน</label>
                                                        <div class="col-md-4">
                                                            <input type="" class="form-control" placeholder="00.00" value={admoney3} onChange={handleAdmoney3} />
                                                        </div>
                                                        <label class="col-md-1 col-form-label">บาท</label>
                                                    </div>
                                                </div>
                                            </div>
                                        </section>
                                        {/* <!--Frame--> */}
                                    </div>
                                </div>
                                <h2 class="title">การชำระ</h2>
                                <div class="row">
                                    <div class="col-md-9">
                                        <section class="Frame">
                                            <div class="row form-group">
                                                <label class="col-md-3 col-form-label">ค่าบัตรพนักงานรวมเป็นเงิน</label>
                                                <div class="col-md-3">
                                                    <input type="" class="form-control" id="" placeholder="00.00" value={sum} readOnly />
                                                </div>
                                                <div class="col-md-1 col-form-label">บาท</div>
                                            </div>
                                            <div class="row form-group">
                                                <label class="col-md-3 col-form-label">ค่าตรวจสุขภาพรวมเป็นเงิน</label>
                                                <div class="col-md-3">
                                                    <input type="" class="form-control" id="" placeholder="00.00" value={sum2} readOnly />
                                                </div>
                                                <div class="col-md-1 col-form-label">บาท</div>
                                            </div>
                                            <div class="row form-group">
                                                <label class="col-md-3 col-form-label">ค่าตรวจสอบอาชญากรรมรวมเป็นเงิน</label>
                                                <div class="col-md-3">
                                                    <input type="" class="form-control" id="" placeholder="00.00" value={crimeinvestigation} readOnly />
                                                </div>
                                                <div class="col-md-1 col-form-label">บาท</div>
                                            </div>
                                            <div class="row form-group">
                                                <label class="col-md-3 col-form-label">ค่าเครื่องแต่งกายรวมเป็นเงิน</label>
                                                <div class="col-md-3">
                                                    <input type="" class="form-control" id="" placeholder="00.00" value={custom} readOnly />
                                                </div>
                                                <div class="col-md-1 col-form-label">บาท</div>
                                            </div>
                                            <div class="row form-group">
                                                <label class="col-md-3 col-form-label">รวมเป็นเงินทั้งหมด</label>
                                                <div class="col-md-3">
                                                    <input type="" class="form-control" id="" placeholder="00.00" value={sumall} readOnly />
                                                </div>
                                                <div class="col-md-1 col-form-label">บาท</div>
                                            </div>
                                            <div class="row form-group">
                                                <label class="col-md-3 col-form-label">จำนวนเงินเบิก</label>
                                                <div class="col-md-3">
                                                    <input type="" class="form-control" id="" placeholder="00.00" value={sumadmoney} readOnly />
                                                </div>
                                                <div class="col-md-1 col-form-label">บาท</div>
                                            </div>
                                            <div class="row form-group">
                                                <label class="col-md-3 col-form-label">เป็นเงินทั้งสิทธิ</label>
                                                <div class="col-md-3">
                                                    <input type="" class="form-control" id="" placeholder="00.00" value={sumall2} readOnly />
                                                </div>
                                                <div class="col-md-1 col-form-label">บาท</div>
                                            </div>
                                            <div class="row form-group">
                                                <input type="radio" class="form-check-input" style={{ marginLeft: "8px" }} id="radio1" name="optradio" value="option1" checked />
                                                <label class="form-check-label col-md-3 col" style={{ paddingLeft: "30px" }} for="radio1">จ่ายจำนวนเต็ม</label>
                                                <div class="col-md-3">
                                                    <input type="" class="form-control" id="" placeholder="00.00" value={sumall2} readOnly />
                                                </div>
                                                <div class="col-md-1 col-form-label">บาท</div>
                                            </div>
                                            <div class="row form-group">
                                                <input type="radio" class="form-check-input" style={{ marginLeft: "8px" }} id="radio1" name="optradio" value="option1" checked />
                                                <label class="form-check-label col-md-3 col" style={{ paddingLeft: "30px" }} for="radio1">หักเป็นจำนวน</label>
                                                <div class="col-md-3">
                                                    <input type="" class="form-control" placeholder="00.00" value={divide} onChange={(event) => setDivide(Number(event.target.value))} />
                                                </div>
                                                <div class="col-md-1 col-form-label">ครั้ง</div>
                                                <label class="form-check-label col-md-2 col" style={{ paddingLeft: "30px" }} for="radio1">เป็นจำนวนครั้งละ</label>
                                                <div class="col-md-2">
                                                    <input type="" class="form-control" placeholder="00.00" value={divideall} />
                                                </div>
                                                <div class="col-md-1 col-form-label">บาท</div>
                                            </div>
                                        </section>
                                        {/* <!--Frame--> */}
                                    </div>
                                </div>
                                <div class="line_btn">
                                    <button type="submit" class="btn b_save"><i class="nav-icon fas fa-save"></i> &nbsp;บันทึก</button>
                                    <button type="reset" class="btn clean"><i class="far fa-window-close"></i> &nbsp;ยกเลิก</button>
                                </div>
                            </form>
                        </div>
                        {/* <!-- /.container-fluid --> */}
                    </section>
                    {/* <!-- /.content --> */}
                </div>
            </div>
        </body>

    )
}

export default OtherExpenses