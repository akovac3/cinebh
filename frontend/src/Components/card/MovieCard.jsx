import { useEffect, useState } from "react";
import Card from "../Card";

const MovieCard = (props) => {
    const movie = props.movie;
    const photos = props.photos;
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
        <Card>
            <div className="flex items-center justify-center">
                <img className="w-[270px] h-[287px] gap-0 rounded-16" src={cover} alt="" />
            </div>
            <p className="text-[20px]/[24px] mt-12 font-bold tracking-[0.0085em] pl-8">{movie.name}</p>
            <div className="text-neutral-500 font-normal h-[20px] tracking-[0.0125em] text-[14px]/[20px] flex p-12 pl-8">
                <p className="border-neutral-400 w-64 h-[20px] border-r mr-12">{movie.duration} MIN</p>
                <p>{movie.genres[0].name}</p>
            </div>
        </Card>
    )
}

export default MovieCard;
