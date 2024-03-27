import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { fas } from '@fortawesome/free-solid-svg-icons'


const Logo = () => {
    return (
        <div className='flex items-center'>
        <span className='flex justify-center items-center  bg-white w-[26px] h-[24px] text-3xl rounded-lg font-bold'>
            <FontAwesomeIcon icon={fas.faVideo} style={{color: "#B22222", width:"14px", height:"12px"}} />
        </span>
        <div>
            <span className="text-white text-2xl font-bold tracking-[-0.0015em]">Cine</span>
            <span className="text-darkRed text-2xl font-bold tracking-[-0.0015em]">bh.</span>

        </div>
        </div>
    )
}

export default Logo;