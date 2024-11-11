import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../styles/BookList.css';

const BookList = ({ selectedBook, selectedGenre }) => {
    const [books, setBooks] = useState([]);

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

    const booksToDisplay = selectedBook ? [selectedBook] :
        selectedGenre ? books.filter(book => book.genreId === selectedGenre) :
            books;

    return (
        <div className="book-list">
            {booksToDisplay.map((book) => (
                <div key={book.bookID} className="book-card">
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