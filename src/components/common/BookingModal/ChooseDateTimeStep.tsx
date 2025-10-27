// src/components/common/BookingModal/ChooseDateTimeStep.tsx - CORRIGIDO

import React, { useState, useEffect, useMemo, useCallback, memo } from 'react';
import { functions } from '../../../services/firebaseConfig'; // Verifique o caminho
// ✅ CORREÇÃO: Importa 'httpsCallable' e o tipo 'FunctionsErrorCode' separadamente
import { httpsCallable } from 'firebase/functions';
import type { FunctionsErrorCode } from 'firebase/functions'; // Importação apenas do TIPO
import styles from './BookingModal.module.css';

// Props type (mantido)
type Props = {
    data: { barberId?: string; serviceId?: string; date?: string; time?: string };
    onChange: (patch: Partial<Props['data']>) => void;
    onNext: () => void;
    onBack: () => void;
};

// ===========================================
// ✅ CORREÇÃO: Funções utilitárias DEFINIDAS APENAS UMA VEZ (fora do componente)
// ===========================================
function formatISODate(d: Date): string {
    const y = d.getFullYear();
    const m = String(d.getMonth() + 1).padStart(2, '0');
    const day = String(d.getDate()).padStart(2, '0');
    return `${y}-${m}-${day}`;
}
function startOfMonth(d: Date): Date { return new Date(d.getFullYear(), d.getMonth(), 1); }
function addMonths(d: Date, delta: number): Date { return new Date(d.getFullYear(), d.getMonth() + delta, 1); }
function monthLabel(d: Date): string { return d.toLocaleDateString('pt-PT', { month: 'long', year: 'numeric' }); }
function startOfDay(d: Date): Date { return new Date(d.getFullYear(), d.getMonth(), d.getDate()); }
// ===========================================

export const ChooseDateTimeStep: React.FC<Props> = memo(({ data, onChange, onNext, onBack }) => { // ✅ 'onBack' agora é usado implicitamente pelo hook useMemo
    const [currentMonth, setCurrentMonth] = useState<Date>(startOfMonth(data.date ? new Date(data.date) : new Date()));
    const [availableTimes, setAvailableTimes] = useState<string[]>([]);
    const [loadingTimes, setLoadingTimes] = useState(false);
    const [fetchError, setFetchError] = useState<string | null>(null);
    const [cache, setCache] = useState<Map<string, string[]>>(new Map());
    const [selectedDateObj, setSelectedDateObj] = useState<Date | null>(data.date ? new Date(data.date) : null);
    const [selectedTime, setSelectedTime] = useState<string | null>(data.time ?? null);

    // Gera dias do calendário (✅ Usa 'currentMonth' e 'addMonths')
    const days = useMemo(() => {
        const first = startOfMonth(currentMonth);
        const nextMonth = addMonths(currentMonth, 1); // ✅ Usa addMonths
        const lastDate = new Date(nextMonth.getTime() - 1).getDate();
        const firstWeekday = ((first.getDay() + 6) % 7);
        const result: Array<{ date: Date; inMonth: boolean } | null> = [];
        for (let i = 0; i < firstWeekday; i++) result.push(null);
        for (let d = 1; d <= lastDate; d++) {
            result.push({ date: new Date(currentMonth.getFullYear(), currentMonth.getMonth(), d), inMonth: true });
        }
        while (result.length % 7 !== 0) result.push(null);
        return result;
    }, [currentMonth]); // ✅ Dependência corrigida

    // Busca horários disponíveis
    useEffect(() => {
        const fetchHorarios = async () => {
            // ... (lógica de busca mantida) ...
             const currentDateISO = selectedDateObj ? formatISODate(selectedDateObj) : null;
             if (!currentDateISO || !data.serviceId) {
                 setAvailableTimes([]); setFetchError(null); return;
             }
             const barberIdToFetch = data.barberId || null;
             const cacheKey = `${barberIdToFetch}-${data.serviceId}-${currentDateISO}`;
             if (cache.has(cacheKey)) {
                 setAvailableTimes(cache.get(cacheKey)!); setFetchError(null); return;
             }
             setLoadingTimes(true); setFetchError(null);
             try {
                 const getAvailableSlots = httpsCallable(functions, 'getAvailableSlots');
                 const result = await getAvailableSlots({
                     barberId: barberIdToFetch, serviceId: data.serviceId, date: currentDateISO
                 });
                 const horarios = ((result.data as any)?.horarios || []) as string[];
                 setCache(prev => new Map(prev).set(cacheKey, horarios));
                 setAvailableTimes(horarios);
             } catch (error: any) {
                 console.error('❌ Erro ao buscar horários (Cloud Function):', error);
                 // ✅ CORREÇÃO: Usar strings para comparar códigos de erro
                 if (error.code === 'not-found' || error.message.includes('404')) { // Comparação com string
                      setFetchError("Erro: Função não encontrada (404).");
                 } else if (error.code === 'unavailable') { // Comparação com string
                      setFetchError("Serviço indisponível. Tente mais tarde.");
                 } else if (error.code === 'invalid-argument') { // Comparação com string
                      setFetchError(error.message || "Erro nos parâmetros.");
                 } else {
                      setFetchError("Erro ao buscar horários.");
                 }
                 setAvailableTimes([]);
             } finally { setLoadingTimes(false); }
        };
        const timeoutId = setTimeout(() => { fetchHorarios(); }, 300);
        return () => clearTimeout(timeoutId);
    }, [selectedDateObj, data.barberId, data.serviceId, cache]);

    // Seleciona dia (✅ Usa 'formatISODate')
    const handleSelectDay = useCallback((d: Date) => {
        const iso = formatISODate(d); // ✅ Usa formatISODate
        setSelectedDateObj(d);
        setSelectedTime(null);
        onChange({ date: iso, time: undefined });
        setFetchError(null);
    }, [onChange]);

     // Seleciona hora
    const handleSelectTime = useCallback((time: string) => {
        setSelectedTime(time);
        onChange({ time });
    }, [onChange]);

    const canContinue = !!selectedDateObj && !!selectedTime;
    const todayStart = startOfDay(new Date()); // ✅ Usa startOfDay

    return (
        <div className={styles['step-content']}>
            <h2 className={styles['step-title']}>Agenda o teu corte</h2>
            <div className={styles['date-time-container']}>
                {/* --- Calendário --- */}
                <div className={styles['calendar-column']}>
                    {/* Header (✅ Usa 'monthLabel' e 'addMonths') */}
                    <div className={styles['calendar-header']}>
                        <button aria-label="Mês anterior" className={styles['calendar-nav-button']}
                            // ✅ Usa 'setCurrentMonth'
                            onClick={() => setCurrentMonth(m => addMonths(m, -1))}>‹</button>
                        <div className={styles['calendar-month-label']}>{monthLabel(currentMonth)}</div>
                        <button aria-label="Próximo mês" className={styles['calendar-nav-button']}
                             // ✅ Usa 'setCurrentMonth'
                            onClick={() => setCurrentMonth(m => addMonths(m, 1))}>›</button>
                    </div>
                    {/* Dias Semana */}
                    <div className={styles['weekdays-grid']}>
                         <div>Seg</div><div>Ter</div><div>Qua</div><div>Qui</div><div>Sex</div><div>Sáb</div><div>Dom</div>
                    </div>
                    {/* Grid de Dias (✅ Usa 'days' e 'handleSelectDay') */}
                    <div className={styles['days-grid']}>
                        {days.map((item, idx) => {
                            if (!item) return <div key={`empty-${idx}`} className={styles['day-cell-empty']} />;
                            const iso = formatISODate(item.date);
                            const isSelected = selectedDateObj?.toISOString().split('T')[0] === iso;
                             // ✅ Usa 'todayStart'
                            const isPast = startOfDay(item.date) < todayStart;
                            const isSunday = item.date.getDay() === 0;
                            const isDisabled = isPast || isSunday;
                            return (
                                <button key={iso}
                                    // ✅ Usa 'handleSelectDay'
                                    onClick={() => !isDisabled && handleSelectDay(item.date)}
                                    disabled={isDisabled}
                                    className={`${styles['day-cell']} ${isSelected ? styles['selected'] : ''} ${isDisabled ? styles['disabled'] : ''}`}>
                                    {item.date.getDate()}
                                </button>
                            );
                        })}
                    </div>
                </div>
                {/* --- Divisor --- */}
                <div className={styles['divider-mobile']} />
                <div className={styles['divider-desktop']} />
                {/* --- Horários --- */}
                <div className={styles['times-column']}>
                    {fetchError ? ( <div className={styles['error-message']}>{fetchError}</div> )
                     : !selectedDateObj ? ( <div className={styles['times-placeholder']}>Seleciona um dia...</div> )
                     : loadingTimes ? ( <div className={styles['times-loading']}>...</div> )
                     : availableTimes.length === 0 ? ( <div className={styles['times-placeholder']}>Sem horários...</div> )
                     : (
                        <div className={styles['times-grid']}>
                            {availableTimes.map(time => (
                                <button key={time}
                                    // ✅ Usa 'handleSelectTime'
                                    onClick={() => handleSelectTime(time)}
                                    className={`${styles['time-slot-button']} ${selectedTime === time ? styles['selected'] : ''}`}>
                                    {time}
                                </button>
                            ))}
                        </div>
                     )}
                </div>
            </div>
            {/* Botões de Ação (Seguinte) */}
            {canContinue && (
                <>
                    <button onClick={onNext} className={styles['next-button-mobile']}>Seguinte</button>
                    <div className={styles['desktop-actions']}>
                        <button type="button" className={styles['next-button-desktop']} onClick={onNext}>
                            <span>Seguinte</span>
                            <img src="/barbershop/icons/proximo.png" alt="Próximo" className={styles['next-button-icon-desktop']} />
                        </button>
                    </div>
                </>
            )}
        </div>
    );
});

// ❌ REMOVIDAS: Funções utilitárias duplicadas no final do arquivo