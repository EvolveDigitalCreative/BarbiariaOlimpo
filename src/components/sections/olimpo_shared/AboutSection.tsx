// src/components/home/AboutSection.tsx (Versão Final e Corrigida)

import type { FC } from 'react';

const AboutSection: FC = () => {
    return (
        // Certifique-se de que a cor de fundo seja #000 (preto) e o texto branco (dark-background)
        <section className="content-section about-section dark-background relative-section"> 
            
            {/* Detalhes Decorativos - Atenção ao caminho: use barras normais (/) no React, mesmo no Windows! */}
            <img
                src="src\OlimpoBarBer\Decoracao\style2_optimized.png" /* Caminho corrigido para barra */
                alt=""
                aria-hidden="true"
                className="decorative-style style-top-left"
            />
            <img
                src="src\OlimpoBarBer\Decoracao\style3_optimized.png" /* Caminho corrigido para barra */
                alt=""
                aria-hidden="true"
                className="decorative-style style-bottom-right"
            />
            
            {/* Div Principal: Ordem Padrão (Texto | Imagem) */}
            <div className="section-content-wrapper about-content-wrapper relative z-10"> 
                {/* 1. Texto (Fica à Esquerda) */}
                <div className="section-text-container">
                    <h2 className="section-title4 gold-title about-title-size">A BELEZA DO OLIMPO</h2> 
                    
                    <div className="space-y-4">
                        <p className="section-paragraph4 about-paragraph-size paragraph-spaced">
                            A nossa barbearia nasce de um conceito singular: unir a excelência do cuidado masculino à grandeza intemporal da Grécia Antiga. Não somos apenas uma barbearia — somos um templo moderno onde a arte da estética é elevada à nobreza de um ritual clássico.
                        </p>
                        <p className="section-paragraph4 about-paragraph-size paragraph-spaced">
                            Seja bem-vindo à verdadeira arte de cuidar de si, como um deus grego nos tempos de hoje.
                        </p>
                    </div>
                </div>
                
                {/* 2. Imagem (Fica à Direita) */}
                {/* A classe 'about-image-fixed' será ajustada no CSS para usar justify-end */}
                <div className="section-image-container image-rounded about-image-fixed">
                    {/* Contêiner interno para o tamanho fixo */}
                    <div className="about-image-wrapper">
                        <img 
                            src="src\OlimpoBarBer\images\space10_optimized.webp" /* Caminho corrigido e URL de exemplo do Tailwind */
                            alt="Detalhes do espaço da barbearia" 
                            className="responsive-image object-cover-fit" 
                        />
                    </div>
                </div>
            </div>
        </section>
    );
};

export default AboutSection;