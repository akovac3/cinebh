import { useState, cloneElement } from "react";

import { Dropdown, DropdownItem } from "./Dropdown";

import { createClassName, useOutsideClick } from "../utils/utils";

const LabeledDropdown = ({ className, children, label, value }) => {
    const [open, setOpen] = useState(false);

    const ref = useOutsideClick(() => { setOpen(false) })

    return (
        <div
            onClick={ () => setOpen(!open) }
            className={ createClassName("w-full relative flex items-center justify-between py-3", className) }
            ref={ ref }
        >
            { label ? cloneElement(label, { active: open, value: value }) : null }
            { open && (
                <Dropdown className="overflow-y-scroll w-full" onClick={ () => setOpen(!open) }>
                    { children }
                </Dropdown>
            ) }
        </div>
    )
}

const LabeledDropdownItem = ({ className, children, onClick }) => {
    return (
        <DropdownItem className={ className } children={ children } onClick={ onClick }></DropdownItem>
    )
}

export { LabeledDropdown, LabeledDropdownItem };
