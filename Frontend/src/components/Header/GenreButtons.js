// src/components/GenreButtons.js
import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../../styles/Header/GenreButtons.css';

const GenreButtons = ({ genres }) => {
    const navigate = useNavigate();

    const handleGenreClick = (genreId) => {
        navigate(`/genre/${genreId}`);
    };

    return (
        <div className="genre-container">
            {genres.map((genre) => (
                <button
                    key={genre.genreId}
                    className="genre-button"
                    onClick={() => handleGenreClick(genre.genreId)}
                >
                    {genre.genreName}
                </button>
            ))}
        </div>
    );
};

export default GenreButtons;
