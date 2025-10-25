// src/components/sections/olimpowear/WearGallery.tsx

import type { FC } from 'react';

const products = [
    { name: "Basic", model: "Alex", color: "White", image: "/wear/products/basic-white.png" },
    { name: "Basic", model: "Alex", color: "Black", image: "/wear/products/basic-black.png" },
    { name: "Basic", model: "Ouro", color: "White", image: "/wear/products/basic-gold-white.png" },
    { name: "Basic", model: "Ouro", color: "Black", image: "/wear/products/basic-gold-black.png" },
    { name: "Alex", model: "Face", color: "White", image: "/wear/products/alex-face-white.png" },
    { name: "Alex", model: "Face", color: "Black", image: "/wear/products/alex-face-black.png" },
    // Adicionar produtos da secção "Mirror" ou "Gold"
];

const WearGallery: FC = () => {
    return (
        <section className="content-section" style={{ padding: '80px 0' }}>
            <h2 className="wear-section-title">
                Catálogo Completo
            </h2>
            <p className="wear-subtitle">
                Descubra a linha completa de vestuário Olimpo Wear: conforto, qualidade e design.
            </p>
            
            <div className="product-grid">
                {products.map((product, index) => (
                    <div className="product-card" key={index}>
                        <a href={`/wear/product/${product.name}-${product.model}`} aria-label={`Ver produto ${product.name}`}>
                            <div className="product-card-image-wrapper">
                                <img src={product.image} alt={`${product.name} ${product.model}`} />
                            </div>
                            <p className="product-card-name">{product.name} {product.model}</p>
                            <p className="product-card-info">{product.color} - 35€</p>
                        </a>
                    </div>
                ))}
            </div>

            <div className="greek-pattern-border-wear"></div>

        </section>
    );
};

export default WearGallery;