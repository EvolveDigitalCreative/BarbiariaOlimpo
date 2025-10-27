// src/components/ProfileActions/AboutTab.tsx

import React from 'react';
import styles from './ProfileActions.module.css';

interface AboutTabProps {
    styles: typeof styles;
}

const AboutTab: React.FC<AboutTabProps> = ({ styles }) => {
    // ✅ Corresponde à imagem 'image_9d985e.png'
    const aboutText = "No Olimpo, acreditamos que o cuidado pessoal é um ritual de identidade. No centro de Portugal em Santarém nasce o Olimpo, Criámos um conceito onde a barbearia, a estética e a moda coexistem com um propósito em comum: elevar a tua confiança, o teu bem-estar e a tua presença. Inspiramo-nos nas nossas raízes, na força de quem vive com intenção e na energia de uma nova geração que se quer sentir bem por dentro e por fora.";

    return (
        <div className={styles['about-content']}>
            <p className={styles['about-text']}>{aboutText}</p>
        </div>
    );
};

export default AboutTab;