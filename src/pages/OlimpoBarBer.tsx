// src/pages/OlimpoBarBer.tsx
// O Contentor Principal da sua Home Page (Barbearia).

// ✅ ADICIONADO: Import 'React' para permitir o uso de Fragments (<>...</>)
import React, { type FC } from 'react';

// Importações de Componentes Comuns
import Header from '../components/common/Header';
import Footer from '../components/common/Footer';
import SectionDivider from '../components/common/SectionDivider';
// ✅ CookieModal é um componente comum/partilhado
import { CookieModal } from '../components/sections/olimpo_barber/CookieModal'; 
import DiscountModal from '../components/sections/olimpo_barber/DiscountModal';

// ==========================================================
// IMPORTAÇÕES DE COMPONENTES DE SECÇÃO (Barbearia)
// ==========================================================
import HeroSection from '../components/sections/olimpo_barber/BarberHero';
import MissionSection from '../components/sections/olimpo_barber/BarberMission';
import BarbersSection from '../components/sections/olimpo_barber/BarberBarbers';
import ContactSection from '../components/sections/olimpo_barber/BarberContact';
import OurSpaceSection from '../components/sections/olimpo_barber/OurSpaceSection';

// Componentes PARTILHADOS (Usados por todas as páginas)
import CoinSection from '../components/sections/olimpo_shared/CoinSection';
import AboutSection from '../components/sections/olimpo_shared/AboutSection';

// ==========================================================
// IMPORTAÇÕES DE ESTILO
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
import '../styles/olimpobarber/Barber_coin.css';
import '../styles/olimpobarber/barber_about.css';

const OlimpoBarber: FC = () => {
  return (
    // ✅ ADICIONADO: React.Fragment para permitir que o Modal fique fora do container
    <>
      <div className="home-page-container">
        {/*
          CORREÇÃO: A prop 'domain' não é mais necessária.
          O Header agora detecta a rota ('/barber' ou '/') 
          automaticamente com useLocation.
        */}
        <Header />
        
        <main>
          <HeroSection />
          <BarbersSection />
          <SectionDivider />
          <CoinSection />
          <MissionSection />
          <AboutSection />
          <OurSpaceSection />
          <SectionDivider />
          <ContactSection />
        </main>
        
        <Footer />

        {/* 🛑 MOVIDO: O CookieModal estava aqui dentro */}
      </div>
      <CookieModal />
      <DiscountModal />
    </>
  );
};

export default OlimpoBarber;

