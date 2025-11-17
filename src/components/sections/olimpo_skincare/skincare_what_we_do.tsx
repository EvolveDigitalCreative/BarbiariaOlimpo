// src/components/sections/olimpo_skincare/skincare_what_we_do.tsx
import React, { useState } from 'react';
import '../../../styles/olimposkincare/skincare_what_we_do.css';

// 1. Definição da interface (para a tipagem correta)
interface ServiceData {
    name: 'Glow Skin' | 'Elevate skin' | 'Olimpo Skin';
    desc: string;
    icon: string; // Caminho para o ícone (se aplicável, caso contrário, removemos)
}

// 2. Dados dos Serviços (Baseado na imagem)
const services: ServiceData[] = [
    {
        name: 'Glow Skin',
        desc: 'Limpeza essencial com extração, ativos e máscara, mantem a pele limpa, hidratada e luminosa, prevenindo acne e imperfeições.',
        icon: 'OlimpoSkincare/icons/Glow Skin.png', // Substituir ou remover
    },
    {
        name: 'Elevate skin',
        desc: 'Limpeza facial com Dermapen + tecnologias de rejuvenescimento, renova, trata e rejuvenesce a pele, melhorando textura, firmeza e manchas.',
        icon: 'OlimpoSkincare/icons/Elevate skin.png', // Substituir ou remover
    },
    {
        name: 'Olimpo Skin',
        desc: 'Limpeza facial Glass Skin + tecnologia AquaPlus, conquista uma pele com brilho espelhado, uniforme, hidratada e rejuvenescida.',
        icon: 'OlimpoSkincare/icons/Olimpo Skin.png', // Substituir ou remover
    },
];

// 3. Componente do Card de Serviço
interface ServiceCardProps extends ServiceData {
    isActive: boolean;
    onClick: (name: ServiceData['name']) => void;
}

const ServiceCard: React.FC<ServiceCardProps> = ({ name, desc, icon, isActive, onClick }) => (
    <div 
        className={`service-card-wd ${isActive ? 'active-wd' : ''}`}
        onClick={() => onClick(name)}
    >
        {/* ⭐️ NOVO: Contentor para o Ícone */}
        <div className="icon-wrapper-wd">
            <img src={icon} alt={`${name} Icon`} className="service-icon-wd" />
        </div>
        
        <div className="text-content-wd">
            <h4 className="service-name-wd">{name}</h4>
            <p className="service-desc-wd">{desc}</p>
        </div>
    </div>
);


// 4. Componente Principal da Secção
const WhatWeDoSection: React.FC = () => {
    // ⭐️ ESTADO: Guarda o nome do serviço ativo. Começa com o primeiro serviço.
    const [activeService, setActiveService] = useState<ServiceData['name']>(services[0].name);

    // ⭐️ LÓGICA: Função para determinar o caminho da imagem
    const getActiveImagePath = (serviceName: ServiceData['name']): string => {
        return `/OlimpoSkincare/services gerais/${serviceName}.webp`; 
    };

    const currentImagePath = getActiveImagePath(activeService);

    return (
        <section className="what-we-do-section">
            <div className="what-we-do-container">
                
                {/* COLUNA ESQUERDA: IMAGEM PRINCIPAL */}
                <div className="image-column">
                    {/* ⭐️ A imagem muda com base no 'activeService' */}
                    <img 
                        src={currentImagePath} 
                        alt={`Imagem de ${activeService}`} 
                        className="main-service-image" 
                    />
                </div>

                {/* COLUNA DIREITA: TEXTO E CARDS */}
                <div className="content-column">
                    <h2 className="section-title-wd">O QUE FAZEMOS</h2>
                    <p className="intro-text-wd">
                        No Olimpo Skin, cuidamos da pele e do olhar com protocolos personalizados de limpeza de pele.
                    </p>

                    <div className="services-list-wd">
                        {services.map((service) => (
                            <ServiceCard
                                key={service.name}
                                {...service}
                                isActive={service.name === activeService}
                                onClick={setActiveService}
                            />
                        ))}
                    </div>
                </div>

            </div>
        </section>
    );
};

export default WhatWeDoSection;