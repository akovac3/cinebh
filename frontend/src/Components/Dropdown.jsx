import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck } from "@fortawesome/free-solid-svg-icons";

import { createClassName } from "../utils/utils";

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

    const checkboxStyles = {
        position: 'relative',
        width: '13px',
        height: '13px',
        marginRight: '4px',
    };

    const customCheckboxStyles = {
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        border: `2px solid ${isChecked ? '#B22222' : '#98A2B3'}`,
        borderRadius: '2px',
        backgroundColor: isChecked ? '#B22222' : 'transparent',
    };

    const checkmarkStyles = {
        display: isChecked ? 'block' : 'none',
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        color: 'white',
        fontSize: '11px'
    };

    return (
        <div
            className={ createClassName("text-neutral-900 flex items-center capitalize hover:bg-neutral-100 rounded-8 px-12 py-8", className) }
            onClick={ onClick }
            style={ checkboxContainerStyles }
        >
            { isMultiSelect && (
                <div style={ checkboxStyles }>
                    <input
                        type="checkbox"
                        checked={ isChecked }
                        style={ { display: 'none' } }
                        readOnly
                    />
                    <div style={ customCheckboxStyles }></div>
                    <span style={ checkmarkStyles }>
                        <FontAwesomeIcon className="w-8 font-semibold" icon={ faCheck } />
                    </span>
                </div>
            ) }
            { children }
        </div>
    );
}

export { Dropdown, DropdownItem };
