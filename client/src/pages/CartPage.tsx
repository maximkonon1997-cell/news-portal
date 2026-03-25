import React from 'react';
import { useCart } from '../contexts/CartContext';
import { Link } from 'react-router-dom';

export const CartPage: React.FC = () => {
    const { cartItems, decreaseItem, addToCart, removeItem, totalPrice } = useCart();

    if (cartItems.length === 0) {
        return <div style={{ padding: 20 }}>Корзина пуста</div>;
    }

    return (
        <div style={{ padding: '20px', maxWidth: '800px', margin: '0 auto' }}>
            <h2>Корзина</h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                {cartItems.map(item => (
                    <div key={item.id} style={{ 
                        border: '1px solid #ddd', 
                        padding: '10px', 
                        display: 'flex', 
                        justifyContent: 'space-between',
                        alignItems: 'center'
                    }}>
                        <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
                            <img src={item.image} alt={item.title} style={{ width: 50, height: 50, objectFit: 'cover' }} />
                            <div>
                                <h4 style={{ margin: 0 }} data-title="basket">{item.title}</h4>
                                <span data-price="basket">{item.price} ₽</span>
                            </div>
                        </div>

                        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                            <button onClick={() => decreaseItem(item.id)}>-</button>
                            <span>{item.count}</span>
                            <button onClick={() => addToCart(item.id)}>+</button>
                            <button onClick={() => removeItem(item.id)} style={{ marginLeft: 10, color: 'red' }}>X</button>
                        </div>
                    </div>
                ))}
            </div>

            <div style={{ marginTop: '20px', textAlign: 'right' }}>
                <h3>Итого: {totalPrice} ₽</h3>
                <Link to="/delivery">
                    <button style={{ padding: '10px 20px', background: 'green', color: 'white', border: 'none', cursor: 'pointer' }}>
                        Оформить доставку
                    </button>
                </Link>
            </div>
        </div>
    );
};