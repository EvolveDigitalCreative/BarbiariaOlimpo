// src/pages/OlimpoBarBer.tsx
// O Contentor Principal da sua Home Page (Barbearia).

import React, { type FC } from 'react';

// Importações de Componentes Comuns
import Header from '../components/common/Header';
import Footer from '../components/common/Footer';
import SectionDivider from '../components/common/SectionDivider';

// ✅ CORRIGIDO: O caminho para o DiscountModal foi ajustado para ../components/modals/
import DiscountModal from '../components/modals/DiscountModal';

// CookieModal: Mantendo a importação original, se estiver correta (sections/olimpo_barber/)
import { CookieModal } from '../components/sections/olimpo_barber/CookieModal';

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
  // É comum usar um estado para controlar a abertura/fecho do modal,
  // embora no exemplo anterior ele tenha sido simplesmente renderizado.
  // Para simplificar a correção de runtime, vamos renderizá-lo com props básicas.

  return (
    // O React.Fragment permite que os modais sejam renderizados fora do container principal.
    <>
      <div className="home-page-container">
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
      </div>

      {/* Os Modals são renderizados aqui, dentro da hierarquia do AuthProvider */}
      <CookieModal />
      {/* ✅ Adicione as props reais (isOpen, onClose) conforme a sua lógica de estado */}
      <DiscountModal isOpen={false} onClose={() => { }} />
    </>
  );
};

export default OlimpoBarber;