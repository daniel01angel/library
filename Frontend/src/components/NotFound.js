// src/components/NotFound.js
import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/NotFound.css';

const NotFound = () => {
    const navigate = useNavigate();

    const goToHome = () => {
        navigate('/');
    };

    return (
        <div className="not-found-container">
            <h1>Error 404</h1>
            <p>La página que buscas no existe.</p>
            <button onClick={goToHome} className="go-home-button">Volver a la página principal</button>
        </div>
    );
};

export default NotFound;
