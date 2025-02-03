import { useState } from 'react'
import './App.css'
import MainPage from './components/mainPage'
import GetTicket from './components/GetTicket'
import {Routes, Route} from "react-router"

function App() {

  return (
    <>
    <Routes >
    <Route path="/" element={<MainPage />} />
    <Route path="/ticket/:userId" element={<GetTicket />} />
    </Routes>
    </>
  )
}

export default App
