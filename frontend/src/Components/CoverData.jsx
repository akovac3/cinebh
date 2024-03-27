import { useEffect, useState } from "react";
import Button from "./Button";

const CoverData = (props) => {
    const movie = props.movie;
    const current  = props.current;
    

    return (

       <div className="absolute top-[376px] right-0 left-24 font-body w-full h-full " >
                <p className="font-bold text-5xl/[56px] text-lightGray tracking-[-0.005em]">{movie.name}</p>
                <Button variant="primary" className="w-[114px]">Buy Ticket</Button>
       </div> 
    )
}

export default CoverData;