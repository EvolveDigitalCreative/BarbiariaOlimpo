// src/components/sections/olimpo_skincare/common/SkincareBookingModal.tsx
import { type FC } from 'react';
import { useState } from 'react';
// Importa o CSS do modal
import '../../../../styles/olimposkincare/skincare_booking_modal.css';

// ------------------------------------------------------------
// Componentes do Passo (Apenas um placeholder por enquanto)
// ------------------------------------------------------------

// A barra de progresso ficará no componente principal, mas aqui estão os passos

const Step1ChooseService: FC<{ goToNext: () => void }> = ({ goToNext }) => (
    <div className="skincare-modal-step">
        <h3>1. Escolha o Serviço</h3>
        <p>Selecione o ritual de tratamento que deseja.</p>
        {/* Simulação de um botão para avançar */}
        <button onClick={goToNext} className="skincare-modal-next-button">
            Escolher Data (Simular)
        </button>
    </div>
);

const Step2ChooseDateTime: FC<{ goToNext: () => void, goToPrev: () => void }> = ({ goToNext, goToPrev }) => (
    <div className="skincare-modal-step">
        <h3>2. Data e Hora</h3>
        <p>Quando gostaria de nos visitar?</p>
        <div className="skincare-modal-controls">
            <button onClick={goToPrev} className="skincare-modal-back-button">Voltar</button>
            <button onClick={goToNext} className="skincare-modal-next-button">
                Detalhes Pessoais (Simular)
            </button>
        </div>
    </div>
);

const Step3Confirmation: FC<{ close: () => void }> = ({ close }) => (
    <div className="skincare-modal-step">
        <h3>3. Confirmação</h3>
        <p>O seu agendamento está completo! Enviámos um email com os detalhes.</p>
        <button onClick={close} className="skincare-modal-next-button">
            Fechar
        </button>
    </div>
);


// ------------------------------------------------------------
// COMPONENTE PRINCIPAL DO MODAL
// ------------------------------------------------------------

interface BookingModalProps {
    isOpen: boolean;
    onClose: () => void;
}

const steps = [
    'Serviço',
    'Data/Hora',
    'Confirmação'
];

const SkincareBookingModal: FC<BookingModalProps> = ({ isOpen, onClose }) => {
    // Estado para controlar o passo atual do formulário
    const [currentStep, setCurrentStep] = useState(1); 

    if (!isOpen) {
        return null;
    }

    const goToNext = () => {
        if (currentStep < steps.length) {
            setCurrentStep(currentStep + 1);
        } else {
            onClose(); // Fecha se for o último passo
        }
    };

    const goToPrev = () => {
        if (currentStep > 1) {
            setCurrentStep(currentStep - 1);
        }
    };

    // Função para renderizar o conteúdo do passo atual
    const renderStepContent = () => {
        switch (currentStep) {
            case 1:
                return <Step1ChooseService goToNext={goToNext} />;
            case 2:
                return <Step2ChooseDateTime goToNext={goToNext} goToPrev={goToPrev} />;
            case 3:
                return <Step3Confirmation close={onClose} />;
            default:
                return null;
        }
    };

    // A barra de progresso em tempo real
    const progressPercentage = (currentStep / steps.length) * 100;
    
            return (
                <div 
                    className="skincare-modal-overlay" 
                    onClick={onClose}
                    data-is-open={isOpen ? "true" : "false"} 
                >
                {/* 1. BARRA DE PROGRESSO */}
                <div className="skincare-progress-bar-container">
                    <div 
                        className="skincare-progress-bar-fill" 
                        style={{ width: `${progressPercentage}%` }} // Largura em tempo real
                    />
                </div>
                
                {/* 2. TÍTULOS DA BARRA DE PROGRESSO */}
                <div className="skincare-progress-labels">
                    {steps.map((label, index) => (
                        <span 
                            key={index}
                            className={`skincare-progress-label ${index + 1 <= currentStep ? 'active' : ''}`}
                        >
                            {label}
                        </span>
                    ))}
                </div>
                
                <hr className="skincare-modal-separator" />

                {/* 3. CONTEÚDO DO PASSO */}
                <div className="skincare-modal-content">
                    {renderStepContent()}
                </div>

                {/* Botão de fechar (opcional) */}
                <button className="skincare-modal-close-button" onClick={onClose}>
                    &times;
                </button>
            </div>
    );
};

export default SkincareBookingModal;