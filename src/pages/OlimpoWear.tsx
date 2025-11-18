// src/pages/OlimpoWear.tsx 

import type { FC } from 'react';
import Header from '../components/common/Header';
import Footer from '../components/common/Footer';
import SectionDivider from '../components/common/SectionDivider';

// ==========================================================
// IMPORTS DE COMPONENTES
// ==========================================================
import WearHero from '../components/sections/olimpo_wear/WearHero';
import WearGallery from '../components/sections/olimpo_wear/WearGallery';
import WearBestSeller from '../components/sections/olimpo_wear/WearBestSeller';
import WearDressLikeGods from '../components/sections/olimpo_wear/WearDressLikeGods';
import WearMission from '../components/sections/olimpo_wear/WearMission';

import WearVideoGallery from '../components/sections/olimpo_wear/WearVideoGallery';
import WearNewProducts from '../components/sections/olimpo_wear/WearNewProducts';

// ==========================================================
// IMPORTS DE ESTILO
// ==========================================================
import '../styles/global/_global.css';
import '../styles/global/_header.css';
import '../styles/global/_footer.css';
import '../styles/global/SectionDivider.css';
import '../styles/global/olimpo_shared.css';

// ESTILOS OLIMPO WEAR
import '../styles/olimpowear/wear_hero.css';
import '../styles/olimpowear/wear_mission.css';
import '../styles/olimpowear/wear_dresslikegods.css';
import '../styles/olimpowear/wear_bestseller.css';
import '../styles/olimpowear/wear_products.css'; // Estilo geral para Wear
import '../styles/olimpowear/wear_gallery.css'; // Estilo para WearGallery E WearNewProducts

// NOVOS ESTILOS
import '../styles/olimpowear/wear_video_gallery.css';
import '../styles/olimpowear/wear_new_products.css'; // Estilo específico para WearNewProducts (se não for 100% igual ao gallery.css)


const OlimpoWear: FC = () => {
  return (
    <div className="wear-page-container">
      <Header />
      <main>
        <WearHero />
        <WearGallery />
        <SectionDivider />
        <WearMission />
        <WearDressLikeGods />
        <WearBestSeller />
        <WearVideoGallery />
        <SectionDivider />
        <WearNewProducts />
      </main>
      <Footer />
    </div>
  );
};

export default OlimpoWear;