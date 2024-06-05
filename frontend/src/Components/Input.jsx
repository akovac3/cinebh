import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck, faCircle } from "@fortawesome/free-solid-svg-icons";

import { createClassName } from "../utils/utils";

const Input = ({ className, label, error, open, text, ...props }) => {
    return (
        <input placeholder={ text } { ...props } className={ createClassName(`${error ? "text-error-600" : "text-neutral-900"} focus-within:outline-none w-full`, className) } />
    )
}

const Checkbox = ({ className, rounded = false, children, isChecked }) => {
    const checkboxStyles = {
        position: 'relative',
        width: '16px',
        height: '16px',
        marginRight: '4px',
    };

    const customCheckboxStyles = {
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        border: `2px solid ${isChecked ? '#B22222' : '#98A2B3'}`,
        borderRadius: `${rounded ? "100%" : "4px"}`,
        backgroundColor: isChecked ? '#B22222' : 'transparent',
    };

    const checkmarkStyles = {
        display: isChecked ? 'block' : 'none',
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        color: '#fff',
        fontWeight: '900',
        lineHeight: '16px'
    };

    return (
        <div className={ createClassName("flex gap-4 items-center", className) }>
            <div style={ checkboxStyles }>
                <input
                    type="checkbox"
                    checked={ isChecked }
                    style={ { display: 'none' } }
                    readOnly
                />
                <div style={ customCheckboxStyles }></div>
                <span style={ checkmarkStyles }>
                    { rounded ?
                        <FontAwesomeIcon className="w-[6px] font-semibold" icon={ faCircle } />
                        : <FontAwesomeIcon className="w-12 font-semibold" icon={ faCheck } /> }
                </span>
            </div>
            <p className="text-body-m font-semibold text-neutral-900">{ children }</p>

        </div>
    )
}

const FileInput = ({ className, ref, ...props }) => {
    return <Input className={ className } type="file" ref={ ref } { ...props } />;
};

export { Input, Checkbox, FileInput };