// src/components/common/SectionDivider.tsx (Mude para esta versão)

import type { FC } from 'react';

interface SectionDividerProps {
    className?: string;
}

const SectionDivider: FC<SectionDividerProps> = ({ className = '' }) => {
    // Usamos a classe 'section-divider' para gerenciar o padrão de fundo
    return (
        <div className={`section-divider ${className}`}> 
            {/* O conteúdo fica vazio, o padrão está no CSS de fundo */}
        </div>
    );
};

export default SectionDivider;