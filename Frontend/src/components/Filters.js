// src/components/Filters.js
import React from 'react';
import '../styles/Filters.css';

const Filters = ({ onFilterChange, filters }) => {
    return (
        <div className="filters-container">
            <label>
                Género:
                <select onChange={(e) => onFilterChange('genre', e.target.value)} value={filters.genre || ''}>
                    <option value="">Todos</option>
                    <option value="fiction">Ficción</option>
                    <option value="non-fiction">No Ficción</option>
                </select>
            </label>

            <label>
                Precio:
                <input
                    type="range"
                    min="0"
                    max="100"
                    value={filters.priceRange ? filters.priceRange[1] : 100}
                    onChange={(e) => onFilterChange('priceRange', [0, Number(e.target.value)])}
                />
                <span className="price-label">${filters.priceRange ? filters.priceRange[1] : 100}</span>
            </label>

            <label>
                Autor:
                <input
                    type="text"
                    placeholder="Autor"
                    onChange={(e) => onFilterChange('author', e.target.value)}
                    value={filters.author || ''}
                />
            </label>

            <label>
                Fecha de Publicación:
                <input
                    type="date"
                    onChange={(e) => onFilterChange('publicationDate', e.target.value)}
                    value={filters.publicationDate || ''}
                />
            </label>
        </div>
    );
};

export default Filters;