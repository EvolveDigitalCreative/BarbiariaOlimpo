import type { FC } from 'react';
import type { HeaderPreset } from '../common/headerTypes';
import { Logo } from '../common/HeaderComponents';
import React from 'react';

interface LayoutProps {
  preset: HeaderPreset;
  renderIcons: () => React.ReactNode;
  userRole: string | null;
}

const CenteredLayout: FC<LayoutProps> = ({ preset, renderIcons, userRole }) => {
  const isUserAdmin = userRole === 'admin';

  return (
    <div className="centered-layout">
      <Logo
        logoSrc={preset.logoSrc}
        logoSubtitle={preset.logoSubtitle}
        isLarge={isUserAdmin}
      />
      <nav className="centered-icons">{renderIcons()}</nav>
      {/* SEU CÓDIGO DE LAYOUT COMPLETO VAI AQUI */}
    </div>
  );
};

export default CenteredLayout;