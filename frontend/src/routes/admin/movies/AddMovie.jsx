import { useNavigate, useLocation } from 'react-router-dom';
import { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faX } from '@fortawesome/free-solid-svg-icons';

import Button from '../../../components/Button';
import Stepper from '../../../components/Stepper';
import StepperControl from '../../../components/StepperControl';
import General from '../../../components/steps/General';
import Details from '../../../components/steps/Details';
import Venues from '../../../components/steps/Venues';
import { StepperContext } from '../../../contexts/StepperContext';

import { url, genres } from '../../../utils/api';

const AddMovie = () => {
    const navigate = useNavigate();
    const location = useLocation();

    const from = location.state?.from || '/admin-panel/movies/drafts';

    const [currentStep, setCurrentStep] = useState(1);
    const [movieData, setMovieData] = useState({});
    const [detailsData, setDetailsData] = useState([]);
    const [genreList, setGenreList] = useState([]);
    const [stepStatus, setStepStatus] = useState({
        1: false,
        2: false,
        3: false,
    });

    const steps = ["General", "Details", "Venues"];

    const validateGeneralStep = useCallback(() => {
        const requiredFields = ["name", "language", "director", "rating", "duration", "projectionStart", "projectionEnd", "genres"];
        for (let field of requiredFields) {
            if (!movieData[field]) {
                setStepStatus(prevStatus => ({ ...prevStatus, 1: false }));
                return false;
            }
        }
        setStepStatus(prevStatus => ({ ...prevStatus, 1: true }));
        return true;
    }, [movieData]);

    useEffect(() => {
        validateGeneralStep();
    }, [movieData, validateGeneralStep]);

    const displayStep = (step) => {
        switch (step) {
            case 1:
                return <General genreList={ genreList } />;
            case 2:
                return <Details />;
            case 3:
                return <Venues />;
            default:
        }
    };

    const handleClick = (direction) => {
        let newStep = currentStep;
        direction === "continue" ? newStep++ : newStep--;
        if (newStep > 0 && newStep <= steps.length) {
            setCurrentStep(newStep);
        }
    };

    const getGenreList = async () => {
        try {
            const response = await axios.get(`${url}${genres}`);
            setGenreList(response.data);
        } catch (error) {
            console.error(error);
            console.warning(error.response.data.message);
        }
    };

    useEffect(() => {
        getGenreList();
    }, []);

    return (
        <div className="pt-32 px-40 font-body text-neutral-800 w-full">
            <div className="flex">
                <p className="text-heading-h6 flex-1">Add New Movie</p>
                <Button variant="secondary" onClick={ () => navigate(from) }><FontAwesomeIcon icon={ faX } /></Button>
            </div>
            <Stepper
                steps={ steps }
                currentStep={ currentStep }
                stepStatus={ stepStatus }
            />
            <div className="mt-24 mb-80">
                <StepperContext.Provider value={ { movieData, setMovieData, detailsData, setDetailsData } }>
                    { displayStep(currentStep) }
                </StepperContext.Provider>
            </div>
            <StepperControl
                handleClick={ handleClick }
                currentStep={ currentStep }
                steps={ steps }
            />
        </div>
    );
};

export default AddMovie;
