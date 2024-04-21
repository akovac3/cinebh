import Pagination from "./Pagination";

import { createClassName } from "../utils/utils";

const List = ({ className, seeAll, children, postsPerPage, totalPosts, paginateBack, paginateFront, currentPage, maxPages }) => {
  return (
    <div className={ createClassName("pb-[20px]", className) }>
      <div className={ `gap-16 py-40 grid ${seeAll ? "lg:grid-cols-6 md:grid-cols-3 sm:grid-cols-2" : "lg:grid-cols-4 sm:grid-cols-1 md:grid-cols-2"}` }>
        { children }
      </div>

      <Pagination
        postsPerPage={ postsPerPage }
        totalPosts={ totalPosts }
        paginateBack={ paginateBack }
        paginateFront={ paginateFront }
        currentPage={ currentPage }
        maxPages={ maxPages }
      />
    </div>
  )
}

const ListItem = ({ children }) => {
  return (
    <div>{ children }</div>
  )
}

export { List, ListItem }
