// src/components/common/BookingModal/BarberCard.tsx
import React, { memo } from 'react';
import type { Barber } from '../../../types'; // Ajuste o caminho
import styles from './BookingModal.module.css';

interface BarberCardProps {
    barber: Barber;
    isSelected: boolean;
    onSelect: (barber: Barber) => void;
}

const BarberCard: React.FC<BarberCardProps> = memo(({ barber, isSelected, onSelect }) => (
    <button
        onClick={() => onSelect(barber)}
        // .barber-card ~ w-full max-w-xs rounded-2xl bg-white p-3 sm:px-5 sm:pt-10 sm:pb-15 hover:shadow-md transition border-3 ...
        className={`${styles['barber-card']} ${isSelected ? styles['selected'] : ''}`}
    >
        {/* .barber-image-wrapper ~ h-12 w-12 sm:h-20 sm:w-20 rounded-full ... */}
        <div className={styles['barber-image-wrapper']}> 
            <img 
                src={barber.image} 
                alt={barber.name} 
                // .barber-image ~ w-full h-full object-cover
                className={styles['barber-image']} 
                loading="lazy" 
                decoding="async"
                onError={(e) => (e.currentTarget.src = 'https://placehold.co/80x80/efefef/333?text=?')}
            />
        </div>
        {/* .barber-info ~ sm:space-y-1 text-center */}
        <div className={styles['barber-info']}> 
            {/* .barber-name ~ font-bold font-georgia */}
            <div className={styles['barber-name']}>{barber.name.toUpperCase()}</div> 
            {/* .barber-role ~ uppercase font-prompt text-dourado text-xs */}
            <div className={styles['barber-role']}> 
                 {(barber.specialty ?? barber.role ?? 'Barbeiro').toUpperCase()}
            </div>
        </div>
    </button>
));

export default BarberCard;