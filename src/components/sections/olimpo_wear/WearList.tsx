// src/components/sections/olimpowear/WearList.tsx

import type { FC } from 'react';
import '../../../styles/olimpowear/wear_list.css';

const items = [
    'Basic','Basic','2BC','Basic','2BC','Basic','2BC','Basic','2BC','Alex','2BC','Alex','2BC','Alex','2BC','Alex','2BC'
];

const IconHome = () => (
    <svg viewBox="0 0 24 24" width="20" height="20" aria-hidden="true" focusable="false">
        <path d="M3 11.5L12 4l9 7.5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" fill="none"/>
        <path d="M5 21V12h14v9" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" fill="none"/>
    </svg>
);

const IconCalendar = () => (
    <svg viewBox="0 0 24 24" width="20" height="20" aria-hidden="true" focusable="false">
        <rect x="3" y="5" width="18" height="16" rx="2" ry="2" stroke="currentColor" strokeWidth="1.6" fill="none"/>
        <path d="M16 3v4M8 3v4M3 11h18" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" fill="none"/>
    </svg>
);

const IconUser = () => (
    <svg viewBox="0 0 24 24" width="20" height="20" aria-hidden="true" focusable="false">
        <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" fill="none"/>
        <circle cx="12" cy="8" r="4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" fill="none"/>
    </svg>
);

const getIconByCategory = (cat: string) => {
    switch (cat) {
        case 'Basic':
            return <IconHome />;
        case '2BC':
            return <IconCalendar />;
        case 'Alex':
            return <IconUser />;
        default:
            return <IconUser />;
    }
};

const WearList: FC = () => {
    return (
        <section className="wear-list-section" aria-label="Lista de produtos Olímpo">
            <ul className="wear-list" role="list">
                {items.map((cat, idx) => (
                    <li key={`${cat}-${idx}`} className="wear-list-item" role="listitem">
                        <span className="wear-icon" aria-hidden="true">
                            {getIconByCategory(cat)}
                        </span>
                        <span className="wear-text">{cat}</span>
                    </li>
                ))}
            </ul>
        </section>
    );
};

export default WearList;
