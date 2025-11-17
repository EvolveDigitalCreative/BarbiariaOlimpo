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
    id: string; 
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
// 2. DADOS DE PRODUTOS (EXEMPLO)
// ==========================================================
const defaultDescription = `Apresentamos as nossas t-shirts — um símbolo de conforto, autenticidade e estilo urbano.Desenvolvida para quem valoriza qualidade em cada detalhe, esta peça combina design moderno com materiais de alto desempenho, tornando-se indispensável no guarda-roupa do dia a dia.`; 

// NOVO: Detalhes completos conforme a imagem enviada
const defaultDetails: string[] = [
    "Feita em 100% algodão premium de 240g, oferece estrutura firme, toque suave e respirabilidade ideal para máximo conforto",
    "Com gola O e corte urbano, adapta-se a qualquer ocasião casual com um estilo moderno e descontraído",
    "Estampa de alta definição e bordado preciso garantem personalidade e exclusividade sem perder o conforto",
    "Com tecido resistente e respirável, mantém o aspeto original após várias lavagens, oferecendo conforto e durabilidade no dia a dia urbano",
    "Cada t-shirt é pensada para durar — do fio à costura — unindo resistência, conforto e estilo autêntico numa só peça",
];


const basicRelatedProducts: RelatedProduct[] = [
    { id: 'alex-black-white-coin', name: 'Alex Black Coin', image: '/OlimpoWear/shirts/T-SHIRT-alex-preta e beanca 3 moedas nas costas.png' },
    { id: 'basic-white-black-logo', name: 'Basic White Logo', image: '/OlimpoWear/shirts/T-SHIRT-branco e preta.png' },
    { id: 'mirror-black', name: 'Mirror Black', image: '/OlimpoWear/shirts/T-SHIRT-alex-costa preta e dourada-COSTAS.png' },
];

const allProducts: ProductData[] = [
    { 
        name: 'Basic', model: 'White Black Logo', color: 'Branco', price: 25.00, rating: 5, 
        image: '/OlimpoWear/shirts/T-SHIRT-branco e preta.png', 
        details: defaultDetails, 
        images: ['/OlimpoWear/shirts/T-SHIRT-branco e preta.png', '/OlimpoWear/shirts/T-SHIRT-branco e preta-COSTAS.png'], // Adicionei uma segunda imagem para miniaturas
        description: defaultDescription, relatedProducts: basicRelatedProducts
    },
    { 
        name: 'Basic', model: 'Black White Logo', color: 'Preto', price: 25.00, rating: 5, 
        image: '/OlimpoWear/shirts/T-SHIRT_-basica preta e branca.png', 
        details: defaultDetails, 
        images: ['/OlimpoWear/shirts/T-SHIRT_-basica preta e branca.png'],
        description: defaultDescription, relatedProducts: basicRelatedProducts
    },
];

const findProductBySlug = (slug: string): ProductData | undefined => {
    return allProducts.find(product => {
        const productId = `${product.name}-${product.model}`
            .replace(/\s+/g, '-')
            .replace(/[^\w-]/g, '')
            .toLowerCase();
        return productId === slug;
    });
};

const sizes = ['S', 'M', 'L', 'XL', 'XXL'];

// ==========================================================
// 3. COMPONENTE PRINCIPAL
// ==========================================================
const WearProductPage: FC = () => {
    const { productId } = useParams<{ productId: string }>(); 
    const product = findProductBySlug(productId || 'basic-white-black-logo'); 
    
    const [selectedSize, setSelectedSize] = useState<string>('M');
    const [quantity, setQuantity] = useState<number>(1); 
    const [mainImage, setMainImage] = useState<string>('');
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false); 

    useEffect(() => {
        if (product && product.images && product.images.length > 0) {
            setMainImage(product.images[0]);
        }
    }, [product]);

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
            
            {/* PADRÃO GREGO NO TOPO DA PÁGINA */}
            <div className="meander-top-border"></div>

            <main className="product-main-content">
                
                {/* 1. SEÇÃO DE IMAGENS E OPÇÕES (TOPO) */}
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
                                loading="lazy" // <-- LAZY LOADING NAS MINIATURAS
                            />
                        ))}
                    </div>

                    {/* COLUNA CENTRAL: IMAGEM PRINCIPAL */}
                    <div className="product-main-image-wrapper">
                        {mainImage && <img src={mainImage} alt={`${product.name} ${product.model}`} className="product-main-image" loading="lazy" />} {/* <-- LAZY LOADING NA PRINCIPAL */}
                        
                        {/* Removemos o botão de Guia de Tamanhos daqui, pois está na coluna de opções */}
                    </div>

                    {/* COLUNA DIREITA: OPÇÕES DE COMPRA + DETALHES (NOVAS POSIÇÕES) */}
                    <div className="product-options-and-details">
                        {/* OPÇÕES DE COMPRA */}
                        <div className="product-options">
                            <h1 className="product-name">{product.name}</h1>
                            <h2 className="product-model">{product.model}</h2>
                            {renderRating(product.rating)}
                            
                            <div className="color-selector">
                                <p className="option-label">Escolhe uma cor</p> 
                                <div className="color-options">
                                    <span 
                                        className="color-dot active" 
                                        style={{
                                            backgroundColor: product.color.toLowerCase() === 'preto' ? '#000' : product.color.toLowerCase() === 'branco' ? '#fff' : 'gray', 
                                            borderColor: product.color.toLowerCase() === 'branco' ? '#000' : 'transparent',
                                            borderWidth: product.color.toLowerCase() === 'branco' ? '1px' : '0'
                                        }}
                                    ></span>
                                    {/* Adicionar outro ponto de cor (Exemplo) */}
                                    <span 
                                        className="color-dot" 
                                        style={{
                                            backgroundColor: product.color.toLowerCase() !== 'preto' ? '#000' : '#fff', 
                                            borderColor: product.color.toLowerCase() !== 'preto' ? '#000' : 'transparent',
                                            borderWidth: product.color.toLowerCase() !== 'preto' ? '1px' : '0'
                                        }}
                                    ></span>
                                </div>
                            </div>
                            
                            <p className="size-guide-link" onClick={() => setIsModalOpen(true)}>
                                Guia de tamanhos
                            </p>

                            <div className="size-selector">
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
                            </div>
                            
                            <p className="product-price">{product.price.toFixed(2)}€</p>

                            <div className="quantity-selector">
                                <div className="quantity-controls">
                                    <button onClick={() => setQuantity(Math.max(1, quantity - 1))}>-</button>
                                    <span>{quantity}</span>
                                    <button onClick={() => setQuantity(quantity + 1)}>+</button>
                                </div>
                            </div>

                            <div className="action-buttons">
                                <button className="add-to-cart-button">Adiciona ao Carrinho</button>
                                <button className="favorite-button">Favoritos</button>
                            </div>
                        </div>

                        {/* BLOCO DE DETALHES (AGORA AQUI) */}
                        <div className="details-wrapper">
                            <h2 className="details-title-simple">Detalhes</h2>
                            <p className="description-paragraph">{product.description}</p>
                            <ul className="details-list-simple">
                                {product.details.map((detail, index) => (
                                    <li key={index}>{detail}</li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </section>

                <SectionDivider /> {/* Divisor Meândrico Dourado */}

                {/* 2. SEÇÃO INFERIOR: ARTIGOS RELACIONADOS */}
                <section className="related-products-section">
                    
                    {/* BLOCO 2: ARTIGOS RELACIONADOS (FUNDO) - RETÂNGULO PRETO HORIZONTAL */}
                    <div className="related-full-width-wrapper">
                        <div className="related-articles-column">
                            <div className="related-text-image-container">
                                {/* Coluna 1/3: Texto de Artigos Relacionados */}
                                <div className="related-text-column">
                                    <h2 className="related-title">Artigos <br/> Relacionados</h2>
                                    <p className="related-subtitle">
                                        Alguns outros modelos da coleção <br/> OLIMPO que poderás gostar
                                    </p>
                                </div>

                                {/* Coluna 2/3: Grid de Imagens Relacionadas */}
                                <div className="related-products-grid">
                                    {product.relatedProducts.map((related) => (
                                        <Link to={`/wear/produto/${related.id}`} key={related.id} className="related-product-card">
                                            <img src={related.image} alt={related.name} className="related-image" loading="lazy" /> {/* <-- LAZY LOADING NAS RELACIONADAS */}
                                        </Link>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
                
            </main>
            <Footer />
            
            {/* MODAL */}
            {isModalOpen && <SizeGuideModal onClose={() => setIsModalOpen(false)} />}
        </div>
    );
};

export default WearProductPage;