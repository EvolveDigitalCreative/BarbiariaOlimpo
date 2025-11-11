
import type { FC } from 'react';
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Header from '../components/common/Header';
import Footer from '../components/common/Footer';
import SectionDivider from '../components/common/SectionDivider';
import SizeGuideModal from '../components/sections/olimpo_wear/SizeGuideModal';
import { allProducts } from '../data/wearProducts'; // Import the product data

import '../styles/global/_global.css';
import '../styles/global/_header.css';
import '../styles/global/_footer.css';
import '../styles/global/SectionDivider.css';
import '../styles/olimpowear/wear_product_page.css';

const sizes = ['S', 'M', 'L', 'XL', 'XXL'];

const WearProductPage: FC = () => {
    const { productId } = useParams<{ productId: string }>();
    const [product, setProduct] = useState<any>(null);
    const [selectedSize, setSelectedSize] = useState<string>('M');
    const [quantity, setQuantity] = useState<number>(1);
    const [mainImage, setMainImage] = useState<string>('');
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

    useEffect(() => {
        if (productId) {
            const foundProduct = allProducts.find(p => p.id.toString() === productId);
            if (foundProduct) {
                setProduct(foundProduct);
                setMainImage(foundProduct.image);
            }
        }
    }, [productId]);

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

    if (!product) {
        return (
            <div className="product-page-container">
                <Header />
                <main className="product-main-content">
                    <h1>Produto não encontrado</h1>
                </main>
                <Footer />
            </div>
        );
    }

    return (
        <div className="product-page-container">
            <Header />
            <main className="product-main-content">
                <section className="product-detail-top-section">
                    <div className="product-thumbnails">
                        {/* Assuming single image for now, can be expanded */}
                        <img
                            src={product.image}
                            alt={`Thumbnail 1`}
                            className={`thumbnail-image active`}
                            onClick={() => setMainImage(product.image)}
                        />
                    </div>
                    <div className="product-main-image-wrapper">
                        <img src={mainImage} alt={product.name} className="product-main-image" />
                        <button className="size-guide-button" onClick={() => setIsModalOpen(true)}>
                            GUIA DE TAMANHOS
                        </button>
                    </div>
                    <div className="product-options">
                        <h1 className="product-name">{product.name}</h1>
                        {/* Hardcoded rating for now */}
                        {renderRating(4)}
                        <div className="color-selector">
                            <p className="option-label">Cor: {product.color}</p>
                        </div>
                        <p className="product-price">{product.price}</p>
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
                <section className="product-details-bottom-section">
                    <div className="details-text-column">
                        <h2 className="details-title">Detalhes</h2>
                        <div className="details-content">
                            <p className="description-paragraph">
                                Detalhes do produto {product.name} - {product.model}.
                            </p>
                        </div>
                    </div>
                </section>
            </main>
            <Footer />
            {isModalOpen && <SizeGuideModal onClose={() => setIsModalOpen(false)} />}
        </div>
    );
};

export default WearProductPage;
