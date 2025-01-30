import { createContext, useState } from "react";

export const watchlistContext = createContext(null);

export function WatchlistProvider({children}){
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

    return(
        <watchlistContext.Provider value={{watchList, addToWatchlist, removeFromWatchlist, sortWatchlist}}>
            {children}
        </watchlistContext.Provider>
    );
} 