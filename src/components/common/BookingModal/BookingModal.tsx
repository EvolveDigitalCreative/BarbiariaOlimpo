// src/components/common/BookingModal/BookingModal.tsx - COMPLETO E ATUALIZADO COM STEP 3

import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { ProgressBar } from './ProgressBar';
import { ChooseBarberStep } from './ChooseBarberStep';
import { ChooseServiceStep } from './ChooseServiceStep';
import { ChooseDateTimeStep } from './ChooseDateTimeStep'; // ✅ Importado Step 3
// Importe os outros steps quando criá-los
// import { ReviewConfirmStep } from './ReviewConfirmStep';
// import { BookingSuccessStep } from './BookingSuccessStep';

import styles from './BookingModal.module.css';

// Tipagem para os dados coletados durante as etapas
type BookingData = {
    barberId?: string;
    serviceId?: string;
    date?: string;
    time?: string;
};

interface BookingModalProps {
    isOpen: boolean;
    onClose: () => void;
    preselectedBarberId?: string; // Para pré-selecionar
    // Adicione initialBarbers e initialServices se tiver pré-carregamento
    // initialBarbers?: any[];
    // initialServices?: any[];
}

export function BookingModal({
    isOpen,
    onClose,
    preselectedBarberId,
    /* initialBarbers, initialServices */
}: BookingModalProps) {
    // Estado da etapa inicial, considera preselectedBarberId
    const initialStep = preselectedBarberId ? 2 : 1;
    const [step, setStep] = useState(initialStep);
    // Estado dos dados da marcação, inicializa com preselectedBarberId se houver
    const [data, setData] = useState<BookingData>({ barberId: preselectedBarberId });

    // Estados de loading/error para a confirmação
    const [loadingConfirm, setLoadingConfirm] = useState(false);
    const [errorConfirm, setErrorConfirm] = useState('');

    // Efeito para fechar com ESC
    useEffect(() => {
        if (!isOpen) return;
        const onKey = (e: KeyboardEvent) => e.key === 'Escape' && handleClose();
        document.addEventListener('keydown', onKey);
        return () => document.removeEventListener('keydown', onKey);
    }, [isOpen, onClose]);

    // Reseta a etapa e os dados se preselectedBarberId mudar ou ao reabrir
    useEffect(() => {
        if (isOpen) { // Reset only when opening or preselection changes while open
            const resetStep = preselectedBarberId ? 2 : 1;
            setStep(resetStep);
            setData(preselectedBarberId ? { barberId: preselectedBarberId } : {});
            setLoadingConfirm(false);
            setErrorConfirm('');
        }
    }, [preselectedBarberId, isOpen]);


    // Fechar e resetar o modal (memoized)
    const handleClose = useCallback(() => {
        onClose();
        // Resetting state is handled by the useEffect above when isOpen becomes true again
    }, [onClose]);

    // Atualiza os dados (memoized)
    const handleChange = useCallback((patch: Partial<BookingData>) => {
        setData((d) => ({ ...d, ...patch }));
    }, []);

    // Avança para a próxima etapa (memoized)
    const handleNext = useCallback(() => setStep((s) => Math.min(5, s + 1)), []); // Assuming 5 steps total

    // Volta para a etapa anterior (memoized)
    const handleBack = useCallback(() => setStep((s) => Math.max(1, s - 1)), []); // Step 1 is the minimum

    // Confirma a marcação (lógica placeholder, memoized)
    const handleConfirm = useCallback(async (formData: { name: string; email: string; phone: string }) => {
        setLoadingConfirm(true); setErrorConfirm('');
        console.log("Confirmando marcação com dados:", data, "e formulário:", formData);
        try {
            await new Promise(r => setTimeout(r, 1000)); // Simulate API call
            // await saveAppointmentToFirebase(data, formData);
            // await triggerConfirmationEmail(data, formData);
            handleNext(); // Go to success step (5)
        } catch (err: any) {
             setErrorConfirm(err.message || 'Erro ao confirmar. Tente novamente.');
             console.error("Erro na confirmação:", err);
        } finally {
            setLoadingConfirm(false);
        }
    }, [data, handleNext]); // Depends on `data` and `handleNext`

    // Renderiza o conteúdo da etapa atual
    const stepContent = useMemo(() => {
        switch (step) {
            case 1:
                return <ChooseBarberStep data={data} onChange={handleChange} onNext={handleNext} /* initialBarbers={initialBarbers} */ />;
            case 2:
                return <ChooseServiceStep data={data} onChange={handleChange} onNext={handleNext} onBack={handleBack} /* initialServices={initialServices} */ />;
            // ✅ ADICIONADO CASE 3
            case 3:
                return <ChooseDateTimeStep data={data} onChange={handleChange} onNext={handleNext} onBack={handleBack} />;
            // ADICIONE OS OUTROS CASES AQUI
            // case 4: return <ReviewConfirmStep data={data} onBack={handleBack} onConfirm={handleConfirm} loading={loadingConfirm} error={errorConfirm} />;
            // case 5: return <BookingSuccessStep data={data} onExit={handleClose} />;
            default: // Placeholder para etapas futuras
                 return (
                     <div style={{ textAlign: 'center', padding: '50px', color: '#777' }}>
                         Etapa {step} - Conteúdo a ser implementado.
                         <div style={{marginTop: '20px'}}>
                             {step > 1 && <button onClick={handleBack} style={{marginRight: '10px', padding: '10px 15px'}}>Voltar</button>}
                             {step < 5 && <button onClick={handleNext} style={{padding: '10px 15px'}}>Seguinte (Teste)</button>}
                             {step === 5 && <button onClick={handleClose} style={{padding: '10px 15px'}}>Sair</button>}
                         </div>
                     </div>
                 );
        }
     // Dependências: step, data, loading/error states, and the handler functions
    }, [step, data, loadingConfirm, errorConfirm, handleChange, handleNext, handleBack, handleConfirm, handleClose]);

    if (!isOpen) return null;

    return (
        <div className={styles['modal-overlay']} onClick={handleClose}>
            <div className={styles['modal-wrapper']}>
                <div className={styles['modal-content']} onClick={(e) => e.stopPropagation()}>
                    <div className={styles['modal-padding-wrapper']}>
                        <div className={styles['modal-header']}>
                            {/* Botão Voltar */}
                            <div className={styles['header-button-placeholder']}>
                                {/* Show back button if not on the initial step and not on success step */}
                                {step > initialStep && step < 5 && (
                                    <button aria-label="Voltar" onClick={handleBack} className={styles['back-button']}>
                                        <img src="public/OlimpoBarBer/icons/seta.png" alt="Voltar" />
                                    </button>
                                )}
                            </div>
                            {/* Título */}
                            <h1 className={styles['modal-title']}>{step === 5 ? 'MARCAÇÃO' : 'MARCAÇÕES'}</h1>
                            {/* Botão Fechar */}
                            <div className={styles['header-button-placeholder']}>
                                {step < 5 && (
                                    <button aria-label="Fechar" onClick={handleClose} className={styles['close-button']}>
                                        <img src="public/OlimpoBarBer/icons/close.png" alt="Fechar" />
                                    </button>
                                )}
                            </div>
                        </div>

                        {/* Barra de Progresso */}
                        {step < 5 && (
                            <div className={styles['progress-wrapper']}>
                                <ProgressBar
                                    step={step}
                                    total={4} // Total steps before success
                                    startStep={initialStep} // Start from 1 or 2 depending on preselection
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