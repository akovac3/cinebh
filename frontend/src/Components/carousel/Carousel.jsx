import { useState } from "react";
import MovieCard from "../card/MovieCard";
import VenueCard from "../card/VenueCard";
import { useEffect } from "react";
import axios from "axios";
import Pagination from "../Pagination";

const Carousel = (props) => {

  const route = props.route;
  const movies = props.movies;
  const [data, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(0);
  const [postsPerPage] = useState(4);
  const [maxPages, setMaxPages] = useState(0);
  const [totalPosts, setTotalPosts] = useState(0);

  const fetchResults = async () => {
    setLoading(true);
    try {
      const response = await axios.get(route + "?page=" + currentPage + "&size=" + postsPerPage);
      setMovies(response.data.content);
      setTotalPosts(response.data.totalElements)
      setMaxPages(response.data.totalPages)
    } catch (err) {
      console.log(err);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchResults();
  }, [currentPage])

  const paginateFront = () => {
    setCurrentPage(prev => prev + 1);
  }
  const paginateBack = () => {
    setCurrentPage(prev => prev - 1);
  }

  return (
    <div className="pb-[20px]">
      <div className="flex gap-24 py-40 pr-[20px]">
        {data.map((item, index) => (
          movies ? <MovieCard key={index} movie={item} photos={item.photos} /> : <VenueCard key={index} venue={item} />))
        }
      </div>

      <Pagination
        postsPerPage={postsPerPage}
        totalPosts={totalPosts}
        paginateBack={paginateBack}
        paginateFront={paginateFront}
        currentPage={currentPage}
        maxPages={maxPages}
        className="pr-80" />
    </div>
  )
}

export default Carousel;
