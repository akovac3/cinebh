import { createClassName } from "../utils/utils";

const Input = ({ className, label, error, open, text, ...props }) => {
    return (
        <input placeholder={ text } { ...props } className={ createClassName(`${error ? "text-error-600" : "text-neutral-900"} focus-within:outline-none w-full`, className) } />
    )
}

export default Input;
