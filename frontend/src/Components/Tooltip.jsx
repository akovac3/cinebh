import { useState } from "react";
import { createClassName } from "../utils/utils";

const Tooltip = ({ className, infoText, children }) => {
    const [showTooltip, setShowTooltip] = useState(false)
    return (
        <div className="flex flex-col gap-[20px] items-center justify-center relative"
        >
            <div onMouseEnter={ () => setShowTooltip(true) }
                onMouseLeave={ () => setShowTooltip(false) }>
                { children }
            </div>
            <div className={ createClassName(`h-fit z-50 top-[-65px] text-wrap absolute w-[309px] rounded-8 px-8 py-12 text-body-s normal-case font-normal text-neutral-0 bg-neutral-900 text-center transition-all ease-in ${showTooltip ? "opacity-100" : "opacity-0"}`, className) }>
                { infoText }
                <div className="bg-neutral-900 w-0 h-0 border-l-8 border-l-neutral-0 border-r-8 border-r-neutral-0 border-t-8 border-t-neutral-900 absolute bottom-[-8px] left-[47%]"></div>
            </div>
        </div>
    )

}

export default Tooltip;
