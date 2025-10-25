// src/components/common/Header/HeaderComponents.tsx
// Este arquivo contém todos os "blocos de montar" (componentes reutilizáveis)
// que os diferentes layouts do header utilizam, como a Logo, 
// o Menu de Navegação e o mapa de Ícones.

import type { FC } from 'react';
import { Link } from 'react-router-dom';
import type { IconKey } from './headerTypes';

// ==========================================================
// IMPORTAÇÃO DOS ÍCONES
// ==========================================================
import WearCoinIcon from '../../../../public/OlimpoBarBer/icons/icone de nevegacao do waer.png';
import SkincareCoinIcon from '../../../../public/OlimpoBarBer/icons/icone de nevegcao da skincare.png';
import BarberCoinIcon from '../../../../public/OlimpoBarBer/icons/icone_barber.png';
import UserIcon from '../../../../public/OlimpoBarBer/icons/profile_highres.png';

// ==========================================================
// ESTILOS DE BASE
// ==========================================================

/** Estilo base para todos os links do header */
export const linkBaseStyle: React.CSSProperties = {
  display: 'flex',
  alignItems: 'center',
  gap: '10px',
  textDecoration: 'none',
  color: 'inherit',
  fontWeight: 600,
  fontSize: '15px',
};

/** Estilo base para as imagens dos ícones (avatar, skin, etc.) */
export const iconImgStyle: React.CSSProperties = {
  borderRadius: '50%',
  objectFit: 'cover',
};

// ==========================================================
// COMPONENTE: Logo
// ==========================================================

interface LogoProps {
  src?: string;
  text?: string;
  size?: { width: number; height: number };
  textStyle?: React.CSSProperties;
}

/**
 * Componente Logo flexível.
 * Renderiza uma IMAGEM se 'src' e 'size' forem fornecidos.
 * Renderiza TEXTO se 'text' for fornecido.
 */
export const Logo: FC<LogoProps> = ({ src, text, size, textStyle }) => (
  <Link
    to="/"
    style={{ textDecoration: 'none', textAlign: 'center', color: 'inherit' }}
  >
    {src && size ? (
      // Renderiza como Imagem
      <img
        src={src}
        alt="Olimpo Logo"
        style={{
          width: `${size.width}px`,
          height: `${size.height}px`,
          objectFit: 'contain',
        }}
      />
    ) : (
      // Renderiza como Texto
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
// COMPONENTE: NavMenu (Específico do /wear)
// ==========================================================

/** O menu de navegação "CATÁLOGO, OLIMPO COIN..." da página Wear */
export const NavMenu: FC = () => (
  <nav style={{ display: 'flex', gap: '25px', alignItems: 'center' }}>
    <Link to="/wear/catalogo" style={{ ...linkBaseStyle, fontSize: '14px', fontWeight: 700, letterSpacing: '0.5px' }}>
      CATÁLOGO
    </Link>
    <Link to="/wear/coin" style={{ ...linkBaseStyle, fontSize: '14px', fontWeight: 700, letterSpacing: '0.5px' }}>
      OLIMPO COIN
    </Link>
    <Link to="/wear/carrinho" style={{ ...linkBaseStyle, fontSize: '14px', fontWeight: 700, letterSpacing: '0.5px' }}>
      CARRINHO
    </Link>
    <Link to="/wear/pesquisa" style={{ ...linkBaseStyle, fontSize: '14px', fontWeight: 700, letterSpacing: '0.5px' }}>
      PESQUISA
    </Link>
  </nav>
);

// ==========================================================
// MAPA DE ÍCONES
// ==========================================================

/**
 * Um "mapa" que gera o JSX para cada ícone (Skin, Wear, Barber, User)
 * com base nos tamanhos fornecidos.
 */
export const iconLinksMap: (
  sizes: Record<IconKey, number>,
) => Record<IconKey, React.ReactNode> = (sizes) => ({
  skincare: (
    <Link to="/skincare" style={{...linkBaseStyle, fontWeight: 700}}>
      <img src={SkincareCoinIcon} alt="Olimpo Skin" style={{ ...iconImgStyle, width: `${sizes.skincare}px`, height: `${sizes.skincare}px` }} />
      <span>OLIMPO SKIN</span>
    </Link>
  ),
  wear: (
    <Link to="/wear" style={{...linkBaseStyle, fontWeight: 700}}>
      <img src={WearCoinIcon} alt="Olimpo Wear" style={{ ...iconImgStyle, width: `${sizes.wear}px`, height: `${sizes.wear}px` }} />
      <span>OLIMPO WEAR</span>
    </Link>
  ),
  barber: (
    <Link to="/barber" style={{...linkBaseStyle, fontWeight: 700}}>
      <img src={BarberCoinIcon} alt="Olimpo Barber" style={{ ...iconImgStyle, width: `${sizes.barber}px`, height: `${sizes.barber}px` }} />
      <span>OLIMPO BARBER</span>
    </Link>
  ),
  user: (
    <Link to="/login" style={{ ...linkBaseStyle, gap: 0 }}>
      <img src={UserIcon} alt="Perfil" style={{ ...iconImgStyle, width: `${sizes.user}px`, height: `${sizes.user}px` }} />
    </Link>
  ),
});