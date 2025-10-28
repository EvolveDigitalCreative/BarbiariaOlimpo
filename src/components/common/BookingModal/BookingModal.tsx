// src/components/common/BookingModal/BookingModal.tsx - COMPLETO FINAL COM TODAS AS ETAPAS

import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { ProgressBar } from './ProgressBar';
import { ChooseBarberStep } from './ChooseBarberStep';
import { ChooseServiceStep } from './ChooseServiceStep';
import { ChooseDateTimeStep } from './ChooseDateTimeStep';
import { ReviewConfirmStep } from './ReviewConfirmStep'; // Etapa 4
import { BookingSuccessStep } from './BookingSuccessStep'; // Etapa 5

import styles from './BookingModal.module.css';

// Tipagem para os dados coletados
type BookingData = {
    barberId?: string;
    serviceId?: string;
    date?: string;
    time?: string;
};

interface BookingModalProps {
    isOpen: boolean;
    onClose: () => void;
    preselectedBarberId?: string;
    // initialBarbers?: any[]; // Opcional
    // initialServices?: any[]; // Opcional
}

export function BookingModal({
    isOpen,
    onClose,
    preselectedBarberId,
    /* initialBarbers, initialServices */
}: BookingModalProps) {
    const initialStep = preselectedBarberId ? 2 : 1;
    const [step, setStep] = useState(initialStep);
    const [data, setData] = useState<BookingData>({ barberId: preselectedBarberId });
    const [loadingConfirm, setLoadingConfirm] = useState(false);
    const [errorConfirm, setErrorConfirm] = useState('');

    // Efeito para fechar com ESC
    useEffect(() => {
        if (!isOpen) return;
        const onKey = (e: KeyboardEvent) => e.key === 'Escape' && handleClose();
        document.addEventListener('keydown', onKey);
        return () => document.removeEventListener('keydown', onKey);
    }, [isOpen, onClose]);

    // Reseta ao abrir ou mudar pré-seleção
    useEffect(() => {
        if (isOpen) {
            const resetStep = preselectedBarberId ? 2 : 1;
            setStep(resetStep);
            setData(preselectedBarberId ? { barberId: preselectedBarberId } : {});
            setLoadingConfirm(false); setErrorConfirm('');
        }
    }, [preselectedBarberId, isOpen]);

    // Funções de controle (memoized)
    const handleClose = useCallback(() => { onClose(); }, [onClose]);
    const handleChange = useCallback((patch: Partial<BookingData>) => { setData((d) => ({ ...d, ...patch })); }, []);
    const handleNext = useCallback(() => setStep((s) => Math.min(5, s + 1)), []); // Limite é 5 agora
    const handleBack = useCallback(() => setStep((s) => Math.max(1, s - 1)), []); // Mínimo é 1

    // Função de Confirmação (Etapa 4 -> 5)
    const handleConfirm = useCallback(async (formData: { name: string; email: string; phone: string }) => {
        setLoadingConfirm(true); setErrorConfirm('');
        console.log("Confirmando marcação:", data, formData);
        try {
            // --- LÓGICA REAL DE SALVAR NO FIREBASE E TRIGGER EMAIL AQUI ---
            // Ex: await saveAppointmentToFirebase(data, formData); 
            // Ex: await triggerConfirmationEmail(data, formData, appUser); // Passa dados do usuário logado
            
            await new Promise(r => setTimeout(r, 1500)); // Simula espera
            console.log("Marcação confirmada (simulação)");
            handleNext(); // Vai para a tela de sucesso (etapa 5)

        } catch (err: any) {
             setErrorConfirm(err.message || 'Erro ao confirmar. Tente novamente.');
             console.error("Erro na confirmação:", err);
        } finally {
            setLoadingConfirm(false);
        }
    }, [data, handleNext]); // Inclui 'handleNext' como dependência

    // Renderiza o conteúdo da etapa atual
    const stepContent = useMemo(() => {
        switch (step) {
            case 1:
                return <ChooseBarberStep data={data} onChange={handleChange} onNext={handleNext} />;
            case 2:
                return <ChooseServiceStep data={data} onChange={handleChange} onNext={handleNext} onBack={handleBack} />;
            case 3:
                return <ChooseDateTimeStep data={data} onChange={handleChange} onNext={handleNext} onBack={handleBack} />;
            case 4:
                 // Passa a função handleConfirm correta
                return <ReviewConfirmStep
                            data={data}
                            onBack={handleBack}
                            onConfirm={handleConfirm} 
                            loading={loadingConfirm}
                            error={errorConfirm}
                        />;
            // ✅ CASE 5 CORRETO
            case 5:
                 // Passa a função handleClose como onExit
                return <BookingSuccessStep data={data} onExit={handleClose} />; 
            default: // Fallback
                 return ( <div style={{ textAlign: 'center', padding: '50px', color: '#777' }}>Etapa Inválida</div> );
        }
    }, [step, data, loadingConfirm, errorConfirm, handleChange, handleNext, handleBack, handleConfirm, handleClose]); // Todas as funções handler como dependências

    if (!isOpen) return null;

    return (
        <div className={styles['modal-overlay']} onClick={handleClose}>
            <div className={styles['modal-wrapper']}>
                <div className={styles['modal-content']} onClick={(e) => e.stopPropagation()}>
                    <div className={styles['modal-padding-wrapper']}>
                        <div className={styles['modal-header']}>
                            {/* Botão Voltar */}
                            <div className={styles['header-button-placeholder']}>
                                {step > initialStep && step < 5 && ( // Aparece nas etapas 2, 3, 4 (se initialStep=1)
                                    <button aria-label="Voltar" onClick={handleBack} className={styles['back-button']}>
                                        <img src="/OlimpoBarBer/icons/seta.png" alt="Voltar" />
                                    </button>
                                )}
                            </div>
                            {/* Título */}
                            <h1 className={styles['modal-title']}>{step === 5 ? 'MARCAÇÃO' : 'MARCAÇÕES'}</h1>
                            {/* Botão Fechar */}
                            <div className={styles['header-button-placeholder']}>
                                {step < 5 && ( // Não aparece na tela de Sucesso
                                    <button aria-label="Fechar" onClick={handleClose} className={styles['close-button']}>
                                        <img src="/OlimpoBarBer/icons/close.png" alt="Fechar" />
                                    </button>
                                )}
                            </div>
                        </div>

                        {/* Barra de Progresso */}
                        {step < 5 && ( // Não aparece na tela de Sucesso
                            <div className={styles['progress-wrapper']}>
                                <ProgressBar
                                    step={step}
                                    total={4} // Total steps *antes* do sucesso
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