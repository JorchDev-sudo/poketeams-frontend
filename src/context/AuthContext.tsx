import { createContext, useContext, useState } from 'react'

type jwtToken = string | null

interface AuthContextType {
    isAuthenticated: boolean
    token: jwtToken
    login: (token: string) => void
    logout: () => void
}

const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: { children: React.ReactNode }) {
    const [token, setToken] = useState<jwtToken>(
        localStorage.getItem('token')
    )

    const login = (newToken: string) => {
        localStorage.setItem('token', newToken)
        setToken(newToken)
    }

    const logout = () => {
        localStorage.removeItem('token')
        setToken(null)
    }

    return (
        <AuthContext.Provider value={{
            isAuthenticated: !!token,
            token,
            login,
            logout }}> {children} </AuthContext.Provider>
    )
}

export function useAuth() {
    const context = useContext(AuthContext)
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider')
    }
    return context
}