// src/components/common/Header/HeaderComponents.tsx

import type { FC } from 'react';
import { Link } from 'react-router-dom';
import type { IconKey } from './headerTypes';

// Importações dos ícones (sem mudança)
import WearCoinIcon from '/OlimpoBarBer/icons/icone de nevegacao do waer.png';
import SkincareCoinIcon from '/OlimpoBarBer/icons/icone de nevegcao da skincare.png';
import BarberCoinIcon from '/OlimpoBarBer/icons/icone de nevegacao do waer - Copia.png';
import UserIcon from '/OlimpoBarBer/icons/profile_highres.png';

// ✅ Caminho ajustado:
import { useAuth } from '../../context/AuthContext';

// Estilos de base (sem mudança)
export const linkBaseStyle: React.CSSProperties = {
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
    textDecoration: 'none',
    color: 'inherit',
    fontWeight: 600,
    fontSize: '15px',
};

// ==========================================================
// COMPONENTE: Logo
// ==========================================================

// ✅ CORRIGIDO: Interface ajustada para aceitar as props enviadas pelo CenteredLayout
export interface LogoProps {
    logoSrc?: string;          // Usado em vez de 'src'
    logoText?: string;         // Usado em vez de 'text'
    logoSubtitle?: string;     // Nova prop
    isLarge?: boolean;         // Nova prop
    textStyle?: React.CSSProperties;
}

/**
 * Componente Logo flexível.
 */
// ✅ CORRIGIDO: Desestruturando as novas props
export const Logo: FC<LogoProps> = ({ logoSrc, logoText, logoSubtitle, isLarge, textStyle }) => (
    <Link
        to="/"
        className="logo-wrapper"
        style={{ textDecoration: 'none', textAlign: 'center', color: 'inherit' }}
    >
        {logoSrc ? (
            <img
                src={logoSrc} // ✅ Usando logoSrc
                alt="Olimpo Logo"
                className="logo-img"
                style={{ objectFit: 'contain', height: isLarge ? '50px' : '40px' }} // Exemplo de uso de isLarge
            />
        ) : (
            <span
                style={{
                    fontFamily: 'serif',
                    fontWeight: 600,
                    fontSize: isLarge ? '32px' : '28px', // Exemplo de uso de isLarge
                    letterSpacing: '1px',
                    color: '#bca46d',
                    ...textStyle,
                }}
            >
                {logoText} // ✅ Usando logoText
            </span>
        )}
        {/* Renderiza o subtítulo se existir */}
        {logoSubtitle && (
            <span style={{ fontSize: '10px', color: '#999', marginTop: '4px', letterSpacing: '1px' }}>
                {logoSubtitle}
            </span>
        )}
    </Link>
);

// ==========================================================
// COMPONENTE: NavMenu (Onde o link para o CARRINHO é usado na navbar WEAR)
// ==========================================================

/**
 * O menu de navegação "CATÁLOGO, OLIMPO COIN..." da página Wear.
 */
export const NavMenu: FC = () => {
    const { userRole } = useAuth();

    return (
        <nav className="nav-menu" style={{ display: 'flex', alignItems: 'center' }}>
            <Link to="/wear/catalogo" className="nav-link">
                CATÁLOGO
            </Link>
            <Link to="/wear/coin" className="nav-link">
                OLIMPO COIN
            </Link>
            <Link to="/wear/carrinho" className="nav-link">
                CARRINHO
            </Link>
            {userRole === 'admin' && (
                <Link to="/admin" className="nav-link">
                    Dashboard
                </Link>
            )}
        </nav>
    );
};

// ==========================================================
// MAPA DE ÍCONES
// ==========================================================

/**
 * Os links dos domínios (Barber, Skincare, Wear) e do Perfil/Login.
 */
export const iconLinksMap: () => Record<IconKey, React.ReactNode> = () => ({
    skincare: (
        <Link to="/skincare" className="header-icon-link icon-domain-skincare" style={linkBaseStyle}>
            <img src={SkincareCoinIcon} alt="Olimpo Skin" className="icon-img icon-skincare" />
            <span className="icon-label">OLIMPO SKIN</span>
        </Link>
    ),
    wear: (
        <Link to="/wear" className="header-icon-link icon-domain-wear" style={linkBaseStyle}>
            <img src={WearCoinIcon} alt="Olimpo Wear" className="icon-img icon-wear" />
            <span className="icon-label">OLIMPO WEAR</span>
        </Link>),
    barber: (
        <Link to="/" className="header-icon-link icon-domain-barber" style={linkBaseStyle}>
            <img src={BarberCoinIcon} alt="Olimpo Barber" className="icon-img icon-barber" />
            <span className="icon-label">OLIMPO BARBER</span>
        </Link>
    ),
    user: (
        <Link to="/login" className="header-icon-link icon-user-profile" style={{ ...linkBaseStyle, gap: 0 }}>
            <img src={UserIcon} alt="Perfil" className="icon-img icon-user" />
        </Link>
    ),
});