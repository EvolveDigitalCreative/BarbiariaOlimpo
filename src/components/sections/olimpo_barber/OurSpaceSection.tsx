// src/components/home/OurSpaceSection.tsx
import type { FC } from 'react';

const OurSpaceSection: FC = () => {
    // Array de imagens do projeto anterior, mas formatado para o seu atual
    const images = [
        { src: 'public/OlimpoBarBer/images/primeira foto da sequnecia.webp', alt: 'Espaço da barbearia 1' },
        // A próxima linha tem uma correção no caminho de 'our-space' para 'space' para manter a convenção,
        // mas você pode ajustar conforme o caminho real no seu projeto atual.
        { src: 'public/OlimpoBarBer/images/Segunda foto da sequencia.webp', alt: 'Espaço da barbearia 2' },
        { src: 'public/OlimpoBarBer/images/terceira foto da sequencia.webp', alt: 'Espaço da barbearia 3' },
        { src: 'public/OlimpoBarBer/images/quarta foto da sequencia.webp', alt: 'Espaço da barbearia 4' },
        { src: 'public/OlimpoBarBer/images/quinta foto da sequencia.webp', alt: 'Espaço da barbearia 5' },
        { src: 'public/OlimpoBarBer/images/sexta foto da sequencia.webp', alt: 'Espaço da barbearia 6' },
    ];

    // O código de marcação (JSX) segue a estrutura do seu projeto atual.
    return (
        <section className="content-section our-space-section light-background" aria-label="O Nosso Espaço">
            <div className="greek-border-top"></div> {/* Se esta borda for necessária no topo desta seção */}

            <div className="space-gallery-wrapper">
                {/* Cabeçalho */}
                <h2 className="section-title5 gold-title section-title-centered">O NOSSO ESPAÇO</h2>
                <p className="section-subtitle-centered5">
                    Bem vindo ao nosso espaço, com linhas contemporâneas a casa dos Deuses, o monte Olimpo
                </p>

                {/* Ornamento central (Usando a estrutura do anel dourado do projeto atual) */}
                <div className="divider-icon6">
                    {/* Se quiser o anel dourado, use: <div className="gold-ring"></div> */}
                    {/* Para usar a imagem do ornamento do projeto anterior, use: */}
                    <img
                        src="public\OlimpoBarBer\Decoracao\style4_optimized.png"
                        alt=""
                        aria-hidden="true"
                        className="stylization-icon" // **Adicione esta classe ao seu CSS se precisar de um tamanho específico**
                    />
                </div>
                
                {/* Grelha de Imagens */}
                <div className="gallery-grid">
                    {images.map((img, index) => (
                        // A classe `gallery-item` e `image-rounded` devem ser responsáveis pelo estilo do item.
                        <div key={index} className={`gallery-item item-${index + 1}`}>
                            <img 
                                src={img.src} 
                                alt={img.alt} 
                                className="responsive-image image-rounded" 
                            />
                        </div>
                    ))}
                </div>
            </div>
            {/* O conteúdo da seção CONTACTA-NOS não está aqui, será no ContactSection. */}
        </section>
    );
};

export default OurSpaceSection;