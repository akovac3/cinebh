import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faXmark, faChevronUp, faChevronDown } from "@fortawesome/free-solid-svg-icons";

import Logo from "./Logo";
import Button from "./Button";
import LogIn from "../routes/login/LogIn";

import { createClassName } from "../utils/utils";

const Nav = ({ className, toggleSidebar }) => {
  const [click, setClick] = useState(false);
  const handleClick = () => setClick(!click);
  const [userClick, setUserClick] = useState(false);
  const handleUserClick = () => setUserClick(!userClick);
  const signedIn = localStorage.getItem("loggedIn")
  const name = localStorage.getItem("firstName") + " " + localStorage.getItem("lastName")

  const list = (
    <>
      <a href="/currently-showing">
        <li className="hover:border-b hover:font-semibold hover:shadow-light-100 cursor-pointer">
          Currently Showing
        </li>
      </a>
      <a href="/upcoming-movies">
        <li className="hover:border-b hover:font-semibold hover:shadow-light-100 cursor-pointer">
          Upcoming Movies
        </li>
      </a>
      <a to="/venues">
        <li className="hover:border-b hover:font-semibold hover:shadow-light-100 cursor-pointer">
          Venues
        </li>
      </a>
    </>
  );

  const content = (
    <div className="lg:hidden md:hidden block absolute top-80 w-full left-0 z-50 right-0 font-body bg-neutral-800 transition">
      <ul className="text-center px-[260px] text-neutral-0 py-24">
        { list }
      </ul>
    </div>
  );

  return (
    <nav>
      <div className={ createClassName("font-body bg-neutral-800 h-[80px] flex justify-between items-baseline z-50 text-neutral-0 lg:py-16 px-[118px] py-16 border-b border-neutral-500", className) }>
        <a href="/">
          <Logo />
        </a>
        <div className="md:flex lg:flex-1 justify-center font-normal text-body-l hidden">
          <ul className="flex gap-24">
            { list }
          </ul>
        </div>
        { signedIn ?
          <Button
            variant="secondary"
            className="!text-neutral-25 !border-neutral-25"
            onClick={ handleUserClick }
          >
            { name }
            <FontAwesomeIcon icon={ userClick ? faChevronDown : faChevronUp } className="h-[14px]" />
          </Button>
          : <Button
            variant="secondary"
            className="!text-neutral-25 !border-neutral-25"
            onClick={ () => toggleSidebar(<LogIn toggleSidebar={ toggleSidebar } />) }
          >
            Sign in
          </Button>
        }
        { click && content }
        <button className="block md:hidden transition" onClick={ handleClick }>
          <FontAwesomeIcon icon={ click ? faXmark : faBars } />
        </button>
      </div>
    </nav>
  )
}

export default Nav;
