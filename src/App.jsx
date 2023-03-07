import AsideLeft from "./conponents/AsideLeft"
import Top from "./conponents/Top"
import Dashboard from "./conponents/Dashboard"
// import Navbar from "./conponents/Navbar"
// import Footer from "./conponents/Footer"
import About from './contents/About'


import { BrowserRouter as Router, Route } from "react-router-dom"

function App() {

  return (
    <Router>
      <>
        <Top />
        <AsideLeft />
        {/* <Route exact path="/"> */}
        <Dashboard />
        {/* </Route> */}
        {/* <Route exact path="/"> */}
          <About />
        {/* </Route> */}
        
        {/* <Navbar /> */}
      </>
    </Router>
  )
}

export default App
