import { cva } from "class-variance-authority"
import { twMerge } from "tailwind-merge";
import clsx from "clsx";

const buttonVariants = cva("max-w-fit capitalize gap-8 flex items-center justify-center font-body", {
    variants: {
        variant: {
            default: "font-normal fill:border",
            icon: ""
        },
        size: {
            lg: "text-body-m font-normal h-[32px] rounded-8 px-[6px] py-8",
            md: "text-body-s font-normal h-[24px] rounded-4 px-4 py-8",
            sm: "text-body-s font-normal h-[16px] rounded-4 py-[6px]"
        },
        color: {
            grey: "bg-neutral-200 text-neutral-700 fill:bg-neutral-0 fill:border-neutral-200",
            green: "bg-success-100 text-success-700",
            red: "bg-error-100 text-error-700",
            yellow: 'bg-warning-100 text-warning-700'
        }
    },
    defaultVariants: {
        variant: "primary",
        size: "lg",
        color: "grey"
    }
})

const Badge = ({ children, className, variant, size, ...props }) => {
    return (
        <div className={twMerge(clsx(buttonVariants({ variant, size, className })))} {...props}>
            {children}
        </div>
    )
}

export default Badge;
