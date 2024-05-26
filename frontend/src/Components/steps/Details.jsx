import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";

import Button from "../Button";

const Details = () => {
    return (
        <div>
            <div className="grid grid-cols-2 text-neutral-800">
                <p className="text-body-l font-semibold mb-8">Writers</p>
                <p className="text-body-l font-semibold mb-8">Actors</p>

                <div className="border border-neutral-200 bg-neutral-0 rounded-16 min-h-160 mr-24">
                    <div className="flex items-center justify-center h-full">
                        <Button variant="tertiary"><FontAwesomeIcon icon={ faPlus } />Upload Writers via CSV</Button>
                    </div>
                </div>
                <div className="border border-neutral-200 bg-neutral-0 rounded-16 min-h-160">
                    <div className="flex items-center justify-center h-full">
                        <Button variant="tertiary"><FontAwesomeIcon icon={ faPlus } />Upload Cast via CSV</Button>
                    </div>
                </div>
            </div>
            <div className="border border-neutral-200 bg-neutral-0 rounded-16 min-h-160">
                <div className="flex items-center justify-center h-full">
                    <Button variant="tertiary"><FontAwesomeIcon icon={ faPlus } />Upload Photos</Button>
                </div>
            </div>
        </div>
    )
}

export default Details;
