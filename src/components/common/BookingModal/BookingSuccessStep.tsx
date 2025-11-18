// ❌ CORREÇÃO: Removido 'React' da importação
import { useState, useEffect } from 'react';
import { db } from '../../../services/firebaseConfig';
import { doc, getDoc } from 'firebase/firestore';
import type { Barber } from '../../../types';
import styles from './BookingModal.module.css';

// Props type (baseado no código fonte)
type Props = {
    data: { barberId?: string; serviceId?: string; date?: string; time?: string };
    onExit: () => void; // Função para fechar o modal
};

// Nomes de serviço (Fallback)
const SERVICE_NAMES: Record<string, string> = {
    '1': 'Corte Simples',
    '2': 'Corte e Barba',
    '3': 'Barba',
    '4': 'Disfarce',
};

// Formata Data/Hora (Função auxiliar)
function formatDateLabel(date?: string, time?: string): string {
    if (!date) return '—';
    try {
        // Usa T00:00 para evitar problemas de fuso quando a data é só o dia
        const d = new Date(`${date}T00:00:00`);
        // Formatação mais robusta para incluir o dia da semana
        const label = d.toLocaleDateString('pt-PT', { weekday: 'long', day: '2-digit', month: 'long', year: 'numeric' });
        return time ? `${label}, ${time}` : label;
    } catch (e) {
        console.error("Erro ao formatar data:", e);
        return `${date || ''}${time ? `, ${time}` : ''}`; // Fallback
    }
}


export function BookingSuccessStep({ data, onExit }: Props) {
    // Estados para dados buscados
    const [barber, setBarber] = useState<Barber | null>(null);
    const [serviceName, setServiceName] = useState<string>('Serviço');
    const [loading, setLoading] = useState(true);

    // Busca dados (simplificado)
    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            try {
                // Barbeiro
                if (data.barberId) {
                    const barberRef = doc(db, 'users', data.barberId);
                    const barberSnap = await getDoc(barberRef);
                    // Assumindo que Barber é a mesma estrutura de User com role='barber'
                    if (barberSnap.exists()) setBarber({ id: barberSnap.id, ...barberSnap.data() } as Barber);
                } else { setBarber(null); }

                // Serviço
                if (data.serviceId) {
                    const serviceRef = doc(db, 'services', data.serviceId);
                    const serviceSnap = await getDoc(serviceRef);
                    // Tenta usar o nome do doc, senão usa o fallback
                    setServiceName(serviceSnap.exists() ? serviceSnap.data()?.nome : SERVICE_NAMES[data.serviceId] ?? 'Serviço');
                }
            } catch (error) {
                console.error("Erro ao buscar dados para tela de sucesso:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, [data.barberId, data.serviceId]); // Dependências


    const displayBarberName = barber?.name?.toUpperCase() ?? 'SEM PREFERÊNCIA';

    if (loading) {
        return <div className={styles['loading-message']}>A carregar...</div>;
    }

    return (
        // .booking-success-container
        <div className={styles['booking-success-container']}>
            {/* .content-wrapper */}
            <div className={styles['content-wrapper']}>

                {/* Títulos Atualizados */}
                <p className={styles['success-message-large']}>Marcação registada.</p>
                <p className={styles['success-thank-you']}>Obrigado!</p>

                {/* Ícone de Sucesso */}
                <img src="/OlimpoBarBer/icons/sucess.png" alt="Sucesso" className={styles['success-icon']} />

                {/* ✅ Resumo da Marcação */}
                <div className={styles['summary-container']}>
                    <div className={`${styles['summary-card-review']} ${styles['summary-card-success']}`}>
                        <div className={styles['summary-details']}>
                            {/* 1. CORTE ESCOLHIDO */}
                            <div className={styles['summary-service']}>{serviceName}</div>
                            {/* 2. BARBEIRO ESCOLHIDO */}
                            <div className={styles['summary-barber']}>{displayBarberName}</div>
                            {/* 3. DATA E HORA */}
                            <div className={styles['summary-datetime']}>{formatDateLabel(data.date, data.time)}</div>
                        </div>
                        {/* Ícone Olimpo */}
                        <div className={styles['summary-icon-wrapper']}>
                            <img src="/OlimpoBarBer/icons/OlimpoBarber_optimized.png" alt="Olimpo" className={styles['summary-icon']} />
                        </div>
                    </div>
                </div>

                {/* Botão Sair */}
                <div className={styles['confirm-button-wrapper']}>
                    <button
                        onClick={onExit}
                        className={`${styles['confirm-button']} ${styles['exit-button']}`}
                    >
                        Sair
                    </button>
                </div>

            </div>
        </div>
    );
}