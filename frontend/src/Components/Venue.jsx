import { useEffect, useState } from 'react'

const CustomCarousel = ({ children, covers, navigation, autoSlide = true, autoSlideInterval = 7000 }) => {
    const [current, setCurrent] = useState(0)

    const prev = () => setCurrent((current) => (current === 0 ? 2 : current - 1))
    const next = () => setCurrent((current) => (current === 2 ? 0 : current + 1))

    useEffect(() => {
        if (!autoSlide) return
        const slideInterval = setInterval(next, autoSlideInterval)
        return () => clearInterval(slideInterval)
    }, [])

    return (
        <div className="text-neutral-400 bg-neutral-25 font-body w-full h-full relative">
            <div className="w-full h-full flex py-8 gap-40 items-center justify-center">
                { children }
            </div>
        </div>
    )
}

const CustomCarouselItem = ({ children }) => {
    return (
        <div>{ children }</div>
    )
}

export { CustomCarousel, CustomCarouselItem }