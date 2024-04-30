import Label from "./Label";
import { createClassName } from "../utils/utils";

const Input = ({ className, variant, label, value, placeholder, open, text, rightIcon, leftIcon, error, ...props }) => {
    return (
        <div className={ createClassName("w-full h-full relative flex items-center justify-between text-neutral-700 py-3", className) }>
            <Label label={ label } rightIcon={ rightIcon } leftIcon={ leftIcon } variant={ error ? 'error' : variant } error={ error } active={ open } value={ placeholder }>
                <div className={ `${open ? "!text-neutral-900" : "!text-neutral-500"} cursor-pointer w-full h-full` }>
                    <input placeholder={ placeholder ? placeholder : text } { ...props } className="text-neutral-500 focus-within:outline-none !h-full !w-full p-0 pl-12" { ...props } />
                </div>
            </Label>
        </div>
    )
}

export default Input;
