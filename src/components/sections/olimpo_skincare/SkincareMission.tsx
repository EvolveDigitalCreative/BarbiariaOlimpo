// src/components/sections/olimpo_skincare/SkincareMission.tsx

import type { FC } from 'react';

const SkincareMission: FC = () => {

    // --- Styles Inline de Margem Ajustados ---
    
    // Altura do padrão grego (usado para calcular o padding da secção)
    const greekPatternHeight = '25px';

    const sectionStyles: React.CSSProperties = {
        // Reduz o padding superior e inferior para compensar as margens internas e o padrão grego
        paddingTop: '40px',       // Ajustado de 60px para 40px
        paddingBottom: '40px',    // Ajustado de 60px para 40px
    };

    const wrapperStyles: React.CSSProperties = {
        flexDirection: 'column', 
        textAlign: 'center',
        maxWidth: '800px',
        margin: '0 auto',
        padding: '0 20px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    };
    
    // --- Margens de Elementos Específicos (Ajustadas) ---
    
    const iconContainerStyles: React.CSSProperties = {
        // Reduz o espaço abaixo do ícone
        marginBottom: '-10px', // Reduzido de 20px para 10px
        marginTop: '0',
    };
    
    const titleStyles: React.CSSProperties = {
        // Reduz o espaço abaixo do título
        marginTop: '0', 
        marginBottom: '-20px', 
    };
    
    const paragraphStyles: React.CSSProperties = {
        // Reduz o espaço abaixo do parágrafo, mas mantém o espaço para o botão
        fontSize: '1.4rem',
        marginBottom: '20px', // Reduzido de 30px para 20px
    };

    const greekPatternTopStyles: React.CSSProperties = {
        height: greekPatternHeight,
        width: '100%',
        backgroundImage: 'url(OlimpoSkincare/patterns/greek-key-gold.png)', // Não alterado
        backgroundRepeat: 'repeat-x',
        backgroundSize: `auto ${greekPatternHeight}`,
        margin: '0', 
    };
    
    // O estilo do botão é assumido pela classe 'skincare-main-button'.
    // A margem inferior do botão é controlada pelo 'marginBottom' do parágrafo acima e pelo padding da secção.


    return (
        <section 
            className="content-section light-background" 
            style={sectionStyles}
        >
            {/* PADRÃO GREGO - TOPO */}
            <div className="greek-pattern-border" style={greekPatternTopStyles}></div>
            
            <div className="section-content-wrapper" style={wrapperStyles}>
                
                <div className="mission-icon-container" style={iconContainerStyles}>
                    {/* O SRC é mantido como 'whitecoin.png' conforme solicitado. */}
                    <img 
                        src="OlimpoSkincare/icons/whitecoin.png" 
                        alt="Olimpo Coin" 
                        style={{ width: '80px', margin: '0' }} // Reduzi o ícone para 80px para replicar melhor
                    />
                </div>

                <h2 className="skincare-section-title" style={titleStyles}>
                    A NOSSA MISSÃO
                </h2>
                
                <p className="section-paragraph" style={paragraphStyles}>
                    No Olimpo Skin, cuidamos da pele e do olhar com protocolos personalizados de limpeza de pele, extensão de pestanas e design de sobrancelhas, cuidamos de cada detalhe com foco no bem-estar e nos resultados visíveis.
                </p>

                <a href="/sobre-nos" className="skincare-main-button">
                    Descobre mais
                </a>

            </div>
            
            {/* PADRÃO GREGO - RODAPÉ */}
            <div 
                className="greek-pattern-border" 
                style={{ 
                    ...greekPatternTopStyles, 
                    marginTop: '20px' // Reduzido de 50px para 20px
                }}
            ></div>
        </section>
    );
};

export default SkincareMission;