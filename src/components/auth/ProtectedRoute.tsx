import React, { type JSX } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
// ✅ CORRIGIDO: Caminho de importação para o Contexto
import { useAuth } from '../../context/AuthContext';

interface ProtectedRouteProps {
  children: JSX.Element;
  requiredRole?: string; // Papel necessário para aceder (ex: 'admin')
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children, requiredRole }) => {
  // ✅ CORRIGIDO: Usando 'loading' e renomeando para 'loadingAuth' (Solução B da última resposta)
  const { currentUser, userRole, loading: loadingAuth } = useAuth();
  const location = useLocation();

  if (loadingAuth) {
    return <div>Verificando autenticação...</div>;
  }

  if (!currentUser) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  if (requiredRole && userRole !== requiredRole) {
    console.warn(`Acesso negado para ${currentUser.email}. Role necessária: ${requiredRole}, Role atual: ${userRole}`);
    return <Navigate to="/" replace />;
  }

  return children;
};

export default ProtectedRoute;