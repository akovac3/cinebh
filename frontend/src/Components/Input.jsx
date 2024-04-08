import { createClassName } from "../utils/utils";
import { useState } from "react";
import Label from "./Label";

const Input = ({ className, label, text, rightIcon, leftIcon, ...props }) => {
    const [open, setOpen] = useState(false);

    return (

        <div className={ createClassName("w-full relative flex items-center justify-between py-3", className) }>
            <div onClick={ () => setOpen(!open) } className="flex w-full justify-between items-center text-neutral-700 cursor-pointer">
                <Label label={ label } rightIcon={ rightIcon } leftIcon={ leftIcon } open={ open }>
                    <div className={ `pl-12 ${open ? "!text-neutral-900" : "!text-neutral-500"} cursor-pointer w-full` }>
                        <input placeholder={ text } { ...props } className="text-neutral-500 focus-within:outline-none !w-full p-0 pl-12" />
                    </div>
                </Label>
            </div>

        </div>
    )
}

export default Input;
