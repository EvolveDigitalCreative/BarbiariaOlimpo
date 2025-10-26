// src/main.tsx

// ✅ REMOVIDO: import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

// Importação do AuthProvider
import { AuthProvider } from './components/auth/AuthContext'; // Ajuste o caminho se necessário

// Importação dos Estilos Globais
import './styles/global/_global.css';

// --- Páginas ---
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';

// Páginas de Domínio
import HomePage from './pages/OlimpoBarBer';
import OlimpoSkincare from './pages/OlimpoSkincare';
import OlimpoCoin from './components/sections/olimpo_barber/OlimpoCoinPage';
import OlimpoWear from './pages/OlimpoWear';
import ProfilePage from './pages/ProfilePage';

// --- Layouts e Componentes Admin ---
import AdminLayout from './components/admin/AdminLayout';
import AdminOverview from './components/admin/AdminOverview';
import ProtectedRoute from './components/auth/ProtectedRoute';

// --- Páginas Admin (Comentadas) ---
/*
import AdminSales from './pages/admin/AdminSales';
import AdminAppointments from './pages/admin/AdminAppointments';
import AdminUsers from './pages/admin/AdminUsers';
import AdminServices from './pages/admin/AdminServices';
import AdminOrders from './pages/admin/AdminOrders';
*/

ReactDOM.createRoot(document.getElementById('root')!).render(
    <AuthProvider>
        <BrowserRouter>
            <Routes>
                {/* ROTAS PÚBLICAS DE DOMÍNIO */}
                <Route path="/" element={<HomePage />} />
                <Route path="/skincare" element={<OlimpoSkincare />} />
                <Route path="/wear" element={<OlimpoWear />} />
                <Route path="/olimpocoin" element={<OlimpoCoin />} />

                {/* ROTAS PÚBLICAS DE AUTENTICAÇÃO */}
                <Route path="/login" element={<LoginPage />} />
                <Route path="/register" element={<RegisterPage />} />

                {/* ROTA PROTEGIDA PARA O PERFIL */}
                <Route
                    path="/profile"
                    element={
                        <ProtectedRoute>
                            <ProfilePage />
                        </ProtectedRoute>
                    }
                />

                {/* ROTAS PROTEGIDAS DA DASHBOARD ADMIN */}
                <Route
                    path="/admin"
                    element={
                        <ProtectedRoute requiredRole="admin">
                            <AdminLayout />
                        </ProtectedRoute>
                    }
                >
                    <Route index element={<AdminOverview />} />
                    {/* <Route path="vendas" element={<AdminSales />} /> */}
                    {/* ... outras rotas admin comentadas ... */}
                </Route>

                {/* <Route path="*" element={<div>Página não encontrada</div>} /> */}

            </Routes>
        </BrowserRouter>
    </AuthProvider>
);