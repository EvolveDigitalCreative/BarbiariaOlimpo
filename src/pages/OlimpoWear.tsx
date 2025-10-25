// src/pages/OlimpoWear.tsx

import type { FC } from 'react';
import Header from '../components/common/Header.tsx';
import Footer from '../components/common/Footer.tsx';

// ----------------------------------------------------------------
// 1. ESTILOS 
// ----------------------------------------------------------------
import '../styles/global/_global.css';          
import '../styles/global/_header.css';          
import '../styles/global/_footer.css';          

// Estilos Específicos do Wear
import '../styles/olimpowear/wear_sections_base.css';
import '../styles/olimpowear/wear_hero.css';          
import '../styles/olimpowear/wear_products.css';
import '../styles/olimpowear/wear_contact.css';
import '../styles/olimpowear/wear_header.css'; // <--- NOVO CSS DO HEADER WEAR


// ----------------------------------------------------------------
// 2. COMPONENTES
// ----------------------------------------------------------------
import WearHero from '../components/sections/olimpo_wear/WearHero.tsx';
import WearCollections from '../components/sections/olimpo_wear/WearCollections.tsx';
import WearGallery from '../components/sections/olimpo_wear/WearGallery.tsx';
import WearMission from '../components/sections/olimpo_wear/WearMission.tsx';
import WearContact from '../components/sections/olimpo_wear/WearContact.tsx';

import CoinSection from '../components/sections/olimpo_shared/CoinSection.tsx';


const OlimpoWear: FC = () => {
  return (
    <div className="wear-page-container">
      {/* O Header agora sabe que está no domínio "wear" */}
      <Header domain="wear" />
      <main>
        <WearHero />
        <WearCollections />
        <WearGallery /> 
        <WearMission /> 
        <CoinSection />          
        <WearContact />
      </main>
      <Footer />
    </div>
  );
};

export default OlimpoWear;