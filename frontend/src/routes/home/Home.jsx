import { useEffect, useState } from "react";
import CoverCarousel from "../../components/carousel/CoverCarousel"
import Carousel from "../../components/carousel/Carousel";
import axios from "axios";
import VenueCarousel from "../../components/carousel/VenueCarousel";

const Home = () => {
  const routeCurrently = "http://localhost:8080/api/movies/currently";
  const routeUpcoming = "http://localhost:8080/api/movies/upcoming";
  const routeVenues = "http://localhost:8080/api/venues/"
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    axios.get(routeCurrently + "?page=" + 0 + "&size=" + 3).then((response) => {
      setMovies(response.data.content);
    }).catch((err) => {
      console.log(err);
    })
  }, [])

  return (
    <div className="bg-neutral-25 text-neutral-800 flex flex-col items-start justify-start pb-40 font-body">
      <div className="w-full h-[730px]">
        <CoverCarousel movies={movies}></CoverCarousel>
      </div>
      <div className="w-full h-[164px]">
        <VenueCarousel route={routeVenues} />
      </div>
      <div className="h-[619px] gap-[10px] px-[112px] py-[20px] w-full">
        <div className="flex">
          <p className="flex-1 font-bold text-[32px]/[40px] tracking-[0.0075em]">Currently Showing</p>
          <a className="pt-12 text-primary-600 text-[16px]/[24px] font-semibold tracking-[0.015em] text-center align-bottom cursor-pointer">See all</a>
        </div>
        <Carousel route={routeCurrently} movies={true} />
      </div>

      <div className="h-[619px] gap-[10px] px-[112px] py-40 w-full">
        <div className="flex pr-[20px]">
          <p className="flex-1 font-bold text-[32px]/[40px] tracking-[0.0075em]">Upcoming Movies</p>
          <a className="pt-12 text-primary-600 text-[16px]/[24px] font-semibold tracking-[0.015em] text-center align-bottom cursor-pointer">See all</a>
        </div>
        <Carousel route={routeUpcoming} movies={true} />
      </div>

      <div className="h-[619px] gap-[10px] px-[112px] pt-40 pb-80 w-full">
        <div className="flex pr-[20px]">
          <p className="flex-1 font-bold text-[32px]/[40px] tracking-[0.0075em]">Venues</p>
          <a className="pt-12 text-primary-600 text-[16px]/[24px] font-semibold tracking-[0.015em] text-center align-bottom cursor-pointer">See all</a>
        </div>
        <Carousel route={routeVenues} movies={false} />
      </div>
    </div>
  )
}

export default Home;
