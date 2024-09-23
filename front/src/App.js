// src/App.js
import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './components/Home';
import BookDetails from './components/BookDetails';
import Cart from './components/Cart';
import Header from './components/Header';

function App() {
    const [searchQuery, setSearchQuery] = useState('');
    const [cart, setCart] = useState([]); // Estado del carrito
    const [addedToCartMessage, setAddedToCartMessage] = useState(''); // Mensaje de confirmación

    const handleSearch = (query) => {
        setSearchQuery(query);
    };

    const handleAddToCart = (book) => {
        console.log('Añadido al carrito:', book);
        setCart((prevCart) => [...prevCart, book]);

        // Mostrar el mensaje de confirmación
        setAddedToCartMessage(`¡${book.name} añadido al carrito!`);

        // Ocultar el mensaje después de 2 segundos
        setTimeout(() => {
            setAddedToCartMessage('');
        }, 2000);
    };

    return (
        <Router>
            <Header onSearch={handleSearch} />
            <div style={{ marginTop: '80px' }}>
                <Routes>
                    <Route
                        path="/"
                        element={<Home searchQuery={searchQuery} onAddToCart={handleAddToCart} />}
                    />
                    <Route path="/book/:isbn" element={<BookDetails />} />
                    <Route path="/cart" element={<Cart cart={cart} />} />
                </Routes>

                {/* Mostrar el mensaje de confirmación si existe */}
                {addedToCartMessage && (
                    <div className="cart-message">
                        <div className="cart-message-icon">✓</div> {/* Ícono de confirmación */}
                        {addedToCartMessage}
                    </div>
                )}
            </div>
        </Router>
    );
}

export default App;