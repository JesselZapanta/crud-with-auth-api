import axios from "axios";
import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AppContext } from "../../Context/AppContext";

export default function Register() {
    const [processing, setProcessing] = useState(false);
    const [errors, setErrors] = useState({});

    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: "",
        password_confirmation: "",
    });

    const { setToken} = useContext(AppContext)

    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setProcessing(true);

        try {
            const res = await axios.post("api/register", formData);

            if (res.status === 200) {
                localStorage.setItem('token', res.data.token);
                setToken(res.data.token);
                navigate('/');
            }
        } catch (err) {
            setErrors(err.response.data.errors);
        } finally {
            setProcessing(false);
        }
    };

    return (
        <>
            <p className="title text-blue-600">Register here!</p>
            <form>
                <div>
                    <p>Name</p>
                    <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={(e) =>
                            setFormData({
                                ...formData,
                                name: e.target.value,
                            })
                        }
                    />
                    <div className="min-h-[1.5rem]">
                        {errors.name && (
                            <small className="text-red-500">
                                {errors.name}
                            </small>
                        )}
                    </div>
                </div>
                <div>
                    <p>Email</p>
                    <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={(e) =>
                            setFormData({
                                ...formData,
                                email: e.target.value,
                            })
                        }
                    />
                    <div className="min-h-[1.5rem]">
                        {errors.email && (
                            <small className="text-red-500">
                                {errors.email}
                            </small>
                        )}
                    </div>
                </div>
                <div>
                    <p>Password</p>
                    <input
                        type="password"
                        name="password"
                        value={formData.password}
                        onChange={(e) =>
                            setFormData({
                                ...formData,
                                password: e.target.value,
                            })
                        }
                    />
                    <div className="min-h-[1.5rem]">
                        {errors.password && (
                            <small className="text-red-500">
                                {errors.password}
                            </small>
                        )}
                    </div>
                </div>
                <div>
                    <p>Re-Type Password</p>
                    <input
                        type="password"
                        name="password_confirmation"
                        value={formData.password_confirmation}
                        onChange={(e) =>
                            setFormData({
                                ...formData,
                                password_confirmation: e.target.value,
                            })
                        }
                    />
                    <div className="min-h-[1.5rem]">
                        {errors.password_confirmation && (
                            <small className="text-red-500">
                                {errors.password_confirmation}
                            </small>
                        )}
                    </div>
                </div>
                <button
                    className="primary-btn"
                    disabled={processing}
                    onClick={handleSubmit}>
                    {processing ? "Please wait" : "Register"}
                </button>
            </form>
            <p className="mt-6 text-sm">
                Already have an account?{" "}
                <Link to="/login" className="text-link">
                    Login
                </Link>
            </p>
        </>
    );
}
