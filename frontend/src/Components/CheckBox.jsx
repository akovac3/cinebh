import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck } from "@fortawesome/free-solid-svg-icons";

const Checkbox = ({ isChecked }) => {
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
    )
}

export default Checkbox;