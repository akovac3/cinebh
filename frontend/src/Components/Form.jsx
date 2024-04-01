import { cva } from "class-variance-authority"
import { twMerge } from "tailwind-merge";
import clsx from "clsx";

const formVariants = cva("rounded-8 border gap-16 flex", {

    variants: {
        variant: {
            default: "bg-neutral-0 border-neutral-200 text-neutral-500 px-12 py-[20px] pl-40 focus-within:border-solid focus-within:border-primary-600 focus-within:outline focus-within:outline-primary-200",
            focused: "",
            completed: "",
            disabled: "",
            error: ""
        },
        size: {
            lg: "text-body-l w-[400px] h-[48px]",
            md: "text-body-m w-[75px] h-[45px]",
            sm: "text-body-s w-[62px] h-[32px]"
        }
    },
    defaultVariants: {
        variant: "default",
        size: "lg"
    }
})
const Form = ({ label, text, input, dropdown, rightIcon, leftIcon, className, variant, size, ...props }) => {
    return (

        <div className={twMerge(clsx(formVariants({ variant, size, className })))}>
            <form >
                <div>
                    <div className="relative flex text-neutral-200  ">
                    {label ? <p>{label}</p> : null}
                    <div className=" flex flex-1 pr-8">
                        {leftIcon ? leftIcon : null}
                        { input ? <input placeholder={text} {...props} className="focus-within:outline-none p-0"/> : null}
                    </div>
                        {rightIcon ? rightIcon : null}
                    </div>
                </div>
            </form>
        </div>
    )
}

export default Form;
