import type { FC } from 'react';
import WearProductCard from './WearProductCard'; // ✅ Importar o novo Card

// === DADOS DOS PRODUTOS (BASIC E ALEX) ===
const products = [
<<<<<<< HEAD
    { name: 'Basic', model: 'White Black Logo', color: 'White', price: '25€', image: '/OlimpoWear/shirts/T-SHIRT-branco e preta.png', category: 'Basic' },
    { name: 'Basic', model: 'Black White Logo', color: 'Black', price: '25€', image: '/OlimpoWear/shirts/T-SHIRT_-basica preta e branca.png', category: 'Basic' },
    { name: 'Basic', model: 'White Gold Logo', color: 'White', price: '25€', image: '/OlimpoWear/shirts/T-SHIRT- branco e dourado.png', category: 'Basic' },
    { name: 'Basic', model: 'Black Gold Logo', color: 'Black', price: '25€', image: '/OlimpoWear/shirts/T-SHIRT-basica preta e dourada.png', category: 'Basic' },
    
    
    { name: 'Alex', model: 'White Black Coin', color: 'White', price: '25€', image: '/OlimpoWear/shirts/T-SHIRT- branca e preta moeda 3d costa.png', category: 'Alex' },
    { name: 'Alex', model: 'Black White Coin', color: 'Black', price: '25€', image: '/OlimpoWear/shirts/T-SHIRT-preta e branca moeda 3d verso.png', category: 'Alex' },
    { name: 'Alex', model: 'White Gold Coin', color: 'White', price: '25€', image: '/OlimpoWear/shirts/T-SHIRT-branca e dourada costa moeda 3d.png', category: 'Alex' },
    { name: 'Alex', model: 'Black Gold Coin', color: 'Black', price: '25€', image: '/OlimpoWear/shirts/T-SHIRT-basica moeda 3d.png', category: 'Alex' },
=======
    { id: 1, name: 'Basic', model: 'White Black Logo', color: 'White', price: '25€', image: '/OlimpoWear/shirts/T-SHIRT-branco e preta.png', category: 'Basic' },
    { id: 2, name: 'Basic', model: 'Black White Logo', color: 'Black', price: '25€', image: '/OlimpoWear/shirts/T-SHIRT_-basica preta e branca.png', category: 'Basic' },
    { id: 3, name: 'Basic', model: 'White Gold Logo', color: 'White', price: '25€', image: '/OlimpoWear/shirts/T-SHIRT- branco e dourado.png', category: 'Basic' },
    { id: 4, name: 'Basic', model: 'Black Gold Logo', color: 'Black', price: '25€', image: '/OlimpoWear/shirts/T-SHIRT-basica preta e dourada.png', category: 'Basic' },
    
    
    { id: 5, name: 'Alex', model: 'White Black Coin', color: 'White', price: '25€', image: '/OlimpoWear/shirts/T-SHIRT- branca e preta moeda 3d costa.png', category: 'Alex' },
    { id: 6, name: 'Alex', model: 'Black White Coin', color: 'Black', price: '25€', image: '/OlimpoWear/shirts/T-SHIRT-preta e branca moeda 3d verso.png', category: 'Alex' },
    { id: 7, name: 'Alex', model: 'White Gold Coin', color: 'White', price: '25€', image: '/OlimpoWear/shirts/T-SHIRT-branca e dourada costa moeda 3d.png', category: 'Alex' },
    { id: 8, name: 'Alex', model: 'Black Gold Coin', color: 'Black', price: '25€', image: '/OlimpoWear/shirts/T-SHIRT-basica moeda 3d.png', category: 'Alex' },
>>>>>>> 1954bc9d1f999c72da1d393caf97de67c6572fb1
];

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

<<<<<<< HEAD
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

            {/* PARTE 2: GALERIA DE 5 FOTOS DE LIFESTYLE (CARROSSEL HORIZONTAL) */}
            <div className="lifestyle-gallery-wrapper">
                <div className="photo-lifestyle-grid">
                    {lifestylePhotos.map((photo) => (
                        <div key={photo.id} className="photo-placeholder">
                            <img src={photo.imageSrc} alt={photo.alt} loading="lazy" />
                        </div>
                    ))}
                </div>
            </div>

            <div className="greek-pattern-border-wear"></div>
        </section>
    );
=======
                    <div className="product-grid">
                        {items.map((product, index) => (
                            <div className="product-card" key={index}>
                                <a href={`/wear/produto/${product.id}`} aria-label={`Ver produto ${product.name} ${product.model}`}>
                                    <div className="product-card-image-wrapper">
                                        <img src={product.image} alt={`${product.name} ${product.model}`} className="product-image" loading="lazy" />
                                    </div>
                                    <div className="product-card-info-container">
                                     <p className="product-card-name">{product.name}</p>
                                     <p className="product-card-info">{product.price}</p>
                                    </div>

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
                            <img src={photo.imageSrc} alt={photo.alt} loading="lazy" />
                            <div className="photo-overlay">
                                <span>ver mais</span>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
            

            <div className="greek-pattern-border-wear"></div>
        </section>
    );
>>>>>>> 1954bc9d1f999c72da1d393caf97de67c6572fb1
};

export default WearGallery;