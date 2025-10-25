// src/components/home/BarbersSection.tsx

import type { FC } from 'react';

// Dados de exemplo (vazio para mostrar a mensagem de indisponibilidade)
const barbers = []; 

const BarbersSection: FC = () => {
    return (
        <section className="content-section barbers-section light-background">
            <h2 className="section-title gold-title section-title-centered">OS NOSSOS BARBEIROS</h2>
            
            <div className="barbers-content-wrapper">
                
                {barbers.length === 0 ? (
                    // Mensagem de Barbeiros Indisponíveis
                    <div className="barbers-unavailable-message">
                        <img 
                            src="/barbershop/icons/tesoura.png" 
                            alt="Tesoura" 
                            className="tesoura-icon"
                        />
                        <p className="tesoura-label">Tesoura</p>
                        
                        <h3 className="unavailable-title">Nenhum barbeiro disponível</h3>
                        <p className="unavailable-text">
                            No momento não temos barbeiros cadastrados. Tente novamente mais tarde.
                        </p>
                    </div>
                ) : (
                    // ... Conteúdo dos barbeiros (quando existirem)
                    <div className="barbers-list">
                        {/* Mapear os barbeiros aqui */}
                    </div>
                )}
            </div>

            <div className="greek-border-bottom"></div>
        </section>
    );
};

export default BarbersSection;