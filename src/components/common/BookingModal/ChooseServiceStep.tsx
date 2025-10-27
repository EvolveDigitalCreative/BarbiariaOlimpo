// src/components/common/BookingModal/ChooseServiceStep.tsx - ATUALIZADO COM BOTÃO SEGUINTE IGUAL AO BARBER STEP

import React, { useState, useEffect, useCallback, memo } from 'react';
import { db } from '../../../services/firebaseConfig'; // Ajuste o caminho
import { collection, getDocs, query, where } from 'firebase/firestore';
import type { Service } from '../../../types'; // Ajuste o caminho
import styles from './BookingModal.module.css';

// Props type (sem alterações)
type Props = {
    data: { serviceId?: string };
    onChange: (patch: Partial<Props['data']>) => void;
    onNext: () => void;
    onBack: () => void;
    initialServices?: Service[];
};

// Fallback services (mantido)
const FALLBACK_SERVICES: Service[] = [
    { id: '1', nome: 'Corte Simples', preco: '15', imagem_url: 'public/OlimpoBarBer/cortes/corte simples.png', categoria: 'BARBEARIA' },
    { id: '2', nome: 'Corte e Barba', preco: '25', imagem_url: 'public/OlimpoBarBer/cortes/corte e barba.png', categoria: 'BARBEARIA' },
    { id: '3', nome: 'Barba', preco: '12', imagem_url: 'public/OlimpoBarBer/cortes/barba.png', categoria: 'BARBEARIA' },
    { id: '4', nome: 'Disfarce', preco: '20', imagem_url: 'public/OlimpoBarBer/cortes/disfarce.png', categoria: 'BARBEARIA' },
];

// formatEuroNoTrailing (mantido)
const formatEuroNoTrailing = (value: any): string => {
    const num = typeof value === 'number' ? value : parseFloat(String(value).replace(',', '.'));
    if (!isFinite(num)) return `${value}€`;
    const isInteger = Math.abs(num - Math.trunc(num)) < 1e-9;
    const formattedNum = isInteger ? Math.trunc(num) : num.toFixed(2).replace(/\.?0+$/, '');
    return `${formattedNum}€`;
};


export const ChooseServiceStep: React.FC<Props> = memo(({ data, onChange, onNext, onBack, initialServices }) => {

    const [services, setServices] = useState<Service[]>(initialServices || []);
    const [loading, setLoading] = useState(!initialServices);
    const [error, setError] = useState<string | null>(null);
    const [selectedServiceId, setSelectedServiceId] = useState<string | null>(data.serviceId ?? null);
    // ✅ Estado 'selectionMade' igual ao Barber Step
    const [selectionMade, setSelectionMade] = useState(data.serviceId !== undefined);

    // Busca serviços do Firebase (lógica mantida)
    useEffect(() => {
        if (initialServices && initialServices.length > 0) {
            setServices(initialServices); setLoading(false); return;
        }
        const loadServices = async () => { /* ... (mesma busca no Firestore) ... */
             setLoading(true); setError(null);
             try {
                 const servicesRef = collection(db, "services");
                 const q = query(servicesRef, where("categoria", "==", "BARBEARIA"));
                 const servicesSnapshot = await getDocs(q);
                 const barberServices = servicesSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })) as Service[];
                 setServices(barberServices.length > 0 ? barberServices : FALLBACK_SERVICES);
             } catch (err) { setError('Erro ao carregar serviços.'); setServices(FALLBACK_SERVICES); }
             finally { setLoading(false); }
        };
        loadServices();
    }, [initialServices]);

    // Atualiza seleção local e estado geral
    const handleSelectService = useCallback((id: string) => {
        setSelectedServiceId(id);
        onChange({ serviceId: id });
        setSelectionMade(true); // ✅ Marca que seleção foi feita
    }, [onChange]);

    // Função para o botão "Seguinte"
    const handleNextClick = () => {
        if (selectedServiceId) {
            onNext();
        }
    };

    return (
        // .step-content
        <div className={styles['step-content']}>
            {/* .step-title */}
            <h2 className={styles['step-title']}>Escolhe o teu corte</h2>

            {loading && <div className={styles['loading-message']}>A carregar serviços...</div>}
            {error && <div className={styles['error-message']}>{error}</div>}

            {!loading && !error && (
                <>
                    {/* Grid de Serviços */}
                    {/* .services-grid */}
                    <div className={styles['services-grid']}>
                        {services.map((service) => (
                            <button
                                key={service.id}
                                onClick={() => handleSelectService(service.id)}
                                // .service-card
                                className={`${styles['service-card']} ${selectedServiceId === service.id ? styles['selected'] : ''}`}
                            >
                                {/* .service-image-wrapper */}
                                <div className={styles['service-image-wrapper']}>
                                    <img
                                        src={service.imagem_url || "public/OlimpoBarBer/cortes/corte simples.png"}
                                        alt={service.nome}
                                        // .service-image
                                        className={styles['service-image']}
                                        onError={(e) => { e.currentTarget.src = "public/OlimpoBarBer/cortes/corte simples.png"; }}
                                    />
                                </div>
                                {/* .service-info */}
                                <div className={styles['service-info']}>
                                     {/* .service-name */}
                                    <div className={styles['service-name']}>{service.nome}</div>
                                    {/* .service-price */}
                                    <div className={styles['service-price']}>{formatEuroNoTrailing(service.preco)}</div>
                                </div>
                            </button>
                        ))}
                    </div>

                    {/* ✅ BOTÕES DE AÇÃO (MOBILE E DESKTOP) - IGUAL AO BARBER STEP */}
                    {selectionMade && (
                        <>
                            {/* Botão Seguinte (Mobile) */}
                            <button
                                onClick={handleNextClick}
                                className={styles['next-button-mobile']}
                            >
                                Seguinte
                            </button>

                            {/* Botões Desktop (Container) */}
                            <div className={styles['desktop-actions']}>
                                {/* Botão Seguinte (Desktop) */}
                                <button
                                    type="button"
                                    className={styles['next-button-desktop']}
                                    onClick={handleNextClick}
                                >
                                    <span>Seguinte</span>
                                    <img
                                        src="public/OlimpoBarBer/icons/proximo.png" // Verifique o caminho
                                        alt="Próximo"
                                        className={styles['next-button-icon-desktop']}
                                    />
                                </button>
                                {/* O botão 'Sem preferência' não existe nesta etapa */}
                            </div>
                        </>
                    )}
                </>
            )}
        </div>
    );
});