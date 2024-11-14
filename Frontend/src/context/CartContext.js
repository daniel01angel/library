// src/context/CartContext.js
import React, { createContext, useState } from 'react';

export const CartContext = createContext();

const CartProvider = ({ children }) => {
    const [cart, setCart] = useState([]); // Estado inicial del carrito

    const addToCart = (book) => {
        setCart((prevCart) => [...prevCart, book]); // Agregar libro al estado del carrito
        console.log("Libro agregado al carrito:", book); // Depuración
        console.log("Estado del carrito después de agregar:", cart); // Depuración
    };

    const clearCart = () => {
        setCart([]); // Vaciar carrito
    };

    // Contador de la cantidad de libros en el carrito
    const cartCount = cart.length;

    return (
        <CartContext.Provider value={{ cart, addToCart, clearCart, cartCount }}>
            {children}
        </CartContext.Provider>
    );
};

export default CartProvider;
