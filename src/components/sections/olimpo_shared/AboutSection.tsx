// src/components/home/AboutSection.tsx

import type { FC } from 'react';

const AboutSection: FC = () => {
    return (
        <section className="content-section about-section dark-background">
            <div className="greek-border-top"></div>
            
            <div className="section-content-wrapper">
                {/* Texto */}
                <div className="section-text-container white-text">
                    <h2 className="section-title gold-title">A BELEZA DO OLIMPO</h2>
                    <p className="section-paragraph">
                        A nossa barbearia nasce de um conceito singular: unir a excelência do cuidado masculino à grandeza intemporal da Grécia Antiga. Não somos apenas uma barbearia – somos um templo onde onde a arte da estética é elevada à nobreza de um ritual clássico.
                    </p>
                    <p className="section-paragraph">
                        Seja bem-vindo à verdadeira arte de cuidar de si, como um deus grego nos tempos de hoje.
                    </p>
                </div>
                
                {/* Imagem */}
                <div className="section-image-container image-rounded">
                    {/* **Mude o caminho da imagem** */}
                    <img src="/barbershop/images/beleza-olimpo.jpg" alt="A Beleza do Olimpo" className="responsive-image" />
                </div>
            </div>

            <div className="greek-border-bottom"></div>
        </section>
    );
};

export default AboutSection;