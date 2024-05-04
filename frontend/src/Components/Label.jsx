import { createClassName } from "../utils/utils";

const Label = ({ className, label, active, value, error, children, errorMessage, rightIcon, password = false, leftIcon, variant = 'default', size = 'lg' }) => {
    const varianClassName = {
        default: "bg-neutral-0 border rounded-8 border-neutral-200 gap-16 flex h-full shadow-light-50 text-neutral-500 p-12",
        focused: "border-solid border-primary-600 outline outline-primary-200",
        completed: "",
        disabled: "",
        error: "border border-solid border-error-600 bg-error-25 text-error-600 rounded-8 gap-16 flex h-full shadow-light-50 p-12" // Added error variant
    }

    const sizeClassName = {
        lg: "text-body-l",
        md: "text-body-m w-[75px] h-[45px]",
        sm: "text-body-s w-[62px] h-[32px]"
    }

    return (
        <div className={ createClassName(sizeClassName[size], "relative text-neutral-700 w-full py-8") }>
            { label ? <p className={ `font-semibold pb-4 ${error ? "text-error-300" : "text-neutral-25"}` }>{ label }</p> : null }
            <div className={ active ? createClassName(varianClassName[variant], varianClassName["focused"], className) : createClassName(varianClassName[variant], className) }>
                <div className="flex w-full relative h-full items-center capitalize cursor-pointer">
                    <div className={ `${active || value ? "text-primary-600" : "text-neutral-700"} ${error ? "!text-error-600" : ""} pr-8` }>
                        { leftIcon ? leftIcon : null }
                    </div>
                    { children }
                    <div className="absolute right-4">
                        { rightIcon ? <div className={ `transition-all ${active ? "text-primary-600" : "text-neutral-500"} ${!password && active ? "rotate-180" : "rotate-0"} ${error ? "!text-error-600" : ""} ` }> { rightIcon } </div> : null }
                    </div>
                </div>
            </div>
            { error ? <p className="pt-4 text-error-300 text-body-s">{ errorMessage }</p> : null }
        </div>
    )
}

export default Label;
