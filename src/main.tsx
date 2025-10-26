// src/main.tsx

import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

// Importação do AuthProvider
import { AuthProvider } from './components/auth/AuthContext'; // ✅ Ajuste o caminho se necessário

// Importação dos Estilos Globais
import './styles/global/_global.css';

// --- Páginas ---
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';

// Páginas de Domínio
import HomePage from './pages/OlimpoBarBer';      // Rota: /
import OlimpoSkincare from './pages/OlimpoSkincare'; // Rota: /skincare
import OlimpoCoin from './components/sections/olimpo_barber/OlimpoCoinPage'; // Rota: /olimpocoin (Verificar se é uma PÁGINA ou COMPONENTE)
import OlimpoWear from './pages/OlimpoWear';       // Rota: /wear

// --- Layouts e Componentes Admin ---
import AdminLayout from './components/admin/AdminLayout'; // Layout da Dashboard
import AdminOverview from './components/admin/AdminOverview'; // Página inicial da Dashboard
import ProtectedRoute from './components/auth/ProtectedRoute'; // Componente para proteger rotas

// --- Páginas Admin (Comentadas) ---
/*
import AdminSales from './pages/admin/AdminSales';
import AdminAppointments from './pages/admin/AdminAppointments';
import AdminUsers from './pages/admin/AdminUsers';
import AdminServices from './pages/admin/AdminServices';
import AdminOrders from './pages/admin/AdminOrders';
*/

ReactDOM.createRoot(document.getElementById('root')!).render(
    // ✅ Envolve TODA a aplicação com o AuthProvider (SEM StrictMode)
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

                {/* ✅ ROTAS PROTEGIDAS DA DASHBOARD ADMIN */}
                <Route
                    path="/admin"
                    element={
                        <ProtectedRoute requiredRole="admin"> {/* Protege toda a seção /admin */}
                            <AdminLayout /> {/* O Layout com Sidebar */}
                        </ProtectedRoute>
                    }
                >
                    {/* Rotas ANINHADAS dentro do AdminLayout */}
                    <Route index element={<AdminOverview />} /> {/* Rota inicial /admin */}

                    {/* Rotas comentadas para quando criar as páginas */}
                    {/* <Route path="vendas" element={<AdminSales />} /> */}
                    {/* <Route path="marcacoes" element={<AdminAppointments />} /> */}
                    {/* <Route path="colaboradores" element={<AdminUsers />} /> */}
                    {/* <Route path="servicos" element={<AdminServices />} /> */}
                    {/* <Route path="encomendas" element={<AdminOrders />} /> */}
                </Route>

                {/* Rota "Não Encontrado" (Opcional) */}
                {/* <Route path="*" element={<div>Página não encontrada</div>} /> */}

            </Routes>
        </BrowserRouter>
    </AuthProvider>
);