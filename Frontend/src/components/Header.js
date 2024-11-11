import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../styles/Header.css';

const Header = () => {
    const [isSearchVisible, setIsSearchVisible] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');
    const [searchResults, setSearchResults] = useState([]);
    const [isSearching, setIsSearching] = useState(false); // Estado para controlar el proceso de búsqueda

    const toggleSearch = () => {
        setIsSearchVisible(!isSearchVisible);
        setSearchTerm('');
        setSearchResults([]);
    };

    const handleSearchChange = (e) => {
        setSearchTerm(e.target.value);
    };

    useEffect(() => {
        const fetchSearchResults = async () => {
            if (searchTerm) {
                setIsSearching(true); // Activar estado de búsqueda
                try {
                    const response = await axios.get(`http://localhost:8080/library/book/search?title=${searchTerm}`);
                    console.log("Datos recibidos de la API:", response.data);
                    setSearchResults(response.data);
                } catch (error) {
                    console.error("Error al obtener resultados de búsqueda:", error);
                    setSearchResults([]);
                } finally {
                    setIsSearching(false); // Desactivar estado de búsqueda
                }
            } else {
                setSearchResults([]);
            }
        };

        // Usamos debounce: la API se llama después de 500 ms sin escribir
        const delayDebounceFn = setTimeout(() => {
            fetchSearchResults();
        }, 500);

        return () => clearTimeout(delayDebounceFn);
    }, [searchTerm]);

    return (
        <header className="header">
            <div className="logo-container">
                <img src="https://img.icons8.com/ios-filled/50/000000/book.png" alt="Library Logo" className="logo-icon" />
                <h1 className="site-title">Library</h1>
            </div>
            <div className="search-container">
                <button className="search-button" onClick={toggleSearch}>
                    <i className="fas fa-search"></i>
                </button>
                <div className={`search-bar ${isSearchVisible ? 'visible' : 'hidden'}`}>
                    <input
                        type="text"
                        placeholder="Search Books..."
                        value={searchTerm}
                        onChange={handleSearchChange}
                        autoFocus
                        className="search-input"
                    />
                    <ul className="search-results">
                        {isSearching ? (
                            <li>Loading...</li> // Mensaje mientras carga
                        ) : searchResults.length > 0 ? (
                            searchResults.map((book) => (
                                <li key={book.bookID} className="search-result-item">
                                    <img src={book.imageURL} alt={book.title} className="result-image" />
                                    <span>{book.title}</span>
                                </li>
                            ))
                        ) : (
                            searchTerm && <li>No results found</li>
                        )}
                    </ul>
                </div>
            </div>
        </header>
    );
};

export default Header;