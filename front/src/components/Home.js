// src/components/Home.js
import React, { useState } from 'react';
import BookList from './BookList';
import SearchBar from './SearchBar';
import Filters from './Filters';

const Home = () => {
    const [searchQuery, setSearchQuery] = useState('');
    const [filters, setFilters] = useState({
        genre: '',
        priceRange: [0, 100],
        author: '',
        publicationDate: ''
    });

    const handleSearch = (query) => {
        setSearchQuery(query);
    };

    const handleFilterChange = (filterType, value) => {
        setFilters({ ...filters, [filterType]: value });
    };

    return (
        <div>
            <SearchBar onSearch={handleSearch} />
            <Filters onFilterChange={handleFilterChange} filters={filters} />
            <BookList searchQuery={searchQuery} filters={filters} />
        </div>
    );
};

export default Home;
