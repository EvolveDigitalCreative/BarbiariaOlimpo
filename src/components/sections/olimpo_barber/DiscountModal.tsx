import React, { useState, useEffect, type FC } from 'react';
// ✅ ATUALIZADO: Importa Link e useLocation do 'react-router-dom'
import { Link, useLocation } from 'react-router-dom';

// ✅ ATUALIZADO: Importa o useAuth do seu AuthContext
import { useAuth } from '../../auth/AuthContext'; 
import '../../../styles/olimpobarber/DiscountModal.css';

// Importe seu hook de loading
// import { useCommonPageLoading } from '../../hooks/usePageLoading';

// NOTE: Simulação das dependências para o exemplo
const useCommonPageLoading = () => ({ isLoading: false });

export const DiscountModal: FC = () => {
  const [showModal, setShowModal] = useState(false);
  const { isAuthenticated } = useAuth(); // Hook de autenticação
  const { isLoading } = useCommonPageLoading(); // Hook de loading
  const location = useLocation(); // Hook de localização

  useEffect(() => {
    // ✅ ATUALIZADO: Verifica a rota '/admin' (conforme seu main.tsx)
    const isAdminRoute = location.pathname.startsWith('/admin');
    
    // Lógica para mostrar o modal:
    // 1. Loading terminado
    // 2. Utilizador NÃO está autenticado
    // 3. NÃO está numa rota de admin
    if (!isLoading && !isAuthenticated && !isAdminRoute) {
      // Adiciona um pequeno delay para não ser tão intrusivo
      const timer = setTimeout(() => {
        setShowModal(true);
      }, 2500); // Mostra após 2.5 segundos
      
      return () => clearTimeout(timer); // Limpa o timer se o componente desmontar
    } else {
      setShowModal(false);
    }
  }, [isLoading, isAuthenticated, location.pathname]);

  const handleClose = () => {
    setShowModal(false);
  };

  if (!showModal) {
    return null;
  }

  // --- JSX ATUALIZADO (Backdrop Removido) ---
  return (
    // O wrapper agora posiciona no canto (via CSS)
    <div className="discount-modal-wrapper">
      
      {/* 🛑 O 'discount-modal-backdrop' foi removido daqui */}
      
      {/* Conteúdo do Modal (Estilo da Imagem) */}
      <div className="discount-modal-content">
        
        {/* Botão de fechar (X) */}
        <button
          onClick={handleClose}
          className="discount-modal-close-btn"
          aria-label="Fechar modal"
        >
          <svg
            width="24"
            height="24"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>
        
        {/* Conteúdo principal */}
        <div className="discount-modal-body">
            
            <h2 className="discount-modal-title">
              10% de desconto
            </h2>
            
            <p className="discount-modal-text">
              Recebe um voucher de 10% de desconto para os serviços do Olimpo Skin ao registares-te na nossa plataforma.
            </p>
          </div>
          
        {/* Botão (agora como <Link>) */}
        <div className="discount-modal-actions">
            <Link
              to="/register"
              onClick={handleClose}
              className="discount-modal-btn"
            >
              Registo
            </Link>
          </div>
      </div>
    </div>
  );
};

export default DiscountModal;

