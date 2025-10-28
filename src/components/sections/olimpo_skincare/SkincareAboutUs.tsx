import type { FC } from 'react';
import '../../../styles/olimposkincare/skincare_about_us.css'; 

const BARBER_COIN_ICON = "/OlimpoSkincare/icons/whitecoin_optimized.png"; 
const PILAR_ICON_PATH = "/OlimpoSkincare/decoracao/pilar.png"; 

const SkincareAboutUs: FC = () => {
    return (
        <section className="content-section light-background">
            <div className="section-content-wrapper"> 
                
                {/* ... Coluna da Imagem mantida ... */}
                <div className="section-image-container">
                    <img 
                        src="/OlimpoSkincare/images/segunda foto princpal.jpg" 
                        alt="Esteticista Olimpo Skin" 
                        className="responsive-image image-rounded" 
                    />
                </div>

                {/* 2. Coluna do Texto */}
                <div className="section-text-container">
                    <p className="dark-text-strong">FICA A CONHECER-NOS</p>
                    <h2 className="section-title">
                        Bem-vindo <br/> à Olimpo skin
                    </h2>
                    
                    <p className="section-paragraph">
                        Olimpo Skin é um espaço de estética em Santarém, especializado em cuidados de rosto e realce do olhar. Aqui encontras protocolos personalizados de limpeza de pele, extensão de pestanas e design de sobrancelhas com foco em resultados e bem-estar.
                    </p>
                    
                    {/* Contentor FLEX para alinhar Moeda com Bloco de Texto */}
                    <div className="barbershop-note-aligned"> 
                        
                        {/* 1. ÍCONE DA MOEDA */}
                        <img 
                            src={BARBER_COIN_ICON} 
                            alt="Olimpo Barbershop Icon" 
                            className="barber-coin-icon"
                        />
                        
                        {/* 2. GRUPO DE TEXTO (Título e Parágrafo) */}
                        <div className="barbershop-text-group"> 
                            
                            {/* NOVO: Usar classe específica para o título do barbershop para controlar o 'bold' e o 'font-size' */}
                            <p className="barbershop-title">Olimpo barber shop</p>
                            
                            {/* Parágrafo do barbershop, classe 'section-paragraph' é removida, nova classe é criada */}
                            <p className="barbershop-paragraph-text">
                                Atendimento cuidado num espaço calmo e acolhedor, dentro da Barbearia Olimpo.
                            </p>
                        </div>
                    </div>

                    <a href="/marcacoes" className="skincare-main-button">
                        Marcações
                    </a>
                </div>

                {/* ... Pilar decorativo mantido ... */}
                <img 
                    src={PILAR_ICON_PATH} 
                    alt="Pilar Grego Decorativo"
                    className="decorative-column-image"
                />
            </div>
        </section>
    );
};

export default SkincareAboutUs;