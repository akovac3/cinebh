import CurrentlyShowing from "./CurrentlyShowing"
import { Link } from 'react-scroll';
import Logo from "./Logo";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBars, faXmark } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";
import Button from "./Button";


const Nav = () => {
    const [click, setClick] = useState(false);
    const handleClick = () => setClick(!click);
    const content = <>
        <div className="lg:hidden md:hidden block absolute top-16 w-full left-0 right-0 bg-gray transition">
            <ul className="text-center px-60 text-white">
                <Link spy={true} smooth={true} to="CurrentlyShowing">
                    <li className="my-4 py-2 hover:border-b hover:text-darkRed cursor-pointer">Currently Showing</li>
                </Link>
                <Link spy={true} smooth={true} to="UpcomingMovies">
                    <li className="my-4 py-2 hover:border-b hover:text-darkRed cursor-pointer">Upcoming Movies</li>
                </Link>
                <Link spy={true} smooth={true} to="Venues">
                    <li className="my-4 py-2 hover:border-b hover:text-darkRed cursor-pointer">Venues</li>
                </Link>
            </ul>
        </div>
    </>
    return (
        <nav>
            <div className="bg-gray h-[80px] flex justify-center items-center z-50 text-white lg:py-5 px-20 py-4 border-b border-border">
                <div className="flex items-center flex-1">
                    <Logo />
                </div>
                <div className="lg:flex md:flex lg:flex-1 justify-start font-normal text-base tracking-[0.005em] text-white hidden">
                    <div className="flex">
                        <ul className="flex pt-2 gap-8 ">
                            <Link spy={true} smooth={true} to="CurrentlyShowing">
                                <li className="hover:text-darkRed hover:border-b hover:border-darkRed cursor-pointer">Currently Showing</li>
                            </Link>
                            <Link spy={true} smooth={true} to="UpcomingMovies">
                                <li className="hover:text-darkRed hover:border-b hover:border-darkRed cursor-pointer">Upcoming Movies</li>
                            </Link>
                            <Link spy={true} smooth={true} to="Venues">
                                <li className="hover:text-darkRed hover:border-b hover:border-darkRed cursor-pointer">Venues</li>
                            </Link>
                        </ul>
                    </div>

                </div>
                <div className="flex ml-30">
                    <Button variant="secondary" className="text-lightGray border-lightGray">Sign in</Button>
                </div>
                <div >
                    {click && content}
                </div>

                <button className="block md:hidden transition" onClick={handleClick}>
                    {click ? <FontAwesomeIcon icon={faXmark} /> : <FontAwesomeIcon icon={faBars} />}
                </button>
            </div>
        </nav>



    )
}

export default Nav;