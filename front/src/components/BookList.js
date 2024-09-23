// src/components/BookList.js
import React from 'react';
import { Link } from 'react-router-dom';

const books = [
    // Datos de libros simulados para fines de ejemplo.
    { isbn: '9780143127741', name: 'Sapiens', author: 'Yuval Noah Harari', genre: 'non-fiction', price: 50, publicationDate: '2015-01-01' },
    { isbn: '9780143127895', name: 'The Diary of a Young Girl', author: 'Anne Frank', genre: 'non-fiction', price: 100, publicationDate: '1947-01-01' },
    // Agrega más libros según sea necesario
];

const BookList = ({ searchQuery, filters }) => {
    const filteredBooks = books.filter((book) => {
        const matchesSearch = book.name.toLowerCase().includes(searchQuery.toLowerCase()) || book.isbn.includes(searchQuery);
        const matchesGenre = filters.genre === '' || book.genre === filters.genre;
        const matchesPrice = book.price >= filters.priceRange[0] && book.price <= filters.priceRange[1];
        const matchesAuthor = filters.author === '' || book.author.toLowerCase().includes(filters.author.toLowerCase());
        const matchesDate = filters.publicationDate === '' || book.publicationDate === filters.publicationDate;

        return matchesSearch && matchesGenre && matchesPrice && matchesAuthor && matchesDate;
    });

    return (
        <div>
            {filteredBooks.map((book) => (
                <div key={book.isbn}>
                    <Link to={`/book/${book.isbn}`}>
                        <h3>{book.name}</h3>
                    </Link>
                    <p>Autor: {book.author}</p>
                    <p>Precio: ${book.price}</p>
                </div>
            ))}
        </div>
    );
};

export default BookList;
