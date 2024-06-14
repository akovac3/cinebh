import axios from 'axios';
import { useParams } from 'react-router-dom';

import { url, venues } from '../../utils/api';
import { useState, useEffect } from 'react';
import Image from '../../components/Image';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLocationPin, faPhone } from '@fortawesome/free-solid-svg-icons';

const VenueDetails = () => {

    const { id } = useParams();
    const [venue, setVenue] = useState()

    useEffect(() => {
        getVenue()
        //_handlePaginationChange(setMoviePagination, { page: 1, size: 6 })
    }, [id])

    const getVenue = async () => {
        axios.get(`${url}${venues}/${id}`)
            .then(response => {
                setVenue(response.data)
            })
            .catch(error => {
                console.log(error)
                console.warning(error.response.data.message)
            })
    }

    if (!venue) {
        return (
            <div className="text-heading-h6 text-neutral-600 pl-[118px] pt-80">Loading...</div>
        )
    }


    return (
        <div className="px-[118px] pb-40 pt-32 font-body text-neutral-800 text-body-l">
            <p className="text-heading-h4 pb-16">Venue Details</p>
            <div className="h-[367px] border border-neutral-200 bg-neutral-25 rounded-24 grid grid-cols-2 gap-64">
                <div className="px-16 py-16">
                    <Image className="h-full object-cover rounded-16" src={ venue.photo } alt="Venue" />
                </div>
                <div className="flex flex-col text-body-l gap-12 pt-64">
                    <p className="text-heading-h6">{ venue.name }</p>
                    <p><FontAwesomeIcon className="text-primary-600 mr-16" icon={ faLocationPin } />Adresa</p>
                    <p><FontAwesomeIcon className="text-primary-600 mr-16" icon={ faPhone } />{ venue.telephone }</p>
                </div>
            </div>
            <div className="pt-40">
                <p className="text-heading-h4 pb-24">Movies playing in { venue.name } (15)</p>
                Movie
            </div>
        </div>
    )
}

export default VenueDetails;