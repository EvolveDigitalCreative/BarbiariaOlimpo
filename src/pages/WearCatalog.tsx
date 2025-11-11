// src/pages/WearCatalog.tsx

import type { FC } from 'react';
import { useState, useMemo } from 'react';
import WearHeader from '../components/common/WearHeader';
import Footer from '../components/common/Footer';
import '../styles/global/wearhearder.css';
import '../styles/olimpowear/wear_catalog.css';
import { Link } from 'react-router-dom';

import { CATEGORIES, allProducts } from '../data/wearProducts';

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
<Link to={`/wear/product/${product.id}`} aria-label={`Ver produto ${product.name} ${product.model}`}>
                                            <div className="product-card-image-wrapper">
                                                <img 
                                                    src={product.image} 
                                                    alt={`${product.name} ${product.model}`}
                                                />
                                            </div>
                                            <p className="product-card-name">{product.name}</p>
                                            <p className="product-card-info">{product.price}</p>
</Link>
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
                                    <Link to={`/wear/product/${product.id}`} aria-label={`Ver produto ${product.name} ${product.model}`}>
                                        <div className="product-card-image-wrapper">
                                            <img 
                                                src={product.image} 
                                                alt={`${product.name} ${product.model}`}
                                            />
                                        </div>
                                        <p className="product-card-name">{product.name}</p>
                                        <p className="product-card-info">{product.price}</p>
                                    </Link>
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