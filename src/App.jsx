import { useState } from 'react'

import './App.css'
import Header from './components/layout/Header'

import Footer from './components/layout/Footer'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Bills from './components/content/Bills'
import History from './components/content/History'
import Login from './components/content/Login'
import refetch from './context/RefetchContext'

function App() {
  
  const [currentPage , setCurrentPage] = useState("Bills");
  const [refetch , setRefetch] = useState(false)
  return (
    <>
      <BrowserRouter>
          <Header title={currentPage} />

          <Routes>
            <Route index path='/' element={<Bills /> } />
            <Route path='/history' element={<History />} />
            <Route path='/login' element={<Login />} />
            
          </Routes>
          
          <Footer />

      </BrowserRouter>
   
    </>
  )
}

export default App
