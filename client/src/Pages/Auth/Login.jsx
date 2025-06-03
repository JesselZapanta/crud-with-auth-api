import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AppContext } from "../../Context/AppContext";

export default function Login() {

    const {token, setToken, user} = useContext(AppContext);
    
    const navigate = useNavigate();

    const [processing, setProcessing] = useState(false);
    const [errors, setErrors] = useState({});
    const [formData, setFormData] = useState({
        email: "",
        password: "",
    })

    const handleSubmit = async (e) => {
        e.preventDefault();
        setProcessing(true)

        try{
            const res = await axios.post('api/login', formData);

            if(res.status === 200){
                localStorage.setItem('token', res.data.token)
                setToken(res.data.token);
                // navigate('/dashboard')
            }
        }catch(err){
            setErrors(err.response.data.errors);
        }finally{
            setProcessing(false);
        }
    }

    useEffect(() => {
        if (token && user) {
            if (user.role === 0) {
                navigate("/admin/dashboard");
            } else if (user.role === 1) {
                navigate("/user/dashboard");
            } else {
                navigate("/unauthorized");
            }
        }
    }, [token, user, navigate]);
    

    return (
        <>
            <p className="title text-blue-600">Login here!</p>
            <form>
                <div>
                    <p>Email</p>
                    <input
                        type="email"
                        name="email"
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
                <div className="flex mt-6">
                    <button
                        className="primary-btn"
                        disabled={processing}
                        onClick={handleSubmit}>
                        {processing ? "Please wait" : "Login"}
                    </button>
                </div>
            </form>
            <p className="mt-6 text-sm">
                Dont't have an account?{" "}
                <Link to="/register" className="text-link">
                    Register
                </Link>
            </p>
        </>
    );
}
