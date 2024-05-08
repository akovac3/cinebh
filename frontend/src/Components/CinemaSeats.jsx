import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { fas } from "@fortawesome/free-solid-svg-icons";

import Seat from "./Seat";

import { createClassName } from "../utils/utils"

const CinemaSeats = ({ className, selectedSeats, reservedSeats, setSelectedSeats }) => {
    const [regularSeats, setRegularSeats] = useState([]);
    const [vipSeats, setVipSeats] = useState([]);
    const [loveSeats, setLoveSeats] = useState([]);

    const handleSeatClick = (seatId) => {
        if (selectedSeats.includes(seatId)) {
            setSelectedSeats(selectedSeats.filter(id => id !== seatId));
        } else {
            setSelectedSeats([...selectedSeats, seatId]);
        }
    };

    const generateRegularSeatIds = () => {
        const rows = ['A', 'B', 'C', 'D', 'E', 'F'];
        const cols = ['1', '2', '3', '4', '5', '6', '7', '8'];

        return rows.flatMap(row => cols.map(col => `${row}${col}`));
    };

    const generateVIPSeatIds = () => {
        const rows = ['G', 'H'];
        const cols = ['1', '2', '3', '4', '5', '6', '7', '8'];

        return rows.flatMap(row => cols.map(col => `${row}${col}`));
    };

    const generateLoveSeatIds = () => ['I1', 'I2', 'I3', 'I4'];

    useState(() => {
        console.log(reservedSeats)
        const regular = generateRegularSeatIds().map(id => ({ id, status: reservedSeats.includes(id) ? 'reserved' : 'available' }));
        const vip = generateVIPSeatIds().map(id => ({ id, status: reservedSeats.includes(id) ? 'reserved' : 'available' }));
        const love = generateLoveSeatIds().map(id => ({ id, status: reservedSeats.includes(id) ? 'reserved' : 'available' }));

        setRegularSeats(regular);
        setVipSeats(vip);
        setLoveSeats(love);
    }, []);

    return (
        <div className={ createClassName("flex flex-col justify-center items-center", className) }>
            <p className="text-body-l pb-[50px]">Cinema Screen</p>
            <div className="h-24 w-[400px] bg-gradient-to-b from-primary-600 to-neutral-25 transform -translate-y-1/4 rounded-t-full"></div>
            <div className="grid grid-cols-10 gap-8 pt-[75px] w-full">
                { regularSeats.map((seat, i) => {
                    return (
                        <Seat
                            key={ i + seat.id }
                            variant={ selectedSeats.includes(seat.id) ? 'selected' : seat.status }
                            style={ i % 4 === 3 ? { gridColumnEnd: "span 2" } : {} }
                            onClick={ seat.status === 'reserved' ? null : () => handleSeatClick(seat.id) }
                        >
                            { seat.id }
                        </Seat>
                    );
                }) }
                { vipSeats.map((seat, i) => {
                    return (
                        <Seat
                            key={ i + seat.id }
                            variant={ selectedSeats.includes(seat.id) ? 'selected' : seat.status }
                            style={ i % 4 === 3 ? { gridColumnEnd: "span 2" } : {} }
                            onClick={ seat.status === 'reserved' ? null : () => handleSeatClick(seat.id) }
                        >
                            <FontAwesomeIcon className="p-0 pr-4" icon={ fas.faStar } />
                            { seat.id }
                        </Seat>
                    );
                }) }
            </div>
            <div className="grid grid-cols-10 gap-8 pt-8 w-full">
                { loveSeats.map((seat, i) => {
                    return (
                        <Seat
                            key={ i + seat.id }
                            variant={ selectedSeats.includes(seat.id) ? 'selected' : seat.status }
                            className="!w-[116px]"
                            onClick={ seat.status === 'reserved' ? null : () => handleSeatClick(seat.id) }
                            style={ i % 2 === 1 ? { gridColumnEnd: "span 3" } : { gridColumnEnd: "span 2" } }
                        >
                            { seat.id }
                        </Seat>
                    );
                }) }
            </div>
        </div>
    )
}

export default CinemaSeats;
