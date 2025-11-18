import React, { useState, useEffect, useMemo, useCallback } from 'react';
// Importa o HOOK REAL:
import { useAuth } from '../../../context/AuthContext'; 

// Componentes internos
import { ProgressBar } from './ProgressBar';
import { ChooseBarberStep } from './ChooseBarberStep';
import { ChooseServiceStep } from './ChooseServiceStep';
import { ChooseDateTimeStep } from './ChooseDateTimeStep';
import { ReviewConfirmStep } from './ReviewConfirmStep';
import { BookingSuccessStep } from './BookingSuccessStep';

import styles from './BookingModal.module.css';

// 🎯 Importa as funções/tipos do admin.ts
import { createAppointment, type CreateAppointmentData } from '../../../services/admin';

// --- MOCK DATA PARA ENRIQUECIMENTO DE DADOS (Manter, mas remover o useAuth mock) ---
const MOCK_SERVICES = [
    { id: 'corte-completo', name: 'Corte Completo', durationMinutes: 45, price: 15.00 },
    { id: 'corte-barba', name: 'Corte + Barba', durationMinutes: 60, price: 25.00 },
];
const MOCK_BARBERS = [
    { id: 'barber-1', name: 'João', role: 'barber', specialty: 'Hair' },
    { id: 'barber-2', name: 'Pedro', role: 'barber', specialty: 'Barba' },
];

// Tipagem para os dados coletados (Estado local)
type BookingData = {
    barberId?: string;
    serviceId?: string;
    date?: string; // Formato YYYY-MM-DD
    time?: string; // Formato HH:MM
};

interface BookingModalProps {
    isOpen: boolean;
    onClose: () => void;
    preselectedBarberId?: string;
}

export function BookingModal({
    isOpen,
    onClose,
    preselectedBarberId,
}: BookingModalProps) {
    // ✅ LIGAÇÃO AO HOOK REAL: Obtém o estado real do utilizador e carregamento
    const { currentUser, loading } = useAuth();
    
    // Dados derivados do utilizador real
    const isAuthenticated = !!currentUser;
    const userId = currentUser?.uid; // 👈 O ID REAL PARA O FIREBASE
    
    // Estado do Modal
    const initialStep = preselectedBarberId ? 2 : 1;
    const [step, setStep] = useState(initialStep);
    const [data, setData] = useState<BookingData>({ barberId: preselectedBarberId });
    const [loadingConfirm, setLoadingConfirm] = useState(false);
    const [errorConfirm, setErrorConfirm] = useState('');

    // Efeitos (Mantidos)
    useEffect(() => {
        if (!isOpen) return;
        const onKey = (e: KeyboardEvent) => e.key === 'Escape' && handleClose();
        document.addEventListener('keydown', onKey);
        return () => document.removeEventListener('keydown', onKey);
    }, [isOpen, onClose]);

    useEffect(() => {
        if (isOpen) {
            const resetStep = preselectedBarberId ? 2 : 1;
            setStep(resetStep);
            setData(preselectedBarberId ? { barberId: preselectedBarberId } : {});
            setLoadingConfirm(false); setErrorConfirm('');
        }
    }, [preselectedBarberId, isOpen]);

    // Funções de controle (Mantidas)
    const handleClose = useCallback(() => { onClose(); }, [onClose]);
    const handleChange = useCallback((patch: Partial<BookingData>) => { setData((d) => ({ ...d, ...patch })); }, []);
    const handleNext = useCallback(() => setStep((s) => Math.min(5, s + 1)), []);
    const handleBack = useCallback(() => setStep((s) => Math.max(1, s - 1)), []);

    // Enriquecimento de Dados (Mantido)
    const enrichedData = useMemo(() => {
        const selectedService = MOCK_SERVICES.find(s => s.id === data.serviceId);
        const selectedBarber = MOCK_BARBERS.find(b => b.id === data.barberId);

        const dateTimeString = data.date && data.time ? `${data.date}T${data.time}:00` : '';
        const dateTimeTimestamp = dateTimeString ? new Date(dateTimeString).getTime() : 0;

        return {
            serviceName: selectedService?.name || 'Serviço Desconhecido',
            barberName: selectedBarber?.name || 'Barbeiro N/A',
            price: selectedService?.price || 0,
            duration: selectedService?.durationMinutes || 30,
            dateTimeTimestamp: dateTimeTimestamp,
        };
    }, [data.serviceId, data.barberId, data.date, data.time]);

    // Função de Confirmação (AJUSTADA)
    const handleConfirm = useCallback(async (formData: { name: string; email: string; phone: string }) => {
        
        // 🛑 VERIFICAÇÃO CRUCIAL: Deve estar autenticado E ter um userId (UID)
        if (!isAuthenticated || !userId || !data.barberId || !data.serviceId || !enrichedData.dateTimeTimestamp) {
            setErrorConfirm('Dados de agendamento incompletos ou usuário não autenticado.');
            return;
        }

        setLoadingConfirm(true); setErrorConfirm('');

        try {
            const appointmentData: CreateAppointmentData = {
                userId: userId, // ✅ ENVIA O UID REAL, SATISFAZENDO A REGRA DO FIREBASE
                userName: formData.name,
                userEmail: formData.email,
                userPhone: formData.phone,
                barberId: data.barberId,
                barberName: enrichedData.barberName,
                serviceId: data.serviceId,
                serviceName: enrichedData.serviceName,
                dateTime: enrichedData.dateTimeTimestamp,
                price: enrichedData.price,
                duration: enrichedData.duration,
            };

            await createAppointment(appointmentData);
            handleNext();

        } catch (err: any) {
            setErrorConfirm(err.message || 'Erro ao confirmar. Tente novamente.');
            console.error("Erro na confirmação:", err);
        } finally {
            setLoadingConfirm(false);
        }
    }, [data, enrichedData, userId, isAuthenticated, handleNext]);

    // Renderiza o conteúdo da etapa atual (Mantido)
    const stepContent = useMemo(() => {
        switch (step) {
            case 1:
                return <ChooseBarberStep data={data} onChange={handleChange} onNext={handleNext} />;
            case 2:
                return <ChooseServiceStep data={data} onChange={handleChange} onNext={handleNext} onBack={handleBack} />;
            case 3:
                return <ChooseDateTimeStep data={data} onChange={handleChange} onNext={handleNext} onBack={handleBack} />;
            case 4:
                return <ReviewConfirmStep
                    data={data}
                    enrichedData={enrichedData}
                    onBack={handleBack}
                    onConfirm={handleConfirm}
                    loading={loadingConfirm}
                    error={errorConfirm}
                />;
            case 5:
                return <BookingSuccessStep data={data} onExit={handleClose} />;
            default:
                return (<div style={{ textAlign: 'center', padding: '50px', color: '#777' }}>Etapa Inválida</div>);
        }
    }, [step, data, enrichedData, loadingConfirm, errorConfirm, handleChange, handleNext, handleBack, handleConfirm, handleClose]);

    // 🛑 Bloqueia a renderização se não estiver aberto ou a autenticação estiver a carregar
    if (!isOpen || loading) return null;

    return (
        <div className={styles['modal-overlay']} onClick={handleClose}>
            <div className={styles['modal-wrapper']}>
                <div className={styles['modal-content']} onClick={(e) => e.stopPropagation()}>
                    <div className={styles['modal-padding-wrapper']}>
                        <div className={styles['modal-header']}>
                            {/* Botão Voltar */}
                            <div className={styles['header-button-placeholder']}>
                                {step > initialStep && step < 5 && (
                                    <button aria-label="Voltar" onClick={handleBack} className={styles['back-button']}>
                                        <img src="/OlimpoBarBer/icons/seta.png" alt="Voltar" />
                                    </button>
                                )}
                            </div>
                            {/* Título */}
                            <h1 className={styles['modal-title']}>{step === 5 ? 'MARCAÇÃO' : 'MARCAÇÕES'}</h1>
                            {/* Botão Fechar */}
                            <div className={styles['header-button-placeholder']}>
                                {step < 5 && (
                                    <button aria-label="Fechar" onClick={handleClose} className={styles['close-button']}>
                                        <img src="/OlimpoBarBer/icons/close.png" alt="Fechar" />
                                    </button>
                                )}
                            </div>
                        </div>

                        {/* Barra de Progresso */}
                        {step < 5 && (
                            <div className={styles['progress-wrapper']}>
                                <ProgressBar
                                    step={step}
                                    total={4}
                                    startStep={initialStep}
                                />
                            </div>
                        )}

                        {/* Conteúdo da Etapa Atual */}
                        <div className={styles['modal-body']}>
                            {stepContent}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}