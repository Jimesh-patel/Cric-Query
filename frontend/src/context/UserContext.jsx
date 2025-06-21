import React, { createContext, useState, useEffect, useContext } from 'react';

const UserContext = createContext();

export const useUser = () => useContext(UserContext);

export const UserProvider = ({ children }) => {
    const [user, setUser] = useState(null);

    const fetchUser = async (token) => {
        try {
            const url = import.meta.env.VITE_BACKEND_URL || 'http://localhost:5000';
            const res = await fetch(`${url}/user-data`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
            });
            if (!res.ok) throw new Error('Failed to fetch user');
            const userData = await res.json();
            setUser(userData);
        } catch (error) {
            console.error('Failed to fetch user data:', error);
            localStorage.removeItem('token');
            setUser(null);
        }
    };

    const checkLogin = async () => {
        const token = localStorage.getItem('token');
        if (token) fetchUser(token);
    };

    useEffect(() => {
        checkLogin();
    }, []);

    const login = async (token) => {
        localStorage.setItem('token', token);
        await fetchUser(token);
    };

    const logout = () => {
        localStorage.removeItem('token');
        setUser(null);
    };

    return (
        <UserContext.Provider value={{ user, login, logout, checkLogin }}>
            {children}
        </UserContext.Provider>
    );
};
