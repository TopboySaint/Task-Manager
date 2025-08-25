import React from 'react'
import Tasks from './Tasks'
import { Routes, Route, Navigate } from 'react-router-dom'
import Signup from './Signup'
import Signin from './Signin'
import Welcome from './Welcome'
import FourOFour from './FourOFour'

const App = () => {
  return (
    <>
    <Routes>
    <Route path="/" element={<Welcome/>}/>
    <Route path="/home" element={<Navigate to="/" replace />}/>

    <Route path="/tasks" element={<Tasks/>}/>
    <Route path="/task" element={<Navigate to="/tasks" replace />}/>
    <Route path="/todos" element={<Navigate to="/tasks" replace />}/>
    <Route path="/todo" element={<Navigate to="/tasks" replace />}/>

    <Route path="/signup" element={<Signup/>}/>
    <Route path="/register" element={<Navigate to="/signup" replace />}/>
    <Route path="/sign-up" element={<Navigate to="/signup" replace />}/>
    <Route path="/create-account" element={<Navigate to="/signup" replace />}/>

    <Route path="/signin" element={<Signin/>}/>
    <Route path="/login" element={<Navigate to="/signin" replace />}/>
    <Route path="/sign-in" element={<Navigate to="/signin" replace />}/>
    <Route path="/log-in" element={<Navigate to="/signin" replace />}/>
    
    <Route path="*" element={<FourOFour/>}/>
    </Routes>
    </>
  )
}

export default App