import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Header from './components/layout/Header'

import Footer from './components/layout/Footer'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Bills from './components/content/Bills'
import "./output.css";
import Dues from './components/content/Dues'
import Login from './components/content/Login'

function App() {
  
  const [currentPage , setCurrentPage] = useState("Bills");
  return (
    <>
      <BrowserRouter>
          <Header title={currentPage} />

          <Routes>
            <Route index path='/' element={<Bills /> } />
            <Route path='/history' element={<Dues />} />
            <Route path='/login' element={<Login />} />
          </Routes>
          
          <Footer />

      </BrowserRouter>
   
    </>
  )
}

export default App
