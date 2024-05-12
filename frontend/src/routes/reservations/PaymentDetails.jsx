import { useLocation, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import format from "date-fns/format";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { fas } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";

import Image from "../../components/Image";
import Modal from "../../components/Modal";
import Button from "../../components/Button";
import Input from "../../components/Input";
import Label from "../../components/Label";
import CreditCard from "../../components/CreditCard";

import { url, reservation } from "../../utils/api";

const PaymentDetails = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const movie = location.state.movie;
    const cover = location.state.cover;
    const projection = location.state.projection;
    const date = location.state.date;
    const totalPrice = location.state.totalPrice;
    const selectedSeats = location.state.selectedSeats;
    const [disableButton, setDisableButton] = useState(true);
    const [newCard, setNewCard] = useState({ cardNumber: "", expiryDate: "", cvv: "" });
    const [cardFieldFocused, setCardFieldFocused] = useState({ cardNumberFocused: false, expiryDateFocused: false, cvvFocused: false });
    const [selectedCard, setSelectedCard] = useState(null);
    const [selectedCardIndex, setSelectedCardIndex] = useState(null)
    const [modal, setModal] = useState(false)

    const savedCards = [
        { cardNumber: "1234 5678 9101 1121", expiryDate: "12/24", cvv: "123", type: "visa" },
        { cardNumber: "3141 5161 7181 9202", expiryDate: "05/25", cvv: "456", type: "mastercard" }
    ];

    const onFocus = (fieldsAndValues) => {
        const updatedParams = { ...cardFieldFocused, ...fieldsAndValues };
        setCardFieldFocused(updatedParams);
        setSelectedCard(null);
        setSelectedCardIndex(null)
    };

    const onBlur = (fieldsAndValues) => {
        const updatedParams = { ...cardFieldFocused, ...fieldsAndValues };
        setCardFieldFocused(updatedParams);
    };

    function _handleCardChange(setFields, fieldsAndValues) {
        setFields(prevValues => ({
            ...prevValues,
            ...fieldsAndValues
        }));
    }

    const handleExpiryDateChange = (event) => {
        const { value } = event.target;
        const sanitizedValue = value.replace(/\D/g, '');
        const formattedValue = sanitizedValue.replace(/(\d{2})(\d{2})/, '$1/$2').trim();
        _handleCardChange(setNewCard, { expiryDate: formattedValue });
    };

    const handleCardNumberChange = (event) => {
        const { value } = event.target;
        const sanitizedValue = value.replace(/\D/g, '');
        const formattedValue = sanitizedValue.replace(/(\d{4})/g, '$1 ').trim();
        _handleCardChange(setNewCard, { cardNumber: formattedValue });
    };

    const handleCvvChange = (e) => {
        if (isNaN(e.target.value)) return;
        _handleCardChange(setNewCard, { cvv: e.target.value });
    };

    const onFinish = async (values) => {
        try {
            setDisableButton(true)
            const token = localStorage.getItem("token")
            const response = await axios.post(url + reservation, values, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            if (response.status === 200) {
                setModal(true)
            }
        } catch (error) {
            console.log(error)
            console.log(error.response.data.message)
        }
    }

    const handlePayment = () => {
        if (newCard.cardNumber.length === 19 && newCard.expiryDate.length === 5 && newCard.cvv.length === 3) {
            console.log(newCard);
        } else if (selectedCard) console.log(selectedCard)
        const values = {
            date: date,
            projectionId: projection.projectionId,
            seats: selectedSeats,
            price: totalPrice,
            type: "PURCHASE"
        }
        onFinish(values)
    }


    useEffect(() => {
        if (selectedCard || (newCard.cardNumber.length === 19 && newCard.expiryDate.length === 5 && newCard.cvv.length === 3)) {
            setDisableButton(false);
        } else {
            setDisableButton(true);
        }
    }, [selectedCard, newCard]);

    return (
        <div className="font-body">
            <div className="border-b border-primary-600">
                <p className="text-neutral-800 text-heading-h5 py-16 px-[118px]">Payment Details</p>
            </div>
            <div className="grid lg:grid-cols-3 md:grid-cols-1 sm:grid-cols-1 px-[118px] pt-24 pb-64">
                <div className="col-span-2 pr-24">
                    <p className="text-heading-h6 text-neutral-500">Saved Cards</p>
                    { savedCards.map((card, i) => (
                        <CreditCard
                            key={ i }
                            className={ `my-24 ${selectedCardIndex === i ? "border border-primary-600" : "border border-neutral-200"}` }
                            cardNumber={ card.cardNumber }
                            type={ card.type }
                            onClick={ () => {
                                if (selectedCardIndex === i) {
                                    setSelectedCard(null)
                                    setSelectedCardIndex(null)
                                }
                                else {
                                    setSelectedCard(card);
                                    setSelectedCardIndex(i);
                                    setNewCard({ cardNumber: "", expiryDate: "", cvv: "" });
                                }
                            } }
                        />
                    )) }
                    <div className="flex gap-16 items-center justify-center pt-8">
                        <div className="w-[45%] border border-neutral-200 h-[1px]"></div>
                        <p className="text-heading-h6 text-neutral-500">or</p>
                        <div className="w-[45%] border border-neutral-200 h-[1px]"></div>
                    </div>
                    <div className="pt-24 pb-[85px]">
                        <p className="text-neutral-500 text-heading-h6 pb-24">Add New Card</p>
                        <p className="text-neutral-700 font-semibold">Card Number</p>
                        <Label className="!text-neutral-900" active={ cardFieldFocused.cardNumberFocused } leftIcon={ <FontAwesomeIcon icon={ fas.faCreditCard } /> }>
                            <Input
                                value={ newCard.cardNumber }
                                onChange={ handleCardNumberChange }
                                pattern="\d{4} \d{4} \d{4} \d{4}"
                                maxLength="19"
                                text="**** **** **** ****"
                                onFocus={ () => onFocus({ cardNumberFocused: true }) }
                                onBlur={ () => onBlur({ cardNumberFocused: false }) }
                            />
                        </Label>
                        <div className="flex gap-8 pt-24">
                            <div className="w-[50%]">
                                <p className="font-semibold text-neutral-700">Expiry Date</p>
                                <Label active={ cardFieldFocused.expiryDateFocused }>
                                    <Input
                                        type="text"
                                        value={ newCard.expiryDate }
                                        onChange={ handleExpiryDateChange }
                                        pattern="(0[1-9]|1[0-2])\/\d{2}"
                                        maxLength="5"
                                        placeholder="MM/YY"
                                        required
                                        text="00/00"
                                        onFocus={ () => onFocus({ expiryDateFocused: true }) }
                                        onBlur={ () => onBlur({ expiryDateFocused: false }) }
                                    />
                                </Label>
                            </div>
                            <div className="w-[50%]">
                                <p className="font-semibold text-neutral-700">CVV</p>
                                <Label active={ cardFieldFocused.cvvFocused }>
                                    <Input
                                        type="text"
                                        value={ newCard.cvv }
                                        onChange={ handleCvvChange }
                                        pattern="\d{3}"
                                        maxLength="3"
                                        text="000"
                                        onFocus={ () => onFocus({ cvvFocused: true }) }
                                        onBlur={ () => onBlur({ cvvFocused: false }) }
                                    />
                                </Label>
                            </div>
                        </div>
                    </div>
                    <Button className="!w-full" disabled={ disableButton } onClick={ () => handlePayment() }>
                        Make Payment - { totalPrice } KM
                    </Button>
                </div>

                <div className="text-neutral-25">
                    <p className="text-heading-h6 text-neutral-500 pb-24">Booking Summary</p>
                    <div className="rounded-16 bg-neutral-800 flex flex-col items-center justify-center">
                        <div className="px-12 py-24 w-[90%] flex border-b border-neutral-200">
                            <Image className={ `rounded-12 object-cover h-[126px] w-[125px]` } src={ cover } alt="" />
                            <div className="pl-16">
                                <p className="text-heading-h6 pb-6"> { movie.name }</p>
                                <div className="flex text-body-l font-normal pt-[10px] pb-[6px]">
                                    <p className="border-primary-600 h-[20px] pr-12 border-r">{ movie.rating }</p>
                                    <p className="border-primary-600 h-[20px] px-12 border-r">{ movie.language }</p>
                                    <p className="pl-12">{ movie.duration } Min</p>
                                </div>
                            </div>
                        </div>

                        <div className="flex flex-col text-body-l px-24 pt-32 pb-[85px] w-full">
                            <p className="text-neutral-400 pb-4">Date and Time</p>
                            <p className="font-semibold pb-16">{ format(date, "EEEE, MMM dd") } at { projection.time.slice(0, 5) }</p>
                            <p className="text-neutral-400 pb-4">Cinema Details</p>
                            <p className="font-semibold">{ projection.venue.address }, <br />{ projection.venue.city.name }</p>
                            <p className="font-semibold pb-16 pt-4">Hall 1</p>
                            <p className="text-neutral-400 pb-4">Seat(s) Details</p>
                            <p>Seat(s): <span className="font-semibold">{ selectedSeats.join(', ') }</span></p>
                            <p className="text-neutral-400 pt-16 pb-8">Price Details</p>
                            <p>Total Price: <span className="font-semibold">{ totalPrice } KM</span></p>
                        </div>
                    </div>
                </div>
            </div>
            { modal && <Modal>
                <p className="text-heading-h6 text-neutral-900 pb-16">Payment Successful!</p>
                <p className="text-body-m text-neutral-500 text-justify">
                    The receipt and ticket have been sent to your email. You may download them immediately, or retrieve them later from your User Profile.</p>
                <div className="flex pt-32 gap-8 justify-end">
                    <Button variant="secondary" size="sm" onClick={ () => navigate("/") }>Back to Home</Button>
                    <Button size="sm">See Reservation</Button>
                </div>
            </Modal> }
        </div>
    );
};

export default PaymentDetails;
