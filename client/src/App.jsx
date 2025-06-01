import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import Home from "./Home";
import Register from "./Pages/Auth/Register";
import Login from "./Pages/Auth/Login";
import Layout from "./Pages/Layout/Layout";
import GuestLayout from "./Pages/Layout/GuestLayout";
import Dashboard from './Pages/Admin/Dashboard';
import AuthenticatedLayout from './Pages/Layout/AuthenticatedLayout';
import UserIndex from './Pages/Admin/User/UserIndex';
import ProtectedRoutes from "./utils/ProtectedRoutes";
import GuestRoutes from "./utils/GuestRoutes";
function App() {

    return (
        <BrowserRouter>
            <Routes>
                {/* Public layout*/}
                <Route path="/" element={<Layout />}>
                    <Route index element={<Home />} />
                </Route>

                {/* Guest-only routes (login, register) */}
                <Route element={<GuestRoutes />}>
                    <Route element={<GuestLayout />}>
                        <Route path="/login" element={<Login />} />
                        <Route path="/register" element={<Register />} />
                    </Route>
                </Route>

                {/* Protected routes */}
                <Route element={<ProtectedRoutes />}>
                    <Route element={<AuthenticatedLayout />}>
                        <Route path="/dashboard" element={<Dashboard />} />
                        <Route
                            path="/user-management"
                            element={<UserIndex />}
                        />
                    </Route>
                </Route>
            </Routes>
        </BrowserRouter>
    );
}

export default App;
