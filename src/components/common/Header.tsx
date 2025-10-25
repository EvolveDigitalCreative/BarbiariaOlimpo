// src/components/common/Header.tsx

import type { FC } from 'react';
import { Link } from 'react-router-dom';

const Header: FC = () => {
    // Ícone de Perfil (Avatar)
    const ProfileIcon = () => (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"></path>
            <circle cx="12" cy="7" r="4"></circle>
        </svg>
    );

    return (
        <header className="main-header">
            {/* Logo Olimpo (Canto Superior Esquerdo) */}
            <Link to="/" className="header-logo">
                {/* **Mude o caminho da imagem:** use o caminho correto para o seu logo texto/imagem */}
                <img src="/barbershop/icons/logo-olimpotext.png" alt="Olimpo" className="logo-text-style" />
            </Link>

            {/* Links e Ícones (Canto Superior Direito) */}
            <nav className="header-nav">
                <Link to="/skin" className="nav-link-item icon-link">
                    {/* **Mude o caminho da imagem:** Ícone Olimpo Skin */}
                    <img src="public\OlimpoBarBer\icons\icone de nevegacao do waer.png" alt="Olimpo Skin" /> 
                    <span>OLIMPO SKIN</span>
                </Link>
                
                <Link to="/wear" className="nav-link-item icon-link">
                    {/* **Mude o caminho da imagem:** Ícone Olimpo Wear */}
                    <img src="public\OlimpoBarBer\icons\icone de nevegacao do waer.png" alt="Olimpo Wear" /> 
                    <span>OLIMPO WEAR</span>
                </Link>

                <Link to="/login" className="nav-link-item profile-icon-link" aria-label="Conta">
                    <ProfileIcon />
                </Link>
            </nav>
        </header>
    );
};

export default Header;