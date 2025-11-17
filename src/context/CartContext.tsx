// src/context/CartContext.tsx

import { createContext, useContext, useState, useEffect, useCallback } from 'react';
import type { FC, ReactNode } from 'react';

// 🛑 NOVAS IMPORTAÇÕES NECESSÁRIAS:
import { doc, onSnapshot, setDoc } from 'firebase/firestore';
// Importamos 'db' (Firestore) do seu ficheiro de configuração
import { db } from '../services/firebaseConfig';
// Importamos o hook de Autenticação para obter o UID
import { useAuth } from './AuthContext';

// ==========================================================
// 1. DEFINIÇÃO DE TIPOS (MANTIDA)
// ==========================================================

export interface CartItem {
    id: number; // Usado internamente para manipulação local (add, remove, update)
    name: string;
    model: string;
    color: string;
    size: string;
    quantity: number;
    price: number;
    image: string;
}

interface CartContextType {
    cart: CartItem[];
    loadingCart: boolean; // 🛑 NOVO: Estado para saber se o carrinho está a carregar do Firebase
    addToCart: (item: Omit<CartItem, 'id'>) => void;
    removeFromCart: (itemId: number) => void;
    updateQuantity: (itemId: number, newQuantity: number) => void;
    calculateSubtotal: () => number;
}


const CartContext = createContext<CartContextType | undefined>(undefined);

// ==========================================================
// 2. PROVIDER (COM FIREBASE PERSISTÊNCIA)
// ==========================================================

interface CartProviderProps {
    children: ReactNode;
}

export const CartProvider: FC<CartProviderProps> = ({ children }) => {
    // 🛑 OBTER DADOS DO UTILIZADOR
    const { currentUser, loading: loadingAuth } = useAuth();

    const [cart, setCart] = useState<CartItem[]>([]);
    const [loadingCart, setLoadingCart] = useState(true);

    // --- Funções de Sincronização e Escrita no Firestore ---

    // Função que salva o estado atual do carrinho no Firestore
    const syncCartToFirestore = useCallback(async (newCart: CartItem[]) => {
        if (!currentUser) {
            // Não faz nada se não houver utilizador logado
            return;
        }

        // O documento do carrinho é identificado pelo UID do utilizador
        const cartRef = doc(db, 'carts', currentUser.uid);

        try {
            const cartDataToSave = {
                items: newCart,
                updatedAt: new Date(),
            };

            // setDoc (com dados completos) é usado para salvar ou sobrescrever o carrinho
            await setDoc(cartRef, cartDataToSave);
        } catch (error) {
            console.error("Erro ao salvar o carrinho no Firestore:", error);
        }
    }, [currentUser]);

    // 🛑 EFEITO: LER E ESCUTAR O CARRINHO DO FIREBASE (Sincronização em Tempo Real)
    useEffect(() => {
        // Não continua se a autenticação ainda estiver a carregar
        if (loadingAuth) return;

        // Se o utilizador não estiver logado, limpa o carrinho local
        if (!currentUser) {
            setCart([]);
            setLoadingCart(false);
            return;
        }

        setLoadingCart(true);
        const cartRef = doc(db, 'carts', currentUser.uid);

        // onSnapshot: Escuta em tempo real o documento do carrinho
        const unsubscribe = onSnapshot(cartRef, (docSnap) => {
            if (docSnap.exists()) {
                const data = docSnap.data();
                // Assumimos que 'items' é um array de CartItem
                setCart(data.items || []);
            } else {
                // Se o documento não existir (primeira vez), inicia com carrinho vazio
                setCart([]);
            }
            setLoadingCart(false);
        }, (error) => {
            console.error("Erro ao escutar o carrinho:", error);
            setLoadingCart(false);
        });

        return () => unsubscribe(); // Limpeza da subscrição ao sair
    }, [currentUser, loadingAuth]);
    // Este efeito é executado sempre que o utilizador muda (login/logout)


    // --- Funções de Manipulação do Carrinho (Atualizam o estado local e sincronizam com Firestore) ---

    // Função auxiliar para atualizar o estado e depois salvar no Firestore
    const updateCartStateAndSync = useCallback((updateFn: (prevCart: CartItem[]) => CartItem[]) => {
        setCart(prevCart => {
            const newCart = updateFn(prevCart);
            // Sincroniza a nova versão apenas se o utilizador estiver logado
            if (currentUser) {
                syncCartToFirestore(newCart);
            }
            return newCart;
        });
    }, [currentUser, syncCartToFirestore]);


    const updateQuantity = useCallback((itemId: number, newQuantity: number) => {
        updateCartStateAndSync(prevCart =>
            prevCart.map(item =>
                item.id === itemId
                    ? { ...item, quantity: Math.max(1, newQuantity) }
                    : item
            )
        );
    }, [updateCartStateAndSync]);


    const addToCart = useCallback((item: Omit<CartItem, 'id'>) => {
        if (!currentUser) {
            alert('Por favor, faça login para adicionar itens ao carrinho persistente.');
            // Opcional: manter no localStorage temporariamente, mas vamos assumir que queremos o Firebase
            return;
        }

        updateCartStateAndSync(prevCart => {
            // Lógica de agrupar itens
            const existingItem = prevCart.find(
                p => p.name === item.name && p.model === item.model && p.size === item.size && p.color === item.color
            );

            if (existingItem) {
                // Se existir, atualizamos a quantidade
                return prevCart.map(p => p.id === existingItem.id ? { ...p, quantity: p.quantity + item.quantity } : p);
            } else {
                // Novo item, criamos um novo ID local
                const newItemId = Date.now();
                return [...prevCart, { ...item, id: newItemId }];
            }
        });
    }, [currentUser, updateCartStateAndSync]);


    const removeFromCart = useCallback((itemId: number) => {
        updateCartStateAndSync(prevCart => prevCart.filter(item => item.id !== itemId));
    }, [updateCartStateAndSync]);


    const calculateSubtotal = useCallback((): number => {
        return cart.reduce((acc, item) => acc + (item.price * item.quantity), 0);
    }, [cart]);


    const contextValue: CartContextType = {
        cart,
        loadingCart, // Incluímos o estado de carregamento
        addToCart,
        removeFromCart,
        updateQuantity,
        calculateSubtotal,
    };

    return (
        <CartContext.Provider value={contextValue}>
            {children}
        </CartContext.Provider>
    );
};

// ==========================================================
// 3. HOOK CUSTOMIZADO PARA USO FÁCIL
// ==========================================================

export const useCart = () => {
    const context = useContext(CartContext);
    if (context === undefined) {
        throw new Error('useCart deve ser usado dentro de um CartProvider');
    }
    return context;
};