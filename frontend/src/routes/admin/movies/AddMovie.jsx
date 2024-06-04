import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
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

import { url, genres, movies } from '../../../utils/api';

const AddMovie = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const [movieData, setMovieData] = useState({});

    const from = location.state?.from || '/admin-panel/movies/drafts';
    const { movie } = location.state || {};

    const [currentStep, setCurrentStep] = useState(1);
    const [detailsData, setDetailsData] = useState({ writersFile: null, actorsFile: null });
    const [projectionsData, setProjectionsData] = useState([]);
    const [genreList, setGenreList] = useState([]);
    const [stepStatus, setStepStatus] = useState({
        1: false,
        2: false,
        3: false,
    });

    const steps = ["General", "Details", "Venues"];

    useEffect(() => {
        if (movie) {
            const genreIds = movie.genres.map(genre => genre.id)
            setMovieData({
                id: movie.movieId,
                name: movie.name,
                language: movie.language,
                director: movie.director,
                rating: movie.rating,
                duration: movie.duration,
                genres: genreIds,
                projectionStart: movie.projectionStart,
                projectionEnd: movie.projectionEnd,
                synopsis: movie.synopsis || '',
                trailer: movie.trailer || '',
                status: movie.status || 'DRAFT',
            });
            const writers = movie.writers.length > 0 ? movie.writers.map(writer => ({
                firstName: writer.firstName,
                lastName: writer.lastName
            })) : null;
            const actors = movie.movieActors.length > 0 ? movie.movieActors.map(movieActor => ({
                firstName: movieActor.actor.firstName,
                lastName: movieActor.actor.lastName,
                role: movieActor.role
            })) : null;
            setDetailsData({
                writersList: writers,
                actorsList: actors,
                photos: movie.photos
            })
        }
    }, [movie]);

    const validateGeneralStep = useCallback(() => {
        const requiredFields = ["name", "language", "director", "rating", "duration", "projectionStart", "projectionEnd", "genres", "synopsis"];
        for (let field of requiredFields) {
            if (!movieData[field]) {
                setStepStatus(prevStatus => ({ ...prevStatus, 1: false }));
                return false;
            }
        }
        setStepStatus(prevStatus => ({ ...prevStatus, 1: true }));
        return true;
    }, [movieData]);

    const validateDetailsStep = useCallback(() => {
        const requiredFields = ["writersList", "actorsList", "photos"];
        for (let field of requiredFields) {
            if (!detailsData[field]) {
                setStepStatus(prevStatus => ({ ...prevStatus, 2: false }));
                return false;
            }
        }
        setStepStatus(prevStatus => ({ ...prevStatus, 2: true }));
        return true;
    }, [movieData]);

    useEffect(() => {
        validateGeneralStep();
        validateDetailsStep()

    }, [movieData, validateGeneralStep]);

    const uploadFiles = async (id) => {
        const token = localStorage.getItem('token');

        if (detailsData.actorsDelete) {
            await deleteActors(token, id)
        }

        if (detailsData.writersDelete) {
            await deleteWriters(token, id)
        }

        if (!detailsData.actorsFile && !detailsData.writersFile) {
            return;
        } else {
            await upload(token, id)
        }
    }

    const deleteWriters = async (token, id) => {
        const response = await axios.delete(`${url}${movies}/${id}/delete-writers`, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });
        if (!response.status === "200") {
            throw new Error("Failed to delete writers");
        } else {
            setDetailsData((prevDetailsData) => ({
                ...prevDetailsData,
                writersDelete: false,
            }));
        }
    }

    const deleteActors = async (token, id) => {
        const response = await axios.delete(`${url}${movies}/${id}/delete-actors`, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });
        if (!response.status === "200") {
            throw new Error("Failed to delete actors");
        } else {
            setDetailsData((prevDetailsData) => ({
                ...prevDetailsData,
                actorsDelete: false,
            }));
        }
    }

    const upload = async (token, id) => {
        const formData = new FormData();
        if (detailsData.writersFile) {
            formData.append("writersFile", detailsData.writersFile);
        }
        if (detailsData.actorsFile) {
            formData.append("actorsFile", detailsData.actorsFile);
        }

        try {
            const response = await axios.post(`${url}${movies}/${id}/add-details`, formData, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });

            if (!response.status === "200") {
                throw new Error("Failed to upload files");
            }

            const writers = response.data.writers.length > 0 ? response.data.writers.map(writer => ({
                firstName: writer.firstName,
                lastName: writer.lastName
            })) : detailsData.writersList;

            const actors = response.data.actors.length > 0 ? response.data.actors.map(movieActor => ({
                firstName: movieActor.actor.firstName,
                lastName: movieActor.actor.lastName,
                role: movieActor.role
            })) : detailsData.actorsList;

            setDetailsData((prevDetailsData) => ({
                ...prevDetailsData,
                writersList: writers,
                actorsList: actors,
                writersFile: null,
                actorsFile: null
            }));
        } catch (error) {
            console.error("Error uploading files:", error);
        }
    };


    const addMovie = async () => {
        let step = "THREE";
        if (!stepStatus[1]) step = "ONE";
        else if (!stepStatus[2]) step = "TWO";
        const updatedMovieData = { ...movieData, step };
        setMovieData(updatedMovieData);

        const token = localStorage.getItem('token');
        try {
            if (updatedMovieData.id === undefined) {
                const response = await axios.post(url + movies, updatedMovieData, {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                });
                if (response.status === 200) {
                    setMovieData((prevMovieData) => ({ ...prevMovieData, id: response.data.id }));
                    await uploadFiles(response.data.id)
                }
            } else {
                const response = await axios.post(url + movies + "/" + updatedMovieData.id, updatedMovieData, {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                });
                if (response.status === 200) {
                    await uploadFiles(updatedMovieData.id)
                }
            }
        } catch (error) {
            console.log(error);
            console.log(error.response.data.message);
        }
    };

    useEffect(() => {
        console.log(detailsData)
    }, [detailsData])

    const handleSaveToDraft = async () => {
        await addMovie();
    };

    const displayStep = (step) => {
        switch (step) {
            case 1:
                return <General genreList={ genreList } />;
            case 2:
                return <Details />;
            case 3:
                return <Venues />;
            default:
                return null;
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
            console.warn(error.response.data.message);
        }
    };

    useEffect(() => {
        getGenreList();
    }, []);

    return (
        <StepperContext.Provider value={ {
            movieData,
            setMovieData,
            detailsData,
            setDetailsData,
            projectionsData,
            setProjectionsData
        } }>
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
                    { displayStep(currentStep) }
                </div>
                <StepperControl
                    handleClick={ handleClick }
                    currentStep={ currentStep }
                    steps={ steps }
                    saveToDraft={ handleSaveToDraft }
                />
            </div>
        </StepperContext.Provider>
    );
};

export default AddMovie;
