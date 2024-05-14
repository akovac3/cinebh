import { useLocation, Navigate, Outlet } from "react-router-dom";

const RequireAuth = ({ allowedRoles }) => {
    const location = useLocation();
    const userRole = localStorage.getItem('userRole')

    if (!userRole) {
        return <Navigate to="/" state={ { from: location } } replace />;
    }

    return (
        allowedRoles.includes(userRole)
            ? <Outlet />
            : <Navigate to="/unauthorized" state={ { from: location } } replace />
    );
}

export default RequireAuth;
