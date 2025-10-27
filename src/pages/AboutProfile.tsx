// src/components/AboutProfile.tsx - COMPLETO com CSS Modules e react-icons

import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'; 
import { auth } from '../services/firebaseConfig'; 
import { onAuthStateChanged, type User } from 'firebase/auth';

// ✅ Importação do CSS Module
import styles from '../styles/global/AboutProfile.module.css'; 
// ✅ Importação do ícone da seta
import { FaChevronLeft } from 'react-icons/fa'; 


// --- Tipagem de Dados (Mantidas) ---

interface UserProfile {
    name: string;
    email: string;
    phone: string; 
    passwordPlaceholder: string; 
}

interface ProfileFieldProps {
    label: string;
    value: string;
    type?: 'text' | 'email' | 'password';
    isLast?: boolean;
}

// --- Componente de Campo de Perfil (ProfileField) ---

const ProfileField: React.FC<ProfileFieldProps> = ({ label, value, type = 'text', isLast = false }) => (
    // ✅ Classes usando o objeto 'styles'
    <div className={`${styles['profile-field']} ${isLast ? styles['last-field'] : ''}`}>
        <label>{label}</label>
        <input 
            type={type} 
            value={value} 
            readOnly 
            aria-label={label}
        />
    </div>
);


// --- Componente Principal (AboutProfile) ---

const AboutProfile: React.FC = () => {
    const navigate = useNavigate(); 
    const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user: User | null) => {
            if (user) {
                setUserProfile({
                    name: user.displayName || user.email?.split('@')[0] || 'Robert Simon',
                    email: user.email || 'robertsimon2025@gmail.com',
                    phone: '912345678', 
                    passwordPlaceholder: '*********', 
                });
                setIsLoading(false);
            } else {
                setIsLoading(false); 
                setUserProfile(null);
            }
        });

        return () => unsubscribe();
    }, []); 

    // Função para lidar com o clique na seta de voltar (usa navigate(-1) para a página anterior)
    const handleBackClick = (e: React.MouseEvent) => {
        e.preventDefault();
        navigate(-1); 
    };

    if (isLoading) {
        return <div className={styles['loading-state']}>Carregando perfil...</div>;
    }

    if (!userProfile) {
        return <div className={styles['error-state']}>Você precisa estar logado para ver esta página.</div>;
    }

    return (
        // ✅ Classes usando o objeto 'styles'
        <div className={styles['profile-page']}>
            <header className={styles['main-header']}>
                <img src="public\OlimpoBarBer\images\logo.webp" alt="Olimpo Logo" className={styles['logo']} />
            </header>

            <main className={styles['container']}>
                {/* Breadcrumbs com a seta de voltar */}
                <p className={styles['breadcrumbs']}>
                    {/* Seta de Voltar com FaChevronLeft */}
                    <a href="#" className={styles['back-link']} onClick={handleBackClick}>
                        {/* ✅ Ícone FaChevronLeft */}
                        <FaChevronLeft className={styles['icon-arrow']} /> A minha conta
                    </a> &gt; Perfil
                </p>

                <h1 className={styles['h1']}>Perfil</h1>

                <div className={styles['profile-card']}>
                    <ProfileField label="Nome" value={userProfile.name} />
                    <ProfileField label="Endereço de email" value={userProfile.email} type="email" />
                    <ProfileField label="Palavra-passe" value={userProfile.passwordPlaceholder} type="password" />
                    <ProfileField label="Número de telemóvel" value={userProfile.phone} isLast />
                </div>
            </main>
        </div>
    );
};

export default AboutProfile;