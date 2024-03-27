import { useState } from "react";
import Card from "./Card";
import VenueCard from "./VenueCard";
import { useEffect } from "react";
import axios from "axios";
import Pagination from "./Pagination";

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
          const response = await axios.get(route + currentPage + "/"+ postsPerPage); 
          setMovies(response.data.content);
          setTotalPosts(response.data.totalElements)
          setMaxPages(response.data.totalPages)
          console.log(response.data)
          //console.log(response.data.totalElements)
        } catch (err) {
          console.log(err);
        }
        setLoading(false);

      };

  

    useEffect(() => {
    fetchResults();   
  }, [currentPage])


  // Change page
  const paginateFront = () => {
    setCurrentPage(prev => prev + 1);
  }
  const paginateBack = () => {
    setCurrentPage(prev => prev - 1);
  }

    return (
        <div className="pb-5">
        <div className="flex gap-2.5 py-10 items-center justify-center ">
        
                {data.map((item, index) => ( 
                movies ? <Card key={index} movie={item} photos={item.photos}/> : <VenueCard key={index} venue={item} />

      ))}
        </div>

      <Pagination
        postsPerPage={postsPerPage}
        totalPosts={totalPosts}
        paginateBack={paginateBack}
        paginateFront={paginateFront}
        currentPage={currentPage}
        maxPages={maxPages}

        
      />
            
        </div>
    )
}

export default Carousel;