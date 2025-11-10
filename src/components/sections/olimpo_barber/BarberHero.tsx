// src/components/home/HeroSection.tsx - ATUALIZADO PARA ABRIR O MODAL

import React, { useState, useEffect, useCallback, type FC } from 'react';
// Remova a importação do Link se não for mais usado neste componente
// import { Link } from 'react-router-dom'; 

// ✅ Importe o componente do Modal
import { BookingModal } from '../../common/BookingModal/BookingModal'; // Ajuste o caminho se necessário
import '../../../styles/olimpobarber/barber_hero.css';

const IMAGES_COUNT = 3;
const CAROUSEL_INTERVAL_MS = 5000;

const HeroSection: FC = () => {
    const [currentImageIndex, setCurrentImageIndex] = useState(1);
    // ✅ Estado para controlar a visibilidade do modal
    const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);

    const goToNextImage = useCallback(() => {
        setCurrentImageIndex(prevIndex =>
            prevIndex === IMAGES_COUNT ? 1 : prevIndex + 1
        );
    }, []);

    useEffect(() => {
        const interval = setInterval(goToNextImage, CAROUSEL_INTERVAL_MS);
        return () => clearInterval(interval);
    }, [goToNextImage]);

    const handleIndicatorClick = (index: number) => {
        setCurrentImageIndex(index);
    };

    // ✅ Função para abrir o modal
    const handleOpenBookingModal = () => {
        setIsBookingModalOpen(true);
    };

    // ✅ Função para fechar o modal (será passada para o componente BookingModal)
    const handleCloseBookingModal = () => {
        setIsBookingModalOpen(false);
    };

    // ✅ Função opcional para lidar com a seleção final no modal (se necessário)
    // const handleBookingComplete = (selectedData) => {
    //    console.log("Marcação finalizada com:", selectedData);
    //    handleCloseBookingModal(); 
    // };

    const heroClass = `hero-section ${currentImageIndex > 1 ? `carousel-${currentImageIndex}` : ''}`;

    return (
        // Envolvemos com React.Fragment (<>) para permitir múltiplos elementos raiz (section e modal)
        <>
            <section className={heroClass}>
                <div className="dark-overlay"></div>
                <div className="hero-content">
                    <h2 className="hero-titlesb">Where Gods are made</h2>

                    {/* ✅ TROCADO Link por Button */}
                    <button
                        className="hero-booking-button"
                        onClick={handleOpenBookingModal} // Chama a função para abrir o modal
                    >
                        Marcações
                    </button>

                    {/* Indicadores do Carrossel */}
                    <div className="carousel-indicators">
                        {[...Array(IMAGES_COUNT)].map((_, index) => {
                            const imageIndex = index + 1;
                            return (
                                <button
                                    key={imageIndex}
                                    className={`indicator ${currentImageIndex === imageIndex ? 'active' : ''}`}
                                    onClick={() => handleIndicatorClick(imageIndex)}
                                    aria-label={`Mudar para a imagem ${imageIndex}`}
                                />
                            );
                        })}
                    </div>
                </div>
            </section>

            {/* ✅ Renderiza o Modal condicionalmente */}
            <BookingModal
                isOpen={isBookingModalOpen}
                onClose={handleCloseBookingModal}
            // Passe outras props necessárias para o modal aqui, se houver
            // onConfirm={handleBookingComplete} 
            />
        </>
    );
};

export default HeroSection;