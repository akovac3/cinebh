import { format } from "date-fns";
import { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { fas } from "@fortawesome/free-solid-svg-icons";

import { Dropdown, DropdownItem } from "./Dropdown";
import DateCard from "./card/DateCard";
import Pagination from "./Pagination";
import Button from "./Button";
import Label from "./Label";

const MovieProjections = ({ movie, cityList, venueList, getVenues, projectionList, filterParams, setFilterParams }) => {
    const [datePagination, setDatePagination] = useState({ page: 0, size: 6 })
    const [dates, setDates] = useState([])
    const [currentDates, setCurrentDates] = useState([])
    const allFieldsNotNull = Object.values(filterParams).every((value) => value !== null);

    function _handlePaginationChange(setPagination, fieldsAndValues) {
        setPagination(prevPagination => ({
            ...prevPagination,
            ...fieldsAndValues
        }));
    }

    const handleNextPage = () => {
        _handlePaginationChange(setDatePagination, { page: datePagination.page + 1 })
    };

    const handlePrevPage = () => {
        _handlePaginationChange(setDatePagination, { page: datePagination.page - 1 })
    };

    function _handleFilterChange(fieldsToUpdate) {
        const updatedParams = { ...filterParams, ...fieldsToUpdate };
        setFilterParams(updatedParams);
    }

    const getDates = () => {
        let date = new Date();
        let endDate = new Date(format(movie.projectionEnd, "yyyy-MM-dd"));
        let array = [];

        while (date.valueOf() < endDate.valueOf()) {
            array.push(new Date(date));
            date.setDate(date.getDate() + 1);
        }
        array.push(endDate)
        setDates(array)
        setCurrentDates(array.slice(0, datePagination.size));
    }

    function getCityName(id) {
        return cityList?.find(c => c.cityId === id)?.name
    }

    function getVenueName(id) {
        return venueList?.find(c => c.venueId === id)?.name
    }

    useEffect(() => {
        const startIndex = datePagination.page * datePagination.size;
        const endIndex = startIndex + datePagination.size;
        setCurrentDates(dates.slice(startIndex, endIndex));
        if (filterParams.startDate === null) _handleFilterChange({ startDate: format(new Date(), 'yyyy-MM-dd') })
    }, [datePagination])

    useEffect(() => {
        getDates()
        _handlePaginationChange(setDatePagination, { page: 0, size: 6 })
        _handleFilterChange({ city: null, venue: null, time: null, startDate: null })
    }, [movie])

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
        <div>
            <div className="p-24 grid grid-cols-2 gap-16">
                <Dropdown
                    value={ getCityName(filterParams.city) }
                    label={ cityLabel }
                >
                    <DropdownItem
                        onClick={ () => { _handleFilterChange({ city: null, venue: null, time: null }); getVenues(null) } }
                        className={ `${filterParams.city === null ? "font-semibold" : "font-normal"}` }
                    >
                        All cities
                    </DropdownItem>
                    { cityList.map((city, index) => {
                        return (
                            <DropdownItem
                                key={ index }
                                onClick={ () => { _handleFilterChange({ city: city.cityId, venue: null, time: null }); getVenues(city.cityId) } }
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
                        onClick={ () => _handleFilterChange({ venue: null, time: null }) }
                        className={ `${filterParams.venue === null ? "font-semibold" : "font-normal"}` }
                    >
                        All venues
                    </DropdownItem>
                    { venueList.map((venue, index) => {
                        return (
                            <DropdownItem
                                key={ index }
                                onClick={ () => _handleFilterChange({ venue: venue.venueId, time: null }) }
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
                                onClick={ () => { formattedDate === filterParams.startDate ? _handleFilterChange({ startDate: null }) : _handleFilterChange({ startDate: formattedDate }) } }
                            />
                        )
                    }) }
                </div>
                <div className="flex justify-end mt-16 pr-24">
                    <Pagination
                        displayCount={ false }
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
            { filterParams.city === null || filterParams.venue === null ?
                <p className="text-neutral-600 text-body-l px-24">Please select city and venue.</p> :
                <div className="flex gap-12 px-24">
                    { projectionList.length !== 0 ? projectionList.map((projection, index) => {
                        return (
                            <div
                                key={ index }
                                onClick={ () => { projection.time === filterParams.time ? _handleFilterChange({ time: null }) : _handleFilterChange({ time: projection.time }) } }
                                className={ `p-[10px] text-heading-h6 border rounded-8 shadow-light-50 ${filterParams.time === projection.time ? "bg-primary-600 text-neutral-25 border-primary-600" : "bg-neutral-0 border-neutral-200 text-neutral-800"} cursor-pointer` }
                            >
                                { projection.time.slice(0, 5) }
                            </div>
                        )
                    }) : <p className="text-neutral-600 text-body-l">No projections for selected venue!</p> }
                </div>
            }
            <div className="absolute bottom-0 border-t border-neutral-200 grid grid-cols-2 py-24 gap-16 px-[20px] w-full">
                <Button variant="secondary" className="w-full" disabled={ !allFieldsNotNull }>
                    Reserve Ticket
                </Button>
                <Button className="w-full" disabled={ !allFieldsNotNull }>
                    Buy Ticket
                </Button>
            </div>
        </div>
    )
}

export default MovieProjections;
