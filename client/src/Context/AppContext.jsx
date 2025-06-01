import axios from "axios";
import { createContext, useEffect, useState } from "react";

export const AppContext = createContext()

export default function AppProvider({children}){

    const [loading, setLoading] = useState(true);
    const [token, setToken] = useState(localStorage.getItem('token'));
    const [user, setUser] = useState(null);

    const getUser = async () => {
        try{
            const res = await axios.get('/api/user', {
                headers: {
                    Authorization: `Bearer ${token}`,
                }
            });
            if(res.status === 200){
                setUser(res.data)
            }
        }catch(err){
            console.error("Failed to fetch user:", err);
            setUser(null);
            setToken(null);
        }finally{
            setLoading(false);
        }
    }

    useEffect(() => {
        if (token) {
            getUser();
        } else {
            setLoading(false);
        }
    }, [token]);
    

    return (
        <AppContext.Provider value={{ token, setToken, user, setUser }}>
            {loading ? <div>Loading...</div> : children}
        </AppContext.Provider>
    );
    
}