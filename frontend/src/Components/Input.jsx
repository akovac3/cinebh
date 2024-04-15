import Label from "./Label";

import { createClassName } from "../utils/utils";

const Input = ({ className, label, placeholder, open, text, rightIcon, leftIcon, ...props }) => {

    return (
        <div className={ createClassName("w-full relative flex items-center justify-between text-neutral-700 cursor-pointer py-3", className) }>
            <Label label={ label } rightIcon={ rightIcon } leftIcon={ leftIcon } open={ open }>
                <div className={ `${open ? "!text-neutral-900" : "!text-neutral-500"} cursor-pointer w-full` }>
                    <input placeholder={ placeholder ? placeholder : text } { ...props } className="text-neutral-500 focus-within:outline-none !w-full p-0 pl-12" />
                </div>
            </Label>
        </div>
    )
}

export default Input;
