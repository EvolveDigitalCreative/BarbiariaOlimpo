// src/components/home/MissionSection.tsx

import type { FC } from 'react';

const MissionSection: FC = () => {
    return (
        <section className="content-section mission-section">
            <div className="section-content-wrapper reverse-layout">
                {/* Texto */}
                <div className="section-text-container">
                    <h2 className="section-title gold-title">A NOSSA MISSÃO</h2>
                    <p className="section-paragraph">
                        A Olimpo Barbershop é mais do que um corte, é uma experiência pensada para o homem moderno, onde tradição e estilo se fundem num espaço autêntico e único. Aqui cada detalhe importa – do atendimento ao ambiente – criando um momento exclusivo, confortável e marcante. Não se trata apenas de aparência, mas de identidade, confiança e expressão pessoal através de um bom corte.
                    </p>
                </div>
                
                {/* Imagem */}
                <div className="section-image-container image-rounded">
                    {/* **Mude o caminho da imagem** */}
                    <img src="/barbershop/images/missao.jpg" alt="A Nossa Missão" className="responsive-image" />
                </div>
            </div>
        </section>
    );
};

export default MissionSection;