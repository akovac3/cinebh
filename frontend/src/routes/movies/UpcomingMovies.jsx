import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { fas } from '@fortawesome/free-solid-svg-icons'
import axios from "axios";
import { format } from "date-fns";
import { useState, useEffect } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";

import { Dropdown, DropdownItem } from "../../components/Dropdown";
import Label from "../../components/Label";
import Input from "../../components/Input";
import Button from "../../components/Button";
import Card from "../../components/Card";
import MovieCard from "../../components/card/MovieCard";
import DateRangePicker from "../../components/DateRangePicker";

import { url, movies, venues, genres, cities, searchUpcoming } from "../../utils/api";


const UpcomingmovieList = () => {
    const navigate = useNavigate();
    const [searchParams, setSearchParams] = useSearchParams();
    const [cityList, setCityList] = useState([]);
    const [genreList, setGenreList] = useState([]);
    const [venueList, setVenueList] = useState([]);
    const [movieList, setMovieList] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [postsPerPage, setPostsPerPage] = useState(4);
    const [totalPages, setTotalPages] = useState(1);
    const [startDateValue, setStartDateValue] = useState(null);
    const [endDateValue, setEndDateValue] = useState(null);
    const [cityValue, setCityValue] = useState(null);
    const [genreValue, setGenreValue] = useState(null);
    const [venueValue, setVenueValue] = useState(null);
    const [containsValue, setContainsValue] = useState(null);
    const cityListParam = searchParams.get('city');
    const venueListParams = searchParams.get('venue');
    const genreListParams = searchParams.get('genreList');
    const startDateParam = searchParams.get('startDate');
    const endDateParam = searchParams.get('endDate');
    const [focused, setFocused] = useState(false)
    const onFocus = () => setFocused(true)
    const onBlur = () => setFocused(false)

    function handleChange(event) {
        if (event.target.value.length >= 3) {
            setContainsValue(event.target.value)
        }
        else {
            setContainsValue(null)
        }
    }

    const getGenreList = async () => {
        try {
            let response = await axios.get(url + genres)
            setGenreList(response.data)
            if (genreListParams) {
                const genre = response.data.find(item => item.id === parseInt(genreListParams));
                setGenreValue(genre)
            }

        } catch (error) {
            console.log(error)
            console.warning(error.response.data.message)
        }
    }

    const getCityList = async () => {
        try {
            let response = await axios.get(url + cities)
            setCityList(response.data)
            if (cityListParam) {
                const city = response.data.find(item => item.cityId === parseInt(cityListParam));
                setCityValue(city)
            }
        } catch (error) {
            console.log(error)
            console.warning(error.response.data.message)
        }
    }

    const getVenueList = async () => {
        try {
            let response;
            if (cityValue) response = await axios.get(url + venues + "/city/" + cityValue.cityId)
            else response = await axios.get(url + venues + "/all")
            setVenueList(response.data)
            if (venueListParams) {
                const venue = response.data.find(item => item.venueId === parseInt(venuesParams));
                setVenueValue(venue)
            }
        } catch (error) {
            console.log(error)
            console.warning(error.response.data.message)
        }
    }

    const loadMovieList = async () => {
        let route = url + movies + searchUpcoming + "?";
        if (startDateValue) {
            route = route.concat("startDate=" + format(startDateValue, "yyyy-MM-dd") + "&endDate=" + format(endDateValue, "yyyy-MM-dd"))
        }
        if (containsValue) route = route.concat("&contains=" + containsValue)
        if (cityValue) route = route.concat("&city=" + cityValue.cityId)
        if (venueValue) route = route.concat("&venue=" + venueValue.venueId)
        if (genreValue) route = route.concat("&genreList=" + genreValue.id)
        route = route.concat("&page=" + currentPage + "&size=" + postsPerPage)
        try {
            const response = await axios.get(route)
            if (currentPage > 1)
                setMovieList(pre => [...pre, ...response.data.content])
            else setMovieList(response.data.content)
            setTotalPages(response.data.totalPages)
        } catch (err) {
            console.log(err);
        }
    }

    const updateSearchParams = () => {
        const newSearchParams = new URLSearchParams();

        if (cityValue) newSearchParams.append('city', cityValue.cityId)
        if (venueValue) newSearchParams.append('venue', venueValue.venueId)
        if (genreValue) newSearchParams.append('genreList', genreValue.id)
        if (containsValue) newSearchParams.append('contains', containsValue)
        if (startDateValue) {
            newSearchParams.append('startDate', format(startDateValue, "yyyy-MM-dd"))
            newSearchParams.append('endDate', format(endDateValue, "yyyy-MM-dd"))
        }
        setSearchParams(newSearchParams);
    };

    useEffect(() => {
        setCurrentPage(1);
        loadMovieList();
        updateSearchParams();
    }, [containsValue, cityValue, venueValue, genreValue, startDateValue])

    useEffect(() => {
        loadMovieList();
    }, [currentPage])

    useEffect(() => {
        getVenueList()
    }, [cityValue])

    useEffect(() => {
        getCityList()
        getGenreList()
        if (startDateParam) setStartDateValue(new Date(startDateParam))
        if (endDateParam) setEndDateValue(new Date(endDateParam))
    }, [])

    const cityListLabel = (
        <Label
            placeholder="All Cities"
            leftIcon={ <FontAwesomeIcon className="w-5 h-5" icon={ fas.faLocationPin } /> }
            rightIcon={ <FontAwesomeIcon className="w-5 h-5" icon={ fas.faChevronDown } /> } />
    )

    const venueListLabel = (
        <Label
            placeholder="All Venues"
            leftIcon={ <FontAwesomeIcon className="w-5 h-5" icon={ fas.faLocationPin } /> }
            rightIcon={ <FontAwesomeIcon className="w-5 h-5" icon={ fas.faChevronDown } /> }
        />
    )

    const genreLabel = (
        <Label
            placeholder="All Genres"
            leftIcon={ <FontAwesomeIcon className="w-5 h-5" icon={ fas.faFilm } /> }
            rightIcon={ <FontAwesomeIcon className="w-5 h-5" icon={ fas.faChevronDown } /> }
        />
    )

    const dateRangeLabel = (
        <Label
            placeholder="Date Range"
            leftIcon={ <FontAwesomeIcon className="w-5 h-5" icon={ fas.faCalendarDays } /> }
            rightIcon={ <FontAwesomeIcon className="w-5 h-5" icon={ fas.faChevronDown } /> }
        />
    )

    return (
        <div className="font-body px-[118px] pt-40">
            <p className="text-neutral-800 text-heading-h4 pb-32">Upcoming Movies ({ movieList.length })</p>
            <Input
                text="Search Movies"
                open={ focused }
                placeholder={ containsValue }
                leftIcon={ <FontAwesomeIcon className="w-5 h-5" icon={ fas.faMagnifyingGlass } /> }
                className="w-full"
                onChange={ handleChange }
                onFocus={ onFocus }
                onBlur={ onBlur }
            />
            <div className="grid grid-cols-4 pt-16 pb-32 gap-8">
                <Dropdown
                    label={ cityListLabel }
                    value={ cityValue?.name } >
                    <DropdownItem onClick={ () => { setCityValue(null) } }
                        className={ `${cityValue === null ? "font-semibold" : "font-normal"}` }
                    >
                        All Cities
                    </DropdownItem>
                    { cityList.map((city, index) => {
                        return (
                            <DropdownItem
                                key={ index }
                                onClick={ () => { setCityValue(city) } }
                                className={ `flex hover:bg-neutral-100 rounded-8 px-12 py-8 cursor-pointer ${city === cityValue ? "font-semibold" : "font-normal"}` }
                            >
                                { city.name }
                            </DropdownItem>
                        )
                    }) }
                </Dropdown>
                <Dropdown label={ venueListLabel } value={ venueValue?.name }>
                    <DropdownItem
                        onClick={ () => { setVenueValue(null) } }
                        className={ `${venueValue === null ? "font-semibold" : "font-normal"}` }
                    >
                        All Venues
                    </DropdownItem>
                    { venueList.map((venue, index) => {
                        return (
                            <DropdownItem
                                key={ index }
                                onClick={ () => { setVenueValue(venue) } }
                                className={ `${venue === venueValue ? "font-semibold" : "font-normal"}` }
                            >
                                { venue.name }
                            </DropdownItem>
                        )
                    }) }
                </Dropdown>
                <Dropdown label={ genreLabel } value={ genreValue?.name }>
                    <DropdownItem
                        onClick={ () => { setGenreValue(null) } }
                        className={ `${genreValue === null ? "font-semibold" : "font-normal"}` }
                    >
                        All Genres
                    </DropdownItem>
                    { genreList.map((genre, index) => {
                        return (
                            <DropdownItem
                                key={ index }
                                onClick={ () => { setGenreValue(genre) } }
                                className={ `${genre === genreValue ? "font-semibold" : "font-normal"}` }
                            >
                                { genre.name }
                            </DropdownItem>
                        )
                    }) }
                </Dropdown>
                <DateRangePicker
                    start={ startDateValue }
                    end={ endDateValue }
                    label={ dateRangeLabel }
                    onClickApply={
                        (valueStart, valueEnd) => {
                            setStartDateValue(valueStart)
                            setEndDateValue(valueEnd)
                        } }
                    onClickCancel={
                        () => {
                            setStartDateValue(null)
                            setEndDateValue(null)
                        } }
                />
            </div>
            { movieList.length != 0 ?
                <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-16">
                    { movieList.map((item, index) => {
                        return <MovieCard key={ index } movie={ item } upcoming endDate={ item.projectionEnd } photos={ item.photos } />
                    }) }
                </div> :
                <Card className="flex justify-center items-center shadow-light-50 mt-12 mb-32">
                    <div className="text-neutral-600 w-[55%] flex flex-col justify-center items-center py-64 text-body-l">
                        <FontAwesomeIcon className="w-64 h-64" icon={ fas.faFilm } />
                        <p className="font-semibold text-neutral-800 pt-32 pb-12">No movies to preview for current date</p>
                        <div className="font-normal text-center pb-24">We are working on updating our schedule for upcoming movies.
                            Stay tuned for amazing movie experience or explore our other exciting cinema features in the meantime!</div>
                        <Button variant="tertiary" onClick={ () => { navigate('/upcoming') } }>Explore Upcoming Movies</Button>
                    </div>
                </Card>
            }
            <div className="flex items-center justify-center pt-16 pb-32">
                { currentPage < totalPages &&
                    <Button variant="tertiary" onClick={ () => { setCurrentPage(currentPage + 1) } }>Load More</Button>
                }
            </div>
        </div>
    )
}

export default UpcomingmovieList;
