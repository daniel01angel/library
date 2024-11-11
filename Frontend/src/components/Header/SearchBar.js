// src/components/SearchBar.js
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

    useEffect(() => {
        const fetchSearchResults = async () => {
            if (searchTerm) {
                setIsSearching(true);
                try {
                    const response = await axios.get(`http://localhost:8080/library/book/search?title=${searchTerm}`);
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
                    placeholder="Search Books..."
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
                                onClick={() => onSelectBook(book)}
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
