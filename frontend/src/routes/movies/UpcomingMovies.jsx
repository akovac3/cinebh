import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { fas } from '@fortawesome/free-solid-svg-icons'
import axios from "axios";
import { useState, useEffect } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";

import { Dropdown, DropdownItem } from "../../components/Dropdown";
import Input from "../../components/Input";
import Button from "../../components/Button";
import Card from "../../components/Card";
import MovieCard from "../../components/card/MovieCard";
import DateRangePicker from "../../components/DateRangePicker";

const UpcomingMovies = () => {
    const navigate = useNavigate();
    const [searchParams, setSearchParams] = useSearchParams();
    const [cities, setCities] = useState([]);
    const [genres, setGenres] = useState([]);
    const [venues, setVenues] = useState([]);
    const [movies, setMovies] = useState([]);
    const [currentPage, setCurrentPage] = useState(0);
    const [postsPerPage, setPostsPerPage] = useState(4);
    const [totalPages, setTotalPages] = useState(1);
    const [startDateValue, setStartDateValue] = useState(null);
    const [endDateValue, setEndDateValue] = useState(null);
    const [cityValue, setCityValue] = useState(null);
    const [genreValue, setGenreValue] = useState(null);
    const [venueValue, setVenueValue] = useState(null);
    const [nameLikeValue, setNameLikeValue] = useState(null);
    const citiesParam = searchParams.get('city');
    const venuesParams = searchParams.get('venue');
    const genresParams = searchParams.get('genres');
    const [focused, setFocused] = useState(false)
    const onFocus = () => setFocused(true)
    const onBlur = () => setFocused(false)

    function handleChange(event) {
        if (event.target.value.length >= 3) {
            setNameLikeValue(event.target.value)
        }
        else {
            setNameLikeValue(null)
        }
    }

    const getGenres = async () => {
        try {
            let response = await axios.get("http://localhost:8080/api/genres/")
            setGenres(response.data)
            if (genresParams) {
                const genre = response.data.find(item => item.id === parseInt(genresParams));
                setGenreValue(genre)
            }

        } catch (error) {
            console.log(error)
            console.warning(error.response.data.message)
        }
    }

    const getCities = async () => {
        try {
            let response = await axios.get("http://localhost:8080/api/cities/")
            setCities(response.data)
            if (citiesParam) {
                const city = response.data.find(item => item.cityId === parseInt(citiesParam));
                setCityValue(city)
            }
        } catch (error) {
            console.log(error)
            console.warning(error.response.data.message)
        }
    }

    const getVenues = async () => {
        try {
            let response;
            if (cityValue) response = await axios.get("http://localhost:8080/api/venues/city/" + cityValue.cityId)
            else response = await axios.get("http://localhost:8080/api/venues/all")
            setVenues(response.data)
            if (venuesParams) {
                const venue = response.data.find(item => item.venueId === parseInt(venuesParams));
                setVenueValue(venue)
            }
        } catch (error) {
            console.log(error)
            console.warning(error.response.data.message)
        }
    }

    const loadMovies = async () => {
        let route = "http://localhost:8080/api/movies/upcoming?";
        if (startDateValue) {
            let startMonth = startDateValue.getMonth() + 1;
            route = route.concat("startDate=" + startDateValue.getFullYear() + "-" + startMonth + "-" + startDateValue.getDate())
        }
        if (endDateValue) {
            let endMonth = endDateValue.getMonth() + 1;
            route = route.concat("&endDate=" + endDateValue.getFullYear() + "-" + endMonth + "-" + endDateValue.getDate())
        }
        if (nameLikeValue) route = route.concat("&nameLike=" + nameLikeValue)
        if (cityValue) route = route.concat("&city=" + cityValue.cityId)
        if (venueValue) route = route.concat("&venue=" + venueValue.venueId)
        if (genreValue) route = route.concat("&genres=" + genreValue.id)
        route = route.concat("&page=" + currentPage + "&size=" + postsPerPage)
        try {
            const response = await axios.get(route)
            if (currentPage > 0)
                setMovies(pre => [...pre, ...response.data.content])
            else setMovies(response.data.content)
            setTotalPages(response.data.totalPages)
        } catch (err) {
            console.log(err);
        }
    }

    const updateSearchParams = () => {
        const newSearchParams = new URLSearchParams();

        if (cityValue) newSearchParams.append('city', cityValue.cityId)
        if (venueValue) newSearchParams.append('venue', venueValue.venueId)
        if (genreValue) newSearchParams.append('genres', genreValue.id)
        setSearchParams(newSearchParams);
    };

    const loadVenues = async () => {
        try {
            setVenueValue(null)
            if (cityValue) {
                const response = await axios.get("http://localhost:8080/api/venues/city/" + cityValue.cityId)
                setVenues(response.data)
            } else {
                const response = await axios.get("http://localhost:8080/api/venues/all")
                setVenues(response.data)
            }
        } catch (error) {
            console.log(error)
            console.warning(error.response.data.message)
        }
    }

    useEffect(() => {
        setCurrentPage(0);
        loadMovies();
        updateSearchParams();
    }, [nameLikeValue, cityValue, venueValue, genreValue, endDateValue])

    useEffect(() => {
        loadMovies();
    }, [currentPage])

    useEffect(() => {
        loadVenues()
    }, [cityValue])

    useEffect(() => {
        getVenues()
        getCities()
        getGenres()
    }, [])

    return (
        <div className="font-body px-[118px] pt-40">
            <p className="text-neutral-800 text-heading-h4 pb-32">Upcoming Movies ({ movies.length })</p>
            <Input text="Search movies" open={ focused } leftIcon={ <FontAwesomeIcon className="w-5 h-5" icon={ fas.faMagnifyingGlass } /> } className="w-full" onChange={ handleChange } onFocus={ onFocus } onBlur={ onBlur }></Input>
            <div className="grid grid-cols-4 pt-16 pb-32 gap-8">
                <Dropdown placeholder="All cities" value={ cityValue } options={ cities } leftIcon={ <FontAwesomeIcon className="w-5 h-5" icon={ fas.faLocationPin } /> } rightIcon={ <FontAwesomeIcon className="w-5 h-5" icon={ fas.faChevronDown } /> } >
                    <div> <DropdownItem> <div onClick={
                        () => {
                            setCityValue(null)
                        }
                    } className={ `flex hover:bg-neutral-100 rounded-8 px-12 py-8 cursor-pointer ${cityValue === null ? "font-semibold" : "font-normal"}` }>
                        All cities
                    </div> </DropdownItem>
                        { cities.map((city, index) => {
                            return (
                                <DropdownItem key={ index }>
                                    <div onClick={
                                        () => {
                                            setCityValue(city)
                                        }
                                    } key={ index } className={ `flex hover:bg-neutral-100 rounded-8 px-12 py-8 cursor-pointer ${city === cityValue ? "font-semibold" : "font-normal"}` }>
                                        { city.name }
                                    </div>
                                </DropdownItem>
                            )
                        }) }</div>
                </Dropdown>
                <Dropdown placeholder="All venues" value={ venueValue } leftIcon={ <FontAwesomeIcon className="w-5 h-5" icon={ fas.faBuilding } /> } rightIcon={ <FontAwesomeIcon className="w-5 h-5" icon={ fas.faChevronDown } /> } >                    <div> <DropdownItem> <div onClick={
                    () => {
                        setVenueValue(null)
                    }
                } className={ `flex hover:bg-neutral-100 rounded-8 px-12 py-8 cursor-pointer ${venueValue === null ? "font-semibold" : "font-normal"}` }>
                    All venues
                </div> </DropdownItem>
                    { venues.map((venue, index) => {
                        return (
                            <DropdownItem key={ index }>
                                <div onClick={
                                    () => {
                                        setVenueValue(venue)
                                    }
                                } key={ index } className={ `flex hover:bg-neutral-100 rounded-8 px-12 py-8 cursor-pointer ${venue === venueValue ? "font-semibold" : "font-normal"}` }>
                                    { venue.name }
                                </div>
                            </DropdownItem>
                        )
                    }) }</div>
                </Dropdown>
                <Dropdown placeholder="All genres" value={ genreValue } leftIcon={ <FontAwesomeIcon className="w-5 h-5" icon={ fas.faFilm } /> } rightIcon={ <FontAwesomeIcon className="w-5 h-5" icon={ fas.faChevronDown } /> } >
                    <div> <DropdownItem> <div onClick={
                        () => {
                            setGenreValue(null)
                        }
                    } className={ `flex hover:bg-neutral-100 rounded-8 px-12 py-8 cursor-pointer ${genreValue === null ? "font-semibold" : "font-normal"}` }>
                        All genres
                    </div> </DropdownItem>
                        { genres.map((genre, index) => {
                            return (
                                <DropdownItem key={ index }>
                                    <div onClick={
                                        () => {
                                            setGenreValue(genre)
                                        }
                                    } key={ index } className={ `flex hover:bg-neutral-100 rounded-8 px-12 py-8 cursor-pointer ${genre === genreValue ? "font-semibold" : "font-normal"}` }>
                                        { genre.name }
                                    </div>
                                </DropdownItem>
                            )
                        }) }</div>
                </Dropdown>
                <DateRangePicker placeholder="Date Range" start={ startDateValue } end={ endDateValue } leftIcon={ <FontAwesomeIcon className="w-5 h-5" icon={ fas.faCalendarDays } /> } rightIcon={ <FontAwesomeIcon className="w-5 h-5" icon={ fas.faChevronDown } /> }
                    onClickApply={
                        (valueStart, valueEnd) => {
                            setStartDateValue(valueStart)
                            setEndDateValue(valueEnd)
                            console.log(valueStart)
                        }
                    }
                    onClickCancel={
                        () => {
                            setStartDateValue(null)
                            setEndDateValue(null)
                        }
                    }
                />

            </div>
            { movies.length != 0 ?
                <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-16">
                    { movies.map((item, index) => {
                        return <MovieCard key={ index } movie={ item } upcoming endDate={ item.projectionEnd } photos={ item.photos } />
                    }) }
                </div> :
                <Card className="flex justify-center items-center shadow-light-50 mt-12 mb-32">
                    <div className="text-neutral-600 w-[55%] flex flex-col justify-center items-center text-body-l">
                        <FontAwesomeIcon className="w-64 h-64" icon={ fas.faFilm } />
                        <p className="font-semibold text-neutral-800 pt-32 pb-12">No movies to preview for current date</p>
                        <div className="font-normal text-center pb-24">We are working on updating our schedule for upcoming movies.
                            Stay tuned for amazing movie experience or explore our other exciting cinema features in the meantime!</div>
                        <Button variant="tertiary" onClick={ () => { navigate('/upcoming') } }>Explore Upcoming Movies</Button>
                    </div>
                </Card> }
            <div className="flex items-center justify-center pt-16 pb-32">
                { currentPage < (totalPages - 1) &&
                    <Button variant="tertiary" onClick={ () => { setCurrentPage(currentPage + 1) } }>Load More</Button>
                }
            </div>
        </div>
    )
}

export default UpcomingMovies;
