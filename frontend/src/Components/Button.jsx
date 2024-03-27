import { ButtonHTMLAttributes, ReactNode } from "react";
import { cva} from "class-variance-authority"
import { twMerge } from "tailwind-merge";
import clsx from "clsx";

const buttonVariants = cva("rounded-lg gap-4 flex items-center justify-center font-body", {
    variants : {
        variant : {
            primary: "bg-darkRed text-lightGray font-semibold px-3 py-5 disabled:bg-dis disabled:text-lightGray",
            secondary: "text-darkRed border border-darkRed font-semibold px-3 py-5 disabled:text-dis disabled:border-dis"
        },
        size : {
            lg: "text-base w-[80px] h-[48px] tracking-[0.005em] ",
            md:"text-sm w-[75px] h-[45px] tracking-[0.0025em] ",
            sm: "text-xs w-[62px] h-[32px] tracking-[0.0015em] "
        }
    },
    defaultVariants: {
        variant: "primary",
        size: "lg"
    }
})
const Button = ({children, className, variant, size, ...props}) => {
    return (
        <button className={twMerge(clsx(buttonVariants({variant, size, className})))} {...props}>
            {children}
        </button>
    )
}

export default Button;