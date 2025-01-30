import React, { createContext, useState } from 'react'
import './App.css'
import Home from './Components/Home'
import Watchlist from './Components/Watchlist'
import NavBar from './Components/Navbar'
import { Route, Routes } from 'react-router-dom'
import { WatchlistProvider } from './Components/watchlistContext'

export let globalWatchlist = createContext();

function App() {
  

  return (
    <>
      <NavBar/>
      <WatchlistProvider>
        <Routes>
          <Route path='/' element={<Home/>}></Route>
          <Route path='/watchlist' element={<Watchlist/>}></Route>
        </Routes>
      </WatchlistProvider>
    </>
  )
}

export default App
