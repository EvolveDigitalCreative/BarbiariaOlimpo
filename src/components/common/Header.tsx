import type { FC } from 'react';
import { Link } from 'react-router-dom';

// Importações dos Ícones
import WearCoinIcon from '../../../public/OlimpoBarBer/icons/icone de nevegacao do waer.png'; 
import UserIcon from '../../../public/OlimpoBarBer/icons/profile_highres.png'; 
import SkincareCoinIcon from '../../../public/OlimpoBarBer/icons/icone de nevegcao da skincare.png'; 
const BarberCoinIcon = SkincareCoinIcon;

// Logo
import OlimpoLogo from '../../../public/OlimpoBarBer/images/logo.webp'; 

interface HeaderProps {
    domain: 'barber' | 'skincare' | 'wear';
    iconSizes?: {
        wear?: number;
        skincare?: number;
        barber?: number;
        user?: number;
    };
}

const Header: FC<HeaderProps> = ({ domain, iconSizes = {} }) => {
    const headerClass = `main-header header-${domain}`;
    const domainTitle = domain.toUpperCase();

    // 🧱 Tamanhos padrão para cada tipo de ícone
    const defaultIconSizes = {
        wear: 78,
        skincare: 60,
        barber: 70,
        user: 45,
    };

    // Combina tamanhos padrão com os passados via prop
    const sizes = { ...defaultIconSizes, ...iconSizes };

    const navLinks = [
        { path: '/wear', label: 'CATÁLOGO', show: domain === 'wear' },
        { path: '/coin', label: 'OLIMPO COIN', show: domain === 'wear' },
        { path: '/carrinho', label: 'CARRINHO', show: domain === 'wear' },
        { path: '/pesquisa', label: 'PESQUISA', show: domain === 'wear' },
    ].filter(link => link.show); 

    const logoPath = domain === 'barber' ? '/' : `/${domain}`;

    const DomainSwitchers = () => (
        <>
            {domain !== 'skincare' && ( 
                <Link to="/skincare" className="header-icon-link icon-domain-skincare">
                    <img
                        src={SkincareCoinIcon}
                        alt="Olimpo Skincare"
                        className="icon-img icon-skincare"
                        style={{
                            width: `${sizes.skincare}px`,
                            height: `${sizes.skincare}px`,
                        }}
                    />
                    {domain === 'wear' && <span className="icon-label">OLIMPO SKIN</span>}
                </Link>
            )}

            {domain !== 'barber' && ( 
                <Link to="/barber" className="header-icon-link icon-domain-barber">
                    <img
                        src={BarberCoinIcon}
                        alt="Olimpo Barber"
                        className="icon-img icon-barber"
                        style={{
                            width: `${sizes.barber}px`,
                            height: `${sizes.barber}px`,
                        }}
                    />
                    {domain === 'wear' && <span className="icon-label">OLIMPO BARBER</span>}
                </Link>
            )}
            
            <Link to="/login" className="header-icon-link icon-user">
                <img
                    src={UserIcon}
                    alt="Perfil"
                    className="icon-img icon-user"
                    style={{
                        width: `${sizes.user}px`,
                        height: `${sizes.user}px`,
                    }}
                />
            </Link>
        </>
    );

    const renderHeaderContent = () => {
        if (domain === 'barber') {
            return (
                <div className="header-icons header-icons-minimal header-icons-with-labels">
                    <Link to="/skincare" className="header-icon-link icon-domain-skincare">
                        <img
                            src={SkincareCoinIcon}
                            alt="Olimpo Skincare"
                            className="icon-img icon-skincare"
                            style={{
                                width: `${sizes.skincare}px`,
                                height: `${sizes.skincare}px`,
                            }}
                        />
                        <span className="icon-label">OLIMPO SKINCARE</span>
                    </Link>

                    <Link to="/wear" className="header-icon-link icon-domain-wear">
                        <img
                            src={WearCoinIcon}
                            alt="Olimpo Wear"
                            className="icon-img icon-wear"
                            style={{
                                width: `${sizes.wear}px`,
                                height: `${sizes.wear}px`,
                            }}
                        /> 
                        <span className="icon-label">OLIMPO WEAR</span>
                    </Link>

                    <Link to="/login" className="header-icon-link icon-user">
                        <img
                            src={UserIcon}
                            alt="Perfil"
                            className="icon-img icon-user"
                            style={{
                                width: `${sizes.user}px`,
                                height: `${sizes.user}px`,
                            }}
                        />
                    </Link>
                </div>
            );
        }

        if (domain === 'skincare') {
            return (
                <div className="header-icons header-icons-minimal">
                    <Link to="/" className="header-icon-link icon-domain-barber-main">
                        <img
                            src={SkincareCoinIcon}
                            alt="Voltar Principal"
                            className="icon-img icon-barber-main"
                            style={{
                                width: `${sizes.barber}px`,
                                height: `${sizes.barber}px`,
                            }}
                        />
                    </Link>

                    <Link to="/wear" className="header-icon-link icon-domain-wear">
                        <img
                            src={WearCoinIcon}
                            alt="Olimpo Wear"
                            className="icon-img icon-wear"
                            style={{
                                width: `${sizes.wear}px`,
                                height: `${sizes.wear}px`,
                            }}
                        /> 
                    </Link>

                    <Link to="/login" className="header-icon-link icon-user">
                        <img
                            src={UserIcon}
                            alt="Perfil"
                            className="icon-img icon-user"
                            style={{
                                width: `${sizes.user}px`,
                                height: `${sizes.user}px`,
                            }}
                        />
                    </Link>
                </div>
            );
        }

        if (domain === 'wear') {
            return (
                <>
                    <nav className="nav-menu">
                        {navLinks.map((link) => (
                            <Link key={link.path} to={link.path} className="nav-link">
                                {link.label}
                            </Link>
                        ))}
                    </nav>
                    
                    <div className="header-icons header-icons-full">
                        <DomainSwitchers />
                    </div>
                </>
            );
        }
        return null;
    };

    return (
        <header className={headerClass}>
            <div className="header-container">
                <Link to={logoPath} className="logo-wrapper">
                    <img src={OlimpoLogo} alt="Olimpo Logo" className="logo-img" /> 
                    {domain === 'wear' && <span className="domain-name">{domainTitle}</span>}
                </Link>
                {renderHeaderContent()}
            </div>
        </header>
    );
};

export default Header;
