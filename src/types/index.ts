// src/types/index.ts

export interface FavoriteItem {
    id: string;
    type: 'product' | 'service';
    name: string;
    colorDetails: string; // Ex: 'Cor - preto & branco'
    price: number;
    imageUrl: string;
}

export interface DiscountVoucher {
    id: string;
    title: string;
    description: string;
    code: string; // Fictício, pode ser usado para gerar o QR code
    discountPercentage: number;
    isActive: boolean;
}

export interface Barber {
    image: string | undefined;
    id: string; // UID do usuário no Firebase
    name: string;
    imageUrl: string; // URL da foto do barbeiro
    specialty: string; // Ex: 'BARBEIRO', 'CABELEIREIRO', 'ESTILISTA'
    role: 'barber' | 'admin' | 'user'; // Assumindo que você usa um campo 'role'
    // Adicione outros campos relevantes como email, phone, bio, etc.
}

export interface Service {
    id: string;
    nome: string; // Nome do serviço
    preco: string | number; // Preço
    imagem_url?: string; // URL da imagem (opcional)
    categoria?: string; // Ex: 'BARBEARIA', 'SKINCARE'
    // Adicione outros campos se necessário (duração, descrição, etc.)
}