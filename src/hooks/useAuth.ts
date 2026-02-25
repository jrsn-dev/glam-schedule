import { useState, useEffect } from 'react';
import { User, AuthState } from '../types/auth';

export const useAuth = () => {
    const [auth, setAuth] = useState<AuthState>({
        user: null,
        token: localStorage.getItem('glam_token'),
        isAuthenticated: !!localStorage.getItem('glam_token'),
    });

    const login = (user: User, token: string) => {
        localStorage.setItem('glam_token', token);
        localStorage.setItem('glam_user', JSON.stringify(user));
        setAuth({
            user,
            token,
            isAuthenticated: true,
        });
    };

    const logout = () => {
        localStorage.removeItem('glam_token');
        localStorage.removeItem('glam_user');
        setAuth({
            user: null,
            token: null,
            isAuthenticated: false,
        });
    };

    useEffect(() => {
        const savedUser = localStorage.getItem('glam_user');
        if (savedUser) {
            setAuth(prev => ({
                ...prev,
                user: JSON.parse(savedUser),
            }));
        }
    }, []);

    return { ...auth, login, logout };
};
