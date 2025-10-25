// src/components/common/Header/layouts/CenteredLayout.tsx
// Este é o layout 'Centered', usado na /wear.
// Possui a barra dupla (dourada + preta) e o layout de 3 colunas.
// Se precisar ajustar o header da WEAR, mexa SÓ AQUI.

import type { FC } from 'react';
import type { HeaderPreset } from '../common/headerTypes';
import { Logo, NavMenu } from '../common/HeaderComponents';

interface LayoutProps {
  preset: HeaderPreset;
  renderIcons: () => React.ReactNode;
}

const CenteredLayout: FC<LayoutProps> = ({ preset, renderIcons }) => {
  return (
    <>
      {/* Barra Dourada (com IMAGEM da logo) */}
      <div
        className="header-bar-top"
        style={{
          backgroundColor: '#bca46d',
          color: '#000',
          padding: '8px 60px',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <Logo
          src={preset.logoSrc}
          size={preset.logoSize!}
        />
      </div>

      {/* Barra Preta (com 3 colunas) */}
      <div
        className="header-bar-bottom"
        style={{
          backgroundColor: '#000',
          color: '#fff',
          padding: '15px 60px',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
      >
        {/* Esquerda: Navegação */}
        <div style={{ flex: 1, display: 'flex', justifyContent: 'flex-start' }}>
          {preset.showNav && <NavMenu />}
        </div>

        {/* Centro: "WEAR" (Texto) */}
        <div style={{ flex: 1, display: 'flex', justifyContent: 'center' }}>
          <span
            style={{
              fontFamily: '"Times New Roman", Times, serif',
              fontSize: '24px',
              fontWeight: 600,
              letterSpacing: '2px',
              color: '#bca46d',
            }}
          >
            {preset.logoSubtitle}
          </span>
        </div>

        {/* Direita: Ícones */}
        <div style={{ flex: 1, display: 'flex', justifyContent: 'flex-end' }}>
          {renderIcons()}
        </div>
      </div>
    </>
  );
};

export default CenteredLayout;