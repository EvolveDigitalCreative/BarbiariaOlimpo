// src/components/sections/olimpo_skincare/SkincareServices.tsx
import { type FC, useRef, useState, useEffect, useCallback } from 'react';
import '../../../styles/olimposkincare/skincare_services.css'; 
import SkincareBookingModal from '../olimpo_skincare/common/SkincareBookingModal';
// Array de serviços (mantido no ficheiro)
const services = [
    { name: "Glow Skin", desc: "Limpeza essencial com extração, aplicação de ativos e máscara. Ideal para manter a pele limpa, hidratada e luminosa.", duration: "1 hora" },
    { name: "Elevate skin", desc: "Tratamento facial que combina técnicas de limpeza, esfoliação e regeneração celular para purificar a pele, controlar a oleosidade e reduzir imperfeições. Proporciona frescor imediato, textura mais uniforme e um aspeto visivelmente saudável.", duration: "1 hora e 15 minutos" },
    { name: "Olimpo Skin", desc: "Protocolo completo com tecnologia Aqua Plus, ativos personalizados e hidratação revitalizante. Limpa em profundidade, trata e renova a pele.", duration: "1 hora e 30 minutos" },
    { name: "Skin Scan", desc: "Diagnóstico facial com tecnologia coreana e inteligência artificial. Análise completa + plano personalizado.", duration: "30 minutos" },
    { name: "Olimpo Antiacne", desc: "Tratamento facial criado para prevenir, controlar e reverter a acne, inclusive a acne hormonal. Com ação probiótica, reequilibra a microflora da pele, regula a oleosidade, acalma a inflamação e reduz a vermelhidão causada pela acne.", duration: "2:00 horas"},
    { name: "Lashes", desc: "Trabalho cada pestana com previsão para criar um efeito leve e natural, que realça o olhar sem perder a sua essência. O objetivo é destacar a sua beleza única, garantindo conforto, durabilidade e um resultado elegante.", duration: "2:30-3:00 horas" },
    { name: "Sobrancelhas", desc: "Com técnica e atenção ao detalhe, desenho sobrancelhas que harmonizam com o seu rosto, valorizando a expressão e mantendo um aspeto natural. Cada linha é pensada para revelar a sua lehor versão.", duration: "5-10 minutos" },
];

/**
 * Helper para construir o caminho da imagem com base no nome do serviço.
 * Assumindo que as imagens estão em /public/OlimpoSkincare/services gerais/Nome Do Serviço.webp
 * NOTA: O caminho é absoluto no servidor (começa em '/').
 */
const getImagePath = (serviceName: string): string => {
    // 1. Substitui espaços por underscores ou traços para formar um nome de ficheiro limpo (opcional)
    // Se o seu nome de ficheiro tiver espaços, esta é a forma mais segura:
    // const fileName = serviceName.replace(/\s/g, ' '); 

    // 2. Caminho completo (assumindo que "OlimpoSkincare" é uma pasta de topo na pasta 'public')
    // Ajuste este caminho se for diferente!
    return `/OlimpoSkincare/services gerais/${serviceName}.webp`; 
    
};

/**
 * Helper para construir o caminho da imagem do ícone.
 * Assumindo que os ícones estão em /public/OlimpoSkincare/icons/Nome Do Serviço.png
 */
const getIconPath = (serviceName: string): string => {
    // Usando a mesma convenção de nome do serviço + .png
    return `/OlimpoSkincare/icons/${serviceName}.png`; 
};


const SkincareServices: FC = () => {
    const scrollContainerRef = useRef<HTMLDivElement>(null);
    const progressBarRef = useRef<HTMLDivElement>(null); 
    
    const [thumbPosition, setThumbPosition] = useState(0); 
    const THUMB_WIDTH_PX = 200; 

    // ⭐️ GESTÃO DO ESTADO DO MODAL
    const [isModalOpen, setIsModalOpen] = useState(false);
    const openModal = () => setIsModalOpen(true);
    const closeModal = () => setIsModalOpen(false);


    const calculateThumbPosition = useCallback(() => {
        const scrollNode = scrollContainerRef.current;
        const barNode = progressBarRef.current; 
        
        if (!scrollNode || !barNode) return;

        const scrollLeft = scrollNode.scrollLeft;
        const scrollWidth = scrollNode.scrollWidth;
        const clientWidth = scrollNode.clientWidth;
        
        const barWidth = barNode.clientWidth; 
        
        const scrollableDistance = scrollWidth - clientWidth;
        const thumbTravelDistance = barWidth - THUMB_WIDTH_PX;

        if (scrollableDistance > 0 && thumbTravelDistance > 0) {
            const scrollProgress = scrollLeft / scrollableDistance; 
            const thumbPixelPosition = scrollProgress * thumbTravelDistance;
            const newPosition = (thumbPixelPosition / barWidth) * 100;
            
            setThumbPosition(Math.max(0, Math.min(newPosition, 100)));
        } else {
            setThumbPosition(0); 
        }
    }, []);

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
        <> {/* Usa Fragment para poder retornar a Section e o Modal */}
            <section className="content-section light-background">
                <h2 className="skincare-section-title section-title-centered">
                    OS NOSSOS SERVIÇOS
                </h2>
                
                <div className="services-carousel-container">
                    <div 
                        ref={scrollContainerRef}
                        className="skincare-horizontal-scroll"
                        onScroll={handleScroll}
                    >
                        {services.map((service, index) => (
                            <div key={index} className="service-slide-wrapper">
                                
                                <div className="service-card"> 
                                    {/* Adorno no canto superior esquerdo */}
                                    <img 
                                        src="OlimpoBarBer/Decoracao/style2_optimized.png"
                                        alt="Adorno de canto" 
                                        className="card-corner-adorno" 
                                    />

                                    <div className="service-card-image-wrapper">
                                        <img 
                                            src={getImagePath(service.name)} 
                                            alt={`Imagem do serviço ${service.name}`} 
                                        />
                                        {/* icon dourado */}
                                        <img 
                                            src={getIconPath(service.name)} 
                                            alt={`Ícone do serviço ${service.name}`} 
                                            className="service-icon"
                                        />
                                    </div>
                                    
                                    <h3 className="service-card-title">{service.name}</h3>
                                    <p className="service-card-desc">{service.desc}</p>
                                    
                                    <div className="card-footer">
                                        <p className="service-card-duration"><b>Duração:</b> {service.duration}</p>
                                        <div className="card-separator"></div>
                                        
                                        {/* ⭐️ BOTÃO ATUALIZADO: Substitui <a> por <button> e adiciona onClick */}
                                        <button 
                                            onClick={openModal} 
                                            className="skincare-main-button service-button"
                                        >
                                            Marcar
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                    
                    {thumbPosition >= 0 && (
                        <div 
                            ref={progressBarRef}
                            className="custom-scroll-bar-container"
                        >
                            <div 
                                className="scroll-thumb" 
                                style={{ left: `${thumbPosition}%` }} 
                            />
                        </div>
                    )}
                </div>
            </section>

            {/* ⭐️ RENDERIZAÇÃO DO MODAL: Apenas visível se isModalOpen for true */}
            <SkincareBookingModal 
                isOpen={isModalOpen} 
                onClose={closeModal} 
            />
        </>
    );
};

export default SkincareServices;