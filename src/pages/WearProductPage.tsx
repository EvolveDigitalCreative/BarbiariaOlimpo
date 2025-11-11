import type { FC } from 'react';
import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
// Importações de Componentes Comuns
import Header from '../components/common/Header';
import Footer from '../components/common/Footer';
import SectionDivider from '../components/common/SectionDivider'; 
import SizeGuideModal from '../components/sections/olimpo_wear/SizeGuideModal'; 

// Importar os estilos necessários
import '../styles/global/_global.css';
import '../styles/global/_header.css';
import '../styles/global/_footer.css';
import '../styles/global/SectionDivider.css'; 
import '../styles/olimpowear/wear_product_page.css'; 
import '../styles/olimpowear/size_guide_modal.css'; 

// ==========================================================
// 1. DEFINIÇÃO DE TIPOS PARA TS
// ==========================================================
interface RelatedProduct {
    id: string; // O slug (Ex: 'basic-white-black-logo')
    name: string;
    image: string;
}

interface ProductData {
    name: string;
    model: string;
    color: string;
    price: number;
    rating: number; 
    image: string; 
    images: string[]; 
    details: string[]; 
    description: string; 
    relatedProducts: RelatedProduct[]; 
}

// ==========================================================
// 2. DADOS DE PRODUTOS (UNIDOS E COMPLETOS E CORRIGIDOS PARA SLUGS)
// ==========================================================
const defaultDescription = `Apresentamos as nossas t-shirts — um símbolo de conforto, autenticidade e estilo urbano. Desenvolvida para quem valoriza qualidade em cada detalhe, esta peça combina design moderno com materiais de alto desempenho, tornando-se indispensável no guarda-roupa do dia a dia.
Feita em 100% algodão premium de 240g, oferece estrutura firme, toque suave e respirabilidade ideal para máximo conforto.
Com gola O e corte urbano, adapta-se a qualquer ocasião casual com um estilo moderno e descontraído.
Estampa de alta definição e bordado preciso garantem personalidade e exclusividade sem perder o conforto.
Com tecido resistente e respirável, mantém o aspeto original após várias lavagens, oferecendo conforto e durabilidade no dia a dia urbano.
Cada t-shirt é pensada para durar — do fio à costura — unindo resistência, conforto e estilo autêntico numa só peça.`; 

// Produtos relacionados padrão (para usar como referências)
const basicRelatedProducts: RelatedProduct[] = [
    { id: 'alex-black-white-coin', name: 'Alex Black Coin', image: '/OlimpoWear/shirts/T-SHIRT-alex-preta e beanca 3 moedas nas costas.png' },
    { id: 'basic-white-black-logo', name: 'Basic White Logo', image: '/OlimpoWear/shirts/T-SHIRT-branco e preta.png' },
];

const alexRelatedProducts: RelatedProduct[] = [
    { id: 'basic-white-black-logo', name: 'Basic White Logo', image: '/OlimpoWear/shirts/T-SHIRT-branco e preta.png' },
    { id: 'mirror-black', name: 'Mirror Black', image: '/OlimpoWear/shirts/T-SHIRT-alex-preta e beanca 3 moedas nas costas.png' },
];

const allProducts: ProductData[] = [
    // =========================================================
    // GRUPO BASIC
    // =========================================================
    { 
        name: 'Basic', model: 'White Black Logo', color: 'Branco', price: 25.00, rating: 5, 
        image: '/OlimpoWear/shirts/T-SHIRT-branco e preta.png', 
        details: ["100% Algodão Premium", "Logótipo Preto"], 
        images: ['/OlimpoWear/shirts/T-SHIRT-branco e preta.png'],
        description: defaultDescription, relatedProducts: basicRelatedProducts
    },
    { 
        name: 'Basic', model: 'Black White Logo', color: 'Preto', price: 25.00, rating: 5, 
        image: '/OlimpoWear/shirts/T-SHIRT_-basica preta e branca.png', 
        details: ["100% Algodão Premium", "Logótipo Branco"],
        images: ['/OlimpoWear/shirts/T-SHIRT_-basica preta e branca.png'],
        description: defaultDescription, relatedProducts: basicRelatedProducts
    },
    { 
        name: 'Basic', model: 'White Gold Logo', color: 'Branco', price: 25.00, rating: 4, 
        image: '/OlimpoWear/shirts/T-SHIRT-branca e dourada costa moeda 3d.png', 
        details: ["100% Algodão Premium", "Moeda 3D Dourada nas Costas"],
        images: ['/OlimpoWear/shirts/T-SHIRT-branca e dourada costa moeda 3d.png'],
        description: defaultDescription, relatedProducts: basicRelatedProducts
    },
    { 
        name: 'Basic', model: 'Black Gold Logo', color: 'Preto', price: 25.00, rating: 4, 
        image: '/OlimpoWear/shirts/T-SHIRT-basica preta e dourada.png', 
        details: ["100% Algodão Premium", "Moeda 3D Dourada nas Costas"],
        images: ['/OlimpoWear/shirts/T-SHIRT-basica preta e dourada.png'],
        description: defaultDescription, relatedProducts: basicRelatedProducts
    },

    // =========================================================
    // GRUPO ALEX (Ajustado para os novos SLUGS esperados)
    // =========================================================
    { 
        name: 'Alex', model: 'Gold White', color: 'Branco', price: 25.00, rating: 5, 
        image: '/OlimpoWear/shirts/T-SHIRT-alex-branca e dourada.png', 
        details: ["Design Exclusivo 'Alex'", "Dourado", "100% Algodão Premium"],
        images: ['/OlimpoWear/shirts/T-SHIRT-alex-branca e dourada.png'],
        description: defaultDescription, relatedProducts: alexRelatedProducts
    },
    { 
        name: 'Alex', model: 'Gold Black', color: 'Preto', price: 25.00, rating: 5, 
        image: '/OlimpoWear/shirts/T-SHIRT-alex-preta e dourada.png', 
        details: ["Design Exclusivo 'Alex'", "Dourado", "100% Algodão Premium"],
        images: ['/OlimpoWear/shirts/T-SHIRT-alex-preta e dourada.png'],
        description: defaultDescription, relatedProducts: alexRelatedProducts
    },
    { 
        name: 'Alex', model: 'Black', color: 'Preto', price: 25.00, rating: 4, 
        image: '/OlimpoWear/shirts/T-SHIRT-alex-branco e preta.png', 
        details: ["Design Exclusivo 'Alex'", "Preto"],
        images: ['/OlimpoWear/shirts/T-SHIRT-alex-branco e preta.png'],
        description: defaultDescription, relatedProducts: alexRelatedProducts
    },
    { 
        name: 'Alex', model: 'White', color: 'Branco', price: 25.00, rating: 4, 
        image: '/OlimpoWear/shirts/T-SHIRT-alex-branca e pretas.png', 
        details: ["Design Exclusivo 'Alex'", "Branco"],
        images: ['/OlimpoWear/shirts/T-SHIRT-alex-branca e pretas.png'],
        description: defaultDescription, relatedProducts: alexRelatedProducts
    },
    { 
        name: 'Alex', model: 'Black Gold Coin', color: 'Preto', price: 25.00, rating: 5, 
        image: '/OlimpoWear/shirts/T-SHIRT-alex-costa preta e dourada.png', 
        details: ["Design Exclusivo 'Alex'", "Moeda Dourada nas Costas"],
        images: ['/OlimpoWear/shirts/T-SHIRT-alex-costa preta e dourada.png'],
        description: defaultDescription, relatedProducts: alexRelatedProducts
    },
    { 
        name: 'Alex', model: 'White Black Coin', color: 'Branco', price: 25.00, rating: 5, 
        image: '/OlimpoWear/shirts/T-SHIRT-alex-preta e beanca 3 moedas nas costas.png', 
        details: ["Design Exclusivo 'Alex'", "Moedas Pretas nas Costas"],
        images: ['/OlimpoWear/shirts/T-SHIRT-alex-preta e beanca 3 moedas nas costas.png'],
        description: defaultDescription, relatedProducts: alexRelatedProducts
    },

    // =========================================================
    // GRUPO MIRROR (Ajustado para os novos SLUGS esperados)
    // =========================================================
    { 
        name: 'Mirror', model: 'Black', color: 'Preto', price: 28.00, rating: 4, 
        image: '/OlimpoWear/shirts/T-SHIRT-mirror-preta.png', 
        details: ["Efeito Refletor", "Design Minimalista"],
        images: ['/OlimpoWear/shirts/T-SHIRT-mirror-preta.png'],
        description: defaultDescription, relatedProducts: alexRelatedProducts
    },
    { 
        name: 'Mirror', model: 'White', color: 'Branco', price: 28.00, rating: 4, 
        image: '/OlimpoWear/shirts/T-SHIRT-mirror-branca.png', 
        details: ["Efeito Refletor", "Design Minimalista"],
        images: ['/OlimpoWear/shirts/T-SHIRT-mirror-branca.png'],
        description: defaultDescription, relatedProducts: alexRelatedProducts
    },
];

// Função que encontra um produto pelo SLUG do URL (Ex: "basic-white-black-logo")
const findProductBySlug = (slug: string): ProductData | undefined => {
    return allProducts.find(product => {
        const productId = `${product.name}-${product.model}`
            .replace(/\s+/g, '-')
            .replace(/[^\w-]/g, '')
            .toLowerCase();
        return productId === slug;
    });
};

// Tamanhos disponíveis
const sizes = ['S', 'M', 'L', 'XL', 'XXL'];


const WearProductPage: FC = () => {
    // Busca o produto (Não é um estado)
    const { productId } = useParams<{ productId: string }>(); 
    const product = findProductBySlug(productId || '');
    
    // Estados
    const [selectedSize, setSelectedSize] = useState<string>('M');
    const [quantity, setQuantity] = useState<number>(1); 
    const [mainImage, setMainImage] = useState<string>('');
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false); 

    // Efeito para carregar a imagem principal (CORREÇÃO TS18047)
    useEffect(() => {
        if (product && product.images && product.images.length > 0) {
            setMainImage(product.images[0]);
        }
    }, [product]);

    // Tratamento de Produto Não Encontrado (404)
    if (!product) {
        return (
            <div className="product-page-container">
                <Header />
                <main className="product-main-content not-found-content">
                    <h2 className='not-found-title'>404 - Produto Não Encontrado</h2>
                    <p>Não foi possível encontrar a T-shirt com o ID: <strong>{productId}</strong>.</p>
                    <Link to="/wear" className="back-link">Voltar para a Coleção Wear</Link>
                </main>
                <Footer />
            </div>
        );
    }
    
    // Função para renderizar as estrelas de avaliação
    const renderRating = (rating: number) => {
        const fullStars = Math.floor(rating);
        const emptyStars = 5 - fullStars;
        const stars = [];

        for (let i = 0; i < fullStars; i++) {
            stars.push(<span key={`full-${i}`} className="star filled">★</span>);
        }
        for (let i = 0; i < emptyStars; i++) {
            stars.push(<span key={`empty-${i}`} className="star empty">★</span>);
        }
        return <div className="product-rating">{stars}</div>;
    };


    return (
        <div className="product-page-container">
            <Header /> 
            
            <main className="product-main-content">
                
                <section className="product-detail-top-section">
                    
                    {/* COLUNA ESQUERDA: MINIATURAS */}
                    <div className="product-thumbnails">
                        {product.images.map((img, index) => (
                            <img
                                key={index}
                                src={img}
                                alt={`Thumbnail ${index + 1}`}
                                className={`thumbnail-image ${img === mainImage ? 'active' : ''}`}
                                onClick={() => setMainImage(img)}
                            />
                        ))}
                    </div>

                    {/* COLUNA CENTRAL: IMAGEM PRINCIPAL */}
                    <div className="product-main-image-wrapper">
                        {mainImage && <img src={mainImage} alt={`${product.name} ${product.model}`} className="product-main-image" />}
                        
                        <button className="size-guide-button" onClick={() => setIsModalOpen(true)}>
                            GUIA DE TAMANHOS
                        </button>
                    </div>

                    {/* COLUNA DIREITA: OPÇÕES DE COMPRA */}
                    <div className="product-options">
                        <h1 className="product-name">{product.name}</h1>
                        <h2 className="product-model">{product.model}</h2>
                        {renderRating(product.rating)}
                        
                        {/* Cores */}
                        <div className="color-selector">
                            <p className="option-label">Cor Selecionada: <strong>{product.color}</strong></p>
                            <div className="color-options">
                                <span 
                                    className="color-dot active" 
                                    style={{
                                        backgroundColor: product.color.toLowerCase() === 'preto' ? '#000' : product.color.toLowerCase() === 'branco' ? '#fff' : 'gray', 
                                        borderColor: product.color.toLowerCase() === 'branco' ? '#000' : 'transparent',
                                        borderWidth: product.color.toLowerCase() === 'branco' ? '1px' : '0'
                                    }}
                                ></span>
                                {/* LÓGICA DE CORES MAIS COMPLEXA SERÁ IMPLEMENTADA NO PRÓXIMO PASSO */}
                            </div>
                        </div>

                        <p className="product-price">{product.price.toFixed(2)}€</p>
                        
                        <div className="size-selector">
                            <p className="option-label">Escolhe o tamanho</p>
                            <div className="size-buttons">
                                {sizes.map((size) => (
                                    <button
                                        key={size}
                                        className={`size-button ${selectedSize === size ? 'active' : ''}`}
                                        onClick={() => setSelectedSize(size)}
                                    >
                                        {size}
                                    </button>
                                ))}
                            </div>
                            <button className="small-size-guide-link" onClick={() => setIsModalOpen(true)}>
                                Guia de tamanhos
                            </button>
                        </div>

                        <div className="quantity-selector">
                            <p className="option-label">Seleciona a Quantidade</p>
                            <div className="quantity-controls">
                                <button onClick={() => setQuantity(Math.max(1, quantity - 1))}>-</button>
                                <span>{quantity}</span>
                                <button onClick={() => setQuantity(quantity + 1)}>+</button>
                            </div>
                        </div>

                        <div className="action-buttons">
                            <button className="add-to-cart-button">ADICIONA AO CARRINHO</button>
                            <button className="favorite-button">FAVORITOS</button>
                        </div>
                    </div>
                </section>

                <SectionDivider /> 

                {/* DETALHES E RELACIONADOS */}
                <section className="product-details-bottom-section">
                    
                    <div className="details-text-column">
                        <h2 className="details-title">Detalhes</h2>
                        <div className="details-content">
                            <p className="description-paragraph">{product.description}</p>
                            
                            <ul className="details-list">
                                {product.details.map((detail, index) => (
                                    <li key={index}>{detail}</li>
                                ))}
                            </ul>
                        </div>
                    </div>
                    
                    <div className="related-articles-column">
                        <div className="related-text-wrapper">
                            <h2 className="related-title">Artigos Relacionados</h2>
                            <p className="related-subtitle">
                                Alguns outros modelos da coleção <br/> OLIMPO que poderás gostar
                            </p>
                        </div>
                        <div className="related-products-grid">
                            {product.relatedProducts.map((related) => (
                                <Link to={`/wear/produto/${related.id}`} key={related.id} className="related-product-card">
                                    <img src={related.image} alt={related.name} className="related-image" />
                                </Link>
                            ))}
                            <div className="related-product-card placeholder"></div>
                        </div>
                    </div>
                </section>
                
            </main>
            <Footer />
            
            {/* MODAL (Renderização Condicional) */}
            {isModalOpen && <SizeGuideModal onClose={() => setIsModalOpen(false)} />}
        </div>
    );
};

export default WearProductPage;