import  { useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import { AppContext } from '../../Context/AppContext';
import axios from 'axios';

export default function Logout() {

    const navigate = useNavigate();

    const {token, setToken, setUser} = useContext(AppContext);

    const handleLogout = async (e) => {
        e.preventDefault();

        try {
            const res = await axios.post(
                "/api/logout",
                {},
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );
            if (res.status === 200) {
                setToken(null);
                setUser(null);
                localStorage.removeItem("token");
                navigate("/");
            }
        } catch (err) {
            console.log(err);
        }
    };

    return (
        <form>
            <button className="nav-link" onClick={handleLogout}>
                Log out
            </button>
        </form>
    );
}
