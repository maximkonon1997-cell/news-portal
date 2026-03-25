// client/src/pages/MainPage.tsx
import React, { useEffect, useState } from 'react';
import api from '../api';
import type { IProduct } from '../types';
import { ProductCard } from '../components/ProductCard';
import { useCart } from '../contexts/CartContext';
import './MainPage.css'; // Создадим ниже

const CATEGORIES = [
    { value: '', label: 'Все' },
    { value: 'dairy', label: '🥛 Молочка' },
    { value: 'bakery', label: '🍞 Выпечка' },
    { value: 'fruits', label: '🍎 Фрукты' },
    { value: 'vegetables', label: '🥦 Овощи' },
    { value: 'meat', label: '🥩 Мясо' },
];

export const MainPage: React.FC = () => {
    const [products, setProducts] = useState<IProduct[]>([]);
    const [loading, setLoading] = useState(true);
    const [search, setSearch] = useState('');
    const [sort, setSort] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('');
    
    const { addToCart } = useCart();

    useEffect(() => {
        fetchProducts();
    }, [sort, selectedCategory]);

    const fetchProducts = async () => {
        setLoading(true);
        try {
            const params = new URLSearchParams();
            if (search) params.append('search', search);
            if (sort) params.append('sort', sort);
            if (selectedCategory) params.append('category', selectedCategory);

            const { data } = await api.get('/products', { params });
            setProducts(data);
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="container main-page">
            <div className="filters-bar">
                <div className="search-group">
                    <input 
                        className="search-input"
                        type="text" 
                        placeholder="🔍 Найти продукты..." 
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        onKeyDown={(e) => e.key === 'Enter' && fetchProducts()}
                    />
                    <button className="btn-primary" onClick={fetchProducts}>Найти</button>
                </div>
                
                <div className="controls-group">
                    <div className="category-tabs">
                        {CATEGORIES.map(cat => (
                            <button
                                key={cat.value}
                                className={`cat-tab ${selectedCategory === cat.value ? 'active' : ''}`}
                                onClick={() => setSelectedCategory(cat.value)}
                            >
                                {cat.label}
                            </button>
                        ))}
                    </div>

                    <select 
                        className="sort-select"
                        value={sort}
                        onChange={(e) => setSort(e.target.value)}
                    >
                        <option value="">По умолчанию</option>
                        <option value="price_asc">Сначала дешевые</option>
                        <option value="price_desc">Сначала дорогие</option>
                    </select>
                </div>
            </div>
            
            {loading ? (
                <div className="loading">Загружаем свежие продукты...</div>
            ) : (
                <>
                    {products.length === 0 ? (
                        <div className="empty-state">
                            <h3>Ничего не найдено 😔</h3>
                            <p>Попробуйте изменить параметры поиска</p>
                        </div>
                    ) : (
                        <div className="products-grid">
                            {products.map(product => (
                                <ProductCard 
                                    key={product.id} 
                                    product={product} 
                                    onAdd={addToCart}
                                />
                            ))}
                        </div>
                    )}
                </>
            )}
        </div>
    );
};