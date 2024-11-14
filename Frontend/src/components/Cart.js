// src/components/Cart.js
import React, { useContext } from 'react';
import { CartContext } from '../context/CartContext';
import '../styles/Cart.css';

const Cart = () => {
    const { cart, clearCart } = useContext(CartContext); // Obtén el carrito del contexto

    console.log("Contenido del carrito en Cart.js:", cart); // Depuración

    const total = cart.reduce((acc, book) => acc + book.price, 0);

    return (
        <div className="cart-container">
            <h2>Carrito de Compras</h2>
            {cart.length === 0 ? (
                <p>No hay libros en el carrito.</p>
            ) : (
                <div className="cart-items">
                    {cart.map((book, index) => (
                        <div key={index} className="cart-item">
                            <img src={book.imageURL} alt={book.title} className="cart-image" />
                            <div className="cart-item-details">
                                <p className="book-name">{book.title}</p>
                                <p className="book-price">${book.price}</p>
                            </div>
                        </div>
                    ))}
                    <div className="cart-total">
                        <h3>Total: ${total}</h3>
                        <button onClick={clearCart}>Vaciar Carrito</button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Cart;
