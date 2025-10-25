// src/components/common/Header/layouts/CompactLayout.tsx
// Este é o layout 'Compact', usado na /skincare.
// É uma barra única, com a logo (em texto) centralizada e ícones à direita.

import type { FC } from 'react';
import type { HeaderPreset } from '../common/headerTypes';
import { Logo } from '../common/HeaderComponents';

interface LayoutProps {
  preset: HeaderPreset;
  renderIcons: () => React.ReactNode;
}

const CompactLayout: FC<LayoutProps> = ({ preset, renderIcons }) => {
  return (
    <div
      className="header-container"
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        ...preset.containerStyle,
      }}
    >
      {/* Espaçador para manter a logo no centro */}
      <div style={{ flex: 1 }} />

      {/* Logo (Texto) */}
      <div style={{ flex: 1, display: 'flex', justifyContent: 'center' }}>
        <Logo
          text={preset.logoText}
          textStyle={{ fontSize: '32px', letterSpacing: '2px' }}
        />
      </div>

      {/* Ícones */}
      <div
        style={{
          flex: 1,
          display: 'flex',
          justifyContent: 'flex-end',
        }}
      >
        {renderIcons()}
      </div>
    </div>
  );
};

export default CompactLayout;