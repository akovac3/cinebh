import { useEffect, useState } from "react";
import format from "date-fns/format"
import { Link } from "react-router-dom"

import Card from "../Card";
import Badge from "../Badge";
import Image from "../Image";

import { createClassName } from "../../utils/utils";

const MovieCard = ({ className, seeAlso, ...props }) => {
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
        <Link to={ `/movie-details/${movie.movieId}` }>
            <Card className={ createClassName("h-[395px] cursor-pointer", className) }>
                <div className="flex items-center justify-center p-12 relative h-[77%]">
                    <Image className="w-[98%] rounded-16 h-full" src={ cover } alt="" />
                    { upcoming && <Badge className="bg-primary-600 !text-neutral-25 font-semibold absolute right-12 top-[24px]">{ format(movie.projectionStart, "MMM dd, yyyy") }</Badge> }
                </div>
                <p className={ seeAlso ? "text-body-l font-semibold px-12 pb-12" : "text-[20px]/[24px] font-bold tracking-[0.0085em] px-12" }>{ movie.name }</p>
                { !seeAlso &&
                    <div className="text-neutral-500 font-normal h-[20px] tracking-[0.0125em] text-[14px]/[20px] flex p-[10px] pl-12">
                        <p className="border-neutral-400 w-64 h-[20px] border-r mr-12">{ movie.duration } MIN</p>
                        <p>{ movie.genres[0].name }</p>
                    </div> }
            </Card>
        </Link>
    )
}

export default MovieCard;
