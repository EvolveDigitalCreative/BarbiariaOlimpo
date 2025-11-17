import type { FC } from 'react';
import { useLocation, Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext'; 

import type { HeaderPreset, IconKey } from './headerTypes'; 
import { iconLinksMap } from './HeaderComponents';

// Caminhos de importação para layouts
import LuxuryLayout from '../layouts/LuxuryLayout';
import CompactLayout from '../layouts/CompactLayout';
import CenteredLayout from '../layouts/CenteredLayout';

// Mock/Exemplo de Configurações de Header
const headerPresets: Record<string, HeaderPreset> = {
    '/': { 
        layout: 'luxury',
        // ✅ CORRIGIDO: Voltando para a classe CSS principal
        rootClass: 'header-barber', 
        logoSrc: '/OlimpoBarBer/images/logo.webp', 
        logoSubtitle: 'LUXURY HAIRCUTS',
        iconsToShow: ['skincare', 'wear', 'user'],
        showNav: true,
    },
    // Adicione outros presets aqui...
};

headerPresets['/barber'] = headerPresets['/'];

const Header: FC = () => {
    const location = useLocation();
    const preset = headerPresets[location.pathname] || headerPresets['/']; 
    const { currentUser, userRole } = useAuth(); 

    const getIconLinks = () => {
        const baseIcons = iconLinksMap();
        const dynamicIcons: Record<IconKey, any> = { ...baseIcons }; 
        
        if (dynamicIcons['user']) { 
            dynamicIcons['user'] = currentUser ? (
                <Link to="/profile" className="icon-link user-icon" aria-label="Perfil">
                    <svg viewBox="0 0 24 24" width="24" height="24" fill="currentColor"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 3c1.93 0 3.5 1.57 3.5 3.5S13.93 12 12 12s-3.5-1.57-3.5-3.5S10.07 5 12 5zm0 14.2c-2.5 0-4.71-1.28-6-3.22.03-1.99 4.07-3.08 6-3.08 1.93 0 5.97 1.09 6 3.08-1.29 1.94-3.5 3.22-6 3.22z"/></svg>
                </Link>
            ) : (
                <Link to="/login" className="icon-link user-icon" aria-label="Login">
                    <svg viewBox="0 0 24 24" width="24" height="24" fill="currentColor"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 3c1.93 0 3.5 1.57 3.5 3.5S13.93 12 12 12s-3.5-1.57-3.5-3.5S10.07 5 12 5zm0 14.2c-2.5 0-4.71-1.28-6-3.22.03-1.99 4.07-3.08 6-3.08 1.93 0 5.97 1.09 6 3.08-1.29 1.94-3.5 3.22-6 3.22z"/></svg>
                </Link>
            );
        }
        
        return dynamicIcons;
    };

    const availableIcons = getIconLinks(); 

    const renderIcons = () => (
        <> 
            {(preset.iconsToShow || []).map((key) => (
                <div key={key}>{availableIcons[key as IconKey]}</div>
            ))}
        </>
    );

    const renderLayout = () => {
        const layoutProps = { preset, renderIcons, userRole }; 

        switch (preset.layout) {
            case 'centered':
                return <CenteredLayout {...layoutProps} />;
            case 'compact':
                return <CompactLayout {...layoutProps} />;
            case 'luxury':
            default:
                return <LuxuryLayout {...layoutProps} />;
        }
    };

    return (
        <header
            className={`main-header ${preset?.rootClass || ''}`} 
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