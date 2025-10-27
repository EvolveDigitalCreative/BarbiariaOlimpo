// src/components/common/BookingModal/ReviewConfirmStep.tsx - COMPLETO E CORRIGIDO

import React, { useState, useEffect } from 'react';
// ❌ REMOVIDO: import { PhoneInput } from '../PhoneInput'; 
import { auth, db } from '../../../services/firebaseConfig'; 
import type { User } from 'firebase/auth'; 
import { doc, getDoc } from 'firebase/firestore';
import type { Barber, Service } from '../../../types'; 

interface AppUser {
    uid: string;
    nome?: string;
    sobrenome?: string;
    email?: string;
    telefone?: string;
    role?: string;
}
// ---
import styles from './BookingModal.module.css';

// Props type (baseado no código fonte)
type Props = {
    data: { barberId?: string; serviceId?: string; date?: string; time?: string };
    onBack: () => void;
    onConfirm: (formData: { name: string; email: string; phone: string }) => void;
    loading?: boolean; // Estado de loading vindo do BookingModal
    error?: string;    // Estado de erro vindo do BookingModal
};

// Nomes de serviço (Fallback)
const SERVICE_NAMES: Record<string, string> = {
    '1': 'Corte Simples', '2': 'Corte e Barba', '3': 'Barba', '4': 'Disfarce',
};

// Formata Data/Hora (Função auxiliar)
function formatDateLabel(date?: string, time?: string): string {
    if (!date) return '—';
    try {
        const d = new Date(`${date}T00:00:00`);
        const label = d.toLocaleDateString('pt-PT', { day: '2-digit', month: 'long', year: 'numeric' });
        return time ? `${label}, ${time}` : label;
    } catch (e) { return `${date || ''}${time ? `, ${time}`: ''}`; }
}

export function ReviewConfirmStep({ data, onBack, onConfirm, loading = false, error = '' }: Props) {
    // Estados para dados buscados (nomes, etc.)
    const [barber, setBarber] = useState<Barber | null>(null);
    const [serviceName, setServiceName] = useState<string>('Serviço');
    const [appUser, setAppUser] = useState<AppUser | null>(null); // Dados do Firestore
    const [firebaseUser, setFirebaseUser] = useState<User | null>(auth.currentUser); // Dados do Auth
    const [dataLoading, setDataLoading] = useState(true); // Loading para dados (barbeiro/serviço/usuário)

    // Estados do Formulário
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [isFormValid, setIsFormValid] = useState(false); // Para habilitar/desabilitar o botão

    // Busca dados do barbeiro, serviço e usuário logado
    useEffect(() => {
        const loadData = async () => {
            setDataLoading(true);
            const user = auth.currentUser; // Pega usuário atual
            setFirebaseUser(user);

            try {
                // Barbeiro
                if (data.barberId) {
                    const barberRef = doc(db, 'users', data.barberId); // Assumindo barbeiros em 'users'
                    const barberSnap = await getDoc(barberRef);
                    if (barberSnap.exists()) setBarber({ id: barberSnap.id, ...barberSnap.data() } as Barber);
                } else { setBarber(null); }

                // Serviço
                if (data.serviceId) {
                    const serviceRef = doc(db, 'services', data.serviceId);
                    const serviceSnap = await getDoc(serviceRef);
                    setServiceName(serviceSnap.exists() ? serviceSnap.data()?.nome : SERVICE_NAMES[data.serviceId] ?? 'Serviço');
                }

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
                        setEmail(userData.email || user.email || ''); // Usa email do Firestore ou Auth
                        setPhone(userData.telefone || '');
                    } else {
                         // Se não achar doc no Firestore, usa o email do Auth
                         setEmail(user.email || '');
                    }
                } else {
                     // Se não está logado, limpa os campos (caso reabra o modal)
                     setName(''); setEmail(''); setPhone('');
                     setAppUser(null);
                }

            } catch (err) {
                console.error("Erro ao carregar dados para confirmação:", err);
                // Tratar erro se necessário (ex: mostrar mensagem)
            } finally {
                setDataLoading(false);
            }
        };
        loadData();
    }, [data.barberId, data.serviceId]); // Dependências da busca

    // Validação do formulário
    useEffect(() => {
        // Verifica se nome, email (válido) e telefone (formato básico) estão preenchidos
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        const phoneRegex = /^\+?[0-9\s-]{7,}$/; // Regex simples para telefone
        setIsFormValid(
            name.trim().length > 0 &&
            emailRegex.test(email.trim()) &&
            phoneRegex.test(phone.trim())
        );
    }, [name, email, phone]);

    // Chama a função onConfirm passada pelo BookingModal
    const handleConfirmClick = () => {
        if (isFormValid && !loading) {
            onConfirm({ name: name.trim(), email: email.trim(), phone: phone.trim() });
        }
    };

    const displayBarberName = barber?.name?.toUpperCase() ?? 'Sem preferência';

    // Estado de Loading inicial (busca barbeiro/serviço/user)
    if (dataLoading) {
        return <div className={styles['loading-message']}>A carregar resumo...</div>;
    }

    return (
        // .step-content
        <div className={styles['step-content']}>
            {/* .step-title */}
            <h2 className={styles['step-title']}>Confirma a tua marcação</h2>

            {/* Resumo */}
            {/* .summary-container ~ max-w-2xl mx-auto */}
            <div className={styles['summary-container']}>
                {/* .summary-card-review ~ inline-flex items-center border-3 border-black ... */}
                <div className={styles['summary-card-review']}>
                    {/* .summary-details ~ min-w-0 text-left */}
                    <div className={styles['summary-details']}>
                        <div className={styles['summary-service']}>{serviceName}</div>
                        <div className={styles['summary-barber']}>{displayBarberName}</div>
                        <div className={styles['summary-datetime']}>{formatDateLabel(data.date, data.time)}</div>
                    </div>
                    {/* .summary-icon-wrapper */}
                    <div className={styles['summary-icon-wrapper']}>
                        <img src="public/OlimpoBarBer/icons/OlimpoBarber_optimized.png" alt="Olimpo" className={styles['summary-icon']} />
                    </div>
                </div>
            </div>

            {/* Formulário */}
             {/* .form-container ~ mt-6 w-full max-w-2xl mx-auto */}
            <div className={styles['form-container']}>
                {/* .form-fields ~ font-georgia space-y-4 */}
                <div className={styles['form-fields']}>
                    {/* Campo Nome */}
                    <div>
                        {/* .form-label ~ block text-sm font-bold mb-1 */}
                        <label className={styles['form-label']} htmlFor="booking-name">Nome</label>
                        <input
                            id="booking-name"
                            type="text"
                            placeholder="Nome e sobrenome"
                            // .form-input ~ w-full rounded-lg border border-black bg-[#EFEFEF] px-4 py-4
                            className={styles['form-input']}
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            // Desabilita se usuário logado tem nome
                            disabled={!!appUser?.nome} 
                            readOnly={!!appUser?.nome}
                            required
                        />
                    </div>
                    {/* Campo Email */}
                    <div>
                        <label className={styles['form-label']} htmlFor="booking-email">E‑Mail</label>
                        <input
                            id="booking-email"
                            type="email"
                            placeholder="oseu@gmail.com"
                            className={styles['form-input']}
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                             // Desabilita se usuário logado tem email
                            disabled={!!firebaseUser?.email}
                            readOnly={!!firebaseUser?.email}
                            required
                        />
                    </div>
                    {/* ✅ CAMPO TELEMÓVEL ATUALIZADO */}
                    <div>
                        <label className={styles['form-label']} htmlFor="booking-phone">Número de telemóvel</label>
                         {/* Usa um input HTML padrão */}
                        <input
                            id="booking-phone"
                            type="tel" // Tipo 'tel' para telemóveis
                            value={phone}
                            // Handler padrão de input
                            onChange={(e) => setPhone(e.target.value)} 
                            placeholder="912 345 678"
                            required
                            // Readiciona a lógica de disabled/readonly
                            disabled={!!appUser?.telefone} 
                            readOnly={!!appUser?.telefone}
                            className={styles['form-input']} // Aplica a mesma classe
                        />
                    </div>
                </div>

                {/* Mensagem de Erro (vindo do BookingModal) */}
                {error && (
                     // .error-message-box ~ mt-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded-lg
                    <div className={styles['error-message-box']}> 
                        {error}
                    </div>
                )}

                {/* Botão Confirmar */}
                 {/* .confirm-button-wrapper ~ mt-6 flex justify-center */}
                <div className={styles['confirm-button-wrapper']}>
                    <button
                        type="button"
                        onClick={handleConfirmClick}
                        disabled={loading || !isFormValid} // Usa estado de loading e validação
                         // .confirm-button ~ w-full sm:w-auto px-20 py-3.5 rounded-lg bg-black text-white ... disabled:opacity-50 ...
                        className={styles['confirm-button']} 
                    >
                        {loading ? 'A confirmar...' : 'Confirmar'}
                    </button>
                </div>
            </div>
        </div>
    );
}

