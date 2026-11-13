import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { RegisterPage } from '../pages/Auth/RegisterPage'
import { LoginPage } from '../pages/Auth/LoginPage'
import HomePage from '../pages/Home/Home'
import ChatPage from '@/features/chat/ChatPage'

function ProtectedRoute({ children }: { children: React.ReactNode }) {
    const { isAuthenticated } = useAuth()
    console.log('ProtectedRoute isAuthenticated:', isAuthenticated)
    return isAuthenticated ? children : <Navigate to="/login" />
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