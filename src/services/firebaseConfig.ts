// src/services/firebaseConfig.ts - CÓDIGO LIMPO PARA AMBIENTE DE PRODUÇÃO

import { initializeApp, type FirebaseOptions } from 'firebase/app';
// Importações de serviços
import { getFirestore, type Firestore } from "firebase/firestore";
import { getStorage, type FirebaseStorage } from 'firebase/storage';
import { getAuth, type Auth } from 'firebase/auth';
import { getFunctions, type Functions } from 'firebase/functions';
import { getAnalytics, type Analytics } from 'firebase/analytics';

// Definição da interface de configuração (mantida)
const firebaseConfig: FirebaseOptions = {
    apiKey: "AIzaSyD9EwV663M-eXBqyZDHToD9xPezfy8OBqw",
    authDomain: "olimpo-3df0d.firebaseapp.com",
    projectId: "olimpo-3df0d",
    storageBucket: "olimpo-3df0d.firebasestorage.app",
    messagingSenderId: "211236641885",
    appId: "1:211236641885:web:6f82f223b3e1839b4ec1b4",
    measurementId: "G-R96RQSV305"
};

// 1. Inicializa o Firebase App (INSTÂNCIA ÚNICA)
const app = initializeApp(firebaseConfig);

// 2. Inicializa e exporta os serviços
export const db: Firestore = getFirestore(app);
export const storage: FirebaseStorage = getStorage(app);
export const auth: Auth = getAuth(app);

// Inicializa functions com a região correta
export const functions: Functions = getFunctions(app, 'us-central1'); 

// 3. Inicializa o Analytics
// Nota: O Analytics precisa ser chamado para ser ativado.
export const analytics: Analytics = getAnalytics(app);

// Exporta a instância principal do app
export { app };

/*
 * NOTA: As chamadas connectEmulator foram removidas.
 * Isso garante que o app use o servidor (produção) em vez dos emuladores locais.
 * Para voltar a usar os emuladores, você precisará adicionar novamente a lógica condicional:
 
    if (process.env.NODE_ENV === 'development') {
        import { connectFunctionsEmulator, connectFirestoreEmulator, connectAuthEmulator } from 'firebase/functions/etc...';
        connectFunctionsEmulator(functions, "localhost", 5002);
        connectFirestoreEmulator(db, "localhost", 8081);
        connectAuthEmulator(auth, "http://localhost:9098");
    }
*/
