// src/components/common/Header.tsx

import type { FC } from 'react';
import { useLocation } from 'react-router-dom';

// Importa a Logo principal
import OlimpoLogo from '../../../public/OlimpoBarBer/images/logo.webp';

// Importa os tipos
// ATENÇÃO: Assegure-se de que './headerTypes' está no mesmo diretório
import type { HeaderPreset, IconKey } from './headerTypes'; 

// Importa o "kit de peças"
import { iconLinksMap } from './HeaderComponents';

// Importa os TEMPLATES de layout 
import LuxuryLayout from '../layouts/LuxuryLayout';
import CompactLayout from '../layouts/CompactLayout';
import CenteredLayout from '../layouts/CenteredLayout';

// ==========================================================
// CONFIGURAÇÃO CENTRAL DE PRESETS
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
// O tipo FC<HeaderProps> precisa ser definido em headerTypes
// ==========================================================
const Header: FC = () => { // Removi <HeaderProps> pois não há props no seu código atual.
  const location = useLocation();
  const preset = headerPresets[location.pathname] || headerPresets['/'];

  // 1. Prepara os ícones 
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

export default Header; // <-- ESSA LINHA É CRÍTICA PARA RESOLVER O ERRO TS1192