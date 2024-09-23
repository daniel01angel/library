// src/components/BookDetails.js
import React from 'react';
import { useParams } from 'react-router-dom';

const books = [
    // Los mismos datos simulados que en BookList.js
    { isbn: '9780143127741', name: 'Sapiens', author: 'Yuval Noah Harari', genre: 'non-fiction', price: 50, publicationDate: '2015-01-01' },
    { isbn: '9780143127895', name: 'The Diary of a Young Girl', author: 'Anne Frank', genre: 'non-fiction', price: 100, publicationDate: '1947-01-01' },
    // Más libros...
];

const BookDetails = () => {
    const { isbn } = useParams();
    const book = books.find((b) => b.isbn === isbn);

    if (!book) {
        return <div>Libro no encontrado.</div>;
    }

    return (
        <div>
            <h2>{book.name}</h2>
            <p>Autor: {book.author}</p>
            <p>Género: {book.genre}</p>
            <p>Precio: ${book.price}</p>
            <p>Fecha de Publicación: {book.publicationDate}</p>
        </div>
    );
};

export default BookDetails;
