import React, { useEffect, useState } from "react";
import genreids from "../utility";

function WatchList() {
  const [watchList, setWatchList] = useState( initialiseWatchList() );
  const [search, setSearch] = useState("");
  const [nameSort, setNameSort] = useState("none");
  const [genreList, setGenreList] = useState(["All Genre"]);

  function initialiseWatchList(){
    if(!localStorage.getItem("watchlist")){
      localStorage.setItem("watchlist", JSON.stringify([]));
      return [];
    }
    return JSON.parse( localStorage.getItem("watchlist") );
  }

  function sortNames(){
    const newArr = [...watchList];
    if(nameSort == "desc" || nameSort == "none"){
      newArr.sort((movie1, movie2)=>{
        if(movie1.title > movie2.title)
          return -1;
        if(movie1.title < movie2.title)
          return 1;
        return 0;
      });
      setNameSort("asc");
    }
    else{
      newArr.sort((movie1, movie2)=>{
        if(movie1.title > movie2.title)
          return 1;
        if(movie1.title < movie2.title)
          return -1;
        return 0;
      });
      setNameSort("desc");
    } 
    setWatchList(newArr);
  }
  

  return (
    <>
    <div>
      <input 
        type="text" 
        placeholder="Search Movies"
        onChange={event => {
          setSearch(event.target.value);
        }}
        value={search}
        className="bg-gray-200 border border-gray-500 outline-none px-4 h-[3rem] w-[18rem]"
      />
      <div className="m-4 flex flex-wrap gap-3">
        {genreList.map(genre => (
          <button
            className="bg-gray-200 px-4 py-2 rounded-md"
          >
            {genre}
          </button>
        ))}
      </div>
    </div>
    
    <div className="overflow-hidden rounded-lg border border-gray-200 shadow-md m-5">
      <table className="w-full border-collapse bg-white text-left text-sm text-gray-500">
        <thead>
          <tr className="bg-gray-50">
            <th className="px-6 py-4 font-medium text-gray-900 flex gap-2">
              Name
              <button onClick={sortNames}>
                {nameSort == "none" || nameSort == "desc" ? (<i className="fa-solid fa-arrow-down-short-wide"></i>) : (<i class="fa-solid fa-arrow-down-wide-short"></i>)}               
              </button>
            </th>
            <th>
              <div className="flex gap-2">
                <div>Ratings</div>
              </div>
            </th>
            <th>
              <div className="flex">
                <div>Popularity</div>
              </div>
            </th>
            <th>
              <div className="flex">
                <div>Genre</div>
              </div>
            </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-100 border-t border-gray-100">
          {watchList
          .filter(movie => movie.title.toLowerCase().includes(search.toLowerCase()))
          .map((movie) => (
            <tr className="hover:bg-gray-50" key={movie.id}>
              <td className="flex items-center px-6 py-4 font-normal text-gray-900 gap-5">
                <img
                  className="h-[6rem] w-[4rem] object-cover"
                  src={`https://image.tmdb.org/t/p/original/${movie.poster_path}`}
                  alt=""
                />
                <div className="font-medium text-gray-700 text-sm">
                  {movie.title}
                </div>
              </td>
              <td className="pl-6 py-4 text-left">{movie.vote_average}</td>
              <td className="pl-6 py-4 text-left">{movie.popularity}</td>
              <td className="pl-2 py-4 text-left">{genreids[movie.genre_ids[0]]}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
    </>
  );
}

export default WatchList;