// src/components/sections/olimpowear/WearNewProducts.tsx

import type { FC } from 'react';

// === DADOS DOS NOVOS PRODUTOS (CÓPIA DOS PRODUTOS DA GALERIA ORIGINAL) ===
// ⚠️ ATENÇÃO: Se estes produtos já estão em WearGallery.tsx, estes dados estão duplicados.
const newProducts = [
    // T-shirts Alex9 (4 modelos)
    { name: "Alex9", model: "White", color: "White", price: "25€", image: "/OlimpoWear/shirts/OLIMPO-alex9-white.webp", category: "Alex9" },
    { name: "Alex9", model: "Black", color: "Black", price: "25€", image: "/OlimpoWear/shirts/OLIMPO-alex9-black.webp", category: "Alex9" },
    { name: "Alex9", model: "Gold White", color: "White", price: "25€", image: "/OlimpoWear/shirts/OLIMPO-alex9-gold-white.webp", category: "Alex9" },
    { name: "Alex9", model: "Gold Black", color: "Black", price: "25€", image: "/OlimpoWear/shirts/OLIMPO-alex9-gold-black.webp", category: "Alex9" },

    // T-shirts Mirror (2 modelos)
    { name: "Mirror", model: "White", color: "White", price: "25€", image: "/OlimpoWear/shirts/OLIMPO-mirror-white.webp", category: "Mirror" },
    { name: "Mirror", model: "Black", color: "Black", price: "25€", image: "/OlimpoWear/shirts/OLIMPO-mirror-black.webp", category: "Mirror" },
];

// === COMPONENTE ===
const WearNewProducts: FC = () => {
    // 1. Agrupa os produtos por categoria (Alex9 e Mirror)
    const groupedProducts = newProducts.reduce((acc, product) => {
        if (!acc[product.category]) {
            acc[product.category] = [];
        }
        acc[product.category].push(product);
        return acc;
    }, {} as Record<string, typeof newProducts>);

    return (
        <section className="content-section wear-new-products-section">

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
            
            {/* O padrão grego que estava no final da galeria original */}
            <div className="greek-pattern-border-wear"></div>

        </section>
    );
};

export default WearNewProducts;