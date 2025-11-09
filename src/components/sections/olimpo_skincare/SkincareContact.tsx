// src/components/sections/olimpo_skincare/SkincareContact.tsx

import type { FC } from 'react';
import '../../../styles/olimposkincare/skincare_contact.css'; // Novo CSS

// Função utilitária para os ícones
const getContactIconPath = (iconName: string): string => {
    return `/OlimpoSkincare/icons/${iconName}.png`; 
};

const SkincareContact: FC = () => {
    return (
        <section className="content-section skincare-contact-section">
                        
            <h2 className="skincare-section-title section-title-centered">
                CONTACTA-NOS
            </h2>
            <p className="skincare-contact-subtitle section-subtitle-centered"> {/* ⭐️ CLASSE ATUALIZADA */}
                Estamos aqui para responder às suas questões e agendar o seu próximo ritual.
            </p>
            
            <div className="skincare-contact-content-wrapper"> {/* ⭐️ CLASSE ATUALIZADA */}
                
                {/* Coluna da Informação de Contacto */}
                <div className="skincare-contact-details-container"> {/* ⭐️ CLASSE ATUALIZADA */}
                    
                    {/* 1. Localização */}
                    <div className="skincare-contact-item"> {/* ⭐️ CLASSE ATUALIZADA */}
                        <img src={getContactIconPath('location_pin')} alt="Localização" className="skincare-contact-icon" />
                        <div>
                            <p className="skincare-contact-label">Localização</p>
                            <p className="skincare-contact-text">Rua Júlio Queijeiro 20</p>
                            <p className="skincare-contact-text">2005-403 Portugal</p>
                        </div>
                    </div>
                    
                    {/* 2. Telefone */}
                    <div className="skincare-contact-item">
                        <img src={getContactIconPath('phone_call')} alt="Telefone" className="skincare-contact-icon" />
                        <div>
                            <p className="skincare-contact-label">Telefone</p>
                            <p className="skincare-contact-text">+351 926 723 988</p>
                            <p className="skincare-contact-hint">Chamadas e SMS (horário de funcionamento)</p>
                        </div>
                    </div>
                    
                    {/* 3. E-mail */}
                    <div className="skincare-contact-item">
                        <img src={getContactIconPath('email_envelope')} alt="E-mail" className="skincare-contact-icon" />
                        <div>
                            <p className="skincare-contact-label">E-mail</p>
                            <p className="skincare-contact-text">olimposkin@gmail.com</p>
                            <p className="skincare-contact-hint">Respondemos em 24h</p>
                        </div>
                    </div>
                    
                    {/* 4. Horário de funcionamento */}
                    <div className="skincare-contact-item">
                        <img src={getContactIconPath('clock_time')} alt="Horário" className="skincare-contact-icon" />
                        <div>
                            <p className="skincare-contact-label">Horário de funcionamento</p>
                            <p className="skincare-contact-text">Segunda a Sexta: **9:00 - 20:00**</p>
                            <p className="skincare-contact-text">Sábado: **9:00 - 18:00**</p>
                            <p className="skincare-contact-text">Domingo: **Encerrado**</p>
                        </div>
                    </div>
                </div>
                
                {/* Coluna do Mapa */}
                <div className="skincare-map-container"> {/* ⭐️ CLASSE ATUALIZADA */}
                    <img 
                        src="/skincare/images/contact-map.jpg" 
                        alt="Localização no Mapa" 
                        className="skincare-map-image" 
                    />
                </div>
            </div>
        </section>
    );
};

export default SkincareContact;