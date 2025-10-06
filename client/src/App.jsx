import React from 'react'
import Nav from './Components/Nav'
import { Route, Routes } from 'react-router-dom'
import Home from './pages/Home'
import Results from './pages/Results'
import Buycredit from './pages/Buycredit'
import Footer from './Components/Footer'
import Login from './Components/Login'
import { useData } from './context/Appcontext'

  import { ToastContainer } from 'react-toastify';
  import 'react-toastify/dist/ReactToastify.css';
const App = () => {
  const {showLogin}= useData()
  return (
    < div className="min-h-screen w-full relative sm:px-10 md:px-14 lg:px-28 bg-black" >
      {/* Black Basic Grid Background */}
      <div
        className="absolute inset-0 z-0 "
        style={{
          background: "#000000",
          backgroundImage: `
        linear-gradient(to right, rgba(75, 85, 99, 0.4) 1px, transparent 1px),
        linear-gradient(to bottom, rgba(75, 85, 99, 0.4) 1px, transparent 1px)
      `,
          backgroundSize: "40px 40px",
        }}
      />
      {/* Your Content/Components */}
      <div className="relative z-10">
        <ToastContainer position='bottom-right'/>
        <Nav />
        {showLogin && <Login/>}
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/results" element={<Results />} />
          <Route path="/buy-credit" element={<Buycredit />} />
         
        </Routes>
         <Footer/>
      </div>

    </div >
  )
}

export default App
