// src/components/common/BookingModal/BookingSuccessStep.tsx - COMPLETO ATUALIZADO

import React, { useState, useEffect } from 'react';
import { auth, db } from '../../../services/firebaseConfig'; // Verifique o caminho
import type { User } from 'firebase/auth'; // Importa o tipo User
import { doc, getDoc } from 'firebase/firestore';
// Importa as interfaces necessárias (ajuste o caminho se necessário)
import type { Barber, Service } from '../../../types'; 
import styles from './BookingModal.module.css';

// Define AppUser localmente
interface AppUser {
    uid: string;
    nome?: string;
    sobrenome?: string;
    email?: string;
    telefone?: string;
    role?: string;
}

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
        const d = new Date(`${date}T00:00:00`); // Usa T00:00 para evitar problemas de fuso
        const label = d.toLocaleDateString('pt-PT', { day: '2-digit', month: 'long', year: 'numeric' });
        return time ? `${label}, ${time}` : label;
    } catch (e) {
        console.error("Erro ao formatar data:", e);
        return `${date || ''}${time ? `, ${time}`: ''}`; // Fallback
    }
}

// Ícone de Checkmark (Check) em SVG
const SuccessCheckIcon = () => (
    <svg 
        className={styles['success-icon-svg']}
        viewBox="0 0 24 24" 
        fill="none" 
        xmlns="http://www.w3.org/2000/svg"
    >
        <path 
            d="M12 2C6.48 2 2 6.48 2 12C2 17.52 6.48 22 12 22C17.52 22 22 17.52 22 12C22 6.48 17.52 2 12 2ZM10 17L5 12L6.41 10.59L10 14.17L17.59 6.58L19 8L10 17Z" 
            fill="black"
        />
    </svg>
);


export function BookingSuccessStep({ data, onExit }: Props) {
    // Estados para dados buscados
    const [barber, setBarber] = useState<Barber | null>(null);
    const [serviceName, setServiceName] = useState<string>('Serviço');
    const [loading, setLoading] = useState(true);
    // ❌ REMOVIDO: firebaseUser, appUser, emailStatus (não são mais necessários para este design)

    // Busca dados (simplificado)
    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            try {
                 // Barbeiro
                 if (data.barberId) {
                    const barberRef = doc(db, 'users', data.barberId); 
                    const barberSnap = await getDoc(barberRef);
                    if (barberSnap.exists()) setBarber({ id: barberSnap.id, ...barberSnap.data() } as Barber);
                 } else { setBarber(null); }
                
                // Serviço
                if (data.serviceId) {
                    const serviceRef = doc(db, 'services', data.serviceId);
                    const serviceSnap = await getDoc(serviceRef);
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
                <img src="/barbershop/icons/sucess.png" alt="Sucesso" className={styles['success-icon']} /> 
                {/* ❌ REMOVIDO: Status do Email */}

 {/* ✅ Resumo da Marcação - ESTRUTURA JÁ ESTÁ CORRETA (Serviço primeiro) */}
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
                        {/* Ícone */}
                        <div className={styles['summary-icon-wrapper']}>
                            <img src="/barbershop/icons/OlimpoBarber.png" alt="Olimpo" className={styles['summary-icon']} />
                        </div>
                    </div>
                </div>

                {/* Botão Sair (Reutiliza estilo do .confirm-button) */}
                <div className={styles['confirm-button-wrapper']}>
                    <button 
                        onClick={onExit} 
                        className={`${styles['confirm-button']} ${styles['exit-button']}`}
                    >
                        Sair
                    </button>
                </div>

            </div>

            {/* ❌ REMOVIDO: Botão Sair Mobile Fixo (o botão acima agora é centralizado) */}
        </div>
    );
}

