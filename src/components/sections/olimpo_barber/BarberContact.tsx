// src/components/home/ContactSection.tsx (Atualizado)

import type { FC } from 'react';

const ContactSection: FC = () => {
    
    // A lista galleryImages foi removida, pois agora está em OurSpaceSection
    
    return (
        // Removi a classe 'content-section' para que esta seção não tenha a borda 'greek-border-top'
        // se ela já estiver no OurSpaceSection. Se precisar dela, volte a adicionar.
        <section className="contact-section light-background" aria-label="Contacte-nos"> 
            
            {/* A seção O NOSSO ESPAÇO foi removida daqui, agora está em OurSpaceSection */}

            {/* Secção CONTACTA-NOS */}
            <div className="contact-info-map-wrapper">
                <h2 className="section-title gold-title section-title-centered">CONTACTA-NOS</h2>
                <p className="section-subtitle-centered">
                    Estamos aqui para responder às suas questões e agendar o seu próximo corte.
                </p>

                <div className="contact-details-map">
                    {/* Detalhes de Contacto */}
                    <div className="contact-details-list">
                        <div className="contact-item location">
                            <h4 className="contact-label">Localização</h4>
                            <p>Rua João Queijeiro 20</p>
                            <p>3030-329</p>
                            <p>Portugal</p>
                        </div>
                        <div className="contact-item phone">
                            <h4 className="contact-label">Telefone</h4>
                            <p>+351 926 967 132</p>
                            <p className="small-text">(Chamadas e SMS [horário de funcionamento])</p>
                        </div>
                        <div className="contact-item email">
                            <h4 className="contact-label">E-mail</h4>
                            <p>olimpobarber@gmail.com</p>
                            <p className="small-text">Respondemos em 24h.</p>
                        </div>
                        <div className="contact-item hours">
                            <h4 className="contact-label">Horário de Funcionamento</h4>
                            <p>Segunda a Sexta: 9:00 - 20:00</p>
                            <p>Sábado: 9:00 - 18:00</p>
                            <p>Domingo: <span className="closed-status">Encerrado</span></p>
                        </div>
                    </div>
                    
                    {/* Mapa */}
                    <div className="contact-map-container">
                        <img 
                            src="/src/OlimpoBarBer/texture/olimpomap.png" 
                            alt="Localização no Mapa" 
                            className="responsive-image image-rounded"
                        />
                    </div>
                </div>
            </div>
            
        </section>
    );
};

export default ContactSection;