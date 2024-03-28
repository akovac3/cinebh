import { useEffect, useState } from "react";
import CoverCarousel from "./CoverCarousel"
import Carousel from "./Carousel";
import axios from "axios";
import VenueCarousel from "./VenueCarousel";

const Home = () => {
  const routeCurrently = "http://localhost:8080/api/movies/currently";
  const routeUpcoming = "http://localhost:8080/api/movies/upcoming";
  const routeVenues = "http://localhost:8080/api/venues/"
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    axios.get(routeCurrently + "?page=" + 0 + "&size=" + 3).then((response) => {
      setMovies(response.data.content);
      console.log("molim", response)
    }).catch((err) => {
      console.log(err);
    })
  }, [])


  return (
    <div className="bg-lightGray text-gray flex flex-col items-start justify-start pb-10">


      <div className="w-full h-[730px]">
        <CoverCarousel movies={movies}></CoverCarousel>
      </div>

      <div className="w-full h-[164px]">
        <VenueCarousel route={routeVenues} />
      </div>
      <div className="h-[619px] gap-[10px] px-[130px] py-5 w-full">
        <div className="flex px-10">
          <p className="flex-1 font-bold text-[32px]/[40px] tracking-[0.0075em]">Currently Showing</p>
          <a className="pt-3 text-darkRed text-base font-semibold tracking-[0.015em] text-center align-bottom cursor-pointer">See all</a>
        </div>
        <Carousel route={routeCurrently} movies={true} />

      </div>

      <div className="h-[619px] gap-[10px] px-[130px] py-10 top-[2212px] w-full">
        <div className="flex pr-5">
          <p className="flex-1 font-bold text-[32px]/[40px] tracking-[0.0075em]">Upcoming Movies</p>
          <a className="pt-3 text-darkRed text-base font-semibold tracking-[0.015em] text-center align-bottom cursor-pointer">See all</a>
        </div>
        <Carousel route={routeUpcoming} movies={true} />

      </div>

      <div className="h-[619px] gap-[10px] px-[130px] pt-10 pb-20 top-[2212px] w-full">
        <div className="flex pr-5">
          <p className="flex-1 font-bold text-[32px]/[40px] tracking-[0.0075em]">Venues</p>
          <a className="pt-3 text-darkRed text-base font-semibold tracking-[0.015em] text-center align-bottom cursor-pointer">See all</a>
        </div>
        <Carousel route={routeVenues} movies={false} />

      </div>

    </div>
  )
}

export default Home;