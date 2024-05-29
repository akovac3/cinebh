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
            <p className="text-body-l font-semibold mt-24 mb-8">Upload Photos</p>
            <div className="border border-neutral-200 bg-neutral-0 flex items-center justify-center rounded-16 min-h-160">
                <div className="flex flex-col items-center justify-center h-full">
                    <Button variant="tertiary"><FontAwesomeIcon icon={ faPlus } />Upload Photos</Button>
                    <div className="text-neutral-500 text-body-m text-center">
                        or just drag and drop
                        <br />  <p className="mt-8">* Add 4 photos </p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Details;
