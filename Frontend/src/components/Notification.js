// src/components/Notification.js
import React, { useEffect } from 'react';
import './Notification.css';

const Notification = ({ message, show, onClose }) => {
    useEffect(() => {
        if (show) {
            const timer = setTimeout(() => {
                onClose();
            }, 3000); // Ocultar la notificación después de 3 segundos
            return () => clearTimeout(timer);
        }
    }, [show, onClose]);

    if (!show) return null;

    return (
        <div className="notification">
            {message}
        </div>
    );
};

export default Notification;
