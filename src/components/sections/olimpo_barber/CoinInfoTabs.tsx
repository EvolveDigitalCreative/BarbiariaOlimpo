// src/components/olimpo_shared/CoinInfoTabs.tsx (ATUALIZADO)

import React, { useEffect, useState, type FC } from 'react';
// Use o Link do seu roteador (react-router-dom)
import { Link } from 'react-router-dom'; 

// ✅ 1. Importações do Firebase (do código base)
import { auth, db } from '../../../services/firebaseConfig'; // <-- VERIFIQUE O CAMINHO!
import { type User, onAuthStateChanged } from 'firebase/auth';
import { doc, onSnapshot } from 'firebase/firestore'; // Importa onSnapshot

// Interface simples para o conteúdo das abas (opcional)
interface TabContentProps {
    coins: number;
}

// Componente principal das abas
export const CoinInfoTabs: FC = () => {
    // ✅ 2. Estados do Firebase (do código base)
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [firebaseUser, setFirebaseUser] = useState<User | null>(null);
    const [coins, setCoins] = useState<number>(0);
    const [loadingAuth, setLoadingAuth] = useState(true); // Controla o loading inicial

    // ✅ 3. Lógica de Autenticação e Busca de Coins (do código base)
    useEffect(() => {
        // Escuta o estado de autenticação
        const unsubscribeAuth = onAuthStateChanged(auth, (user) => {
            setFirebaseUser(user);
            setIsAuthenticated(!!user);
            setLoadingAuth(false); 
            if (!user) {
                setCoins(0); // Reseta coins ao deslogar
            }
        });
        return () => unsubscribeAuth();
    }, []);

    useEffect(() => {
        // Se logado, escuta as coins em tempo real
        let unsubscribeFirestore: (() => void) | null = null; // Guarda a função de unsubscribe

        if (firebaseUser) {
            const userDocRef = doc(db, 'users', firebaseUser.uid);
            
            unsubscribeFirestore = onSnapshot(userDocRef, (docSnap) => {
                if (docSnap.exists()) {
                    const userData = docSnap.data();
                    // Assumindo que o campo se chama 'saldo_olimpo_coins'
                    const userCoins = userData?.saldo_olimpo_coins ?? 0;
                    setCoins(userCoins);
                    console.log('🪙 Coins atualizadas:', userCoins);
                } else {
                    console.warn(`CoinInfoTabs: Documento do usuário ${firebaseUser.uid} não encontrado.`);
                    setCoins(0);
                }
            }, (error) => {
                console.error("Erro ao escutar dados do usuário:", error);
                setCoins(0);
            });
        }
        
        // Limpa o listener QUANDO o firebaseUser mudar (deslogar) OU o componente desmontar
        return () => {
            if (unsubscribeFirestore) {
                unsubscribeFirestore();
            }
        };
    }, [firebaseUser]); // Dependência: firebaseUser

    // Lógica das Abas (adaptada do seu código)
    type TabKey = 'login' | 'coins' | 'benefits' | 'about';
    // Define a aba inicial APENAS APÓS o loading inicial
    const [active, setActive] = useState<TabKey>('login'); // Começa com login como padrão

    useEffect(() => {
        // Atualiza a aba ativa QUANDO o estado de auth mudar (APÓS o loading inicial)
        if (!loadingAuth) { 
            setActive(isAuthenticated ? 'coins' : 'login');
        }
    }, [isAuthenticated, loadingAuth]); // Dependências: isAuthenticated e loadingAuth


    // Se ainda estiver a verificar o login inicial, mostra um placeholder
    if (loadingAuth) {
        return <div className="coin-tabs-loading">Verificando autenticação...</div>; 
    }

    // ✅ 4. JSX com a ESTRUTURA DO SEU CÓDIGO e CONTEÚDO DO CÓDIGO BASE
    return (
        <div className="coin-info-tabs-container">
            {/* Cabeçalho das Abas (usa suas classes CSS) */}
            <div className="tabs-header-wrapper">
                <div className="tabs-header">
                    {/* Botão Login (Condicional) */}
                    {!isAuthenticated && (
                        <button
                            type="button"
                            onClick={() => setActive('login')}
                            className={`tab-button ${active === 'login' ? 'active' : ''}`}
                        >
                            <span>Login</span>
                        </button>
                    )}

                    {/* Botão Coins (Condicional) */}
                    {isAuthenticated && (
                        <button
                            type="button"
                            onClick={() => setActive('coins')}
                            className={`tab-button ${active === 'coins' ? 'active' : ''}`}
                        >
                            <span>Coins</span>
                        </button>
                    )}

                    {/* Botão Benefícios */}
                    <button
                        type="button"
                        onClick={() => setActive('benefits')}
                        className={`tab-button ${active === 'benefits' ? 'active' : ''}`}
                    >
                        <span>Os teus benefícios</span>
                    </button>

                    {/* Botão Sobre */}
                    <button
                        type="button"
                        onClick={() => setActive('about')}
                        className={`tab-button ${active === 'about' ? 'active' : ''}`}
                    >
                        <span>Sobre</span>
                    </button>
                </div>
            </div>

            {/* Conteúdo das Abas (usa suas classes CSS) */}
            <div className="tab-content-wrapper">
                <div className="tab-content">
                    {/* Conteúdo da Aba Login (Condicional) */}
                    {active === 'login' && !isAuthenticated && (
                        <div className="tab-pane">
                            {/* Conteúdo adaptado do código base */}
                            <h2>Faz Login para poderes usufruir das tuas Olimpo Coins</h2>
                            <p>
                                Ter uma OLIMPO Coin não é apenas sobre descontos — é sobre reconhecimento. <br /> 
                                É a nossa forma de agradecer por fazeres parte do projeto OLIMPO e por nos dares a oportunidade de elevar a tua experiência a um novo patamar. <br />
                                Coleciona OLIMPO Coins, desbloqueia vantagens únicas e desfruta de recompensas exclusivas, dentro e fora da loja.
                            </p>
                            <div className="tab-buttons">
                                <Link to={'/login'} className="tab-action-button">Login</Link>
                                <Link to={'/register'} className="tab-action-button">Registo</Link>
                            </div>
                        </div>
                    )}

                    {/* Conteúdo da Aba Coins (Condicional) */}
                    {active === 'coins' && isAuthenticated && (
                        <div className="tab-pane">
                            <h2>Aqui poderás ver quantas Olimpo Coins tens</h2>
                            <div className="coin-balance-display">
                                {/* ✅ Mostra as coins do estado Firebase */}
                                <span>{coins}</span> 
                            </div>
                        </div>
                    )}

                    {/* Conteúdo da Aba Benefícios */}
                    {active === 'benefits' && (
                        <div className="tab-pane">
                            <h2>Desfruta de recompensas exclusivas</h2>
                            {/* Conteúdo adaptado do código base */}
                            <div className="benefits-list">
                                <p><span className="benefit-highlight">15 Olimpo coins -</span> 10% de desconto da loja Olimpo wear</p>
                                <p><span className="benefit-highlight">28 Olimpo coins -</span> 20% de desconto da loja Olimpo wear</p>
                                <p><span className="benefit-highlight">39 Olimpo coins -</span> 30% de desconto da loja Olimpo wear</p>
                                <p><span className="benefit-highlight">55 Olimpo coins -</span> 50% de desconto da loja Olimpo wear</p>
                                <p><span className="benefit-highlight">100 Olimpo coins -</span> T-shirt oferta (100% de desconto na compra de um produto na loja Olimpo wear)</p>
                            </div>
                        </div>
                    )}

                    {/* Conteúdo da Aba Sobre */}
                    {active === 'about' && (
                        <div className="tab-pane">
                            {/* Conteúdo adaptado do código base */}
                            <p>
                                Inspirada no minimalismo e na elegância da Grécia Antiga, a Olimpo Coin foi cuidadosamente criada para oferecer benefícios exclusivos aos nossos clientes.<br />
                                A cada corte realizado na nossa barbearia, recebes uma Olimpo Coin,<br />
                                e a cada skin care realizada na Olimpo Skin recebes 2.<br />
                                Com elas, podes obter descontos nas nossas t-shirts e até ganhar uma gratuita.<br />
                                Quanto mais coins acumulares, maiores serão as tuas recompensas.
                            </p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default CoinInfoTabs; // Exporta como default se for o único export do ficheiro