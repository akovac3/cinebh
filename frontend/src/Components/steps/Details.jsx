import React, { useContext } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";

import Button from "../Button";
import UploadFile from "../UploadFile";

import { StepperContext } from "../../contexts/StepperContext";

const Details = () => {
    const { detailsData, setDetailsData } = useContext(StepperContext);

    const handleFileChange = (file, type) => {
        setDetailsData((prevDetailsData) => ({
            ...prevDetailsData,
            [`${type}File`]: file,
            [`${type}List`]: null
        }));
    };

    const handleRemove = (type) => {
        setDetailsData((prevDetailsData) => ({
            ...prevDetailsData,
            [`${type}File`]: null,
            [`${type}List`]: null,
            [`${type}Delete`]: true,
        }));
    }

    return (
        <div>
            <div className="grid grid-cols-2 text-neutral-800">
                <UploadFile
                    file={ detailsData.writersFile || null }
                    text="Writers"
                    onRemove={ () => handleRemove("writers") }
                    onFileChange={ (file) => handleFileChange(file, "writers") }
                    names={ detailsData.writersList || [] }
                />
                <UploadFile
                    file={ detailsData.actorsFile || null }
                    text="Actors"
                    onRemove={ () => handleRemove("actors") }
                    onFileChange={ (file) => handleFileChange(file, "actors") }
                    names={ detailsData.actorsList || [] }
                />
            </div>
            <p className="text-body-l font-semibold mt-24 mb-8">Upload Photos</p>
            <div className="border border-neutral-200 bg-neutral-0 flex items-center justify-center rounded-16 min-h-160">
                <div className="flex flex-col items-center justify-center h-full">
                    <Button variant="tertiary"><FontAwesomeIcon icon={ faPlus } />Upload Photos</Button>
                    <div className="text-neutral-500 text-body-m text-center">
                        or just drag and drop
                        <br />  <p className="mt-8">* Add 4 photos </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Details;
