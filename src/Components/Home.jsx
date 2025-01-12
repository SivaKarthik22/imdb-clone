import React, { useState } from 'react'
import Banner from './Banner'
import Movies from './Movies'
import Carousel2 from './Carousel2'

function Home() {
  
  return (
    <div>
        {/*<Banner/>*/}
        <Carousel2 />
        <Movies/>
    </div>
  )
}

export default Home