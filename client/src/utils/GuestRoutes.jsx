import  { useContext } from "react";
import { Outlet, Navigate } from "react-router-dom";
import { AppContext } from "../Context/AppContext";

export default function GuestRoutes() {
    const { user } = useContext(AppContext);

    if (!user) {
        return <Outlet />;
    }

    // Redirect based on user role
    if (user.role === 0) {
        return <Navigate to="/admin/dashboard" />;
    }

    if (user.role === 2) {
        return <Navigate to="/user/dashboard" />;
    }

    // Fallback for any other role
    return <Navigate to="/unauthorized" />;
}
