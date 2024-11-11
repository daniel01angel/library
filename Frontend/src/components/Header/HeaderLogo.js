// src/components/HeaderLogo.js
import React from 'react';
import '../../styles/Header/HeaderLogo.css';

const HeaderLogo = () => {
    return (
        <div className="logo-container">
            <img src="https://img.icons8.com/ios-filled/50/000000/book.png" alt="Library Logo" className="logo-icon" />
            <h1 className="site-title">Library</h1>
        </div>
    );
};

export default HeaderLogo;
