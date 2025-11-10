// src/pages/ProfileActionsPage.tsx - COMPLETO (Seta visível e Header Branco)

import React, { useState, useMemo, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import FavoritesTab from '../components/ProfileActions/FavoritesTab';
import AboutTab from '../components/ProfileActions/AboutTab';
import DiscountsTab from '../components/ProfileActions/DiscountsTab';
import styles from '../components/ProfileActions/ProfileActions.module.css';

// ✅ Ícone da seta
import { FaChevronLeft } from 'react-icons/fa'; 

type Tab = 'Favoritos' | 'Sobre nós' | 'Descontos';
const DEFAULT_TAB: Tab = 'Favoritos';

const ProfileActionsPage: React.FC = () => {
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();
    
    // Lógica para definir a aba ativa baseada na URL
    const initialTab = (searchParams.get('tab') as Tab) || DEFAULT_TAB;
    const [activeTab, setActiveTab] = useState<Tab>(initialTab); 

    useEffect(() => {
        const urlTab = searchParams.get('tab');
        if (urlTab && ['Favoritos', 'Sobre nós', 'Descontos'].includes(urlTab)) {
            setActiveTab(urlTab as Tab);
        } else {
            setActiveTab(DEFAULT_TAB);
        }
    }, [searchParams]);

    // Função para voltar à página anterior
    const handleBackClick = (e: React.MouseEvent) => {
        e.preventDefault();
        navigate(-1); 
    };

    const renderTabContent = useMemo(() => {
        switch (activeTab) {
            case 'Favoritos':
                return <FavoritesTab styles={styles} />;
            case 'Sobre nós':
                return <AboutTab styles={styles} />;
            case 'Descontos':
                return <DiscountsTab styles={styles} />;
            default:
                return null;
        }
    }, [activeTab]);

    const pageTitle = activeTab;
    const breadcrumbPath = `A minha conta > ${activeTab === 'Sobre nós' ? 'sobre nós' : activeTab.toLowerCase()}`;

    return (
        <div className={styles['profile-actions-page']}>
            <header className={styles['main-header']}>
                {/* O fundo do header é branco no CSS */}
                <img src="/OlimpoBarBer/images/logo.webp" alt="Olimpo Logo" className={styles['logo']} />
            </header>

            <main className={styles['container']}>
                {/* Breadcrumbs com a seta de voltar ATIVA */}
                <p className={styles['breadcrumbs']}>
                    <a href="#" className={styles['back-link']} onClick={handleBackClick}>
                        {/* ✅ SETA DE VOLTAR */}
                        <FaChevronLeft className={styles['icon-arrow']} /> 
                    </a>
                    {breadcrumbPath}
                </p>

                {/* Título da Página */}
                <h1 className={styles['h1']}>{pageTitle}</h1>

                {/* Área de Navegação das Abas */}
                <div className={styles['tab-navigation']}>
                    {['Favoritos', 'Sobre nós', 'Descontos'].map((tabName) => (
                        <button
                            key={tabName}
                            className={`${styles['tab-button']} ${activeTab === tabName ? styles['active'] : ''}`}
                            onClick={() => setActiveTab(tabName as Tab)}
                        >
                            {tabName}
                            {/* Linha preta sob a aba ativa */}
                            {activeTab === tabName && <div className={styles['active-tab-indicator']}></div>}
                        </button>
                    ))}
                    {/* Linha cinza sob todas as abas */}
                    <div className={styles['tab-divider-line']}></div>
                </div>

                {/* Conteúdo da Aba */}
                <div className={styles['tab-content']}>
                    {renderTabContent}
                </div>
            </main>
        </div>
    );
};

export default ProfileActionsPage;