// src/pages/WearCart.tsx

import type { FC } from 'react'; 
import { useCart } from '../context/CartContext'; 
import type { CartItem } from '../context/CartContext'; 

// Importações que serão usadas no JSX
import Header from '../components/common/Header';
import Footer from '../components/common/Footer';
import SectionDivider from '../components/common/SectionDivider';
import { Link } from 'react-router-dom';

// Importações de estilos (ajuste conforme a sua estrutura)
// import '../styles/global/_global.css'; 
// import '../styles/olimpowear/wear_cart.css'; 
import '../styles/olimpowear/wear_cart_checkout.css';
import '../styles/global/_global.css'; 


const WearCart: FC = () => {
    // 🛑 CORREÇÃO PRINCIPAL: CHAME O HOOK useCart() AQUI!
    // Isso injeta o estado 'cart' e as funções 'removeFromCart', etc., no escopo do componente.
    const { 
        cart, 
        removeFromCart, 
        updateQuantity, 
        calculateSubtotal 
    } = useCart();
    
    // O 'cart' está agora definido e o erro 2304 desaparece.

    const subtotal = calculateSubtotal();

    const handleQuantityChange = (itemId: number, newQuantity: number) => {
        updateQuantity(itemId, newQuantity);
    };

    return (
        <div className="cart-page-container">
            {/* O uso destes componentes resolve os avisos 6133 */}
            <Header /> 
            
            <main className="cart-main-content">
                <h1 className="cart-title">O teu Carrinho</h1>
                
                {cart.length === 0 ? (
                    <div className="cart-empty-state">
                        <p>O teu carrinho está vazio. Vamos às compras!</p>
                        <Link to="/wear/catalogo" className="continue-shopping-button">
                            Ver Coleção
                        </Link>
                    </div>
                ) : (
                    <div className="cart-content-wrapper">
                        
                        {/* 1. LISTA DE ITENS */}
                        <div className="cart-items-list">
                            {cart.map((item: CartItem) => ( 
                                <div key={item.id} className="cart-item-card">
                                    <img src={item.image} alt={item.name} className="item-image" />
                                    
                                    <div className="item-details">
                                        <p className="item-name">{item.name} {item.model}</p>
                                        <p className="item-info">Cor: {item.color} | Tamanho: {item.size}</p>
                                        <p className="item-price-unit">{item.price.toFixed(2)}€ / un.</p>
                                    </div>
                                    
                                    <div className="item-quantity-controls">
                                        <button 
                                            onClick={() => handleQuantityChange(item.id, item.quantity - 1)}
                                            disabled={item.quantity <= 1}
                                        >
                                            -
                                        </button>
                                        <span>{item.quantity}</span>
                                        <button 
                                            onClick={() => handleQuantityChange(item.id, item.quantity + 1)}
                                        >
                                            +
                                        </button>
                                    </div>
                                    
                                    <p className="item-subtotal">{(item.price * item.quantity).toFixed(2)}€</p>

                                    <button 
                                        className="remove-item-button"
                                        onClick={() => removeFromCart(item.id)}
                                    >
                                        &times;
                                    </button>
                                </div>
                            ))}
                        </div>

                        {/* 2. SUMÁRIO E BOTÃO DE CHECKOUT */}
                        <div className="cart-summary">
                            <h2>Resumo da Encomenda</h2>
                            <div className="summary-line">
                                <span>Subtotal:</span>
                                <span>{subtotal.toFixed(2)}€</span>
                            </div>
                            <div className="summary-line">
                                <span>Portes:</span>
                                <span>A calcular</span>
                            </div>
                            <div className="summary-total">
                                <h3>Total:</h3>
                                <h3>{subtotal.toFixed(2)}€</h3> 
                            </div>
                            <Link to="/wear/pagamento" className="checkout-button">
                                PROSSEGUIR PARA PAGAMENTO
                            </Link>
                        </div>
                    </div>
                )}
            </main>
            <SectionDivider /> {/* O uso disto remove o aviso 6133 */}
            <Footer /> {/* O uso disto remove o aviso 6133 */}
        </div>
    );
};

export default WearCart;