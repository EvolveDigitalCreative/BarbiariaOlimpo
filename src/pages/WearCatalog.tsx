// src/pages/WearCatalog.tsx

import type { FC } from 'react';
import { useState, useMemo } from 'react';
import WearHeader from '../components/common/WearHeader';
import Footer from '../components/common/Footer';
import '../styles/global/wearhearder.css';
import '../styles/olimpowear/wear_catalog.css';
import '../styles/olimpowear/wear_gallery.css';

// === DADOS DO CATÁLOGO COMPLETO ===
// Definimos as categorias disponíveis
const CATEGORIES = ["Todas as T-shirts", "Basic", "Alex", "Alex9", "Mirror"];

// Dados com os nomes reais dos arquivos
const allProducts = [
    // --- BASIC ---
    { id: 1, name: "Basic", model: "White Black Logo", color: "White", price: "25€", image: "/OlimpoWear/shirts/T-SHIRT_-basica preta e branca.png", category: "Basic" },
    { id: 2, name: "Basic", model: "Black White Logo", color: "Black", price: "25€", image: "/OlimpoWear/shirts/T-SHIRT-basica moeda 3d.png", category: "Basic" },
    { id: 3, name: "Basic", model: "White Gold Logo", color: "White", price: "25€", image: "/OlimpoWear/shirts/T-SHIRT-basica branca e dourada moeda 3d nas costas.png", category: "Basic" },
    { id: 4, name: "Basic", model: "Black Gold Logo", color: "Black", price: "25€", image: "/OlimpoWear/shirts/T-SHIRT-basica preta e dourada.png", category: "Basic" },

    // --- ALEX ---
    { id: 5, name: "Alex", model: "White Black Coin", color: "White", price: "25€", image: "/OlimpoWear/shirts/T-SHIRT-alex-branca e preta.png", category: "Alex" },
    { id: 6, name: "Alex", model: "Black White Coin", color: "Black", price: "25€", image: "/OlimpoWear/shirts/T-SHIRT-alex-preta e branca costa.png", category: "Alex" },
    { id: 7, name: "Alex", model: "White Gold Coin", color: "White", price: "25€", image: "/OlimpoWear/shirts/T-SHIRT-alex-branca e dourada.png", category: "Alex" },
    { id: 8, name: "Alex", model: "Black Gold Coin", color: "Black", price: "25€", image: "/OlimpoWear/shirts/T-SHIRT-alex-costa preta e dourada.png", category: "Alex" },

    // --- ALEX9 ---
    { id: 9, name: "Alex9", model: "White Black Design", color: "White", price: "28€", image: "/OlimpoWear/shirts/T-SHIRT- branca e preta moeda 3d costa.png", category: "Alex9" },
    { id: 10, name: "Alex9", model: "Black White Design", color: "Black", price: "28€", image: "/OlimpoWear/shirts/T-SHIRT-preta e branca moeda 3d verso.png", category: "Alex9" },
    
    // --- MIRROR ---
    { id: 11, name: "Mirror", model: "White Design", color: "White", price: "30€", image: "/OlimpoWear/shirts/T-SHIRT-alex-branca e dourada.png", category: "Mirror" },
    { id: 12, name: "Mirror", model: "Black Design", color: "Black", price: "30€", image: "/OlimpoWear/shirts/T-SHIRT-alex-preta e dourada.png", category: "Mirror" },
];

const WearCatalog: FC = () => {
    // Estado para controlar qual filtro está ativo
    const [selectedCategory, setSelectedCategory] = useState<string>("Todas as T-shirts");

    // Lógica de filtragem: 
    // Se for "Todas as T-shirts", retorna todos. Caso contrário, filtra pela categoria.
    const filteredProducts = useMemo(() => {
        if (selectedCategory === "Todas as T-shirts") {
            return allProducts;
        }
        return allProducts.filter(p => p.category === selectedCategory);
    }, [selectedCategory]);

    // Lógica para agrupar os produtos filtrados pela sua categoria
    const groupedFilteredProducts = useMemo(() => {
        const groups: Record<string, typeof allProducts> = {};
        
        filteredProducts.forEach(product => {
            const groupKey = product.category;
            if (!groups[groupKey]) {
                groups[groupKey] = [];
            }
            groups[groupKey].push(product);
        });

        // Se estiver em "Todas as T-shirts", retorna todos os grupos.
        // Se estiver numa categoria específica (ex: "Alex"), apenas essa categoria será retornada, 
        // mas o nome do grupo ainda aparece no topo, dando o efeito visual desejado.
        
        // Se o filtro não for "Todas as T-shirts", garante que a chave do grupo é a do filtro
        if (selectedCategory !== "Todas as T-shirts" && Object.keys(groups).length > 0) {
             return { [selectedCategory]: filteredProducts };
        }

        return groups;
        
    }, [filteredProducts, selectedCategory]);


    return (
        <>
            <WearHeader />
            <section className="content-section wear-gallery-section wear-catalog-page">
                <h1 className="catalog-main-title">Todos os modelos</h1>

                {/* BARRA DE FILTRAGEM DE MODELOS */}
            <nav className="catalog-filter-nav">
                {CATEGORIES.map(category => (
                    <button
                        key={category}
                        className={`filter-button ${selectedCategory === category ? 'active' : ''}`}
                        onClick={() => setSelectedCategory(category)}
                    >
                        {category}
                    </button>
                ))}
            </nav>

            {/* SEÇÃO PRINCIPAL COM OS PRODUTOS FILTRADOS */}
            <div className="catalog-product-display">
                
                {/* O catálogo geral exibe todos os produtos agrupados por categoria */}
                {selectedCategory === "Todas as T-shirts" ? (
                    Object.entries(groupedFilteredProducts).map(([category, items]) => (
                        <div key={category} className="category-group">
                            {/* Título de categoria grande, como no seu design */}
                            <h2 className="category-title">{category}</h2>
                            
                            <div className="product-grid">
                                {items.map((product) => (
                                    <div className="product-card" key={product.id}>
                                        <a href={`/wear/product/${product.id}`} aria-label={`Ver produto ${product.name} ${product.model}`}>
                                            <div className="product-card-image-wrapper">
                                                <img 
                                                    src={product.image} 
                                                    alt={`${product.name} ${product.model}`}
                                                />
                                            </div>
                                            <p className="product-card-name">{product.name}</p>
                                            <p className="product-card-info">{product.price}</p>
                                        </a>
                                    </div>
                                ))}
                            </div>
                        </div>
                    ))
                ) : (
                    /* Se uma categoria específica for selecionada (ex: Basic) */
                    <div className="category-group">
                        <h2 className="category-title">{selectedCategory}</h2>
                        <div className="product-grid">
                            {filteredProducts.map((product) => (
                                <div className="product-card" key={product.id}>
                                    <a href={`/wear/product/${product.id}`} aria-label={`Ver produto ${product.name} ${product.model}`}>
                                        <div className="product-card-image-wrapper">
                                            <img 
                                                src={product.image} 
                                                alt={`${product.name} ${product.model}`}
                                            />
                                        </div>
                                        <p className="product-card-name">{product.name}</p>
                                        <p className="product-card-info">{product.price}</p>
                                    </a>
                                </div>
                            ))}
                        </div>
                    </div>
                )}
            </div>

            <div className="greek-pattern-border-wear"></div>
        </section>
        <Footer />
        </>
    );
};

export default WearCatalog;