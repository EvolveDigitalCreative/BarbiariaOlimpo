import type { FC } from 'react';
import WearProductCard from './WearProductCard'; // ✅ Importar o novo Card

// === DADOS DOS NOVOS PRODUTOS ===
const newProducts = [
    // T-shirts Alex9 (4 modelos)
    { name: "Alex9", model: "White", color: "White", price: "25€", image: "/OlimpoWear/shirts/T-SHIRT-alex-branca e pretas.png", category: "Alex9" },
    { name: "Alex9", model: "Black", color: "Black", price: "25€", image: "/OlimpoWear/shirts/T-SHIRT-alex-preta e branca costa.png", category: "Alex9" },
    { name: "Alex9", model: "Gold White", color: "White", price: "25€", image: "/OlimpoWear/shirts/T-SHIRT-alex- branca e dourada.png", category: "Alex9" },
    { name: "Alex9", model: "Gold Black", color: "Black", price: "25€", image: "/OlimpoWear/shirts/T-SHIRT-alex-costa preta e dourada.png", category: "Alex9" },

    // T-shirts Mirror (2 modelos)
    { name: "Mirror", model: "White", color: "White", price: "25€", image: "/OlimpoWear/shirts/T-Shirt-branca e preta.png", category: "Mirror" },
    { name: "Mirror", model: "Black", color: "Black", price: "25€", image: "/OlimpoWear/shirts/T-SHIRT-alex-preta e beanca 3 moedas nas costas.png", category: "Mirror" },
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
                            // ✅ USANDO O CARD: Não precisamos mais do HTML interno com <a>
                            <WearProductCard
                                key={index}
                                product={product}
                            />
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