// src/pages/WearCart.tsx

import type { FC } from 'react';

// 1. IMPORTAR O useNavigate
import { useNavigate } from 'react-router-dom';

// --- DADOS DUMMY DO CARRINHO ---
const cartItems = [
    {
        id: 1,
        name: "Basic",
        color: "branco & gold",
        size: "M",
        quantity: 2,
        price: 25.00,
        image: "/OlimpoWear/modelos/modelo-basic-white-gold.jpg" 
    },
    {
        id: 2,
        name: "Alex",
        color: "preto & gold",
        size: "M",
        quantity: 1,
        price: 25.00,
        image: "/OlimpoWear/modelos/modelo-alex-black-gold.jpg"
    }
];

// Funções utilitárias (para demonstração)
const calculateSubtotal = () => cartItems.reduce((acc, item) => acc + (item.price * item.quantity), 0);
const totalAmount = calculateSubtotal(); 

const WearCart: FC = () => {
    // 2. INICIALIZAR O useNavigate
    const navigate = useNavigate();

    // Função que será chamada ao clicar no botão
    const handleAdvanceToCheckout = () => {
        // O caminho é o que definimos no main.tsx: "/wear/pagamento"
        navigate('/wear/pagamento');
    };

    return (
        <div className="wear-cart-page-layout">
            <h1 className="main-title">O TEU CARRINHO DE COMPRAS</h1>
            
            <div className="cart-content-container">
                
                {/* COLUNA ESQUERDA: ITENS DO CARRINHO */}
                <div className="cart-items-column">
                    {cartItems.map(item => (
                        <div key={item.id} className="cart-item-card">
                            <img 
                                src={item.image} 
                                alt={item.name} 
                                className="item-image"
                            />
                            <div className="item-details">
                                <h3 className="item-name">{item.name}</h3>
                                <p className="item-info">Cor: {item.color}</p>
                                <p className="item-info">Tamanho: {item.size}</p>
                                <p className="item-info">Quantidade: {item.quantity}</p>
                                <p className="item-price">{item.price.toFixed(2)}€</p>
                                <button className="remove-button">Remover</button>
                            </div>
                        </div>
                    ))}
                    
                    <div className="cart-summary-mobile">
                        <p>Subtotal: <span>{calculateSubtotal().toFixed(2)}€</span></p>
                    </div>

                </div>

                {/* COLUNA DIREITA: RESUMO E OLIMPO COIN */}
                <div className="cart-summary-column">
                    <h2 className="summary-title">Resumo do pagamento</h2>
                    
                    <div className="olimpo-coin-box">
                        <p className="coin-label">Ativar Olimpo Coin</p>
                        <div className="coin-toggle">
                            <span className="toggle-switch"></span>
                            <img src="/OlimpoBarBer/icons/olimpo-coin.png" alt="Olimpo Coin" className="coin-icon" />
                        </div>
                        <p className="coin-warning">Não tem Olimpo Coins suficientes</p>
                    </div>

                    <div className="summary-details">
                        <div className="detail-row"><span>Desconto</span><span>0.00€</span></div>
                        <div className="detail-row"><span>Subtotal</span><span>{calculateSubtotal().toFixed(2)}€</span></div>
                        <hr />
                        <div className="detail-row total-row"><span>TOTAL</span><span>{totalAmount.toFixed(2)}€</span></div>
                        <p className="vat-note">(IVA incluído)</p>
                    </div>

                    <div className="footer-links">
                        <a href="/wear/devolucoes">Devoluções simples</a>
                        <a href="/wear/ajuda">Precisa de ajuda?</a>
                    </div>
                    
                    <label className="terms-checkbox">
                        <input type="checkbox" defaultChecked />
                        Aceito os <a href="/wear/termos">termos e condições gerais</a> de venda da Olimpo e declaro ter mais de 12 anos.
                    </label>

                    {/* 3. APLICAÇÃO DO onClick COM A NAVEGAÇÃO */}
                    <button 
                        className="advance-button"
                        onClick={handleAdvanceToCheckout} // Chama a função que navega
                    >
                        Avançar
                    </button>
                </div>
            </div>
        </div>
    );
};

export default WearCart;