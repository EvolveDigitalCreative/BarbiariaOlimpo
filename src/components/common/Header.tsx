// src/components/common/Header/index.tsx

import type { FC } from 'react';
import { useLocation } from 'react-router-dom';

// Importa a Logo principal
import OlimpoLogo from '../../../public/OlimpoBarBer/images/logo.webp';

// Importa os tipos
import type { HeaderProps, HeaderPreset, IconKey } from './headerTypes';

// Importa o "kit de peças"
import { iconLinksMap } from './HeaderComponents';

// Importa os TEMPLATES de layout
import LuxuryLayout from '../layouts/LuxuryLayout';
import CompactLayout from '../layouts/CompactLayout';
import CenteredLayout from '../layouts/CenteredLayout';

// ==========================================================
// CONFIGURAÇÃO CENTRAL DE PRESETS
// ==========================================================
// Mapeia a rota para um layout e uma classe CSS
// ==========================================================

const headerPresets: Record<string, HeaderPreset> = {
  // Preset Padrão (Barbearia / Home)
  '/': {
    layout: 'luxury',
    rootClass: 'header-barber', // Usa .header-barber do seu CSS
    logoSrc: OlimpoLogo,
    iconsToShow: ['skincare', 'wear', 'user'],
  },

  // Preset 'Wear' (Loja)
  '/wear': {
    layout: 'centered',
    rootClass: 'header-wear', // Usa .header-wear do seu CSS
    logoSrc: OlimpoLogo,
    logoSubtitle: 'WEAR',
    showNav: true,
    iconsToShow: ['skincare', 'barber', 'user'],
  },

  // Preset 'Skincare'
  '/skincare': {
    layout: 'compact',
    rootClass: 'header-skincare', // Usa .header-skincare do seu CSS
    logoText: 'SKINCARE',
    iconsToShow: ['user'],
  },
};
headerPresets['/barber'] = headerPresets['/'];

// ==========================================================
// COMPONENTE PRINCIPAL (CONTROLADOR)
// ==========================================================
const Header: FC<HeaderProps> = () => {
  const location = useLocation();
  const preset = headerPresets[location.pathname] || headerPresets['/'];

  // 1. Prepara os ícones (não precisa mais de tamanhos!)
  const availableIcons = iconLinksMap();

  // 2. Cria a função 'renderIcons'
  const renderIcons = () => (
    <> 
      {(preset.iconsToShow || []).map((key) => (
        <div key={key}>{availableIcons[key as IconKey]}</div>
      ))}
    </>
  );

  // 3. Decide qual LAYOUT renderizar
  const renderLayout = () => {
    switch (preset.layout) {
      case 'centered':
        return <CenteredLayout preset={preset} renderIcons={renderIcons} />;
      case 'compact':
        return <CompactLayout preset={preset} renderIcons={renderIcons} />;
      case 'luxury':
      default:
        return <LuxuryLayout preset={preset} renderIcons={renderIcons} />;
    }
  };

  // 4. Renderiza o <header> (wrapper)
  return (
    <header
      // Aplica a 'rootClass' (ex: .header-barber)
      className={`main-header ${preset.rootClass}`}
      style={{
        position: 'relative',
        zIndex: 1000,
      }}
    >
      {renderLayout()}
    </header>
  );
};

export default Header;