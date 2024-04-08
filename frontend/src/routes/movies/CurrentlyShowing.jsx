import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { fas } from '@fortawesome/free-solid-svg-icons'
import axios from "axios";
import { useState, useEffect } from "react";
import { Dropdown, DropdownItem } from "../../components/Dropdown";
import MovieCard from "../../components/card/MovieCard";
import { useSearchParams } from "react-router-dom";
import Input from "../../components/Input";


const CurrentlyShowing = () => {
    const [searchParams, setSearchParams] = useSearchParams();
    const [cities, setCities] = useState([]);
    const [genres, setGenres] = useState([]);
    const [times, setTimes] = useState([]);
    const [venues, setVenues] = useState([]);
    const [movies, setMovies] = useState([])
    const [cityValue, setCityValue] = useState(null);
    const [genreValue, setGenreValue] = useState(null);
    const [timeValue, setTimeValue] = useState(null);
    const [venueValue, setVenueValue] = useState(null);
    const citiesParam = searchParams.get('cities');
    const venuesParams = searchParams.get('cinemas');
    const genresParams = searchParams.get('genres');
    const timesParams = searchParams.get('times');

    const getGenres = async () => {
        try {
            return await axios.get("http://localhost:8080/api/genres/")
        } catch (error) {
            console.log(error)
            console.warning(error.response.data.message)
        }
    }

    const getCities = async () => {
        try {
            return await axios.get("http://localhost:8080/api/cities/")
        } catch (error) {
            console.log(error)
            console.warning(error.response.data.message)
        }
    }

    const getTimes = async () => {
        try {
            return await axios.get("http://localhost:8080/api/projections/times")
        } catch (error) {
            console.log(error)
            console.warning(error.response.data.message)
        }
    }

    const getVenues = async () => {
        try {
            return await axios.get("http://localhost:8080/api/venues/all")
        } catch (error) {
            console.log(error)
            console.warning(error.response.data.message)
        }
    }

    const loadMovies = async () => {
        let route = "http://localhost:8080/api/movies/currently/?";
        if (cityValue) route = route.concat("cities=" + cityValue.cityId)
        if (venueValue) route = route.concat("&cinemas=" + venueValue.venueId)
        if (genreValue) route = route.concat("&genres=" + genreValue.id)
        if (timeValue) route = route.concat("&times=" + timeValue.id + ":00")

        try {
            const response = await axios.get(route)
            setMovies(response.data)
        } catch (err) {
            console.log(err);
        }
    }

    const updateSearchParams = () => {
        const newSearchParams = new URLSearchParams();

        if (cityValue) newSearchParams.append('cities', cityValue.cityId)
        if (venueValue) newSearchParams.append('cinemas', venueValue.venueId)
        if (genreValue) newSearchParams.append('genres', genreValue.id)
        if (timeValue) newSearchParams.append('times', timeValue.id + ':00')

        setSearchParams(newSearchParams);
    };

    useEffect(() => {
        async function fetchData() {
            try {
                const response = await getGenres()
                setGenres(response.data)
                const timeResponse = await getTimes()
                const array = []
                for (const t of timeResponse.data) {
                    array.push({
                        id: t,
                        name: t
                    })
                }
                setTimes(array)
                const cityResponse = await getCities()
                setCities(cityResponse.data)
                const venueResponse = await getVenues()
                setVenues(venueResponse.data)

                if (citiesParam) {
                    const city = cityResponse.data.find(item => item.cityId === parseInt(citiesParam));
                    setCityValue(city)
                }
                if (venuesParams) {
                    const venue = venueResponse.data.find(item => item.venueId === parseInt(venuesParams));
                    setVenueValue(venue)
                }
                if (genresParams) {
                    const genre = response.data.find(item => item.id === parseInt(genresParams));
                    setGenreValue(genre)
                }
                if (timesParams) {
                    const time = array.find(item => item.id + ":00" === decodeURIComponent(timesParams));
                    setTimeValue(time)
                }
            } catch (e) {
                console.error(e)
            }
        }
        fetchData()
    }, [])

    useEffect(() => {
        loadMovies();
        updateSearchParams();
    }, [cityValue, venueValue, genreValue, timeValue])


    return (
        <div className="font-body px-[118px] py-40">
            <p className="text-neutral-800 text-heading-h4 pb-32">Currently Showing (9)</p>
            <Input text="Search movies" leftIcon={ <FontAwesomeIcon className="w-5 h-5" icon={ fas.faMagnifyingGlass } /> } className="w-full"></Input>
            <div className="grid grid-cols-4 py-8 gap-8">
                <Dropdown placeholder="All cities" value={ cityValue } options={ cities } leftIcon={ <FontAwesomeIcon className="w-5 h-5" icon={ fas.faLocationPin } /> } rightIcon={ <FontAwesomeIcon className="w-5 h-5" icon={ fas.faChevronDown } /> } >
                    <div> <DropdownItem> <div onClick={
                        () => {
                            setCityValue(null)
                        }
                    } className={ `flex hover:bg-neutral-100 rounded-8 px-12 py-8 cursor-pointer ${cityValue === null ? "font-semibold" : "font-normal"}` }>
                        All cities
                    </div> </DropdownItem>
                        { cities.map((city, index) => {
                            return <DropdownItem key={ index }>
                                <div onClick={
                                    () => {
                                        setCityValue(city)
                                    }
                                } key={ index } className={ `flex hover:bg-neutral-100 rounded-8 px-12 py-8 cursor-pointer ${city === cityValue ? "font-semibold" : "font-normal"}` }>
                                    { city.name }
                                </div>
                            </DropdownItem>
                        }) }</div>
                </Dropdown>
                <Dropdown placeholder="All venues" value={ venueValue } leftIcon={ <FontAwesomeIcon className="w-5 h-5" icon={ fas.faLocationPin } /> } rightIcon={ <FontAwesomeIcon className="w-5 h-5" icon={ fas.faChevronDown } /> } >                    <div> <DropdownItem> <div onClick={
                    () => {
                        setVenueValue(null)
                    }
                } className={ `flex hover:bg-neutral-100 rounded-8 px-12 py-8 cursor-pointer ${venueValue === null ? "font-semibold" : "font-normal"}` }>
                    All venues
                </div> </DropdownItem>
                    { venues.map((venue, index) => {
                        return <DropdownItem key={ index }>
                            <div onClick={
                                () => {
                                    setVenueValue(venue)
                                }
                            } key={ index } className={ `flex hover:bg-neutral-100 rounded-8 px-12 py-8 cursor-pointer ${venue === venueValue ? "font-semibold" : "font-normal"}` }>
                                { venue.name }
                            </div>
                        </DropdownItem>
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
                            return <DropdownItem key={ index }>
                                <div onClick={
                                    () => {
                                        setGenreValue(genre)
                                    }
                                } key={ index } className={ `flex hover:bg-neutral-100 rounded-8 px-12 py-8 cursor-pointer ${genre === genreValue ? "font-semibold" : "font-normal"}` }>
                                    { genre.name }
                                </div>
                            </DropdownItem>
                        }) }</div>
                </Dropdown>
                <Dropdown placeholder="All times" value={ timeValue } leftIcon={ <FontAwesomeIcon className="w-5 h-5" icon={ fas.faClock } /> } rightIcon={ <FontAwesomeIcon className="w-5 h-5" icon={ fas.faChevronDown } /> } >                    <div> <DropdownItem> <div onClick={
                    () => {
                        setTimeValue(null)
                    }
                } className={ `flex hover:bg-neutral-100 rounded-8 px-12 py-8 cursor-pointer ${timeValue === null ? "font-semibold" : "font-normal"}` }>
                    All times
                </div> </DropdownItem>
                    { times.map((time, index) => {
                        return <DropdownItem key={ index }>
                            <div onClick={
                                () => {
                                    setTimeValue(time)
                                }
                            } key={ index } className={ `flex hover:bg-neutral-100 rounded-8 px-12 py-8 cursor-pointer ${time === timeValue ? "font-semibold" : "font-normal"}` }>
                                { time.name }
                            </div>
                        </DropdownItem>
                    }) }</div>
                </Dropdown>

            </div>
            <p className="text-body-m font-normal italic text-neutral-500 py-16">Quick reminder that our cinema schedule is on a ten-day update cycle.</p>

            <div>
                { movies.map((item, index) => {
                    return <MovieCard key={ index } movie={ item } photos={ item.photos } />
                }) }
            </div>

        </div>

    )
}

export default CurrentlyShowing;
