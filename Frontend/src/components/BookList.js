// src/components/BookList.js
import React, { useEffect, useState } from 'react';
import axiosInstance from '../api/axios';

const BookList = () => {
    const [books, setBooks] = useState([]);

    useEffect(() => {
        const fetchBooks = async () => {
            try {
                const response = await axiosInstance.get('/library/book/search');
                setBooks(response.data);
            } catch (error) {
                console.error('Error fetching books:', error);
            }
        };

        fetchBooks();
    }, []);

    return (
        <section className="book-list">
            {books.map((book) => (
                <div key={book.isbn} className="book-item">
                    <img src={book.imageURL} alt={book.title} />
                    <p>{book.title}</p>
                    <span>${book.price}</span>
                    <div className="add-to-cart">Add to Cart</div>
                </div>
            ))}
        </section>
    );
};

export default BookList;
