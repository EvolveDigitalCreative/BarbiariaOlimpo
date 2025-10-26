import type { FC } from 'react';
import { Link } from 'react-router-dom';

// NOTA: O modal e as moedas no canto são widgets externos.
// Focamos apenas na estrutura do Hero Section: Texto Esquerda e Visual Direita.

const SkincareHero: FC = () => {
    return (
        <section className="hero-section skincare-hero">
            
            <div className="hero-container">
                
                {/* COLUNA ESQUERDA: Texto e Botão */}
                <div className="hero-text-content">
                    
                    <h1 className="skincare-hero-title">
                        Uma pele radiante começa aqui.
                    </h1>
                    <p className="skincare-hero-subtitle">
                        Eleva o teu brilho.
                    </p>
                    
                    {/* Botão - Usamos Link ou um botão se for modal */}
                    <Link to="/marcacoes" className="skincare-main-button">
                        Marcações
                    </Link>
                </div>

                {/* COLUNA DIREITA: Imagem, Arco e Texto Inferior Grande */}
                <div className="hero-visual-content">
                    
                    {/* O ARCO de fundo (com padrão de mármore) */}
                    <div className="skincare-image-arch-wrapper">
                        {/* IMAGEM PRINCIPAL - Path corrigido */}
                        <img 
                            src="/OlimpoSkincare/images/foto princpal inicio do web site.jpg" 
                            alt="Modelo Skincare" 
                            className="skincare-hero-image"
                        />
                    </div>
                </div>

                {/* Texto OLIMPO SKIN CARE por baixo da imagem (Independente das colunas) */}
                <h2 className="skincare-hero-banner-text">
                    OLIMPO SKIN CARE
                </h2>

            </div>
            
        </section>
    );
};

export default SkincareHero;