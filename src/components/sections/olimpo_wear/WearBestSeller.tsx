// src/components/sections/olimpo_wear/WearBestSeller.tsx

import type { FC } from 'react';

const WearBestSeller: FC = () => {
  return (
    <section className="wear-bestseller-section">
      <h2 className="section-title gold-text-strong">O Mais Vendido</h2>
      <div className="bestseller-content">
        {/* Conteúdo do produto em destaque (possivelmente 3D ou imagem grande) */}
        <p>T-Shirt Olimpo Essential - A escolha dos Deuses.</p>
      </div>
    </section>
  );
};

export default WearBestSeller;