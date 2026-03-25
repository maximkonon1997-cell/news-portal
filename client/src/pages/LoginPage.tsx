import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';

export const LoginPage: React.FC = () => {
    const [isLogin, setIsLogin] = useState(true);
    const { login, register } = useAuth();
    const navigate = useNavigate();

    // Поля формы
    const [formData, setFormData] = useState({
        login: '', password: '', name: '', email: '', phone: ''
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            if (isLogin) {
                await login({ login: formData.login, password: formData.password });
            } else {
                await register(formData);
            }
            navigate('/'); // После успеха на главную
        } catch (error) {
            alert('Ошибка! Проверьте данные.');
        }
    };

     return (
        <div style={{ maxWidth: '400px', margin: '50px auto', padding: '20px', border: '1px solid #ccc' }}>
            <h2>{isLogin ? 'Вход' : 'Регистрация'}</h2>
            
            <form onSubmit={handleSubmit} data-registration={!isLogin ? "true" : undefined}>
                {!isLogin && (
                    <>
                        {/* Убрали block="true" */}
                        <input 
                            name="name" 
                            placeholder="Имя" 
                            onChange={handleChange} 
                            required 
                            style={{marginBottom: 10, width: '100%'}} 
                        />
                        <input 
                            name="email" 
                            placeholder="Email" 
                            onChange={handleChange} 
                            required 
                            style={{marginBottom: 10, width: '100%'}} 
                        />
                        <input 
                            name="phone" 
                            placeholder="Телефон" 
                            onChange={handleChange} 
                            required 
                            style={{marginBottom: 10, width: '100%'}} 
                        />
                    </>
                )}
                
                <input 
                    name="login" 
                    placeholder="Логин" 
                    onChange={handleChange} 
                    required 
                    style={{marginBottom: 10, width: '100%'}} 
                />
                <input 
                    name="password" 
                    type="password" 
                    placeholder="Пароль" 
                    onChange={handleChange} 
                    required 
                    style={{marginBottom: 10, width: '100%'}} 
                />
                
                <button type="submit" style={{width: '100%', padding: 10}}>
                    {isLogin ? 'Войти' : 'Зарегистрироваться'}
                </button>
            </form>

            <p style={{marginTop: 10, textAlign: 'center', cursor: 'pointer', color: 'blue'}} onClick={() => setIsLogin(!isLogin)}>
                {isLogin ? 'Нет аккаунта? Регистрация' : 'Есть аккаунт? Вход'}
            </p>
        </div>
    );

};