import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { fas } from '@fortawesome/free-solid-svg-icons'

const Logo = () => {
    return (
        <div className='flex items-center font-body'>
            <span className='flex justify-center items-center  bg-neutral-25 w-[26px] h-[24px] rounded-8 font-bold'>
                <FontAwesomeIcon icon={fas.faVideo} style={{ color: "#B22222", width: "14px", height: "12px" }} />
            </span>
            <div className='pl-4'>
                <span className="text-neutral-0 text-heading-h5">Cine</span>
                <span className="text-primary-600 text-heading-h5">bh.</span>

            </div>
        </div>
    )
}

export default Logo;
