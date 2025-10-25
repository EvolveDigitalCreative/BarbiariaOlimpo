// src/components/sections/olimpo_skincare/SkincareHero.tsx

import type { FC } from 'react';

const SkincareHero: FC = () => {
    return (
        <section className="hero-section skincare-hero">
            <div className="hero-content">
                <div className="skincare-hero-brand">
                    <img src="/skincare/icons/skincare-logo.svg" alt="Olimpo Skincare" />
                </div>
                
                <h1 className="skincare-hero-title">
                    Uma pele radiante começa aqui.
                </h1>
                <p className="skincare-hero-subtitle">
                    Eleva o teu brilho.
                </p>
                
                <a href="/marcacoes" className="skincare-main-button">
                    Marcações
                </a>
            </div>

            <div className="skincare-hero-image-container">
                <img 
                    src="/skincare/images/hero-model.jpg" 
                    alt="Modelo Skincare" 
                    className="skincare-hero-image"
                />
            </div>
            
        </section>
    );
};

export default SkincareHero;