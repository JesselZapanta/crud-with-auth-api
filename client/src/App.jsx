import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import Home from "./Home";
import Register from "./Pages/Auth/Register";
import Login from "./Pages/Auth/Login";
import Layout from "./Pages/Layout/Layout";
import GuestLayout from "./Pages/Layout/GuestLayout";
import AdminDashboard from "./Pages/Admin/AdminDashboard";
import UserIndex from './Pages/Admin/User/UserIndex';
import ProtectedRoutes from "./utils/ProtectedRoutes";
import GuestRoutes from "./utils/GuestRoutes";
import UserCreateUpdate from "./Pages/Admin/User/UserCreateUpdate";
import Unauthorized from './Pages/Auth/Unauthorized';
import UserDashboard from "./Pages/User/UserDashboard";
import AdminLayout from "./Pages/Layout/AdminLayout";
import UserLayout from "./Pages/Layout/UserLayout copy";
function App() {

    return (
        <BrowserRouter>
            <Routes>
                {/* Public layout*/}
                <Route path="/" element={<Layout />}>
                    <Route index element={<Home />} />
                    <Route path="/unauthorized" element={<Unauthorized />} />
                </Route>

                {/* Guest-only routes (login, register) */}
                <Route element={<GuestRoutes />}>
                    <Route element={<GuestLayout />}>
                        <Route path="/login" element={<Login />} />
                        <Route path="/register" element={<Register />} />
                    </Route>
                </Route>

                {/* Protected routes */}
                <Route element={<ProtectedRoutes allowedRoles={[0]} />}>
                    {/* Only for Admin */}
                    <Route element={<AdminLayout />}>
                        <Route
                            path="/admin/dashboard"
                            element={<AdminDashboard />}
                        />
                        <Route
                            path="/user-management"
                            element={<UserIndex />}
                        />
                        <Route
                            path="/user-create-update/:id?"
                            element={<UserCreateUpdate />}
                        />
                    </Route>
                </Route>

                {/* Protected routes */}
                <Route element={<ProtectedRoutes allowedRoles={[1]} />}>
                    {/* Only for User */}
                    <Route element={<UserLayout />}>
                        <Route
                            path="/user/dashboard"
                            element={<UserDashboard />}
                        />
                    </Route>
                </Route>
            </Routes>
        </BrowserRouter>
    );
}

export default App;
