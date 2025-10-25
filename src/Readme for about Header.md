src/
└── components/
    └── common/
        ├── Header/
        │   ├── layouts/
        │   │   ├── CenteredLayout.tsx  (O layout da página WEAR)
        │   │   ├── CompactLayout.tsx   (O layout da página SKINCARE)
        │   │   └── LuxuryLayout.tsx    (O layout da HOME/BARBER)
        │   │
        │   ├── HeaderComponents.tsx    (Partes reutilizáveis: Logo, NavMenu, iconLinksMap)
        │   ├── headerTypes.ts          (Nossos tipos: HeaderPreset, IconKey)
        │   └── Header.tsx               (Nosso Header.tsx principal, agora mais limpo)
        │
        └── Footer.tsx