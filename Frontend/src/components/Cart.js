// src/components/Cart.js
import React from 'react';
import axiosInstance from '../api/axios';

const Cart = ({ cart, setCart }) => {
    const total = cart.reduce((acc, book) => acc + book.price, 0);

    const handleConfirmPurchase = async () => {
        const booksToBuy = cart.reduce((acc, book) => {
            acc[book.bookId] = 1;
            return acc;
        }, {});

        try {
            await axiosInstance.post('/library/book/buy', booksToBuy);
            setCart([]); // Vacía el carrito después de la compra
            alert('Compra realizada con éxito');
        } catch (error) {
            console.error('Error confirming purchase:', error);
            alert('Error al realizar la compra');
        }
    };

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
                        <button onClick={handleConfirmPurchase}>
                            Confirmar compra
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Cart;
