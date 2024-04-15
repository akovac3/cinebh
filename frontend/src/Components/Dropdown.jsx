import { useState, cloneElement } from "react";

import { createClassName, useOutsideClick } from "../utils/utils";

const Dropdown = ({ className, children, label, placeholder, value, rightIcon, leftIcon }) => {
    const [open, setOpen] = useState(false);

    const ref = useOutsideClick(() => { setOpen(false) })

    return (
        <div onClick={ () => setOpen(!open) } className={ createClassName("w-full relative flex items-center justify-between py-3", className) } ref={ ref } >
            { cloneElement(label, { active: open, value: value }) }
            { open && (
<<<<<<< HEAD
                <div className="absolute top-[110%] w-full bg-neutral-0 z-50 border border-neutral-200 rounded-12 max-h-[220px] p-8 overflow-y-scroll" onClick={ () => setOpen(!open) }>
                    { children }
=======
                <div className="absolute top-[110%] w-full bg-neutral-0 z-50 border border-neutral-200 rounded-12 text-neutral-900">
                    <div className="gap-2 pt-8 px-8 max-h-[220px] overflow-y-scroll" onClick={ () => setOpen(!open) }>
                        { children }
                    </div>
>>>>>>> C4-Frontend
                </div>
            ) }
        </div>
    )
}

const DropdownItem = ({ className, children, onClick }) => {
    return (
<<<<<<< HEAD
        <div className={ createClassName("text-neutral-900 flex capitalize hover:bg-neutral-100 rounded-8 px-12 py-8 cursor-pointer", className) } onClick={ onClick }>{ children }</div>
=======
        <div className={ createClassName("", className) }>{ children }</div>
>>>>>>> C4-Frontend
    )
}

export { Dropdown, DropdownItem };
