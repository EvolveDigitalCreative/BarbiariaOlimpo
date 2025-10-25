// src/components/common/Header.tsx

import type { FC } from 'react';
import { Link } from 'react-router-dom';

// Defina as props que o Header irá aceitar
interface HeaderProps {
    domain: 'barber' | 'skincare' | 'wear';
}

const Header: FC<HeaderProps> = ({ domain }) => {
    
    // Define a classe CSS baseada no domínio
    const headerClass = `main-header header-${domain}`;
    
    // Define o nome do domínio a ser exibido
    const domainTitle = domain.toUpperCase();

    // Links de navegação (Ajustados para refletir o Wear)
    const navLinks = [
        { path: '/wear', label: 'CATÁLOGO', show: domain === 'wear' },
        { path: '/wear/colecoes', label: 'COLEÇÕES', show: domain === 'wear' },
        { path: '/wear/novidades', label: 'NOVIDADES', show: domain === 'wear' },
        { path: '/skincare/servicos', label: 'SERVIÇOS', show: domain === 'skincare' },
        { path: '/barber/servicos', label: 'SERVIÇOS', show: domain === 'barber' },
    ].filter(link => link.show); // Filtra links que pertencem a este domínio
    
    // Rota de fallback para o logo
    const logoPath = domain === 'barber' ? '/' : `/${domain}`;

    return (
        <header className={headerClass}>
            <div className="header-container">
                
                {/* 1. Logo Olimpo Dinâmico */}
                <Link to={logoPath} className="logo-wrapper">
                    <span className="logo-text">OLIMPO</span>
                    <span className="domain-name">{domainTitle}</span>
                </Link>
                
                {/* 2. Navegação Principal */}
                <nav className="nav-menu">
                    {navLinks.map((link) => (
                        <Link key={link.path} to={link.path} className="nav-link">
                            {link.label}
                        </Link>
                    ))}
                </nav>
                
                {/* 3. Ícones (Moeda, Carrinho, Perfil) */}
                <div className="header-icons">
                    {/* Ícone Olimpo Coin */}
                    <Link to="/coin" className="header-icon-link">
                        {/* Assumindo que usa FontAwesome ou um ícone SVG */}
                        <i className="fas fa-coins"></i> 
                    </Link>
                    
                    {/* Ícone Carrinho (Comum no Wear e Skincare) */}
                    {(domain === 'wear' || domain === 'skincare') && (
                        <Link to="/carrinho" className="header-icon-link">
                            <i className="fas fa-shopping-bag"></i> 
                        </Link>
                    )}
                    
                    {/* Ícone Perfil/Login */}
                    <Link to="/login" className="header-icon-link">
                        <i className="fas fa-user"></i>
                    </Link>
                </div>
            </div>
        </header>
    );
};

export default Header;