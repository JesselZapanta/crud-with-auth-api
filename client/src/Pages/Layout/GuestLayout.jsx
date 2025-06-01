import { Outlet, Link } from "react-router-dom";

export default function GuestLayout() {
    return (
        <div className="h-screen flex flex-col">
            <div className="max-w-7xl p-6">
                <Link to="/" className="text-blue-600 font-bold text-sm">
                    ← Back to Home
                </Link>
            </div>

            <div className="flex-1 flex items-center justify-center">
                <div className="w-full max-w-sm p-6 bg-slate-100 rounded shadow">
                    <Outlet />
                </div>
            </div>
        </div>
    );
}


