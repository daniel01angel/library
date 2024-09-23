// src/components/Cart.js
import React from 'react';
import './Cart.css';  // Asegúrate de importar los estilos para el carrito

const Cart = ({ cart }) => {
    const total = cart.reduce((acc, book) => acc + book.price, 0); // Calcula el total

    return (
        <div className="cart-container">
            <h2>Carrito de Compras</h2>
            {cart.length === 0 ? (
                <p>No hay libros en el carrito.</p>
            ) : (
                <div className="cart-items">
                    {cart.map((book, index) => (
                        <div key={index} className="cart-item">
                            <img src={book.image} alt={book.name} className="cart-image" />
                            <div className="cart-item-details">
                                <p className="book-name">{book.name}</p>
                                <p className="book-price">${book.price}</p>
                            </div>
                        </div>
                    ))}
                    <div className="cart-total">
                        <h3>Total: ${total}</h3>
                        <button className="confirm-button">Confirmar compra</button> {/* Botón para confirmar */}
                    </div>
                </div>
            )}
        </div>
    );
};

export default Cart;
