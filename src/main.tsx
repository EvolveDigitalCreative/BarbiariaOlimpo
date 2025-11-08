import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

// Importação do Firebase Analytics
import { initializeAnalytics } from './services/firebaseConfig';

// Importação do AuthProvider
import { AuthProvider } from './components/auth/AuthContext';

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

// ✅ NOVAS IMPORTAÇÕES DE WEAR
import WearCart from './pages/WearCart';
import WearCheckout from './pages/WearCheckout';
import WearCatalog from './pages/WearCatalog'; // ✅ Importação para o Catálogo

// --- Layouts e Componentes Admin ---
import AdminLayout from './components/admin/AdminLayout';
import AdminOverview from './components/admin/AdminOverview';
import ProtectedRoute from './components/auth/ProtectedRoute';

// Admin pages (implementações básicas adicionadas)
import AdminSales from './pages/admin/AdminSales';
import AdminAppointments from './pages/admin/AdminAppointments';
import AdminUsers from './pages/admin/AdminUsers';
// import AdminServices from './pages/admin/AdminServices';
import AdminOrders from './pages/admin/AdminOrders';

// --- Páginas Admin (Comentadas) ---
/*
import AdminSales from './pages/admin/AdminSales';
import AdminAppointments from './pages/admin/AdminAppointments';
import AdminUsers from './pages/admin/AdminUsers';
import AdminServices from './pages/admin/AdminServices';
import AdminOrders from './pages/admin/AdminOrders';
*/

// O React.StrictMode foi removido, conforme solicitado.
ReactDOM.createRoot(document.getElementById('root')!).render(
    <AuthProvider>
        <BrowserRouter>
            <Routes>
                {/* ROTAS PÚBLICAS DE DOMÍNIO */}
                <Route path="/" element={<HomePage />} />
                <Route path="/skincare" element={<OlimpoSkincare />} />
                <Route path="/wear" element={<OlimpoWear />} />
                <Route path="/olimpocoin" element={<OlimpoCoin />} />

                {/* ✅ NOVAS ROTAS PÚBLICAS DE WEAR */}
                <Route path="/wear/catalogo" element={<WearCatalog />} /> {/* ✅ ROTA DO CATÁLOGO ADICIONADA */}
                <Route path="/wear/carrinho" element={<WearCart />} />
                <Route path="/wear/pagamento" element={<WearCheckout />} />

                {/* ROTAS PÚBLICAS DE AUTENTICAÇÃO */}
                <Route path="/login" element={<LoginPage />} />
                <Route path="/register" element={<RegisterPage />} />

                {/* --- ROTAS PROTEGIDAS DO USUÁRIO --- */}

                {/* ROTA PROTEGIDA PARA O PERFIL (Página principal) */}
                <Route
                    path="/profile"
                    element={
                        <ProtectedRoute>
                            <ProfilePage />
                        </ProtectedRoute>
                    }
                />

                {/* ROTA PROTEGIDA PARA AS INFORMAÇÕES DETALHADAS DO PERFIL */}
                <Route
                    path="/perfil-info"
                    element={
                        <ProtectedRoute>
                            <AboutProfile />
                        </ProtectedRoute>
                    }
                />

                {/* ROTA PROTEGIDA PARA A PÁGINA DE FAVORITOS/SOBRE NÓS/DESCONTOS */}
                <Route
                    path="/profile-actions"
                    element={
                        <ProtectedRoute>
                            <ProfileActionsPage />
                        </ProtectedRoute>
                    }
                />


                {/* --- ROTAS PROTEGIDAS DA DASHBOARD ADMIN --- */}

                <Route
                    path="/admin"
                    element={
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

                {/* <Route path="*" element={<div>Página não encontrada</div>} /> */}

            </Routes>
        </BrowserRouter>
    </AuthProvider>
);

// ✅ ADIÇÃO CRÍTICA: Inicializa o Analytics após a montagem do React no DOM.
// Isso garante que a verificação isSupported() seja feita no ambiente do navegador (client-side).
initializeAnalytics();