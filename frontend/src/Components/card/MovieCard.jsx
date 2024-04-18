import { useEffect, useState } from "react";
import format from "date-fns/format"

import Card from "../Card";
import Badge from "../Badge";

const MovieCard = (props) => {
    const movie = props.movie;
    const photos = props.photos;
    const upcoming = props.upcoming;
    const [cover, setCover] = useState();

    function getCover() {
        photos.forEach(element => {
            if (element.cover) {
                setCover(element.link)
            }
        });
    }

    useEffect(() => {
        getCover();
    }, [movie])

    return (
        <Card className="h-[395px]">
            <div className="flex items-center justify-center p-12 relative">
                <img className="w-[98%] h-[287px] rounded-16" src={ cover } alt="" />
                { upcoming && <Badge className="bg-primary-600 !text-neutral-25 font-semibold absolute right-12 top-[24px]">{ format(movie.projectionStart, "MMM dd, yyyy") }</Badge> }
            </div>
            <p className="text-[20px]/[24px] font-bold tracking-[0.0085em] pl-12">{ movie.name }</p>
            <div className="text-neutral-500 font-normal h-[20px] tracking-[0.0125em] text-[14px]/[20px] flex p-[10px] pl-12">
                <p className="border-neutral-400 w-64 h-[20px] border-r mr-12">{ movie.duration } MIN</p>
                <p>{ movie.genres[0].name }</p>
            </div>
        </Card>
    )
}

export default MovieCard;
