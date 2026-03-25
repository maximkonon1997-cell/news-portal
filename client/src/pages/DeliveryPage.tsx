import React, { useState, useEffect } from 'react';
import { useCart } from '../contexts/CartContext';
import { useNavigate } from 'react-router-dom';

export const DeliveryPage: React.FC = () => {
    const { cartItems, totalPrice, clearCart } = useCart();
    const navigate = useNavigate();

    // Если корзина пуста, редиректим на главную
    useEffect(() => {
        if (cartItems.length === 0) {
            navigate('/');
        }
    }, [cartItems, navigate]);

    // Стейт формы
    const [formData, setFormData] = useState({
        address: '',
        phone: '',
        email: '',
        payment: 'card'
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        
        // Тут можно добавить валидацию
        if (!formData.address || !formData.phone) {
            alert('Заполните все поля!');
            return;
        }

        try {
            // Вызываем метод очистки корзины (симуляция заказа)
            await clearCart(); 
            
            alert(`Заказ оформлен! Сумма: ${totalPrice} ₽\nЖдите курьера по адресу: ${formData.address}`);
            navigate('/'); // Возвращаем на главную
        } catch (error) {
            alert('Ошибка при оформлении заказа');
        }
    };

    return (
        <div style={{ padding: '20px', maxWidth: '600px', margin: '0 auto' }}>
            <h2>Оформление доставки</h2>
            
            <div style={{ marginBottom: 20, padding: 10, background: '#f9f9f9', borderRadius: 4 }}>
                <strong>Товаров в заказе:</strong> {cartItems.length} шт.<br/>
                <strong>К оплате:</strong> {totalPrice} ₽
            </div>

            {/* Атрибут data-delivery по ТЗ */}
            <form onSubmit={handleSubmit} data-delivery style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
                
                <div>
                    <label>Адрес доставки</label>
                    <input 
                        name="address" 
                        value={formData.address} 
                        onChange={handleChange} 
                        placeholder="Ул. Пушкина, д. Колотушкина" 
                        required 
                        style={{ width: '100%', padding: 8, marginTop: 5 }}
                    />
                </div>

                <div>
                    <label>Телефон</label>
                    <input 
                        name="phone" 
                        value={formData.phone} 
                        onChange={handleChange} 
                        placeholder="+7 (999) 000-00-00" 
                        required 
                        style={{ width: '100%', padding: 8, marginTop: 5 }}
                    />
                </div>

                <div>
                    <label>Email</label>
                    <input 
                        name="email" 
                        type="email"
                        value={formData.email} 
                        onChange={handleChange} 
                        placeholder="example@mail.com" 
                        required 
                        style={{ width: '100%', padding: 8, marginTop: 5 }}
                    />
                </div>

                <div>
                    <label>Способ оплаты</label>
                    <select 
                        name="payment" 
                        value={formData.payment} 
                        onChange={handleChange}
                        style={{ width: '100%', padding: 8, marginTop: 5 }}
                    >
                        <option value="card">Картой онлайн</option>
                        <option value="cash">Наличными курьеру</option>
                    </select>
                </div>

                <button 
                    type="submit" 
                    style={{ 
                        padding: '12px', 
                        background: '#28a745', 
                        color: 'white', 
                        border: 'none', 
                        borderRadius: '4px', 
                        fontSize: '16px',
                        cursor: 'pointer',
                        marginTop: 10
                    }}
                >
                    Подтвердить и оплатить
                </button>
            </form>
        </div>
    );
};