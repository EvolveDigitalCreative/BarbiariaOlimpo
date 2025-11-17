import React, { type FC, useEffect, useState } from 'react';
// ✅ CORREÇÃO FINAL: Caminho ajustado para DOIS NÍVEIS acima (../../context/AuthContext)
import { useAuth } from '../../context/AuthContext';

interface DiscountModalProps {
    isOpen: boolean;
    onClose: () => void;
}

const DiscountModal: FC<DiscountModalProps> = ({ isOpen, onClose }) => {
    // A chamada useAuth() agora deve resolver corretamente
    const { currentUser, userRole } = useAuth(); 
    
    const [isVisible, setIsVisible] = useState(isOpen);

    useEffect(() => {
        setIsVisible(isOpen);
    }, [isOpen]);

    if (!isVisible) {
        return null;
    }

    // ... (Restante do seu código do modal)
    const displayMessage = currentUser 
        ? `Bem-vindo de volta, ${currentUser.email}! Você tem um desconto especial.`
        : "Faça login para receber um desconto de primeira compra!";

    return (
        <div className="discount-modal-overlay" style={overlayStyle}>
            <div className="discount-modal-content" style={modalContentStyle}>
                <button onClick={onClose} style={closeButtonStyle}>X</button>
                <h2>Oferta Especial!</h2>
                <p>{displayMessage}</p>
                <p>O seu role atual é: {userRole || 'Visitante'}</p>
                
                <button 
                    onClick={onClose} 
                    style={actionButtonStyle}>
                    Resgatar Agora
                </button>
            </div>
        </div>
    );
};

export default DiscountModal;

// --- Estilos omitidos por brevidade ---
const overlayStyle: React.CSSProperties = {
    position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, 
    backgroundColor: 'rgba(0, 0, 0, 0.7)', 
    display: 'flex', justifyContent: 'center', 
    alignItems: 'center', zIndex: 2000,
};

const modalContentStyle: React.CSSProperties = {
    backgroundColor: 'white', padding: '30px', 
    borderRadius: '8px', textAlign: 'center', 
    width: '90%', maxWidth: '400px', 
    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.2)',
};

const closeButtonStyle: React.CSSProperties = {
    position: 'absolute', top: '10px', right: '10px', 
    background: 'none', border: 'none', fontSize: '18px', 
    cursor: 'pointer',
};

const actionButtonStyle: React.CSSProperties = {
    marginTop: '20px', padding: '10px 20px', 
    backgroundColor: '#bca46d', color: 'white', 
    border: 'none', borderRadius: '4px', 
    cursor: 'pointer', fontWeight: 'bold',
};