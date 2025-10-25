// src/components/sections/olimpowear/WearMission.tsx

import type { FC } from 'react';

const WearMission: FC = () => {
    return (
        <section className="content-section light-background" style={{ padding: '80px 0', textAlign: 'center' }}>
            <div className="greek-pattern-border-wear" style={{ margin: '0 0 50px 0' }}></div>
            
            <div className="section-content-wrapper" style={{ flexDirection: 'column', textAlign: 'center' }}>
                
                {/* Ícone da moeda centralizado (Ajuste o caminho se necessário) */}
                <div className="mission-icon-container">
                    <img src="/global/icons/coin-icon.svg" alt="Olimpo Coin" style={{ width: '80px', margin: '0 auto 20px' }} />
                </div>

                <h2 className="wear-section-title" style={{ fontSize: '2rem' }}>
                    A NOSSA MISSÃO
                </h2>
                
                <p className="section-paragraph" style={{ maxWidth: '700px', fontSize: '1.1rem', marginBottom: '30px' }}>
                    O Olimpo Wear apresenta uma linha de roupa exclusiva que reflete confiança, presença e identidade urbana.
                </p>

                <a href="/sobre-nos" className="wear-secondary-button">
                    Descobre mais
                </a>

            </div>
            
        </section>
    );
};

export default WearMission;