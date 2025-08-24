import React from 'react'
import Tasks from './Tasks'
import { Routes, Route } from 'react-router-dom'
import Signup from './Signup'
import Taskuu from './Taskuu'
import Signin from './Signin'
import Welcome from './Welcome'

const App = () => {
  return (
    <>
    <Routes>
    <Route path="/" element={<Welcome/>}/>
    <Route path="/tasks" element={<Tasks/>}/>
    <Route path="/signup" element={<Signup/>}/>
    <Route path="/tasku" element={<Taskuu/>}/>
    <Route path="/signin" element={<Signin/>}/>
    </Routes>
    </>
  )
}

export default App