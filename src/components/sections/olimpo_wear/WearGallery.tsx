// src/components/sections/olimpowear/WearGallery.tsx

import type { FC } from 'react';

// === DADOS DOS PRODUTOS ===
const products = [
    // T-shirts Basic (Grupo 1)
    { name: "Basic", model: "White", color: "White", price: "25€", image: "/OlimpoWear/shirts/OLIMPO-basic.webp", category: "Basic" },
    { name: "Basic", model: "Black", color: "Black", price: "25€", image: "/OlimpoWear/shirts/OLIMPO-basic-black.webp", category: "Basic" },
    { name: "Basic", model: "Gold White", color: "White", price: "25€", image: "/OlimpoWear/shirts/OLIMPO-basic-gold-white.webp", category: "Basic" },
    { name: "Basic", model: "Gold Black", color: "Black", price: "25€", image: "/OlimpoWear/shirts/OLIMPO-basic-gold-black.webp", category: "Basic" },

    // T-shirts Alex (Grupo 2)
    { name: "Alex", model: "White", color: "White", price: "25€", image: "/OlimpoWear/shirts/OLIMPO-alex.webp", category: "Alex" },
    { name: "Alex", model: "Black", color: "Black", price: "25€", image: "/OlimpoWear/shirts/OLIMPO-alex-black.webp", category: "Alex" },
    { name: "Alex", model: "Gold White", color: "White", price: "25€", image: "/OlimpoWear/shirts/OLIMPO-alex-gold-white.webp", category: "Alex" },
    { name: "Alex", model: "Gold Black", color: "Black", price: "25€", image: "/OlimpoWear/shirts/OLIMPO-alex-gold-black.webp", category: "Alex" },
];

// === DADOS DAS FOTOS DE LIFESTYLE (AS 5 FOTOS DO CARROSSEL) ===
const lifestylePhotos = [
    // ATENÇÃO: Preencha com os caminhos corretos das suas 5 imagens de lifestyle
    { id: 1, alt: "Foto Lifestyle 1", imageSrc: "/OlimpoWear/lifestyle/lifestyle-1.webp" },
    { id: 2, alt: "Foto Lifestyle 2", imageSrc: "/OlimpoWear/lifestyle/lifestyle-2.webp" },
    { id: 3, alt: "Foto Lifestyle 3", imageSrc: "/OlimpoWear/lifestyle/lifestyle-3.webp" },
    { id: 4, alt: "Foto Lifestyle 4", imageSrc: "/OlimpoWear/lifestyle/lifestyle-4.webp" },
    { id: 5, alt: "Foto Lifestyle 5", imageSrc: "/OlimpoWear/lifestyle/lifestyle-5.webp" },
];

// === COMPONENTE ===
const WearGallery: FC = () => {
    // 1. Agrupa os produtos por categoria
    const groupedProducts = products.reduce((acc, product) => {
        if (!acc[product.category]) {
            acc[product.category] = [];
        }
        acc[product.category].push(product);
        return acc;
    }, {} as Record<string, typeof products>);

    return (
        <section className="content-section wear-gallery-section">

            {/* PARTE 1: GALERIA DE PRODUTOS */}
            {Object.entries(groupedProducts).map(([category, items]) => (
                <div key={category} className="category-group">

                    <h3 className="category-title">{category}</h3>

                    <div className="product-grid">
                        {items.map((product, index) => (
                            <div className="product-card" key={index}>
                                <a href={`/wear/product/${product.name}-${product.model}`} aria-label={`Ver produto ${product.name} ${product.model}`}>
                                    <div className="product-card-image-wrapper">
                                        <img src={product.image} alt={`${product.name} ${product.model}`} />
                                    </div>
                                    <p className="product-card-name">{product.name}</p>
                                    <p className="product-card-info">{product.price}</p>
                                </a>
                            </div>
                        ))}
                    </div>
                </div>
            ))}

            {/* PARTE 2: GALERIA DE 5 FOTOS DE LIFESTYLE (CARROSSEL HORIZONTAL) */}
            <div className="lifestyle-gallery-wrapper">
                <div className="photo-lifestyle-grid">
                    {lifestylePhotos.map((photo) => (
                        <div key={photo.id} className="photo-placeholder">
                            <img
                                src={photo.imageSrc}
                                alt={photo.alt}
                                loading="lazy"
                            />
                        </div>
                    ))}
                </div>
            </div>

            <div className="greek-pattern-border-wear"></div>

        </section>
    );
};

export default WearGallery;