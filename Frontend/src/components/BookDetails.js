// src/components/BookDetails.js
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axiosInstance from '../api/axios';

const BookDetails = () => {
    const { isbn } = useParams();
    const [book, setBook] = useState(null);

    useEffect(() => {
        const fetchBookDetails = async () => {
            try {
                const response = await axiosInstance.get(`/library/book/search`, { params: { isbn } });
                setBook(response.data[0]); // Suponiendo que devuelve una lista con un solo elemento
            } catch (error) {
                console.error('Error fetching book details:', error);
            }
        };

        fetchBookDetails();
    }, [isbn]);

    if (!book) return <div>Libro no encontrado.</div>;

    return (
        <div>
            <h2>{book.title}</h2>
            <img src={book.imageURL} alt={book.title} />
            <p>Autor: {book.author}</p>
            <p>Género: {book.genre}</p>
            <p>Precio: ${book.price}</p>
            <p>Fecha de Publicación: {book.publicationDate}</p>
        </div>
    );
};

export default BookDetails;