import { useState } from "react";
import { useEffect } from "react";
import Button from "./Button";
import Badge from "./Badge";

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
                                    if (img.cover) return <img className="w-full object-cover h-full" src={img.link} alt="slika" />
                                })}
                                <div className="absolute top-[376px] w-[553px] gap-8 left-24 font-body text-lightGray">
                                    <div>
                                        <Badge>{slide.genres[0].name}</Badge>
                                    </div>
                                    <h2 className="text-5xl/[56px] font-bold tracking-[-0.005em] mb-3 mt-2">{slide.name}</h2>
                                    <p>{slide.synopsis}</p>
                                    <Button variant="primary" className="w-[114px] mt-5">Buy Ticket</Button>
                                </div>
                            </div>
                        )}
                    </div>
                )
            })}


            <div className="absolute bottom-7 right-0 left-0">
                <div className="flex items-center justify-center gap-4">
                    {movies.map((_, i) => (
                        <div onClick={() => { setCurrent(i) }} key={i} className={`transition-all h-1 bg-slider w-[30px] cursor-pointer rounded ${current === i ? "" : "bg-sliderD"}`} />
                    ))}
                </div>
            </div>
        </div>
    )
}

export default CoverCarousel;