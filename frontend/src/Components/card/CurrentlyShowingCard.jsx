import { useEffect, useState } from "react";

import Card from "../Card";
import Badge from "../Badge";

const CurrentlyShowingCard = (props) => {
    const movie = props.movie;
    const photos = props.photos;
    const movieProjections = props.projections;
    const [endDate, setEndDate] = useState();
    const [cover, setCover] = useState();
    const month = ["01", "02", "03", "04", "05", "06", "07", "08", "09", "10", "11", "12"]

    function getCover() {
        photos.forEach(element => {
            if (element.cover) {
                setCover(element.link)
            }
        });
    }

    function getEndDate() {
        let date = new Date(movie.projectionEnd)
        setEndDate(date.getDate() + "." + month[date.getMonth()] + "." + date.getFullYear())
    }

    function getProjectionTimes() {
        let array = []
        movieProjections.map((projection) => {
            if (array.indexOf(projection.time) === -1) {
                array.push(projection.time);
            }
        })
        return array;
    }

    useEffect(() => {
        getCover();
        getEndDate();
    }, [movie])

    return (
        <Card className="lg:h-[318px] md:h-[450px] sm:h-[450px] py-4 px-8 my-12">
            <div className="grid lg:grid-cols-4 gap-24 p-[10px]">
                <img className="w-[96%] h-[287px] rounded-16" src={ cover } alt="" />

                <div className="text-neutral-800 mr-24 relative">
                    <p className="text-heading-h4 pb-8">{ movie.name }</p>
                    <div className="flex text-body-l font-normal pt-16 pb-8">
                        <p className="border-primary-600 h-[20px] pr-12 border-r mr-12">{ movie.rating }</p>
                        <p className="border-primary-600 h-[20px] pr-12 border-r mr-12">{ movie.language }</p>
                        <p className="">{ movie.duration } Min</p>
                    </div>
                    <div className="flex gap-16 py-8">
                        { movie.genres.map((genre, index) => {
                            return <Badge key={ index }>{ genre.name }</Badge>
                        }) }
                    </div>
                    <p className="absolute bottom-0 text-body-m italic text-neutral-500">Playing in cinema until { endDate }</p>
                </div>
                <div className="col-span-2">
                    <p className="text-heading-h6 text-primary-600 py-12">Showtimes</p>
                    <div className="flex gap-12">
                        { getProjectionTimes().map((projection, index) => {
                            return (
                                <div key={ index } className="border rounded-8 shadow-light-50 bg-neutral-0 border-neutral-200 text-neutral-800 hover:bg-primary-600 hover:!text-neutral-25 hover:border-primary-600 cursor-pointer">
                                    <p className="p-[10px] text-heading-h6">{ projection.slice(0, 5) }</p>
                                </div>
                            )
                        }) }
                    </div>
                </div>
            </div>
        </Card>
    )
}

export default CurrentlyShowingCard;
