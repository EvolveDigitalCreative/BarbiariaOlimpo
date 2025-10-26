// src/layouts/AdminLayout.tsx
import React from 'react';
import { Outlet, Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../auth/AuthContext'; // Para info do user e logout
import { signOut } from 'firebase/auth';
import { auth } from '../../services/firebaseConfig';
import '../../styles/admin/AdminLayout.css'; // 👈 NOVO CSS para o layout

const AdminLayout: React.FC = () => {
  const { currentUser } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await signOut(auth);
      navigate('/login'); // Redireciona para login após logout
    } catch (error) {
      console.error("Erro ao fazer logout:", error);
    }
  };

  return (
    <div className="admin-layout">
      {/* Sidebar */}
      <aside className="admin-sidebar">
        <div className="sidebar-header">
          {/* Pode colocar uma logo aqui */}
          <h3>Admin Dashboard</h3>
        </div>
        <nav className="sidebar-nav">
          <ul>
            <li><Link to="/admin">Visão Geral</Link></li>
            <li><Link to="/admin/vendas">Vendas</Link></li>
            <li><Link to="/admin/marcacoes">Marcações</Link></li>
            <li><Link to="/admin/colaboradores">Colaboradores</Link></li>
            <li><Link to="/admin/servicos">Serviços/Produtos</Link></li>
            <li><Link to="/admin/encomendas">Encomendas</Link></li>
            {/* Adicione mais links aqui */}
          </ul>
        </nav>
        <div className="sidebar-footer">
          {currentUser && <p>Logado como: {currentUser.email}</p>}
          <button onClick={handleLogout} className="logout-button">Logout</button>
        </div>
      </aside>

      {/* Área de Conteúdo Principal */}
      <main className="admin-content">
        {/* O Outlet renderiza o componente da rota aninhada (AdminOverview, AdminSales, etc.) */}
        <Outlet />
      </main>
    </div>
  );
};

export default AdminLayout;