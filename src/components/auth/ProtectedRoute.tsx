// src/components/auth/ProtectedRoute.tsx
import React, { type JSX } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from './AuthContext'; // Importa o hook

interface ProtectedRouteProps {
  children: JSX.Element;
  requiredRole?: string; // Papel necessário para aceder (ex: 'admin')
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children, requiredRole }) => {
  const { currentUser, userRole, loadingAuth } = useAuth();
  const location = useLocation();

  if (loadingAuth) {
    // Pode mostrar um spinner/loading aqui enquanto verifica
    return <div>Verificando autenticação...</div>;
  }

  // 1. Não está logado? Redireciona para /login
  if (!currentUser) {
    // Guarda a página que ele tentou aceder para redirecionar de volta depois
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  // 2. Está logado, mas precisa de uma role específica e não a tem?
  if (requiredRole && userRole !== requiredRole) {
    // Redireciona para uma página de "Não autorizado" ou para a home
    console.warn(`Acesso negado para ${currentUser.email}. Role necessária: ${requiredRole}, Role atual: ${userRole}`);
    // Poderia redirecionar para uma dashboard específica do utilizador, se existir
    return <Navigate to="/" replace />; // Ou para '/unauthorized'
  }

  // 3. Está logado e tem a role (ou não precisa de role)? Permite acesso
  return children;
};

export default ProtectedRoute;