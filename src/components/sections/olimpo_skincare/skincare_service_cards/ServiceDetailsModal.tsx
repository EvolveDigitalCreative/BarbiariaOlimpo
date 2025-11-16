import { type FC } from 'react';
import { type GalleryServiceData, getStepImagePath } from './skincareServicesData'; // Importa dados/tipos

interface ServiceDetailsModalProps {
    service: GalleryServiceData;
    onClose: () => void;
}

const ServiceDetailsModal: FC<ServiceDetailsModalProps> = ({ service, onClose }) => {

    const { title, price, duration, stepsCount, steps, details } = service;

    return (
        <div className="skincare-modal-overlay" onClick={onClose}>
            <div className="skincare-service-details-modal" onClick={(e) => e.stopPropagation()}>
                
                <header className="skincare-modal-header">
                    <button className="skincare-modal-back-button" onClick={onClose}>&leftarrow;</button> 
                    <div className="skincare-modal-title-price">
                        <h1 className="skincare-modal-service-title">{title}</h1>
                        <p className="skincare-modal-price">{price}</p>
                    </div>
                    <button className="skincare-modal-close-button" onClick={onClose}>&times;</button>
                </header>

                <div className="skincare-modal-body">
                    <div className="skincare-modal-steps-section">
                        <h2 className="skincare-modal-subtitle">Como funciona ?</h2>
                        <p className="skincare-modal-steps-count">{stepsCount} SIMPLES PASSOS</p>

                        <div className="skincare-modal-timeline">
                            {steps.map((step, index) => (
                                <div key={step.number} className="skincare-step-item">
                                    <div className="skincare-step-connector" style={{ opacity: index === steps.length - 1 ? 0 : 1 }}></div>

                                    <div className="skincare-step-icon-wrapper">
                                        <img 
                                            src={getStepImagePath(service.id, step.number)} 
                                            alt={`Passo ${step.number} de ${service.title}`} 
                                            className="skincare-step-image"
                                            loading="lazy"
                                        />
                                        <span className="skincare-step-number">{String(step.number).padStart(2, '0')}</span>
                                    </div>
                                    <p className="skincare-step-description">{step.description}</p>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="skincare-modal-details-block">
                        <div className="skincare-details-grid">
                            
                            <div className="skincare-details-column span-two">
                                <p><strong>Duração:</strong> {duration}</p>
                            </div>
                            
                            <div className="skincare-details-column">
                                <h3 className="skincare-details-title">Tipo:</h3>
                                <p>{details.type}</p>
                            </div>

                            <div className="skincare-details-column">
                                <h3 className="skincare-details-title">Objetivo:</h3>
                                <p>{details.objective}</p>
                            </div>

                            <div className="skincare-details-column">
                                <h3 className="skincare-details-title">Indicado para:</h3>
                                <ul className="skincare-details-list">
                                    {details.indicatedFor.map((item, i) => (
                                        <li key={i}>• {item}</li>
                                    ))}
                                </ul>
                            </div>

                            <div className="skincare-details-column">
                                <h3 className="skincare-details-title">Benefícios:</h3>
                                <ul className="skincare-details-list">
                                    {details.benefits.map((item, i) => (
                                        <li key={i}>• {item}</li>
                                    ))}
                                </ul>
                            </div>

                        </div>
                    </div>
                </div>
                 <button onClick={onClose} className="skincare-modal-close-button-bottom">FECHAR</button>
            </div>
        </div>
    );
};

export default ServiceDetailsModal;