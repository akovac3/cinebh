import { useState } from "react";
import { useEffect } from "react";
import Badge from "../Badge";
import Button from "../Button";
import { CustomCarousel, CustomCarouselItem } from "../Carousel";

const CoverCarousel = ({ movies, autoSlide = true, autoSlideInterval = 7000 }) => {
    const [current, setCurrent] = useState(0)

    const prev = () => setCurrent((current) => (current === 0 ? 2 : current - 1))
    const next = () => setCurrent((current) => (current === 2 ? 0 : current + 1))

    useEffect(() => {
        if (!autoSlide) return
        const slideInterval = setInterval(next, autoSlideInterval)
        return () => clearInterval(slideInterval)
    }, [])

    return (
        <CustomCarousel prev={ prev } next={ next }>
            { movies.map((slide, index) => {
                return <CustomCarouselItem key={ index }>
                    { slide.photos.map((img) => {
                        if (img.cover) return <img key={ img.link } className="w-full object-cover h-full" src={ img.link } alt="slika" />
                    }) }
                    <div className="absolute top-[376px] w-[653px] gap-32 left-[118px] font-body text-neutral-25">
                        <div>
                            <Badge>{ slide.genres[0].name }</Badge>
                        </div>
                        <h2 className="text-heading-h2 mb-12 mt-12">{ slide.name }</h2>
                        <p className="text-heading-h6">{ slide.synopsis }</p>
                        <Button variant="primary" className="w-[114px] mt-24">Buy Ticket</Button>
                    </div>
                </CustomCarouselItem>
            }) }
        </CustomCarousel>

    )
}

export default CoverCarousel;
