// src/components/sections/olimpo_wear/WearBestSeller.tsx (CÓDIGO CORRIGIDO)

import type { FC } from 'react';

const WearBestSeller: FC = () => {
  // ⚠️ CORRIGIDO: O caminho agora é uma string válida (com aspas no início)
  const bestSellerImageUrl = '/OlimpoWear/foto/olimpo_best_seller.webp';

  return (
    <section
      className="wear-bestseller-section"
    >
      {/* COLUNA ESQUERDA: Imagem de Destaque */}
      <div
        className="bestseller-image-container"
        // Injeta a URL como Variável CSS
        style={{ '--bestseller-bg-url': `url(${bestSellerImageUrl})` } as React.CSSProperties}
      >
      </div>

      {/* COLUNA DIREITA: Texto e Botões (Fundo Preto) */}
      <div className="bestseller-text-container">
        {/* Título Principal (Olimpo Best Seller) */}
        <h2 className="bestseller-title">
          <span className="logo-text">OLIMPO</span> <span className="best-seller-text">BEST SELLER</span>
        </h2>

        {/* Parágrafo de Descrição */}
        <p className="bestseller-description">
          Motivos de edição limitada + essenciais do dia a dia = o conjunto casual perfeito. Todos os meses, lançamos uma t-shirt em exclusivo online, com técnicas de estampagem elegantes e os tecidos mais confortáveis. Coleciona todas e desfruta dos elogios que vais ouvir.
        </p>

        {/* Botões de Ação */}
        <div className="bestseller-buttons">
          <button className="bestseller-primary-button">Comprar a T-shirt</button>
          <button className="bestseller-secondary-button">Mais T-shirts</button>
        </div>
      </div>
    </section>
  );
};

export default WearBestSeller;