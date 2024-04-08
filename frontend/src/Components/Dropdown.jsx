import Label from "./Label";
import { useState } from "react";
import { createClassName } from "../utils/utils";

const Dropdown = ({ className, children, label, placeholder, value, rightIcon, leftIcon, onChange, ...props }) => {
    const [open, setOpen] = useState(false);
    return (
        <div className={ createClassName("w-full relative flex items-center justify-between py-3", className) }>
            <div onClick={ () => setOpen(!open) } className="flex w-full justify-between items-center text-neutral-700 cursor-pointer">
                <Label label={ label } rightIcon={ rightIcon } leftIcon={ leftIcon } open={ open }>
                    <div className={ `pl-12 ${open ? "!text-neutral-900" : "!text-neutral-500"} cursor-pointer` }>
                        <p>{ value ? value.name : placeholder }</p>
                    </div>
                </Label>
            </div>
            { open && <div className="absolute top-[110%] left-2 w-full bg-neutral-0 z-50 border border-neutral-200 rounded-12 text-neutral-900">
                <div className="gap-2 pt-8 px-8 max-h-[220px] overflow-y-scroll" onClick={ () => setOpen(!open) }>
                    { children }
                </div>
            </div> }
        </div>
    );

}

const DropdownItem = ({ className, children }) => {
    return (
        <div className={ className }>{ children }</div>
    )
}

export { Dropdown, DropdownItem };
