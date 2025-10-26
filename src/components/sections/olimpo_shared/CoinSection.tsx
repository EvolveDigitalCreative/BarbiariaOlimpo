import type { FC } from 'react';
import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react'; 
import InteractiveCoin3D from '../olimpo_shared/InteractiveCoin3D'; 

const ClientOnly: FC<{ fallback: React.ReactNode; children: React.ReactNode }> = ({ fallback, children }) => {
    const [isClient, setIsClient] = useState(false);
    useEffect(() => {
        setIsClient(true);
    }, []);
    return isClient ? <>{children}</> : <>{fallback}</>;
};

const CoinSection: FC = () => {
    return (
        <section className="coin-section w-full h-290">
            
            <div className="greek-pattern-divider top"></div>

            <div className="coin-content-bg">
                <div className="section-content-wrapper main-layout">
                    
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

                    <div className=" w-full h-290 section-image-container medium-image-centered">
                        
                        <div className="w-full h-290 coin-3d-wrapper">
                             <ClientOnly
                                fallback={
                                    <div className="w-full h-290 flex items-center justify-center bg-gray-200 rounded-full loading-coin-fallback">
                                        <div className="text-center">
                                            <div className="w-full h-290 border-4 border-amber-500 border-t-transparent rounded-full animate-spin mx-auto mb-2 loading-spinner"></div>
                                            <p className="text-sm text-gray-700 font-medium">Carregando moeda 3D...</p>
                                        </div>
                                    </div>
                                }
                            >
                                <InteractiveCoin3D 
                                    key="main-page-coin"
                                    
                                    // Props de visual para combinar com a nova imagem
                                    scale={0.35} // Moeda menor
                                    modelPositionY={-40} // Moeda bem baixa
                                    rotationSpeed={0.5} // Velocidade da rotação
                                    
                                    className="w-300 h-290"
                                />
                            </ClientOnly>
                            
                        </div>

<Link 
                            // AQUI: Mude para a rota da sua nova página
                            to="/olimpocoin" // Ou o caminho que você definiu no seu roteador
                            className="secondary-button coin-button-style"
                        >
                            VER MAIS...
                        </Link>
                    </div>

                </div>
            </div>
        </section>
    );
};

export default CoinSection;