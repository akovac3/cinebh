const Card = ({ children }) => {
    return (
        <div className="font-body w-[302px] h-[395px] gap-0 bg-neutral-0 rounded-24 border border-solid border-neutral-200 text-neutral-800 shadow-light-100">
            <div className="p-[10px]">
                {children}
            </div>
        </div>
    )
}

export default Card;
