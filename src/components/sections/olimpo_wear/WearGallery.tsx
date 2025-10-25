// src/components/sections/olimpowear/WearGallery.tsx

import type { FC } from 'react';

const products = [
    // Produtos (Ajustados aos seus nomes de ficheiro)
    // T-shirts Basic
    { name: "Basic", model: "White", color: "White", price: "35€", image: "/OlimpoWear/shirts/OLIMPO-basic.webp" }, 
    { name: "Basic", model: "Black", color: "Black", price: "35€", image: "/OlimpoWear/shirts/OLIMPO-basic-black.webp" },
    { name: "Basic", model: "Gold White", color: "White", price: "35€", image: "/OlimpoWear/shirts/OLIMPO-basic-gold-white.webp" }, 
    { name: "Basic", model: "Gold Black", color: "Black", price: "35€", image: "/OlimpoWear/shirts/OLIMPO-basic-gold-black.webp" }, 
    
    // T-shirts Alex
    { name: "Alex", model: "White", color: "White", price: "35€", image: "/OlimpoWear/shirts/OLIMPO-alex.webp" }, 
    { name: "Alex", model: "Black", color: "Black", price: "35€", image: "/OlimpoWear/shirts/OLIMPO-alex-black.webp" },
    { name: "Alex", model: "Gold White", color: "White", price: "35€", image: "/OlimpoWear/shirts/OLIMPO-alex-gold-white.webp" },
    { name: "Alex", model: "Gold Black", color: "Black", price: "35€", image: "/OlimpoWear/shirts/OLIMPO-alex-gold-black.webp" },
    
    // T-shirts Mirror
    { name: "Mirror", model: "White", color: "White", price: "35€", image: "/OlimpoWear/shirts/OLIMPO-mirror.webp" }, 
    { name: "Mirror", model: "Black", color: "Black", price: "35€", image: "/OlimpoWear/shirts/OLIMPO-mirror-black.webp" },
];

const WearGallery: FC = () => {
    return (
        <section className="content-section" style={{ padding: '80px 0' }}>
            <h2 className="wear-section-title">
                O Catálogo Completo
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
                            <p className="product-card-info">{product.color} - {product.price}</p>
                        </a>
                    </div>
                ))}
            </div>

            <div className="greek-pattern-border-wear"></div>

        </section>
    );
};

export default WearGallery;