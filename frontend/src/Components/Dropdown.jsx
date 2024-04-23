import { useState, cloneElement } from "react";

import { createClassName, useOutsideClick } from "../utils/utils";

const Dropdown = ({ className, children, label, value }) => {
    const [open, setOpen] = useState(false);

    const ref = useOutsideClick(() => { setOpen(false) })

    return (
        <div onClick={ () => setOpen(!open) } className={ createClassName("w-full relative flex items-center justify-between py-3", className) } ref={ ref } >
            { cloneElement(label, { active: open, value: value }) }
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
