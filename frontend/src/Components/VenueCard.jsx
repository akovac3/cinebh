const VenueCard = (props) => {
    const venue = props.venue;

    return (
        <div className="w-[302px] h-[395px] gap-0 bg-white rounded-3xl border border-solid border-shadow1 text-gray shadow-[0_4px_6px_-1px_rgba(52,64,84,0.08)]">
        <div className="p-2.5">
              <div className="flex items-center justify-center"> 
          <img className="w-[270px] h-[287px] gap-0 rounded-2xl" src={venue.photo} alt=""/>
          </div>

          <p className="text-xl/6 font-bold	tracking-[0.0085em]">{venue.name}</p>
          <div className="text-border font-normal h-5 tracking-[0.0125em] text-sm flex p-3">
          <p>{venue.address}</p>
          </div>

        </div>
        </div>
    )
}

export default VenueCard;