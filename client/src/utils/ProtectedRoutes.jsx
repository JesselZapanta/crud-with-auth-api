import React, { useContext } from 'react'
import { Outlet, Navigate } from 'react-router-dom'
import { AppContext } from '../Context/AppContext'

export default function ProtectedRoutes() {
    const {user} = useContext(AppContext);

    return user ? <Outlet/> : <Navigate to="/"/>
}
