import React, { useEffect, useState } from "react";
function WatchList() {
  const [watchList, setWatchList] = useState( initialiseWatchList() );

  function initialiseWatchList(){
    if(!localStorage.getItem("watchlist")){
      localStorage.setItem("watchlist", JSON.stringify([]));
      return [];
    }
    return JSON.parse( localStorage.getItem("watchlist") );
  }

  return (
    <div className="overflow-hidden rounded-lg border border-gray-200 shadow-md m-5">
      <table className="w-full border-collapse bg-white text-left text-sm text-gray-500">
        <thead>
          <tr className="bg-gray-50">
            <th className="px-6 py-4 font-medium text-gray-900">Name</th>
            <th>
              <div className="flex">
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
          {watchList.map((movie) => (
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
              <td className="pl-2 py-4 text-left">Action</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default WatchList;