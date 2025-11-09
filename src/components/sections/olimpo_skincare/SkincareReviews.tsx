// src/components/sections/olimpo_skincare/SkincareReviews.tsx
import type { FC } from 'react';
import {useRef } from 'react'; // ⭐️ IMPORTAÇÃO ATUALIZADA: Adicionado useRef

const reviews = [
    { text: "Sed risus pretium quam vulputate... Suspendisse sem in.", author: "Lucetta Birgitta", rating: 5 },
    { text: "A pele fica incrível! Recomendo a todos.", author: "Ricardo Silva", rating: 5 },
    { text: "Serviço profissional e atencioso. Resultados visíveis na primeira sessão.", author: "Sofia Martins", rating: 5 },
    { text: "O melhor tratamento de pele que já experimentei. Espaço muito acolhedor.", author: "André Costa", rating: 5 },
    { text: "Nunca mais dispenso o meu ritual na Olimpo Skin. 5 estrelas!", author: "Carolina Faria", rating: 5 },
];

const SkincareReviews: FC = () => {
    // ⭐️ 1. CRIAR UMA REFERÊNCIA para o elemento do carrossel
    const carouselRef = useRef<HTMLDivElement>(null);

    // ⭐️ 2. FUNÇÃO PARA MOVIMENTAR O CARROSSEL
    const scrollCarousel = (direction: 'prev' | 'next') => {
        if (carouselRef.current) {
            const container = carouselRef.current;
            // Define o tamanho de um "passo" (largura do cartão + gap)
            // Assumimos que a largura do cartão é 320px e o gap é 20px (do CSS)
            const scrollAmount = 340; 

            if (direction === 'next') {
                container.scrollLeft += scrollAmount;
            } else {
                container.scrollLeft -= scrollAmount;
            }
        }
    };

    return (
        <section className="skincare-review-section">
            
            <div className="skincare-review-content-wrapper">
                
                {/* COLUNA ESQUERDA: Título, Descrição e Controlos */}
                <div className="skincare-review-info-column">
                    <p className="gold-text-strong">CLIENTES OLIMPO</p>
                    <h2 className="skincare-review-title">
                        Testimonial & Review
                    </h2>
                    <p className="skincare-review-description">
                        Descubra as opiniões reais de quem já experimentou o poder da Olimpo Skin.
                    </p>
                    
                    {/* CONTROLOS (Setas) - Adiciona onClick para o controlo do scroll */}
                    <div className="skincare-review-carousel-controls">
                        <button 
                            className="skincare-arrow-button" 
                            aria-label="Anterior" 
                            onClick={() => scrollCarousel('prev')} // ⭐️ Lógica de scroll
                        >
                            {'<'}
                        </button>
                        <button 
                            className="skincare-arrow-button" 
                            aria-label="Próximo" 
                            onClick={() => scrollCarousel('next')} // ⭐️ Lógica de scroll
                        >
                            {'>'}
                        </button>
                    </div>
                </div>
                

                {/* COLUNA DIREITA: Carrossel de Reviews */}
                <div className="skincare-review-carousel-track" ref={carouselRef}> 
                    {reviews.map((review, index) => (
                        <div className="skincare-review-card" key={index}>
                            <p className="skincare-review-card-text">{review.text}</p>
                            <div className="skincare-review-card-author">
                                <img src={`OlimpoSkincare/reviews/author-${(index % 5) + 1}.jpg`} alt={review.author} className="skincare-author-photo" />
                                <span>{review.author}</span>
                                
                                <span className="skincare-review-card-rating">
                                    {'★'.repeat(review.rating)}
                                </span>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default SkincareReviews;