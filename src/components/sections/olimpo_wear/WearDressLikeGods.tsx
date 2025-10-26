// src/components/sections/olimpo_wear/WearDressLikeGods.tsx

import type { FC } from 'react';

const WearDressLikeGods: FC = () => {
  // ⚠️ DEFINE A URL DA SUA IMAGEM COMPLETA AQUI!
  // Exemplo: /public/OlimpoWear/banners/dress-like-gods.jpg
  const bannerImageUrl = '/OlimpoWear/banners/olimpo_best_seller.webp';

  return (
    <section
      className="wear-dresslikegods-section"
      // Passa a URL da imagem composta como uma Variável CSS
      style={{ '--dress-bg-url': `url(${bannerImageUrl})` } as React.CSSProperties}
    >
      <div className="banner-content">
        {/* Mantenha apenas o texto principal */}
        <h2 className="banner-text">DRESS LIKE THE GODS</h2>
        {/* REMOVIDO: O botão "Explorar" */}
      </div>
    </section>
  );
};

export default WearDressLikeGods;