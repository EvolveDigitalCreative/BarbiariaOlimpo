// src/components/sections/olimpo_skincare/SkincareAboutUs.tsx

import type { FC } from 'react';

const SkincareAboutUs: FC = () => {
    return (
        <section className="content-section light-background">
            <div className="section-content-wrapper reverse-on-mobile">
                
                {/* Coluna do Texto */}
                <div className="section-text-container">
                    <p className="gold-text-strong">FICA A CONHECER-NOS</p>
                    <h2 className="section-title">
                        Bem-vindo <br/> à Olimpo skin
                    </h2>
                    
                    <p className="section-paragraph">
                        Olimpo Skin é um espaço de estética em Santarém, especializado em cuidados de rosto e realce do olhar. Aqui encontras protocolos personalizados de limpeza de pele, extensão de pestanas e design de sobrancelhas com foco em resultados e bem-estar.
                    </p>
                    
                    <div className="barbershop-note">
                        <p className="gold-text-strong">Olimpo barbershop</p>
                        <p className="section-paragraph">
                            Atendemos o cuidado num espaço calmo e acolhedor, dentro da Barbearia Olimpo.
                        </p>
                    </div>

                    <a href="/marcacoes" className="skincare-main-button">
                        Marcações
                    </a>
                </div>
                
                {/* Coluna da Imagem */}
                <div className="section-image-container">
                    <img 
                        src="/skincare/images/about-us-image.jpg" 
                        alt="Esteticista Olimpo Skin" 
                        className="responsive-image image-rounded" 
                    />
                </div>
            </div>
        </section>
    );
};

export default SkincareAboutUs;