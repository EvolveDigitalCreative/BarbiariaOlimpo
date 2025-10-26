//src/components/sections/olimpo_skincare/SkincareHero.tsx
import type { FC } from 'react';
import { useState } from 'react';
// Usamos 'react-router-dom' em vez de '@tanstack/react-router'
import { Link } from 'react-router-dom'; 

// Assumindo que este componente é externo e existe
interface SkincareBookingModalProps {
    open: boolean;
    onClose: () => void;
}
const SkincareBookingModal: FC<SkincareBookingModalProps> = () => null; // Placeholder


const SkincareHero: FC = () => {
    const [openBooking, setOpenBooking] = useState(false);

    return (
        <section className="skincare-hero-section">
            
            {/* 1. Background (Fundo de Mármore) */}
            <div className="hero-background">
                {/* A imagem de fundo de mármore */}
                <img 
                    src="public/OlimpoSkincare/espaco/fundomarmore.webp" 
                    alt="Fundo mármore" 
                    className="hero-bg-image"
                />
                {/* Overlay sutil para legibilidade */}
                <div className="hero-bg-overlay"></div>
            </div>

            {/* 2. Conteúdo Principal (Texto Esquerda, Imagem Centro) */}
            <div className="hero-content-wrapper">
                
                {/* LADO ESQUERDO: Headline e CTA (Visível em Desktop) */}
                <div className="hero-left-content">
                    <div className="hero-headline">
                        <h2 className="hero-title">Uma pele radiante começa aqui.</h2>
                        <h2 className="hero-subtitle">Eleva o teu brilho.</h2>
                    </div>
                    <button 
                        onClick={() => setOpenBooking(true)}
                        className="hero-cta-button"
                    >
                        Marcações
                    </button>
                </div>
                
                {/* WIDGET: Moedas no lado direito (Widget Externo) */}
                <div className="hero-coins-widget">
                    <div className="coins-container">
                        <Link to="/" className="coin-link">
                            <img src="/barbershop/icons/OlimpoBarber.png" alt="Olimpo Barber" className="coin-image-barber" />
                        </Link>
                        <Link to="/wear" className="coin-link">
                            <img src="/barbershop/icons/goldcoin.png" alt="Wear" className="coin-image-wear" />
                        </Link>
                    </div>
                </div>

                {/* 3. Imagem Central (O ARCO) */}
                <div className="hero-center-image-wrapper">
                    <img 
                        // Corrigi o path para a imagem que aparece no design final
                        src="/OlimpoSkincare/images/foto princpal inicio do web site.jpg" 
                        alt="Olimpo Skin Modelo" 
                        className="hero-center-image"
                    />
                </div>

                {/* 4. Texto Grande de Fundo (OLIMPO SKIN CARE) */}
                {/* O código original usava divs/spans separados para cada letra. Vamos mantê-lo para o espaçamento exato. */}
                <div className="hero-large-text-wrapper">
                    <div className="hero-large-text">
                        <span>O L I M P O</span>
                        <span className="text-space">S</span>
                        <span>K I N</span>
                        <span className="text-space">C</span>
                        <span>A R E</span>
                    </div>
                </div>
            </div>

            {/* Modal de Marcações (Placeholder) */}
            <SkincareBookingModal 
                open={openBooking} 
                onClose={() => setOpenBooking(false)} 
            />
        </section>
    );
};

export default SkincareHero;