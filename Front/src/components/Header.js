// src/components/Header.js
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Header.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch, faShoppingCart } from '@fortawesome/free-solid-svg-icons';

const Header = ({ onSearch }) => {
    const [searchTerm, setSearchTerm] = useState('');  // Controla el término de búsqueda
    const [isSearchVisible, setSearchVisible] = useState(false);  // Controla la visibilidad de la barra de búsqueda

    // Maneja los cambios en el input de búsqueda
    const handleInputChange = (event) => {
        setSearchTerm(event.target.value);
    };

    // Maneja el envío del formulario de búsqueda
    const handleSubmit = (event) => {
        event.preventDefault();
        onSearch(searchTerm);
    };

    // Alterna la visibilidad de la barra de búsqueda
    const toggleSearch = () => {
        setSearchVisible(!isSearchVisible);
    };

    return (
        <header className="header">
            <div className="header-content">
                <h1 className="logo">
                    <Link to="/">Library App</Link> {/* Enlace al inicio */}
                </h1>

                {/* Barra de navegación */}
                <nav className="nav">
                    <ul>
                        <li>
                            <Link to="/">Inicio</Link>
                        </li>
                        <li>
                            <Link to="/cart">
                                <FontAwesomeIcon icon={faShoppingCart} />
                                Carrito
                            </Link>
                        </li>
                    </ul>
                </nav>

                {/* Contenedor de búsqueda */}
                <div className="search-container">
                    <button className="search-button" onClick={toggleSearch}>
                        <FontAwesomeIcon icon={faSearch} />
                    </button>

                    {/* Barra de búsqueda expandible */}
                    {isSearchVisible && (
                        <form onSubmit={handleSubmit} className="search-form">
                            <input
                                type="text"
                                value={searchTerm}
                                onChange={handleInputChange}
                                placeholder="Buscar libros..."
                                className="search-input"
                                autoFocus  // Para que el campo reciba el foco al abrirlo
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