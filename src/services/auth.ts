import { 
  signInWithEmailAndPassword,
  signOut,
  createUserWithEmailAndPassword,
  type User
} from 'firebase/auth';
import { doc, setDoc, getDoc, updateDoc } from 'firebase/firestore';
import { auth, db } from './firebaseConfig';

export interface UserData {
  uid: string;
  email: string;
  role: string;
  name?: string;
  active?: boolean;
  createdAt: Date;
  lastLogin?: Date;
}

export async function loginWithEmail(email: string, password: string): Promise<UserData> {
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    const userData = await getUserData(userCredential.user.uid);
    
    // Update last login
    await updateDoc(doc(db, 'users', userCredential.user.uid), {
      lastLogin: new Date()
    });

    return userData;
  } catch (error: any) {
    console.error('Login error:', error);
    throw new Error(mapAuthErrorToMessage(error.code));
  }
}

export async function logout(): Promise<void> {
  try {
    await signOut(auth);
  } catch (error) {
    console.error('Logout error:', error);
    throw error;
  }
}

export async function createUser(email: string, password: string, role: string = 'client'): Promise<UserData> {
  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    
    const userData: UserData = {
      uid: userCredential.user.uid,
      email,
      role,
      active: true,
      createdAt: new Date()
    };

    await setDoc(doc(db, 'users', userCredential.user.uid), userData);
    return userData;
  } catch (error: any) {
    console.error('Create user error:', error);
    throw new Error(mapAuthErrorToMessage(error.code));
  }
}

export async function getUserData(uid: string): Promise<UserData> {
  try {
    const userDoc = await getDoc(doc(db, 'users', uid));
    if (!userDoc.exists()) {
      throw new Error('User not found');
    }
    return userDoc.data() as UserData;
  } catch (error) {
    console.error('Get user data error:', error);
    throw error;
  }
}

export async function updateUserRole(uid: string, newRole: string): Promise<void> {
  try {
    await updateDoc(doc(db, 'users', uid), {
      role: newRole
    });
  } catch (error) {
    console.error('Update user role error:', error);
    throw error;
  }
}

export async function updateUserStatus(uid: string, active: boolean): Promise<void> {
  try {
    await updateDoc(doc(db, 'users', uid), {
      active
    });
  } catch (error) {
    console.error('Update user status error:', error);
    throw error;
  }
}

function mapAuthErrorToMessage(errorCode: string): string {
  const errorMap: { [key: string]: string } = {
    'auth/user-not-found': 'Usuário não encontrado.',
    'auth/wrong-password': 'Senha incorreta.',
    'auth/invalid-email': 'Email inválido.',
    'auth/email-already-in-use': 'Email já está em uso.',
    'auth/weak-password': 'Senha muito fraca.',
    'auth/operation-not-allowed': 'Operação não permitida.',
    'auth/invalid-credential': 'Credenciais inválidas.'
  };
  
  return errorMap[errorCode] || 'Erro desconhecido na autenticação.';
}