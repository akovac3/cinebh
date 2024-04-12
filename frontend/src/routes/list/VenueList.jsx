import axios from "axios";
import { useState, useEffect } from "react";

import VenueCard from "../../components/card/VenueCard";
import { List, ListItem } from "../../components/List";

const VenueList = (props) => {
    const route = props.route;
    const [venues, setVenues] = useState([]);
    const [currentPage, setCurrentPage] = useState(0);
    const [postsPerPage] = useState(4);
    const [maxPages, setMaxPages] = useState(0);
    const [totalPosts, setTotalPosts] = useState(0);

    const fetchResults = async () => {
        try {
            const response = await axios.get(route + "?page=" + currentPage + "&size=" + postsPerPage);
            setVenues(response.data.content);
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
            { venues.map((item, index) => {
                return (
                    <ListItem key={ index }>
                        <VenueCard key={ index } venue={ item } />
                    </ListItem>
                )
            }) }
        </List>
    )
}

export default VenueList;
