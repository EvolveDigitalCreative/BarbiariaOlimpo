// src/pages/OlimpoSkincare.tsx

import type { FC } from 'react';
import Header from '../components/common/Header.tsx';
import Footer from '../components/common/Footer.tsx';

// ----------------------------------------------------------------
// 1. ESTILOS (Global e Skincare)
// ----------------------------------------------------------------
// Estilos Globais
import '../styles/global/_global.css';          
import '../styles/global/_header.css';          
import '../styles/global/_footer.css';          

// Estilos Específicos do Skincare (Nova Pasta)
import '../styles/olimposkincare/skincare_patterns.css';
import '../styles/olimposkincare/skincare_hero.css';          
import '../styles/olimposkincare/skincare_sections_base.css'; // Para layout (similar ao barber_sections_base)
import '../styles/olimposkincare/skincare_services.css';
import '../styles/olimposkincare/skincare_review.css';

// ----------------------------------------------------------------
// 2. COMPONENTES (Skincare Específico e Partilhado)
// ----------------------------------------------------------------
// Componentes ESPECÍFICOS do Skincare
import SkincareHero from '../components/sections/olimpo_skincare/SkincareHero.tsx';
import SkincareAboutUs from '../components/sections/olimpo_skincare/SkincareAboutUs.tsx';
import SkincareMission from '../components/sections/olimpo_skincare/SkincareMission.tsx';
import SkincareServices from '../components/sections/olimpo_skincare/SkincareServices.tsx';
import SkincareSpace from '../components/sections/olimpo_skincare/SkincareSpace.tsx';
import SkincareReviews from '../components/sections/olimpo_skincare/SkincareReviews.tsx';
import SkincareContact from '../components/sections/olimpo_skincare/SkincareContact.tsx';

// Componentes PARTILHADOS (Assumindo que Coin será a mesma em todas as páginas)
import CoinSection from '../components/sections/olimpo_shared/CoinSection.tsx';


const OlimpoSkincare: FC = () => {
  return (
    <div className="skincare-page-container">
      <Header />
      <main>
        <SkincareHero />
        <SkincareAboutUs />      // Fica a Conhecer-nos
        <SkincareMission />
        <SkincareServices />     // Os Nossos Serviços
        <SkincareSpace />        // O Nosso Espaço
        <CoinSection />          // Partilhado com Barbearia
        <SkincareReviews />      // Testimonial & Review
        <SkincareContact />      // Contacta-nos
      </main>
      <Footer />
    </div>
  );
};

export default OlimpoSkincare;