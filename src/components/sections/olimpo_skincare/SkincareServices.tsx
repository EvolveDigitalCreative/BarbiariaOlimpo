// src/components/sections/olimpo_skincare/SkincareServices.tsx

import type { FC } from 'react';

const services = [
    { name: "Glow Skin", desc: "Limpeza essencial com extração, aplicação de ativos e máscara...", duration: "1 hora" },
    { name: "Elevate Skin", desc: "Tratamento facial que combina técnicas de limpeza, esfoliação e regeneração...", duration: "1 hora e 15 minutos" },
    { name: "Olimpo Skin", desc: "Protocolo completo com tecnologia Aqua Plus, ativos personalizados...", duration: "1 hora e 30 minutos" },
    { name: "Skin Scan", desc: "Diagnóstico facial com tecnologia coreana e inteligência artificial...", duration: "30 minutos" },
];

const SkincareServices: FC = () => {
    return (
        <section className="content-section">
            <h2 className="skincare-section-title section-title-centered">
                OS NOSSOS SERVIÇOS
            </h2>
            
            <div className="services-grid">
                {services.map((service, index) => (
                    <div className="service-card" key={index}>
                        <div className="service-card-image-wrapper">
                            <img src={`/skincare/services/service-${index + 1}.jpg`} alt={service.name} />
                        </div>
                        
                        <h3>{service.name}</h3>
                        <p>{service.desc}</p>
                        
                        <p className="service-card-duration">Duração: {service.duration}</p>
                        
                        <a href="/marcacoes" className="skincare-main-button">
                            Marcar
                        </a>
                    </div>
                ))}
            </div>
        </section>
    );
};

export default SkincareServices;