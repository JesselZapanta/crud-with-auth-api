import axios from 'axios';
import { useContext, useEffect, useState } from 'react'
import { AppContext } from '../../../Context/AppContext';
import Loader from './../../../Components/Loader';
import { Link } from 'react-router-dom';

export default function UserIndex() {
    const {token} = useContext(AppContext);
    const [loading, setLoading] = useState(false);
    const [data, setData] = useState([]);

    const getData = async () => {
        setLoading(true)
        try{
            const res = await axios.get('/api/admin/user', {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
            setData(res.data);
        }catch(err){
            console.log(err)
        }finally{
            setLoading(false);
        }
    }

    useEffect(() => {
        getData();
    },[])


    const handleDelete = async (id) => {
        if (window.confirm("Are you sure you want to delete this user?")) {
            
            try{
                const res = await axios.delete(`api/admin/user/destroy/${id}`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                if (res.data.status === "deleted") {
                    getData();
                    alert("Deleted Successfully.");
                }
            }catch(err){
                console.log(err)
            }

        }
    };


    return (
        <div>
            <div className="font-bold text-xl text-blue-900 my-4">
                List of Users
            </div>
            <div className="flex justify-start my-4">
                <Link className="primary-btn w-24" to="/user-create-update">
                    Add
                </Link>
            </div>
            <table className="w-full">
                <thead>
                    <tr>
                        <th>Id</th>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Status</th>
                        <th>Role</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {loading ? (
                        <tr>
                            <td colSpan={6} className="text-center">
                                <Loader />
                                {/* Assuming Loader is a component */}
                            </td>
                        </tr>
                    ) : data && data.length > 0 ? (
                        data.map((user) => (
                            <tr key={user.id}>
                                <td>{user.id}</td>
                                <td>{user.name}</td>
                                <td>{user.email}</td>
                                <td>Active</td>
                                <td>User</td>
                                <td>
                                    <div className="flex gap-2">
                                        <Link
                                            className="action-primary"
                                            to={`/user-create-update/${user.id}`}>
                                            Edit
                                        </Link>
                                        <button
                                            className="action-danger"
                                            onClick={() =>
                                                handleDelete(user.id)
                                            }>
                                            Delete
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td
                                colSpan={6}
                                className="text-center italic text-slate-400">
                                No data found
                            </td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    );
}

