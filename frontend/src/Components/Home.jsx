import { useEffect, useState } from "react";
import CoverCarousel from "./CoverCarousel"
import Carousel from "./Carousel";
import axios from "axios";
import Cover from "./Cover";
import VenueCarousel from "./VenueCarousel";

const Home = () => {
    const routeCurrently = "http://localhost:8080/api/movies/currently/";
    const routeUpcoming = "http://localhost:8080/api/movies/upcoming/";
    const routeVenues = "http://localhost:8080/api/venues/"
    const [movies, setMovies] = useState([]);
    const [covers, setCovers] = useState([]);


    const photos = [
      "https://media.vanityfair.com/photos/63a31b77d5d6e9f4c5f419af/4:3/w_3516,h_2637,c_limit/avatar-visual-effects-lede.jpg",
      "https://m.media-amazon.com/images/S/pv-target-images/5099b0bb5c1a20bc2f43fe3a4934c94412c842a595deb5220d70a7ee959aae29.jpg",
      "https://lumiere-a.akamaihd.net/v1/images/h_avengersendgame_mobile_19751_1f00d8a3.jpeg?region=0,0,640,480"
    ]

    const fetchData = async () => {
      const { data } = await axios.get("http://localhost:8080/api/movies/currently/" + 0 + "/"+ 3);
      console.log(data)
      setMovies(data.content);
      console.log(movies)
      // console.log(data);
    };

    const fetchMovies = async () => {
     axios.get("http://localhost:8080/api/movies/currently/" + 0 + "/"+ 3).then(response => {
    console.log(response.data);
    setMovies(response.data.content);
    })
  }
  
    function getCovers(photos){
      photos.forEach(element => {
          if (element.cover) {
              covers.push(element.link)
          }
      });
  }


useEffect(() => {
          axios.get(routeCurrently + 0 + "/"+ 3).then((response) => {
            setMovies(response.data.content);
            console.log("molim", response)
          }).catch((err) => {
            console.log(err);
          })
                //fetchResults();   
  }, [])
    

    return (
        <div className="bg-lightGray text-gray flex flex-col items-center justify-center pb-10">
      
          <div className="w-full h-[730px] ">
            <Cover photos={photos}/>
          </div>
          <div className="w-full h-[730px]">
            <CoverCarousel photos={movies}></CoverCarousel>
          </div>
          <div className="w-full h-[164px]">
            <VenueCarousel route = {routeVenues}/>
          </div>
            <div className="h-[619px] gap-[10px] px-[92px] py-10 top-[2212px]">
            <div className="flex">
            <p className="flex-1 font-bold text-[32px]/[40px] tracking-[0.0075em]">Currently Showing</p>
            <a className="text-darkRed text-base font-semibold tracking-[0.015em] text-center align-bottom cursor-pointer">See all</a>
            </div>
              <Carousel route = {routeCurrently} movies = {true}/>

            </div>

            <div className="h-[619px] gap-[10px] px-[92px] py-10 top-[2212px]">
            <div className="flex">
            <p className="flex-1 font-bold text-[32px]/[40px] tracking-[0.0075em]">Upcoming Movies</p>
            <a className="text-darkRed text-base font-semibold tracking-[0.015em] text-center align-bottom cursor-pointer">See all</a>
            </div>
              <Carousel route = {routeUpcoming} movies = {true}/>

            </div>

            <div className="h-[619px] gap-[10px] px-[92px] pt-10 pb-20 top-[2212px]">
            <div className="flex">
            <p className="flex-1 font-bold text-[32px]/[40px] tracking-[0.0075em]">Venues</p>
            <a className="text-darkRed text-base font-semibold tracking-[0.015em] text-center align-bottom cursor-pointer">See all</a>
            </div>
              <Carousel route = {routeVenues} movies = {false}/>

            </div>
            
        </div>
    )
}

export default Home;