// src/components/sections/olimpowear/WearVideoGallery.tsx

import type { FC } from 'react';

// Dados para criar 5 placeholders
const videoData = [
    { id: 1 }, { id: 2 }, { id: 3 }, { id: 4 }, { id: 5 },
];

const WearVideoGallery: FC = () => {
  return (
    <section className="wear-video-gallery-section">
      
      {/* O Grid com o layout adaptado para 5 itens */}
      <div className="video-lifestyle-grid">
        
        {videoData.map((video) => (
            /* Os placeholders vão receber os estilos de layout via CSS */
            <div key={video.id} className={`video-placeholder video-${video.id}`}>
                {/* Aqui entrará o código do iframe/player de vídeo */}
                <p>Espaço para Vídeo {video.id}</p>
            </div>
        ))}

      </div>
      
    </section>
  );
};

export default WearVideoGallery;