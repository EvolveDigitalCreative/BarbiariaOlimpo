// src/pages/OlimpoCoinPage.tsx (ATUALIZADO COM LOGO)

import React from 'react';
import InteractiveCoin3D from '../olimpo_shared/InteractiveCoin3D';
import { CoinInfoTabs } from '../olimpo_barber/CoinInfoTabs'; // Verifique se este caminho está certo, talvez seja olimpo_shared?
import '../../../styles/olimpobarber/olimpocoinpage.css'; // Mantenha a importação do CSS
import { Link } from 'react-router-dom'; // Importa o Link

const OlimpoCoinPage: React.FC = () => {
    return (
        <div className="olimpo-coin-page">
            
            {/* ✅ NOVO: Cabeçalho com a Logo */}
            
                <Link to="/" className="olimpo-logo-link">
                    <img 
                        src="/OlimpoBarBer/images/logo.webp" // ✅ AJUSTE O CAMINHO para a sua logo!
                        alt="Olimpo Logo" 
                        className="olimpo-header-logo" 
                    />
                </Link>
           

            {/* Área Superior: Moeda 3D Grande */}
            <div className="coin-display-area">
                <InteractiveCoin3D
                    autoRotate={false} 
                    enableControls={true} 
                    scale={0.2}
                    modelPositionY={0}
                    className="w-full h-full" // Estas classes Tailwind não terão efeito se não tiver Tailwind
                />
            </div>

            {/* Área Inferior: Abas de Informação */}
            <div className="coin-info-area">
                <CoinInfoTabs />
            </div>
        </div>
    );
};

export default OlimpoCoinPage;