import { createContext, useContext, useState, useEffect } from 'react';
import type { FC, ReactNode } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import type { User } from 'firebase/auth';

import { auth as firebaseAuth } from '../services/firebaseConfig';

interface AuthContextType {
    currentUser: User | null;
    loading: boolean;
    // ✅ ADICIONADO: userRole no tipo
    userRole: string | null; 
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
    children: ReactNode;
}

export const AuthProvider: FC<AuthProviderProps> = ({ children }) => {
    const [currentUser, setCurrentUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(true);
    // ✅ ADICIONADO: userRole no estado
    const [userRole, setUserRole] = useState<string | null>(null); 

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(firebaseAuth, user => {
            setCurrentUser(user);
            
            // Lógica de atribuição de Role simplificada (AJUSTE CONFORME SEU BACKEND/CLAIMS!)
            if (user && user.email === 'admin@olimpo.com') {
                setUserRole('admin');
            } else {
                setUserRole(user ? 'user' : null);
            }

            setLoading(false);
        });
        return unsubscribe;
    }, []);

    return (
        // ✅ userRole incluído no valor do contexto
        <AuthContext.Provider value={{ currentUser, loading, userRole }}>
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