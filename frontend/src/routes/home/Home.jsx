import { useEffect, useState } from "react";
import CoverCarousel from "../../components/carousel/CoverCarousel"
import axios from "axios";
import VenueCarousel from "../../components/carousel/VenueCarousel";
import MovieList from "../../components/list/MovieList";
import VenueList from "../../components/list/VenueList";

const Home = () => {
  const routeCurrently = "http://localhost:8080/api/movies/currently";
  const routeUpcoming = "http://localhost:8080/api/movies/upcoming";
  const routeVenues = "http://localhost:8080/api/venues/"
  const [coverMovies, setCoverMovies] = useState([]);

  useEffect(() => {
    axios.get(routeCurrently + "?page=" + 0 + "&size=" + 3).then((response) => {
      setCoverMovies(response.data.content);
    }).catch((err) => {
      console.log(err);
    })
  }, [])

  return (
    <div className="bg-neutral-25 text-neutral-800 flex flex-col items-start justify-start pb-40 font-body">
      <div className="w-full h-[730px]">
        <CoverCarousel movies={ coverMovies } />
      </div>
      <div className="w-full h-[164px]">
        <VenueCarousel route={ routeVenues } />
      </div>
      <div className="gap-[10px] px-[118px] py-[20px] w-full">
        <div className="flex">
          <p className="flex-1 font-bold text-[32px]/[40px] tracking-[0.0075em]">Currently Showing</p>
          <a className="pt-12 text-primary-600 text-[16px]/[24px] font-semibold tracking-[0.015em] text-center align-bottom cursor-pointer">See all</a>
        </div>
        <MovieList route={ routeCurrently } />
      </div>
      <div className="gap-[10px] px-[118px] py-[20px] w-full">
        <div className="flex">
          <p className="flex-1 font-bold text-[32px]/[40px] tracking-[0.0075em]">Upcomig Movies</p>
          <a className="pt-12 text-primary-600 text-[16px]/[24px] font-semibold tracking-[0.015em] text-center align-bottom cursor-pointer">See all</a>
        </div>
        <MovieList route={ routeUpcoming } />
      </div>
      <div className="gap-[10px] px-[118px] py-[20px] w-full">
        <div className="flex">
          <p className="flex-1 font-bold text-[32px]/[40px] tracking-[0.0075em]">Venues</p>
          <a className="pt-12 text-primary-600 text-[16px]/[24px] font-semibold tracking-[0.015em] text-center align-bottom cursor-pointer">See all</a>
        </div>
        <VenueList route={ routeVenues } />
      </div>
    </div>
  )
}

export default Home;
