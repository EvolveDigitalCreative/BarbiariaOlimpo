// Script para adicionar serviços à coleção Firestore
const admin = require('firebase-admin');
const path = require('path');
const fs = require('fs'); 

// 🛑 IMPORTANTE: Define o caminho absoluto para o ficheiro JSON.
// Esta configuração assume que o 'serviceAccountKey.json' está na pasta 'functions/'
// Se o seu ficheiro estiver em 'functions/src/', mude de '..' para '.'
// Vamos manter o '..' que é o mais comum, mas se o erro persistir, mude para '.'
const serviceAccountPath = path.join(__dirname, '..', 'serviceAccountKey.json');

// Carrega o ficheiro de credenciais lendo-o do disco e parseando (análise) como JSON
let serviceAccount;
try {
    const rawData = fs.readFileSync(serviceAccountPath);
    serviceAccount = JSON.parse(rawData);
} catch (error) {
    console.error(`❌ Erro crítico: Não foi possível ler o ficheiro de credenciais.
    Verifique se o 'serviceAccountKey.json' está na PASTA functions/ (e não na src/).
    Caminho tentado: ${serviceAccountPath}`);
    // Exibe o erro de diretório para o utilizador
    console.error(error.message); 
    process.exit(1); 
}

// Inicialização com as Credenciais de Serviço
if (!admin.apps.length) {
    admin.initializeApp({
        credential: admin.credential.cert(serviceAccount)
    });
}
const db = admin.firestore();

const servicesToAdd = [
    {
        name: "Corte Clássico",
        description: "O corte padrão com tesoura e máquina. Inclui lavagem e estilização.",
        price: 15.00, 
        duration: 45, 
        id: "corte_classico"
    },
    {
        name: "Corte Fade/Degradê",
        description: "Transição suave de máquina. Perfeito para um look moderno e polido.",
        price: 18.00,
        duration: 60,
        id: "corte_fade"
    },
    {
        name: "Barba à Navalha",
        description: "A experiência completa: modelagem da barba, contorno à navalha e toalhas quentes.",
        price: 15.00,
        duration: 30,
        id: "barba_navalha"
    },
    {
        name: "Combo: Corte Clássico + Barba",
        description: "Corte Clássico e Barba à Navalha combinados para um serviço completo.",
        price: 28.00,
        duration: 75,
        id: "combo_corte_barba"
    }
];

async function addServicesToFirestore() {
    console.log("Iniciando adição de serviços...");
    const batch = db.batch();
    
    for (const service of servicesToAdd) {
        const docId = service.id;
        // Cria um objeto sem o campo 'id' interno para o Firestore
        const firestoreData = { ...service };
        delete firestoreData.id; 
        
        const docRef = db.collection("services").doc(docId);
        batch.set(docRef, firestoreData);
        console.log(`Preparado para adicionar: ${service.name}`);
    }

    try {
        await batch.commit();
        console.log("✅ Sucesso! Todos os serviços foram adicionados à coleção 'services'.");
    } catch (error) {
        console.error("❌ Erro ao adicionar serviços:", error);
    }
}

addServicesToFirestore();