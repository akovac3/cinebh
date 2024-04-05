import Pagination from "./Pagination";

const CustomList = ({ children, postsPerPage, totalPosts, paginateBack, paginateFront, currentPage, maxPages }) => {
  return (
    <div className="pb-[20px]">
      <div className="flex gap-24 py-40">
        { children }
      </div>

      <Pagination
        postsPerPage={ postsPerPage }
        totalPosts={ totalPosts }
        paginateBack={ paginateBack }
        paginateFront={ paginateFront }
        currentPage={ currentPage }
        maxPages={ maxPages } />
    </div>
  )
}

const CustomListItem = ({ children }) => {
  return (
    <div>{ children }</div>
  )
}

export { CustomList, CustomListItem }