// src/components/Filters.js
import React from 'react';
import './Filters.css'; // Importamos los estilos que acabamos de crear

const Filters = ({ onFilterChange, filters }) => {
    return (
        <div className="filters-container">
            <label>
                Género:
                <select onChange={(e) => onFilterChange('genre', e.target.value)}>
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
                    value={filters.priceRange[1]}
                    onChange={(e) => onFilterChange('priceRange', [0, e.target.value])}
                />
                <span className="price-label">${filters.priceRange[1]}</span>
            </label>

            <label>
                Autor:
                <input
                    type="text"
                    placeholder="Autor"
                    onChange={(e) => onFilterChange('author', e.target.value)}
                />
            </label>

            <label>
                Fecha de Publicación:
                <input
                    type="date"
                    onChange={(e) => onFilterChange('publicationDate', e.target.value)}
                />
            </label>
        </div>
    );
};

export default Filters;
