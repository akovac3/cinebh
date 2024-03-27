import { useEffect, useState } from "react";

const CoverItem = (props) => {
    const movie = props.movie;
    const photos = props.photos;
    const current  = props.current;
    const [cover, setCover] = useState();


    function getCover(){
        photos.forEach(element => {
            if (element.cover) {
                setCover(element.link)
            }
        });
    }

    useEffect(() => {
        getCover();   
      }, [cover])

    return (
            <img key={cover} className="object-cover w-full h-full block shrink-0 grow-0 transition-transform ease-out duration-500" src={cover} style={{ transform: `translateX(-${current*100}%)`}}/>
        
    )
}

export default CoverItem;