import { createContext, useState, useEffect } from 'react';
import api from '../api/axios';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    const checkInternalSession = async () => {
        try {
            const { data } = await api.get('/profile');
            setUser(data.user);
        } catch (error) {
            setUser(null);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        checkInternalSession();
    }, []);

    return (
        <AuthContext.Provider value={{ user, setUser, loading, checkInternalSession }}>
            {children}
        </AuthContext.Provider>
    );
};
