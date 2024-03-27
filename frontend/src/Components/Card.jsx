import { useEffect, useState } from "react";

const Card = (props) => {
    const movie = props.movie;
    const photos = props.photos;
    const [cover, setCover] = useState();


    function getCover(){
        photos.forEach(element => {
            if (element.cover) {
                setCover(element.link)
            }
        });
    }

    useEffect(() => {
        getCover();   
      }, [movie])

    return (
        <div className="w-[302px] h-[395px] gap-0 bg-white rounded-3xl border border-solid border-shadow1 text-gray shadow-[0_4px_6px_-1px_rgba(52,64,84,0.08)] shadow-inner-[0_2px_4px_-2px_rgba(52, 64, 84, 0.08)]">
        <div className="p-2.5">
              <div className="flex items-center justify-center"> 
          <img className="w-[270px] h-[287px] gap-0 rounded-2xl" src={cover} alt=""/>
          </div>

          <p className="text-xl/6 mt-2 font-bold	tracking-[0.0085em]">{movie.name}</p>
          <div className="text-border font-normal h-5 tracking-[0.0125em] text-sm flex p-3">
          <p className="border-line w-20 h-5 border-r mr-3">{movie.duration} MIN</p>
          <p>{movie.genres[0].name}</p>
          </div>

        </div>
        </div>
    )
}

export default Card;