import { createClassName } from "../utils/utils";

const Label = ({ className, label, active, value, error, children, errorMessage, rightIcon, password = false, leftIcon, variant = 'default', size = 'lg' }) => {
    const varianClassName = {
        default: "bg-neutral-0 border rounded-8 border-neutral-200 gap-16 flex h-full shadow-light-50 text-neutral-500",
        focused: "border-solid border-primary-600 outline outline-primary-200",
        completed: "",
        disabled: "",
        error: "border border-solid border-error-600 bg-error-25 text-error-600 rounded-8 gap-16 flex h-full shadow-light-50 p-12"
    }

    const sizeClassName = {
        lg: "text-body-l p-12",
        md: "text-body-m h-[45px]",
        sm: "text-body-s h-[33px] w-[56px] p-8"
    }

    return (
        <div className={ createClassName("relative text-primary-25 w-full", className) }>
            { label ? <p className={ `font-semibold pb-4 ${error ? "text-error-300" : ""}` }>{ label }</p> : null }
            <div className={ active ? createClassName(varianClassName[variant], varianClassName["focused"], sizeClassName[size]) : createClassName(varianClassName[variant], sizeClassName[size]) }>
                <div className={ `flex w-full relative h-full capitalize cursor-pointer ${active || value ? "text-neutral-900" : "text-neutral-500"}` }>
                    <div className={ `${active || value ? "text-primary-600" : "text-neutral-700"} ${error ? "!text-error-600" : ""} pr-8` }>
                        { leftIcon ? leftIcon : null }
                    </div>
                    { children }
                    <div className="absolute right-4">
                        { rightIcon ? <div className={ `transition-all ${active ? "text-primary-600" : "text-neutral-500"} ${!password && active ? "rotate-180" : "rotate-0"} ${error ? "!text-error-600" : ""} ` }> { rightIcon } </div> : null }
                    </div>
                </div>
            </div>
            { error ? <p className="pt-8 text-error-300 text-body-s">{ errorMessage }</p> : null }
        </div>
    )
}

export default Label;
