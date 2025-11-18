import { useState, useEffect } from 'react'; 
import { auth, db } from '../../../services/firebaseConfig';
import type { User } from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore';
// ❌ CORRIGIDO: Removido o import de 'Barber' (Código 6133) e 'Service'
import styles from './BookingModal.module.css'; 

// Tipagem do Usuário (Seu modelo de dados no Firestore)
interface AppUser {
    uid: string;
    nome?: string;
    sobrenome?: string;
    email?: string;
    telefone?: string;
    role?: string;
}

// Tipagem para os dados enriquecidos (calculados no BookingModal)
type EnrichedData = {
    serviceName: string;
    barberName: string;
    price: number;
    duration: number; // Em minutos
    dateTimeTimestamp: number; // O timestamp da data/hora
};

// Tipagem das Props
type Props = {
    data: { barberId?: string; serviceId?: string; date?: string; time?: string };
    enrichedData: EnrichedData; 
    onBack: () => void;
    onConfirm: (formData: { name: string; email: string; phone: string }) => Promise<void>; 
    loading?: boolean; 
    error?: string;
};

// Formata Data/Hora (Função auxiliar)
function formatDateLabel(date?: string, time?: string): string {
    if (!date) return '—';
    try {
        const dateTimeString = date && time ? `${date}T${time}:00` : `${date}T00:00:00`;
        const d = new Date(dateTimeString);
        
        const options: Intl.DateTimeFormatOptions = { weekday: 'long', day: '2-digit', month: 'long', year: 'numeric' };
        const dateLabel = d.toLocaleDateString('pt-PT', options);
        
        return time 
            ? `${dateLabel} às ${time}` 
            : dateLabel;
    } catch (e) { return `${date || ''}${time ? `, ${time}`: ''}`; }
}

export function ReviewConfirmStep({ data, enrichedData, onBack, onConfirm, loading = false, error = '' }: Props) {
    
    const [appUser, setAppUser] = useState<AppUser | null>(null);
    const [firebaseUser, setFirebaseUser] = useState<User | null>(auth.currentUser);
    const [dataLoading, setDataLoading] = useState(true);

    // Estados do Formulário
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [isFormValid, setIsFormValid] = useState(false);

    // Busca dados do usuário logado e preenche o formulário
    useEffect(() => {
        const loadData = async () => {
            setDataLoading(true);
            const user = auth.currentUser;
            setFirebaseUser(user);

            try {
                // Usuário (Firestore)
                if (user) {
                    const userRef = doc(db, 'users', user.uid);
                    const userSnap = await getDoc(userRef);
                    if (userSnap.exists()) {
                        const userData = { uid: user.uid, ...userSnap.data() } as AppUser;
                        setAppUser(userData);
                        // Preenche o formulário
                        const fullName = `${userData.nome || ''} ${userData.sobrenome || ''}`.trim();
                        setName(fullName || '');
                        setEmail(userData.email || user.email || '');
                        setPhone(userData.telefone || '');
                    } else {
                         setEmail(user.email || '');
                    }
                } else {
                     setName(''); setEmail(''); setPhone('');
                     setAppUser(null);
                }

            } catch (err) {
                console.error("Erro ao carregar dados para confirmação:", err);
            } finally {
                setDataLoading(false);
            }
        };
        loadData();
    }, [data.barberId, data.serviceId]);

    // Validação do formulário
    useEffect(() => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        const phoneRegex = /^\+?[0-9\s-]{7,}$/;
        setIsFormValid(
            name.trim().length > 0 &&
            emailRegex.test(email.trim()) &&
            phoneRegex.test(phone.trim())
        );
    }, [name, email, phone]);

    // Chama a função onConfirm
    const handleConfirmClick = () => {
        if (isFormValid && !loading) {
            onConfirm({ name: name.trim(), email: email.trim(), phone: phone.trim() });
        }
    };

    const displayBarberName = enrichedData.barberName.toUpperCase() ?? 'Sem preferência';
    const displayServiceName = enrichedData.serviceName;

    if (dataLoading) {
        return <div className={styles['loading-message']}>A carregar resumo...</div>;
    }

    return (
        <div className={styles['step-content']}>
            <h2 className={styles['step-title']}>Confirma a tua marcação</h2>

            {/* Resumo da Marcação */}
            <div className={styles['summary-container']}>
                <div className={styles['summary-card-review']}>
                    <div className={styles['summary-details']}>
                        <div className={styles['summary-service']}>{displayServiceName} ({enrichedData.duration} min)</div>
                        <div className={styles['summary-barber']}>{displayBarberName}</div>
                        <div className={styles['summary-datetime']}>
                            {formatDateLabel(data.date, data.time)} - **€{enrichedData.price.toFixed(2)}**
                        </div>
                    </div>
                    <div className={styles['summary-icon-wrapper']}>
                        <img src="/OlimpoBarBer/icons/OlimpoBarber_optimized.png" alt="Olimpo" className={styles['summary-icon']} />
                    </div>
                </div>
            </div>

            {/* Formulário de Contacto */}
            <div className={styles['form-container']}>
                <div className={styles['form-fields']}>
                    {/* Campo Nome */}
                    <div>
                        <label className={styles['form-label']} htmlFor="booking-name">Nome*</label>
                        <input
                            id="booking-name"
                            type="text"
                            placeholder="Nome e sobrenome"
                            className={styles['form-input']}
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            disabled={!!appUser?.nome}
                            readOnly={!!appUser?.nome}
                            required
                        />
                    </div>
                    {/* Campo Email */}
                    <div>
                        <label className={styles['form-label']} htmlFor="booking-email">E‑Mail*</label>
                        <input
                            id="booking-email"
                            type="email"
                            placeholder="oseu@gmail.com"
                            className={styles['form-input']}
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            disabled={!!firebaseUser?.email}
                            readOnly={!!firebaseUser?.email}
                            required
                        />
                    </div>
                    {/* Campo Telemóvel */}
                    <div>
                        <label className={styles['form-label']} htmlFor="booking-phone">Número de telemóvel</label>
                        <input
                            id="booking-phone"
                            type="tel"
                            value={phone}
                            onChange={(e) => setPhone(e.target.value)} 
                            placeholder="912 345 678"
                            required
                            disabled={!!appUser?.telefone} 
                            readOnly={!!appUser?.telefone}
                            className={styles['form-input']}
                        />
                    </div>
                </div>

                {error && (
                    <div className={styles['error-message-box']}> 
                        {error}
                    </div>
                )}

                {/* Botões de Ação */}
                <div className={styles['confirm-button-wrapper']} style={{ justifyContent: 'space-between' }}>
                    <button
                        type="button"
                        onClick={onBack}
                        disabled={loading}
                        className={`${styles['confirm-button']} ${styles['back-button']}`} 
                        style={{ background: 'transparent', color: 'black', border: '1px solid black', width: '45%' }}
                    >
                        Voltar
                    </button>
                    <button
                        type="button"
                        onClick={handleConfirmClick}
                        disabled={loading || !isFormValid}
                        className={styles['confirm-button']}
                        style={{ width: '45%' }}
                    >
                        {loading ? 'A confirmar...' : 'Confirmar'}
                    </button>
                </div>
            </div>
        </div>
    );
}