// src/components/sections/olimpo_skincare/skincare_gallery_section.tsx

import { type FC, useState } from 'react';
import '../../../styles/olimposkincare/skincare_gallery_section.css'; 

// Importa o Modal e os Dados
import ServiceDetailsModal from './skincare_service_cards/ServiceDetailsModal.tsx'; 
import { galleryServices, getImagePath, type GalleryServiceData } from './skincare_service_cards/skincareServicesData.ts';


const SkincareGallerySection: FC = () => {
    const [selectedService, setSelectedService] = useState<GalleryServiceData | null>(null);

    const handleOpenModal = (service: GalleryServiceData) => {
        // --- LOG DE DIAGNÓSTICO ---
        console.log(`[MODAL] Tentativa de Abrir Modal para: ${service.title}`);
        
        setSelectedService(service);
        document.body.style.overflow = 'hidden'; // Evita scroll no fundo
    };

    const handleCloseModal = () => {
        // --- LOG DE DIAGNÓSTICO ---
        console.log(`[MODAL] A fechar Modal. Service: ${selectedService?.title || 'N/A'}`);
        
        setSelectedService(null);
        document.body.style.overflow = ''; // Restaura o scroll
    };

    // --- LOG DE RENDERIZAÇÃO ---
    // Este log verifica se o estado está a ser atualizado. 
    // Se o valor for um objeto, o modal está pronto para ser renderizado.
    console.log(`[RENDER] selectedService state: ${selectedService ? selectedService.id : 'null'}`);


    return (
        <section className="skincare-gallery-section">
            <div className="skincare-gallery-service-grid">
                
                {galleryServices.map((service) => (
                    // O JSX do cartão foi omitido por brevidade
                    <div 
                        key={service.id} 
                        className="skincare-service-card"
                    >
                        {/* Imagem de Fundo (z-index: 1) */}
                        <img 
                            src={getImagePath(service.id)} 
                            alt={service.title} 
                            className="skincare-card-background-image"
                            loading="lazy"
                            onError={(e) => {
                                const target = e.target as HTMLImageElement;
                                target.src = 'https://placehold.co/600x400/807E78/FFFFFF?text=Imagem+não+encontrada'; 
                            }}
                        />
                        
                        {/* Overlay de Conteúdo (z-index: 2) */}
                        <div className="skincare-card-content-overlay">
                            <p className="skincare-card-category">{service.category}</p>
                            <h3 className="skincare-card-title">{service.title}</h3>
                            <button 
                                className="skincare-ver-mais-button"
                                onClick={() => handleOpenModal(service)} // ABRIR MODAL
                            >
                                Ver mais
                            </button>
                        </div>
                    </div>
                ))}
            </div>
            
            {/* RENDERIZAÇÃO CONDICIONAL DO MODAL */}
            {selectedService && (
                <ServiceDetailsModal 
                    service={selectedService} 
                    onClose={handleCloseModal} 
                />
            )}
        </section>
    );
};

export default SkincareGallerySection;