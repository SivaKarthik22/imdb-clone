function MovieCard({movieObj, watchList, addToWatchlist, removeFromWatchlist}){
    function heartIconDisplay(){
        for(let curMovieEle of watchList){
            if(curMovieEle.id == movieObj.id)
                return true;
        }
        return false;
    }

    return (
        <div
            style={{backgroundImage: `url(https://image.tmdb.org/t/p/w500/${movieObj.poster_path})`}}
            className="
                w-[210px] h-[350px]
                rounded-xl
                bg-cover bg-center
                cursor-pointer
                hover:scale-105
                duration-100
                overflow-hidden
                relative"
            >
            <div className="
                p-2
                text-white
                bg-gray-950/50
                w-full"
            >{movieObj.title}</div>
            {heartIconDisplay() ? (
                <div 
                    className="
                        absolute bottom-3 right-3
                        bg-gray-100
                        flex justify-center items-center
                        w-9 h-9
                        rounded
                        text-lg
                        pt-0.5"
                    onClick={()=>{removeFromWatchlist(movieObj)}}
                >
                    <i className="fa-solid fa-heart text-red-600"></i>
                </div>
            ) : (
                <div 
                    className="
                        absolute bottom-3 right-3
                        bg-gray-100
                        flex justify-center items-center
                        w-9 h-9
                        rounded
                        text-lg
                        pt-0.5"
                    onClick={()=>{addToWatchlist(movieObj)}}
                >
                    <i className="fa-regular fa-heart"></i>
                </div>
            )}
        </div>
    );
}

export default MovieCard;