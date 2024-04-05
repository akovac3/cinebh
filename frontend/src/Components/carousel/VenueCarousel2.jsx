import { useState, useEffect } from "react";
import axios from "axios";
import VenueBadge from "../VenueBadge";
import { CustomCarousel, CustomCarouselItem } from "../Carousel";

const VenueCarousel = (props) => {
  const [venues, setVenues] = useState([])
  const route = props.route;

  useEffect(() => {
    axios.get(route + "all").then((response) => {
      setVenues(response.data);
      setVenues(venues.concat(venues));
    }).catch((err) => {
      console.log(err);
    })
  }, [])

  return (
    <CustomCarousel covers={ false } navigation={ false }>
      { venues.map((item, index) => {
        return <CustomCarouselItem className="w-full">
          <VenueBadge key={ index } venue={ item.name } />
        </CustomCarouselItem>
      }) }
    </CustomCarousel>
  )
}

export default VenueCarousel;
