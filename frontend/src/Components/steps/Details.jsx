import React, { useContext } from "react";

import UploadFile from "../UploadFile";
import UploadImages from "../UploadImages";

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

    const handlePhotosChange = (files) => {
        setDetailsData((prevDetailsData) => ({
            ...prevDetailsData,
            photos: files,
        }));
    };

    const handlePhotosRemove = () => {
        setDetailsData((prevDetailsData) => ({
            ...prevDetailsData,
            photos: [],
        }));
    };

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
            <UploadImages
                files={ detailsData.photos }
                onRemove={ handlePhotosRemove }
                onFileChange={ handlePhotosChange }
            />
        </div>
    );
};

export default Details;
