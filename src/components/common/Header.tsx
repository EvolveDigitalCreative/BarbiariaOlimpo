// src/components/common/Header/index.tsx
// Este é o componente principal do Header.
// Sua ÚNICA responsabilidade é:
// 1. Descobrir qual página (rota) estamos.
// 2. Carregar o "preset" (configuração) correto para essa rota.
// 3. Renderizar o componente de LAYOUT correspondente.

import type { FC } from 'react';
import { useLocation } from 'react-router-dom';

// Importa a Logo principal (usada nos presets)
import OlimpoLogo from '../../../public/OlimpoBarBer/images/logo.webp';

// Importa os tipos
import type { HeaderProps, HeaderPreset, IconKey } from './headerTypes';

// Importa o "kit de peças" (o mapa de ícones)
import { iconLinksMap } from './HeaderComponents';

// Importa os TEMPLATES de layout
import LuxuryLayout from '../layouts/LuxuryLayout';
import CompactLayout from '../layouts/CompactLayout';
import CenteredLayout from '../layouts/CenteredLayout';

// ==========================================================
// CONFIGURAÇÃO CENTRAL DE PRESETS
// ==========================================================
// Este é o cérebro do Header. Ele mapeia uma ROTA (ex: '/wear')
// para um conjunto de configurações (o HeaderPreset).
// ==========================================================

const headerPresets: Record<string, HeaderPreset> = {
  // Preset Padrão (Barbearia / Home) - Usa IMAGEM de logo
  '/': {
    layout: 'luxury',
    logoSrc: OlimpoLogo,
    logoSize: { width: 140, height: 45 },
    iconsToShow: ['skincare', 'wear', 'user'],
    customIconSizes: { skincare: 45, wear: 45, user: 35 },
    containerStyle: {
      backgroundColor: '#f9f9f7',
      padding: '10px 60px',
      borderBottom: '1px solid #e4e4e0',
      color: '#000',
    },
  },

  // Preset 'Wear' (Loja) - Usa IMAGEM na barra dourada
  '/wear': {
    layout: 'centered',
    logoSrc: OlimpoLogo,
    logoSize: { width: 280, height: 90 },
    logoSubtitle: 'WEAR', // Texto da barra preta
    showNav: true,
    iconsToShow: ['skincare', 'barber', 'user'],
    customIconSizes: { skincare: 55, barber: 55, user: 40 },
  },

  // Preset 'Skincare' - Usa TEXTO
  '/skincare': {
    layout: 'compact',
    logoText: 'SKINCARE',
    iconsToShow: ['user'],
    customIconSizes: { user: 40 },
    containerStyle: {
      backgroundColor: '#f9f9f7',
      padding: '10px 60px',
      borderBottom: '1px solid #e4e4e0',
      color: '#000',
    },
  },
};
// Faz a rota /barber usar o mesmo preset da home
headerPresets['/barber'] = headerPresets['/'];

// ==========================================================
// COMPONENTE PRINCIPAL (CONTROLADOR)
// ==========================================================
const Header: FC<HeaderProps> = () => {
  const location = useLocation();
  // Encontra o preset correto, ou usa o padrão '/' se não achar
  const preset = headerPresets[location.pathname] || headerPresets['/'];

  // 1. Prepara os ícones
  const defaultIconSizes: Record<IconKey, number> = {
    wear: 78, skincare: 60, barber: 70, user: 45,
  };
  const iconSizes = { ...defaultIconSizes, ...preset.customIconSizes };
  const availableIcons = iconLinksMap(iconSizes);

  // 2. Cria a função 'renderIcons' que será passada para os layouts
  const renderIcons = () => (
    <div style={{ display: 'flex', alignItems: 'center', gap: '30px' }}>
      {(preset.iconsToShow || []).map((key) => (
        <div key={key}>{availableIcons[key]}</div>
      ))}
    </div>
  );

  // 3. Decide qual LAYOUT renderizar
  const renderLayout = () => {
    // Passa o preset (com as configs) e o renderIcons (com o JSX dos ícones)
    // para o componente de layout apropriado.
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

  // 4. Renderiza o <header> (wrapper) com o layout escolhido dentro
  return (
    <header
      className={`main-header ${preset.layout}`}
      style={{
        position: 'relative', // Garante que o zIndex funcione
        zIndex: 1000,         // Número alto para ficar na frente de tudo
      }}
    >
      {renderLayout()}
    </header>
  );
};

export default Header;