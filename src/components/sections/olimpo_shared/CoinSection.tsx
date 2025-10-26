import type { FC } from 'react';
import { Link } from 'react-router-dom';
// REMOVA useState e useEffect se não forem mais usados
import InteractiveCoin3D from '../olimpo_shared/InteractiveCoin3D'; 
import '../../../styles/olimpobarber/Barber_coin.css';

// REMOVA O COMPONENTE ClientOnly DAQUI
/*
const ClientOnly: FC<{ ... }> = ({ ... }) => { ... };
*/

const CoinSection: FC = () => {
    return (
        <section className="coin-section">
            
            <div className="greek-pattern-divider top"></div>

            <div className="coin-content-bg">
                <div className="section-content-wrapper main-layout">
                    
                    <div className="section-text-container left-aligned-text FonteCoin">
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

                    <div className="section-image-container medium-image-centered">
                        
                        <div className="coin-3d-wrapper">
                            {/* REMOVIDO O <ClientOnly>
                              O <Suspense> dentro de InteractiveCoin3D cuidará do loading.
                            */}
                            <InteractiveCoin3D 
                             autoRotate={true} 
                                rotationSpeed={0.5}
                                enableControls={false}
                                scale={0.25}
                                modelPositionY={0}
                                className="w-full h-full"
                            />
                        </div>

                        <Link to="/olimpocoin" className="secondary-button coin-button-style">
                            VER MAIS...
                        </Link>
                    </div>

                </div>
            </div>
        </section>
    );
};

export default CoinSection;