import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import CoverCarousel from "../../components/carousel/CoverCarousel"
import VenueCarousel from "../../components/carousel/VenueCarousel";
import MovieList from "../list/MovieList";
import VenueList from "../list/VenueList";

import { createClassName } from "../../utils/utils";

const Home = () => {
  const routeCurrently = "http://localhost:8080/api/movies/currently";
  const routeUpcoming = "http://localhost:8080/api/movies/upcoming";
  const routeVenues = "http://localhost:8080/api/venues/"
  const [coverMovies, setCoverMovies] = useState([]);
  const [venues, setVenues] = useState([]);

  const loadMovies = async (page, size) => {
    await axios.get(routeCurrently + "?page=" + page + "&size=" + size).then((res) =>
      setCoverMovies(res.data.content)).catch((err) => console.log(err))
  }

  const loadVenues = async () => {
    try {
      const response = await axios.get(routeVenues + "all");
      setVenues(response.data);
    } catch (err) {
      console.log(err);
    }
  }

  useEffect(() => {
    loadMovies(0, 3);
    loadVenues();
  }, [])

  return (
    <div className="bg-neutral-25 text-neutral-800 flex flex-col items-start justify-start pb-40 font-body">
      <div className="w-full h-[730px]">
        <CoverCarousel movies={ coverMovies } />
      </div>
      <div className="w-full h-[164px]">
        <VenueCarousel venues={ venues } />
      </div>
      <div className="gap-[10px] px-[118px] py-[20px] w-full">
        <ContentLabel title="Currently Showing" link={ '/currently-showing' } />
        <MovieList route={ routeCurrently } />
      </div>
      <div className="gap-[10px] px-[118px] py-[20px] w-full">
        <ContentLabel title="Upcoming Movies" />
        <MovieList route={ routeUpcoming } />
      </div>
      <div className="gap-[10px] px-[118px] py-[20px] w-full">
        <ContentLabel title="Venues" />
        <VenueList route={ routeVenues } />
      </div>
    </div>
  )
}

const ContentLabel = ({ className, title, link }) => {
  return (
    <div className={ createClassName("flex justify-between items-center", className) }>
      <p className="font-bold text-[32px]/[40px] tracking-[0.0075em]">{ title }</p>
      <Link to={ link } className="text-primary-600 text-[16px]/[24px] font-semibold tracking-[0.015em] cursor-pointer" >See all</Link>
    </div>
  )
}

export default Home;
