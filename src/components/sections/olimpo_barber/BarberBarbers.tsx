// src/components/sections/olimpo_barber/BarberBarbers.tsx

import React, { useState, useEffect } from 'react'; // Import useState and useEffect
import type { FC } from 'react';
import { collection, query, where, getDocs } from 'firebase/firestore'; // Import Firestore functions
import { db } from '../../../services/firebaseConfig'; // ✅ Ajuste o caminho se necessário

// Interface para definir a estrutura dos dados do barbeiro
interface Barber {
    id: string; // ID do documento do Firestore (será o UID do user)
    name: string;
    // Adicione outros campos que você tenha no Firestore para cada barbeiro
    // imageUrl?: string;
    // specialty?: string;
}

const BarbersSection: FC = () => {
    // Estado para armazenar os barbeiros buscados do Firebase
    const [barbers, setBarbers] = useState<Barber[]>([]);
    // Estado para indicar o carregamento
    const [loading, setLoading] = useState(true);
    // Estado para erros (opcional, mas bom ter)
    const [error, setError] = useState<string | null>(null);

    // useEffect para buscar os dados quando o componente montar
    useEffect(() => {
        const fetchBarbers = async () => {
            setLoading(true);
            setError(null);
            try {
                // 1. Cria uma referência para a coleção 'users'
                const usersCollectionRef = collection(db, 'users');
                
                // 2. Cria uma query para buscar documentos onde 'role' é igual a 'barber'
                const q = query(usersCollectionRef, where("role", "==", "barber"));
                
                // 3. Executa a query
                const querySnapshot = await getDocs(q);
                
                // 4. Mapeia os resultados para o formato da interface Barber
                const barbersData = querySnapshot.docs.map(doc => ({
                    id: doc.id,
                    ...doc.data() // Pega todos os outros campos do documento
                } as Barber )); // Afirma que o objeto tem o formato Barber

                setBarbers(barbersData); // Atualiza o estado com os dados
                console.log("Barbeiros carregados:", barbersData);

            } catch (err) {
                console.error("Erro ao buscar barbeiros:", err);
                setError("Não foi possível carregar a lista de barbeiros. Tente novamente mais tarde.");
            } finally {
                setLoading(false); // Finaliza o carregamento
            }
        };

        fetchBarbers(); // Chama a função de busca
    }, []); // O array vazio [] significa que este efeito roda apenas uma vez, quando o componente monta

    return (
        <section className="content-section barbers-section light-background">
            <h2 className="section-title black-title section-title-centered">OS NOSSOS BARBEIROS</h2>
            
            <div className="barbers-content-wrapper">
                
                {/* Mostra um indicador de carregamento */}
                {loading && (
                    <div className="loading-indicator">
                        <p>A carregar barbeiros...</p>
                        {/* Pode adicionar um spinner CSS aqui */}
                    </div>
                )}

                {/* Mostra mensagem de erro, se houver */}
                {!loading && error && (
                     <div className="barbers-unavailable-message">
                         {/* Pode reusar o ícone da tesoura aqui se quiser */}
                         <h3 className="unavailable-title">Erro ao Carregar</h3>
                         <p className="unavailable-text">{error}</p>
                     </div>
                )}

                {/* Mostra a mensagem de indisponível APENAS se não estiver carregando, não houver erro E a lista estiver vazia */}
                {!loading && !error && barbers.length === 0 && (
                    <div className="barbers-unavailable-message">
                        <img 
                            src="/barbershop/icons/tesoura.png" 
                            alt="Tesoura" 
                            className="tesoura-icon"
                        />
                        <p className="tesoura-label">Tesoura</p>
                        
                        <h3 className="unavailable-title">Nenhum barbeiro disponível</h3>
                        <p className="unavailable-text">
                            No momento não temos barbeiros cadastrados. Tente novamente mais tarde.
                        </p>
                    </div>
                )}

                {/* Mostra a lista de barbeiros se não estiver carregando, não houver erro E a lista NÃO estiver vazia */}
                {!loading && !error && barbers.length > 0 && (
                    <div className="barbers-list">
                        {/* Mapeia os barbeiros para renderizar cada um */}
                        {barbers.map((barber) => (
                            // ✅ Crie um componente BarberCard para exibir cada barbeiro
                            // <BarberCard key={barber.id} barber={barber} /> 
                            
                            // Ou um exemplo simples aqui:
                            <div key={barber.id} className="barber-item">
                                {/* <img src={barber.imageUrl || '/caminho/para/imagem/padrao.png'} alt={barber.name} /> */}
                                <h4>{barber.name}</h4>
                                {/* <p>{barber.specialty}</p> */}
                            </div>
                        ))}
                    </div>
                )}
            </div>

            <div className="greek-border-bottom"></div>
        </section>
    );
};

// ✅ Adicione um estilo básico para o loading e para o item do barbeiro no seu CSS
/* Exemplo no seu barbers_section.css ou similar:
.loading-indicator {
    text-align: center;
    padding: 40px;
    color: #555;
}

.barber-item {
    border: 1px solid #eee;
    padding: 20px;
    margin-bottom: 15px;
    text-align: center;
}
.barber-item img {
    max-width: 100px;
    border-radius: 50%;
    margin-bottom: 10px;
}
*/

export default BarbersSection;