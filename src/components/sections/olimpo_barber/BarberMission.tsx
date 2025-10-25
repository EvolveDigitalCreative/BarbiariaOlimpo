// src/components/home/MissionSection.tsx

import type { FC } from 'react';

const MissionSection: FC = () => {
    return (
        <section className="content-section mission-section light-background">
            {/* O max-width e mx-auto já estão em .section-content-wrapper */}
            <div className="section-content-wrapper reverse-layout"> 
                {/* Texto */}
                <div className="section-text-container">
                    {/* Título com classes existentes, mas a margem será ajustada no CSS */}
                    <h2 className="section-title gold-title large-title">A NOSSA MISSÃO</h2> 
                    
                    {/* Contêiner de Parágrafo para aplicar a limitação de largura (lg:w-3/4) */}
                    <div className="paragraph-container">
                        <p className="section-paragraph large-paragraph"> 
                            A Olimpo Barbershop é mais do que um corte, é uma experiência pensada para o homem moderno, onde tradição e estilo se fundem num espaço autêntico e único. Aqui cada detalhe importa – do atendimento ao ambiente – criando um momento exclusivo, confortável e marcante. Não se trata apenas de aparência, mas de identidade, confiança e expressão pessoal através de um bom corte.
                        </p>
                    </div>
                </div>
                
                {/* Vídeo */}
                <div className="section-video-container video-rounded video-4-5-aspect"> {/* Novas classes para proporção e max-width */}
                    <video
                        className="responsive-video"
                        loop
                        autoPlay
                        muted
                        playsInline
                    >
                        {/* **Mude o caminho e o tipo** */}
                        <source src="../../../public/olimpobarber/video/Canavarro.webm" type="video/webm" />
                        Seu navegador não suporta a tag de vídeo.
                    </video>
                </div>
            </div>
        </section>
    );
};

export default MissionSection;