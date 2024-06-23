import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Home from './Home'
import 'bootstrap/dist/css/bootstrap.min.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import CreateStudent from './components/students/CreateStudent'
import EditStudent from './components/students/EditStudent'
import StudentList from './components/students/StudentList'

function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Home />}></Route>
        <Route path='/student/create' element={<CreateStudent />} ></Route>
        <Route path='/student/edit/:id' element={<EditStudent />}></Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
