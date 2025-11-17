// src/components/sections/olimpo_skincare/skincare_service_cards/ServiceDetailsModal.tsx

import { type FC, useEffect } from 'react'; // <<<<<< IMPORTAR useEffect
// Certifique-se de que a importação GalleryServiceData está correta
import { type GalleryServiceData } from './skincareServicesData.ts'; 

interface ServiceDetailsModalProps {
    service: GalleryServiceData;
    onClose: () => void;
}

const ServiceDetailsModal: FC<ServiceDetailsModalProps> = ({ service, onClose }) => {
    
    // --- LOG DE DIAGNÓSTICO DENTRO DO MODAL ---
    useEffect(() => {
        console.log(`[MODAL RENDER] O modal para "${service.title}" foi montado.`);
        return () => {
            console.log(`[MODAL RENDER] O modal para "${service.title}" será desmontado.`);
        };
    }, [service.title]);
    // ------------------------------------------

    // O Overlay - Clicar no fundo escuro deve FECHAR o modal.
    return (
        <div className="skincare-modal-overlay" onClick={onClose}>
            
            {/* O Modal Principal - Clicar aqui NÃO deve fechar o modal. */}
            <div 
                className="skincare-service-details-modal" 
                onClick={(e) => e.stopPropagation()} // IMPEDE O FECHO AO CLICAR NO CONTEÚDO
            >
                
                <div className="skincare-modal-header">
                    <div className="skincare-modal-title-price">
                        <h2 className="skincare-modal-service-title">{service.title}</h2>
                        {/* Incluído Preço e Duração */}
                        <p className="skincare-modal-price">Duração: {service.duration} | Preço: {service.price}</p>
                    </div>
                    {/* Botão de Fechar no Topo */}
                    <button 
                        className="skincare-modal-close-button" 
                        onClick={onClose} 
                    >
                        &times;
                    </button>
                </div>
                
                {/* ------------------ CORPO DO MODAL ------------------ */}
                <div className="skincare-modal-body">
                    <p className="skincare-modal-description">{service.simpleDescription}</p>
                    
                    {/* Exemplo de secção de Benefícios (usando o objeto details) */}
                    <div className="skincare-modal-details-block">
                         <div className="skincare-details-grid">
                            <div className="skincare-details-column">
                                <h4 className="skincare-details-title">Objetivo Principal</h4>
                                <p>{service.details.objective}</p>
                            </div>
                            <div className="skincare-details-column">
                                <h4 className="skincare-details-title">Tipologia</h4>
                                <p>{service.details.type}</p>
                            </div>
                            <div className="skincare-details-column span-two">
                                <h4 className="skincare-details-title">Benefícios Chave</h4>
                                <ul className="skincare-details-list">
                                    {service.details.benefits.map((benefit, index) => (
                                        <li key={index}>{benefit}</li>
                                    ))}
                                </ul>
                            </div>
                         </div>
                    </div>
                    
                    {/* Botão de Fechar no Fundo */}
                    <button 
                        className="skincare-modal-close-button-bottom"
                        onClick={onClose} 
                    >
                        Fechar
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ServiceDetailsModal;