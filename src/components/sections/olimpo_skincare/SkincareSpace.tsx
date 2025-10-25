// src/components/sections/olimpo_skincare/SkincareSpace.tsx

import type { FC } from 'react';

const SkincareSpace: FC = () => {
    return (
        <section className="content-section">
            <h2 className="skincare-section-title section-title-centered">
                O NOSSO ESPAÇO
            </h2>
            <p className="skincare-subtitle">
                Bem-vindo ao nosso espaço, calmo e acolhedor, dentro da Barbearia Olimpo.
            </p>
            
            <div className="gallery-grid">
                <div className="gallery-item"><img src="/skincare/space/img-1.jpg" alt="Interior 1" /></div>
                <div className="gallery-item"><img src="/skincare/space/img-2.jpg" alt="Interior 2" /></div>
                <div className="gallery-item"><img src="/skincare/space/img-3.jpg" alt="Interior 3" /></div>
                <div className="gallery-item"><img src="/skincare/space/img-4.jpg" alt="Interior 4" /></div>
                <div className="gallery-item"><img src="/skincare/space/img-5.jpg" alt="Interior 5" /></div>
                <div className="gallery-item"><img src="/skincare/space/img-6.jpg" alt="Interior 6" /></div>
            </div>
        </section>
    );
};

export default SkincareSpace;