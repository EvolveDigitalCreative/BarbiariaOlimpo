// src/components/sections/olimpowear/WearVideoGallery.tsx

import { type FC, useState, useRef, useEffect } from 'react';

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
    const [activeVideoIndex, setActiveVideoIndex] = useState(0);
    const videoRefs = useRef<HTMLVideoElement[]>([]);

    // Avança para o próximo índice em loop
    const playNext = (currentIndex: number) => {
        const nextIndex = (currentIndex + 1) % videoItems.length;
        setActiveVideoIndex(nextIndex);
    };

    // Sempre que o índice ativo muda, pause todos os vídeos e tente tocar o ativo
    useEffect(() => {
        videoRefs.current.forEach((v, i) => {
            if (!v) return;
            try {
                if (i === activeVideoIndex) {
                    v.currentTime = 0;
                    // garantir muted para permitir autoplay
                    v.muted = true;
                    // play() retorna uma promise — ignoramos falhas silenciosamente
                    const p = v.play();
                    if (p && typeof p.then === 'function') p.catch(() => {/* autoplay prevented */});
                    v.style.opacity = '1';
                } else {
                    v.pause();
                    v.style.opacity = '0.3';
                }
            } catch (e) {
                // seguramos erros de reprodução para não quebrar o fluxo
            }
        });
    }, [activeVideoIndex]);

    // Quando um vídeo termina, avançar
    const handleVideoEnd = (currentIndex: number) => {
        playNext(currentIndex);
    };

    return (
        <section className="content-section wear-video-gallery-section">
            <div className="video-grid-container">
                {videoItems.map((video, index) => (
                    <div key={video.id} className={`video-card ${index === activeVideoIndex ? 'active' : ''}`}>
                        <div className="video-player-wrapper">
                            <video 
                                ref={(el) => { if (el) videoRefs.current[index] = el; }}
                                className="video-player"
                                muted
                                playsInline
                                loop={false}
                                onEnded={() => handleVideoEnd(index)}
                                // estilo de opacidade controlado em effect, mas mantemos inline como fallback
                                style={{ opacity: index === activeVideoIndex ? 1 : 0.3 }}
                            >
                                <source src={video.videoSrc} type="video/mp4" />
                                O seu browser não suporta o elemento de vídeo.
                            </video>
                        </div>
                    </div>
                ))}
            </div>
            
            {/* Borda grega no final */}
            <div className="greek-pattern-border-wear"></div>

        </section>
    );
};

export default WearVideoGallery;