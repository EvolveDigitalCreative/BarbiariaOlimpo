// src/components/sections/olimpowear/WearHero.tsx

import type { FC } from 'react';
import React from 'react';

const WearHero: FC = () => {
    // Verifique o caso (Maiúsculas/Minúsculas)
    // Se a pasta é 'OlimpoWear' e 'foto', use-as exatamente assim.
    // E certifique-se que o nome do ficheiro está *EXATAMENTE* correto (minúsculas recomendadas).
    const heroImageUrl = '/OlimpoWear/foto/OLIMPO_foto_t-shirts_18.webp'; // Sugestão Padronizada

    return (
        <section
            className="wear-hero-section"
            style={{ '--hero-bg-url': `url(${heroImageUrl})` } as React.CSSProperties}
        >
            <div className="section-content-wrapper">
                <h1 className="hero-title">Olimpo Wear</h1>
            </div>
        </section>
    );
};

export default WearHero;