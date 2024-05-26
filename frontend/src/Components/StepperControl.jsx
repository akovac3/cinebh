import Button from "./Button";

const StepperControl = ({ handleClick, currentStep, steps }) => {
    return (
        <div className="flex mt-24 mb-32">
            <div className="flex-1">
                <Button onClick={ () => handleClick("back") } disabled={ currentStep === 1 } variant="tertiary" className={ `!justify-start` }>Back</Button>
            </div>
            <div className="flex gap-16">
                <Button variant="secondary">Save to Drafts</Button>
                <Button onClick={ () => handleClick("continue") }>
                    { currentStep === steps.length ? "Add Movie" : "Continue" }</Button>
            </div>
        </div>
    )
}

export default StepperControl;
