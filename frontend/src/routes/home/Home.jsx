import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import CoverCarousel from "../../components/carousel/CoverCarousel"
import VenueCarousel from "../../components/carousel/VenueCarousel";
import MovieList from "../list/MovieList";
import VenueList from "../list/VenueList";

import { createClassName } from "../../utils/utils";
import { url, movies, venues, currently, upcoming } from "../../utils/api";

const Home = () => {
  const routeCurrently = url + movies + currently;
  const routeUpcoming = url + movies + upcoming;
  const routeVenueList = url + venues;
  const [coverMovies, setCoverMovies] = useState([]);
  const [venueList, setVenueList] = useState([]);

  const loadMovies = async (page, size) => {
    await axios.get(routeCurrently + "?page=" + page + "&size=" + size).then((res) =>
      setCoverMovies(res.data.content)).catch((err) => console.log(err))
  }

  const loadVenueList = async () => {
    try {
      const response = await axios.get(routeVenueList + "/all");
      setVenueList(response.data);
    } catch (err) {
      console.log(err);
    }
  }

  useEffect(() => {
    loadMovies(1, 3);
    loadVenueList();
  }, [])

  return (
    <div className="bg-neutral-25 text-neutral-800 flex flex-col items-start justify-start pb-40 font-body">
      <div className="w-full h-[730px]">
        <CoverCarousel movies={ coverMovies } />
      </div>
      <div className="w-full h-[164px]">
        <VenueCarousel venues={ venueList } />
      </div>
      <div className="gap-[10px] px-[118px] py-[20px] w-full">
        <ContentLabel title="Currently Showing" link={ '/currently-showing' } />
        <MovieList route={ routeCurrently } />
      </div>
      <div className="gap-[10px] px-[118px] py-[20px] w-full">
        <ContentLabel title="Upcoming Movies" link={ '/upcoming-movies' } />
        <MovieList route={ routeUpcoming } />
      </div>
      <div className="gap-[10px] px-[118px] py-[20px] w-full">
        <ContentLabel title="Venues" link={ '/venues' } />
        <VenueList route={ routeVenueList } />
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
