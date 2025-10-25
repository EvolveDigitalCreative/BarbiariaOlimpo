import type { FC } from 'react';
import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react'; 
// IMPORTANTE: Mude o caminho abaixo para onde o seu InteractiveCoin3D está
import InteractiveCoin3D from '../olimpo_shared/InteractiveCoin3D'; 

// Componente auxiliar para carregar o 3D apenas no cliente
const ClientOnly: FC<{ fallback: React.ReactNode; children: React.ReactNode }> = ({ fallback, children }) => {
    const [isClient, setIsClient] = useState(false);
    useEffect(() => {
        setIsClient(true);
    }, []);
    return isClient ? <>{children}</> : <>{fallback}</>;
};

const CoinSection: FC = () => {
    return (
        // Classes para aplicar os estilos de fundo e layout
        <section className="coin-section">
            
            {/* Faixa decorativa no topo - como na segunda imagem */}
            <div className="greek-pattern-divider top"></div>

            {/* Fundo claro para o conteúdo */}
            <div className="coin-content-bg">
                {/* O 'main-layout' gerenciará o Grid de duas colunas */}
                <div className="section-content-wrapper main-layout">
                    
                    {/* Texto - O CSS irá colocar este bloco à esquerda (Order 1) */}
                    <div className="section-text-container left-aligned-text">
                        <p className="section-paragraph">
                            Apresentamos a <strong className="gold-text-strong">OLIMPO COIN</strong>.
                        </p>
                        <p className="section-paragraph">
                            Inspirada no minimalismo e na elegância da Grécia Antiga, a Olimpo Coin foi cuidadosamente criada para oferecer benefícios exclusivos aos nossos clientes.
                        </p>
                        <p className="section-paragraph">
                            A cada corte realizado na nossa barbearia, recebes uma Olimpo Coin, e a cada skin care realizada na Olimpo Skin recebes 2. Com elas, podes obter descontos nas nossas t-shirts e até ganhar uma gratuita.
                        </p>
                        <p className="section-paragraph">
                            Quanto mais coins acumulares, maiores serão as tuas recompensas.
                        </p>
                        <p className="section-small-text">
                            Requisito: Ter uma conta criada na nossa plataforma.
                        </p>
                    </div>

                    {/* Imagem/3D e Botão - O CSS irá colocar este bloco à direita (Order 2) */}
                    <div className="section-image-container medium-image-centered">
                        
                        {/* Wrapper para o 3D Coin */}
                        <div className="coin-3d-wrapper">
                            {/* Componente 3D Condicional (ClientOnly) */}
                             <ClientOnly
                                fallback={
                                    <div className="w-full h-full flex items-center justify-center bg-gray-200 rounded-full loading-coin-fallback">
                                        <div className="text-center">
                                            <div className="w-12 h-12 border-4 border-amber-500 border-t-transparent rounded-full animate-spin mx-auto mb-2 loading-spinner"></div>
                                            <p className="text-sm text-gray-700 font-medium">Carregando moeda 3D...</p>
                                        </div>
                                    </div>
                                }
                            >
                                <InteractiveCoin3D 
                                    key="main-page-coin"
                                    autoRotate={true} // Desabilitado para permitir rotação manual total
                                    rotationSpeed={0.5}
                                    scale={0.2} // <<< ATUALIZADO: Usando o novo scale maior
                                    enableControls={true} // <<< ATUALIZADO: Habilita rotação e zoom manual
                                    className="w-full h-full"
                                />
                            </ClientOnly>
                            
                        </div>

                        {/* Botão abaixo da moeda */}
                        <Link to="/coins" className="secondary-button coin-button-style">
                            VER MAIS...
                        </Link>
                    </div>

                </div>
            </div>
        </section>
    );
};

export default CoinSection;
