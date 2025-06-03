import { useContext } from "react";
import { AppContext } from "../../Context/AppContext";

export default function AdminDashboard() {
    const { user } = useContext(AppContext);
    if (!user) return null;
    return (
        <>
            <div className="bg-blue-300 m-4 p-4 font-bold text-2xl rounded">
                <div className="text-2xl uppercase">
                    <span className="font-bold text-blue-900">{user.name}</span>
                </div>
                <p className="text-sm italic">
                    You are logged in as Administrator (Admin)
                </p>
            </div>
        </>
    );
}
