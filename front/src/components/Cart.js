// src/components/Cart.js
import React, { useState } from 'react';
import './Cart.css';  // Asegúrate de importar los estilos para el carrito
import Modal from './Modal';  // Importa el componente Modal

const Cart = ({ cart, setCart }) => {
    const [purchaseConfirmed, setPurchaseConfirmed] = useState(false);  // Estado para la confirmación de compra
    const [showModal, setShowModal] = useState(false); // Estado para mostrar el modal

    const total = cart.reduce((acc, book) => acc + book.price, 0); // Calcula el total

    const handleConfirmPurchase = () => {
        setPurchaseConfirmed(true);  // Cambia el estado a "compra confirmada"
        setShowModal(true);  // Muestra el modal
        setCart([]);  // Vacía el carrito después de confirmar la compra
    };

    const closeModal = () => {
        setShowModal(false); // Oculta el modal
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
                            <img src={book.image} alt={book.name} className="cart-image" />
                            <div className="cart-item-details">
                                <p className="book-name">{book.name}</p>
                                <p className="book-price">${book.price}</p>
                            </div>
                        </div>
                    ))}
                    <div className="cart-total">
                        <h3>Total: ${total}</h3>
                        <button className="confirm-button" onClick={handleConfirmPurchase}>
                            Confirmar compra
                        </button>
                    </div>
                </div>
            )}

            {/* Modal de confirmación de compra */}
            <Modal show={showModal} onClose={closeModal}>
                <h3>¡Compra confirmada!</h3>
                <p>Gracias por tu compra. Te enviaremos un correo con los detalles.</p>
            </Modal>
        </div>
    );
};

export default Cart;
