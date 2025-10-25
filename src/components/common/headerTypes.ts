// src/components/common/Header/headerTypes.ts
// Este arquivo centraliza todas as "formas" de dados (types) 
// que o nosso Header e seus layouts utilizam.

/** Define os nomes-chave dos ícones que podemos controlar */
export type IconKey = 'skincare' | 'wear' | 'barber' | 'user';

/**
 * Define a estrutura completa de um "Preset" de Header.
 * Cada rota (página) do site terá um preset correspondente.
 */
export interface HeaderPreset {
  layout: 'luxury' | 'centered' | 'compact';
  logoSrc?: string; // Caminho para a IMAGEM da logo
  logoSize?: { width: number; height: number }; // Tamanho da IMAGEM
  logoText?: string; // TEXTO da logo (usado no Skincare)
  logoSubtitle?: string; // TEXTO do subtítulo (usado no Wear)
  showNav?: boolean; // Define se a navegação (Catálogo, etc.) aparece
  iconsToShow?: IconKey[]; // Quais ícones de navegação mostrar
  customIconSizes?: Partial<Record<IconKey, number>>; // Tamanhos customizados
  containerStyle?: React.CSSProperties; // Estilo do container (para layouts de 1 barra)
}

/** Define as props que o componente Header principal pode receber (atualmente nenhuma) */
export interface HeaderProps {}