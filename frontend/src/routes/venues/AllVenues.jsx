import { useState, useEffect } from "react";
import { Link, useLocation, useNavigate, useSearchParams } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass, faLocationPin, faChevronDown } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import VenueCard from "../../components/card/VenueCard"
import Label from "../../components/Label";
import { LabeledDropdown, DropdownItem } from "../../components/Dropdown";
import { url, venues, cities } from "../../utils/api";
import Button from "../../components/Button";
import { Input } from "../../components/Input";

import { getFilterParams, getPaginationParams, handleFilterChange, handlePageChange } from "../../utils/utils";


const AllVenues = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const [venueList, setVenueList] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [postsPerPage] = useState(6);
    const [maxPages, setMaxPages] = useState(1);
    const [totalPosts, setTotalPosts] = useState(0);
    const [searchParams, setSearchParams] = useSearchParams();
    const [cityList, setCityList] = useState([]);

    const [pagination, setPagination] = useState({ page: 1, size: 4 });

    const [filterParams, setFilterParams] = useState({ city: null })


    const getCities = () => {
        axios.get(`${url}${cities}`)
            .then(response => {
                setCityList(response.data)
            }).catch(error => {
                {
                    console.log(error)
                    console.warning(error.response.data.message)
                }
            })
    }

    const fetchResults = async () => {
        try {
            const response = await axios.get(url + venues + "?page=" + currentPage + "&size=" + postsPerPage);
            if (currentPage > 1)
                setVenueList(pre => [...pre, ...response.data.content]);
            else {
                setTotalPosts(response.data.totalElements);
                setMaxPages(response.data.totalPages);
                setVenueList(response.data.content);
            }
        } catch (err) {
            console.log(err);
        }
    };

    const loadVenues = async () => {
        let route = url + venues + "/search";
        const search = searchParams.size > 0 ? decodeURIComponent(`?${searchParams}`) : ''
        const pagination = getPaginationParams(searchParams)
        setPagination(pagination)
        axios.get(`${route}${search}`)
            .then(response => {
                if (parseInt(pagination.page) > 1)
                    setVenueList(pre => [...pre, ...response.data.content])
                else {
                    setTotalPosts(response.data.totalElements);
                    setMaxPages(response.data.totalPages);
                    setVenueList(response.data.content);
                }
            })
            .catch(error => {
                console.log(error)
                console.warning(error.response.data.message)
            })
    }

    const [focused, setFocused] = useState(false)
    const onFocus = () => setFocused(true)
    const onBlur = () => setFocused(false)

    function handleSearchChange(event) {
        if (event.target.value.length >= 3) {
            handleFilterChange(searchParams, setSearchParams, 'contains', event.target.value);
        }
        else {
            handleFilterChange(searchParams, setSearchParams, 'contains', null);
        }
    }

    function _handleFilterChange(field, value) {
        _handlePageChange()
        handleFilterChange(searchParams, setSearchParams, field, value);
    }

    function _handlePageChange(page) {
        handlePageChange(searchParams, setSearchParams, { page: page });
    }

    /* useEffect(() => {
         fetchResults();
     }, [currentPage]);*/

    useEffect(() => {
        const filterParams = getFilterParams(searchParams)
        setFilterParams(filterParams)
        loadVenues();
    }, [searchParams])

    useEffect(() => {
        _handlePageChange()

        const pagination = getPaginationParams(searchParams)
        setPagination(pagination)

        getCities()
    }, [])

    function getCityName(id) {
        return cityList?.find(c => c.cityId.toString() === id)?.name
    }

    const cityLabel = (
        <Label
            leftIcon={ <FontAwesomeIcon className="w-5 h-5 mr-8" icon={ faLocationPin } /> }
            rightIcon={ <FontAwesomeIcon className="w-5 h-5" icon={ faChevronDown } /> }
        >
            { getCityName(filterParams.city) || "City" }
        </Label>
    )

    return (
        <div className="px-[118px] py-16 font-body">
            <p className="text-heading-h4 text-neutral-800 py-24">Venues ({ totalPosts })</p>
            <div className="grid grid-cols-5 gap-12 pb-8">
                <Label
                    className="col-span-4"
                    value={ filterParams.contains }
                    active={ focused }
                    leftIcon={ <FontAwesomeIcon icon={ faMagnifyingGlass } /> }
                >
                    <Input
                        text="Search Venues"
                        onChange={ handleSearchChange }
                        onFocus={ onFocus }
                        onBlur={ onBlur }
                    />
                </Label>
                <LabeledDropdown
                    value={ getCityName(filterParams.city) }
                    label={ cityLabel }
                >
                    <DropdownItem
                        onClick={ () => _handleFilterChange('city', null) }
                        className={ `${filterParams.city === null ? "font-semibold" : "font-normal"}` }
                    >
                        All cities
                    </DropdownItem>
                    { cityList.map((city, index) => {
                        return (
                            <DropdownItem
                                key={ index }
                                onClick={ () => { _handleFilterChange('city', city.cityId); _handlePageChange() } }
                                className={ `flex hover:bg-neutral-100 rounded-8 px-12 py-8 cursor-pointer ${city.cityId === parseInt(filterParams.city) ? "font-semibold" : "font-normal"}` }
                            >
                                { city.name }
                            </DropdownItem>
                        )
                    }) }
                </LabeledDropdown>
            </div>
            <div className="grid gap-12 py-8 lg:grid-cols-2 sm:grid-cols-1">
                { venueList.map((item, index) => {
                    return (
                        <Link key={ index } to={ `/venue-details/${item.venueId}` }>
                            <VenueCard
                                className="h-[367px] mb-8"
                                venue={ item }
                                onClick={ () => navigate('/admin-panel/add-venue', { state: { venue: item } }) }
                            />
                        </Link>
                    );
                }) }
            </div>
            <div className="flex items-center justify-center pb-40">
                { pagination.page < maxPages &&
                    <Button variant="tertiary" onClick={ () => _handlePageChange(parseInt(pagination.page) + 1) }>Load More</Button>
                }
            </div>
        </div>
    );
}

export default AllVenues;
