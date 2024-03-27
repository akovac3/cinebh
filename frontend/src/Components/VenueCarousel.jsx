import { useState, useEffect } from "react";
import axios from "axios";
import Button from "./Button";
import Venues from "./Venues";

const VenueCarousel = (props) => {
    const [venues, setVenues] = useState([])
    const route = props.route;

    const fetchResults = async () => {
        try {
          await axios.get(route).then((response) => {
            setVenues(response.data);
          }) 

          //setVenues(response.data);
          console.log(response.data)
          //console.log(response.data.totalElements)
        } catch (err) {
          console.log(err);
        }

      };

  

    useEffect(() => {
          axios.get(route).then((response) => {
            setVenues(response.data);
            console.log(response)
          }).catch((err) => {
            console.log(err);
          })
                //fetchResults();   
  }, [])

  console.log(venues)

    return (
        <div className="text-shadow1 font-body w-full h-full relative bg-lightGray">
           <div className="w-full h-full flex p-4 gap-2 items-center justify-center">
           <p>Naslov</p>
            {venues.map((item, index) => {
              return <Venues key={index} venue = {item.name}></Venues>
            })}

            </div>
        </div>
    )
}

export default VenueCarousel;