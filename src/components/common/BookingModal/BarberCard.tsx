// src/components/common/BookingModal/BarberCard.tsx
import React, { memo } from 'react';
import type { Barber } from '../../../types'; // Ajuste o caminho se necessário
import styles from './BookingModal.module.css'; // Importação do CSS Modular mantida

// Para contornar o erro de tipagem (Property 'image' does not exist), 
// estendemos temporariamente o tipo Barber neste ficheiro.
// A solução ideal é corrigir a interface em '../../../types'.
interface ExtendedBarber extends Barber {
    image?: string; // Adicionado para a linha 29 parar de reclamar
    localImageSrc?: string; // Adicionado com base no seu outro componente
}

interface BarberCardProps {
    barber: ExtendedBarber; // Usamos o tipo estendido temporariamente
    isSelected: boolean;
    onSelect: (barber: ExtendedBarber) => void;
}

const BarberCard: React.FC<BarberCardProps> = memo(({ barber, isSelected, onSelect }) => {
    // 1. Verificação defensiva de segurança para o objeto 'barber'
    if (!barber) {
        return null;
    }

    // Tentativa de obter a URL da imagem. Priorizamos 'image', depois 'localImageSrc'.
    const imageUrl = barber.image || barber.localImageSrc || 'https://placehold.co/80x80/efefef/333?text=?';

    return (
        <button
            onClick={() => onSelect(barber)}
            // 3. Importação do CSS Modular mantida e usada
            className={`${styles['barber-card']} ${isSelected ? styles['selected'] : ''}`}
        >
            {/* Estrutura da Imagem */}
            <div className={styles['barber-image-wrapper']}>
                <img
                    // Usamos a URL obtida, resolvendo o erro de tipagem e fallback da imagem
                    src={imageUrl}
                    alt={barber.name}
                    className={styles['barber-image']}
                    loading="lazy"
                    decoding="async"
                    onError={(e) => (e.currentTarget.src = 'https://placehold.co/80x80/efefef/333?text=?')}
                />
            </div>

            <div className={styles['barber-info']}>
                {/* 2. CORREÇÃO DE RUNTIME: Usa encadeamento opcional (?.) para garantir que 'name' existe */}
                <div className={styles['barber-name']}>{barber.name?.toUpperCase() || 'N/A'}</div>

                <div className={styles['barber-role']}>
                    {/* 2. CORREÇÃO DE RUNTIME */}
                    {(barber.specialty?.toUpperCase() ?? barber.role?.toUpperCase() ?? 'Barbeiro').toUpperCase()}
                </div>
            </div>
        </button>
    );
});

export default BarberCard;