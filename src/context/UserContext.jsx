import React, { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";

// Create the context
const UserContext = createContext();

// Provider component
export const UserProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    const fetchUser = async () => {
        setIsLoading(true);
        try {
            const response = await axios.get("http://localhost:8080/employees/current-user", {
                withCredentials: true,
            });
            setUser(response.data);
        } catch (error) {
            console.error("Error fetching user:", error);
            setUser(null);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchUser();
    }, []);

    return (
        <UserContext.Provider value={{ user, isLoading, fetchUser }}>
            {children}
        </UserContext.Provider>
    );
};

// Custom hook (so importing is easier)
export const useUser = () => useContext(UserContext);