// src/components/sections/olimpo_wear/WearVideoGallery.tsx (FINAL SEM TÍTULO)

import type { FC } from 'react';

const WearVideoGallery: FC = () => {
    // Array para mapear e criar 4 blocos de vídeo
    const videoPlaceholders = [1, 2, 3, 4];

    return (
        <section className="wear-video-gallery-section no-title">
            {/* REMOVIDO: <h2 className="video-section-title">A Atitude Olimpo em Ação</h2> */}
            
            <div className="video-grid-container">
                {videoPlaceholders.map((index) => (
                    <div 
                        key={index}
                        className={`video-placeholder`}
                    >
                        Espaço para Vídeo {index}
                    </div>
                ))}
            </div>
        </section>
    );
};

export default WearVideoGallery;