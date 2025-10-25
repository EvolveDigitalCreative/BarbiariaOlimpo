// src/components/common/Header/layouts/LuxuryLayout.tsx
// Este é o layout 'Luxury', usado na Home (/) e na /barber.
// É o layout padrão, com uma única barra, logo à esquerda e ícones à direita.

import type { FC } from 'react';
import type { HeaderPreset } from '../common/headerTypes';
import { Logo } from '../common/HeaderComponents';

interface LayoutProps {
  preset: HeaderPreset;
  renderIcons: () => React.ReactNode;
}

const LuxuryLayout: FC<LayoutProps> = ({ preset, renderIcons }) => {
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
      {/* Logo (Imagem) */}
      <div>
        <Logo src={preset.logoSrc} size={preset.logoSize!} />
      </div>

      {/* Ícones */}
      <div>{renderIcons()}</div>
    </div>
  );
};

export default LuxuryLayout;