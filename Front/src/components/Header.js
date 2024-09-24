// src/components/Header.js
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Header.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch, faShoppingCart } from '@fortawesome/free-solid-svg-icons';

const Header = ({ onSearch, cartItemCount }) => {
    const [searchTerm, setSearchTerm] = useState('');
    const [isSearchVisible, setSearchVisible] = useState(false);

    const handleInputChange = (event) => {
        setSearchTerm(event.target.value);
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        onSearch(searchTerm);
    };

    const toggleSearch = () => {
        setSearchVisible(!isSearchVisible);
    };

    return (
        <header className="header">
            <div className="header-content">
                <h1 className="logo">
                    <Link to="/">Library App</Link>
                </h1>

                <nav className="nav">
                    <ul>
                        <li>
                            <Link to="/">Inicio</Link>
                        </li>
                        <li>
                            <Link to="/cart">
                                <FontAwesomeIcon icon={faShoppingCart} />
                                Carrito
                                {/* Muestra el número de libros si es mayor a 0 */}
                                {cartItemCount > 0 && (
                                    <span className="cart-count">{cartItemCount}</span>
                                )}
                            </Link>
                        </li>
                    </ul>
                </nav>

                <div className="search-container">
                    <button className="search-button" onClick={toggleSearch}>
                        <FontAwesomeIcon icon={faSearch} />
                    </button>

                    {isSearchVisible && (
                        <form onSubmit={handleSubmit} className="search-form">
                            <input
                                type="text"
                                value={searchTerm}
                                onChange={handleInputChange}
                                placeholder="Buscar libros..."
                                className="search-input"
                                autoFocus
                            />
                            <button type="submit" className="submit-button">
                                Buscar
                            </button>
                        </form>
                    )}
                </div>
            </div>
        </header>
    );
};

export default Header;
