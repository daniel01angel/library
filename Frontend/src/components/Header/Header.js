// src/components/Header/Header.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom'; // Importa Link
import HeaderLogo from './HeaderLogo';
import GenreButtons from './GenreButtons';
import SearchBar from './SearchBar';
import '../../styles/Header/Header.css';

const Header = ({ onSelectGenre }) => {
    const [genres, setGenres] = useState([]);
    const navigate = useNavigate();

    const handleSelectBook = (book) => {
        navigate(`/book/${book.bookID}`);
    };

    const handleSelectGenre = (genreId) => {
        onSelectGenre(genreId);
    };

    useEffect(() => {
        const fetchGenres = async () => {
            try {
                const response = await axios.get('http://localhost:8080/api/genres/all');
                setGenres(response.data);
            } catch (error) {
                console.error("Error fetching genres:", error);
            }
        };
        fetchGenres();
    }, []);

    return (
        <header className="header">
            <HeaderLogo />
            <GenreButtons genres={genres} onSelectGenre={handleSelectGenre} />
            <SearchBar onSelectBook={handleSelectBook} />

            {/* Icono de carrito que redirige a la página del carrito */}
            <Link to="/cart" className="cart-link">
                <i className="fa fa-shopping-cart"></i> Carrito
            </Link>
        </header>
    );
};

export default Header;
