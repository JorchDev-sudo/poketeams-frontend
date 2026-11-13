import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import HomePage from '../pages/Home/Home'
import ChatPage from '@/features/chat/ChatPage'

function ProtectedRoute({ children }: { children: React.ReactNode }) {
    const { isAuthenticated } = useAuth()
    return isAuthenticated ? children : <Navigate to="/dashboard" replace />
}

function LoginButton() {
    const { login } = useAuth();
    return <button onClick={login}>Iniciar sesión con Auth0</button>;
}

export function AppRouter() {
    return (
        <BrowserRouter>
            <Routes>
                {/* Rutas públicas */}
                <Route path="/dashboard" element={<div><h1>Dashboard Page</h1>{LoginButton()}</div>} />

                {/* Rutas protegidas */}
                <Route path="/" element={<ProtectedRoute><HomePage /></ProtectedRoute>} />
                <Route path="/chat" element={<ProtectedRoute><ChatPage /></ProtectedRoute>} />
                <Route path="/chat/:conversationId" element={<ProtectedRoute><ChatPage /></ProtectedRoute>} />
                <Route path="/teams" element={<ProtectedRoute><div>Teams Page</div></ProtectedRoute>} />

                <Route path="*" element={<Navigate to="/dashboard" />} />
            </Routes>
        </BrowserRouter>
    )
}