import { createClassName } from "../utils/utils"

const Button = ({ className, children, variant = 'primary', size = 'lg', type = 'default', ...props }) => {
    const sizeClassName = {
        lg: "text-body-l",
        md: "text-body-m",
        sm: "text-body-s px-16 py-8"
    }

    const variantClassName = {
        primary: "bg-primary-600 text-neutral-25 disabled:bg-neutral-300 hover:bg-primary-700",
        secondary: "text-primary-600 border hover:bg-primary-50 border-primary-600 disabled:text-neutral-300 disabled:bg-neutral-0 disabled:border-neutral-300",
        tertiary: "underline text-primary-600 disabled:text-neutral-300"
    }

    const defaultClassName = {
        default: "font-semibold px-[20px] py-12 rounded-8 gap-16 flex items-center justify-center font-body"
    }

    return (
        <button className={ createClassName(variantClassName[variant], sizeClassName[size], defaultClassName[type], className, "disabled:cursor-not-allowed") }  { ...props }>
            { children }
        </button>
    )
}

export default Button;
