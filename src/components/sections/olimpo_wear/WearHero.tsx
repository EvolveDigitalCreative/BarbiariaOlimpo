// src/components/sections/olimpo_wear/WearHero.tsx

import type { FC } from 'react';

const WearHero: FC = () => {
  return (
    <section className="wear-hero-section">
      <div className="section-content-wrapper">
        <h1 className="hero-title">Olimpo Wear</h1>
        <p className="hero-subtitle">Veste a atitude. Domina o teu estilo.</p>
        <button className="primary-button">Ver Coleção</button>
      </div>
    </section>
  );
};

export default WearHero;