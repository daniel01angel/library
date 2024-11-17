// src/context/CartContext.js
import React, { createContext, useState } from 'react';

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
    const [cart, setCart] = useState([]);

    const addToCart = (newItem) => {
        setCart((prevCart) => {
            const existingItemIndex = prevCart.findIndex(
                (item) => item.id === newItem.id
            );

            if (existingItemIndex !== -1) {
                // Actualizar cantidad si el artículo ya existe
                const updatedCart = [...prevCart];
                updatedCart[existingItemIndex].quantity += newItem.quantity;
                return updatedCart;
            } else {
                // Agregar nuevo artículo al carrito
                return [...prevCart, newItem];
            }
        });
    };

    const clearCart = () => {
        setCart([]);
    };

    return (
        <CartContext.Provider value={{ cart, addToCart, clearCart }}>
            {children}
        </CartContext.Provider>
    );
};

export default CartProvider;
