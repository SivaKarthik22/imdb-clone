import React, { useState } from 'react'
import './App.css'
import Home from './Components/Home'
import Watchlist from './Components/Watchlist'
import NavBar from './Components/Navbar'
import { Route, Routes } from 'react-router-dom'

function App() {

  return (
    <>
      <NavBar />
      <Routes>
        <Route path='/' element={<Home/>}></Route>
        <Route path='/watchlist' element={<Watchlist/>}></Route>
      </Routes>
    </>
  )
}

export default App
