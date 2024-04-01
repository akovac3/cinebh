import { useState } from "react";
import { useEffect } from "react";
import Badge from "../Badge";
import Button from "../Button";

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
        <div className="w-full h-full relative overflow-hidden">
            {movies.map((slide, index) => {
                return (
                    <div className={index === current ? "slide_current" : "slide"} style={index === current ? { transform: `translateX(-${0}%)` } : { transform: `translateX(-${50}%)` }} key={index}>
                        {index === current && (
                            <div >
                                {slide.photos.map((img) => {
                                    if (img.cover) return <img key={img.link} className="w-full object-cover h-full" src={img.link} alt="slika" />
                                })}
                                <div className="absolute top-[376px] w-[653px] gap-32 left-[118px] font-body text-neutral-25">
                                    <div>
                                        <Badge>{slide.genres[0].name}</Badge>
                                    </div>
                                    <h2 className="text-heading-h2 mb-12 mt-12">{slide.name}</h2>
                                    <p className="text-heading-h6">{slide.synopsis}</p>
                                    <Button variant="primary" className="w-[114px] mt-24">Buy Ticket</Button>
                                </div>
                            </div>
                        )}
                    </div>
                )
            })}


            <div className="absolute bottom-24 right-0 left-0">
                <div className="flex items-center justify-center gap-[15px]">
                    {movies.map((_, i) => (
                        <div onClick={() => { setCurrent(i) }} key={i} className={`transition-all h-4 w-[30px] cursor-pointer rounded-4 ${current === i ? "bg-neutral-50" : "bg-neutral-400"}`} />
                    ))}
                </div>
            </div>
        </div>
    )
}

export default CoverCarousel;
