// src/components/Home.js
import React, { useState } from 'react';
import BookList from './BookList';
import Filters from './Filters';

const Home = ({ searchQuery, onAddToCart }) => {  // Asegúrate de recibir onAddToCart como prop
    const [filters, setFilters] = useState({
        genre: '',
        priceRange: [0, 100],
        author: '',
        publicationDate: ''
    });

    const handleFilterChange = (filterType, value) => {
        setFilters({ ...filters, [filterType]: value });
    };

    return (
        <div>
            <Filters onFilterChange={handleFilterChange} filters={filters} />
            <BookList searchQuery={searchQuery} filters={filters} onAddToCart={onAddToCart} />  {/* Pasando onAddToCart */}
        </div>
    );
};

export default Home;