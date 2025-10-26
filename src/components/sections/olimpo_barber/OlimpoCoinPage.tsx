import React from 'react';
import InteractiveCoin3D from '../olimpo_shared/InteractiveCoin3D';
import { CoinInfoTabs } from '../olimpo_barber/CoinInfoTabs';
import '../../../styles/olimpobarber/olimpocoinpage.css';

// REMOVA O COMPONENTE ClientOnly DAQUI
/*
const ClientOnly: React.FC<{ ... }> = ({ ... }) => { ... };
*/

const OlimpoCoinPage: React.FC = () => {
    return (
        <div className="olimpo-coin-page">
            {/* Área Superior: Moeda 3D Grande */}
            <div className="coin-display-area">
                {/* REMOVIDO O <ClientOnly>
                  O <Suspense> dentro de InteractiveCoin3D cuidará do loading.
                */}
                <InteractiveCoin3D
                    autoRotate={false} 
                    enableControls={true} 
                    scale={0.2}
                    modelPositionY={0}
                    className="w-full h-full"
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