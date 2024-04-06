import { useState } from "react";
import MovieCard from "../../components/card/MovieCard";
import { useEffect } from "react";
import axios from "axios";
import { List, ListItem } from "../../components/List";

const MovieList = (props) => {
    const route = props.route;
    const [data, setMovies] = useState([]);
    const [currentPage, setCurrentPage] = useState(0);
    const [postsPerPage] = useState(4);
    const [maxPages, setMaxPages] = useState(0);
    const [totalPosts, setTotalPosts] = useState(0);

    const fetchResults = async () => {
        try {
            const response = await axios.get(route + "?page=" + currentPage + "&size=" + postsPerPage);
            setMovies(response.data.content);
            setTotalPosts(response.data.totalElements)
            setMaxPages(response.data.totalPages)
        } catch (err) {
            console.log(err);
        }
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
        <List postsPerPage={ postsPerPage } totalPosts={ totalPosts } paginateBack={ paginateBack } paginateFront={ paginateFront } currentPage={ currentPage } maxPages={ maxPages }>
            { data.map((item, index) => {
                return <ListItem key={ index }>
                    <MovieCard key={ index } movie={ item } photos={ item.photos } />
                </ListItem>
            }) }
        </List>
    )
}

export default MovieList;
