import { useState, useEffect } from "react";
import axios from "axios";
import Button from "./Button";
import Venues from "./Venues";

const VenueCarousel = (props) => {
  const [venues, setVenues] = useState([])
  const route = props.route;

  useEffect(() => {
    axios.get(route + "all").then((response) => {
      setVenues(response.data);
      console.log(response)
    }).catch((err) => {
      console.log(err);
    })
  }, [])

  console.log(venues)

  return (
    <div className="text-sliderD bg-lightGray font-body w-full h-full relative">
      <div className="w-full h-full flex py-2 gap-10 items-center justify-center">
        {venues.map((item, index) => {
          return <Venues key={index} venue={item.name}></Venues>
        })}

      </div>
    </div>
  )
}

export default VenueCarousel;