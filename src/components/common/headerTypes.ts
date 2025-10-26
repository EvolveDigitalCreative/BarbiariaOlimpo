// src/components/common/Header/headerTypes.ts

export type IconKey = 'skincare' | 'wear' | 'barber' | 'user';

/**
 * Define a estrutura de um "Preset" de Header.
 * Agora ele é muito mais simples!
 */
export interface HeaderPreset {
  layout: 'luxury' | 'centered' | 'compact';
  // A classe CSS principal que será aplicada no <header>
  // Isso ativará .header-barber, .header-wear, etc. no seu CSS
  rootClass: 'header-barber' | 'header-skincare' | 'header-wear'; 
  
  logoSrc?: string; // Caminho para a IMAGEM da logo
  logoText?: string; // TEXTO da logo (usado no Skincare)
  logoSubtitle?: string; // TEXTO do subtítulo (usado no Wear)
  
  showNav?: boolean; 
  iconsToShow?: IconKey[];
}

export interface HeaderProps {}