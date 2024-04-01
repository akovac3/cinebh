import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { fas } from '@fortawesome/free-solid-svg-icons'
import Button from '../../components/Button';

const Tickets = () => {
    return (
        <div className='font-body text-neutral-800 pb-64'>
            <div className="flex flex-col items-center justify-center">
                <div className="text-center w-[632px] p-40">
                    <p className="text-heading-h4">Pricing</p>
                    <p className="text-body-l font-normal pt-24">Welcome to our cinema ticket pricing options! We offer three tiers to suit everyone's preferences. Explore our pricing options below and treat yourself to a cinematic adventure like never before!</p>
                </div>
            </div>

            <div className="flex flex-row items-start justify-center pb-40 ">
                <div className="border flex flex-col border-neutral-200 rounded-16 bg-neutral-25 w-[408px] h-[564px] mt-40">
                    <div className="flex flex-col items-center justify-center p-32">
                        <p className="text-heading-h6">Regular Seats</p>
                        <p className="text-heading-h4 py-24">7 KM</p>
                        <p className="text-body-l font-normal">*per ticket</p>
                    </div>
                    <div className="px-32 text-body-l font-normal">
                        <p className="pb-24">
                            <FontAwesomeIcon className='pr-16' icon={fas.faCheck} style={{ color: "#B22222", }} />
                            Comfortable seating
                        </p>
                        <p className="pb-24"> <FontAwesomeIcon className='pr-16' icon={fas.faCheck} style={{ color: "#B22222", }} />
                            Affordable pricing</p>
                        <p className="pb-24">
                            <FontAwesomeIcon className='pr-16' icon={fas.faCheck} style={{ color: "#B22222", }} />
                            Wide selection</p>
                        <p className="pb-24">
                            <FontAwesomeIcon className='pr-16' icon={fas.faCheck} style={{ color: "#B22222", }} />
                            Accessible  locations</p>
                        <p className="pb-12">
                            <FontAwesomeIcon className='pr-16' icon={fas.faCheck} style={{ color: "#B22222", }} />
                            Suitable for everyone</p>
                    </div>
                    <div className="flex flex-col items-center justify-center p-40">
                        <Button variant={"secondary"} size={"lg"}>Explore Movies</Button>
                    </div>
                </div>

                <div className="border border-neutral-400 rounded-16 bg-neutral-25 w-[408px] h-[644px] mx-24 shadow-light-100">
                    <div className="flex flex-col items-center justify-center p-32 mt-32">
                        <p className="text-heading-h6 pt-8">Love Seats</p>
                        <p className="text-heading-h4 text-primary-600 py-24">24 KM</p>
                        <p className="text-body-l font-normal">*per ticket</p>
                    </div>
                    <div className="px-32 text-body-l font-normal">
                        <p className="pb-24">
                            <FontAwesomeIcon className='pr-16' icon={fas.faCheck} style={{ color: "#B22222", }} />
                            Side-by-side design
                        </p>
                        <p className="pb-24"> <FontAwesomeIcon className='pr-16' icon={fas.faCheck} style={{ color: "#B22222", }} />
                            Comfortable padding</p>
                        <p className="pb-24">
                            <FontAwesomeIcon className='pr-16' icon={fas.faCheck} style={{ color: "#B22222", }} />
                            Adjustable armrests</p>
                        <p className="pb-24">
                            <FontAwesomeIcon className='pr-16' icon={fas.faCheck} style={{ color: "#B22222", }} />
                            Cup holders</p>
                        <p className="pb-12">
                            <FontAwesomeIcon className='pr-16' icon={fas.faCheck} style={{ color: "#B22222", }} />
                            Reserved for couples</p>
                    </div>

                    <div className="flex flex-col items-center justify-center p-40">
                        <Button className="text-neutral-25">Explore Movies</Button>
                    </div>
                </div>
                <div className="border border-neutral-200 rounded-16 bg-neutral-25 w-[408px] h-[564px] mt-40">
                    <div className="flex flex-col items-center justify-center p-32">
                        <p className="text-heading-h6">VIP Seats</p>
                        <p className="text-heading-h4 py-24">10 KM</p>
                        <p className="text-body-l font-normal">*per ticket</p>
                    </div>
                    <div className="px-32 text-body-l font-normal">
                        <p className="pb-24">
                            <FontAwesomeIcon className='pr-16' icon={fas.faCheck} style={{ color: "#B22222", }} />
                            Enhanced comfort
                        </p>
                        <p className="pb-24"> <FontAwesomeIcon className='pr-16' icon={fas.faCheck} style={{ color: "#B22222", }} />
                            Priority seating</p>
                        <p className="pb-24">
                            <FontAwesomeIcon className='pr-16' icon={fas.faCheck} style={{ color: "#B22222", }} />
                            Prime viewing</p>
                        <p className="pb-24">
                            <FontAwesomeIcon className='pr-16' icon={fas.faCheck} style={{ color: "#B22222", }} />
                            Personal space</p>
                        <p className="pb-24">
                            <FontAwesomeIcon className='pr-16' icon={fas.faCheck} style={{ color: "#B22222", }} />
                            Luxury extras</p>
                    </div>

                    <div className="flex flex-col items-center justify-center p-40">
                        <Button variant={"secondary"} size={"lg"}>Explore Movies</Button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Tickets;
