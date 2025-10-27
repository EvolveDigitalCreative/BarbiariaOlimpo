// src/components/ProfileActions/DiscountsTab.tsx

import React from 'react';
import type { DiscountVoucher } from '../../types';
import styles from './ProfileActions.module.css';

interface DiscountsTabProps {
    styles: typeof styles;
}

const mockDiscounts: DiscountVoucher[] = [
    {
        id: '1',
        title: '10% de desconto Olimpo Skin',
        description: 'Voucher digital de 10% de desconto para os serviços do Olimpo Skin.',
        code: 'OLIMPOSKIN10',
        discountPercentage: 10,
        isActive: true,
    }
    // Adicione mais vouchers se desejar testar a rolagem
];

const DiscountsTab: React.FC<DiscountsTabProps> = ({ styles }) => {
    const activeDiscounts = mockDiscounts.filter(d => d.isActive);

    if (activeDiscounts.length === 0) {
         // ✅ Corresponde à imagem 'image_9d989b.png'
        return <div className={styles['empty-message']}>Não tens descontos ou vouchers ativos no momento.</div>;
    }

    return (
        <div className={styles['discounts-list']}>
            {activeDiscounts.map((voucher) => (
                // ✅ Corresponde à imagem 'image_9d987e.png'
                <div key={voucher.id} className={styles['voucher-card']}>
                    <div className={styles['voucher-info']}>
                        <h4 className={styles['voucher-title']}>{voucher.title}</h4>
                        <p className={styles['voucher-description']}>{voucher.description}</p>
                    </div>
                    <div className={styles['voucher-qr-code']}>
                        {/* QR Code Fictício - Na realidade, você usaria uma biblioteca de QR Code aqui */}
                        <img 
                            src="/OlimpoBarBer/images/mock/qrcode_mock.png" 
                            alt="Código QR para Desconto" 
                            className={styles['qr-image']}
                        />
                        <span className={styles['qr-link']}>Descarregar QR code</span>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default DiscountsTab;