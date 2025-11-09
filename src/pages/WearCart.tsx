// src/pages/WearCart.tsx

import type { FC } from 'react';
// IMPORTAR Header sem a subpasta, assumindo que é o ficheiro de exportação
import Header from '../components/common/Header'; 
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
    const navigate = useNavigate();

    const handleAdvanceToCheckout = () => {
        navigate('/wear/pagamento');
    };

return (
        // ⭐️ Usa Fragment, ou a tag mais externa para a página ⭐️
        <> 
            {/* 1. O HEADER que deve ser de largura total */}
            <Header />

            {/* 2. O Conteúdo principal do carrinho (que pode estar centralizado) */}
            <main className="wear-cart-page-layout">
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

                        {/* AÇÃO */}
                        <button 
                            className="advance-button"
                            onClick={handleAdvanceToCheckout}
                        >
                            Avançar
                        </button>
                    </div>
                </div>
            </main>
        </>
    );
};

export default WearCart;