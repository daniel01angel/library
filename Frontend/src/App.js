import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import Header from './components/Header/Header';
import BookList from './components/BookList';
import BookDetail from './components/BookDetail';
import Login from './components/Login';
import CartProvider from './context/CartContext'; // Importa el proveedor de contexto del carrito
import Cart from './components/Cart'; // Asegúrate de que la ruta sea correcta


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

        <CartProvider> {/* Envuelve toda la aplicación con CartProvider */}
            <Router>
                <Header onSelectBook={handleSelectBook} onSelectGenre={handleSelectGenre} />
                <Routes>
                    <Route path="/" element={<BookList selectedGenre={selectedGenre} />} />
                    <Route path="/book/:id" element={<BookDetail />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/cart" element={<Cart />} />
                </Routes>
            </Router>
        </CartProvider>
    );
};

export default App;
