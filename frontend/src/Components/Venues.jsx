const Venues = (props) => {
    const venue = props.venue;
    return (
        <div className="border border-shadow1 rounded w-[55px]">
            <p className="text-shadow1 font-bold">{venue}</p>
        </div>
    )
}

export default Venues;