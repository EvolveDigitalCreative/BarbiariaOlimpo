// src/components/sections/olimpo_skincare/SkincareReviews.tsx

import type { FC } from 'react';

const reviews = [
    { text: "Sed risus pretium quam vulputate... Suspendisse sem in.", author: "Lucetta Birgitta", rating: 5 },
    { text: "A pele fica incrível! Recomendo a todos.", author: "Ricardo Silva", rating: 5 },
];

const SkincareReviews: FC = () => {
    return (
        <section className="review-section">
            <div className="review-header">
                <div>
                    <p className="gold-text-strong">CLIENTES OLIMPO</p>
                    <h2 className="review-title">
                        Testimonial & Review
                    </h2>
                    <p style={{ maxWidth: '300px', fontSize: '0.9rem', color: '#ccc' }}>
                        Descubra as opiniões reais de quem já experimentou o poder da Olimpo Skin.
                    </p>
                </div>
                
                <div className="review-carousel-controls">
                    <button className="review-arrow-button" aria-label="Anterior">{'<'}</button>
                    <button className="review-arrow-button" aria-label="Próximo">{'>'}</button>
                </div>
            </div>

            <div className="review-card-container">
                {reviews.map((review, index) => (
                    <div className="review-card" key={index}>
                        <p className="review-card-text">{review.text}</p>
                        <div className="review-card-author">
                            <img src={`/reviews/author-${index + 1}.jpg`} alt={review.author} />
                            <span>{review.author}</span>
                            
                            {/* CORREÇÃO DO ERRO TS: Usa a classe CSS para a cor */}
                            <span className="review-card-rating">
                                {'★'.repeat(review.rating)}
                            </span>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
};

export default SkincareReviews;