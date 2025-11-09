// src/components/sections/olimpo_skincare/SkincareAboutUs.tsx

import { type FC, useState, type MouseEvent } from 'react';
import '../../../styles/olimposkincare/skincare_about_us.css'; 
// ⭐️ 2. IMPORTAÇÃO: Importar o Modal (Ajuste o caminho se necessário)
import SkincareBookingModal from './common/SkincareBookingModal'; 

const BARBER_COIN_ICON = "/OlimpoSkincare/icons/whitecoin_optimized.png"; 
const PILAR_ICON_PATH = "/OlimpoSkincare/decoracao/pilar.png"; 

const SkincareAboutUs: FC = () => {
    
    // ⭐️ 3. ESTADO: Controla se o modal está aberto ou fechado
    const [isModalOpen, setIsModalOpen] = useState(false);

    // ⭐️ 4. FUNÇÕES: Abre e fecha o modal
    const openModal = () => setIsModalOpen(true);
    const closeModal = () => setIsModalOpen(false);


    // NOTA: A antiga função placeholder foi removida.
    
    return (
        <> {/* Usa Fragment para poder retornar a Section e o Modal */}
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
                                <p className="barbershop-title">Olimpo barber shop</p>
                                <p className="barbershop-paragraph-text">
                                    Atendimento cuidado num espaço calmo e acolhedor, dentro da Barbearia Olimpo.
                                </p>
                            </div>
                        </div>

                        {/* ⭐️ BOTÃO ATUALIZADO: Chama a função openModal */}
                        <button 
                            onClick={openModal} 
                            className="skincare-main-button"
                        >
                            Marcações
                        </button>
                    </div>

                    {/* ... Pilar decorativo mantido ... */}
                    <img 
                        src={PILAR_ICON_PATH} 
                        alt="Pilar Grego Decorativo"
                        className="decorative-column-image"
                    />
                </div>
            </section>
            
            {/* ⭐️ RENDERIZAÇÃO DO MODAL */}
            <SkincareBookingModal 
                isOpen={isModalOpen} 
                onClose={closeModal} 
            />
        </>
    );
};

export default SkincareAboutUs;