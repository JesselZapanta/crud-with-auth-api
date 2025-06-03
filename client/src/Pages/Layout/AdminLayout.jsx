import { Outlet, Link } from "react-router-dom";
import Logout from "../Auth/Logout";

export default function AdminLayout() {
    return (
        <>
            <div className="bg-blue-900">
                <div className="max-w-7xl mx-auto flex justify-between py-6">
                    <div>
                        <Link to="/" className="nav-link">
                            Home
                        </Link>

                        <Link to="/admin/dashboard" className="nav-link">
                            Dashboard
                        </Link>
                        <Link to="/user-management" className="nav-link">
                            User Management
                        </Link>

                    </div>
                    <Logout />
                </div>
            </div>
            <div className="mt-2 rounded max-w-7xl mx-auto">
                <Outlet />
            </div>
        </>
    );
}
