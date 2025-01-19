import { useEffect, useState} from "react";
import MovieCard from "./MovieCard";

function Movies() {

  const [pageNo, setPageNo] = useState(1);
  const [movies, setMovies] = useState([]);

  useEffect(()=>{
    const options = {
      method: 'GET',
      headers: {
        accept: 'application/json',
        Authorization: `Bearer ${import.meta.env.VITE_TMDB_API_KEY}`
      }
    };
    
    fetch(`https://api.themoviedb.org/3/movie/popular?language=en-US&page=${pageNo}`, options)
      .then(res => res.json())
      .then(res => {
        setMovies(res.results);
      })
      .catch(err => console.error(err));
  },[pageNo]);

  // go next handler
  const handleNext = () => {
    if(pageNo == 6)
      return;
    setPageNo(pageNo+1);
  };
  // go back handler
  const handlePrevious = () => {
    if(pageNo == 1)
      return;
    setPageNo(pageNo-1);
  };

  return (
    <div className="mt-20">
      <div className="text-2xl font-bold text-center m-5">
        <h1>Trending Movies</h1>
      </div>

      <div className="
        flex
        container
        w-full
        flex-wrap
        justify-between
        gap-5"
      >
        {movies.map((movieObj) => (
          <MovieCard
            key={movieObj.id}
            movieObj={movieObj}
          />
        ))}
      </div>

      {/* Pagination */}
      <div className="bg-gray-400 p-4 h-[50px] w-full mt-8 flex justify-center gap-2">
        <div className="px-8 cursor-pointer" onClick={handlePrevious}>
          <i className="fa-solid fa-arrow-left"></i>
        </div>
        <div>{pageNo}</div>
        <div className="px-8 cursor-pointer" onClick={handleNext}>
          <i className="fa-solid fa-arrow-right"></i>
        </div>
      </div>
    </div>
  );
}

export default Movies;