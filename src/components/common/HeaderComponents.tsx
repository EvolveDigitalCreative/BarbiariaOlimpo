// src/components/common/Header/HeaderComponents.tsx

import type { FC } from 'react';
import { Link } from 'react-router-dom';
import type { IconKey } from './headerTypes';

// Importações dos ícones (sem mudança)
import WearCoinIcon from '../../../public/OlimpoBarBer/icons/icone de nevegacao do waer.png';
import SkincareCoinIcon from '../../../public/OlimpoBarBer/icons/icone de nevegcao da skincare.png';
import BarberCoinIcon from '../../../public/OlimpoBarBer/icons/icone de nevegacao do waer - Copia.png';
import UserIcon from '../../../public/OlimpoBarBer/icons/profile_highres.png';

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
// COMPONENTE: Logo (Modificado)
// ==========================================================

interface LogoProps {
  src?: string;
  text?: string;
  textStyle?: React.CSSProperties;
}

/**
 * Componente Logo flexível.
 * Não recebe mais 'size'. Os tamanhos virão do CSS via classes.
 */
export const Logo: FC<LogoProps> = ({ src, text, textStyle }) => (
  <Link
    to="/"
    // Adiciona a classe que o seu CSS espera
    className="logo-wrapper" 
    style={{ textDecoration: 'none', textAlign: 'center', color: 'inherit' }}
  >
    {src ? (
      <img
        src={src}
        alt="Olimpo Logo"
        // Adiciona a classe que o seu CSS espera
        className="logo-img"
        style={{ objectFit: 'contain' }} // Mantém o objectFit
      />
    ) : (
      // O Logo em texto não parecia ter classes no seu CSS,
      // então mantemos o estilo inline por enquanto.
      <span
        style={{
          fontFamily: 'serif',
          fontWeight: 600,
          fontSize: '28px',
          letterSpacing: '1px',
          color: '#bca46d',
          ...textStyle,
        }}
      >
        {text}
      </span>
    )}
  </Link>
);

// ==========================================================
// COMPONENTE: NavMenu (Modificado)
// ==========================================================

/**
 * O menu de navegação "CATÁLOGO, OLIMPO COIN..." da página Wear.
 * Adicionamos a classe 'nav-menu'
 */
export const NavMenu: FC = () => (
  <nav className="nav-menu" style={{ display: 'flex', alignItems: 'center' }}>
    {/* Aplicamos a classe 'nav-link' do seu CSS */}
    <Link to="/wear/catalogo" className="nav-link">
      CATÁLOGO
    </Link>
    <Link to="/wear/coin" className="nav-link">
      OLIMPO COIN
    </Link>
    <Link to="/wear/carrinho" className="nav-link">
      CARRINHO
    </Link>
    <Link to="/wear/pesquisa" className="nav-link">
      PESQUISA
    </Link>
  </nav>
);

// ==========================================================
// MAPA DE ÍCONES (Modificado)
// ==========================================================

/**
 * O mapa de ícones agora não precisa mais de 'sizes'.
 * Ele aplica as classes do seu CSS diretamente.
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
    </Link>
  ),
  barber: (
    <Link to="/" className="header-icon-link icon-domain-barber" style={linkBaseStyle}>
      <img src={BarberCoinIcon} alt="Olimpo Barber" className="icon-img icon-barber" />
      <span className="icon-label">OLIMPO BARBER</span>
    </Link>
  ),
  user: (
    <Link to="/login" className="header-icon-link icon-user-profile" style={{...linkBaseStyle, gap: 0}}>
      <img src={UserIcon} alt="Perfil" className="icon-img icon-user" />
    </Link>
  ),
});