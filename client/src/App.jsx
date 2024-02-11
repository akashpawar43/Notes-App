import React, { useState } from 'react'
import Navbar from './components/Navbar';
import { BrowserRouter, Routes, Route } from "react-router-dom"
import Home from './components/Home';
import About from './components/About';
import NoteState from './context/notes/NoteState';
import Alert from './components/Alert';
import Login from './components/Login';
import Signup from './components/Signup';

export default function App() {
  const [alert, setAlert] = useState(null);
  const showAlert = (message, type) => {
    setAlert({
      msg: message,
      type: type
    })
    setTimeout(() => {
      setAlert(null)
    }, 1500)
  }
  return (
    <NoteState>
      <BrowserRouter>
        <Navbar />
        <Alert alert={alert} />
        <Routes>
          <Route path='/' element={<Home showAlert={showAlert} />} />
          <Route path='/about' element={<About />} />
          <Route path='/login' element={<Login showAlert={showAlert} />} />
          <Route path='/signup' element={<Signup showAlert={showAlert} />} />
        </Routes>
        <p className="text-center bg-gray-900 text-gray-500 py-4 text-xs">
          &copy;2020 Acme Corp. All rights reserved.
        </p>
      </BrowserRouter>
    </NoteState >
  )
}
