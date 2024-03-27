import { useState } from "react";
import { useEffect } from "react";
import Button from "./Button";
import axios from "axios";

const Cover = ({photos, autoSlide=true, autoSlideInterval = 4000}) => {
    const [current, setCurrent] = useState(0)
    const [movies, setMovies] = useState([])
    const [covers, setCovers] = useState([])

    function getCovers(photos){

        photos.forEach(element => {
            if (element.cover) {
                covers.push(element.link)
            }
        });
    }


    const prev = () => setCurrent((current) => (current === 0 ? 2 : current - 1))
    const next = () => setCurrent((current) => (current === 2 ? 0 : current + 1))

    const fetchResults = async () => {
        try {
          const response = await axios.get("http://localhost:8080/api/movies/currently/" + 0 + "/"+ 3); 
          setMovies(response.data.content);
          console.log(response.data.content)
          console.log("nesto", movies)
          setCovers([])
          response.data.content.forEach( (item) => {
            console.log(item.movieId)
            getCovers(item.photos)
          })
  
          console.log(covers)
        } catch (err) {
          console.log(err);
        }
  
      };


    useEffect(() => {
        fetchResults();
        if (!autoSlide) return
        const slideInterval = setInterval(next, autoSlideInterval)
        return () => clearInterval(slideInterval)
    }, [])

    return (
       <div className="w-full h-full relative">
       <div className="w-full h-full overflow-hidden flex">
            {photos.map(url => (
                <img key={url} className="object-cover w-full h-full block shrink-0 grow-0 transition-transform ease-out duration-500" src={url} style={{ transform: `translateX(-${current*100}%)`}}/>
                
            ))}
       </div>

       <div className="absolute top-[376px] right-0 left-24 font-body">
                <p className="font-bold text-5xl/[56px] text-lightGray tracking-[-0.005em]">Naslov</p>
                <Button variant="primary" className="w-[114px]">Buy Ticket</Button>
       </div>


        <div className="absolute bottom-7 right-0 left-0">
                <div className="flex items-center justify-center gap-4">
                    {photos.map((_, i) => (
                        <div onClick={()=> {setCurrent(i)}} key={i} className={ `transition-all h-1 bg-slider w-[30px] cursor-pointer rounded ${current === i ? "" : "bg-sliderD"}`}/>
                    ))}
                </div>
            </div>
       </div>
    )
}

export default Cover;