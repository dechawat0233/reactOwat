import React from "react";
// import Posts from "./Post";
// import Home from "./Home";
// import Profile from './Profile';

import AsideLeft from "./conponents/AsideLeft";
import Top from "./conponents/Top";

import Dashboard from "./conponents/Dashboard";
import Search from "./conponents/Search";
import Employee from "./conponents/Employee";
import Salary from "./conponents/Salary";

import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";

function App() {
  return (
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
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/search" element={<Search />} />
          <Route path="/employee" element={<Employee />} />
          <Route path="/salary" element={<Salary />} />
        </Routes>
      </>
    </Router>
  );
}

export default App;