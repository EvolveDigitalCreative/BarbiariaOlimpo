// src/pages/OlimpoWear.tsx 

import type { FC } from 'react';
import Header from '../components/common/Header';
import Footer from '../components/common/Footer';
import SectionDivider from '../components/common/SectionDivider';

// ==========================================================
// IMPORTS DE COMPONENTES
// ==========================================================
import WearHero from '../components/sections/olimpo_wear/WearHero';
import WearGallery from '../components/sections/olimpo_wear/WearGallery'; // ✅ CORRIGIDO: Agora espera o default export
import WearBestSeller from '../components/sections/olimpo_wear/WearBestSeller';
import WearDressLikeGods from '../components/sections/olimpo_wear/WearDressLikeGods';
import WearMission from '../components/sections/olimpo_wear/WearMission';
import WearVideoGallery from '../components/sections/olimpo_wear/WearVideoGallery';
import WearCollectionGrid from '../components/sections/olimpo_wear/WearCollectionGrid';
import WearContact from '../components/sections/olimpo_wear/WearContact';


// ==========================================================
// IMPORTS DE ESTILO
// ==========================================================
import '../styles/global/_global.css';
import '../styles/global/_header.css';
import '../styles/global/_footer.css';
import '../styles/global/SectionDivider.css';
import '../styles/global/olimpo_shared.css';
import '../styles/olimpowear/wear_products.css';


const OlimpoWear: FC = () => {
  return (
    <div className="wear-page-container">
      <Header />
      <main>
        <WearHero />
        <WearGallery />
        <SectionDivider />
        <WearMission />
        <WearDressLikeGods/>
        <WearBestSeller />
        <WearVideoGallery/>
        <SectionDivider />
        <WearCollectionGrid />
        <SectionDivider />
        <SectionDivider />
        <SectionDivider />
        <WearVideoGallery />
        <SectionDivider />
        <SectionDivider />
        <WearContact />
      </main>
      <Footer />
    </div>
  );
};

export default OlimpoWear;