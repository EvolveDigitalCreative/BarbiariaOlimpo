// src/components/sections/olimpo_skincare/SkincareServices.tsx
import React, { type    FC, useRef, useState, useEffect, useCallback } from 'react';
// Importe o CSS para estilizar os seus cards e a rolagem nativa
import '../../../styles/olimposkincare/skincare_services.css'; 

const services = [
    // SERVIÇOS skincare
    { name: "Glow Skin", desc: "Limpeza essencial com extração, aplicação de ativos e máscara. Ideal para manter a pele limpa, hidratada e luminosa.", duration: "1 hora" },
    { name: "Elevate Skin", desc: "Tratamento facial que combina técnicas de limpeza, esfoliação e regeneração celular para purificar a pele, controlar a oleosidade e reduzir imperfeições. Proporciona frescor imediato, textura mais uniforme e um aspeto visivelmente saudável.", duration: "1 hora e 15 minutos" },
    { name: "Olimpo Skin", desc: "Protocolo completo com tecnologia Aqua Plus, ativos personalizados e hidratação revitalizante. Limpa em profundidade, trata e renova a pele.", duration: "1 hora e 30 minutos" },
    { name: "Skin Scan", desc: "Diagnóstico facial com tecnologia coreana e inteligência artificial. Análise completa + plano personalizado.", duration: "30 minutos" },
    { name: "Olimpo AntiAcne", desc: "Tratamento facial criado para prevenir, controlar e reverter a acne, inclusive a acne hormonal. Com ação probiótica, reequilibra a microflora da pele, regula a oleosidade, acalma a inflamação e reduz a vermelhidão causada pela acne.", duration: "2:00 horas"},
    { name: "Lashes", desc: "Trabalho cada pestana com previsão para criar um efeito leve e natural, que realça o olhar sem perder a sua essência. O objetivo é destacar a sua beleza única, garantindo conforto, durabilidade e um resultado elegante.", duration: "2:30-3:00 horas" },
    { name: "Sobrancelhas", desc: "Com técnica e atenção ao detalhe, desenho sobrancelhas que harmonizam com o seu rosto, valorizando a expressão e mantendo um aspeto natural. Cada linha é pensada para revelar a sua lehor versão.", duration: "5-10 minutos" },
];


const SkincareServices: FC = () => {
    const scrollContainerRef = useRef<HTMLDivElement>(null);
    // Posição percentual do PEGADOR (0 a 100), não a largura.
    const [thumbPosition, setThumbPosition] = useState(0); 

    // Função de cálculo principal
    const calculateThumbPosition = useCallback(() => {
        const node = scrollContainerRef.current;
        if (!node) return;

        const scrollLeft = node.scrollLeft;
        const scrollWidth = node.scrollWidth;
        const clientWidth = node.clientWidth;
        
        // Distância total que o conteúdo pode rolar
        const scrollableDistance = scrollWidth - clientWidth;
        
        // Se há espaço para rolar
        if (scrollableDistance > 0) {
            // Posição: (Posição atual / Distância total rolável) * 100
            const newPosition = (scrollLeft / scrollableDistance) * 100;
            
            // NOTA CHAVE: A posição 100% corresponde ao final do scroll, 
            // mas o pegador tem uma largura fixa. O CSS irá centrar o pegador 
            // no ponto calculado por newPosition.
            setThumbPosition(newPosition);
        } else {
            setThumbPosition(0); 
        }
    }, []);

    // Atualiza a posição do pegador sempre que o carrossel é rolado
    const handleScroll = () => {
        calculateThumbPosition();
    };
    
    useEffect(() => {
        calculateThumbPosition();
        window.addEventListener('resize', calculateThumbPosition);

        return () => {
            window.removeEventListener('resize', calculateThumbPosition);
        };
    }, [calculateThumbPosition]);


    return (
        <section className="content-section light-background">
            <h2 className="skincare-section-title section-title-centered">
                OS NOSSOS SERVIÇOS
            </h2>
            
            <div className="services-carousel-container">
                {/* 1. O Contentor de Rolagem Nativa */}
                <div 
                    ref={scrollContainerRef}
                    className="skincare-horizontal-scroll"
                    onScroll={handleScroll} // Liga o evento de rolagem ao cálculo
                >
                    {/* ... (Conteúdo dos cartões map continua igual) ... */}
                    {services.map((service, index) => (
                        <div key={index} className="service-slide-wrapper">
                            
                            <div className="service-card"> 
                                <div className="service-card-image-wrapper">
                                    <img src={`/skincare/services/service-${index + 1}.jpg`} alt={service.name} />
                                </div>
                                
                                <h3 className="service-card-title">{service.name}</h3>
                                <p className="service-card-desc">{service.desc}</p>
                                
                                <div className="card-footer">
                                    <p className="service-card-duration">Duração: {service.duration}</p>
                                    
                                    <a href="/marcacoes" className="skincare-main-button service-button">
                                        Marcar
                                    </a>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
                
                {/* 2. A Barra de Rolagem Customizada com Pegador Fixo */}
                {/* Mostramos a barra se o contentor puder ser rolado */}
                {thumbPosition >= 0 && (
                    <div className="custom-scroll-bar-container">
                        <div 
                            className="scroll-thumb" 
                            style={{ left: `${thumbPosition}%` }} 
                        />
                    </div>
                )}
            </div>
        </section>
    );
};

export default SkincareServices;