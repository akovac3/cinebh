import { ButtonHTMLAttributes, ReactNode } from "react";
import { cva } from "class-variance-authority"
import { twMerge } from "tailwind-merge";
import clsx from "clsx";

const buttonVariants = cva("max-w-fit capitalize gap-2 flex items-center justify-center font-body", {
    variants: {
        variant: {
            default: "font-normal fill:border",
            icon: ""
        },
        size: {
            lg: "text-sm h-[32px] tracking-[0.0025em] rounded-lg px-1.5 py-2",
            md: "text-xs h-[24px] tracking-[0.0015em] rounded px-1 py-2",
            sm: "text-xs h-[16px] tracking-[0.0015em] rounded py-1.5"
        },
        color: {
            grey: "bg-shadow1 text-textGrey fill:bg-white fill:border-grey",
            green: "bg-green text-textGreen",
            red: "bg-red text-textRed",
            yellow: 'bg-yellow text-textYellow'
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