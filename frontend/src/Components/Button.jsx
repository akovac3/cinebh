import { cva } from "class-variance-authority"
import { twMerge } from "tailwind-merge";
import clsx from "clsx";

const buttonVariants = cva("max-w-fit rounded-8 gap-16 flex items-center justify-center font-body", {
    variants: {
        variant: {
            primary: "bg-primary-600 text-neutral-25 font-semibold px-[20px] py-12 disabled:bg-neutral-300 disabled:text-neutral-25",
            secondary: "text-primary-600 border border-primary-600 font-semibold px-[20px] py-12 disabled:text-neutral-300 disabled:border-neutral-300"
        },
        size: {
            lg: "text-body-l",
            md: "text-body-m",
            sm: "text-body-s w-[62px] h-[32px]"
        }
    },
    defaultVariants: {
        variant: "primary",
        size: "lg"
    }
})

const Button = ({ children, className, variant, size, ...props }) => {
    return (
        <button className={twMerge(clsx(buttonVariants({ variant, size, className })))} {...props}>
            {children}
        </button>
    )
}

export default Button;
