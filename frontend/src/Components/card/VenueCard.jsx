import Card from "../Card";

const VenueCard = (props) => {
    const venue = props.venue;

    return (
        <Card className="h-[395px]">
            <div className="flex items-center justify-center p-12">
                <img className="w-[98%] h-[287px] rounded-16" src={ venue.photo } alt="Venue" />
            </div>
            <p className="text-[20px]/[24px] font-bold tracking-[0.0085em] pt-4 pl-[14px]">{ venue.name }</p>
            <div className="text-neutral-500 font-normal h-5 tracking-[0.0125em] text-[14px]/[20px] flex p-[10px] pl-[14px]">
                <p>{ venue.address }</p>
            </div>
        </Card>
    )
}

export default VenueCard;
