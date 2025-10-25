// src/components/sections/olimpo_skincare/SkincareContact.tsx

import type { FC } from 'react';

const SkincareContact: FC = () => {
    return (
        <section className="content-section">
            <div className="greek-pattern-border"></div>
            
            <h2 className="skincare-section-title section-title-centered">
                CONTACTA-NOS
            </h2>
            <p className="skincare-subtitle">
                Estamos aqui para responder às suas questões e agendar o seu próximo ritual.
            </p>
            
            <div className="section-content-wrapper">
                
                {/* Coluna da Informação de Contacto */}
                <div className="section-text-container" style={{ paddingRight: '40px' }}>
                    <div className="contact-info-block">
                        <p className="gold-text-strong">Localização</p>
                        <p>Rua Doutor Queijeiro 20</p>
                        <p>2000-452 Portugal</p>
                    </div>
                    <div className="contact-info-block">
                        <p className="gold-text-strong">Telefone</p>
                        <p>+351 936 722 048</p>
                        <p>(Chamada para rede móvel - horário de funcionamento)</p>
                    </div>
                    <div className="contact-info-block">
                        <p className="gold-text-strong">E-mail</p>
                        <p>olimposkin@email.com</p>
                        <p>Respondemos em 24h</p>
                    </div>
                    <div className="contact-info-block">
                        <p className="gold-text-strong">Horário de funcionamento</p>
                        <p>Segunda a Sexta: 9:00 - 20:00</p>
                        <p>Sábado: 9:00 - 18:00</p>
                        <p>Domingo: Encerrado</p>
                    </div>
                </div>
                
                {/* Coluna do Mapa */}
                <div className="section-image-container">
                    <img 
                        src="/skincare/images/contact-map.jpg" 
                        alt="Localização no Mapa" 
                        className="responsive-image image-rounded" 
                    />
                </div>
            </div>
        </section>
    );
};

export default SkincareContact;