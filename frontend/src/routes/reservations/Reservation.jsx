import { useLocation, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { format } from "date-fns";
import axios from "axios";

import Image from "../../components/Image";
import SeatGuide from "../../components/SeatGuide";
import CinemaSeats from "../../components/CinemaSeats";
import Button from "../../components/Button";

import { url, reservation } from "../../utils/api";
import Modal from "../../components/Modal";

const Reservation = () => {
    const location = useLocation();
    const navigate = useNavigate()
    const movie = location.state.movie;
    const projection = location.state.projection;
    const date = location.state.date;
    const [modal, setModal] = useState(false)
    const [cover, setCover] = useState();
    const [selectedSeats, setSelectedSeats] = useState([]);

    const calculateSeatPrice = (seatId) => {
        if (seatId.startsWith("I")) {
            return 24;
        } else if (seatId.startsWith("G") || seatId.startsWith("H")) {
            return 10;
        } else {
            return 7;
        }
    };

    const totalPrice = selectedSeats.reduce((acc, seatId) => {
        return acc + calculateSeatPrice(seatId);
    }, 0);

    function getCover() {
        movie.photos.forEach(element => {
            if (element.cover) {
                setCover(element.link)
            }
        });
    }

    useEffect(() => {
        getCover();
    }, [movie])

    const onFinish = async (values) => {
        try {
            console.log(values)
            const token = localStorage.getItem("token")
            const response = await axios.post(url + reservation, values, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            if (response.status === 200) {
                console.log("reservation made")
                setModal(true)
            }
        } catch (error) {
            console.log(error)
            console.log(error.response.data.message)
        }
    }

    const makeReservationClick = () => {
        if (selectedSeats.length !== 0) {
            const values = {
                date: date,
                projectionId: projection.projectionId,
                seats: selectedSeats,
                price: totalPrice,
                type: "RESERVATION"
            }
            onFinish(values)
        }
    }

    return (
        <div className="py-16 text-neutral-800 font-body">
            <div className="grid grid-cols-2">
                <div className="border-b border-primary-600">
                    <p className="text-heading-h5 pl-[118px] pb-16">Seat Options</p>
                </div>
                <div className="border-b border-neutral-200"></div>
            </div>
            <div className="grid lg:grid-cols-3 sm:grid-cols-1 py-12 border-b border-neutral-200 px-[118px]">
                <div className="py-12 flex">
                    <Image className={ `rounded-12 object-cover h-[126px] w-[134px]` } src={ cover } alt="" />
                    <div className="pl-16">
                        <p className="text-heading-h6 pb-6"> { movie.name }</p>
                        <div className="flex text-body-l font-normal pt-[10px] pb-[6px]">
                            <p className="border-primary-600 h-[20px] pr-12 border-r">{ movie.rating }</p>
                            <p className="border-primary-600 h-[20px] px-12 border-r">{ movie.language }</p>
                            <p className="pl-12">{ movie.duration } Min</p>
                        </div>
                    </div>
                </div>
                <div className="py-12 flex flex-col text-body-l">
                    <p className="text-heading-h6 pb-[10px]">Booking Details</p>
                    <p className="pb-8">{ format(date, "EEEE, MMM dd") } at { projection.time.slice(0, 5) }</p>
                    <p className="pb-[10px]">{ projection.venue.address }, { projection.venue.city.name }</p>
                    <p>Hall 1</p>
                </div>
            </div>
            <div className="grid lg:grid-cols-2 sm:grid-cols-1 md:grid-cols-1 pt-12 pb-40 px-[118px]">
                <CinemaSeats selectedSeats={ selectedSeats } reservedSeats={ projection.reservedSeats } setSelectedSeats={ setSelectedSeats } />
                <SeatGuide selectedSeats={ selectedSeats } totalPrice={ totalPrice } onClick={ makeReservationClick } />
            </div>
            { modal && <Modal>
                <p className="text-heading-h6 text-neutral-900 pb-16">Seats Reserved!</p>
                <p className="text-body-m text-neutral-500 text-justify">Your reservation confirmation has been sent to your email. You can also see your reservation details on your User profile and set a reminder for ticket purchasing.</p>
                <div className="flex pt-32 gap-8 justify-end">
                    <Button variant="secondary" size="sm" onClick={ () => navigate("/") }>Back to Home</Button>
                    <Button size="sm">See Reservation</Button>
                </div>
            </Modal> }
        </div>
    )
}

export default Reservation;
