// client/src/components/Header.tsx
import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import './Header.css'; // Создадим этот файл ниже

export const Header: React.FC = () => {
    const { user, logout } = useAuth();

    return (
        <header className="header">
            <div className="container header-content">
                <Link to="/" className="logo">
                    🥑 FreshMarket
                </Link>

                <nav className="nav">
                    {user ? (
                        <>
                            <span className="user-name">👤 {user.name}</span>
                            <Link to="/cart" className="nav-link cart-link">
                                🛒 Корзина 
                                {user.cart.length > 0 && <span className="badge">{user.cart.reduce((a,c) => a + c.count, 0)}</span>}
                            </Link>
                            <button onClick={logout} className="logout-btn">Выйти</button>
                        </>
                    ) : (
                        <Link to="/login" className="btn-primary">Войти</Link>
                    )}
                </nav>
            </div>
        </header>
    );
};