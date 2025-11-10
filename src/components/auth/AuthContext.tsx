// src/contexts/AuthContext.tsx
// ✅ REMOVED React import (usually not needed)
import { createContext, useContext, useState, useEffect, type ReactNode } from 'react'; // ✅ Added 'type'
import { onAuthStateChanged, type User } from 'firebase/auth'; // ✅ Added 'type'
import { doc, getDoc } from 'firebase/firestore';
import { auth, db } from '../../services/firebaseConfig'; // ✅ Ajuste o caminho se necessário

interface AuthContextType {
  currentUser: User | null;
  userRole: string | null; // 'admin', 'barber', 'skin', 'client', null
  loadingAuth: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}

interface AuthProviderProps {
  children: ReactNode;
}

export function AuthProvider({ children }: AuthProviderProps) {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [userRole, setUserRole] = useState<string | null>(null);
  const [loadingAuth, setLoadingAuth] = useState(true);

  useEffect(() => {
    // Escuta mudanças no estado de autenticação
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      setCurrentUser(user);
      if (user) {
        // Se logado, busca a role no Firestore
        const userDocRef = doc(db, 'users', user.uid);
        try {
          const docSnap = await getDoc(userDocRef);
          if (docSnap.exists()) {
            setUserRole(docSnap.data().role || 'client'); // Pega a role, default 'client' se não existir
          } else {
            console.warn("Documento do utilizador não encontrado no Firestore:", user.uid);
            setUserRole('client'); // Define um default se não encontrar
          }
        } catch (error) {
          console.error("Erro ao buscar role do utilizador:", error);
          setUserRole(null); // Erro ao buscar
        }
      } else {
        // Se deslogado, limpa a role
        setUserRole(null);
      }
      setLoadingAuth(false); // Marca autenticação como carregada
    });

    // Limpa o listener ao desmontar
    return unsubscribe;
  }, []);

  const value = {
    currentUser,
    userRole,
    loadingAuth,
  };

  // Não renderiza nada até a autenticação inicial ser verificada
  return (
    <AuthContext.Provider value={value}>
      {!loadingAuth && children}
    </AuthContext.Provider>
  );
}