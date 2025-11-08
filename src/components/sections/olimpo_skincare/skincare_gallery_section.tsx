// src/components/sections/olimpo_skincare/GallerySection.tsx

import React from 'react';
import '../../../styles/olimposkincare/skincare_gallery_section.css'; 

// ⭐️ PASSO 1: DEFINIR A INTERFACE DAS PROPS DO CARD
interface GalleryCardProps {
    className: string;
    title: string;
    subtitle: string;
    imageSrc: string;
}

// ⭐️ PASSO 2: APLICAR A INTERFACE AO COMPONENTE
// Ao usar "React.FC<GalleryCardProps>", informa o TS sobre os tipos esperados
const GalleryCard: React.FC<GalleryCardProps> = ({ 
    className, 
    title, 
    subtitle, 
    imageSrc 
}) => {
    // ... (restante do código) ...
    
    // O 'href' é '#' como placeholder. O 'onClick' pode ser usado para navegação em React.
    const handleVerMaisClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
        e.preventDefault(); // Usar preventDefault é importante para o placeholder '#'
        console.log(`Clicou em 'Ver mais' para: ${title}`);
        // Aqui seria a lógica para navegar ou abrir um modal
    };
    
    return (
        <div className={`gallery-card ${className}`} style={{ backgroundImage: `url(${imageSrc})` }}>
            <div className="card-content">
                <span className="card-subtitle">{subtitle}</span>
                <h4 className="card-title">{title}</h4>
                <a 
                    href="#" 
                    onClick={handleVerMaisClick}
                    className="ver-mais-button"
                >
                    Ver mais
                </a>
            </div>
        </div>
    );
};

// Componente principal da Secção de Galeria
const GallerySection = () => {
    
    // URLs das imagens (Ajuste para os seus caminhos reais)
    const images = {
        glowSkin: 'caminho/para/glow_skin.jpg', // Canto superior esquerdo
        elevateSkin: 'caminho/para/elevate_skin.jpg', // Canto superior direito
        antiacne: 'caminho/para/olimpo_antiacne.jpg', // Centro-esquerda (2 linhas)
        skinScan: 'caminho/para/skin_scan.jpg', // Centro-direita (2 linhas)
        olimpoSkin: 'caminho/para/olimpo_skin.jpg', // Fundo completo
    };

    return (
        <section className="olimpo-gallery-section">
            <div className="gallery-grid-container">
                
                {/* 1. Glow Skin (Top Left) - Imagem grande horizontal */}
                <GalleryCard 
                    className="grid-item-1"
                    title="Glow Skin"
                    subtitle="SKIN CARE"
                    imageSrc={images.glowSkin} 
                />
                
                {/* 2. Elevate Skin (Top Right) - Imagem normal */}
                <GalleryCard 
                    className="grid-item-2"
                    title="Elevate Skin"
                    subtitle="SKIN CARE"
                    imageSrc={images.elevateSkin} 
                />
                
                {/* 3. Olimpo Anti-Acne (Mid Left) - Imagem maior vertical */}
                <GalleryCard 
                    className="grid-item-3"
                    title="Olimpo Anti-acne"
                    subtitle="SKIN CARE"
                    imageSrc={images.antiacne} 
                />
                
                {/* 4. Skin Scan (Mid Right) - Imagem normal */}
                <GalleryCard 
                    className="grid-item-4"
                    title="Skin Scan"
                    subtitle="SKIN CARE"
                    imageSrc={images.skinScan} 
                />
                
                {/* 5. Olimpo Skin (Bottom Full Width) - Imagem muito grande horizontal */}
                <GalleryCard 
                    className="grid-item-5"
                    title="Olimpo Skin"
                    subtitle="SKIN CARE"
                    imageSrc={images.olimpoSkin} 
                />
                
            </div>
        </section>
    );
};

export default GallerySection;