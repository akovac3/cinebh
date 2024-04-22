import axios from "axios";
import { add, format } from "date-fns";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { fas } from "@fortawesome/free-solid-svg-icons";

import Badge from "../../components/Badge";
import Label from "../../components/Label";
import DateCard from "../../components/card/DateCard";
import MovieCard from "../../components/card/MovieCard";
import { Dropdown, DropdownItem } from "../../components/Dropdown";
import { List, ListItem } from "../../components/List"
import Pagination from "../../components/Pagination";
import Button from "../../components/Button";

import { url, movies, cities, venues, projections } from "../../utils/api";
import Player from "../../components/Player";

const MovieDetails = () => {
    const location = useLocation()
    const movie = location.state.movie
    const [cityList, setCityList] = useState([])
    const [venueList, setVenueList] = useState([])
    const [projectionList, setProjectionList] = useState([])
    const [seeAlsoMovies, setSeeAlsoMovies] = useState([])
    const [dates, setDates] = useState([])
    const [currentDates, setCurrentDates] = useState([])

    const [moviePagination, setMoviePagination] = useState({ page: 1, size: 6, maxPages: 1, totalElements: 0 })
    const [datePagination, setDatePagination] = useState({ page: 0, size: 6 })
    const [filterParams, setFilterParams] = useState({ city: null, venue: null, time: null, startDate: null })

    const allFieldsNotNull = Object.values(filterParams).every((value) => value !== null);
    const upcoming = new Date(format(movie.projectionStart, "yyyy-MM-dd")) >= add(new Date(), 10);

    const handleNextPage = () => {
        _handlePaginationChange(setDatePagination, { page: datePagination.page + 1 })
    };

    const handlePrevPage = () => {
        _handlePaginationChange(setDatePagination, { page: datePagination.page - 1 })
    };

    const paginateFront = () => {
        _handlePaginationChange(setMoviePagination, { page: moviePagination.page + 1 });
    }

    const paginateBack = () => {
        _handlePaginationChange(setMoviePagination, { page: moviePagination.page - 1 });
    }

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

    const getDates = () => {
        let date = new Date();
        let endDate = new Date(format(movie.projectionEnd, "yyyy-MM-dd"));
        let array = [];

        while (date.getTime() <= endDate.getTime()) {
            array.push(new Date(date));
            date.setDate(date.getDate() + 1);
        }
        array.push(endDate);
        setDates(array);
    };

    const getVenues = async (city) => {
        const fullUrl = city ? `${url}${venues}/city/${city}` : `${url}${venues}/all`
        axios.get(fullUrl)
            .then(response => setVenueList(response.data))
            .catch(error => {
                console.log(error)
                console.warning(error.response.data.message)
            })
    }

    const getMovies = async () => {
        const fullUrl = `${url}${movies}/similar?movie=${movie.movieId}&page=${moviePagination.page}&size=${moviePagination.size}`
        axios.get(fullUrl)
            .then(response => {
                setSeeAlsoMovies(response.data.content)
                _handlePaginationChange(setMoviePagination, { maxPages: response.data.totalPages + 1, totalElements: response.data.totalElements });
            })
            .catch(error => {
                console.log(error)
                console.warning(error.response.data.message)
            })
    }

    const getProjections = async (venueId) => {
        axios.get(`${url}${projections}?movie=${movie.movieId}&venue=${venueId}`)
            .then(response => setProjectionList(response.data))
            .catch(error => {
                console.log(error)
                console.warning(error.response.data.message)
            })
    }

    function _handlePaginationChange(setPagination, fieldsAndValues) {
        setPagination(prevPagination => ({
            ...prevPagination,
            ...fieldsAndValues
        }));
    }

    function _handleFilterChange(field, value) {
        if (field === 'city') {
            getVenues(value);
            setFilterParams({ ...filterParams, [field]: value, venue: null, time: null });
        } else if (field === 'venue') {
            setFilterParams({ ...filterParams, [field]: value, time: null });
        } else {
            setFilterParams({ ...filterParams, [field]: value });
        }
    }

    function getProjectionTimes() {
        if (filterParams.city && filterParams.venue) getProjections(filterParams.venue)
        if (filterParams.city === null || filterParams.venue === null) setProjectionList([])
    }

    function getCityName(id) {
        return cityList?.find(c => c.cityId === id)?.name
    }

    function getVenueName(id) {
        return venueList?.find(c => c.venueId === id)?.name
    }

    function getGenres() {
        return movie.genres.map((genre) => genre.name).sort()
    }

    useEffect(() => {
        getCities()
        getVenues()
    }, [])

    useEffect(() => {
        if (!upcoming) getDates()
        _handlePaginationChange(setMoviePagination, { page: 1, size: 6 })
    }, [movie])

    useEffect(() => {
        getMovies();
    }, [moviePagination.page, movie])

    useEffect(() => {
        _handlePaginationChange(setDatePagination, { page: 0, size: 6 })
        _handleFilterChange('startDate', null)
    }, [dates]);

    useEffect(() => {
        const startIndex = datePagination.page * datePagination.size;
        const endIndex = startIndex + datePagination.size;
        setCurrentDates(dates.slice(startIndex, endIndex));
    }, [datePagination])

    useEffect(() => {
        getProjectionTimes();
    }, [filterParams])

    const cityLabel = (
        <Label
            leftIcon={ <FontAwesomeIcon className="w-5 h-5 mr-8" icon={ fas.faLocationPin } /> }
            rightIcon={ <FontAwesomeIcon className="w-5 h-5" icon={ fas.faChevronDown } /> }
        >
            { getCityName(filterParams.city) || "Choose city" }
        </Label>
    )

    const venueLabel = (
        <Label
            leftIcon={ <FontAwesomeIcon className="w-5 h-5 mr-8" icon={ fas.faBuilding } /> }
            rightIcon={ <FontAwesomeIcon className="w-5 h-5" icon={ fas.faChevronDown } /> }
        >
            { getVenueName(filterParams.venue) || "Choose venue" }
        </Label>
    )

    return (
        <div className="px-[118px] py-40 font-body text-neutral-800 text-body-l">
            <p className="text-heading-h5 pb-16">Movie Details</p>
            <div className="grid lg:grid-cols-2 gap-16">
                <Player video={ movie.trailer } />
                <div className="grid grid-cols-2 gap-16 rounded-8">
                    { movie.photos.map((photo, index) => {
                        return (
                            <img key={ index } src={ photo.link } className="h-[175px] w-full"></img>
                        )
                    }) }
                </div>
            </div>
            <div className="grid lg:grid-cols-2 md:grid-cols-1 pt-24 gap-16">
                <div className="pr-16">
                    <p className="text-heading-h5">{ movie.name }</p>
                    <div className="flex text-body-l font-normal pt-24 pb-8">
                        <p className="border-primary-600 h-[20px] pr-12 border-r">{ movie.rating }</p>
                        <p className="border-primary-600 h-[20px] px-12 border-r">{ movie.language }</p>
                        <p className="border-primary-600 h-[20px] px-12 border-r">{ movie.duration } Min</p>
                        <p className="pl-12">Projection date: { format(movie.projectionStart, "yyyy/MM/dd") } - { format(movie.projectionEnd, "yyyy/MM/dd") }</p>
                    </div>
                    <div className="flex gap-16 pt-4 pb-16">
                        { getGenres().map((genre, index) => {
                            return <Badge key={ index }>{ genre }</Badge>
                        }) }
                    </div>
                    <p className="pt-8 pb-24">{ movie.synopsis }</p>
                    <p className="pb-24"> <span className="text-neutral-500">Director:</span> { movie.director } </p>
                    <span className="text-neutral-500">Writers: </span>
                    { movie.writers.map((writer, index) => {
                        return (
                            <span key={ index }>{ writer.firstName } { writer.lastName }{ index + 1 < movie.writers.length ? "," : "" } </span>
                        )
                    }) }

                    <div className="pt-32">
                        <p className="text-neutral-500 text-heading-h6 border-primary-600 h-[20px] pl-8 border-l-2">Cast</p>
                        <div className="grid grid-cols-3 text-body-m pt-[20px] gap-32">
                            { movie.movieActors.map((movieActor, index) => {
                                return (
                                    <div key={ index } className="font-semibold text-neutral-900">{ movieActor.actor.firstName } { movieActor.actor.lastName }
                                        <p className="text-neutral-500 text-body-s font-normal">{ movieActor.role }</p>
                                    </div>
                                )
                            }) }
                        </div>
                    </div>
                </div>
                <div className="rounded-16 border border-neutral-200 shadow-light-400 h-full relative lg:min-h-[560px] sm:min-h-[650px]">
                    { !upcoming ? <div>
                        <div className="p-24 grid grid-cols-2 gap-16">
                            <Dropdown
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
                                            onClick={ () => { _handleFilterChange('city', city.cityId) } }
                                            className={ `flex hover:bg-neutral-100 rounded-8 px-12 py-8 cursor-pointer ${city.cityId === parseInt(filterParams.city) ? "font-semibold" : "font-normal"}` }
                                        >
                                            { city.name }
                                        </DropdownItem>
                                    )
                                }) }
                            </Dropdown>
                            <Dropdown
                                value={ getVenueName(filterParams.venue) }
                                label={ venueLabel }
                            >
                                <DropdownItem
                                    onClick={ () => _handleFilterChange('venue', null) }
                                    className={ `${filterParams.venue === null ? "font-semibold" : "font-normal"}` }
                                >
                                    All venues
                                </DropdownItem>
                                { venueList.map((venue, index) => {
                                    return (
                                        <DropdownItem
                                            key={ index }
                                            onClick={ () => _handleFilterChange('venue', venue.venueId) }
                                            className={ `${venue.venueId === parseInt(filterParams.venue) ? "font-semibold" : "font-normal"}` }
                                        >
                                            { venue.name }
                                        </DropdownItem>
                                    )
                                }) }
                            </Dropdown>
                        </div>
                        <div>
                            <div className="grid lg:grid-cols-6 md:grid-cols-3 sm:grid-cols-2 gap-16 px-24">
                                { currentDates.map((date, index) => {
                                    const formattedDate = format(date, 'yyyy-MM-dd');
                                    return (
                                        <DateCard
                                            value={ filterParams.startDate }
                                            key={ datePagination.page + index }
                                            date={ date }
                                            className={ `${formattedDate === filterParams.startDate ? "!bg-primary-600 !text-neutral-0" : "bg-neutral-0 text-neutral-800"} cursor-pointer` }
                                            onClick={ () => { formattedDate === filterParams.startDate ? _handleFilterChange('startDate', null) : _handleFilterChange('startDate', formattedDate) } }
                                        />
                                    )
                                }) }
                            </div>
                            <div className="flex justify-end mt-16 pr-24">
                                <Pagination
                                    movies={ false }
                                    postsPerPage={ datePagination.size }
                                    totalPosts={ dates.length }
                                    paginateBack={ handlePrevPage }
                                    paginateFront={ handleNextPage }
                                    currentPage={ datePagination.page + 1 }
                                    maxPages={ Math.ceil(dates.length / 6) + 1 }
                                />
                            </div>
                        </div>
                        <p className="text-heading-h6 text-primary-600 pt-32 pb-12 px-24">Showtimes</p>
                        <div className="flex gap-12 px-24">
                            { projectionList.map((projection, index) => {
                                return (
                                    <div
                                        key={ index }
                                        onClick={ () => { projection.time === filterParams.time ? _handleFilterChange('time', null) : _handleFilterChange('time', projection.time) } }
                                        className={ `p-[10px] text-heading-h6 border rounded-8 shadow-light-50 ${filterParams.time === projection.time ? "bg-primary-600 text-neutral-25 border-primary-600" : "bg-neutral-0 border-neutral-200 text-neutral-800"} cursor-pointer` }
                                    >
                                        { projection.time.slice(0, 5) }
                                    </div>
                                )
                            }) }
                        </div>
                        <div className="absolute bottom-0 border-t border-neutral-200 grid grid-cols-2 py-24 gap-16 px-[20px] w-full">
                            <Button variant="secondary" className="w-full" disabled={ !allFieldsNotNull }>
                                Reserve Ticket
                            </Button>
                            <Button className="w-full" disabled={ !allFieldsNotNull }>
                                Buy Ticket
                            </Button>
                        </div>
                    </div> :
                        <div className="p-32 flex flex-col justify-center items-center text-justify">
                            <p className="text-heading-h5 text-neutral-700">{ movie.name } is coming in { format(movie.projectionStart, "MMM") }!</p>
                            <p className="text-neutral-500 py-16">Get notified when the movie is part of the schedule.</p>
                            <div className="w-[142px] h-[142px] bg-neutral-200 text-neutral-600 rounded-full flex justify-center items-center absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                                <FontAwesomeIcon className="w-32 h-32" icon={ fas.faBell } />
                            </div>
                            <div className="w-32 h-32 bg-neutral-400 rounded-full absolute top-1/3 right-[60%]" />
                            <div className="w-16 h-16 bg-neutral-500 rounded-full absolute top-1/3 right-[42%]" />
                            <div className="w-16 h-16 bg-neutral-500 rounded-full absolute top-[60%] right-[36%]" />
                            <div className="w-16 h-16 bg-neutral-700 rounded-full absolute top-[62%] right-[62%]" />
                            <div className="w-12 h-12 bg-neutral-300 rounded-full absolute top-1/2 right-[65%]" />
                            <div className="w-12 h-12 bg-neutral-300 rounded-full absolute top-[52%] right-[32%]" />

                            <div className="absolute bottom-0 border-t border-neutral-200 py-24 gap-16 px-[20px] w-full">
                                <Button className="w-full">
                                    Notify me
                                </Button>
                                <div className="flex justify-center items-center">
                                    <p className="pt-8"> Only signed up users can be notified.</p>
                                    <Button variant="tertiary" className="!text-neutral-800">Sign up</Button>
                                </div>
                            </div>
                        </div>
                    }
                </div>
            </div>
            <div className="pt-64">
                <p className="text-heading-h5">See also</p>
                <List
                    postsPerPage={ moviePagination.size }
                    seeAll
                    totalPosts={ moviePagination.totalElements }
                    paginateBack={ paginateBack }
                    paginateFront={ paginateFront }
                    currentPage={ moviePagination.page }
                    maxPages={ moviePagination.maxPages }
                >
                    { seeAlsoMovies.map((item, index) => {
                        return (
                            <ListItem key={ index }>
                                <MovieCard key={ index } movie={ item } photos={ item.photos } seeAlso className="w-[200px] !h-[215px]" />
                            </ListItem>
                        )
                    }) }
                </List>
            </div>
        </div>
    )
}

export default MovieDetails;
