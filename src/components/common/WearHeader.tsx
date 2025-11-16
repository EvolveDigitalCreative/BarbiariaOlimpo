// src/components/common/WearHeader.tsx (ou Header.tsx)

import React from 'react';
// Importamos os componentes estruturais e o mapa de ícones
import { Logo, NavMenu, iconLinksMap } from './HeaderComponents'; 
import { Link } from 'react-router-dom';

import '../../styles/global/wearhearder.css';

// IMPORTANTE: Não se esqueça de importar seu CSS aqui ou no arquivo que usa este componente!
// import '../../styles/global/wearheader.css';

const WearHeader: React.FC = () => {
    // Pegamos os links de acesso rápido e o link de perfil do mapa
    const links = iconLinksMap();
    const OlimpoSkinLink = (
        <a href="/skincare" className="nav-link-badge">
            {/* Usamos o ícone de Skincare do seu mapa de links (ajustando para o formato do badge) */}
            <img src="/OlimpoBarBer/icons/icone de nevegcao da skincare.png" alt="Olimpo Skin Icon" />
            OLIMPO SKIN
        </a>
    );
    const OlimpoBarberLink = (
        <a href="/wear" className="nav-link-badge">
            {/* Usamos o ícone de Barber do seu mapa de links (ajustando para o formato do badge) */}
            <img src="/OlimpoBarBer/icons/icone de nevegacao do waer - Copia.png" alt="Olimpo Barber Icon" />
            OLIMPO BARBER
        </a>
    );
    
    // O ícone de Perfil, que na imagem é um círculo à direita.
    const UserProfileLink = (
        <Link to="/profile" className="nav-link-profile">
            {/* Usamos o ícone de Perfil do seu mapa de links */}
            <img src="/OlimpoWear/icons/profile.png" alt="Perfil" />
        </Link>
    );


    return (
        <header className="main-header">
            {/* 1. FAIXA SUPERIOR: Logo OLIMPO WEAR (Barra Dourada) */}
            <div className="header-top-bar">
                {/* Aqui replicamos o texto "OLIMPO WEAR" da imagem usando as classes do CSS */}
                <span className="logo-olimpo">OLIMPO</span>
                <span className="logo-wear">WEAR</span>
            </div>

            {/* 2. BARRA PRINCIPAL DE NAVEGAÇÃO (Barra Preta/Branca) */}
            <nav className="header-main-nav">
                
                {/* Links da Esquerda: CATÁLOGO, OLIMPO COIN, CARRINHO, PESQUISA */}
                <div className="nav-links-left">
                    {/* Usamos o componente NavMenu que você definiu para os links principais */}
                    <NavMenu />
                </div>

                {/* Links da Direita: OLIMPO SKIN, OLIMPO BARBER, Perfil */}
                <div className="nav-links-right">
                    {OlimpoSkinLink}
                    {OlimpoBarberLink}
                    {UserProfileLink}
                </div>
            </nav>
        </header>
    );
};

// Se o seu `WearCatalog.tsx` importa como `WearHeader`, mantenha o nome da exportação.
// Se o seu `WearCatalog.tsx` importa como `Header`, renomeie a função acima.
export default WearHeader;