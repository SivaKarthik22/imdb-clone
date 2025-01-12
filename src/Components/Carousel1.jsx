import { CSSTransition, TransitionGroup } from "react-transition-group";
import { useState } from "react";

function Carousel1({carouselDb}){
    const[carouselState, setCarouselState] = useState(0);
    
    return(
        <div className="
            container 
            h-[500px] w-full
            bg-yellow-500
            relative
            overflow-hidden
        ">
            <TransitionGroup className="container h-full w-full absolute">
                <CSSTransition
                    key={carouselDb[carouselState].idx}
                    timeout={1000}
                    classNames="slide"
                >
                    <img
                        src={carouselDb[carouselState].path}
                        className="object-cover h-full w-full"
                    />
                </CSSTransition>
            </TransitionGroup>
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
                onClick={()=>{setCarouselState((carouselState-1+6)%6)}}
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
                onClick={()=>{setCarouselState((carouselState+1)%6)}}
            ></button>
        </div>
    );
}

export default Carousel1;