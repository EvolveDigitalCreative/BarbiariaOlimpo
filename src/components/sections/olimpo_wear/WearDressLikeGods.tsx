// src/components/sections/olimpo_wear/WearDressLikeGods.tsx

import type { FC } from 'react';

const WearDressLikeGods: FC = () => {
  // ⚠️ ATENÇÃO: Substitua pelos caminhos reais das suas duas imagens
  const img1Src = '/OlimpoWear/foto/OLIMPO foto t-shirts 15.JPG'; // Modelo com T-shirt preta
  const img2Src = '/OlimpoWear/foto/OLIMPO_foto_t-shirts_18.webp'; // Modelo com T-shirt branca (ou Mirror)

  return (
    <section className="wear-dresslikegods-section">
      <div className="dresslikegods-image-container">
        {/* Imagem 1: 50% */}
        <img
          src={img1Src}
          alt="Modelo com T-shirt preta grande moeda"
          className="dresslikegods-img left"
          loading="lazy"
        />

        {/* Imagem 2: 50% */}
        <img
          src={img2Src}
          alt="Modelo com T-shirt branca Mirror"
          className="dresslikegods-img right"
          loading="lazy"
        />
      </div>

      {/* O Texto "DRESS LIKE THE GODS" que fica centralizado acima das imagens */}
      <div className="banner-overlay-text">
        <h2 className="banner-text">DRESS LIKE THE GODS</h2>
      </div>
    </section>
  );
};

export default WearDressLikeGods;