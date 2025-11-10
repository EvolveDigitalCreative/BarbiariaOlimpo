// src/components/ProfileActions/DiscountsTab.tsx - ATUALIZADO com Firebase

import React, { useState, useEffect } from 'react';
import { useAuth } from '../../components/auth/AuthContext'; // Importação do AuthContext
import { collection, query, getDocs } from 'firebase/firestore';
import { db } from '../../services/firebaseConfig'; 
import type { DiscountVoucher } from '../../types';
import styles from './ProfileActions.module.css';

interface DiscountsTabProps {
    styles: typeof styles;
}

const DiscountsTab: React.FC<DiscountsTabProps> = ({ styles }) => {
    // ✅ Puxa o usuário logado
    const { currentUser } = useAuth();
    const [discounts, setDiscounts] = useState<DiscountVoucher[]>([]);
    const [loading, setLoading] = useState(true);

    const fetchDiscounts = async () => {
        if (!currentUser) {
            setLoading(false);
            return;
        }

        setLoading(true);
        try {
            // ✅ Caminho para a subcoleção de vouchers do usuário
            const vouchersCollectionRef = collection(db, `users/${currentUser.uid}/vouchers`);
            const q = query(vouchersCollectionRef);
            const querySnapshot = await getDocs(q);

            const activeVouchers: DiscountVoucher[] = querySnapshot.docs
                .map(doc => ({
                    id: doc.id,
                    ...doc.data()
                } as DiscountVoucher))
                // Filtra apenas vouchers marcados como ativos, se o Firestore não fizer isso.
                .filter(v => v.isActive); 
            
            setDiscounts(activeVouchers);
        } catch (error) {
            console.error("Erro ao buscar descontos:", error);
            // Mock de dado único para teste visual, caso o Firebase não retorne nada.
            const mockDiscounts: DiscountVoucher[] = [
                {
                    id: 'MOCK-1',
                    title: '10% de desconto Olimpo Skin',
                    description: 'Voucher digital de 10% de desconto para os serviços do Olimpo Skin.',
                    code: 'OLIMPOSKIN10',
                    discountPercentage: 10,
                    isActive: true,
                }
            ];
            // setDiscounts(mockDiscounts); // Descomente para usar o mock em caso de falha
            setDiscounts([]);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchDiscounts();
    }, [currentUser]);


    if (loading) {
        return <div className={styles['empty-message']}>A carregar descontos...</div>;
    }

    if (discounts.length === 0) {
        return <div className={styles['empty-message']}>Não tens descontos ou vouchers ativos no momento.</div>;
    }

    // Código de renderização da lista de descontos (mantido)
    return (
        <div className={styles['discounts-list']}>
            {discounts.map((voucher) => (
                <div key={voucher.id} className={styles['voucher-card']}>
                    <div className={styles['voucher-info']}>
                        <h4 className={styles['voucher-title']}>{voucher.title}</h4>
                        <p className={styles['voucher-description']}>{voucher.description}</p>
                    </div>
                    <div className={styles['voucher-qr-code']}>
                        {/* URL de imagem fictícia para o QR code */}
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