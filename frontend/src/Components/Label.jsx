const Label = ({ className, label, open, value, children, rightIcon, leftIcon, variant = 'default', size = 'lg', ...props }) => {
    const varianClassName = {
        default: "bg-neutral-0 border rounded-8 border-neutral-200 gap-16 flex shadow-light-50 text-neutral-500 px-12 py-12 focus:border-solid focus:border-primary-600 focus:outline focus:outline-primary-200",
        focused: "border-solid border-primary-600 outline outline-primary-200",
        completed: "",
        disabled: "",
        error: ""
    }

    const sizeClassName = {
        lg: "text-body-l",
        md: "text-body-m w-[75px] h-[45px]",
        sm: "text-body-s w-[62px] h-[32px]"
    }

    return (

        <div className="relative text-neutral-700  w-full">
            { label ? <p className="font-semibold pb-4">{ label }</p> : null }
            <div className={ open ? createClassName(varianClassName[variant], sizeClassName[size], varianClassName["focused"], className) : createClassName(varianClassName[variant], sizeClassName[size], className) }>
                <div className="flex w-full justify-between items-center text-neutral-700 cursor-pointer">
                    <div className="flex w-full items-center text-neutral-700 cursor-pointer focus:border-solid focus:border-primary-600 focus:outline focus:outline-primary-200">
                        <div className={ `${open || value ? "text-primary-600" : "text-neutral-700"}` }>
                            { leftIcon ? leftIcon : null }
                        </div>
                        { children }
                    </div>
                    <div className="text-neutral-500 ">
                        { rightIcon ? <div className={ `transition-all ${open ? "rotate-180 text-primary-600" : "rotate-0 text-neutral-500"}` }> { rightIcon } </div> : null }
                    </div>
                </div>
            </div>
        </div>
    )
}

const createClassName = (...classes) => {
    let finalClass = ''
    for (const c of classes) {
        if (c?.length > 0 && c.trim().length > 0) {
            finalClass += (finalClass.length > 0 && finalClass.trim().length > 0 ? ' ' : '') + c.trim();
        }
    }
    return finalClass;
}

export default Label;
