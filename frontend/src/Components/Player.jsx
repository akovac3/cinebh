import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { fas } from '@fortawesome/free-solid-svg-icons';
import ReactPlayer from 'react-player';
import Button from './Button';

const Player = ({ className, video }) => {

    const playIcon = (
        <Button>
            <FontAwesomeIcon className="w-5 h-5" icon={ fas.faPlay } />
        </Button>
    )

    return (
        <ReactPlayer width="auto" className={ className } controls light url={ video } playIcon={ playIcon } />
    )
};

export default Player;
