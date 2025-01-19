import React, { createContext, useState } from 'react'
import './App.css'
import Home from './Components/Home'
import Watchlist from './Components/Watchlist'
import NavBar from './Components/Navbar'
import { Route, Routes } from 'react-router-dom'

export let globalWatchlist = createContext();

function App() {
  const [watchList, setWatchlist] = useState( initialiseWatchList() );

  function initialiseWatchList(){
    if(!localStorage.getItem("watchList")){
      localStorage.setItem("watchList", JSON.stringify([]));
      return [];
    }
    return JSON.parse( localStorage.getItem("watchList") );
  }
  function addToWatchlist(movieObj){
    const newWatchlist = [...watchList, movieObj];
    localStorage.setItem( "watchList", JSON.stringify(newWatchlist) );
    setWatchlist(newWatchlist);
  }
  function removeFromWatchlist(movieObj){
    const newWatchlist = watchList.filter(curMovieObj => curMovieObj.id != movieObj.id);
    localStorage.setItem( "watchList", JSON.stringify(newWatchlist) );
    setWatchlist(newWatchlist);
  }
  function sortWatchlist(compareFunc){
    const newArr = [...watchList];
    newArr.sort(compareFunc);
    setWatchlist(newArr);
  }

  return (
    <>
      <NavBar/>
      <globalWatchlist.Provider value={{watchList, addToWatchlist, removeFromWatchlist, sortWatchlist}}>
        <Routes>
          <Route path='/' element={<Home/>}></Route>
          <Route path='/watchlist' element={<Watchlist/>}></Route>
        </Routes>
      </globalWatchlist.Provider>
    </>
  )
}

export default App
