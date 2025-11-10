// src/services/firebaseConfig.ts - CÓDIGO LIMPO PARA AMBIENTE DE PRODUÇÃO

// MUDANÇA: A interface FirebaseApp é importada junto com initializeApp.
import { initializeApp, type FirebaseOptions, type FirebaseApp } from 'firebase/app';
// Importações de serviços
import { getFirestore, type Firestore } from "firebase/firestore";
import { getStorage, type FirebaseStorage } from 'firebase/storage';
import { getAuth, type Auth } from 'firebase/auth';
import { getFunctions, type Functions } from 'firebase/functions';
import { getAnalytics, isSupported, type Analytics } from 'firebase/analytics'; 

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
const app: FirebaseApp = initializeApp(firebaseConfig);

// 2. Inicializa e exporta os serviços síncronos
export const db: Firestore = getFirestore(app);
export const storage: FirebaseStorage = getStorage(app);
export const auth: Auth = getAuth(app);

// Inicializa functions com a região correta
export const functions: Functions = getFunctions(app, 'us-central1'); 

// 3. Inicializa o Analytics - Condicional e Assíncrono (mantendo a correção anterior)
let analytics: Analytics | null = null;

/**
 * Tenta inicializar o Firebase Analytics.
 * Deve ser chamado UMA VEZ no lado do cliente (client-side), por exemplo,
 * dentro de um useEffect ou no ponto de entrada do seu app para evitar erros SSR/IndexedDB.
 */
export async function initializeAnalytics(): Promise<void> {
    try {
        // Importante: use a função isSupported() para evitar o erro de IndexedDB em ambientes restritos (como SSR).
        const supported = await isSupported();

        if (supported) {
            analytics = getAnalytics(app);
            console.info("@firebase/analytics: Inicializado com sucesso.");
        } else {
            analytics = null;
            console.warn("@firebase/analytics: Inicialização pulada. IndexedDB/Cookies indisponíveis neste ambiente.");
        }
    } catch (e) {
        console.error("Erro inesperado ao inicializar o Firebase Analytics:", e);
        analytics = null;
    }
}

// 4. Função de Acesso. Use esta função para acessar a instância de analytics no resto do seu código.
export function getFirebaseAnalytics(): Analytics | null {
    return analytics;
}

// Exporta a instância principal do app
export { app };

/*
 * NOTA: As chamadas connectEmulator foram removidas.
 * * MUDANÇA CRÍTICA: Você DEVE chamar 'initializeAnalytics()' no seu código principal
 * (dentro de um bloco que só roda no navegador, como um useEffect ou onMounted) 
 * para que o Analytics seja ativado sem erros.
 */