import { createClassName } from "../utils/utils"

const Button = ({ className, children, variant = 'primary', size = 'lg', type = 'default', ...props }) => {
    const sizeClassName = {
        lg: "text-body-l",
        md: "text-body-m",
        sm: "text-body-s"
    }

    const variantClassName = {
        primary: "bg-primary-600 text-neutral-25 disabled:bg-neutral-300 disabled:text-neutral-25",
        secondary: "text-primary-600 border border-primary-600 disabled:text-neutral-300 disabled:border-neutral-300",
        tertiary: "underline text-primary-600 disabled:text-neutral-300"
    }

    const defaultClassName = {
        default: "max-w-fit font-semibold px-[20px] py-12 rounded-8 gap-16 flex items-center justify-center font-body"
    }

    return (
        <button className={ createClassName(variantClassName[variant], sizeClassName[size], defaultClassName[type], className) }  { ...props }>
            { children }
        </button>
    )
}

export default Button;
