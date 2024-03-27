import Logo from "./Logo";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { fas } from '@fortawesome/free-solid-svg-icons'
import { Link } from "react-router-dom";

const Footer = () => {

    return (
        <div className="h-[212px] bg-darkRed">
        <div className="h-[212px] bg-gradient-to-r from-start to-stop flex flex-col items-center justify-center font-body text-lightGray">
            <div className='flex items-center'>
        <span className='flex justify-center items-center  bg-lightGray w-[26px] h-[24px] text-3xl rounded-lg font-bold'>
            <FontAwesomeIcon icon={fas.faVideo} style={{color: "#B22222", width:"14px", height:"12px"}} />
        </span>
        <div>
            <span className="text-2xl font-bold tracking-[-0.0015em]">Cine</span>
            <span className=" text-2xl font-bold tracking-[-0.0015em]">bh.</span>

        </div>
        </div>

        <div className="font-bold text-xs tracking-wider flex p-4">
            <a href='/aboutus' className="border-r w-20 border-lightGray mr-3 cursor-pointer">ABOUT US</a>
            <a href='/tickets' className="cursor-pointer">TICKETS</a>
        </div>

        <div className="text-paleRed font-normal text-sm tracking-[0.0025em]">
            <p>Copyright @Cinebh. Built with love in Sarajevo. All rights reserved.</p>
        </div>

        </div>
        </div>
    )
}

export default Footer;