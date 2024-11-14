import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import Header from './components/Header/Header';
import BookList from './components/BookList';
import BookDetail from './components/BookDetail';
import Login from './components/Login';

const App = () => {
    const [selectedBook, setSelectedBook] = useState(null);
    const [selectedGenre, setSelectedGenre] = useState(null);
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    const handleSelectBook = (book) => {
        setSelectedBook(book);
    };

    const handleSelectGenre = (genreId) => {
        setSelectedGenre(genreId);
        setSelectedBook(null);
    };

    return (
        <Router>
            <Header onSelectBook={handleSelectBook} onSelectGenre={handleSelectGenre} isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />
            <Routes>
                <Route path="/" element={<BookList selectedGenre={selectedGenre} />} />
                <Route path="/book/:id" element={<BookDetail />} />
                <Route path="/login" element={<Login setIsLoggedIn={setIsLoggedIn} />} />
            </Routes>
        </Router>
    );
};

export default App;
