// src/components/sections/olimpowear/WearHero.tsx

import type { FC } from 'react';

const WearHero: FC = () => {
    return (
        <section className="wear-hero-section">
            <div className="wear-hero-split">
                {/* Imagem da esquerda */}
                <img src="/OlimpoWear/images/hero-left.jpg" alt="Coleção Wear Esquerda" style={{ filter: 'brightness(0.8)' }}/>
                
                {/* Imagem da direita */}
                <img src="/OlimpoWear/images/hero-right.jpg" alt="Coleção Wear Direita" style={{ filter: 'brightness(0.7)' }}/>
            </div>
            
            <div className="wear-hero-content">
                <h1 className="wear-hero-title-large">
                    FIT FOR GODS. WORN ON EARTH.
                </h1>
                
                <a href="/wear/shop" className="wear-main-button" style={{ marginTop: '20px' }}>
                    Ver Coleção
                </a>
            </div>
        </section>
    );
};

export default WearHero;