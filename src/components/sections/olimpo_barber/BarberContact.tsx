// src/components/sections/olimpo_barber/BarberContact.tsx (ou o caminho correto)

import React, { type FC } from 'react'; // Adicione a importação do React se não estiver lá
// ✅ 1. Importe o CSS específico deste componente
import '../../../styles/olimpobarber/barber_contact.css'; // Ajuste o caminho se necessário

// ✅ 2. Importe as imagens dos ícones (ajuste os caminhos relativos!)
import locationIcon from '/OlimpoBarBer/icons/location.png'; 
import phoneIcon from '/OlimpoBarBer/icons/call.png';
import emailIcon from '/OlimpoBarBer/icons/mail.png';
import clockIcon from '/OlimpoBarBer/icons/time.png';

const ContactSection: FC = () => {
    
    return (
        <section className="contact-section light-background" aria-label="Contacte-nos"> 
            
            {/* Secção CONTACTA-NOS */}
            <div className="contact-info-map-wrapper">
                <h2 className="section-title gold-title section-title-centered section-title5">CONTACTA-NOS</h2>
                <p className="section-subtitle-centered2 section-subtitle-centered5">
                    Estamos aqui para responder às suas questões e agendar o seu próximo corte.
                </p>

                <div className="contact-details-map">
                    {/* Detalhes de Contacto */}
                    <div className="contact-details-list">

                        {/* ✅ Item de Contacto com Ícone */}
                        <div className="contact-item"> 
                            <img src={locationIcon} alt="" className="contact-icon-img" />
                            <div className="contact-text-content">
                                <h4 className="contact-label">Localização</h4>
                                <p>Rua Júlio Queijeiro 20</p>
                                <p>2005-403</p> 
                                <p>Portugal</p>
                            </div>
                        </div>

                        {/* ✅ Item de Contacto com Ícone */}
                        <div className="contact-item">
                            <img src={phoneIcon} alt="" className="contact-icon-img" />
                            <div className="contact-text-content">
                                <h4 className="contact-label">Telefone</h4>
                                <p>+351 926 967 332</p> {/* Corrigi o número para corresponder à imagem */}
                                <p className="small-text">(Chamadas e SMS [horário de funcionamento])</p>
                            </div>
                        </div>

                        {/* ✅ Item de Contacto com Ícone */}
                        <div className="contact-item">
                            <img src={emailIcon} alt="" className="contact-icon-img" />
                            <div className="contact-text-content">
                                <h4 className="contact-label">E-mail</h4>
                                <p>olimpobarber@gmail.com</p>
                                <p className="small-text">Respondemos em 24h.</p>
                            </div>
                        </div>

                        {/* ✅ Item de Contacto com Ícone */}
                        <div className="contact-item">
                            <img src={clockIcon} alt="" className="contact-icon-img" />
                            <div className="contact-text-content">
                                <h4 className="contact-label">Horário de Funcionamento</h4>
                                <p>Segunda a Sexta: 9:00 - 20:00</p>
                                <p>Sábado: 9:00 - 18:00</p>
                                <p>Domingo: <span className="closed-status">Encerrado</span></p>
                            </div>
                        </div>
                    </div>
                    
                    {/* Mapa (Sem alterações) */}
                    <div className="contact-map-container">
                        <img 
                            src="/OlimpoBarBer/texture/olimpomap.png" 
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