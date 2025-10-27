// src/components/common/BookingModal/ChooseBarberStep.tsx - Baseado no Código Fonte

import React, { useState, useEffect, useCallback, memo } from 'react';
import { db } from '../../../services/firebaseConfig'; // Ajuste o caminho
import { collection, getDocs, query, where } from 'firebase/firestore';
import type { Barber } from '../../../types'; // Ajuste o caminho
import BarberCard from './BarberCard';
import styles from './BookingModal.module.css';

type Props = {
    data: { barberId?: string };
    onChange: (patch: Partial<Props['data']>) => void;
    onNext: () => void;
    initialBarbers?: Barber[]; // Permite passar barbeiros pré-carregados
};

// MOCK DATA (Remover depois)
const MOCK_BARBERS: Barber[] = [ /* ... (mesmo mock anterior) ... */ ];

export const ChooseBarberStep: React.FC<Props> = memo(({ data, onChange, onNext, initialBarbers }) => {
    const [barbers, setBarbers] = useState<Barber[]>(initialBarbers || []);
    const [loading, setLoading] = useState(!initialBarbers);
    const [error, setError] = useState<string | null>(null);
    
    // ✅ Estado para rastrear a seleção localmente (null = sem preferência)
    const [selectedBarberId, setSelectedBarberId] = useState<string | null>(data.barberId ?? null); 
    // ✅ Estado para saber se *alguma* seleção foi feita (para mostrar o botão Seguinte)
    const [selectionMade, setSelectionMade] = useState(data.barberId !== undefined || selectedBarberId === null);

    // Busca barbeiros do Firebase
    useEffect(() => {
        if (initialBarbers && initialBarbers.length > 0) {
            const filtered = initialBarbers.filter(b => b.role === 'barber' || b.role === undefined); 
            setBarbers(filtered); setLoading(false); return;
        }
        const loadBarbers = async () => { /* ... (mesma lógica de busca anterior) ... */ 
             setLoading(true); setError(null);
             try {
                 const usersCollectionRef = collection(db, 'users');
                 const q = query(usersCollectionRef, where("role", "==", "barber"));
                 const barbersSnapshot = await getDocs(q);
                 const barbersData = barbersSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })) as Barber[];
                 setBarbers(barbersData.length > 0 ? barbersData : MOCK_BARBERS); 
             } catch (err) { setError('Erro ao carregar barbeiros.'); setBarbers(MOCK_BARBERS); } 
             finally { setLoading(false); }
        };
        loadBarbers();
    }, [initialBarbers]);

    // Seleciona um barbeiro
    const handleChooseBarber = useCallback((b: Barber) => {
        onChange({ barberId: b.id });
        setSelectedBarberId(b.id);
        setSelectionMade(true);
    }, [onChange]);

    // Seleciona "Sem preferência"
    const handleNoPreference = useCallback(() => {
        onChange({ barberId: undefined }); 
        setSelectedBarberId(null);
        setSelectionMade(true);
    }, [onChange]);

    return (
        // .step-content ~ flex-1 flex flex-col
        <div className={styles['step-content']}> 
            {/* .step-title ~ text-2xl font-georgia font-bold text-center mb-6 */}
            <h2 className={styles['step-title']}>Escolhe o teu barbeiro</h2> 

            {loading && <div className={styles['loading-message']}>A carregar barbeiros...</div>}
            {error && <div className={styles['error-message']}>{error}</div>}

            {!loading && !error && (
                <>
                    {/* .barbers-grid ~ grid grid-cols-1 sm:grid-cols-3 xl:grid-cols-5 gap-4 sm:gap-8 place-items-center */}
                    <div className={styles['barbers-grid']}> 
                        {barbers.map((barber) => (
                            <BarberCard
                                key={barber.id}
                                barber={barber}
                                isSelected={selectedBarberId === barber.id}
                                onSelect={handleChooseBarber}
                            />
                        ))}
                        
                        {/* Botão Sem Preferência (Mobile - escondido em SM+) */}
                        <button
                            onClick={handleNoPreference}
                            // .no-preference-button-mobile ~ w-full rounded-2xl bg-white p-3 hover:shadow-md ... sm:hidden
                            className={`${styles['no-preference-button-mobile']} ${selectedBarberId === null ? styles['selected'] : ''}`}
                        >
                            <img src="public/OlimpoBarBer/icons/blocked.png" alt="Sem preferência" className={styles['no-preference-icon-mobile']} />
                            <div className={styles['no-preference-text-mobile']}>Sem preferência</div>
                        </button>

                        {/* Botão Seguinte (Mobile - escondido em SM+) */}
                        {selectionMade && (
                            <button
                                onClick={onNext}
                                // .next-button-mobile ~ sm:hidden w-full rounded-lg bg-black text-white p-3 ...
                                className={styles['next-button-mobile']} 
                            >
                                Seguinte
                            </button>
                        )}
                    </div>

                    {/* Botões Desktop (escondidos em mobile) */}
                    <div className={styles['desktop-actions']}> 
                        {/* Botão Sem Preferência (Desktop) */}
                        <button
                            // .no-preference-button-desktop ~ hidden sm:flex absolute left-1/2 ...
                            className={`${styles['no-preference-button-desktop']} ${selectedBarberId === null ? styles['selected-ring'] : ''}`}
                            onClick={handleNoPreference}
                        >
                            <img src="public/OlimpoBarBer/icons/blocked.png" alt="Sem preferência" className={styles['no-preference-icon-desktop']} />
                            <span className={styles['no-preference-text-desktop']}>Sem preferência</span>
                        </button>

                        {/* Botão Seguinte (Desktop) */}
                        {selectionMade && (
                            <button
                                type="button"
                                // .next-button-desktop ~ hidden sm:flex absolute bottom-2 right-0 ...
                                className={styles['next-button-desktop']} 
                                onClick={onNext}
                            >
                                <span>Seguinte</span>
                                <img
                                    src="public/OlimpoBarBer/icons/proximo.png"
                                    alt="Próximo"
                                    className={styles['next-button-icon-desktop']}
                                />
                            </button>
                        )}
                    </div>
                </>
            )}
        </div>
    );
});