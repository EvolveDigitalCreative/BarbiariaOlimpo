import type { FC } from 'react';
import { Link } from 'react-router-dom';

// Definição da interface baseada nos seus dados internos (name, model, price, image)
interface ProductData {
    name: string;
    model: string;
    color: string;
    price: string;
    image: string;
    category: string;
}

interface WearProductCardProps {
    product: ProductData;
    className?: string; 
}

/**
 * Componente de cartão reutilizável que lida com a navegação.
 * Faz a ligação entre a listagem de produtos e a página de detalhes.
 */
const WearProductCard: FC<WearProductCardProps> = ({ product, className = '' }) => {
    
    // 1. Cria um identificador único a partir do nome e modelo
    // Ex: Basic-White Black Logo  => Basic-White-Black-Logo
    // O React Router (que faz a navegação) vai usar este ID.
    const productId = `${product.name}-${product.model}`
        .replace(/\s+/g, '-') // Substitui espaços por traços
        .replace(/[^\w-]/g, '') // Remove caracteres não-alfanuméricos (para URL limpo)
        .toLowerCase();

    // 2. Define o caminho para a página de detalhes do produto
    const productPath = `/wear/produto/${productId}`;

    return (
        // ✅ A CHAVE É USAR O <Link> do React Router DOM
        <Link to={productPath} className={`wear-product-card ${className}`}>
            
            <div className="product-card-image-wrapper">
                <img 
                    src={product.image} 
                    alt={`${product.name} ${product.model}`} 
                    className="product-image" 
                    loading="lazy"
                />
            </div>
            
            <div className="product-card-info-container">
                <p className="product-card-name">{product.name}</p>
                <p className="product-card-info">{product.price}</p>
            </div>
        </Link>
    );
};

export default WearProductCard;