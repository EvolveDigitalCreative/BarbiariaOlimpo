// src/components/sections/olimpowear/WearContact.tsx

import type { FC } from 'react';

const WearContact: FC = () => {
    return (
        <section className="content-section wear-contact-section">
            <h2 className="wear-section-title">
                CONTACTA-NOS
            </h2>
            <p className="wear-subtitle">
                Estamos aqui para responder às suas questões sobre a sua encomenda ou coleção.
            </p>
            
            <div className="section-content-wrapper reverse-on-mobile">
                
                {/* Coluna da Informação de Contacto */}
                <div className="section-text-container" style={{ paddingRight: '40px' }}>
                    <div className="wear-contact-info-block">
                        <p className="gold-text-strong">Loja Online</p>
                        <p>A loja online funciona 24/7</p>
                        <p>Envios para todo o país.</p>
                    </div>
                    <div className="wear-contact-info-block">
                        <p className="gold-text-strong">Encomendas</p>
                        <p>+351 912 345 678</p>
                        <p>(Apoio ao cliente para compras)</p>
                    </div>
                    <div className="wear-contact-info-block">
                        <p className="gold-text-strong">E-mail</p>
                        <p>olimpowear@email.com</p>
                        <p>Respondemos em 24h</p>
                    </div>
                </div>
                
                {/* Coluna da Imagem (Ajuste o caminho) */}
                <div className="section-image-container">
                    <img 
                        src="/OlimpoWear/images/contact-warehouse.jpg" 
                        alt="Armazém Olimpo Wear" 
                        className="responsive-image image-rounded" 
                    />
                </div>
            </div>
            <div className="greek-pattern-border-wear"></div>
        </section>
    );
};

export default WearContact;