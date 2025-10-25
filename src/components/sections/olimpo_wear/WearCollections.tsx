// src/components/sections/olimpowear/WearCollections.tsx

import type { FC } from 'react';

const WearCollections: FC = () => {
    return (
        <section className="content-section light-background" style={{ padding: '80px 0' }}>
            <h2 className="wear-section-title">
                Os Nossos Destaques
            </h2>
            
            {/* Secção de Produto em Destaque/Best Seller */}
            <div className="featured-products-section">
                
                {/* Coluna do Vídeo/Imagem em destaque */}
                <div className="featured-image-container">
                    {/* CORRIGIDO: Removido o atributo 'alt' do vídeo */}
                    <video 
                        autoPlay 
                        loop 
                        muted 
                        playsInline
                        src="/OlimpoWear/shirts/Vídeo-best-seller.webm" 
                        className="responsive-image" 
                    >
                        Vídeo promocional do Best Seller Olimpo Wear.
                    </video>
                </div>
                
                {/* Coluna do Texto (Fundo Preto) */}
                <div className="featured-text-container">
                    <img src="/global/logos/olimpo-logo-white.svg" alt="Olimpo Wear" className="olimpowear-logo" />
                    
                    <p className="best-seller-tag">BEST SELLER</p>
                    
                    <p>
                        Uma linha exclusiva que é a essência do dia a dia e o ajuste 
                        casual perfeito. Todas as nossas t-shirts usam tecidos premium, 
                        permitindo-lhe um look elegante e as medidas mais confortáveis. 
                        Conquiste todas as divisões nas roupas que o vestem.
                    </p>
                    
                    <div className="featured-buttons">
                        <a href="/wear/product/best-seller" className="wear-secondary-button">
                            Comprar T-shirt
                        </a>
                        <a href="/wear/catalogo" className="wear-main-button">
                            Mais T-shirts
                        </a>
                    </div>
                </div>

            </div>
        </section>
    );
};

export default WearCollections;