import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import Logo from '../assets/imdb-logo-new.png'

function NavBar() {

  return (
    <div className='flex items-center font-bold gap-6 content-center mb-5'>
        <Link to="/"><img className='w-14' src={Logo}></img></Link>
        <Link className='text-2xl text-blue-700' to="/">Movies</Link>
        <Link className='text-2xl text-blue-700' to="/watchlist">Watchlist</Link>
    </div>
  )
}

export default NavBar