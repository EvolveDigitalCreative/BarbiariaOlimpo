// src/components/sections/olimpo_wear/WearCatalog.tsx

import type { FC } from 'react';

const WearCatalog: FC = () => {
  return (
    <section className="wear-catalog-section">
      <h2 className="section-title">Os Nossos Produtos</h2>
      <div className="product-grid">
        {/* Placeholder para os cartões de produto */}
        <div className="product-card">T-Shirt Ares</div>
        <div className="product-card">Camisola Zeus</div>
        <div className="product-card">Boné Hades</div>
        {/* ... mais produtos ... */}
      </div>
      <button className="secondary-button">Carregar Mais</button>
    </section>
  );
};

export default WearCatalog;