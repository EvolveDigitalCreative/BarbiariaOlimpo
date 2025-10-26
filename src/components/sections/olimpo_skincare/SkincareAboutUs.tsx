//src/components/sections/olimpo_skincare/SkincareAboutUs.tsx
import type { FC } from 'react';
import '../../../styles/olimposkincare/skincare_about_us.css'; 

const BARBER_COIN_ICON = "/OlimpoSkincare/icons/whitecoin_optimized.png"; 
const PILAR_ICON_PATH = "/OlimpoSkincare/decoracao/pilar.png"; // Reintroduzido

const SkincareAboutUs: FC = () => {
    return (
        <section className="content-section light-background">
            {/* O wrapper é o contentor flexível e o referente de posição (position: relative) */}
            <div className="section-content-wrapper"> 
                
                {/* 1. Coluna da Imagem */}
                <div className="section-image-container">
                    <img 
                        src="/OlimpoSkincare/images/segunda foto princpal.jpg" 
                        alt="Esteticista Olimpo Skin" 
                        className="responsive-image image-rounded" 
                    />
                </div>
                
                {/* 2. Coluna do Texto */}
                <div className="section-text-container">
                    <p className="gold-text-strong">FICA A CONHECER-NOS</p>
                    <h2 className="section-title">
                        Bem-vindo <br/> à Olimpo skin
                    </h2>
                    
                    <p className="section-paragraph">
                        Olimpo Skin é um espaço de estética em Santarém, especializado em cuidados de rosto e realce do olhar. Aqui encontras protocolos personalizados de limpeza de pele, extensão de pestanas e design de sobrancelhas com foco em resultados e bem-estar.
                    </p>
                    
                    <div className="barbershop-note">
                        <div className="barbershop-note-title">
                            <img 
                                src={BARBER_COIN_ICON} 
                                alt="Olimpo Barbershop Icon" 
                                className="barber-coin-icon"
                            />
                            <p className="gold-text-strong">Olimpo barbershop</p>
                        </div>
                        <p className="section-paragraph">
                            Atendemos o cuidado num espaço calmo e acolhedor, dentro da Barbearia Olimpo.
                        </p>
                    </div>

                    <a href="/marcacoes" className="skincare-main-button">
                        Marcações
                    </a>
                </div>
                
                {/* 3. A Coluna do Pilar (Spacer) - Reintroduzida */}
                <div className="section-column-spacer">
                    <img 
                        src={PILAR_ICON_PATH} 
                        alt="Pilar Grego Decorativo"
                        className="decorative-column-image"
                    />
                </div>

            </div>
        </section>
    );
};

export default SkincareAboutUs;