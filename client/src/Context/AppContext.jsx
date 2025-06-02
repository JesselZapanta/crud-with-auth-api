import axios from "axios";
import { createContext, useCallback, useEffect, useState } from "react";

export const AppContext = createContext();

export default function AppProvider({ children }) {
    const [loading, setLoading] = useState(true);
    const [token, setToken] = useState(localStorage.getItem("token"));
    const [user, setUser] = useState(null);

    const getUser = useCallback(async () => {
        try {
            const res = await axios.get("/api/user", {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            if (res.status === 200) {
                setUser(res.data);
            }
        } catch (err) {
            console.error("Failed to fetch user:", err);
            setUser(null);
            setToken(null);
        } finally {
            setLoading(false);
        }
    }, [token]); 

    useEffect(() => {
        if (token) {
            getUser();
        } else {
            setLoading(false);
        }
    }, [token, getUser]);

    return (
        <AppContext.Provider value={{ token, setToken, user, setUser }}>
            {loading ? <div>Loading...</div> : children}
        </AppContext.Provider>
    );
}
