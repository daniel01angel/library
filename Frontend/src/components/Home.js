// src/components/Home.js
import React, { useState, useEffect } from 'react';
import axiosInstance from '../api/axios';
import BookList from './BookList';
import Filters from './Filters';

const Home = ({ searchQuery, onAddToCart }) => {
    const [filters, setFilters] = useState({
        genre: '',
        priceRange: [0, 100],  // Asegúrate de que `priceRange` esté definido
        author: '',
        publicationDate: ''
    });

    const [books, setBooks] = useState([]);

    useEffect(() => {
        const fetchBooks = async () => {
            try {
                const response = await axiosInstance.get('/library/book/search', {
                    params: { title: searchQuery || '' },
                });
                setBooks(response.data);
            } catch (error) {
                console.error('Error fetching books:', error);
            }
        };

        fetchBooks();
    }, [searchQuery]);

    const handleFilterChange = (filterType, value) => {
        setFilters({ ...filters, [filterType]: value });
    };

    return (
        <div>
            <Filters onFilterChange={handleFilterChange} filters={filters} />
            <BookList books={books} onAddToCart={onAddToCart} />
        </div>
    );
};

export default Home;
