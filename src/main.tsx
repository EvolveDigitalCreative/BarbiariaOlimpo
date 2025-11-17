import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

// Importação do Firebase Analytics
import { initializeAnalytics } from './services/firebaseConfig';

// Importações de Contexto
import { AuthProvider } from './context/AuthContext';
import { CartProvider } from './context/CartContext';

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
import AboutProfile from './pages/AboutProfile';
import ProfileActionsPage from './pages/ProfileActionsPage';

// Importações de Wear
import WearCart from './pages/WearCart';
import WearCheckout from './pages/WearCheckout';
import WearCatalog from './pages/WearCatalog';
import WearProductPage from './pages/WearProductPage';

// --- Layouts e Componentes Admin ---
import AdminLayout from './components/admin/AdminLayout';
import AdminOverview from './components/admin/AdminOverview';
import ProtectedRoute from './components/auth/ProtectedRoute';

// Admin pages
import AdminSales from './pages/admin/AdminSales';
import AdminAppointments from './pages/admin/AdminAppointments';
import AdminUsers from './pages/admin/AdminUsers';
import AdminOrders from './pages/admin/AdminOrders';


ReactDOM.createRoot(document.getElementById('root')!).render(
    <AuthProvider>
        <BrowserRouter>
            <CartProvider>
                <Routes>
                    {/* ROTAS PÚBLICAS DE DOMÍNIO */}
                    <Route path="/" element={<HomePage />} />
                    <Route path="/skincare" element={<OlimpoSkincare />} />
                    <Route path="/wear" element={<OlimpoWear />} />
                    <Route path="/olimpocoin" element={<OlimpoCoin />} />

                    {/* ROTAS PÚBLICAS DE WEAR */}
                    <Route path="/wear/catalogo" element={<WearCatalog />} />
                    <Route path="/wear/carrinho" element={<WearCart />} />
                    <Route path="/wear/pagamento" element={<WearCheckout />} />
                    <Route path="/wear/produto/:productId" element={<WearProductPage />} />

                    {/* ROTAS PÚBLICAS DE AUTENTICAÇÃO */}
                    <Route path="/login" element={<LoginPage />} />
                    <Route path="/register" element={<RegisterPage />} />

                    {/* --- ROTAS PROTEGIDAS DO USUÁRIO --- */}
                    {/* ✅ CORRIGIDO: ProtectedRoute usado como wrapper para passar 'children' */}
                    <Route
                        path="/profile"
                        element={<ProtectedRoute><ProfilePage /></ProtectedRoute>}
                    />
                    <Route
                        path="/perfil-info"
                        element={<ProtectedRoute><AboutProfile /></ProtectedRoute>}
                    />
                    <Route
                        path="/profile-actions"
                        element={<ProtectedRoute><ProfileActionsPage /></ProtectedRoute>}
                    />

                    {/* --- ROTAS PROTEGIDAS DA DASHBOARD ADMIN --- */}
                    <Route
                        path="/admin"
                        element={
                            // O ProtectedRoute é usado como wrapper para proteger o AdminLayout
                            <ProtectedRoute requiredRole="admin">
                                <AdminLayout /> 
                            </ProtectedRoute>
                        }
                    >
                        <Route index element={<AdminOverview />} />
                        <Route path="vendas" element={<AdminSales />} />
                        <Route path="marcacoes" element={<AdminAppointments />} />
                        <Route path="colaboradores" element={<AdminUsers />} />
                        <Route path="encomendas" element={<AdminOrders />} />
                    </Route>

                    {/* Rota 404/Not Found (opcional) */}
                    {/* <Route path="*" element={<div>Página não encontrada</div>} /> */}

                </Routes>
            </CartProvider>
        </BrowserRouter>
    </AuthProvider>
);

initializeAnalytics();