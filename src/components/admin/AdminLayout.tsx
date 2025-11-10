// src/layouts/AdminLayout.tsx
import React, { useState } from 'react';
import { Outlet, Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../auth/AuthContext';
import { signOut } from 'firebase/auth';
import { auth } from '../../services/firebaseConfig';
import '../../styles/admin/AdminLayout.css';

const AdminLayout: React.FC = () => {
  const { currentUser } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleLogout = async () => {
    try {
      await signOut(auth);
      navigate('/login');
    } catch (error) {
      console.error("Erro ao fazer logout:", error);
    }
  };

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  // Verifica se o link está ativo
  const isActiveLink = (path: string) => {
    return location.pathname === path || location.pathname.startsWith(path + '/');
  };

  return (
    <div className="admin-layout">
      {/* Botão de menu móvel */}
      <button 
        className="mobile-menu-toggle" 
        onClick={toggleMobileMenu}
        style={{ display: window.innerWidth < 768 ? 'flex' : 'none' }}
      >
        <i className="fas fa-bars"></i>
      </button>

      {/* Sidebar */}
      <aside className={`admin-sidebar ${mobileMenuOpen ? 'mobile-open' : ''}`}>
        <div className="sidebar-header">
          <h3>Barbearia Olimpo</h3>
          <p style={{ fontSize: '0.85rem', color: 'var(--text-gray)', marginTop: '0.5rem' }}>
            Painel Administrativo
          </p>
        </div>
        <nav className="sidebar-nav">
          <ul>
            <li>
              <Link 
                to="/admin" 
                className={isActiveLink('/admin') && location.pathname === '/admin' ? 'active' : ''}
                onClick={() => setMobileMenuOpen(false)}
              >
                <i className="fas fa-chart-line"></i> Visão Geral
              </Link>
            </li>
            <li>
              <Link 
                to="/admin/vendas" 
                className={isActiveLink('/admin/vendas') ? 'active' : ''}
                onClick={() => setMobileMenuOpen(false)}
              >
                <i className="fas fa-shopping-cart"></i> Vendas
              </Link>
            </li>
            <li>
              <Link 
                to="/admin/marcacoes" 
                className={isActiveLink('/admin/marcacoes') ? 'active' : ''}
                onClick={() => setMobileMenuOpen(false)}
              >
                <i className="fas fa-calendar-alt"></i> Marcações
              </Link>
            </li>
            <li>
              <Link 
                to="/admin/colaboradores" 
                className={isActiveLink('/admin/colaboradores') ? 'active' : ''}
                onClick={() => setMobileMenuOpen(false)}
              >
                <i className="fas fa-users"></i> Colaboradores
              </Link>
            </li>
            <li>
              <Link 
                to="/admin/encomendas" 
                className={isActiveLink('/admin/encomendas') ? 'active' : ''}
                onClick={() => setMobileMenuOpen(false)}
              >
                <i className="fas fa-box"></i> Encomendas
              </Link>
            </li>
          </ul>
        </nav>
        <div className="sidebar-footer">
          {currentUser && (
            <div style={{ marginBottom: '1rem' }}>
              <p style={{ fontSize: '0.85rem', color: 'var(--text-gray)' }}>Logado como:</p>
              <p style={{ fontWeight: '500', color: 'var(--primary-gold)' }}>{currentUser.email}</p>
            </div>
          )}
          <button onClick={handleLogout} className="logout-button">
            <i className="fas fa-sign-out-alt"></i> Logout
          </button>
        </div>
      </aside>

      {/* Área de Conteúdo Principal */}
      <main className="admin-content">
        <Outlet />
      </main>
    </div>
  );
};

export default AdminLayout;