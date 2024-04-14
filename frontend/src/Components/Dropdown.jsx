import { useState } from "react";

import Label from "./Label";

import { createClassName, useOutsideClick } from "../utils/utils";

const Dropdown = ({ className, children, label, placeholder, value, rightIcon, leftIcon }) => {
    const [open, setOpen] = useState(false);

    return (
        <div className={ createClassName("w-full relative flex items-center justify-between py-3", className) } ref={ useOutsideClick(() => { setOpen(false) }) } >
            <div onClick={ () => setOpen(!open) } className="flex w-full justify-between items-center cursor-pointer">
                <Label label={ label } value={ value } rightIcon={ rightIcon } leftIcon={ leftIcon } open={ open }>
                    <div className={ `pl-12 ${open || value ? "!text-neutral-900" : "!text-neutral-500"}` }>
                        <p>{ value ? value.name : placeholder }</p>
                    </div>
                </Label>
            </div>
            { open && (
                <div className="absolute top-[110%] w-full bg-neutral-0 z-50 border border-neutral-200 rounded-12 max-h-[220px] p-8 overflow-y-scroll" onClick={ () => setOpen(!open) }>
                    { children }
                </div>
            ) }
        </div>
    )
}

const DropdownItem = ({ className, children, onClick }) => {
    return (
        <div className={ createClassName("text-neutral-900 flex capitalize hover:bg-neutral-100 rounded-8 px-12 py-8 cursor-pointer", className) } onClick={ onClick }>{ children }</div>
    )
}

export { Dropdown, DropdownItem };
