import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import Header from './components/Header/Header';
import BookList from './components/BookList';
import BookDetail from './components/BookDetail';
import Login from './components/Login';
import axiosInstance from './api/axios';
import Filters from './components/Filters';

const Home = ({ searchQuery, onAddToCart }) => {
    const [filters, setFilters] = useState({
        genre: '',
        priceRange: [0, 100],
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

const App = () => {
    const [selectedBook, setSelectedBook] = useState(null);
    const [selectedGenre, setSelectedGenre] = useState(null);

    const handleSelectBook = (book) => {
        setSelectedBook(book);
    };

    const handleSelectGenre = (genreId) => {
        setSelectedGenre(genreId);
        setSelectedBook(null);
    };

    return (
        <Router>
            <Header onSelectBook={handleSelectBook} onSelectGenre={handleSelectGenre} />
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/book/:id" element={<BookDetail />} />
                <Route path="/login" element={<Login />} />
            </Routes>
        </Router>
    );
};

export default App;
