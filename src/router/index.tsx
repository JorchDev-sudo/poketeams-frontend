import {BrowserRouter, Routes, Route, Navigate} from 'react-router-dom'
import {useAuth} from '../context/AuthContext'
import {RegisterPage} from '../pages/Auth/RegisterPage'
import {LoginPage} from '../pages/Auth/LoginPage'
import HomePage from '../pages/Home/Home'

function ProtectedRoute({ children }: { children: React.ReactNode }) {
    const { isAuthenticated } = useAuth()

    return isAuthenticated ? children : <Navigate to="/login" />
}

export function AppRouter() {
    return (
        <BrowserRouter>
            <Routes>
                {/* Rutas públicas */}
                <Route path="/login" element={<LoginPage />} />
                <Route path="/register" element={<RegisterPage />} />
                <Route path="/dashboard" element={<div>Dashboard Page</div>} />

                {/* Rutas protegidas */}
                <Route path="/" element={
                    <ProtectedRoute>
                        <HomePage />
                    </ProtectedRoute>
                } />

                <Route path="/teams" element={
                    <ProtectedRoute>
                        <div>Teams Page</div>
                    </ProtectedRoute>
                } />

                <Route path="*" element={<Navigate to="/dashboard" />} />
            </Routes>
        </BrowserRouter>
    )
}