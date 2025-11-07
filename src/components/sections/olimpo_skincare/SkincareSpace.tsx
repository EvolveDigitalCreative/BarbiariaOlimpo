// src/components/sections/olimpo_skincare/SkincareSpace.tsx

import type { FC } from 'react';
import '../../../styles/olimposkincare/skincare_space.css'; // Importa o novo CSS

// ⭐️ Função para gerar o caminho das imagens (Formato solicitado: OLIMPO skin espaco N.JPG)
const getImagePath = (imageNumber: number): string => {
    return `/OlimpoSkincare/espaco/OLIMPO skin espaco ${imageNumber}.JPG`; 
};

const imageIndices = [1, 2, 3, 4, 5, 6]; // Para as 6 imagens

const SkincareSpace: FC = () => {
    
    // Assumimos que a classe 'skincare-section-title' e 'section-title-centered' já estão definidas
    
    return (
        <section className="content-section skincare-space-section"> 
            <h2 className="skincare-section-title section-title-centered">
                O NOSSO ESPAÇO
            </h2>
            <p className="skincare-space-subtitle">
                Bem-vindo ao nosso espaço, calmo e acolhedor, dentro da Barbearia Olimpo.
            </p>
            
            {/* ⭐️ Novo Container para o Icone/Linha Divisória */}
            <div className="skincare-space-header">
                <img 
                    src="OlimpoBarBer\Decoracao\style4_optimized.png" // Ícone do meio (moeda dourada)
                    alt="Olimpo Icon" 
                    className="skincare-space-icon"
                />
            </div>

            <div className="skincare-gallery-grid-container">
                <div className="skincare-gallery-grid">
                    {imageIndices.map((i) => (
                        <div key={i} className="skincare-gallery-item">
                            {/* ⭐️ Uso da função para o caminho da imagem */}
                            <img 
                                src={getImagePath(i)} 
                                alt={`Interior ${i} do Olimpo Skin`} 
                            />
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default SkincareSpace;