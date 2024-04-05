import Pagination from "./Pagination";

const List = ({ children }) => {
  return (
    <div className="pb-[20px]">
      <div className="flex gap-24 py-40">
        { children.map((child, index) => {
          { child }
        }) }
      </div>

    </div>
  )
}

const ListItem = ({ children }) => {
  return (
    <div>{ children }</div>
  )
}

export default { List, ListItem };
