// src/components/BookList.js
import React from 'react';
import { Link } from 'react-router-dom';
import './BookList.css';


// src/components/BookList.js
const books = [
    {
        isbn: '9780143127741',
        name: 'Sapiens',
        author: 'Yuval Noah Harari',
        genre: 'non-fiction',
        price: 50,
        publicationDate: '2015-01-01',
        image: 'https://www.ynharari.com/wp-content/uploads/2017/01/sapiens.png'  // URL de la imagen
    },
    {
        isbn: '9780143127895',
        name: 'The Diary of a Young Girl',
        author: 'Anne Frank',
        genre: 'non-fiction',
        price: 100,
        publicationDate: '1947-01-01',
        image: 'https://elephantbookstore.com/image/cache/catalog/products/non-fiction/anne-frank-l-the-diary-of-a-young-girl-950x950.png'  // URL de la imagen
    },
    // Más libros...
];

const BookList = ({ searchQuery, filters, onAddToCart }) => {
    const filteredBooks = books.filter((book) => {
        const matchesSearch = book.name.toLowerCase().includes(searchQuery.toLowerCase()) || book.isbn.includes(searchQuery);
        const matchesGenre = filters.genre === '' || book.genre === filters.genre;
        const matchesPrice = book.price >= filters.priceRange[0] && book.price <= filters.priceRange[1];
        const matchesAuthor = filters.author === '' || book.author.toLowerCase().includes(filters.author.toLowerCase());
        const matchesDate = filters.publicationDate === '' || book.publicationDate === filters.publicationDate;

        return matchesSearch && matchesGenre && matchesPrice && matchesAuthor && matchesDate;
    });

    return (
        <div className="book-list">
            {filteredBooks.map((book) => (
                <div key={book.isbn} className="book-item">
                    <Link to={`/book/${book.isbn}`}>
                        <img src={book.image} alt={book.name} className="book-image" />
                        <h3>{book.name}</h3>
                    </Link>
                    <p>Autor: {book.author}</p>
                    <p>Precio: ${book.price}</p>
                    <button onClick={() => onAddToCart(book)}>Añadir al carrito</button>  {/* Asegúrate de usar onAddToCart */}
                </div>
            ))}
        </div>
    );
};

export default BookList;