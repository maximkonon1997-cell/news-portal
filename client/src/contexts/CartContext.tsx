import React, { createContext, useContext, useState, useEffect } from 'react';
import api from '../api';
import { useAuth } from './AuthContext';
import type { IProduct } from '../types';

// Расширенный тип для элемента корзины на фронте (включает инфу о продукте)
export interface ICartProduct extends IProduct {
    count: number;
}

interface CartContextType {
    cartItems: ICartProduct[];
    addToCart: (productId: number) => Promise<void>;
    decreaseItem: (productId: number) => Promise<void>;
    removeItem: (productId: number) => Promise<void>;
    clearCart: () => Promise<void>; // <--- 1. Добавляем в тип
    totalPrice: number;
}

const CartContext = createContext<CartContextType>({} as CartContextType);

export const CartProvider = ({ children }: { children: React.ReactNode }) => {
    const [cartItems, setCartItems] = useState<ICartProduct[]>([]);
    const { user } = useAuth();

    // Загружаем корзину, когда юзер авторизовался
    useEffect(() => {
        if (user) {
            fetchCart();
        } else {
            setCartItems([]);
        }
    }, [user]);

    const fetchCart = async () => {
        try {
            const { data } = await api.get('/cart');
            setCartItems(data);
        } catch (error) {
            console.error('Failed to fetch cart');
        }
    };

    const addToCart = async (productId: number) => {
        if (!user) {
            alert('Сначала войдите в систему!');
            return;
        }
        await api.post('/cart/add', { productId });
        await fetchCart(); // Обновляем состояние
    };

    const decreaseItem = async (productId: number) => {
        await api.post('/cart/decrease', { productId });
        await fetchCart();
    };

    const removeItem = async (productId: number) => {
        await api.delete(`/cart/${productId}`);
        await fetchCart();
    };
    // 2. Добавляем функцию очистки
    const clearCart = async () => {
        try {
            await api.post('/cart/checkout');
            setCartItems([]); // Очищаем локально
        } catch (error) {
            console.error('Checkout failed', error);
            throw error; // Пробрасываем ошибку, чтобы страница доставки узнала о ней
        }
    };

    const totalPrice = cartItems.reduce((acc, item) => acc + (item.price * item.count), 0);

    return (
        <CartContext.Provider value={{ cartItems, addToCart, decreaseItem, removeItem, clearCart, totalPrice }}>
            {children}
        </CartContext.Provider>
    );
    
};

export const useCart = () => useContext(CartContext);