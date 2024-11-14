// src/components/BookList.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import '../styles/BookList.css';

const BookList = ({ selectedGenre }) => {
    const [books, setBooks] = useState([]);
    const navigate = useNavigate(); // Hook para navegar a la página de detalles
    useEffect(() => {
        const fetchBooks = async () => {
            try {
                const response = await axios.get('http://localhost:8080/library/book/search?title=');
                setBooks(response.data);
            } catch (error) {
                console.error("Error fetching books:", error);
            }
        };
        fetchBooks();
    }, []);

    const booksToDisplay = selectedGenre
        ? books.filter(book => book.genreId === selectedGenre)
        : books;

    const handleBookClick = (bookId) => {
        navigate(`/book/${bookId}`); // Navega a la página de detalles del libro
    };

    return (
        <div className="book-list">
            {booksToDisplay.map((book) => (
                <div
                    key={book.bookID}
                    className="book-card"
                    onClick={() => handleBookClick(book.bookID)} // Navega al hacer clic
                >
                    <img src={book.imageURL} alt={book.title} className="book-image" />
                    <div className="book-info">
                        <h2 className="book-title">{book.title}</h2>
                        <p><strong>Publish Date:</strong> {book.publishDate || "N/A"}</p>
                        <p><strong>ISBN:</strong> {book.isbn}</p>
                        <p><strong>Stock:</strong> {book.stock}</p>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default BookList;