// src/components/common/Header.tsx

import type { FC } from 'react';
import { useLocation, Link } from 'react-router-dom'; // Adiciona Link
import { useAuth } from '../auth/AuthContext'; // ✅ Importa useAuth (Ajuste o caminho!)

import type { HeaderPreset, IconKey } from './headerTypes'; 
import { iconLinksMap } from './HeaderComponents'; // Assumindo que iconLinksMap está aqui ou é importado

import LuxuryLayout from '../layouts/LuxuryLayout';
import CompactLayout from '../layouts/CompactLayout';
import CenteredLayout from '../layouts/CenteredLayout';

const headerPresets: Record<string, HeaderPreset> = {
  '/': {
    layout: 'luxury',
    rootClass: 'header-barber',
    // ✅ CORRIGIDO: Usa a URL da pasta public diretamente
    logoSrc: '/OlimpoBarBer/images/logo.webp', 
    iconsToShow: ['skincare', 'wear', 'user'],
  },
  '/wear': {
    layout: 'centered',
    rootClass: 'header-wear',
    logoSrc: '/OlimpoBarBer/images/logo.webp', // ✅ CORRIGIDO
    logoSubtitle: 'WEAR',
    showNav: true,
    iconsToShow: ['skincare', 'barber', 'user'],
  },
  '/skincare': {
    layout: 'compact',
    rootClass: 'header-skincare',
    logoText: 'SKINCARE',
    iconsToShow: ['user'],
  },
};
// Alias para /barber (mantém)
headerPresets['/barber'] = headerPresets['/'];

const Header: FC = () => {
  const location = useLocation();
  const preset = headerPresets[location.pathname] || headerPresets['/'];
  const { currentUser } = useAuth(); // ✅ Obtém o utilizador atual

  // ✅ Modifica a função que gera os links dos ícones
  const getIconLinks = () => {
    // Busca o mapa base de ícones (assumindo que iconLinksMap retorna um objeto)
    const baseIcons = iconLinksMap(); // Ex: { skincare: <Link...>, wear: <Link...>, user: <Link...> }
    
    // Cria uma cópia para modificar o ícone 'user'
    const dynamicIcons = { ...baseIcons };

    // Substitui o link do ícone 'user' baseado no estado de login
    if (dynamicIcons['user']) { // Verifica se o ícone 'user' existe no mapa base
      dynamicIcons['user'] = currentUser ? (
        // Se logado, link para /profile
        <Link to="/profile" className="icon-link user-icon" aria-label="Perfil"> {/* Adicione classes CSS se necessário */}
          {/* Pode manter o ícone original ou trocar por um de perfil */}
          <img src="/OlimpoBarBer/icons/profile_optimized.png" alt="Perfil" /> {/* ✅ Use a URL direta */}
        </Link>
      ) : (
        // Se não logado, link para /login (ou mantém o link original de iconLinksMap)
        <Link to="/login" className="icon-link user-icon" aria-label="Login"> {/* Adicione classes CSS se necessário */}
          <img src="/OlimpoBarBer/icons/profile_optimized.png" alt="Login" /> {/* ✅ Use a URL direta */}
        </Link>
        // Alternativa: return baseIcons['user']; // Se o link original já era para /login
      );
    }
    
    return dynamicIcons;
  };

  const availableIcons = getIconLinks(); // Chama a função para obter os links dinâmicos

  // Função renderIcons agora usa os availableIcons dinâmicos
  const renderIcons = () => (
    <> 
      {(preset.iconsToShow || []).map((key) => (
        // Renderiza o componente Link diretamente do mapa dinâmico
        <div key={key}>{availableIcons[key as IconKey]}</div>
      ))}
    </>
  );

  const renderLayout = () => {
    switch (preset.layout) {
      case 'centered':
        return <CenteredLayout preset={preset} renderIcons={renderIcons} />;
      case 'compact':
        return <CompactLayout preset={preset} renderIcons={renderIcons} />;
      case 'luxury':
      default:
        return <LuxuryLayout preset={preset} renderIcons={renderIcons} />;
    }
  };

  return (
    <header
      className={`main-header ${preset.rootClass}`}
      style={{
        position: 'relative',
        zIndex: 1000,
      }}
    >
      {renderLayout()}
    </header>
  );
};

export default Header;