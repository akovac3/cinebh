import { NavLink, Outlet } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFilm } from "@fortawesome/free-solid-svg-icons";
import { faBuilding } from "@fortawesome/free-regular-svg-icons";

import SideBar from "../../components/SideBar";

const AdminPanel = () => {
    return (
        <div className="flex font-body">
            <SideBar left className="w-[264px] flex flex-col gap-32 p-32">
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
            </SideBar>
            <div className="pl-[264px] w-full">
                <Outlet />
            </div>
        </div>
    )
}

export default AdminPanel;
