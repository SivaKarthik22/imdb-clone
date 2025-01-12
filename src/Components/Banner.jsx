import { useEffect, useState } from "react";
import React from "react";
function Banner() {
  const [path, setPath] = useState("");
  const [title, setTitle] = useState("");
  useEffect(()=>{
    const options = {
      method: 'GET',
      headers: {
        accept: 'application/json',
        Authorization: `Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI3NTU5MTVmYWIzM2I2NmM0MmU3ZTYwYmNjMmNiNTM2MSIsIm5iZiI6MTczNjM1Mjk1Mi41MzksInN1YiI6IjY3N2VhNGI4MTI2Njc5Njg4NTRlNzFmNCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.Mvrn38WRv5CXns8lMH2AHrH-ppDm7QBanV22niap_MY`
      }
    };
    
    fetch('https://api.themoviedb.org/3/trending/movie/day?language=en-US', options)
      .then(res => res.json())
      .then(res => {
        setPath(res.results[3].backdrop_path);
        setTitle(res.results[3].title);
      })
      .catch(err => console.error(err));
  },[]);

  return (
    <div
      className="h-[20vh] md:h-[75vh] bg-cover bg-center flex items-end"
      style={{
        backgroundImage: `url( https://image.tmdb.org/t/p/original/${path} )`,
      }}
    >
      <div className="text-white w-full text-center text-2xl">
        {title}
      </div>
    </div>
  );
}

export default Banner;