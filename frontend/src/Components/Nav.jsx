import { Link } from "react-scroll";
import Logo from "./Logo";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faXmark } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";
import Button from "./Button";

const Nav = () => {
  const [click, setClick] = useState(false);
  const handleClick = () => setClick(!click);
  const content = (
    <>
      <div className="lg:hidden md:hidden block absolute top-64 w-full left-0 right-0 font-body bg-neutral-800 transition">
        <ul className="text-center px-[240px] text-neutral-0">
          <Link spy={true} smooth={true} to="CurrentlyShowing">
            <li className="my-16 py-8 hover:border-b hover:text-primary-600 cursor-pointer">
              Currently Showing
            </li>
          </Link>
          <Link spy={true} smooth={true} to="UpcomingMovies">
            <li className="my-16 py-8 hover:border-b hover:text-primary-600 cursor-pointer">
              Upcoming Movies
            </li>
          </Link>
          <Link spy={true} smooth={true} to="Venues">
            <li className="my-16 py-8 hover:border-b hover:text-primary-600 cursor-pointer">
              Venues
            </li>
          </Link>
        </ul>
      </div>
    </>
  );

  return (
    <nav>
      <div className=" font-body bg-neutral-800 h-[80px] flex justify-between items-baseline z-50 text-neutral-0 lg:py-16 px-[112px] py-16 border-b border-neutral-500">
        <Logo className="flex-1" />

        <div className="md:flex lg:flex-1 justify-center font-normal text-body-l text-neutral-0 hidden">
          <ul className="flex gap-24 ">
            <Link spy={true} smooth={true} to="CurrentlyShowing">
              <li className="hover:text-primary-600 hover:border-b hover:border-primary-600 cursor-pointer">
                Currently Showing
              </li>
            </Link>
            <Link spy={true} smooth={true} to="UpcomingMovies">
              <li className="hover:text-primary-600 hover:border-b hover:border-primary-600 cursor-pointer">
                Upcoming Movies
              </li>
            </Link>
            <Link spy={true} smooth={true} to="Venues">
              <li className="hover:text-primary-600 hover:border-b hover:border-primary-600 cursor-pointer">
                Venues
              </li>
            </Link>
          </ul>
        </div>

        <Button variant="secondary" className="text-neutral-25 border-neutral-25">
          Sign in
        </Button>

        <div>{click && content}</div>

        <button className="block md:hidden transition" onClick={handleClick}>
          <FontAwesomeIcon icon={click ? faXmark : faBars} />
        </button>
      </div>
    </nav>
  );
};

export default Nav;
