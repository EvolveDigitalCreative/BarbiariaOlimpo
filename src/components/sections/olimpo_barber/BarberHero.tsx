// src/components/home/HeroSection.tsx

import React, { useState, useEffect, useCallback, type FC } from 'react';
import { Link } from 'react-router-dom';

// Define o número total de imagens (baseado no seu CSS: 1 padrão + 2 classes)
const IMAGES_COUNT = 3; 
// Define o tempo de transição automática em milissegundos (ex: 5 segundos)
const CAROUSEL_INTERVAL_MS = 5000; 

const HeroSection: FC = () => {
    // 1. Estado: Rastreia o índice da imagem atual (1, 2 ou 3)
    const [currentImageIndex, setCurrentImageIndex] = useState(1);

    // 2. Função de Avanço: Calcula o próximo índice do carrossel
    const goToNextImage = useCallback(() => {
        setCurrentImageIndex(prevIndex => 
            // Se for o último índice, volta para 1; senão, avança.
            prevIndex === IMAGES_COUNT ? 1 : prevIndex + 1
        );
    }, []);
    
    // 3. Efeito Colateral: Configura o avanço automático do carrossel
    useEffect(() => {
        const interval = setInterval(goToNextImage, CAROUSEL_INTERVAL_MS);
        
        // Limpeza: Garante que o intervalo seja cancelado quando o componente for desmontado
        return () => clearInterval(interval);
    }, [goToNextImage]);

    // 4. Função de Clique: Mudar a imagem manualmente
    const handleIndicatorClick = (index: number) => {
        setCurrentImageIndex(index);
    };

    // 5. Classe Dinâmica: Constrói a string de classes CSS.
    // Se o índice for 1, retorna "hero-section".
    // Se o índice for 2, retorna "hero-section carousel-2".
    // Se o índice for 3, retorna "hero-section carousel-3".
    const heroClass = `hero-section ${currentImageIndex > 1 ? `carousel-${currentImageIndex}` : ''}`;

    return (
        // A classe dinâmica é aplicada aqui, alterando o background via CSS
        <section className={heroClass}>
            
            {/* O overlay escuro (necessário para o CSS) */}
            <div className="dark-overlay"></div>
            
            <div className="hero-content">
                <h2 className="hero-title">Where Gods are made</h2>
                
                <Link to="/booking" className="hero-booking-button">
                    Marcações
                </Link>
                
                {/* Indicadores do Carrossel (Agora dinâmicos) */}
                <div className="carousel-indicators">
                    {/* Mapeia de 0 a IMAGES_COUNT - 1, resultando nos índices 1, 2, 3 */}
                    {[...Array(IMAGES_COUNT)].map((_, index) => {
                        const imageIndex = index + 1; // 1, 2, 3
                        
                        return (
                            <button
                                key={imageIndex}
                                // Aplica a classe 'active' se for a imagem atual
                                className={`indicator ${currentImageIndex === imageIndex ? 'active' : ''}`}
                                // Define a função de clique para mudar o estado
                                onClick={() => handleIndicatorClick(imageIndex)}
                                aria-label={`Mudar para a imagem ${imageIndex}`}
                            />
                        );
                    })}
                </div>
            </div>
        </section>
    );
};

export default HeroSection;