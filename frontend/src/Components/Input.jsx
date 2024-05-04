import { cloneElement } from "react";

import { createClassName } from "../utils/utils";

const Input = ({ className, label, value, placeholder, error, open, text, ...props }) => {
    return (
        <div className={ createClassName("w-full h-full relative flex items-center justify-between text-neutral-700 py-3", className) }>
            { cloneElement(
                label, {
                active: open,
                value: value,
                error: error,
                children:
                    <div className={ `${open ? "!text-neutral-900" : "!text-neutral-500"} cursor-pointer w-full h-full` }>
                        <input placeholder={ placeholder ? placeholder : text } { ...props } className={ `${error ? "text-error-600" : "text-neutral-500"} focus-within:outline-none !h-full !w-full p-0 pl-12` } { ...props } />
                    </div>
            }) }
        </div>
    )
}

export default Input;
