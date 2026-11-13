import { createContext, useContext, useState, useEffect, useCallback, type ReactNode } from 'react'
import { getCookie } from '@/lib/csrf'
import { client, setLogoutCallback } from '@/lib/apollo'
import { chatClient } from '@/features/chat/lib/chatClient'

const apiBaseUrl = import.meta.env.VITE_API_GRAPHQL_URL

interface AuthUser { id: string; name: string; email: string }
interface AuthContextValue {
    user: AuthUser | null
    isAuthenticated: boolean
    loading: boolean
    login: () => void
    logout: () => Promise<void>
}

const AuthContext = createContext<AuthContextValue | null>(null)

export function AuthProvider({ children }: { children: ReactNode }) {
    const [user, setUser] = useState<AuthUser | null>(null)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        fetch(`${apiBaseUrl}/auth/me`, { credentials: 'include' })
            .then(res => (res.ok ? res.json() : null))
            .then(setUser)
            .catch(() => setUser(null))
            .finally(() => setLoading(false))
    }, [])

    useEffect(() => {
        setLogoutCallback(() => {
            setUser(null)
            void client.clearStore()
            void chatClient.clearStore()
        })
    }, [])

    const login = useCallback(() => { window.location.href = `${apiBaseUrl}/auth/login` }, [])

    const logout = useCallback(async () => {
        try {
            await fetch(`${apiBaseUrl}/auth/logout`, {
                method: 'POST',
                credentials: 'include',
                headers: { 'X-XSRF-TOKEN': getCookie('XSRF-TOKEN') ?? '' },
            })
        } catch (e) {
            console.error('Error during logout', e)
        } finally {
            window.location.href = '/'
        }
    }, [])

    return (
        <AuthContext.Provider value={{ user, isAuthenticated: user !== null, loading, login, logout }}>
            {!loading && children}
        </AuthContext.Provider>
    )
}

export function useAuth() {
    const ctx = useContext(AuthContext)
    if (!ctx) throw new Error('useAuth must be used inside AuthProvider')
    return ctx
}