import { useEffect, useState } from "react";
import format from "date-fns/format"
import { addDays } from 'date-fns';

import Card from "../Card";
import Badge from "../Badge";

const MovieCard = (props) => {
    const movie = props.movie;
    const photos = props.photos;
    const upcoming = props.upcoming;
    const [cover, setCover] = useState();
    const today = addDays(new Date(), 10);
    const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Nov", "Dec"]
    const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"]
    const daysFull = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]

    function getCover() {
        photos.forEach(element => {
            if (element.cover) {
                setCover(element.link)
            }
        });
    }

    function getDate() {
        let date = new Date(movie.projectionStart)
        console.log(date)
        for (var i = 1; i < 7; i++) {
            if (addDays(today, i).getMonth() === date.getMonth() && addDays(today, i).getDate() === date.getDate())
                return "Opens " + daysFull[i];
        }
        return format(movie.projectionStart, "MMM dd, yyyy")
    }

    useEffect(() => {
        getCover();
    }, [movie])

    return (
        <Card>
            <div className="p-[10px]">
                <div className="flex items-center justify-center relative">
                    <img className="w-[98%] h-[287px] gap-0 rounded-16" src={ cover } alt="" />
                    { upcoming && <Badge className="bg-primary-600 !text-neutral-25 font-semibold absolute right-[3px] top-8">{ getDate() }</Badge> }
                </div>
                <p className="text-[20px]/[24px] mt-12 font-bold tracking-[0.0085em] pl-8">{ movie.name }</p>
                <div className="text-neutral-500 font-normal h-[20px] tracking-[0.0125em] text-[14px]/[20px] flex p-12 pl-8">
                    <p className="border-neutral-400 w-64 h-[20px] border-r mr-12">{ movie.duration } MIN</p>
                    <p>{ movie.genres[0].name }</p>
                </div>
            </div>
        </Card>
    )
}

export default MovieCard;
