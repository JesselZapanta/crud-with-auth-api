import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom';
import { AppContext } from '../../../Context/AppContext';

export default function UserCreateUpdate() {
    const [processing, setProcessing] = useState(false);
    const [errors, setErrors] = useState({});

    const {id} = useParams();

    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: "",
        password_confirmation: "",
    });

    const { token } = useContext(AppContext);

    const navigate = useNavigate();

    const getUser = async () => {
        try{
            const res = await axios.get(`/api/admin/user/show/${id}`, {
                headers:
                {
                    Authorization: `Bearer ${token}`
                }
            })
            if(res.status === 200){
                setFormData({
                    name: res.data.name || "",
                    email: res.data.email || "",
                    password: "",
                    password_confirmation: "",
                });
            }
        }catch(err){
            console.log(err);
        }
    }

    useEffect(() => {
        getUser();
    }, [id])

    const handleSubmit = async (e) => {
        e.preventDefault();
        setProcessing(true);

        if (id) {
            //update
            try {
                const res = await axios.put(`/api/admin/user/update/${id}`, formData, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });

                if (res.data.status === "updated") {
                    navigate("/user-management");
                }
            } catch (err) {
                if(err.status === 422){
                    setErrors(err.response.data.errors);
                }
            } finally {
                setProcessing(false);
            }
        } else {
            //create
            try {
                const res = await axios.post("/api/admin/user/store", formData, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });

                if (res.data.status === "created") {
                    navigate("/user-management");
                }
            } catch (err) {
                setErrors(err.response.data.errors);
            } finally {
                setProcessing(false);
            }
        }
    };

    return (
        <div className="w-96 mt-4 mx-auto bg-white rounded-lg p-6 shadow ">
            <p className="font-bold text-lg text-blue-600">User Information</p>
            <form className="mt-4">
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
                <div className="flex gap-2 justify-end">
                    <Link className="secondary-btn w-24" to="/user-management">
                        Cancel
                    </Link>
                    <button
                        className="primary-btn w-24 "
                        disabled={processing}
                        onClick={handleSubmit}>
                        {processing
                            ? "Saving..."
                            : id
                            ? "Update"
                            : "Create"}
                    </button>
                </div>
            </form>
        </div>
    );
}
