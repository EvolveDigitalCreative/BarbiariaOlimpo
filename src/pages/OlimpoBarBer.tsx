// src/pages/OlimpoBarBer.tsx
// O Contentor Principal da sua Home Page (Barbearia).

import type { FC } from 'react';
// Importações de Componentes Comuns (mantêm-se iguais)
import Header from '../components/common/Header.tsx';
import Footer from '../components/common/Footer.tsx';

// ==========================================================
// IMPORTAÇÕES DE COMPONENTES DE SECÇÃO (NOVOS CAMINHOS)
// ==========================================================

// Componentes ESPECÍFICOS da Barbearia
import HeroSection from '../components/sections/olimpo_barber/BarberHero.tsx';
import MissionSection from '../components/sections/olimpo_barber/BarberMission.tsx';
import BarbersSection from '../components/sections/olimpo_barber/BarberBarbers.tsx';
import ContactSection from '../components/sections/olimpo_barber/BarberContact.tsx';
import SectionDivider from '../components/common/SectionDivider';

// Componentes PARTILHADOS (Usados por todas as páginas)
import CoinSection from '../components/sections/olimpo_shared/CoinSection.tsx';
import AboutSection from '../components/sections/olimpo_shared/AboutSection.tsx';


// ==========================================================
// IMPORTAÇÕES DE ESTILO (Os caminhos de CSS já estavam corretos)
// ==========================================================

// 1. Estilos Universais (Global)
import '../styles/global/_global.css';          
import '../styles/global/_header.css';          
import '../styles/global/_footer.css';
import '../styles/global/SectionDivider.css';

// 2. Estilos Específicos da Barbearia (olimpobarber)
import '../styles/olimpobarber/barber_sections_base.css'; 
import '../styles/olimpobarber/barber_hero.css';          
import '../styles/olimpobarber/barber_barbers.css';       
import '../styles/olimpobarber/barber_contact.css';
import "../styles/olimpobarber/Barber_coin.css";
import "../styles/olimpobarber/barber_about.css";       


const OlimpoBarber: FC = () => {
  return (
    <div className="home-page-container">
      {/* CORREÇÃO: Adicionando a prop 'domain' que é obrigatória
        no componente Header, com o valor 'barber'.
      */}
      <Header domain="barber" /> 
      <main>
        <HeroSection /> 
        <BarbersSection />
        <SectionDivider />          
        <CoinSection />
        <MissionSection />          
        <AboutSection />          
        <ContactSection />        
      </main>
      <Footer />
    </div>
  );
};

export default OlimpoBarber;