// src/components/home/ContactSection.tsx

import type { FC } from 'react';

const ContactSection: FC = () => {
    
    const galleryImages = [
        { src: '/barbershop/gallery/1.jpg', alt: 'Interior 1' },
        { src: '/barbershop/gallery/2.jpg', alt: 'Cadeira de Barbeiro' },
        { src: '/barbershop/gallery/3.jpg', alt: 'Decoração Botânica' },
        { src: '/barbershop/gallery/4.jpg', alt: 'Detalhe do Produto' },
        { src: '/barbershop/gallery/5.jpg', alt: 'Detalhe da Cadeira' },
        { src: '/barbershop/gallery/6.jpg', alt: 'Polo de Barbeiro' },
    ];
    
    return (
        <section className="content-section contact-section light-background">
            
            <div className="greek-border-top"></div>

            {/* Secção O NOSSO ESPAÇO */}
            <div className="space-gallery-wrapper">
                <h2 className="section-title gold-title section-title-centered">O NOSSO ESPAÇO</h2>
                <p className="section-subtitle-centered">
                    Bem vindo ao nosso espaço, com linhas contemporâneas a casa dos Deuses, o monte Olimpo
                </p>
                <div className="divider-icon">
                    <div className="gold-ring"></div>
                </div>
                
                {/* Grelha de Imagens */}
                <div className="gallery-grid">
                    {galleryImages.map((img, index) => (
                        <div key={index} className={`gallery-item item-${index + 1}`}>
                            {/* **Mude o caminho da imagem** */}
                            <img src={img.src} alt={img.alt} className="responsive-image image-rounded" />
                        </div>
                    ))}
                </div>
            </div>

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
                        {/* **Mude o caminho da imagem** (Deve ser um mapa real) */}
                        <img 
                            src="/barbershop/images/mapa-placeholder.jpg" 
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