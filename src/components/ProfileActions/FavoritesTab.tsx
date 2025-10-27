// src/components/ProfileActions/FavoritesTab.tsx

import React, { useState, useEffect } from 'react';
import { useAuth } from '../../components/auth/AuthContext'; // Importação do AuthContext
import { collection, query, getDocs, doc, deleteDoc } from 'firebase/firestore';
import { db } from '../../services/firebaseConfig'; 
import type { FavoriteItem } from '../../types';
import styles from './ProfileActions.module.css';

interface FavoritesTabProps {
    styles: typeof styles;
}

const FavoritesTab: React.FC<FavoritesTabProps> = ({ styles }) => {
    // ✅ Puxa o usuário logado
    const { currentUser } = useAuth();
    const [favorites, setFavorites] = useState<FavoriteItem[]>([]);
    const [loading, setLoading] = useState(true);

    const fetchFavorites = async () => {
        if (!currentUser) {
            setLoading(false);
            return;
        }

        setLoading(true);
        try {
            // ✅ Caminho para a subcoleção de favoritos do usuário logado
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
            setFavorites([]); // Falha, mostra vazio
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
            // ✅ Deleta o documento na subcoleção
            const itemDocRef = doc(db, `users/${currentUser.uid}/favorites`, itemId);
            await deleteDoc(itemDocRef);
            
            setFavorites(prev => prev.filter(item => item.id !== itemId));
        } catch (error) {
            console.error("Erro ao remover favorito:", error);
        }
    };

    if (loading) {
        return <div className={styles['empty-message']}>A carregar favoritos...</div>;
    }

    if (favorites.length === 0) {
        return <div className={styles['empty-message']}>Não existem favoritos no momento.</div>;
    }

    // Código de renderização do grid de favoritos (mantido)
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
                    <div className={styles['item-separator']}></div>
                </div>
            ))}
        </div>
    );
};

export default FavoritesTab;