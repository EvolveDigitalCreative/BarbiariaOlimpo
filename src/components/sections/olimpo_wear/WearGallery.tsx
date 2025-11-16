import type { FC } from 'react';
import WearProductCard from './WearProductCard'; 
// import { Link } from 'react-router-dom'; <== REMOVIDO: Causa o aviso "never read"

// ==========================================================
// 1. DEFINIÇÃO DE TIPOS E FUNÇÃO SLUG
// ==========================================================
interface Product {
    name: string;
    model: string;
    color: string;
    price: string;
    image: string;
    category: string;
    id: string; 
}

// Função para gerar o SLUG/ID de forma consistente com o WearProductPage.tsx
const generateSlug = (name: string, model: string): string => {
    return `${name}-${model}`
        .replace(/\s+/g, '-')
        .replace(/[^\w-]/g, '')
        .toLowerCase();
};

// ==========================================================
// 2. DADOS DOS PRODUTOS (UNIFICADOS E COM ID/SLUG CORRETO)
// ==========================================================
const rawProducts = [
    { name: 'Basic', model: 'White Black Logo', color: 'White', price: '25€', image: '/OlimpoWear/shirts/T-SHIRT-branco e preta.png', category: 'Basic' },
    { name: 'Basic', model: 'Black White Logo', color: 'Black', price: '25€', image: '/OlimpoWear/shirts/T-SHIRT_-basica preta e branca.png', category: 'Basic' },
    { name: 'Basic', model: 'White Gold Logo', color: 'White', price: '25€', image: '/OlimpoWear/shirts/T-SHIRT- branco e dourado.png', category: 'Basic' },
    { name: 'Basic', model: 'Black Gold Logo', color: 'Black', price: '25€', image: '/OlimpoWear/shirts/T-SHIRT-basica preta e dourada.png', category: 'Basic' },

    // Modelos Alex ajustados para refletir a lógica de SLUG
    { name: 'Alex', model: 'Gold White', color: 'White', price: '25€', image: '/OlimpoWear/shirts/T-SHIRT-alex-branca e dourada.png', category: 'Alex' },
    { name: 'Alex', model: 'Gold Black', color: 'Black', price: '25€', image: '/OlimpoWear/shirts/T-SHIRT-alex-preta e dourada.png', category: 'Alex' },
    { name: 'Alex', model: 'Black', color: 'Black', price: '25€', image: '/OlimpoWear/shirts/T-SHIRT-alex-branco e preta.png', category: 'Alex' },
    { name: 'Alex', model: 'White', color: 'White', price: '25€', image: '/OlimpoWear/shirts/T-SHIRT-alex-branca e pretas.png', category: 'Alex' },

    // Modelos com Coin (Moeda)
    { name: 'Alex', model: 'White Black Coin', color: 'White', price: '25€', image: '/OlimpoWear/shirts/T-SHIRT- branca e preta moeda 3d costa.png', category: 'Alex' },
    { name: 'Alex', model: 'Black White Coin', color: 'Black', price: '25€', image: '/OlimpoWear/shirts/T-SHIRT-preta e branca moeda 3d verso.png', category: 'Alex' },
    { name: 'Alex', model: 'White Gold Coin', color: 'White', price: '25€', image: '/OlimpoWear/shirts/T-SHIRT-branca e dourada costa moeda 3d.png', category: 'Alex' },
    { name: 'Alex', model: 'Black Gold Coin', color: 'Black', price: '25€', image: '/OlimpoWear/shirts/T-SHIRT-basica moeda 3d.png', category: 'Alex' },
];

// Mapear produtos para adicionar o ID/SLUG
const products: Product[] = rawProducts.map(p => ({
    ...p,
    id: generateSlug(p.name, p.model) // Gera o ID de navegação (slug)
}));


// === DADOS DAS FOTOS DE LIFESTYLE (AS 5 FOTOS DO CARROSSEL) ===
type LifestylePhoto = { id: number; alt: string; imageSrc: string };
const lifestylePhotos: LifestylePhoto[] = [
    { id: 1, alt: 'Modelo T-shirt Olímpo na rua', imageSrc: '/OlimpoWear/modelos/OLIMPO-basic.webp' },
    { id: 2, alt: 'Detalhe de roupa e padrão grego', imageSrc: '/OlimpoWear/modelos/modelo2.JPG' },
    { id: 3, alt: 'Dois modelos com T-shirts Olímpo', imageSrc: '/OlimpoWear/modelos/modelo3.JPG' },
    { id: 4, alt: 'Foto Lifestyle 4', imageSrc: '/OlimpoWear/modelos/modelo 4.JPG' },
    { id: 5, alt: 'Foto Lifestyle 5', imageSrc: '/OlimpoWear/modelos/modelo 5.JPG' },
];

// === COMPONENTE ===
const WearGallery: FC = () => {
    // Agrupa os produtos por categoria (Basic, Alex, etc.)
    const groupedProducts = products.reduce((acc, product) => {
        if (!acc[product.category]) acc[product.category] = [];
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
                        {/* ✅ CORREÇÃO: Removido o argumento 'index' desnecessário */}
                        {items.map((product) => ( 
                            // USANDO O CARD: Renderiza o WearProductCard
                            <WearProductCard
                                key={product.id}
                                product={product}
                            />
                        ))}
                    </div>
                </div >
            ))}

            {/* PARTE 2: GALERIA DE 5 FOTOS DE LIFESTYLE (CARROSSEL HORIZONTAL) */}
            <div className="lifestyle-gallery-wrapper">
                <div className="photo-lifestyle-grid">
                    {lifestylePhotos.map((photo) => (
                        <div key={photo.id} className="photo-placeholder">
                            <img src={photo.imageSrc} alt={photo.alt} loading="lazy" />
                            <div className="photo-overlay">
                                <span>ver mais</span>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            <div className="greek-pattern-border-wear"></div>
        </section >
    );
};

export default WearGallery;