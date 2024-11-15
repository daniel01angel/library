// src/components/Breadcrumb.js
import React from 'react';
import { Link, useLocation } from 'react-router-dom';

const Breadcrumb = () => {
    const location = useLocation();

    // Convierte la ruta en un array de partes para crear el breadcrumb
    const pathnames = location.pathname.split('/').filter(x => x);

    return (
        <nav aria-label="breadcrumb" style={{ padding: '10px 20px', backgroundColor: '#f8f9fa', borderRadius: '5px' }}>
            <ol style={{ display: 'flex', listStyle: 'none', padding: 0, margin: 0 }}>
                <li>
                    <Link to="/" style={{ textDecoration: 'none', color: '#007bff' }}>Home</Link>
                    {pathnames.length > 0 && <span style={{ margin: '0 8px' }}> / </span>}
                </li>
                {pathnames.map((value, index) => {
                    const to = `/${pathnames.slice(0, index + 1).join('/')}`;

                    // Si es el último elemento del breadcrumb, no debe ser un enlace
                    return index === pathnames.length - 1 ? (
                        <li key={to} style={{ color: '#6c757d', textTransform: 'capitalize' }}>
                            {value.replace(/-/g, ' ')}
                        </li>
                    ) : (
                        <li key={to} style={{ textTransform: 'capitalize' }}>
                            <Link to={to} style={{ textDecoration: 'none', color: '#007bff' }}>
                                {value.replace(/-/g, ' ')}
                            </Link>
                            <span style={{ margin: '0 8px' }}> / </span>
                        </li>
                    );
                })}
            </ol>
        </nav>
    );
};

export default Breadcrumb;
