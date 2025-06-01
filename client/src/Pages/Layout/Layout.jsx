import { useContext } from "react";
import { Link, Outlet } from "react-router-dom";
import { AppContext } from "../../Context/AppContext";
import Logout from './../Auth/Logout';

export default function Layout() {
    const { user } = useContext(AppContext);

    return (
        <>
            <div className="bg-blue-900">
                <div className="max-w-7xl mx-auto flex justify-between py-6">
                    <Link to="/" className="nav-link">
                        Home
                    </Link>
                    {user ? (
                        <Link to="/dashboard" className="nav-link">
                            Dashboard
                        </Link>
                    ) : (
                        <Link to="/login" className="nav-link">
                            Login
                        </Link>
                    )}
                </div>
            </div>
            <div className="mt-2 rounded max-w-7xl mx-auto">
                <Outlet />
            </div>
        </>
    );
}
