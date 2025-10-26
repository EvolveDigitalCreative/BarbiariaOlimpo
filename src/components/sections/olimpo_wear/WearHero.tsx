// src/components/sections/olimpowear/WearHero.tsx

import type { FC } from 'react';

const WearHero: FC = () => {
  // ⚠️ CAMINHO DA FOTO: Você pode mudar esta URL para alterar a imagem de fundo.
  const heroImageUrl = '/OlimpoWear/foto/olimpo_best_seller.webp';

  return (
    <section
      className="wear-hero-section"
      // Passa a URL como uma Variável CSS (Custom Property: --hero-bg-url)
      style={{ '--hero-bg-url': `url(${heroImageUrl})` } as React.CSSProperties}
    >
      <div className="section-content-wrapper">
        <h1 className="hero-title">Olimpo Wear</h1>
      </div>
    </section>
  );
};

export default WearHero;