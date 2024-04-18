import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { fas } from '@fortawesome/free-solid-svg-icons'
import axios from "axios";
import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { useNavigate } from "react-router-dom"
import { format } from "date-fns";

import { Dropdown, DropdownItem } from "../../components/Dropdown";
import CurrentlyShowingCard from "../../components/card/CurrentlyShowingCard";
import Input from "../../components/Input";
import DateCard from "../../components/card/DateCard";
import Button from "../../components/Button";
import Card from "../../components/Card";
import Label from "../../components/Label";

import { url, movies, venues, genres, cities, searchCurrently } from "../../utils/api";

const CurrentlyShowing = () => {
    const navigate = useNavigate();
    const [searchParams, setSearchParams] = useSearchParams();
    const [cityList, setCityList] = useState([]);
    const [genreList, setGenreList] = useState([]);
    const [times, setTimes] = useState([]);
    const [venueList, setVenueList] = useState([]);
    const [movieList, setMovieList] = useState([]);
    const [dates, setDates] = useState([])
    const [currentPage, setCurrentPage] = useState(1);
    const [postsPerPage, setPostsPerPage] = useState(4);
    const [totalPages, setTotalPages] = useState(2);
    const [cityValue, setCityValue] = useState(null);
    const [genreValue, setGenreValue] = useState(null);
    const [timeValue, setTimeValue] = useState(null);
    const [venueValue, setVenueValue] = useState(null);
    const [containsValue, setContainsValue] = useState(null);
    const [dateValue, setDateValue] = useState(new Date());
    const dateParam = searchParams.get('startDate');
    const containsParam = searchParams.get('contains');
    const citiesParam = searchParams.get('city');
    const venuesParams = searchParams.get('venue');
    const genresParams = searchParams.get('genres');
    const timesParams = searchParams.get('times');
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

    const getGenres = async () => {
        try {
            let response = await axios.get(url + genres)
            setGenreList(response.data)
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
            let response = await axios.get(url + cities)
            setCityList(response.data)
            if (citiesParam) {
                const city = response.data.find(item => item.cityId === parseInt(citiesParam));
                setCityValue(city)
            }
        } catch (error) {
            console.log(error)
            console.warning(error.response.data.message)
        }
    }

    const getTimes = async () => {
        try {
            const array = []
            for (let i = 10; i <= 22; i += 1) {
                array.push({
                    id: i + ":" + "00",
                    name: i + ":" + "00",
                },
                    {
                        id: i + ":" + "30",
                        name: i + ":" + "30",
                    }
                )
            }
            console.log(array)
            setTimes(array)
            if (timesParams) {
                const time = array.find(item => item.id + ":00" === decodeURIComponent(timesParams));
                setTimeValue(time)
            }
        } catch (error) {
            console.log(error)
            console.warning(error.response.data.message)
        }
    }

    const getDates = () => {
        let date = new Date();
        setDateValue(date)
        let array = [];
        for (let i = 0; i < 10; i++) {
            array.push(date)
            date = new Date(new Date(date).setDate(date.getDate() + 1));
        }
        setDates(array)
        if (dateParam) setDateValue(new Date(dateParam + "T00:00:00"))
    }

    const getVenues = async () => {
        try {
            let response;
            if (cityValue) response = await axios.get(url + venues + "/city/" + cityValue.cityId)
            else response = await axios.get(url + venues + "/all")
            setVenueList(response.data)
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
        let route = url + movies + searchCurrently + "?";
        if (dateValue) route = route.concat("startDate=" + format(dateValue, "yyyy-MM-dd"))
        if (containsValue) route = route.concat("&contains=" + containsValue)
        if (cityValue) route = route.concat("&city=" + cityValue.cityId)
        if (venueValue) route = route.concat("&venue=" + venueValue.venueId)
        if (genreValue) route = route.concat("&genres=" + genreValue.id)
        if (timeValue) route = route.concat("&times=" + timeValue.id + ":00")
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
        if (dateValue) newSearchParams.append('startDate', format(dateValue, "yyyy-MM-dd"))
        if (containsValue) newSearchParams.append('contains', containsValue)
        if (cityValue) newSearchParams.append('city', cityValue.cityId)
        if (venueValue) newSearchParams.append('venue', venueValue.venueId)
        if (genreValue) newSearchParams.append('genres', genreValue.id)
        if (timeValue) newSearchParams.append('times', timeValue.id + ':00')
        setSearchParams(newSearchParams);
    };

    useEffect(() => {
        setCurrentPage(1);
        loadMovies();
        updateSearchParams();
    }, [containsValue, dateValue, cityValue, venueValue, genreValue, timeValue])

    useEffect(() => {
        loadMovies();
    }, [currentPage])

    useEffect(() => {
        getVenues()
    }, [cityValue])

    useEffect(() => {
        getVenues()
        getTimes()
        getCities()
        getGenres()
        getDates()
        if (containsParam && containsParam.length >= 3) setContainsValue(containsParam);
    }, [])

    const citiesLabel = (
        <Label
            placeholder="All cities"
            leftIcon={ <FontAwesomeIcon className="w-5 h-5" icon={ fas.faLocationPin } /> }
            rightIcon={ <FontAwesomeIcon className="w-5 h-5" icon={ fas.faChevronDown } /> } />
    )

    const venuesLabel = (
        <Label
            placeholder="All venues"
            leftIcon={ <FontAwesomeIcon className="w-5 h-5" icon={ fas.faLocationPin } /> }
            rightIcon={ <FontAwesomeIcon className="w-5 h-5" icon={ fas.faChevronDown } /> }

        />
    )

    const genreLabel = (
        <Label
            placeholder="All genres"
            leftIcon={ <FontAwesomeIcon className="w-5 h-5" icon={ fas.faFilm } /> }
            rightIcon={ <FontAwesomeIcon className="w-5 h-5" icon={ fas.faChevronDown } /> }
        />
    )

    const timesLabel = (
        <Label
            placeholder="All times"
            leftIcon={ <FontAwesomeIcon className="w-5 h-5" icon={ fas.faClock } /> }
            rightIcon={ <FontAwesomeIcon className="w-5 h-5" icon={ fas.faChevronDown } /> }
        />
    )

    return (
        <div className="font-body px-[118px] pt-40">
            <p className="text-neutral-800 text-heading-h4 pb-24">Currently Showing ({ movieList?.length })</p>
            <Input
                text="Search movies"
                open={ focused }
                placeholder={ containsValue }
                leftIcon={ <FontAwesomeIcon className="w-5 h-5" icon={ fas.faMagnifyingGlass } /> }
                className="w-full"
                onChange={ handleChange }
                onFocus={ onFocus }
                onBlur={ onBlur }
            />
            <div className="grid lg:grid-cols-4 md:grid-cols-2 py-[18px] gap-8">
                <Dropdown label={ citiesLabel } value={ cityValue?.name }>
                    <DropdownItem
                        onClick={ () => { setCityValue(null) } }
                        className={ `${cityValue === null ? "font-semibold" : "font-normal"}` }
                    >
                        All cities
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
                <Dropdown label={ venuesLabel } value={ venueValue?.name }>
                    <DropdownItem
                        onClick={ () => { setVenueValue(null) } }
                        className={ `${venueValue === null ? "font-semibold" : "font-normal"}` }
                    >
                        All venues
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
                        All genres
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
                <Dropdown label={ timesLabel } value={ timeValue?.name }>
                    <DropdownItem
                        onClick={ () => { setTimeValue(null) } }
                        className={ `${timeValue === null ? "font-semibold" : "font-normal"}` }
                    >
                        All times
                    </DropdownItem>
                    { times.map((time, index) => {
                        return (
                            <DropdownItem
                                key={ index }
                                onClick={ () => { setTimeValue(time) } }
                                className={ `${time === timeValue ? "font-semibold" : "font-normal"}` }
                            >
                                { time.name }
                            </DropdownItem>
                        )
                    }) }
                </Dropdown>
            </div >
            <div className="grid lg:grid-cols-10 md:grid-cols-5 sm:grid-cols-3 gap-16 pb-[20px]">
                {
                    dates.map((date, index) => {
                        return (
                            <DateCard
                                value={ dateValue }
                                key={ index }
                                date={ date }
                                className={ `${date.getDate() === dateValue.getDate() && date.getMonth() === dateValue.getMonth() ? "!bg-primary-600 !text-neutral-0" : "bg-neutral-0 text-neutral-800"} cursor-pointer` }
                                onClick={ () => { setDateValue(date) } }
                            />
                        )
                    })
                }
            </div>
            <p className="text-body-m font-normal italic text-neutral-500">Quick reminder that our cinema schedule is on a ten-day update cycle.</p>

            <div>
                { movieList?.length != 0 ? movieList?.map((item, index) => {
                    return (
                        <CurrentlyShowingCard
                            key={ index }
                            movie={ item }
                            projections={ item.projections }
                            endDate={ item.projectionEnd }
                            photos={ item.photos }
                            genres={ item.genres }
                            className="my-[20px]"
                        />
                    )
                }) :
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
            </div>
            <div className="flex items-center justify-center pt-16 pb-32">
                { currentPage < totalPages &&
                    <Button variant="tertiary" onClick={ () => { setCurrentPage(currentPage + 1) } }>Load More</Button>
                }
            </div>
        </div >
    )
}

export default CurrentlyShowing;
