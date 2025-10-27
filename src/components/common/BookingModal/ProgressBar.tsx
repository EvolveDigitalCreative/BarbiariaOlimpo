// src/components/common/BookingModal/ProgressBar.tsx
import React from 'react';
import styles from './BookingModal.module.css'; // Usará o CSS do modal

type ProgressBarProps = {
    step: number;
    total?: number;
    startStep?: number;
};

export function ProgressBar({ step, total = 4, startStep = 1 }: ProgressBarProps) {
    const adjustedStep = step - startStep + 1;
    const clamped = Math.min(Math.max(adjustedStep, 1), total);
    const percent = (clamped / total) * 100;

    return (
        // .progress-bar-container ~ w-full flex items-center gap-3
        <div className={styles['progress-bar-container']}> 
            {/* .progress-step-label ~ text-base font-bold whitespace-nowrap */}
            <div className={styles['progress-step-label']}>{clamped}/{total}</div> 
            {/* .progress-track ~ relative h-2 flex-1 rounded-full bg-gray-300/70 */}
            <div className={styles['progress-track']}> 
                 {/* .progress-fill ~ h-full bg-black rounded-full ... */}
                <div
                    className={styles['progress-fill']}
                    style={{ width: `${percent}%` }}
                />
                 {/* .progress-icon ~ absolute -top-3 h-6 w-6 */}
                <img
                    src="public/OlimpoBarBer/icons/fire.png" // Ajuste o caminho
                    alt=""
                    aria-hidden="true"
                    className={styles['progress-icon']}
                    style={{ left: `calc(${percent}% - 10px)` }} // Ajuste fino da posição do ícone
                />
            </div>
        </div>
    );
}