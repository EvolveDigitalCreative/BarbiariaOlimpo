import { initializeApp, FirebaseOptions } from "firebase/app";
import { getFirestore, Firestore } from "firebase/firestore";
import { getStorage, FirebaseStorage } from "firebase/storage";
import { getAuth, Auth } from "firebase/auth";
import { getFunctions, Functions } from "firebase/functions";
import { getAnalytics, Analytics } from "firebase/analytics";

// Definição da interface para garantir que a configuração tem o tipo correto
const firebaseConfig: FirebaseOptions = {
    apiKey: "AIzaSyD9EwV663M-eXBqyZDHToD9xPezfy8OBqw",
    authDomain: "olimpo-3df0d.firebaseapp.com",
    projectId: "olimpo-3df0d",
    storageBucket: "olimpo-3df0d.firebasestorage.app",
    messagingSenderId: "211236641885",
    appId: "1:211236641885:web:6f82f223b3e1839b4ec1b4",
    measurementId: "G-R96RQSV305"
};

// 1. Inicializa o Firebase
const app = initializeApp(firebaseConfig);

// 2. Inicializa os serviços e aplica as tipagens (opcional, mas recomendado)
// O TypeScript infere os tipos, mas definir a variável ajuda na clareza.
export const db: Firestore = getFirestore(app);
export const storage: FirebaseStorage = getStorage(app);
export const auth: Auth = getAuth(app); 
export const functions: Functions = getFunctions(app);

// 3. Inicializa o Analytics (O Analytics deve ser inicializado antes de ser usado)
// Nota: A variável 'analytics' deve ser exportada se for usada fora deste arquivo, 
// mas geralmente é apenas inicializada aqui.
const analytics: Analytics = getAnalytics(app);

// Se precisar do objeto App ou Analytics em outro lugar, exporte-o:
// export { app, analytics };

// Para o seu uso, as exportações de 'db', 'auth', 'storage' e 'functions' são suficientes.
