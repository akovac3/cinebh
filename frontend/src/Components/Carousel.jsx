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

        <div className="w-full h-full relative overflow-hidden">
            { !covers &&
                <div className="opacity-100 text-neutral-400 bg-neutral-25 font-body w-full h-full flex py-8 gap-40 items-center justify-center scroll-smooth">
                    { children }
                </div>
            }
            { covers && children.map((child, index) => {
                return (
                    <div className={ index === current ? "slide_current" : "slide" } style={ index === current ? { transform: `translateX(-${0}%)` } : { transform: `translateX(-${50}%)` } } key={ index }>
                        { index === current && (
                            child
                        ) }
                    </div>
                )
            }) }

            { navigation && <div className="absolute bottom-24 right-0 left-0">
                <div className="flex items-center justify-center gap-[15px]">
                    { children.map((_, i) => (
                        <div onClick={ () => { setCurrent(i) } } key={ i } className={ `transition-all h-4 w-[30px] cursor-pointer rounded-4 ${current === i ? "bg-neutral-50" : "bg-neutral-400"}` } />
                    )) }
                </div>

            </div>
            }
        </div>
    )
}

const CustomCarouselItem = ({ children, className }) => {
    return (
        <div className={ className }>{ children }</div>
    )
}

export { CustomCarousel, CustomCarouselItem }