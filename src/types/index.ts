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