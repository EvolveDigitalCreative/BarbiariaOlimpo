//src/components/sections/olimpo_skincare/SkincareHero.tsx
import type { FC } from 'react';
import { useState } from 'react';
import { Link } from 'react-router-dom'; 
import '../../../styles/olimposkincare/skincare_hero.css';

// Assumindo que este componente é externo e existe
interface SkincareBookingModalProps {
    open: boolean;
    onClose: () => void;
}
const SkincareBookingModal: FC<SkincareBookingModalProps> = () => null; // Placeholder

const SkincareHero: FC = () => {
    const [openBooking, setOpenBooking] = useState(false);

    function openModal(event: MouseEvent<HTMLButtonElement, MouseEvent>): void {
        throw new Error('Function not implemented.');
    }

    return (
        <section className="skincare-hero-section">
            
            {/* 1. Background (Fundo de Mármore) */}
            <div className="hero-background">
                <img 
                    src="OlimpoSkincare/decoracao/fundomarmore.webp"
                    alt="Fundo mármore"
                    className="hero-bg-image"
                />
                <div className="hero-bg-overlay"></div>
            </div>

            {/* 4. Texto Grande de Fundo (OLIMPO SKIN CARE) - Movemos para uma posição estrutural mais alta */}
            {/* Isto ajuda a garantir que fica por baixo do conteúdo principal sem afetar o layout flexível */}
                <div className="hero-large-text-wrapper">
                    <div className="hero-large-text">
                        <span>O L I M P O</span>
                        <span>S K I N</span>
                        <span>C A R E</span>
                    </div>
                </div>

            {/* 2. Conteúdo Principal (Texto Esquerda, Imagem Centro) */}
            <div className="hero-content-wrapper">
                
                {/* LADO ESQUERDO: Headline e CTA */}
                <div className="hero-left-content">
                    <div className="hero-headline">
                        <h2 className="hero-title">Uma pele radiante começa aqui.</h2>
                        <h2 className="hero-subtitle">Eleva o teu brilho.</h2>
                    </div>
                <button onClick={openModal} className="skincare-main-button">
                    Marcações
                </button>
                </div>
                
                {/* 3. Imagem Central (O ARCO) */}
                <div className="hero-center-image-wrapper">
                    <img 
                        src="/OlimpoSkincare/images/foto princpal inicio do web site.jpg" 
                        alt="Olimpo Skin Modelo" 
                        className="hero-center-image"
                    />
                </div>
                
            </div>

            {/* WIDGET: Moedas no lado direito (Widget Externo) - Mantemos fora do wrapper principal para posicionamento absoluto fácil */}
            <div className="hero-coins-widget">
                <div className="coins-container">
                    <Link to="/" className="coin-link">
                        <img src="OlimpoBarBer/icons/icone de nevegcao da skincare.png" alt="Olimpo Barber" className="coin-image-barber" />
                    </Link>
                    <Link to="/wear" className="coin-link">
                        <img src="OlimpoBarBer/icons/icone de nevegacao do waer.png" alt="Wear" className="coin-image-wear" />
                    </Link>
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