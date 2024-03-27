import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { fas } from '@fortawesome/free-solid-svg-icons'
import Button from "./Button";


export default function Pagination({
  postsPerPage,
  totalPosts,
  paginateFront,
  paginateBack,
  currentPage,
  maxPages
}) {


  return (
    <div className='p-3 gap-4 flex items-end justify-end'>

      <div className="h-[48px] tracking-[0.005em] font-normal text-base flex items-center justify-center">
        <p className=''>
          Showing <span></span>
          <span className=' font-semibold	'>{currentPage * postsPerPage + 1}</span>
          <span> </span>
          to
          <span className="font-semibold	"> { currentPage * postsPerPage + postsPerPage > totalPosts ? totalPosts : currentPage * postsPerPage + postsPerPage} </span>
          of
          <span className="font-semibold	"> {totalPosts} </span>
          results
        </p>
      </div>
      <nav className=''></nav>
      <div className="gap-4">
        <nav className=" flex"
        >
         
<Button onClick={paginateBack} disabled={currentPage===0} variant="secondary" className="bg-white text-gray disabled:text-shadow1 disabled:border-shadow1  shadow-sm border-shadow1 shadow-[rgba(52, 64, 84, 0.04)] w-[48px] h-[48px] mr-4"> 
        <FontAwesomeIcon icon={fas.faArrowLeft} style={{width:"14px", height:"16px"}} />
</Button>
<Button onClick={paginateFront} disabled={currentPage===maxPages-1} variant="secondary" className="bg-white text-gray disabled:text-shadow1 disabled:border-shadow1 shadow-sm border-shadow1 shadow-[rgba(52, 64, 84, 0.04)] w-[48px] h-[48px]"> 
        <FontAwesomeIcon icon={fas.faArrowRight} style={{width:"14px", height:"16px"}} />
</Button>

          
        </nav>
      </div>
    </div>
  );
}