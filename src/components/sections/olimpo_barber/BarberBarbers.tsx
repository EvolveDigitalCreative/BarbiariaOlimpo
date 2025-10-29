// src/components/sections/olimpo_barber/BarberBarbers.tsx - COM CARROSSEL E IMAGENS LOCAIS

import React, { useState, useEffect, type FC } from 'react';
import { collection, query, where, getDocs } from 'firebase/firestore'; 
import { db } from '../../../services/firebaseConfig'; // ✅ Ajuste o caminho se necessário

// Importar Slider e CSS (sem alterações)
import Slider from "react-slick";
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";
import '../../../styles/olimpobarber/barber_barbers.css'; // Ajuste o caminho se necessário

// ✅ 1. Importar as imagens locais (AJUSTE OS NOMES E CAMINHOS!)
// CUIDADO: Se os ficheiros estão em src/assets/carrossel_barbeiros/, o caminho DEVE ser '../../assets/...'
import barberImgSimon from '/assets/carrossel_barbeiros/OLIMPO_foto_de_perfil_Simon.jpg';
import barberImgJoao from '/assets/carrossel_barbeiros/OLIMPO_barbeiros_Joao.jpg';
import barberImgAfonso from '/../assets/carrossel_barbeiros/Foto_de_perfil_Afonso.jpg';
import barberImgTiago from '/assets/carrossel_barbeiros/Foto_de_perfil_Tiago_Antunes.jpg'; 
// Adicione mais imports conforme necessário

// Interface Barber (agora com 'localImageSrc')
interface Barber {
    id: string; 
    name: string;
    localImageSrc?: string; // ✅ Propriedade para guardar o src da imagem importada
    // specialty?: string;
}

// ✅ 2. Criar um mapeamento (Nome do Barbeiro -> Imagem Importada)
const barberImageMap: { [key: string]: string } = {
    "Simon": barberImgSimon,
    "João": barberImgJoao,
    "Afonso": barberImgAfonso,
    "Tiago": barberImgTiago,
    // Adicione mais barbeiros aqui
};


const BarbersSection: FC = () => {
    const [barbers, setBarbers] = useState<Barber[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchBarbers = async () => {
            setLoading(true);
            setError(null);
            try {
                const usersCollectionRef = collection(db, 'users');
                const q = query(usersCollectionRef, where("role", "==", "barber"));
                const querySnapshot = await getDocs(q);
                
                const barbersData = querySnapshot.docs.map(doc => {
                    const data = doc.data();
                    const barberName = data.name as string; 
                    return {
                        id: doc.id,
                        name: barberName,
                        // ✅ Mapeia a imagem local: Se o nome for "João" e não "JOÃO", ele pega a imagem.
                        localImageSrc: barberImageMap[barberName] || '/path/to/placeholder-barber.jpg', 
                        ...data
                    } as Barber;
                }); 

                setBarbers(barbersData);

            } catch (err) {
                console.error("Erro ao buscar barbeiros:", err);
                setError("Não foi possível carregar a lista de barbeiros. Tente novamente mais tarde.");
            } finally {
                setLoading(false); 
            }
        };

        fetchBarbers(); 
    }, []); 

    // Configurações do Carrossel (sem alterações)
    const settings = {
        dots: true,
        infinite: false,
        speed: 500,
        slidesToShow: 4,
        slidesToScroll: 1,
        arrows: false,
        dotsClass: "slick-dots slick-thumb",
        responsive: [
            { breakpoint: 1024, settings: { slidesToShow: 3 } },
            { breakpoint: 768, settings: { slidesToShow: 2 } },
            { breakpoint: 480, settings: { slidesToShow: 1 } }
        ]
    };

    return (
        <section className="content-section barbers-section light-background">
            <h2 className="section-title black-title section-title-centered">OS NOSSOS BARBEIROS</h2>
            
            <div className="barbers-content-wrapper">
                
                {loading && <div className="loading-indicator"><p>A carregar barbeiros...</p></div>}
                {!loading && error && <div className="barbers-unavailable-message">...</div>}
                {!loading && !error && barbers.length === 0 && <div className="barbers-unavailable-message">...</div>}

                {/* ✅ Carrossel com Estrutura de Hover */}
                {!loading && !error && barbers.length > 0 && (
                    <div className="barbers-carousel-container">
                        <Slider {...settings}>
                            {barbers.map((barber) => (
                                <div key={barber.id} className="barber-slide">
                                    {/* ✅ NOVO CONTAINER PAI PARA O HOVER: barber-card-link */}
                                    <div className="barber-card-link"> 
                                        <div className="barber-card"> 
                                            
                                            {/* Imagem */}
                                            <img 
                                                src={barber.localImageSrc} 
                                                alt={barber.name} 
                                                className="barber-image"
                                            />
                                            
                                            {/* ✅ 1. OVERLAY (para escurecer, invisível por padrão) */}
                                            <div className="barber-overlay"></div>
                                            
                                            {/* ✅ 2. INFORMAÇÕES (Nome e Link, invisível por padrão) */}
                                            <div className="barber-info">
                                                <h4 className="barber-name">{barber.name}</h4>
                                                <span className="barber-profile-link">VER PERFIL</span>
                                            </div>

                                        </div>
                                    </div>
                                </div>
                            ))}
                        </Slider>
                    </div>
                )}
            </div>
        </section>
    );
};

export default BarbersSection;