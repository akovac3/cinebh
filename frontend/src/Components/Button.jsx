const Button = ({ className, children, variant = 'primary', size = 'lg', type = 'default', ...props }) => {
    const sizeClassName = {
        lg: "text-body-l",
        md: "text-body-m",
        sm: "text-body-s w-[62px] h-[32px]"
    }

    const variantClassName = {
        primary: "bg-primary-600 text-neutral-25 font-semibold px-[20px] py-12 disabled:bg-neutral-300 disabled:text-neutral-25",
        secondary: "text-primary-600 border border-primary-600 font-semibold px-[20px] py-12 disabled:text-neutral-300 disabled:border-neutral-300"
    }

    const defaultClasname = {
        default: "max-w-fit rounded-8 gap-16 flex items-center justify-center font-body"
    }

    return (
        <button className={ createClassName(variantClassName[variant], sizeClassName[size], defaultClasname[type], className) }  { ...props }>
            { children }
        </button>
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

export default Button;
