const SideBar = ({ className, children }) => {
    return (
        <aside className="right-0 top-80 absolute w-[500px] bg-neutral-800 border border-neutral-400 font-body">
            { children }
        </aside>
    )
}

export default SideBar;
