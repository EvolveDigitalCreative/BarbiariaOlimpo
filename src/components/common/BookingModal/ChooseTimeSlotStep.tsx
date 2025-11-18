import React, { useState, useEffect, useCallback, memo } from 'react';
import { format, addDays, startOfWeek, isSameDay, isToday } from 'date-fns';
// 🛠️ CORREÇÃO (Erro 2613): Uso de Named Import { pt }
import { pt } from 'date-fns/locale/pt'; // Para formatar datas em português
import styles from './BookingModal.module.css';
import { calculateAvailableSlots, getWorkingHours, getBookedAppointments, type Service } from '../../../services/schedule'; 

// 🚨 MOCK de Serviço
const MOCK_SERVICE: Service = {
    id: 'corte-completo',
    name: 'Corte Completo',
    durationMinutes: 45, // Duração do serviço em minutos
    price: 15.00,
};

type Props = {
    data: { 
        barberId?: string; // Barbeiro escolhido (ou undefined para qualquer)
        serviceId?: string; // Serviço escolhido
        dateTime?: number; // Timestamp da data/hora selecionada
    };
    serviceDurationMinutes: number; 
    onChange: (patch: Partial<Props['data']>) => void;
    onNext: () => void;
    onPrev: () => void;
};


export const ChooseTimeSlotStep: React.FC<Props> = memo(({ data, serviceDurationMinutes = MOCK_SERVICE.durationMinutes, onChange, onNext, onPrev }) => {
    const [selectedDate, setSelectedDate] = useState<Date>(data.dateTime ? new Date(data.dateTime) : new Date());
    const [availableSlots, setAvailableSlots] = useState<string[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [selectedSlot, setSelectedSlot] = useState<string | null>(data.dateTime ? format(new Date(data.dateTime), 'HH:mm') : null);

    // --- Lógica de Data ---
    const startOfCurrentWeek = startOfWeek(new Date(), { weekStartsOn: 1 }); // Começa na Segunda-feira (1)
    const daysToShow = 7; // Próximos 7 dias
    const dates = Array.from({ length: daysToShow }, (_, i) => addDays(startOfCurrentWeek, i));

    // --- Lógica de Carregamento de Slots ---
    useEffect(() => {
        const fetchAvailability = async () => {
            setLoading(true);
            setError(null);
            
            // 1. Busca Horários de Trabalho (do Barbeiro ou todos)
            const workingHours = await getWorkingHours(data.barberId);

            if (workingHours.length === 0) {
                setAvailableSlots([]);
                setError('Nenhum horário de trabalho definido para o dia ou barbeiro selecionado.');
                setLoading(false);
                return;
            }

            // 2. Busca Marcações Existentes para o dia
            const bookedAppointments = await getBookedAppointments(selectedDate, data.barberId);

            // 3. Calcula Slots
            const slots = calculateAvailableSlots(
                workingHours,
                bookedAppointments,
                serviceDurationMinutes
            );
            
            setAvailableSlots(slots);
            setLoading(false);
        };

        fetchAvailability();
    }, [selectedDate, data.barberId, serviceDurationMinutes]);


    // --- Handlers ---
    
    const handleDateSelect = useCallback((date: Date) => {
        // Limpar o slot selecionado ao mudar de dia
        setSelectedSlot(null); 
        onChange({ dateTime: undefined });
        setSelectedDate(date);
    }, [onChange]);

    const handleSlotSelect = useCallback((time: string) => {
        // Combina a data selecionada com o slot de tempo
        const [hour, minute] = time.split(':').map(Number);
        const selectedDateTime = new Date(selectedDate);
        selectedDateTime.setHours(hour, minute, 0, 0);

        setSelectedSlot(time);
        onChange({ dateTime: selectedDateTime.getTime() }); // Guarda o timestamp (Number)
    }, [selectedDate, onChange]);


    const handleNext = () => {
        if (selectedSlot) {
            onNext();
        } else {
            setError('Por favor, selecione um horário disponível.');
        }
    };

    // --- Renderização ---

    const renderDayButtons = () => (
        <div className={styles['day-selector']}>
            {dates.map((date) => {
                const dayName = format(date, 'EEE', { locale: pt });
                const isSelected = isSameDay(date, selectedDate);
                const isPast = !isToday(date) && date.getTime() < new Date().setHours(0, 0, 0, 0);
                
                // Exclui datas passadas ou indisponíveis
                if (isPast) return null; 

                return (
                    <button
                        key={date.getTime()}
                        onClick={() => handleDateSelect(date)}
                        className={`${styles['day-button']} ${isSelected ? styles['selected'] : ''}`}
                        disabled={isPast} // Desabilitar dias passados (se não excluídos)
                    >
                        <span className={styles['day-name']}>{dayName}</span>
                        <span className={styles['day-number']}>{format(date, 'd')}</span>
                    </button>
                );
            })}
        </div>
    );

    const renderSlotButtons = () => {
        if (loading) {
            return <div className={styles['loading-message']}>A calcular horários...</div>;
        }
        if (error) {
            return <div className={styles['error-message']}>{error}</div>;
        }
        if (availableSlots.length === 0) {
            return (
                <div className={styles['empty-message']}>
                    Nenhum horário disponível para o dia {format(selectedDate, 'dd/MM/yyyy')}. 
                    Tente outro dia ou barbeiro.
                </div>
            );
        }

        return (
            <div className={styles['slot-grid']}>
                {availableSlots.map((time) => {
                    const isSelected = selectedSlot === time;
                    return (
                        <button
                            key={time}
                            onClick={() => handleSlotSelect(time)}
                            className={`${styles['slot-button']} ${isSelected ? styles['selected'] : ''}`}
                        >
                            {time}
                        </button>
                    );
                })}
            </div>
        );
    };

    return (
        <div className={styles['step-content']}>
            <h4 className={styles['step-title']}>Escolhe a Data e Hora</h4>
            
            {renderDayButtons()}
            
            <div className={styles['current-date-display']}>
                {format(selectedDate, 'EEEE, d MMMM', { locale: pt })}
                {data.barberId ? ' | Barbeiro Selecionado' : ' | Sem Preferência'}
            </div>

            {renderSlotButtons()}

            {/* BOTÕES DE NAVEGAÇÃO */}
            <div className={styles['desktop-actions']} style={{ justifyContent: 'space-between' }}>
                <button
                    type="button"
                    className={styles['prev-button']}
                    onClick={onPrev}
                >
                    <img src="/OlimpoBarBer/icons/anterior.png" alt="Anterior" className={styles['prev-button-icon']} />
                    <span>Voltar</span>
                </button>
                
                <button
                    type="button"
                    className={`${styles['next-button-desktop']} ${selectedSlot ? '' : styles['disabled']}`}
                    onClick={handleNext}
                    disabled={!selectedSlot || loading}
                >
                    <span>Seguinte</span>
                    <img src="/OlimpoBarBer/icons/proximo.png" alt="Próximo" className={styles['next-button-icon-desktop']} />
                </button>
            </div>
        </div>
    );
});