// src/components/common/Header/layouts/LuxuryLayout.tsx
import type { FC } from 'react';
import type { HeaderPreset } from '../common/headerTypes';
import { Logo } from '../common/HeaderComponents';

interface LayoutProps {
  preset: HeaderPreset;
  renderIcons: () => React.ReactNode;
}

const LuxuryLayout: FC<LayoutProps> = ({ preset, renderIcons }) => {
  return (
    // Seu CSS controla o padding, background, etc., via .header-container
    <div className="header-container2">
      <Logo src={preset.logoSrc} />
      <div className="header-icons header-icons-with-labels">{renderIcons()}</div>
    </div>
  );
};

export default LuxuryLayout;