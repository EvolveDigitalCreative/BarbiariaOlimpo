// src/pages/OlimpoCoinPage.tsx (ou onde preferir)

import React from 'react';
// Importe o ClientOnly se ele não for global
// import { ClientOnly } from '../components/common/ClientOnly'; 
import InteractiveCoin3D from '../olimpo_shared/InteractiveCoin3D'; // Verifique o caminho
import { CoinInfoTabs } from '../olimpo_barber/CoinInfoTabs'; // Verifique o caminho
import '../../../styles/olimpobarber/olimpocoinpage.css'; // Crie este arquivo CSS

// Componente ClientOnly (se já não tiver um global)
const ClientOnly: React.FC<{ fallback: React.ReactNode; children: React.ReactNode }> = ({ fallback, children }) => {
    const [isClient, setIsClient] = React.useState(false);
    React.useEffect(() => {
        setIsClient(true);
    }, []);
    return isClient ? <>{children}</> : <>{fallback}</>;
};

const OlimpoCoinPage: React.FC = () => {
    return (
        <div className="olimpo-coin-page">
            {/* Área Superior: Moeda 3D Grande */}
            <div className="coin-display-area">
                <ClientOnly
                    fallback={
                         <div className="coin-fallback-fullscreen">
                            Carregando Moeda...
                         </div>
                    }
                >
                    <InteractiveCoin3D
                        key="coin-details-page"
                        // Sem rotação automática, mas interativa
                        autoRotate={false} 
                        enableControls={true} 
                        
                        // Ajustes visuais para tela cheia
                        scale={0.4} // Comece com um scale menor para tela cheia
                        modelPositionY={0} // Centralizado verticalmente na tela cheia
                        
                        className="w-full h-full"
                    />
                </ClientOnly>
            </div>

            {/* Área Inferior: Abas de Informação */}
            <div className="coin-info-area">
                <CoinInfoTabs />
            </div>
        </div>
    );
};

export default OlimpoCoinPage;