// src/components/Header.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import HeaderLogo from './HeaderLogo';
import GenreButtons from './GenreButtons';
import SearchBar from './SearchBar';
import '../../styles/Header/Header.css';

const Header = ({ onSelectBook, onSelectGenre }) => {
    const [genres, setGenres] = useState([]);

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
            <GenreButtons genres={genres} onSelectGenre={onSelectGenre} />
            <SearchBar onSelectBook={onSelectBook} />
        </header>
    );
};

export default Header;
