// src/components/Modal.js
import React from 'react';
import '../styles/Modal.css';

const Modal = ({ show, onClose, children }) => {
    if (!show) {
        return null; // Si no está visible, no mostrar nada
    }

    return (
        <div className="modal-overlay">
            <div className="modal-content">
                <button onClick={onClose} className="modal-close">X</button>
                {children}
            </div>
        </div>
    );
};

export default Modal;
