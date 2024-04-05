import { useState } from "react";
import { useEffect } from "react";
import VenueCard from "../card/VenueCard";
import axios from "axios";
import { CustomList, CustomListItem } from "../List";

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
        <CustomList postsPerPage={ postsPerPage } totalPosts={ totalPosts } paginateBack={ paginateBack } paginateFront={ paginateFront } currentPage={ currentPage } maxPages={ maxPages }>
            { venues.map((item, index) => {
                return <VenueCard key={ index } venue={ item } />
            }) }
        </CustomList>
    )
}

export default VenueList;
