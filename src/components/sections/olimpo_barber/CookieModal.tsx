import React, { useState, useEffect, type FC } from 'react';
import '../../../styles/olimpobarber/CookieModal.css'
// Importe seu gerenciador de cookies e hooks reais
// import { CookieManager } from '../../utils/cookieUtils';
// import { useCommonPageLoading } from '../../hooks/usePageLoading';

// NOTE: Simulação das dependências para o exemplo funcionar
const CookieManager = {
  areCookiesAccepted: () => sessionStorage.getItem('cookie_consent') === 'true',
  setCookieConsent: (accepted: boolean) => sessionStorage.setItem('cookie_consent', accepted ? 'true' : 'false'),
};
const useCommonPageLoading = () => ({ isLoading: false });


export const CookieModal: FC = () => {
  const [showModal, setShowModal] = useState(false);
  const { isLoading } = useCommonPageLoading();

  useEffect(() => {
    if (!isLoading) {
      const hasConsent = CookieManager.areCookiesAccepted();
      if (!hasConsent) {
        setShowModal(true);
      }
    }
  }, [isLoading]);

  const handleAccept = () => {
    CookieManager.setCookieConsent(true);
    setShowModal(false);
  };

  const handleReject = () => {
    CookieManager.setCookieConsent(false);
    setShowModal(false);
  };

  if (!showModal) {
    return null;
  }

  // --- JSX ATUALIZADO COM CLASSES CSS TRADICIONAIS ---
  return (
    <div className="cookie-modal-wrapper">
      
      {/* Overlay escuro */}
      <div 
        className="cookie-modal-backdrop"
        onClick={handleReject}
        aria-hidden="true"
      />
      
      {/* Conteúdo do Modal */}
      <div className="cookie-modal-content">
        
        {/* Botão de fechar (X) */}
        <button
          onClick={handleReject}
          className="cookie-modal-close-btn"
          aria-label="Rejeitar e fechar modal"
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
        <div className="cookie-modal-body">
            
            <h2 className="cookie-modal-title">
              Política de cookies
            </h2>
            
            <p className="cookie-modal-text">
              Ao clicar em "Aceitar todos os cookies", você concorda com o armazenamento de cookies no seu dispositivo para melhorar a navegação no site, analisar o uso do site e ajudar em nossos esforços de marketing.
            </p>
          </div>
          
        {/* Botões */}
        <div className="cookie-modal-actions">
            <button
              onClick={handleAccept}
              className="cookie-modal-btn"
            >
              Aceitar todos os cookies
            </button>
            
            <button
              onClick={handleReject}
              className="cookie-modal-btn"
            >
              Rejeitar todos
            </button>
          </div>
          
        {/* Link para políticas */}
        <div className="cookie-modal-link-wrapper">
            <a
              href="/politica-cookies"
              className="cookie-modal-link"
            >
              Política de cookies
            </a>
          </div>
      </div>
    </div>
  );
};

export default CookieModal;