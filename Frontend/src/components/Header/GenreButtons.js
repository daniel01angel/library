// src/components/GenreButtons.js
import React from 'react';
import '../../styles/Header/GenreButtons.css';

const GenreButtons = ({ genres, onSelectGenre }) => {
    return (
        <div className="genre-container">
            {genres.map((genre) => (
                <button
                    key={genre.genreId}
                    className="genre-button"
                    onClick={() => onSelectGenre(genre.genreId)}
                >
                    {genre.genreName}
                </button>
            ))}
        </div>
    );
};

export default GenreButtons;