import { useNavigate, useLocation } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faX } from '@fortawesome/free-solid-svg-icons';

import Button from '../../../components/Button';
import Stepper from '../../../components/Stepper';
import StepperControl from '../../../components/StepperControl';

const AddMovie = () => {
    const navigate = useNavigate();
    const location = useLocation();

    const from = location.state?.from || '/admin-panel/movies/drafts';

    return (
        <div className="pt-32 px-40 font-body text-neutral-800 w-full">
            <div className="flex">
                <p className="text-heading-h6 flex-1">Add New Movie</p>
                <Button variant="secondary" onClick={ () => navigate(from) }><FontAwesomeIcon icon={ faX } /></Button>
            </div>
            <Stepper />

            <StepperControl />
        </div>
    );
};

export default AddMovie;
