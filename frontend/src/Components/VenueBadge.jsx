const VenueBadge = (props) => {
    const venue = props.venue;
    return (
        <div className="border text-neutral-400 bg-neutral-25 font-body border-neutral-200 max-w-fit rounded-8 gap-[10px] p-16">
            <p className="text-heading-h5">{ venue }</p>
        </div>
    )
}

export default VenueBadge;
