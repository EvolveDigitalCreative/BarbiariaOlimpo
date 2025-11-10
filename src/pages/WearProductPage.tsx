import type { FC } from 'react';
import { useState } from 'react';
// Certifique-se de que os seus componentes comuns (Header, Footer, Divider)
// e o modal estão com o caminho de importação correto
import Header from '../components/common/Header';
import Footer from '../components/common/Footer';
import SectionDivider from '../components/common/SectionDivider'; 
import SizeGuideModal from '../components/sections/olimpo_wear/SizeGuideModal'; 

// Importar os estilos necessários
import '../styles/global/_global.css';
import '../styles/global/_header.css';
import '../styles/global/_footer.css';
import '../styles/global/SectionDivider.css'; 
// Estilo principal para a página e o modal
import '../styles/olimpowear/wear_product_page.css'; 

// Dados de Exemplo (Mock) - Ajustado para Detalhes em Lista
const mockProduct = {
    id: 'basic-white',
    name: 'Basic',
    color: 'Branco',
    price: 25.00,
    rating: 3, 
    details: [ 
        'Feita em 100% algodão premium de 240g, oferece estrutura firme, toque suave e respirabilidade ideal para máximo conforto.',
        'Com gola O e corte urbano, adapta-se a qualquer ocasião casual com um estilo moderno e descontraído.',
        'Estampa de alta definição e bordado preciso garantem personalidade e exclusividade sem perder o conforto.',
        'Com tecido resistente e respirável, mantém o aspeto original após várias lavagens, oferecendo conforto e durabilidade no dia a dia urbano.',
        'Cada t-shirt é pensada para durar — do fio à costura — unindo resistência, conforto e estilo autêntico numa só peça.'
    ],
    description: `Apresentamos as nossas t-shirts — um símbolo de conforto, autenticidade e estilo urbano. Desenvolvida para quem valoriza qualidade em cada detalhe, esta peça combina design moderno com materiais de alto desempenho, tornando-se indispensável no guarda-roupa do dia a dia.`,
    images: [
        '/OlimpoWear/product/basic/img1.jpg',
        '/OlimpoWear/product/basic/img2.jpg',
        '/OlimpoWear/product/basic/img3.jpg', 
        '/OlimpoWear/product/basic/img4.jpg', 
    ],
    relatedProducts: [
        { id: 'alex-black', name: 'Alex', image: '/OlimpoWear/related/alex-black.jpg' },
        { id: 'alex-white', name: 'Alex', image: '/OlimpoWear/related/alex-white.jpg' },
    ]
};

// Tamanhos disponíveis
const sizes = ['S', 'M', 'L', 'XL', 'XXL'];

const WearProductPage: FC = () => {
    const [selectedSize, setSelectedSize] = useState<string>('M');
    const [quantity, setQuantity] = useState<number>(2); 
    const [mainImage, setMainImage] = useState<string>(mockProduct.images[0]);
    
    // ✅ ESTADO PRINCIPAL: Controla a abertura/fecho do modal
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false); 

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
                        {mockProduct.images.map((img, index) => (
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
                        <img src={mainImage} alt={mockProduct.name} className="product-main-image" />
                        
                        {/* 1. BOTÃO QUE ABRE O MODAL (Sobreposto na imagem principal) */}
                        <button className="size-guide-button" onClick={() => setIsModalOpen(true)}>
                            GUIA DE TAMANHOS
                        </button>
                    </div>

                    {/* COLUNA DIREITA: OPÇÕES DE COMPRA */}
                    <div className="product-options">
                        <h1 className="product-name">{mockProduct.name}</h1>
                        {renderRating(mockProduct.rating)}
                        
                        {/* Cores */}
                        <div className="color-selector">
                            <p className="option-label">Escolhe a cor da T-shirt</p>
                            <div className="color-options">
                                <span className="color-dot white active"></span>
                                <span className="color-dot black"></span>
                                <span className="color-dot sand"></span>
                                <span className="color-dot brown"></span>
                            </div>
                        </div>

                        <p className="product-price">{mockProduct.price.toFixed(2)}€</p>
                        
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
                            {/* 2. BOTÃO SECUNDÁRIO QUE ABRE O MODAL (abaixo dos tamanhos) */}
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
                            <p className="description-paragraph">{mockProduct.description}</p>
                            
                            <ul className="details-list">
                                {mockProduct.details.map((detail, index) => (
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
                            {mockProduct.relatedProducts.map((product) => (
                                <div key={product.id} className="related-product-card">
                                    <img src={product.image} alt={product.name} className="related-image" />
                                </div>
                            ))}
                            <div className="related-product-card placeholder"></div>
                        </div>
                    </div>
                </section>
                
            </main>
            <Footer />
            
            {/* 3. RENDERIZAÇÃO CONDICIONAL: Mostra o modal se isModalOpen for TRUE */}
            {isModalOpen && <SizeGuideModal onClose={() => setIsModalOpen(false)} />}
        </div>
    );
};

export default WearProductPage;