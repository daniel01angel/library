// src/components/BookList.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import '../styles/BookList.css';

const BookList = () => {
    const [books, setBooks] = useState([]);
    const { genreId } = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        const fetchBooks = async () => {
            try {
                const response = await axios.get('http://localhost:8080/library/book/search?title=');
                const allBooks = response.data;
                // Asegúrate de que genreId esté en el formato numérico para comparar correctamente
                const filteredBooks = genreId
                    ? allBooks.filter(book => book.genreId === parseInt(genreId))
                    : allBooks;
                setBooks(filteredBooks);
            } catch (error) {
                console.error("Error fetching books:", error);
            }
        };
        fetchBooks();
    }, [genreId]);

    const handleBookClick = (bookId) => {
        navigate(`/book/${bookId}`);
    };

    return (
        <div className="book-list">
            {books.length > 0 ? (
                books.map((book) => (
                    <div
                        key={book.bookID}
                        className="book-card"
                        onClick={() => handleBookClick(book.bookID)}
                    >
                        <img src={book.imageURL} alt={book.title} className="book-image" />
                        <div className="book-info">
                            <h2 className="book-title">{book.title}</h2>
                            <p><strong>Publish Date:</strong> {book.publishDate || "N/A"}</p>
                            <p><strong>ISBN:</strong> {book.isbn}</p>
                            <p><strong>Stock:</strong> {book.stock}</p>
                        </div>
                    </div>
                ))
            ) : (
                <p>No books found for this genre.</p>
            )}
        </div>
    );
};

export default BookList;
