import React from "react";
import { useState } from 'react';
// import Posts from "./Post";
// import Home from "./Home";
// import Profile from './Profile';

import LoginForm from './conponents/Login';

import AsideLeft from "./conponents/AsideLeft";
import Top from "./conponents/Top";

import Dashboard from "./conponents/componentsAside/Dashboard";
import Search from "./conponents/componentsAside/Search";
import Employee from "./conponents/componentsAside/Employee";
import EmployeesSelected from "./conponents/componentsAside/EmployeesSelected";

import Salary from "./conponents/componentsAside/Salary";
// import Salary from "./conponents/Salary";

import IncomeTax from "./conponents/componentsAside/IncomeTax";
import SocialSecurity from "./conponents/componentsAside/SocialSecurity";
import ProvidentFund from "./conponents/componentsAside/ProvidentFund";
import Collateral from "./conponents/componentsAside/Collateral";
import Document from "./conponents/componentsAside/Document";


import CalculateTax from "./conponents/componentsAside/CalculateTax";
import CalculateTaxDeductions from "./conponents/componentsAside/CalculateTaxDeductions";
import OtherExpenses from "./conponents/componentsAside/OtherExpenses";
import SearchResults from "./conponents/componentsAside/SearchResults";

import Application from "./conponents/componentsAside/Application";
import Application1 from "./conponents/componentsAside/Application1";
import Application2 from "./conponents/componentsAside/Application2";
import Application3 from "./conponents/componentsAside/Application3";
import Application4 from "./conponents/componentsAside/Application4";
import ApplicationSummary from "./conponents/componentsAside/ApplicationSummary";
import AddEditEmployee from "./conponents/componentsAside/AddEditEmployee";
import AddEditSalaryEmployee from "./conponents/componentsAside/AddEditSalaryEmployee";

import Setting from "./conponents/componentsAside/Setting";
import SystemUser from "./conponents/componentsAside/SystemUser";
import Addsettime from "./conponents/componentsAside/Addsettime";

import Salarysummary from "./conponents/componentsAside/Salarysummary";
import Worktimesheet from "./conponents/componentsAside/Worktimesheet";

import TestPDF from "./conponents/componentsAside/TestPDF";
import SendEmployeePDF from "./conponents/componentsAside/sendEmployeePDF";
import Testapp from "./conponents/componentsAside/Test";

// import Time from "./conponents/Time";
import Testcal from "./conponents/Testcal";
import Countday from "./conponents/Countday";
import TestShowManyData from "./conponents/componentsAside/TestShowManyData";

import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
// import Login from "./conponents/Login";
// import Registration from "./conponents/Registration";
// import Testcal from "./conponents/Testcal";

// import MyComponent from "./server/MyComponent";



function App() {
  const [selectedEmployees, setSelectedEmployees] = useState([]);

  function handleEmployeeSelect(employee) {
    setSelectedEmployees(prevSelectedEmployees => [...prevSelectedEmployees, employee]);
  }

  function handleEmployeeRemove(employeeId) {
    setSelectedEmployees(prevSelectedEmployees =>
      prevSelectedEmployees.filter(employee => employee.id !== employeeId)
    );
  }

  //const [loggedIn, setLoggedIn] = useState(false);

  const [loggedIn, setLoggedIn] = useState(
    localStorage.getItem('loggedIn') === 'true'
  );

  function handleLogin(username, password) {
    // TODO: Implement the login process
    // For now, just set loggedIn to true

    //setLoggedIn(true);
  }

  function handleLogout() {
    setLoggedIn(false);
  }

  return (
    <div>
      {loggedIn ? (

        <Router>
          <>
            {/* <ul>
          <li><Link to="/">Home</Link></li>
          <li><Link to="/posts">Posts</Link></li>
          <li><Link to="/profile">Profile</Link></li>
          <li><Link to="/dashboard">Dashboard</Link></li>
        </ul> */}
            <Top />
            <AsideLeft />
            <Routes>
              {/* <Route path="/" element={<Home />} />
          <Route path="/posts" element={<Posts />} />
          <Route path="/profile" element={<Profile />} /> */}
              {/* <Route path="/login" element={<Login />} />
          <Route path="/registration" element={<Registration />} /> */}
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/search" element={<Search />} />
              <Route path="/employee" element={<Employee />} />

              <Route path="/salary" element={<Salary />} />
              <Route path="/salarysummary" element={<Salarysummary />} />
              <Route path="/worktimesheet" element={<Worktimesheet />} />



              <Route path="/income_tax" element={<IncomeTax />} />
              <Route path="/social_security" element={<SocialSecurity />} />
              <Route path="/provident_fund" element={<ProvidentFund />} />
              <Route path="/collateral" element={<Collateral />} />
              <Route path="/document" element={<Document />} />


              <Route path="/calculate_tax" element={<CalculateTax />} />
              <Route path="/calculate_tax_deductions" element={<CalculateTaxDeductions />} />
              <Route path="/other_expenses" element={<OtherExpenses />} />
              <Route path="/search_results" element={<SearchResults />} />
              <Route path="/setting" element={<Setting />} />
              <Route path="/systemuser" element={<SystemUser />} />

              <Route path="/addsettime" element={<Addsettime />} />

              <Route path="/application" element={<Application />} />
              <Route path="/applicatio1" element={<Application1 />} />
              <Route path="/applicatio2" element={<Application2 />} />
              <Route path="/applicatio3" element={<Application3 />} />
              <Route path="/applicatio4" element={<Application4 />} />
              <Route path="/application_summary" element={<ApplicationSummary />} />

              <Route path="/addEdit_Employee" element={<AddEditEmployee />} />
              <Route path="/addEdit_SalaryEmployee" element={<AddEditSalaryEmployee />} />

              {/* <Route path="/testPDF" element={<TestShowManyData />} /> */}
              {/* <Route path="/testPDF" element={<TestPDF />} /> */}
              {/* <Route path="/testPDF" element={<PdfGenerator />} /> */}
              {/* <Route path="/testPDF" element={<Testapp />} /> */}
              <Route path="/testPDF" element={<SendEmployeePDF />} />





              <Route path="/time" element={<Testcal />} />
              <Route path="/countday" element={<Countday />} />
            </Routes>
            {/* <EmployeesSelected /> */}

          </>
        </Router>
      ) : (
        <LoginForm onLogin={handleLogin} />
      )
      }
    </div>
  );
}


export default App;