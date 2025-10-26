// src/components/sections/olimpowear/WearGallery.tsx

import type { FC } from 'react';

// === DADOS DOS PRODUTOS (BASIC E ALEX) ===
const products = [
    // T-shirts Basic (4 modelos)
    // Frente: LOGO "OLIMPO" no peito.
    { name: "Basic", model: "White Black Logo", color: "White", price: "25€", image: "/OlimpoWear/shirts/T-SHIRT-branco e preta.png", category: "Basic" },
    { name: "Basic", model: "Black White Logo", color: "Black", price: "25€", image: "/OlimpoWear/shirts/T-SHIRT_-basica preta e branca.png", category: "Basic" },
    { name: "Basic", model: "White Gold Logo", color: "White", price: "25€", image: "/OlimpoWear/shirts/T-SHIRT- branco e dourado.png", category: "Basic" },
    { name: "Basic", model: "Black Gold Logo", color: "Black", price: "25€", image: "/OlimpoWear/shirts/T-SHIRT-basica preta e dourada.png", category: "Basic" },

    // T-shirts Alex (4 modelos)
    // Verso: Moeda GRANDE com o rosto.
    { name: "Alex", model: "White Black Coin", color: "White", price: "25€", image: "/OlimpoWear/shirts/T-SHIRT- branca e preta moeda 3d costa.png", category: "Alex" },
    { name: "Alex", model: "Black White Coin", color: "Black", price: "25€", image: "/OlimpoWear/shirts/T-SHIRT-preta e branca moeda 3d verso.png", category: "Alex" },
    { name: "Alex", model: "White Gold Coin", color: "White", price: "25€", image: "/OlimpoWear/shirts/T-SHIRT-branca e dourada costa moeda 3d.png", category: "Alex" },
    { name: "Alex", model: "Black Gold Coin", color: "Black", price: "25€", image: "/OlimpoWear/shirts/T-SHIRT-basica moeda 3d.png", category: "Alex" },
];

// === DADOS DAS FOTOS DE LIFESTYLE (AS 5 FOTOS DO CARROSSEL) ===
const lifestylePhotos = [
    // ATENÇÃO: Os caminhos foram corrigidos para a pasta 'modelos'
    { id: 1, alt: "Modelo T-shirt Olímpo na rua", imageSrc: "/OlimpoWear/modelos/modelo1.jpg" }, // Exemplo
    { id: 2, alt: "Detalhe de roupa e padrão grego", imageSrc: "/OlimpoWear/modelos/modelo2.JPG" }, // Exemplo
    { id: 3, alt: "Dois modelos com T-shirts Olímpo", imageSrc: "/OlimpoWear/modelos/modelo3.JPG" }, // Exemplo
    { id: 4, alt: "Foto Lifestyle 4", imageSrc: "/OlimpoWear/modelos/modelo 4.JPG" }, // Exemplo
    { id: 5, alt: "Foto Lifestyle 5", imageSrc: "/OlimpoWear/modelos/modelo 5.JPG" }, // Exemplo
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