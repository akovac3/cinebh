import { useState, useEffect } from "react";
import axios from "axios";
import VenueBadge from "../VenueBadge";
import { Carousel, CarouselItem } from "../Carousel";

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
    <Carousel covers={ false }>
      { venues.map((item, index) => {
        return <CarouselItem>
          <VenueBadge key={ index } venue={ item.name } />
        </CarouselItem>
      }) }
    </Carousel>
  )
}

export default VenueCarousel;
