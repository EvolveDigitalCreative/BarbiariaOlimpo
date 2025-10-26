// src/components/common/Header/layouts/CompactLayout.tsx
import type { FC } from 'react';
import type { HeaderPreset } from '../common/headerTypes';
import { Logo } from '../common/HeaderComponents';

interface LayoutProps {
  preset: HeaderPreset;
  renderIcons: () => React.ReactNode;
}

const CompactLayout: FC<LayoutProps> = ({ preset, renderIcons }) => {
  return (
    <div className="header-container">
      <div style={{ flex: 1 }} />
      <div style={{ flex: 1, display: 'flex', justifyContent: 'center' }}>
        <Logo
          text={preset.logoText}
          textStyle={{ fontSize: '32px', letterSpacing: '2px' }}
        />
      </div>
      <div className="header-icons header-icons-minimal" style={{ flex: 1, display: 'flex', justifyContent: 'flex-end' }}>
        {renderIcons()}
      </div>
    </div>
  );
};

export default CompactLayout;