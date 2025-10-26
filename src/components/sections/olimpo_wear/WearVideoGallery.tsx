// src/components/sections/olimpowear/WearVideoGallery.tsx

import type { FC } from 'react';

// === DADOS DOS VÍDEOS ===
const videoItems = [
    // ATENÇÃO: Confirme que renomeou os ficheiros para usar hífens no seu disco e Git.
    { 
        id: 1, 
        name: "Primeiro vídeo da coleção Olimpo Wear",
        videoSrc: "OlimpoWear/videos/primerio video.mp4" 
    },
    { 
        id: 2, 
        name: "Segundo vídeo da coleção Olimpo Wear", 
        videoSrc: "OlimpoWear/videos/segundo video.mp4" 
    },
    { 
        id: 3, 
        name: "Terceiro vídeo da coleção Olimpo Wear", 
        videoSrc: "OlimpoWear/videos/terceiro video.mp4" 
    },
];

// === COMPONENTE ===
const WearVideoGallery: FC = () => {
    return (
        <section className="content-section wear-video-gallery-section">
            
            {/* O título "A Atitude Olimpo em Ação" FOI REMOVIDO para replicar o design final. */}

            <div className="video-grid-container">
                {videoItems.map((video) => (
                    <div key={video.id} className="video-card">
                        {/* Wrapper para proporção vertical */}
                        <div className="video-player-wrapper">
                            <video 
                                className="video-player"
                                controls 
                                loop 
                                muted
                                playsInline
                                // Se for para ter autoplay (sem som, com loop), adicione 'autoplay'
                                // autoplay
                            >
                                <source src={video.videoSrc} type="video/mp4" />
                                O seu browser não suporta o elemento de vídeo.
                            </video>
                        </div>
                        
                        {/* O nome do vídeo está agora escondido pelo CSS, mas o elemento HTML permanece. */}
                        {/* <p className="video-title-name">{video.name}</p> */}
                    </div>
                ))}
            </div>
            
            {/* Borda grega no final */}
            <div className="greek-pattern-border-wear"></div>

        </section>
    );
};

export default WearVideoGallery;