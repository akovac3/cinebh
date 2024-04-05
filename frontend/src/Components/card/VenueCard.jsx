import Card from "../Card";

const VenueCard = (props) => {
    const venue = props.venue;

    return (
        <Card>
            <div className="flex items-center justify-center">
                <img className="w-[98%] h-[287px] gap-0 rounded-16" src={ venue.photo } alt="Movie" />
            </div>
            <p className="text-[20px]/[24px] font-bold tracking-[0.0085em] pt-12 pl-8">{ venue.name }</p>
            <div className="text-neutral-500 font-normal h-5 tracking-[0.0125em] text-[14px]/[20px] flex p-8">
                <p>{ venue.address }</p>
            </div>
        </Card>
    )
}

export default VenueCard;
