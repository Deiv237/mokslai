import axios from "axios";
import { createContext, useState, useEffect } from "react";

export const UserContext = createContext(null);

const API_URL = import.meta.env.VITE_API_URL;
export const UserContextProvider = ({ children }) => {

    const [user, setUser] = useState(null);

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const {data:response} = await axios.get(`${API_URL}/users/me`, {
                    withCredentials: true,
                });
                
                setUser(response.data);
            } catch (error) {
                console.log(error);
            }
        };
        fetchUser();
    }, []);

    return (
        <UserContext.Provider value={{ user, setUser }}>
            {children}
        </UserContext.Provider>
    );
};