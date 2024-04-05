import { useState, useEffect } from "react";
import axios from "axios";
import VenueBadge from "../VenueBadge";

const VenueCarousel = (props) => {
  const route = props.route;
  const [venues, setVenues] = useState([])

  useEffect(() => {
    axios.get(route + "all").then((response) => {
      setVenues(response.data);
    }).catch((err) => {
      console.log(err);
    })
  }, [])

  return (
    <div className="text-neutral-400 bg-neutral-25 font-body w-full h-full relative">
      <div className="w-full h-full flex py-8 gap-40 items-center justify-center">
        { venues.map((item, index) => {
          return <VenueBadge key={ index } venue={ item.name }></VenueBadge>
        }) }

      </div>
    </div>
  )
}

export default VenueCarousel;
