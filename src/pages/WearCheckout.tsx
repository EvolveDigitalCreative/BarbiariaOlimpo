// src/pages/WearCheckout.tsx

import type { FC } from 'react';

import '../styles/olimpowear/wear_cart_checkout.css';
// --- DADOS DUMMY DO PAGAMENTO ---
const checkoutItems = [
    { name: "Basic", size: "M", quantity: 2, price: 25.00 },
    { name: "Alex", size: "M", quantity: 1, price: 25.00 }
];

const calculateSubtotalCheckout = () => checkoutItems.reduce((acc, item) => acc + (item.price * item.quantity), 0);
const totalAmountCheckout = calculateSubtotalCheckout(); 

const WearCheckout: FC = () => {
    return (
        <div className="wear-checkout-page-layout">
            
            {/* COLUNA ESQUERDA: FORMULÁRIO DE CHECKOUT */}
            <div className="checkout-form-column">
                <h1 className="form-title">Finalização da compra expressa</h1>
                
                {/* Pagamento Rápido */}
                <div className="express-payment-methods">
                    {/* Aqui seriam logos dos métodos de pagamento */}
                    <button className="payment-btn paypal-btn">PayPal</button>
                    <button className="payment-btn apple-pay-btn">Apple Pay</button>
                    <button className="payment-btn gpay-btn">G Pay</button>
                </div>
                <p className="divider">OU</p>

                {/* 1. Contato */}
                <h2 className="section-header">Informação de Contacto</h2>
                <input type="email" placeholder="E-mail" className="full-width-input" />
                <label className="newsletter-checkbox">
                    <input type="checkbox" />
                    Receber um e-mail com notícias e ofertas.
                </label>

                {/* 2. Entrega */}
                <h2 className="section-header">Entrega</h2>
                <div className="input-row">
                    <input type="text" placeholder="Nome próprio" />
                    <input type="text" placeholder="Sobrenome" />
                </div>
                <input type="text" placeholder="Endereço" className="full-width-input" />
                <input type="text" placeholder="Andar, fração, etc. (opcional)" className="full-width-input" />
                
                {/* Linha: Código Postal, Cidade, País */}
                <div className="input-row three-cols">
                    <input type="text" placeholder="Código postal" />
                    <input type="text" placeholder="Cidade" />
                    <select className="full-width-input" defaultValue="Portugal">
                        <option>Portugal</option>
                        <option>Espanha</option>
                        {/* ... outros países */}
                    </select>
                </div>
                
                <input type="tel" placeholder="Telefone" className="full-width-input" />
                
                {/* 3. Pagamento */}
                <h2 className="section-header">Pagamento</h2>
                <p className="payment-note">Todas as transações são seguras e encriptadas.</p>
                
                {/* Opções de Pagamento: Cartão e Outros */}
                <div className="payment-options-group">
                    
                    {/* Opção 1: Cartão de Crédito (Principal) */}
                    <div className="payment-option credit-card-option">
                        <div className="option-header">
                            <label><input type="radio" name="payment-method" defaultChecked /> Cartão de Crédito</label>
                            {/* Placeholder para ícones VISA/Mastercard */}
                        </div>
                        <div className="card-input-area">
                            <input type="text" placeholder="Número do cartão" className="full-width-input" />
                            <div className="input-row">
                                <input type="text" placeholder="Nome no cartão" />
                                <input type="text" placeholder="Código de segurança" />
                            </div>
                            <div className="input-row">
                                <input type="text" placeholder="Mês / Ano (MM/AA)" />
                                <input type="text" placeholder="Data de nascimento" />
                            </div>
                        </div>
                    </div>

                    {/* Opção 2: PayPal */}
                    <div className="payment-option">
                        <label><input type="radio" name="payment-method" /> PayPal</label>
                    </div>

                    {/* Opção 3: Outros Métodos (Klarna, etc.) */}
                    <div className="payment-option">
                        <label><input type="radio" name="payment-method" /> Klarna - 3 pagamentos sem juros</label>
                    </div>
                </div>

                <label className="billing-address-checkbox">
                    <input type="checkbox" defaultChecked /> Utilizar o endereço de envio como endereço de faturação.
                </label>

                <p className="legal-note">
                    Li e aceito os <a href="/termos">termos and conditions</a>, <a href="/privacy">privacy policy</a> and <a href="/refund">refund policy</a>.
                </p>

                <button className="submit-payment-button">Efetuar pagamento</button>
            </div>

            {/* COLUNA DIREITA: RESUMO DO PEDIDO */}
            <div className="checkout-summary-column">
                <div className="order-summary-box">
                    {/* Itens do Pedido */}
                    {checkoutItems.map((item, index) => (
                        <div key={index} className="summary-item-row">
                            <div className="item-details">
                                {/* Substitua por caminho de imagem correto */}
                                <img src="/OlimpoWear/shirts/t-shirt-preview.png" alt={item.name} className="item-thumb" />
                                <div>
                                    <p className="item-name">{item.name} <span className="item-size">({item.size})</span></p>
                                    <p className="item-qty">Quantidade: {item.quantity}</p>
                                </div>
                            </div>
                            <span className="item-price">{(item.price * item.quantity).toFixed(2)}€</span>
                        </div>
                    ))}
                    
                    <div className="discount-input-area">
                        <input type="text" placeholder="Código de desconto ou cartão de oferta" />
                        <button>Aplicar</button>
                    </div>

                    <div className="summary-financials">
                        <div className="financial-row"><span>Subtotal</span><span>{calculateSubtotalCheckout().toFixed(2)}€</span></div>
                        <div className="financial-row shipping-row"><span>Envio</span><span>0.00€</span></div> {/* Adicionado Envio */}
                        <div className="financial-row total-row"><span>TOTAL</span><span>{totalAmountCheckout.toFixed(2)}€</span></div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default WearCheckout;