// src/components/common/BookingModal/ChooseBarberStep.tsx - FINAL SEM MOCK

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

// ❌ REMOVIDO: MOCK_BARBERS

// ✅ FUNÇÃO AUXILIAR: TRADUZ O VALOR INTERNO DO FIREBASE PARA EXIBIÇÃO
const translateRole = (roleKey?: string): string => {
    switch (roleKey?.toLowerCase()) {
        case 'barber':
        case 'barbeiro': // Aceita ambas as chaves internas
            return 'BARBEIRO'; // O que será exibido na UI
    }
};

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
        const loadBarbers = async () => { 
             setLoading(true); setError(null);
             try {
                 const usersCollectionRef = collection(db, 'users');
                 const q = query(usersCollectionRef, where("role", "==", "barber"));
                 const barbersSnapshot = await getDocs(q);
                 const barbersData = barbersSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })) as Barber[];
                 
                 // ✅ AGORA: Define a lista como vazia se não houver dados, para exibir a mensagem "Nenhum barbeiro disponível"
                 setBarbers(barbersData); 
                 
             } catch (err) { 
                 console.error('Erro ao carregar barbeiros:', err);
                 setError('Erro ao carregar barbeiros.'); 
                 setBarbers([]); // Limpa a lista em caso de erro de conexão/busca
             } finally { setLoading(false); }
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
    
    
    // Renderiza o conteúdo (separado para clareza)
    const RenderBarbers = () => (
        <div className={styles['barbers-grid']}>
            {barbers.map((barber) => (
                <BarberCard
                    key={barber.id}
                    barber={{
                        ...barber,
                        // ✅ TRADUÇÃO APLICADA
                        role: translateRole(barber.role),
                        specialty: translateRole(barber.specialty)
                    }}
                    isSelected={selectedBarberId === barber.id}
                    onSelect={handleChooseBarber}
                />
            ))}
        </div>
    );
    
    // Retorno do componente
    if (loading) { return <div className={styles['loading-message']}>A carregar barbeiros...</div>; }
    if (error) { return <div className={styles['error-message']}>{error}</div>; }
    
    // Mensagem de estado vazio (se não houver barbeiros e não for erro)
    if (barbers.length === 0) {
        return (
            <div className={styles['step-content-empty']}>
                <h4 className={styles['step-title']}>Escolhe o teu barbeiro</h4>
                <p className={styles['empty-message']}>Nenhum barbeiro disponível no momento.</p>
                {/* O botão "Sem Preferência" ainda pode ser útil aqui para prosseguir */}
                 <button
                    onClick={handleNoPreference}
                    className={`${styles['no-preference-button']} ${selectedBarberId === null ? styles['selected'] : ''}`}
                >
                    <span className={styles['no-preference-icon']}><img src="/OlimpoBarBer/icons/blocked.png" alt="Não" /></span> 
                    <span className={styles['no-preference-text']}>Sem preferência</span>
                </button>
            </div>
        );
    }
    
    return (
        // .step-content
        <div className={styles['step-content']}> 
            <h4 className={styles['step-title']}>Escolhe o teu barbeiro</h4> 
            
            <RenderBarbers /> 

            {/* Botão Sem Preferência (Mobile - escondido em SM+) */}
            {/* O desktop tem uma versão diferente, mas podemos deixar a mobile aqui para o layout de grid */}
            <div className={styles['mobile-preference-wrapper']}>
                <button
                    onClick={handleNoPreference}
                    className={`${styles['no-preference-button-mobile']} ${selectedBarberId === null ? styles['selected'] : ''}`}
                >
                    <img src="/barbershop/icons/blocked.png" alt="Sem preferência" className={styles['no-preference-icon-mobile']} />
                    <div className={styles['no-preference-text-mobile']}>Sem preferência</div>
                </button>
            </div>


            {/* BOTÕES DE NAVEGAÇÃO */}
            <div className={styles['desktop-actions']}> 
                {/* Botão Sem Preferência (Desktop) */}
                <button
                    className={`${styles['no-preference-button-desktop']} ${selectedBarberId === null ? styles['selected-ring'] : ''}`}
                    onClick={handleNoPreference}
                >
                    <img src="/OlimpoBarBer/icons/blocked.png" alt="Sem preferência" className={styles['no-preference-icon-desktop']} />
                    <span className={styles['no-preference-text-desktop']}>Sem preferência</span>
                </button>

                {/* Botão Seguinte (Desktop) */}
                {selectionMade && (
                    <button
                        type="button"
                        className={styles['next-button-desktop']} 
                        onClick={onNext}
                    >
                        <span>Seguinte</span>
                        <img src="/OlimpoBarBer/icons/proximo.png" alt="Próximo" className={styles['next-button-icon-desktop']} />
                    </button>
                )}
            </div>
            {/* Botão Seguinte (Mobile - Versão full-width) */}
            {selectionMade && (
                <button onClick={onNext} className={styles['next-button-mobile']}>
                    Seguinte
                </button>
            )}
        </div>
    );
});