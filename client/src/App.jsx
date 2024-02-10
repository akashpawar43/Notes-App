import React from 'react'
import Navbar from './components/Navbar';
import { BrowserRouter, Routes, Route } from "react-router-dom"
import Home from './components/Home';
import About from './components/About';
import NoteState from './context/notes/NoteState';
import Alert from './components/Alert';
import Login from './components/Login';
import Signup from './components/Signup';

export default function App() {
  return (
    <NoteState>
      <BrowserRouter>
        <Navbar />
        <Alert message="Something happened that you should know about." />
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/about' element={<About />} />
          <Route path='/login' element={<Login />} />
          <Route path='/signup' element={<Signup />} />
        </Routes>
        <p className="text-center bg-gray-900 text-gray-500 py-4 text-xs">
          &copy;2020 Acme Corp. All rights reserved.
        </p>
      </BrowserRouter>
    </NoteState >
  )
}
