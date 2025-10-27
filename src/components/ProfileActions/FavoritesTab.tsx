// src/components/ProfileActions/FavoritesTab.tsx

import React, { useState, useEffect } from 'react';
import { useAuth } from '../../components/auth/AuthContext'; // Assumindo que você usa AuthContext
import { collection, query, getDocs, doc, deleteDoc } from 'firebase/firestore';
import { db } from '../../services/firebaseConfig'; // Assumindo que o Firestore está configurado em firebaseConfig.ts
import type { FavoriteItem } from '../../types';
import styles from './ProfileActions.module.css';

interface FavoritesTabProps {
    styles: typeof styles; // Passa o objeto styles do módulo CSS
}

const FavoritesTab: React.FC<FavoritesTabProps> = ({ styles }) => {
    const { currentUser } = useAuth();
    const [favorites, setFavorites] = useState<FavoriteItem[]>([]);
    const [loading, setLoading] = useState(true);

    const fetchFavorites = async () => {
        if (!currentUser) {
            setLoading(false);
            return;
        }

        try {
            // Caminho: users/{userId}/favorites
            const favoritesCollectionRef = collection(db, `users/${currentUser.uid}/favorites`);
            const q = query(favoritesCollectionRef);
            const querySnapshot = await getDocs(q);

            const items: FavoriteItem[] = querySnapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data()
            } as FavoriteItem));
            
            setFavorites(items);
        } catch (error) {
            console.error("Erro ao buscar favoritos:", error);
            // Mock de dados se a busca falhar ou para o caso de teste (BASEADO NA IMAGEM)
             const mockFavorites: FavoriteItem[] = [
                { id: '1', type: 'product', name: 'Alex9', colorDetails: 'Cor - preto & branco', price: 25, imageUrl: '/OlimpoBarBer/images/mock/alex9_pb.jpg' },
                { id: '2', type: 'product', name: 'Mirror', colorDetails: 'Cor - branco & preto', price: 25, imageUrl: '/OlimpoBarBer/images/mock/mirror_bp.jpg' },
                { id: '3', type: 'product', name: 'Alex9', colorDetails: 'Cor - branco & gold', price: 25, imageUrl: '/OlimpoBarBer/images/mock/alex9_bg.jpg' },
                { id: '4', type: 'product', name: 'Basic', colorDetails: 'Cor - branco & preto', price: 25, imageUrl: '/OlimpoBarBer/images/mock/basic_bp.jpg' },
                { id: '5', type: 'product', name: 'Mirror', colorDetails: 'Cor - preto & branco', price: 25, imageUrl: '/OlimpoBarBer/images/mock/mirror_pb.jpg' },
            ];
            // Use esta linha se você preferir um mock visual
            // setFavorites(mockFavorites); 
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchFavorites();
    }, [currentUser]);

    const handleRemoveFavorite = async (itemId: string) => {
        if (!currentUser) return;
        
        try {
            const itemDocRef = doc(db, `users/${currentUser.uid}/favorites`, itemId);
            await deleteDoc(itemDocRef);
            
            // Atualiza o estado local
            setFavorites(prev => prev.filter(item => item.id !== itemId));
        } catch (error) {
            console.error("Erro ao remover favorito:", error);
        }
    };

    if (loading) {
        return <div className={styles['empty-message']}>A carregar favoritos...</div>;
    }

    if (favorites.length === 0) {
        // ✅ Corresponde à imagem 'image_9d9840.png'
        return <div className={styles['empty-message']}>Não existem favoritos no momento.</div>;
    }

    return (
        <div className={styles['favorites-grid']}>
            {favorites.map((item) => (
                <div key={item.id} className={styles['favorite-item']}>
                    <div className={styles['item-content']}>
                        <img 
                            src={item.imageUrl} 
                            alt={item.name} 
                            className={styles['item-image']} 
                        />
                        <div className={styles['item-details']}>
                            <div className={styles['item-info']}>
                                <h4>{item.name}</h4>
                                <span className={styles['color-details']}>{item.colorDetails}</span>
                            </div>
                            <span 
                                className={styles['remove-button']} 
                                onClick={() => handleRemoveFavorite(item.id)}
                                title="Remover"
                            >
                                x
                            </span>
                        </div>
                        <span className={styles['item-price']}>{item.price}€</span>
                    </div>
                    {/* Linha separadora, conforme imagem */}
                    <div className={styles['item-separator']}></div>
                </div>
            ))}
        </div>
    );
};

export default FavoritesTab;