import React, { useContext } from "react";
import { Outlet, Navigate } from "react-router-dom";
import { AppContext } from "../Context/AppContext";

export default function ProtectedRoutes({ allowedRoles }) {
    const { user } = useContext(AppContext);

    if (!user) {
        return <Navigate to="/login" replace />;
    }

    if (allowedRoles && !allowedRoles.includes(user.role)) {
        return <Navigate to="/unauthorized" replace />;
    }

    return <Outlet />;
}
