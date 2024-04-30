import { useState } from "react";
import { createClassName, useOutsideClick } from "../utils/utils";

const SideBar = ({ className, children }) => {
    const [hidden, setHidden] = useState(false)
    const sideBarRef = useOutsideClick(() => { setHidden(true) })

    return (
        <aside hidden={ hidden } className={ createClassName("right-0 top-80 absolute w-[500px] bg-neutral-800 border border-neutral-400 font-body", className) } ref={ sideBarRef }>
            { children }
        </aside>
    )
}

export default SideBar;
