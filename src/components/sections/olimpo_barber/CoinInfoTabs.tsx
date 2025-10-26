// src/components/olimpo_shared/CoinInfoTabs.tsx (ou onde preferir)

import React, { useEffect, useRef, useState } from 'react';
// Use o Link do seu roteador (react-router-dom)
import { Link } from 'react-router-dom'; 

// Componente ClientOnly (se já não tiver um global)
const ClientOnly: React.FC<{ fallback: React.ReactNode; children: React.ReactNode }> = ({ fallback, children }) => {
    const [isClient, setIsClient] = useState(false);
    useEffect(() => {
        setIsClient(true);
    }, []);
    return isClient ? <>{children}</> : <>{fallback}</>;
};


export function CoinInfoTabs() {
    // Lógica de autenticação simplificada (apenas para exemplo de troca de aba)
    const [isAuthenticated, setIsAuthenticated] = useState(false); // Mude para true para testar logado
    const [loadingAuth, setLoadingAuth] = useState(false); // Simula fim do carregamento

    // Lógica das abas
    type TabKey = 'login' | 'coins' | 'benefits' | 'about';
    const [active, setActive] = useState<TabKey>(isAuthenticated ? 'coins' : 'login');

    useEffect(() => {
        if (!loadingAuth) {
            setActive(isAuthenticated ? 'coins' : 'login');
        }
    }, [isAuthenticated, loadingAuth]);

    // Lógica para ajustar largura do conteúdo (mantida do seu exemplo)
    const headerRef = useRef<HTMLDivElement | null>(null);
    const [headerWidth, setHeaderWidth] = useState<number | null>(null);
    useEffect(() => {
        if (!headerRef.current) return;
        const ro = new ResizeObserver((entries) => {
            for (const e of entries) {
                setHeaderWidth(Math.round(e.contentRect.width));
            }
        });
        ro.observe(headerRef.current);
        return () => ro.disconnect();
    }, []);

    // Estilos básicos (podem ser movidos para CSS)
    const baseTextColor = '#333'; // var(--color-defaulttext)

    if (loadingAuth) {
        return <div className="coin-tabs-loading">Verificando...</div>; 
    }

    return (
        // Container principal das abas
        <div className="coin-info-tabs-container">
            {/* Cabeçalho das Abas */}
            <div className="tabs-header-wrapper">
                <div ref={headerRef} className="tabs-header">
                    {/* Botão Login (Condicional) */}
                    {!isAuthenticated && (
                        <button
                            type="button"
                            onClick={() => setActive('login')}
                            className={`tab-button ${active === 'login' ? 'active' : ''}`}
                        >
                            <span>Login</span>
                        </button>
                    )}

                    {/* Botão Coins (Condicional) */}
                    {isAuthenticated && (
                        <button
                            type="button"
                            onClick={() => setActive('coins')}
                            className={`tab-button ${active === 'coins' ? 'active' : ''}`}
                        >
                            <span>Coins</span>
                        </button>
                    )}

                    {/* Botão Benefícios */}
                    <button
                        type="button"
                        onClick={() => setActive('benefits')}
                        className={`tab-button ${active === 'benefits' ? 'active' : ''}`}
                    >
                        <span>Os teus benefícios</span>
                    </button>

                    {/* Botão Sobre */}
                    <button
                        type="button"
                        onClick={() => setActive('about')}
                        className={`tab-button ${active === 'about' ? 'active' : ''}`}
                    >
                        <span>Sobre</span>
                    </button>
                </div>
            </div>

            {/* Conteúdo das Abas */}
            <div className="tab-content-wrapper">
                <div 
                    className="tab-content" 
                    style={{ maxWidth: headerWidth ? `${headerWidth}px` : undefined }}
                >
                    {/* Conteúdo da Aba Login */}
                    {active === 'login' && !isAuthenticated && (
                        <div className="tab-pane">
                            <h2>Faz Login para poderes usufruir das tuas Olimpo Coins</h2>
                            <p>
                                Ter uma OLIMPO Coin não é apenas sobre descontos — é sobre reconhecimento. <br /> 
                                É a nossa forma de agradecer por fazeres parte do projeto OLIMPO e por nos dares a oportunidade de elevar a tua experiência a um novo patamar. <br />
                                Coleciona OLIMPO Coins, desbloqueia vantagens únicas e desfruta de recompensas exclusivas, dentro e fora da loja.
                            </p>
                            <div className="tab-buttons">
                                {/* Links devem usar o 'to' correto das suas rotas */}
                                <Link to={'/login'} className="tab-action-button">Login</Link>
                                <Link to={'/register'} className="tab-action-button">Registo</Link>
                            </div>
                        </div>
                    )}

                    {/* Conteúdo da Aba Coins */}
                    {active === 'coins' && isAuthenticated && (
                         <div className="tab-pane">
                            <h2>Aqui poderás ver quantas Olimpo Coins tens</h2>
                            <div className="coin-balance-display">
                                {/* Aqui você buscaria o valor real do Firebase/Context */}
                                <span>{0}</span> 
                            </div>
                        </div>
                    )}

                    {/* Conteúdo da Aba Benefícios */}
                    {active === 'benefits' && (
                        <div className="tab-pane">
                            <h2>Desfruta de recompensas exclusivas</h2>
                            <div className="benefits-list">
                                <p><span className="benefit-highlight">15 Olimpo coins -</span> 10% de desconto da loja Olimpo wear</p>
                                <p><span className="benefit-highlight">28 Olimpo coins -</span> 20% de desconto da loja Olimpo wear</p>
                                <p><span className="benefit-highlight">39 Olimpo coins -</span> 30% de desconto da loja Olimpo wear</p>
                                <p><span className="benefit-highlight">55 Olimpo coins -</span> 50% de desconto da loja Olimpo wear</p>
                                <p><span className="benefit-highlight">100 Olimpo coins -</span> T-shirt oferta (100% de desconto...)</p>
                            </div>
                        </div>
                    )}

                    {/* Conteúdo da Aba Sobre */}
                    {active === 'about' && (
                         <div className="tab-pane">
                            {/* Reutilizando o texto do seu exemplo */}
                             <p>
                                Inspirada no minimalismo e na elegância da Grécia Antiga...
                             </p>
                         </div>
                    )}
                </div>
            </div>
        </div>
    );
}