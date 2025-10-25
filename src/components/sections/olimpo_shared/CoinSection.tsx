// src/components/home/CoinSection.tsx

import type { FC } from 'react';
import { Link } from 'react-router-dom';

const CoinSection: FC = () => {
    return (
        <section className="content-section coin-section light-background">
            <div className="section-content-wrapper reverse-layout">
                
                {/* Imagem e Botão */}
                <div className="section-image-container small-image-centered">
                    {/* **Mude o caminho da imagem** */}
                    <img src="/barbershop/images/olimpo-coin.png" alt="Olimpo Coin" className="responsive-image" />
                    <Link to="/coins" className="secondary-button">
                        VER MAIS...
                    </Link>
                </div>

                {/* Texto */}
                <div className="section-text-container right-aligned-text">
                    <p className="section-paragraph">
                        Apresentamos a <strong className="gold-text-strong">OLIMPO COIN</strong>.
                    </p>
                    <p className="section-paragraph">
                        Inspirada no minimalismo e na elegância da Grécia Antiga, a Olimpo Coin foi cuidadosamente criada para oferecer benefícios exclusivos aos nossos clientes.
                    </p>
                    <p className="section-paragraph">
                        A cada corte realizado na nossa barbearia, recebes uma Olimpo Coin, e a cada skin care realizada na Olimpo Skin recebes 2. Com elas, podes obter descontos nas nossas t-shirts e até ganhar uma gratuita.
                    </p>
                    <p className="section-paragraph">
                        Quanto mais coins acumulares, maiores serão as tuas recompensas.
                    </p>
                    <p className="section-small-text">
                        Requisito: Ter uma conta criada na nossa plataforma.
                    </p>
                </div>
            </div>
        </section>
    );
};

export default CoinSection;