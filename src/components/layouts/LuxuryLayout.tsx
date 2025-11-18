// src/components/layouts/LuxuryLayout.tsx

import type { FC } from 'react';
// ✅ Caminhos ajustados: Saída de 'layouts/' (..), entrada em 'common/'
import type { HeaderPreset } from '../common/headerTypes';
// ✅ Importação do NavMenu e Logo
import { Logo, NavMenu } from '../common/HeaderComponents';

interface LayoutProps {
    preset: HeaderPreset;
    renderIcons: () => React.ReactNode;
    // Adicione userRole para consistência, se necessário para lógica interna (e porque o Header.tsx o envia)
    userRole: string | null; 
}

const LuxuryLayout: FC<LayoutProps> = ({ preset, renderIcons }) => {
    
    // O layout Luxury geralmente tem o menu de navegação e os ícones de domínio.
    // O seu preset.showNav (que está em Header.tsx) é que controla se o NavMenu aparece.
    
    return (
        <div className="header-container2">
            
            {/* O conteúdo do Header.tsx para a rota principal geralmente envolve uma estrutura flexível */}
            
            <Logo 
                // As props da Logo foram corrigidas na última iteração:
                logoSrc={preset.logoSrc} 
                logoText={preset.logoText} 
            />
            
            {/*
                A NavMenu é a barra de navegação principal (CATÁLOGO, OLIMPO COIN, etc.).
                Ela só deve ser renderizada se o preset a autorizar.
            */}
            {preset.showNav && <NavMenu />} 

            {/* Os ícones de domínio e perfil */}
            <div className="header-icons header-icons-with-labels">
                {renderIcons()}
            </div>
            
        </div>
    );
};

export default LuxuryLayout;