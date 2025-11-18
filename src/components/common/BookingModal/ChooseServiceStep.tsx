// src/components/common/BookingModal/ChooseServiceStep.tsx
import React, { useState, useEffect, useCallback, memo } from 'react';
import { db } from '../../../services/firebaseConfig';
import { collection, getDocs, QuerySnapshot, type DocumentData } from 'firebase/firestore';
import styles from './BookingModal.module.css';

// ===========================================
// Tipos de Dados
// ===========================================

interface Service {
    id: string; // ID do documento Firebase
    name: string; // Garantir que o nome está sempre lá
    description: string;
    price: number;
    duration: number;
}

type Props = {
    data: { serviceId?: string };
    onChange: (patch: Partial<Props['data']>) => void;
    onNext: () => void;
    onBack: () => void;
};

// ===========================================
// Componente ServiceCard
// ===========================================

interface ServiceCardProps {
    service: Service;
    isSelected: boolean;
    onSelect: (service: Service) => void;
}

const ServiceCard: React.FC<ServiceCardProps> = memo(({ service, isSelected, onSelect }) => {
    return (
        <button
            onClick={() => onSelect(service)}
            className={`${styles['service-card']} ${isSelected ? styles['selected'] : ''}`}
        >
            <div className={styles['service-info']}>
                <div className={styles['service-name']}>{service.name}</div>
                <div className={styles['service-description']}>{service.description}</div>
            </div>
            <div className={styles['service-details']}>
                <span className={styles['service-price']}>{service.price.toFixed(2)}€</span>
                <span className={styles['service-duration']}>{service.duration} min</span>
            </div>
        </button>
    );
});


// ===========================================
// Componente Principal
// ===========================================

export const ChooseServiceStep: React.FC<Props> = memo(({ data, onChange, onNext, onBack }) => {
    const [services, setServices] = useState<Service[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    // Fetch Services
    useEffect(() => {
        const fetchServices = async () => {
            try {
                // AQUI BUSCAMOS OS DADOS
                const querySnapshot: QuerySnapshot<DocumentData> = await getDocs(collection(db, 'services'));
                
                const servicesList: Service[] = querySnapshot.docs.map(doc => {
                    const docData = doc.data();
                    return {
                        id: doc.id,
                        // Garantir que todos os campos necessários estão presentes
                        name: docData.name || 'Serviço Sem Nome',
                        description: docData.description || 'Descrição indisponível.',
                        price: docData.price || 0,
                        duration: docData.duration || 30,
                    };
                });
                
                setServices(servicesList);
                setError(null);

                // DEBUG: Verifique se serviços foram realmente carregados no console
                console.log("Serviços carregados:", servicesList);

            } catch (err: any) {
                console.error("Erro ao buscar serviços:", err);
                setError("Não foi possível carregar a lista de serviços. Verifique o caminho 'services' no Firestore.");
            } finally {
                setLoading(false);
            }
        };

        fetchServices();
    }, []);

    const handleSelectService = useCallback((service: Service) => {
        onChange({ serviceId: service.id });
    }, [onChange]);

    const canContinue = !!data.serviceId;

    if (loading) {
        return <div className={styles['loading-state']}>A carregar serviços...</div>;
    }

    if (error) {
        // Se houver um erro, exiba-o claramente
        return <div className={styles['error-state']}>Erro: {error}</div>;
    }
    
    // ===========================================
    // Renderização
    // ===========================================
    return (
        <div className={styles['step-content']}>
            <h2 className={styles['step-title']}>Escolhe o teu serviço</h2>
            
            {/* Se não houver serviços, avise o utilizador */}
            {services.length === 0 && (
                <div className={styles['no-services-message']}>
                    Nenhum serviço encontrado. Por favor, adicione serviços à coleção 'services' no Firestore.
                </div>
            )}

            <div className={styles['services-grid']}>
                {services.map(service => (
                    <ServiceCard
                        key={service.id}
                        service={service}
                        isSelected={data.serviceId === service.id}
                        onSelect={handleSelectService}
                    />
                ))}
            </div>

            {/* Botões de Ação */}
            <div className={styles['modal-actions-container']}> 
                <button type="button" onClick={onBack} className={styles['back-button']}>Voltar</button>

                {canContinue && (
                    <div className={styles['next-actions']}> 
                        <button onClick={onNext} className={styles['next-button-mobile']}>Seguinte</button>
                        <button type="button" className={styles['next-button-desktop']} onClick={onNext}>
                            <span>Seguinte</span>
                            <img src="/OlimpoBarBer/icons/proximo.png" alt="Próximo" className={styles['next-button-icon-desktop']} />
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
});

export default ChooseServiceStep;