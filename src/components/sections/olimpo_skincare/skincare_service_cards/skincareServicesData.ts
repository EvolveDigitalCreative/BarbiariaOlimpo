// --- DEFINIÇÃO DE TIPOS DE DADOS ---

export interface ServiceStep {
    number: number;
    description: string;
}

export interface ServiceDetailBlock {
    type: string;
    objective: string;
    indicatedFor: string[];
    benefits: string[];
}

export interface GalleryServiceData {
    id: string; // Ex: 'Glow Skin'
    title: string; 
    price: string; // Ex: '40€'
    duration: string; // Ex: '1 hora'
    category: string;
    simpleDescription: string;
    stepsCount: number;
    steps: ServiceStep[];
    details: ServiceDetailBlock;
}

// --- FUNÇÕES DE PATH DE IMAGEM ---

// Para as imagens dos passos detalhados (para o Modal)
export const getStepImagePath = (serviceId: string, stepNumber: number): string => {
    // Exemplo: /OlimpoSkincare/serviços detalhe/Glow Skin_01.webp
    return `/OlimpoSkincare/serviços detalhe/${serviceId}_${String(stepNumber).padStart(2, '0')}.webp`;
};

// Para as imagens principais dos cartões
export const getImagePath = (id: string): string => {
    const fileName = id; 
    return `/OlimpoSkincare/services gerais/${fileName}.webp`; 
};

// --- DADOS DOS SERVIÇOS (COMPLETOS) ---

export const galleryServices: GalleryServiceData[] = [
    // ----------------------------------------------------------------------------------
    // 1. GLOW SKIN 
    // ----------------------------------------------------------------------------------
    { 
        id: 'Glow Skin', 
        title: 'Glow skin', 
        price: '40€',
        duration: '1 hora',
        category: 'SKIN CARE', 
        simpleDescription: 'Limpeza essencial com extração, aplicação de ativos e máscara. Ideal para manter a pele limpa, hidratada e luminosa.',
        stepsCount: 6,
        steps: [
            { number: 1, description: 'Limpeza inicial e esfoliação suave' },
            { number: 2, description: 'Extração de impurezas' },
            { number: 3, description: 'Aplicação de alta frequência para eliminar bactérias' },
            { number: 4, description: 'Aplicação de ativos específicos para a pele' },
            { number: 5, description: 'Máscara hidratante e calmante' },
            { number: 6, description: 'Finalização com protetor solar' },
        ],
        details: {
            type: 'Limpeza essencial com extração, ativos e máscara.',
            objective: 'Manter a pele limpa, hidratada e luminosa, prevenindo acne e imperfeições.',
            indicatedFor: [
                'Peles com acne, borbulhas ou inflamações',
                'Quem procura uma manutenção regular de limpeza de pele',
            ],
            benefits: [
                'Elimina bactérias', 'Seca borbulhas', 'Reduz inflamações', 'Estimula a circulação', 'Promove cicatrização rápida', 'Previne aparecimento de acne',
            ]
        }
    },

    // ----------------------------------------------------------------------------------
    // 2. ELEVATE SKIN
    // ----------------------------------------------------------------------------------
    { 
        id: 'Elevate skin', 
        title: 'Elevate skin', 
        price: '50€',
        duration: '1 hora e 15 minutos',
        category: 'SKIN CARE', 
        simpleDescription: 'Tratamento facial que combina limpeza, esfoliação e regeneração celular para purificar a pele, controlar a oleosidade e reduzir imperfeições.',
        stepsCount: 5, // Inferido
        steps: [
            { number: 1, description: 'Limpeza, tonificação e preparação da pele' },
            { number: 2, description: 'Esfoliação profunda e ativação celular' },
            { number: 3, description: 'Aplicação de ativos de regeneração (ex: DermaPen ou microagulhamento)' },
            { number: 4, description: 'Máscara calmante e nutritiva' },
            { number: 5, description: 'Finalização e proteção solar' },
        ],
        details: {
            type: 'Combinação de limpeza, esfoliação e regeneração celular.',
            objective: 'Purificar a pele, controlar a oleosidade e reduzir imperfeições, promovendo a regeneração celular.',
            indicatedFor: [
                'Peles com textura irregular ou poros dilatados',
                'Peles com excesso de oleosidade',
                'Peles que necessitam de um "boost" de regeneração',
            ],
            benefits: [
                'Frescor imediato', 'Textura mais uniforme', 'Redução visível de imperfeições', 'Controlo da oleosidade', 'Aspeto visivelmente saudável',
            ]
        }
    },
    
    // ----------------------------------------------------------------------------------
    // 3. OLIMPO SKIN
    // ----------------------------------------------------------------------------------
    { 
        id: 'Olimpo Skin', 
        title: 'Olimpo skin', 
        price: '60€',
        duration: '1 hora e 30 minutos',
        category: 'SKIN CARE', 
        simpleDescription: 'Protocolo completo com tecnologia Aqua Plus, ativos personalizados e hidratação revitalizante. Limpa em profundidade, trata e renova a pele.',
        stepsCount: 7, // Inferido
        steps: [
            { number: 1, description: 'Limpeza profunda e desmaquilhagem' },
            { number: 2, description: 'Esfoliação e preparação da pele' },
            { number: 3, description: 'Utilização da tecnologia Aqua Plus para limpeza/hidratação' },
            { number: 4, description: 'Extração de impurezas' },
            { number: 5, description: 'Aplicação de ativos personalizados' },
            { number: 6, description: 'Máscara revitalizante e hidratação intensa' },
            { number: 7, description: 'Finalização e proteção solar de assinatura' },
        ],
        details: {
            type: 'Protocolo de assinatura com Aqua Plus, ativos e hidratação revitalizante.',
            objective: 'Limpar em profundidade, tratar e renovar a pele, proporcionando um brilho espelhado e aspeto uniforme.',
            indicatedFor: [
                'Peles que procuram um tratamento de limpeza e luxo',
                'Peles baças ou sem brilho',
                'Quem procura o tratamento mais procurado da clínica',
            ],
            benefits: [
                'Limpeza profunda', 'Brilho espelhado (Glass Skin)', 'Pele uniforme e rejuvenescida', 'Hidratação intensa', 'Renovação celular',
            ]
        }
    },

    // ----------------------------------------------------------------------------------
    // 4. SKIN SCAN
    // ----------------------------------------------------------------------------------
    { 
        id: 'Skin Scan', 
        title: 'Skin scan', 
        price: '25€',
        duration: '30 minutos',
        category: 'SKIN CARE', 
        simpleDescription: 'Diagnóstico facial com tecnologia coreana e inteligência artificial. Análise completa + plano personalizado.',
        stepsCount: 3, // O Skin Scan é um diagnóstico, tem menos passos de tratamento
        steps: [
            { number: 1, description: 'Preparação da pele para o scan' },
            { number: 2, description: 'Análise facial com a tecnologia (AI) coreana' },
            { number: 3, description: 'Entrega e explicação do plano de tratamento personalizado' },
        ],
        details: {
            type: 'Diagnóstico facial avançado com Inteligência Artificial e tecnologia 3D.',
            objective: 'Analisar camadas profundas da pele, identificar problemas (manchas, rugas, poros) e criar um plano de tratamento 100% personalizado.',
            indicatedFor: [
                'Todos os clientes (é o ponto de partida para qualquer tratamento)',
                'Peles com problemas persistentes e não diagnosticados',
            ],
            benefits: [
                'Diagnóstico detalhado e preciso (sub-superfície)', 'Identificação de problemas invisíveis (ex: danos solares)', 'Plano de tratamento otimizado', 'Poupa tempo e dinheiro em tratamentos errados',
            ]
        }
    },

    // ----------------------------------------------------------------------------------
    // 5. OLIMPO ANTIACNE
    // ----------------------------------------------------------------------------------
    { 
        id: 'Olimpo Antiacne', 
        title: 'Olimpo Antiacne', 
        price: '65€',
        duration: '2:00 horas',
        category: 'SKIN CARE', 
        simpleDescription: 'Tratamento facial criado para prevenir, controlar e reverter a acne, inclusive a acne hormonal. Com ação probiótica e tecnologia LED.',
        stepsCount: 7, // Inferido
        steps: [
            { number: 1, description: 'Limpeza profunda e preparação anti-inflamatória' },
            { number: 2, description: 'Esfoliação suave e extração focada' },
            { number: 3, description: 'Aplicação de tónicos reguladores de oleosidade' },
            { number: 4, description: 'Utilização de ação probiótica para reequilibrar a microflora' },
            { number: 5, description: 'Sessão de luz LED (azul/vermelha) para acalmar e matar bactérias' },
            { number: 6, description: 'Máscara calmante e cicatrizante' },
            { number: 7, description: 'Finalização e recomendação de rotina' },
        ],
        details: {
            type: 'Tratamento facial com ação probiótica e tecnologia LED para acne.',
            objective: 'Prevenir, controlar e reverter a acne (incluindo hormonal), reequilibrando a microflora e reduzindo a inflamação.',
            indicatedFor: [
                'Peles com acne ativo (grau I a III)',
                'Peles com acne hormonal ou inflamações persistentes',
                'Peles oleosas com tendência a borbulhas',
            ],
            benefits: [
                'Reduz inflamação e vermelhidão', 'Controla a oleosidade', 'Elimina bactérias causadoras de acne', 'Acelera a cicatrização', 'Previne o aparecimento de novas lesões',
            ]
        }
    },
];