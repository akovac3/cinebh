const VenueBadge = (props) => {
    const venue = props.venue;
    return (
        <div className="border border-neutral-200 rounded-8 gap-[10px] p-16">
            <p className="text-neutral-400 text-heading-h5">{venue}</p>
        </div>
    )
}

export default VenueBadge;
