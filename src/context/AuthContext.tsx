import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

const apiBaseUrl = import.meta.env.VITE_API_GRAPHQL_URL;
const AuthContext = createContext<any>(null);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    useEffect(() => {
        const checkSession = async () => {
            try {
                const response = await fetch(`${apiBaseUrl}/auth/me`, {
                    credentials: 'include',
                });

                if (response.ok) {
                    const data = await response.json();
                    setUser(data);
                    setIsAuthenticated(true);
                } else {
                    setIsAuthenticated(false);
                }
            } catch (error) {
                console.error('Error checking session', error);
                setIsAuthenticated(false);
            } finally {
                setLoading(false);
            }
        };

        checkSession();
    }, []);

    const login = () => {
        window.location.href = `${apiBaseUrl}/auth/login`;
    };

    const logout = async () => {
        try {
            await fetch(`${apiBaseUrl}/auth/logout`, {
                method: 'POST',
                credentials: 'include',
            });
        } catch (error) {
            console.error('Error during logout', error);
        } finally {
            setUser(null);
            setIsAuthenticated(false);

            window.location.href = '/';
        }
    };

    return (
        <AuthContext.Provider value={{ user, login, logout, loading, isAuthenticated }}>
            {!loading && children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);