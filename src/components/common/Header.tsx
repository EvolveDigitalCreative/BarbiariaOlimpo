// src/components/common/Header.tsx
import type { FC } from 'react';
import { Link } from 'react-router-dom';

// Defina as props que o Header irá aceitar
interface HeaderProps {
    domain: 'barber' | 'skincare' | 'wear';
}

// CORREÇÃO: Usar um valor default para 'domain' ('barber') 
// para prevenir o erro 'Cannot read properties of undefined (reading 'toUpperCase')'
const Header: FC<HeaderProps> = ({ domain = 'barber' }) => { // <--- CORREÇÃO AQUI
    
    const headerClass = `main-header header-${domain}`;
    
    // Define o nome do domínio a ser exibido
    const domainTitle = domain.toUpperCase(); 

    // Lógica para Links de Navegação Principal
    const navLinks = [
        { path: `/${domain}/servicos`, label: 'SERVIÇOS', show: domain !== 'wear' },
        { path: `/${domain}/produtos`, label: 'PRODUTOS', show: domain !== 'barber' },
        { path: `/${domain}/missao`, label: 'MISSÃO', show: domain !== 'wear' }, 
    ].filter(link => link.show);
    
    // Rota de fallback para o logo
    const logoPath = domain === 'barber' ? '/' : `/${domain}`;

    // Define os caminhos dos ícones
    const logoIconSrc = domain === 'skincare' 
        ? '/skincare/icons/whitecoin.png' 
        : '/barbershop/icons/blackcoin.png';

    return (
        <header className={headerClass}>
            <div className="header-container">
                
                {/* 1. Logo Olimpo Dinâmico */}
                <Link to={logoPath} className="logo-wrapper">
                    <img 
                        src={logoIconSrc} 
                        alt={`Logo ${domainTitle}`} 
                        className="logo-icon" 
                    />
                    
                    <span className="logo-text">OLIMPO</span>
                    <span className="domain-name">{domainTitle}</span>
                </Link>
                
                {/* 2. Navegação Principal */}
                <nav className="header-nav nav-menu">
                    {navLinks.map((link) => (
                        <Link key={link.path} to={link.path} className="nav-link">
                            {link.label}
                        </Link>
                    ))}
                </nav>
                
                {/* 3. Ícones (Coin, Carrinho, Perfil) */}
                <div className="header-nav header-icons">
                    
                    {/* Ícone Olimpo Coin */}
                    <Link to="/coin" className="icon-link header-icon-link">
                        <img src="/barbershop/icons/goldcoin.png" alt="Olimpo Coin" />
                        <span>Coin</span>
                    </Link>
                    
                    {/* Ícone Carrinho */}
                    {(domain === 'wear' || domain === 'skincare') && (
                        <Link to="/carrinho" className="icon-link header-icon-link">
                            <img src="/skincare/icons/cart.png" alt="Carrinho" /> 
                            <span>Carrinho</span>
                        </Link>
                    )}
                    
                    {/* Ícone Perfil/Login */}
                    <Link to="/login" className="icon-link header-icon-link profile-icon-link">
                        <img src="/barbershop/icons/profile.png" alt="Perfil" />
                        <span>Perfil</span>
                    </Link>
                </div>
            </div>
        </header>
    );
};
export default Header;