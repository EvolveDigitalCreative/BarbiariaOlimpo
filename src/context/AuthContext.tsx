import { createContext, useContext, useState, useEffect } from 'react';
import type { FC, ReactNode } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import type { User } from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore';

// 🛠️ Certifique-se de que 'firebaseAuth' e 'db' estão corretamente exportados
import { auth as firebaseAuth, db } from '../services/firebaseConfig';

interface AuthContextType {
    currentUser: User | null;
    loading: boolean;
    userRole: string | null;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
    children: ReactNode;
}

export const AuthProvider: FC<AuthProviderProps> = ({ children }) => {
    const [currentUser, setCurrentUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(true);
    const [userRole, setUserRole] = useState<string | null>(null);

    useEffect(() => {
        // Escuta o estado de autenticação em tempo real
        const unsubscribe = onAuthStateChanged(firebaseAuth, async user => {
            setCurrentUser(user);

            let role: string | null = null;

            if (user) {
                try {
                    // Busca a role no documento de utilizador no Firestore
                    const userDocRef = doc(db, 'users', user.uid);
                    const docSnap = await getDoc(userDocRef);

                    if (docSnap.exists()) {
                        const data = docSnap.data();
                        const firestoreRole = data.role as string;
                        role = firestoreRole || 'user'; // Define 'user' como padrão
                    } else {
                        role = 'user';
                    }
                } catch (e) {
                    console.error("Erro ao buscar role do utilizador no Firestore:", e);
                    role = 'user';
                }
            }

            setUserRole(role);
            setLoading(false);
        });

        return unsubscribe;
    }, []);

    return (
        <AuthContext.Provider value={{ currentUser, loading, userRole }}>
            {/* Só renderiza os filhos após o carregamento para garantir o estado correto */}
            {!loading && children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};