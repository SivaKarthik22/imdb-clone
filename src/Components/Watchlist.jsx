import React, { useEffect, useState } from "react";
import genreids from "../utility";

function WatchList() {
  const [watchList, setWatchList] = useState( initialiseWatchList() );
  const [search, setSearch] = useState("");
  const [nameSort, setNameSort] = useState("none");
  const [ratingSort, setRatingSort] = useState("none");
  const [genreList, setGenreList] = useState(new Set());
  const [curGenre, setCurGenre] = useState(-1);

  useEffect(()=>{
    let newSet = new Set();
    newSet.add(-1);
    watchList.forEach(movie => {
      newSet.add(movie.genre_ids[0]);
    });
    setGenreList(newSet);
  }, [watchList]);

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
          return 1;
        if(movie1.title < movie2.title)
          return -1;
        return 0;
      });
      setNameSort("asc");
      setRatingSort("none");
    }
    else{
      newArr.sort((movie1, movie2)=>{
        if(movie1.title > movie2.title)
          return -1;
        if(movie1.title < movie2.title)
          return 1;
        return 0;
      });
      setNameSort("desc");
      setRatingSort("none");
    } 
    setWatchList(newArr);
  }
  function sortRating(){
    const newArr = [...watchList];
    if(ratingSort == "desc" || ratingSort == "none"){
      newArr.sort((movie1, movie2)=> movie2.vote_average - movie1.vote_average);
      setRatingSort("asc");
      setNameSort("none");
    }
    else{
      newArr.sort((movie1, movie2)=> movie1.vote_average - movie2.vote_average);
      setRatingSort("desc");
      setNameSort("none");
    } 
    setWatchList(newArr);
  }
  

  return (
    <>
    <div className="flex items-center ml-5 mt-8">
      <input 
        type="text" 
        placeholder="Search Movies"
        onChange={event => {
          setSearch(event.target.value);
        }}
        value={search}
        className="bg-gray-200 border border-gray-500 outline-none px-4 h-[2.5rem] w-[18rem] rounded text-sm"
      />
      <div className="ml-4 flex flex-wrap gap-2">
        {Array.from(genreList).sort().map(genre => (
          <button
            className={genre != curGenre ? "bg-gray-200 px-4 py-2 rounded-md text-sm font-medium hover:bg-gray-300" : "bg-blue-400 px-4 py-2 rounded-md text-sm text-white font-medium"}
            key={genre}
            onClick={()=>{setCurGenre(genre)}}
          >
            {genre == -1 ? "All" : genreids[genre]}
          </button>
        ))}
      </div>
    </div>
    
    <div className="overflow-hidden rounded-lg border border-gray-200 shadow-md m-5">
      <table className="w-full border-collapse bg-white text-left text-sm text-gray-500">
        <thead>
          <tr className="bg-gray-50">
            <th className="w-[50%]">
              <div className="px-6 py-4 text-gray-900 flex gap-2">
                <div>Name</div>
                <button onClick={sortNames}>
                  {nameSort == "none" || nameSort == "desc" ? (<i className="fa-solid fa-arrow-down-a-z"></i>) : (<i className="fa-solid fa-arrow-down-z-a"></i>)}               
                </button>
              </div>
            </th>
            <th className="w-[12%]">
              <div className="px-6 py-4 text-gray-900 flex gap-2">
                <div>Ratings</div>
                <button onClick={sortRating}>
                  {ratingSort == "none" || ratingSort == "desc" ? (<i className="fa-solid fa-arrow-down-short-wide"></i>) : (<i className="fa-solid fa-arrow-down-wide-short"></i>)}               
                </button>
              </div>
            </th>
            <th className="w-[13%]">
              <div className="px-6 py-4 text-gray-900">Popularity</div>
            </th>
            <th className="w-[15%]">
              <div className="px-6 py-4 text-gray-900">Genre</div>
            </th>
            <th className="w-[10%]">
              <div className="px-6 py-4 text-gray-900 text-center">Delete</div>
            </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-100 border-t border-gray-100">
          {watchList
          .filter(movie => {
            if(curGenre == -1)
              return true;
            else
              return movie.genre_ids[0] == curGenre
          })
          .filter(movie => movie.title.toLowerCase().includes(search.toLowerCase()))
          .map(movie => (
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
              <td className="px-6 py-4 text-left">{movie.vote_average}</td>
              <td className="px-6 py-4 text-left">{movie.popularity}</td>
              <td className="px-6 py-4 text-left">{genreids[movie.genre_ids[0]]}</td>
              <td className="px-6 py-4 text-center">
                <button className="fa-solid fa-trash"></button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
    </>
  );
}

export default WatchList;