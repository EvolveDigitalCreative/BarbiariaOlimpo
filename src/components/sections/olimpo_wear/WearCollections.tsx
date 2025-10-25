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
                
                {/* Coluna da Imagem */}
                <div className="featured-image-container">
                    <img 
                        src="/wear/images/featured-model.jpg" 
                        alt="Best Seller T-shirt" 
                        className="responsive-image" 
                    />
                </div>
                
                {/* Coluna do Texto (Fundo Preto) */}
                <div className="featured-text-container">
                    <img src="/global/logos/olimpo-logo-white.svg" alt="Olimpo Wear" className="olimpowear-logo" />
                    
                    <p className="best-seller-tag">BEST SELLER</p>
                    
                    <p>
                        A t-shirt mais vendida da nossa coleção. O corte perfeito e o tecido premium 
                        proporcionam conforto e estilo urbano. Leve a herança Olimpo para as ruas.
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