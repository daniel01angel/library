// src/components/Cart.js
import React, { useContext, useState } from 'react';
import { CartContext } from '../context/CartContext';
import Notification from './Notification';
import { useTranslation } from 'react-i18next';
import '../styles/Cart.css';

const Cart = () => {
    const { cart, clearCart } = useContext(CartContext);
    const { t } = useTranslation();
    const [showNotification, setShowNotification] = useState(false);

    const total = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);

    // Manejar compra y mostrar notificación
    const handlePurchase = async () => {
        // Construir el objeto booksToBuy
        const booksToBuy = {};
        cart.forEach((item) => {
            const bookId = item.id || item.bookID;
            if (bookId !== undefined) {
                booksToBuy[bookId] = item.quantity;
            } else {
                console.error("Item sin ID:", item);
            }
        });

        console.log("booksToBuy:", booksToBuy); // Log para verificar

        try {
            const response = await fetch('http://localhost:8080/library/book/buy', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(booksToBuy),
            });

            if (response.ok) {
                // Compra exitosa
                clearCart();
                setShowNotification(true);

                setTimeout(() => {
                    setShowNotification(false);
                }, 3000);
            } else {
                // Manejar errores
                console.error('Compra fallida:', response.statusText);
            }
        } catch (error) {
            console.error('Error durante la compra:', error);
        }
    };

    return (
        <div className="cart-container">
            <h2>{t('Shopping Cart')}</h2>
            {cart.length === 0 ? (
                <p>{t('No items in the cart')}</p>
            ) : (
                <div className="cart-items">
                    {cart.map((item, index) => (
                        <div key={index} className="cart-item">
                            <img src={item.imageURL} alt={item.title} className="cart-image" />
                            <div className="cart-item-details">
                                <p className="book-name">{item.title}</p>
                                <p className="book-price">
                                    {item.quantity} x ${item.price} = $
                                    {(item.price * item.quantity).toFixed(2)}
                                </p>
                            </div>
                        </div>
                    ))}
                    <div className="cart-total">
                        <h3>{t('Total')}: ${total.toFixed(2)}</h3>
                        <div className="cart-buttons">
                            <button className="buy-button" onClick={handlePurchase}>{t('Purchase')}</button>
                            <button className="clear-cart-button" onClick={clearCart}>{t('Clear Cart')}</button>
                        </div>
                    </div>
                </div>
            )}

            {/* Notificación de compra */}
            <Notification
                message={t('Purchase successful')}
                show={showNotification}
                onClose={() => setShowNotification(false)}
            />
        </div>
    );
};

export default Cart;
