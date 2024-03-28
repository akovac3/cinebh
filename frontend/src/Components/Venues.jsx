const Venues = (props) => {
    const venue = props.venue;
    return (
        <div className="border border-shadow1 rounded-lg gap-2.5 p-4">
            <p className="text-sliderD font-bold">{venue}</p>
        </div>
    )
}

export default Venues;