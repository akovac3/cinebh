import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck } from "@fortawesome/free-solid-svg-icons";

import { createClassName } from "../utils/utils";
import Checkbox from "./CheckBox";

const Dropdown = ({ className, children }) => {
    return (
        <div className={ createClassName("absolute top-[110%] bg-neutral-0 z-50 border border-neutral-200 rounded-12 max-h-[220px] p-8", className) }>
            { children }
        </div>
    );
}

const DropdownItem = ({ className, children, onClick, isChecked, isMultiSelect }) => {
    const checkboxContainerStyles = {
        display: 'flex',
        alignItems: 'center',
        cursor: 'pointer'
    };

    return (
        <div
            className={ createClassName("text-neutral-900 flex items-center capitalize hover:bg-neutral-100 rounded-8 px-12 py-8", className) }
            onClick={ onClick }
            style={ checkboxContainerStyles }
        >
            { isMultiSelect && (
                <Checkbox isChecked={ isChecked } />
            ) }
            { children }
        </div>
    );
}

export { Dropdown, DropdownItem };
