import Form from "../../components/Form";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { fas } from '@fortawesome/free-solid-svg-icons'

const CurrentlyShowing = () => {
    return (
        <div className="font-body px-[92px] py-40">
            <p className="text-neutral-800 text-heading-h4 pb-32">Currently Showing (9)</p>
            <Form text="Search movies" input leftIcon={<FontAwesomeIcon className="w-5 h-5 absolute" icon={fas.faMagnifyingGlass} rightIcon={<FontAwesomeIcon className="w-5 h-5 absolute" icon={fas.faChevronDown} />} />} className="w-full"></Form>
        </div>
    )
}

export default CurrentlyShowing;
