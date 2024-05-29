import { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import { format, differenceInDays } from 'date-fns';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEllipsis, faInfoCircle } from '@fortawesome/free-solid-svg-icons';

import Image from '../../../components/Image';
import Badge from '../../../components/Badge'
import { Dropdown, DropdownItem } from '../../../components/Dropdown';
import Button from '../../../components/Button';
import { Table, TableCell, TableHeaderCell, TableHeaderRow, TableRow } from '../../../components/Table';
import { NumberOfElementsContext } from '../../../contexts/NumberOfElementsContext';

import { url, movies, searchStatus, venues, searchCurrently, searchUpcoming, currently, upcoming } from "../../../utils/api";
import Checkbox from '../../../components/CheckBox';
import Tooltip from '../../../components/Tooltip';
import Pagination from '../../../components/Pagination';

const MovieTable = ({ type, selectable = false, actions = false }) => {
    const [movieList, setMovieList] = useState([]);
    const [venueList, setVenueList] = useState([]);
    const [showActions, setShowActions] = useState(false);
    const [showTooltip, setShowTooltip] = useState(false);
    const [pagination, setPagination] = useState({ page: 1, size: 4 });
    const [selectedMovies, setSelectedMovies] = useState([]);

    const { numberOfElements, setNumberOfElements } = useContext(NumberOfElementsContext);
    const [showMenuIndex, setShowMenuIndex] = useState(null);

    const [currentPage, setCurrentPage] = useState(1);
    const [postsPerPage, setPostsPerPage] = useState(4);
    const [maxPages, setMaxPages] = useState(1);
    const [totalPosts, setTotalPosts] = useState(0);

    const paginateFront = () => {
        setCurrentPage(prev => prev + 1);
        setPagination({ ...pagination, page: pagination.page + 1 });
    }

    useEffect(() => {
        fetchData()
    }, [pagination])

    const paginateBack = () => {
        setCurrentPage(prev => prev - 1);
        setPagination({ ...pagination, page: pagination.page - 1 });

    }

    const handleItemsPerPage = (value) => {
        setPagination({ ...pagination, size: value });
    }

    const handleEdit = () => {
        setShowMenuIndex(null);
    };

    const handlePublish = () => {
        setShowMenuIndex(null);
    };

    const handleArchive = () => {
        setShowMenuIndex(null);
    };

    const handleMoveToDrafts = () => {
        setShowMenuIndex(null);
    };

    const getCover = (photos) => {
        for (let element of photos) {
            if (element.cover) {
                return element.link;
            }
        }
        return null;
    };

    const getVenueNames = (projections) => {
        if (venueList.length === 0) {
            return "Loading...";
        }

        const venueNames = [];
        projections.forEach(projection => {
            if (!venueNames.includes(projection.venue.name)) {
                venueNames.push(projection.venue.name);
            }
        });

        const allVenueIds = venueList.map(venue => venue.venueId);
        const projectionVenueIds = projections.map(projection => projection.venue.venueId);
        const hasAllVenues = allVenueIds.every(id => projectionVenueIds.includes(id));

        if (hasAllVenues) {
            return "All Venues";
        }

        const moreCount = venueNames.length > 3 ? venueNames.length - 3 : 0;
        return venueNames.slice(0, 3).join(', ') + (moreCount > 0 ? ` + ${moreCount}` : '');
    };

    const getGenreList = async () => {
        try {
            const response = await axios.get(`${url}${venues}/all`);
            setVenueList(response.data);
        } catch (error) {
            console.error(error);
            console.warning(error.response.data.message);
        }
    };

    const fetchData = async () => {
        let route = `${url}${movies}`
        if (type === "drafts") route += `${searchStatus}?status=DRAFT`
        else if (type === "currently") route += `${currently}?`
        else if (type === "upcoming") route += `${upcoming}?`
        else if (type === "archived") route += `${searchStatus}?status=ARCHIVED`
        route += `&page=${pagination.page}&size=${pagination.size}`

        const result = await axios.get(route);
        setMovieList(result.data.content);
        console.log(result.data)

        setNumberOfElements({ ...numberOfElements, [type]: result.data.totalElements });
        setTotalPosts(result.data.totalElements)
        setMaxPages(result.data.totalPages + 1)
    };

    useEffect(() => {
        getGenreList();
    }, []);

    const handleMovieClick = (movieId) => {
        setSelectedMovies((prevSelectedMovies) =>
            prevSelectedMovies.includes(movieId)
                ? prevSelectedMovies.filter(id => id !== movieId)
                : [...prevSelectedMovies, movieId]
        );
    };

    const getDaysRemaining = (date) => {
        const today = new Date();
        return differenceInDays(new Date(date), today);
    };

    const getBadgeDetails = (movie) => {
        let badgeState, badgeText;

        if (type === "currently") {
            const daysRemaining = getDaysRemaining(movie.projectionEnd);
            badgeState = daysRemaining <= 7 ? 'yellow' : 'green';
            badgeText = `Ending in ${daysRemaining} days`;
        } else if (type === "drafts") {
            if (movie.step === "ONE") {
                badgeState = 'yellow';
                badgeText = `Step 1/3`;
            } else if (movie.step === "TWO") {
                badgeState = 'yellow';
                badgeText = `Step 2/3`;
            } else if (movie.step === "THREE") {
                badgeState = 'green';
                badgeText = `Step 3/3`;
            }
        } else if (type === "upcoming") {
            const daysRemaining = getDaysRemaining(movie.projectionStart);
            badgeState = daysRemaining >= 7 ? 'green' : 'yellow';
            badgeText = `Coming in ${daysRemaining} days`;
        } else if (type === "archived") {
            badgeState = 'red';
            badgeText = "Ended";
        }

        return { badgeState, badgeText };
    };

    const DropdownComponent = (
        <Dropdown className="w-[300px] right-0">
            { type === "drafts" && <DropdownItem onClick={ handleEdit }>Edit</DropdownItem> }
            { type === "drafts" && <DropdownItem onClick={ handlePublish }>Publish</DropdownItem> }
            { type !== "drafts" && <DropdownItem onClick={ handleMoveToDrafts }>Move to Drafts</DropdownItem> }
            { type !== "archived" && <DropdownItem onClick={ handleArchive }>Archive</DropdownItem> }
        </Dropdown>
    );

    return (
        <div>
            { selectedMovies.length > 0 && (
                <div className="flex justify-end gap-16 mb-16">
                    { type !== "archived" && <Button variant='secondary' size='md' className="!border-error-500 underline !text-error-500">Archive</Button> }
                    { type === "drafts" && <Button variant='secondary' size='md' className="border-success-600 text-success-600">Publish</Button> }
                    { type !== "drafts" && <Button variant='secondary' size='md' className="border-success-600 text-success-600">Move to Drafts</Button> }
                </div>
            ) }
            <Table className="mb-16">
                <thead>
                    <TableHeaderRow>
                        <TableHeaderCell>name</TableHeaderCell>
                        <TableHeaderCell>projection date</TableHeaderCell>
                        <TableHeaderCell>venue</TableHeaderCell>
                        <TableHeaderCell>
                            <div className="flex gap-8 items-center">
                                status
                                { type === "drafts" && <Tooltip infoText="Status shows completion of multiple steps. In order to publish movie, all steps must be completed.">
                                    <FontAwesomeIcon onClick={ () => setShowTooltip(!showTooltip) } icon={ faInfoCircle } />
                                </Tooltip>
                                }
                            </div>
                        </TableHeaderCell>
                        { actions ? <TableHeaderCell>action</TableHeaderCell> : null }
                    </TableHeaderRow>
                </thead>
                <tbody>
                    { movieList.length > 0 ? (
                        movieList.map((movie, i) => {
                            const { badgeState, badgeText } = getBadgeDetails(movie);

                            return (
                                <TableRow key={ i } className="cursor-pointer" onClick={ () => { if (selectable) handleMovieClick(movie.movieId) } }>
                                    <TableCell className="w-[300px]">
                                        <div className="flex items-center gap-8">
                                            { selectable ? <Checkbox isChecked={ selectedMovies.includes(movie.movieId) } /> : null }
                                            <Image
                                                width="40px"
                                                height="40px"
                                                className="rounded-12 w-40 h-40 object-cover mr-8"
                                                src={ getCover(movie.photos) || '' }
                                                alt={ movie.name }
                                            />
                                            { movie.name }
                                        </div>
                                    </TableCell>
                                    <TableCell className="w-[277px]">
                                        { format(new Date(movie.projectionStart), 'dd. MMM. yyyy') } - { format(new Date(movie.projectionEnd), 'dd. MMM. yyyy') }
                                    </TableCell>
                                    <TableCell className="w-[277px]">{ getVenueNames(movie.projections) }</TableCell>
                                    <TableCell>
                                        <Badge color={ badgeState } className="normal-case">
                                            { badgeText }
                                        </Badge>
                                    </TableCell>
                                    { actions ? <TableCell className="w-[84px]" onClick={ (e) => e.stopPropagation() }>
                                        <div style={ { position: 'relative' } }>
                                            <Button
                                                variant="tertiary"
                                                onClick={ () => { setShowActions(!showActions); setShowMenuIndex(i) } }
                                            >
                                                <FontAwesomeIcon icon={ faEllipsis } />
                                            </Button>
                                            { showActions && showMenuIndex === i && DropdownComponent }
                                        </div>
                                    </TableCell> : null }
                                </TableRow>
                            );
                        })
                    ) : (
                        <TableRow>
                            <TableCell colSpan={ 5 } className="text-center">
                                No data available in table
                            </TableCell>
                        </TableRow>
                    ) }
                </tbody>
            </Table>
            <Pagination
                table
                postsPerPage={ pagination.size }
                totalPosts={ totalPosts }
                paginateBack={ paginateBack }
                paginateFront={ paginateFront }
                currentPage={ pagination.page }
                maxPages={ maxPages }
                itemsPerPage={ [4, 10, 20] }
                handleItemsPerPage={ handleItemsPerPage }
            />
        </div>
    );
};

export default MovieTable;
