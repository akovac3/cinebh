import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { fas } from '@fortawesome/free-solid-svg-icons'

const Footer = () => {

    return (
        <div className="h-[212px] w-full absolute bottom-0 bg-primary-600 font-body">
            <div className="h-[212px] bg-gradient-to-r from-supporting-special-start to-supporting-special-stop flex flex-col items-center justify-center font-body text-neutral-25">
                <div className='flex items-center '>
                    <span className='flex justify-center items-center  bg-neutral-25 w-[26px] h-[24px] rounded-8 font-bold'>
                        <FontAwesomeIcon icon={fas.faVideo} style={{ color: "#B22222", width: "14px", height: "12px" }} />
                    </span>
                    <div className='pl-4'>
                        <span className="text-heading-h5">Cine</span>
                        <span className=" text-heading-h5">bh.</span>
                    </div>
                </div>
                <div className="text-heading-content flex py-12">
                    <a href='/aboutus' className="border-r w-80 border-neutral-25 mr-12 cursor-pointer">ABOUT US</a>
                    <a href='/tickets' className="cursor-pointer">TICKETS</a>
                </div>
                <div className="text-primary-25 font-normal text-body-m ">
                    <p>Copyright @Cinebh. Built with love in Sarajevo. All rights reserved.</p>
                </div>
            </div>
        </div>
    )
}

export default Footer;
