import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { fas } from '@fortawesome/free-solid-svg-icons'
import Button from './Button';

const Tickets = () => {
    return (
        <div className='font-body text-gray pb-16'>
            <div className="flex flex-col items-center justify-center">
                <div className="text-center w-[632px] p-10">
                    <p className="text-[32px] leading-10 tracking-[-0.0025em] font-bold">Pricing</p>
                    <p className="text-base	font-normal tracking-[0.005em] pt-8">Welcome to our cinema ticket pricing options! We offer three tiers to suit everyone’s preferences. Explore our pricing options below and treat yourself to a cinematic adventure like never before!</p>
                </div>
            </div>

            <div className="flex flex-row items-start justify-center pb-10 ">
                <div className="border flex flex-col border-shadow1 rounded-2xl bg-lightGray w-[408px] h-[564px] mt-10">

                    <div className="flex flex-col items-center justify-center p-8">
                        <p className="text-xl/6 font-bold tracking-[-0.0015em]">Regular Seats</p>
                        <p className="text-[32px] leading-10 font-bold tracking-[-0.0025em] py-8">7 KM</p>
                        <p className="text-base font-normal tracking-[0.005em]">*per ticket</p>
                    </div>
                    <div className="px-6 text-base font-normal">
                        <p className="pb-6">
                            <FontAwesomeIcon className='pr-4' icon={fas.faCheck} style={{ color: "#B22222", }} />
                            Comfortable seating
                        </p>
                        <p className="pb-6"> <FontAwesomeIcon className='pr-4' icon={fas.faCheck} style={{ color: "#B22222", }} />

                            Affordable pricing</p>

                        <p className="pb-6">
                            <FontAwesomeIcon className='pr-4' icon={fas.faCheck} style={{ color: "#B22222", }} />
                            Wide selection</p>
                        <p className="pb-6">
                            <FontAwesomeIcon className='pr-4' icon={fas.faCheck} style={{ color: "#B22222", }} />
                            Accessible  locations</p>
                        <p className="pb-3">
                            <FontAwesomeIcon className='pr-4' icon={fas.faCheck} style={{ color: "#B22222", }} />
                            Suitable for everyone</p>
                    </div>

                    <div className="flex flex-col items-center justify-center p-10">
                        <Button variant={"secondary"} size={"lg"} className={"w-[149px]"}>Explore Movies</Button>
                    </div>
                </div>

                <div className="border border-line rounded-2xl bg-lightGray w-[408px] h-[644px] mx-6 shadow-[0_4px_6px_-1px_rgba(52,64,84,0.08)] shadow-inner-[0_2px_4px_-2px_rgba(52, 64, 84, 0.08)]">
                    <div className="flex flex-col items-center justify-center p-8 mt-9">
                        <p className="text-xl/6 font-bold tracking-[-0.0015em]">Love Seats</p>
                        <p className="text-[32px] text-darkRed leading-10 font-bold tracking-[-0.0025em] py-8">24 KM</p>
                        <p className="text-base font-normal tracking-[0.005em]">*per ticket</p>
                    </div>
                    <div className="px-6 text-base font-normal">
                        <p className="pb-6">
                            <FontAwesomeIcon className='pr-4' icon={fas.faCheck} style={{ color: "#B22222", }} />
                            Side-by-side design
                        </p>
                        <p className="pb-6"> <FontAwesomeIcon className='pr-4' icon={fas.faCheck} style={{ color: "#B22222", }} />

                            Comfortable padding</p>

                        <p className="pb-6">
                            <FontAwesomeIcon className='pr-4' icon={fas.faCheck} style={{ color: "#B22222", }} />
                            Adjustable armrests</p>
                        <p className="pb-6">
                            <FontAwesomeIcon className='pr-4' icon={fas.faCheck} style={{ color: "#B22222", }} />
                            Cup holders</p>
                        <p className="pb-3">
                            <FontAwesomeIcon className='pr-4' icon={fas.faCheck} style={{ color: "#B22222", }} />
                            Reserved for couples</p>
                    </div>

                    <div className="flex flex-col items-center justify-center p-10">
                        <Button variant={"primary"} size={"lg"} className={"w-[149px]"}>Explore Movies</Button>
                    </div>
                </div>
                <div className="border border-shadow1 rounded-2xl bg-lightGray w-[408px] h-[564px] mt-10">
                    <div className="flex flex-col items-center justify-center p-8">
                        <p className="text-xl/6 font-bold tracking-[-0.0015em]">VIP Seats</p>
                        <p className="text-[32px] leading-10 font-bold tracking-[-0.0025em] py-8">10 KM</p>
                        <p className="text-base font-normal tracking-[0.005em]">*per ticket</p>
                    </div>
                    <div className="px-6 text-base font-normal">
                        <p className="pb-6">
                            <FontAwesomeIcon className='pr-4' icon={fas.faCheck} style={{ color: "#B22222", }} />
                            Enhanced comfort
                        </p>
                        <p className="pb-6"> <FontAwesomeIcon className='pr-4' icon={fas.faCheck} style={{ color: "#B22222", }} />

                            Priority seating</p>

                        <p className="pb-6">
                            <FontAwesomeIcon className='pr-4' icon={fas.faCheck} style={{ color: "#B22222", }} />
                            Prime viewing</p>
                        <p className="pb-6">
                            <FontAwesomeIcon className='pr-4' icon={fas.faCheck} style={{ color: "#B22222", }} />
                            Personal space</p>
                        <p className="pb-3">
                            <FontAwesomeIcon className='pr-4' icon={fas.faCheck} style={{ color: "#B22222", }} />
                            Luxury extras</p>
                    </div>

                    <div className="flex flex-col items-center justify-center p-10">
                        <Button variant={"secondary"} size={"lg"} className={"w-[149px]"}>Explore Movies</Button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Tickets;