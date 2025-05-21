// import { useState } from 'react'
import { Route, Routes } from 'react-router-dom'
import './index.css'
import SignIn from './pages/signIn'
import SignOut from './pages/signUp'

function App() {
  return (
    <>
      <Routes>
        <Route path="/sign-in" element={<SignIn />} />
        <Route path="/sign-up" element={<SignOut />} />
      </Routes>
    </>
  )
}

export default App
