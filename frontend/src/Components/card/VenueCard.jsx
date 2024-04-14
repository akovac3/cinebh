import Card from "../Card";

const VenueCard = (props) => {
    const venue = props.venue;

    return (
        <Card className="h-[395px]">
            <div className="flex items-center justify-center p-12">
                <img className="w-[98%] h-[287px] rounded-16" src={ venue.photo } alt="Movie" />
            </div>
            <p className="text-[20px]/[24px] font-bold tracking-[0.0085em] pl-12">{ venue.name }</p>
            <div className="text-neutral-500 font-normal h-5 tracking-[0.0125em] text-[14px]/[20px] flex p-[10px] pl-[20px]">
                <p>{ venue.address }</p>
            </div>
        </Card>
    )
}

export default VenueCard;
