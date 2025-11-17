// src/components/common/Header/headerTypes.ts

export type IconKey = 'skincare' | 'wear' | 'barber' | 'user';

/**
 * Define a estrutura de um "Preset" de Header.
 */
export interface HeaderPreset {
  layout: 'luxury' | 'centered' | 'compact';
  // ✅ CORRIGIDO: Tipagem ajustada para usar apenas as classes CSS existentes.
  rootClass: 'header-barber' | 'header-skincare' | 'header-wear'; 
  
  logoSrc?: string; // Caminho para a IMAGEM da logo
  logoText?: string; // TEXTO da logo (usado no Skincare)
  logoSubtitle?: string; // TEXTO do subtítulo (usado no Wear)
  
  showNav?: boolean; 
  iconsToShow?: IconKey[];
}

export interface HeaderProps {}