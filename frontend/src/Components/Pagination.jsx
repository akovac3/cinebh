import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { fas } from '@fortawesome/free-solid-svg-icons'
import Button from "./Button";

const Pagination = ({ postsPerPage, totalPosts, paginateFront, paginateBack, currentPage, maxPages }) => {
  return (
    <div className='p-12 gap-16 flex items-end justify-end'>
      <div className="h-[48px] text-body-l font-normal flex items-center justify-center">
        <p className=''>
          Showing <span></span>
          <span className=' font-semibold	'>{currentPage * postsPerPage + 1}</span>
          <span> </span>
          to
          <span className="font-semibold	"> {currentPage * postsPerPage + postsPerPage > totalPosts ? totalPosts : currentPage * postsPerPage + postsPerPage} </span>
          of
          <span className="font-semibold	"> {totalPosts} </span>
          results
        </p>
      </div>
      <nav className=''></nav>
      <div className="gap-16">
        <nav className=" flex">
          <Button onClick={paginateBack} disabled={currentPage === 0} variant="secondary" className="bg-neutral-0 text-neutral-800 disabled:text-neutral-200 disabled:border-neutral-200 border-neutral-200 shadow-light-25 w-[48px] h-[48px] mr-16">
            <FontAwesomeIcon icon={fas.faArrowLeft} style={{ width: "14px", height: "16px" }} />
          </Button>
          <Button onClick={paginateFront} disabled={currentPage === maxPages - 1} variant="secondary" className="bg-neutral-0 text-neutral-800 disabled:text-neutral-200 disabled:border-neutral-200 border-neutral-200 shadow-light-25 w-[48px] h-[48px]">
            <FontAwesomeIcon icon={fas.faArrowRight} style={{ width: "14px", height: "16px" }} />
          </Button>
        </nav>
      </div>
    </div>
  )
}

export default Pagination;
