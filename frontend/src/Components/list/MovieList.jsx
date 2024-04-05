import { useState } from "react";
import MovieCard from "../card/MovieCard";
import { useEffect } from "react";
import axios from "axios";
import List from "../List";

const MovieList = () => {
    const [data, setMovies] = useState([]);
    const [loading, setLoading] = useState(false);
    const [currentPage, setCurrentPage] = useState(0);
    const [postsPerPage] = useState(4);
    const [maxPages, setMaxPages] = useState(0);
    const [totalPosts, setTotalPosts] = useState(0);

    const fetchResults = async () => {
        setLoading(true);
        try {
            const response = await axios.get("http://localhost:8080/api/movies/currently" + "?page=" + currentPage + "&size=" + postsPerPage);
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
        <List>
            { data.map((item, index) => {
                return <MovieCard key={ index } movie={ item } photos={ item.photos } />

            }) }
        </List>
    )
}

export default MovieList;
