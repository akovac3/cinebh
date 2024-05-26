import { useState, cloneElement, Children } from "react";

import { Dropdown, DropdownItem } from "./Dropdown";
import { createClassName, useOutsideClick } from "../utils/utils";

const LabeledDropdown = ({ className, children, label, value, isMultiSelect = false, onClick }) => {
    const [open, setOpen] = useState(false);
    const [selectedValues, setSelectedValues] = useState([]);

    const ref = useOutsideClick(() => { setOpen(false) });

    const handleSelect = (val) => {
        if (isMultiSelect) {
            const newValues = selectedValues.includes(val) ? selectedValues.filter((v) => v !== val) : [...selectedValues, val];
            setSelectedValues(newValues);
            onClick(newValues);
        } else {
            setOpen(false);
        }
    };

    return (
        <div className={ createClassName("w-full relative flex items-center justify-between py-3", className) }
            ref={ ref }
        >
            <div className={ createClassName("w-full", className) }
                onClick={ () => setOpen(!open) }
            >
                { label ? cloneElement(label, { active: open, value: value }) : null }
            </div>
            { open && (
                <Dropdown className={ `overflow-y-scroll w-full ${isMultiSelect ? "top-[85%]" : "top-[110%]"}` } onClick={ () => { if (isMultiSelect) return; setOpen(!open) } }>
                    { isMultiSelect ? Children.map(children, (child) =>
                        cloneElement(child, {
                            onClick: () => handleSelect(child.props.value),
                            isChecked: selectedValues.includes(child.props.value),
                            isMultiSelect: isMultiSelect
                        })
                    ) : children }
                </Dropdown>
            ) }
        </div>
    );
}

const LabeledDropdownItem = ({ className, children, onClick, value, isChecked, isMultiSelect }) => {
    return (
        <DropdownItem
            className={ className }
            onClick={ onClick }
            value={ value }
            isChecked={ isChecked }
            isMultiSelect={ isMultiSelect }
        >
            { children }
        </DropdownItem>
    )
}

export { LabeledDropdown, LabeledDropdownItem };
