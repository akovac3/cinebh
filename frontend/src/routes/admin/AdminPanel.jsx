import { NavLink, Outlet } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFilm } from "@fortawesome/free-solid-svg-icons";
import { faBuilding } from "@fortawesome/free-regular-svg-icons";

const AdminPanel = () => {
    return (
        <div className="flex font-body">
            <div className="left-0 top-80 fixed w-[264px] h-full z-20 bg-neutral-800 border-r border-neutral-200 flex flex-col gap-32 p-32">
                <div className="text-heading-h5 pb-40 border-b border-neutral-500 text-neutral-25">Admin</div>
                <NavLink
                    to="/admin-panel/movies"
                    className={ ({ isActive }) => isActive ? "underline font-semibold text-neutral-25" : "text-neutral-300" }
                >
                    <FontAwesomeIcon icon={ faFilm } />
                    <span className="pl-4">Movies</span>
                </NavLink>
                <NavLink
                    to="/admin-panel/venues"
                    className={ ({ isActive }) => isActive ? "underline font-semibold text-neutral-25" : "text-neutral-300" }
                >
                    <FontAwesomeIcon icon={ faBuilding } />
                    <span className="pl-8">Venues</span>
                </NavLink>
            </div>
            <div className="pl-[264px] w-full">
                <Outlet />
            </div>
        </div>
    )
}

export default AdminPanel;
