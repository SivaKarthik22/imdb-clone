import { useEffect, useState } from "react";
//this is same file
function Carousel2(){
    const[carouselDb, setCarouselDb] = useState([
        {id:0, backdrop_path:"src/assets/movie-banner-1.jpg"},
        {id:1, backdrop_path:"src/assets/movie-banner-2.jpg"},
        {id:2, backdrop_path:"src/assets/movie-banner-3.jpg"},
        {id:3, backdrop_path:"src/assets/movie-banner-4.jpg"},
        {id:4, backdrop_path:"src/assets/movie-banner-5.jpg"},
        {id:5, backdrop_path:"src/assets/movie-banner-6.jpg"}
    ]);
    const[carouselState, setCarouselState] = useState(0);

    useEffect(()=>{
        const options = {
            method: 'GET',
            headers: {
                accept: 'application/json',
                Authorization: `Bearer ${import.meta.env.VITE_TMDB_API_KEY}`
            }
        };
        
        fetch(`https://api.themoviedb.org/3/trending/movie/day?language=en-US`, options)
            .then(res => res.json())
            .then(res => {
                setCarouselDb([res.results[1],res.results[11],res.results[12],res.results[13],res.results[14],res.results[5]]);
            })
            .catch(err => console.error(err));
    },[]);

    useEffect(()=>{
        let timeoutId = setTimeout(nextSlide, 3000);
        return ()=>{clearTimeout(timeoutId)};
    }, [carouselState]);

    function nextSlide(){
        setCarouselState((carouselState+1)% carouselDb.length);
    }
    function prevSlide(){
        setCarouselState((carouselState-1 + carouselDb.length)% carouselDb.length)
    }

    return(
        <div className="
            container 
            h-[500px] w-full
            bg-yellow-500
            relative
            overflow-hidden
            mt-3
        ">
            <div
                className="flex absolute"
                style={{
                    'transform': `translateX(-${carouselState*100/carouselDb.length}%)`,
                    'transition': "transform 500ms ease"
                }}
            >
                {carouselDb.map(ele => (
                    <div 
                        className="
                            h-[500px] w-[1160px]
                            bg-cover bg-center
                            flex items-end justify-center"
                        key={ele.id}
                        style={{backgroundImage: `url(https://image.tmdb.org/t/p/original/${ele.backdrop_path})`}}
                    >
                        <p className="text-white p-4 text-4xl font-bold">{ele.title}</p>
                    </div>
                ))}
            </div>
            <button 
                className="
                    fa-solid fa-angle-left
                    absolute
                    left-0 top-[50%] translate-y-[-50%]
                    p-5
                    text-4xl
                    text-white
                    hover:scale-150
                    transition-transform
                    duration-100"
                onClick={prevSlide}
            ></button>
            <button 
                className="
                    fa-solid fa-angle-right
                    absolute
                    right-0 top-[50%] translate-y-[-50%]
                    p-5
                    text-4xl
                    text-white
                    hover:scale-150
                    transition-transform
                    duration-100"
                onClick={nextSlide}
            ></button>
        </div>
    );
}

export default Carousel2;