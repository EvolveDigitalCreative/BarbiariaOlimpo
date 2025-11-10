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

// Estilos Específicos do Skincare
import '../styles/olimposkincare/skincare_patterns.css';
import '../styles/olimposkincare/skincare_hero.css';          
import '../styles/olimposkincare/skincare_sections_base.css'; // Para layout (similar ao barber_sections_base)
import '../styles/olimposkincare/skincare_services.css';
import '../styles/olimposkincare/skincare_about_us.css';
import '../styles/olimposkincare/skincare_review.css';

// ----------------------------------------------------------------
// 2. COMPONENTES (Skincare Específico e Partilhado)
// ----------------------------------------------------------------
// Componentes ESPECÍFICOS do Skincare
import SkincareHero from '../components/sections/olimpo_skincare/SkincareHero.tsx';
import SkincareAboutUs from '../components/sections/olimpo_skincare/SkincareAboutUs.tsx';
import SkincareMission from '../components/sections/olimpo_skincare/SkincareMission.tsx';
import SkincareServices from '../components/sections/olimpo_skincare/SkincareServices.tsx';
import SkincareGallery from '../components/sections/olimpo_skincare/skincare_gallery_section.tsx';
import SkincareWhatWeDo from '../components/sections/olimpo_skincare/skincare_what_we_do.tsx';
import SkincareSpace from '../components/sections/olimpo_skincare/SkincareSpace.tsx';
import SkincareReviews from '../components/sections/olimpo_skincare/SkincareReviews.tsx';
import ContactSection from '../components/sections/olimpo_barber/BarberContact';
import SectionDivider from '../components/common/SectionDivider';

const OlimpoSkincare: FC = () => {
  return (
    <div className="skincare-page-container">
      <Header />
      <main>
        <SkincareHero />
        <SkincareAboutUs />      {/* Fica a Conhecer-nos */}
        <SectionDivider />
        <SkincareServices />     {/* Os Nossos Serviços */}
        {/*<SkincareGallery /> */}     {/* Galeria de Serviços */}
        <SkincareWhatWeDo />     {/* O Que Fazemos */}
        <SectionDivider />
        <SkincareMission />      {/* A Nossa Missão */}
        <SkincareSpace />        {/* O Nosso Espaço */}
        <SectionDivider />
        <ContactSection />       {/* Contacta-nos */}
        <SkincareReviews />      {/* Testimonial & Review */}
      </main>
      <Footer />
    </div>
  );
};

export default OlimpoSkincare;