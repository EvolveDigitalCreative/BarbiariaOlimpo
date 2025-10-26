// src/pages/ProfilePage.tsx

import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../components/auth/AuthContext'; // Ajuste o caminho se necessário
import { doc, getDoc } from 'firebase/firestore';
import { db, auth } from '../services/firebaseConfig'; // Ajuste o caminho se necessário
import { signOut } from 'firebase/auth';

// Importe o novo CSS
import '../styles/global/ProfilePage.css';

// Ícones (você pode usar SVGs ou uma biblioteca como react-icons)
const HeartIcon = () => <span>❤️</span>; // Placeholder
const InfoIcon = () => <span>➕</span>; // Placeholder
const DiscountIcon = () => <span>⚙️</span>; // Placeholder
const ArrowRightIcon = () => <span>➔</span>; // Placeholder

const ProfilePage: React.FC = () => {
    const { currentUser } = useAuth();
    const navigate = useNavigate();
    const [userData, setUserData] = useState<{ name: string; olimpoCoins: number } | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        if (!currentUser) {
            // Se não estiver logado, redireciona para login (ProtectedRoute já deve fazer isso, mas é uma segurança extra)
            navigate('/login');
            return;
        }

        const fetchUserData = async () => {
            setLoading(true);
            setError(null);
            const userDocRef = doc(db, 'users', currentUser.uid);
            try {
                const docSnap = await getDoc(userDocRef);
                if (docSnap.exists()) {
                    const data = docSnap.data();
                    setUserData({
                        name: data.name || 'Utilizador', // Pega o nome, default 'Utilizador'
                        olimpoCoins: data.olimpoCoins || 0 // Pega as moedas, default 0
                    });
                } else {
                    setError("Dados do perfil não encontrados.");
                    // Define dados padrão para exibição mínima
                    setUserData({ name: 'Utilizador', olimpoCoins: 0 });
                }
            } catch (err) {
                console.error("Erro ao buscar dados do utilizador:", err);
                setError("Erro ao carregar dados.");
                setUserData({ name: 'Utilizador', olimpoCoins: 0 });
            } finally {
                setLoading(false);
            }
        };

        fetchUserData();
    }, [currentUser, navigate]);

    const handleLogout = async () => {
        try {
            await signOut(auth);
            navigate('/login');
        } catch (error) {
            console.error("Erro ao fazer logout:", error);
        }
    };

    // Função para pegar as iniciais do nome
    const getInitials = (name: string): string => {
        if (!name) return '?';
        const nameParts = name.split(' ');
        if (nameParts.length === 1) {
            return nameParts[0].charAt(0).toUpperCase();
        }
        return (nameParts[0].charAt(0) + (nameParts.length > 1 ? nameParts[nameParts.length - 1].charAt(0) : '')).toUpperCase();
    };

    if (loading) {
        return <div className="profile-loading">A carregar perfil...</div>; // Ou um spinner
    }

    if (error) {
         return <div className="profile-error">Erro: {error}</div>;
    }

    // Garante que userData não é null aqui (embora já tenhamos defaults)
    const displayName = userData?.name ?? 'Utilizador';
    const coinBalance = userData?.olimpoCoins ?? 0;
    const userInitials = getInitials(displayName);

    return (
        <div className="profile-page-container">
            <header className="profile-header">
                {/* Logo Olimpo */}
                <img src="/OlimpoBarBer/images/logo.webp" alt="Olimpo" className="profile-logo" />
                {/* Botão Voltar */}
                <Link to="/" className="back-arrow" aria-label="Voltar">←</Link>
            </header>

            <main className="profile-main-content">
                {/* Linha Superior */}
                <div className="profile-top-row">
                    {/* Card de Perfil */}
                    <div className="profile-card profile-info-card">
                        <div className="profile-avatar">{userInitials}</div>
                        <div className="user-info">
                            <span className="welcome-text">BEM-VINDO</span>
                            <span className="user-name">{displayName}</span>
                        </div>
                        <button className="edit-profile-button">Edita o teu perfil</button>
                        <button onClick={handleLogout} className="logout-link">
                            Sair da sua conta
                        </button>
                    </div>

                    {/* Card Olimpo Coin */}
                    <div className="profile-card coin-card">
                        <h3 className="coin-card-title">Olimpo Coin</h3>
                        <div className="coin-display">
                            {/* ✅ Use a imagem ESTÁTICA da moeda aqui */}
                            <img src="/OlimpoBarBer/texture/coin.png" alt="Olimpo Coin" className="static-coin-image" />
                            <span className="coin-balance">{coinBalance}</span>
                        </div>
                        {/* ✅ Link para a página /olimpocoin */}
                        <Link to="/olimpocoin" className="view-more-link">VER MAIS...</Link>
                    </div>
                </div>

                {/* Linha Inferior */}
                <div className="profile-bottom-row">
                    {/* Card Favoritos */}
                    <div className="action-card">
                        <div className="card-icon"><HeartIcon /></div>
                        <h4 className="card-title">Favoritos</h4>
                        <p className="card-description">Consulta aqui os teus artigos favoritos da Olimpo wear.</p>
                        <button className="arrow-button"><ArrowRightIcon /></button>
                    </div>
                    {/* Card Sobre nós */}
                    <div className="action-card">
                        <div className="card-icon"><InfoIcon /></div>
                        <h4 className="card-title">Sobre nós</h4>
                        <p className="card-description">Fica a conhecer melhor a nossa missão</p>
                        <button className="arrow-button"><ArrowRightIcon /></button>
                    </div>
                    {/* Card Descontos */}
                    <div className="action-card">
                        <div className="card-icon"><DiscountIcon /></div>
                        <h4 className="card-title">Descontos</h4>
                        <p className="card-description">Não percas descontos imperdíveis</p>
                        <button className="arrow-button"><ArrowRightIcon /></button>
                    </div>
                </div>
            </main>
        </div>
    );
};

export default ProfilePage;