// src/App.js
import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import Header from './components/Header/Header';
import BookList from './components/BookList';
import BookDetail from './components/BookDetail';
import Login from './components/Login';
import Register from './components/Register';
import CartProvider from './context/CartContext'; // Importa el proveedor de contexto del carrito
import Cart from './components/Cart'; // Asegúrate de que la ruta sea correcta
import NotFound from './components/NotFound';
import Breadcrumb from './components/Breadcrumb'; // Importa el Breadcrumb
import { ToastContainer } from 'react-toastify'; // Importa ToastContainer
import 'react-toastify/dist/ReactToastify.css'; // Importa los estilos de Toastify

const App = () => {
    const [selectedBook, setSelectedBook] = useState(null);
    const [selectedGenre, setSelectedGenre] = useState(null);
    const [isLoggedIn, setIsLoggedIn] = useState(false); // Estado de autenticación

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
                {/* Añade el ToastContainer aquí */}
                <ToastContainer 
                    position="top-center"
                    autoClose={5000}
                />
                <Header 
                    onSelectBook={handleSelectBook} 
                    onSelectGenre={handleSelectGenre} 
                    isLoggedIn={isLoggedIn} // Pasar isLoggedIn
                    setIsLoggedIn={setIsLoggedIn} // Pasar setIsLoggedIn para poder cambiarlo
                />
                <div style={{ padding: '20px' }}>
                    <Breadcrumb /> {/* Añade el Breadcrumb aquí */}
                    <Routes>
                        <Route path="/" element={<BookList />} />
                        <Route path="/book/:id" element={<BookDetail />} />
                        <Route path="/login" element={<Login setIsLoggedIn={setIsLoggedIn} />} />
                        <Route path="/register" element={<Register />} /> {/* Nueva ruta para el registro */}
                        <Route path="/cart" element={<Cart />} />
                        <Route path="/genre/:genreId" element={<BookList />} />
                        <Route path="*" element={<NotFound />} />
                    </Routes>
                </div>
            </Router>
        </CartProvider>
    );
};

export default App;
