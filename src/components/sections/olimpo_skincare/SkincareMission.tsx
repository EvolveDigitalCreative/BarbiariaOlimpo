// src/components/sections/olimpo_skincare/SkincareMission.tsx

import type { FC } from 'react';

const SkincareMission: FC = () => {
    return (
        <section className="content-section light-background">
            <div className="greek-pattern-border"></div>
            
            <div className="section-content-wrapper" style={{ flexDirection: 'column', textAlign: 'center' }}>
                
                <div className="mission-icon-container">
                    <img src="/global/icons/coin-icon.svg" alt="Olimpo Coin" style={{ width: '80px', margin: '0 auto 20px' }} />
                </div>

                <h2 className="skincare-section-title">
                    A NOSSA MISSÃO
                </h2>
                
                <p className="section-paragraph" style={{ maxWidth: '700px', fontSize: '1.1rem', marginBottom: '30px' }}>
                    No Olimpo Skin, cuidamos da pele e do olhar com protocolos personalizados de limpeza de pele, extensão de pestanas e design de sobrancelhas, cuidamos de cada detalhe com foco no bem-estar e nos resultados visíveis.
                </p>

                <a href="/sobre-nos" className="skincare-main-button">
                    Descobre mais
                </a>

            </div>
            
            <div className="greek-pattern-border" style={{ marginTop: '50px' }}></div>
        </section>
    );
};

export default SkincareMission;