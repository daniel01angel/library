// src/components/SearchBar.js
import React, { useState } from 'react';

const SearchBar = ({ onSearch }) => {
    const [query, setQuery] = useState('');

    const handleSearch = (e) => {
        e.preventDefault();
        onSearch(query);
    };

    return (
        <form onSubmit={handleSearch}>
            <input
                type="text"
                placeholder="Buscar por nombre o ISBN"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
            />
            <button type="submit">Buscar</button>
        </form>
    );
};

export default SearchBar;
