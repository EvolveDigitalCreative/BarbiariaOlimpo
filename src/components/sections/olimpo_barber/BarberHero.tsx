// src/components/home/HeroSection.tsx

import type { FC } from 'react';
import { Link } from 'react-router-dom';

const HeroSection: FC = () => {
    return (
        <section className="hero-section">
            <div className="hero-content">
                <h2 className="hero-title">Where Gods are made</h2>
                
                <Link to="/booking" className="hero-booking-button">
                    Marcações
                </Link>
                
                <div className="carousel-indicators">
                    <span className="indicator active"></span>
                    <span className="indicator"></span>
                    <span className="indicator"></span>
                </div>
            </div>
        </section>
    );
};

export default HeroSection;