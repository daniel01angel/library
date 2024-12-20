// src/components/header/SearchBar.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../../styles/Header/SearchBar.css';

const SearchBar = ({ onSelectBook }) => {
    const [isSearchVisible, setIsSearchVisible] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');
    const [searchResults, setSearchResults] = useState([]);
    const [isSearching, setIsSearching] = useState(false);

    const toggleSearch = () => {
        setIsSearchVisible(!isSearchVisible);
        setSearchTerm('');
        setSearchResults([]);
    };

    const handleSearchChange = (e) => {
        setSearchTerm(e.target.value);
    };

    const handleSelectBookFromResults = (book) => {
        onSelectBook(book); // Llama a onSelectBook desde los resultados de búsqueda
        setIsSearchVisible(false); // Oculta la barra de búsqueda
    };

    useEffect(() => {
        const fetchSearchResults = async () => {
            if (searchTerm) {
                setIsSearching(true);
                try {
                    // Verifica si el término de búsqueda es un ISBN (10 o 13 dígitos)
                    const isISBN = /^\d{10}(\d{3})?$/.test(searchTerm);

                    // Define el parámetro de búsqueda según sea ISBN o título
                    const queryParam = isISBN ? `isbn=${searchTerm}` : `title=${searchTerm}`;
                    const response = await axios.get(`http://localhost:8080/library/book/search?${queryParam}`);
                    setSearchResults(response.data);
                } catch (error) {
                    console.error("Error al obtener resultados de búsqueda:", error);
                    setSearchResults([]);
                } finally {
                    setIsSearching(false);
                }
            } else {
                setSearchResults([]);
            }
        };

        const delayDebounceFn = setTimeout(() => {
            fetchSearchResults();
        }, 500);

        return () => clearTimeout(delayDebounceFn);
    }, [searchTerm]);

    return (
        <div className="search-container">
            <button className="search-button" onClick={toggleSearch}>
                <i className="fas fa-search"></i>
            </button>
            <div className={`search-bar ${isSearchVisible ? 'visible' : 'hidden'}`}>
                <input
                    type="text"
                    placeholder="Search by title or ISBN..."
                    value={searchTerm}
                    onChange={handleSearchChange}
                    autoFocus
                    className="search-input"
                />
                <ul className="search-results">
                    {isSearching ? (
                        <li>Loading...</li>
                    ) : searchResults.length > 0 ? (
                        searchResults.map((book) => (
                            <li
                                key={book.bookID}
                                className="search-result-item"
                                onClick={() => handleSelectBookFromResults(book)}
                            >
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
    );
};

export default SearchBar;
