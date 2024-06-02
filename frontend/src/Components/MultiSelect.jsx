import { useState, cloneElement, Children } from "react";

import { Dropdown, DropdownItem } from "./Dropdown";

import { createClassName, useOutsideClick } from "../utils/utils";
import { Checkbox } from "./Input";

const MultiSelect = ({ className, children, label, value, onClick }) => {
    const [open, setOpen] = useState(false);
    const [selectedValues, setSelectedValues] = useState([]);

    const ref = useOutsideClick(() => { setOpen(false) });

    const handleSelect = (val) => {
        const newValues = selectedValues.includes(val) ? selectedValues.filter((v) => v !== val) : [...selectedValues, val];
        setSelectedValues(newValues);
        onClick(newValues);
    };

    return (
        <div className={ createClassName("w-full relative flex items-center justify-between py-3", className) } ref={ ref }>
            <div className={ createClassName("w-full", className) } onClick={ () => setOpen(!open) }>
                { label ? cloneElement(label, { active: open, value: value }) : null }
            </div>
            { open && (
                <Dropdown className="overflow-y-scroll w-full top-[85%]" onClick={ () => setOpen(!open) }>
                    { Children.map(children, (child) =>
                        cloneElement(child, {
                            onClick: () => handleSelect(child.props.value),
                            isChecked: selectedValues.includes(child.props.value),
                            isMultiSelect: true
                        })
                    ) }
                </Dropdown>
            ) }
        </div>
    );
}

const MultiSelectItem = ({ className, children, onClick, value, isChecked }) => {
    return (
        <DropdownItem className={ createClassName("items-center gap-4", className) } onClick={ onClick } value={ value }>
            <Checkbox isChecked={ isChecked } />
            { children }
        </DropdownItem>
    );
}

export { MultiSelect, MultiSelectItem };
