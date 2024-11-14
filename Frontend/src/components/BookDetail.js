// src/components/BookDetail.js
import React, { useEffect, useState, useContext } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { CartContext } from '../context/CartContext'; // Importa el contexto del carrito
import '../styles/BookDetail.css';

const BookDetail = () => {
    const { id } = useParams();
    const { addToCart } = useContext(CartContext); // Usa el contexto para obtener la función addToCart
    const [book, setBook] = useState(null);
    const [author, setAuthor] = useState(null);
    const [publisher, setPublisher] = useState(null);
    const [reviews, setReviews] = useState([]);

    useEffect(() => {
        const fetchBookDetails = async () => {
            try {
                // Obtener los datos del libro
                const bookResponse = await axios.get(`http://localhost:8080/library/book/search?id=${id}`);
                const bookData = bookResponse.data[0];
                setBook(bookData);

                // Obtener los datos del autor
                const authorResponse = await axios.get(`http://localhost:8080/api/authors/${bookData.authorID}`);
                setAuthor(authorResponse.data);

                // Obtener los datos del publisher
                const publisherResponse = await axios.get(`http://localhost:8080/api/publishers/${bookData.publisherID}`);
                setPublisher(publisherResponse.data);

                // Obtener las reseñas del libro
                const reviewsResponse = await axios.get(`http://localhost:8080/api/reviews/book/${id}`);
                setReviews(reviewsResponse.data);

            } catch (error) {
                console.error("Error fetching book details:", error);
            }
        };
        fetchBookDetails();
    }, [id]);

    // Función para manejar la acción de añadir al carrito
    const handleAddToCart = () => {
        if (book) {
            addToCart(book); // Llama a addToCart pasando el libro actual
            console.log("Libro añadido al carrito:", book); // Depuración
            alert('Libro agregado al carrito');
        }
    };

    if (!book || !author || !publisher) return <p>Loading...</p>;

    return (
        <div className="book-detail">
            {/* Breadcrumb */}
            <div className="breadcrumb">
                <span>Homepage</span> &gt; <span>{book.genreName}</span> &gt; <span>{book.title}</span>
            </div>

            <div className="book-detail-container">
                {/* Image Section */}
                <div className="book-images">
                    <img src={book.imageURL} alt={book.title} className="main-image" />
                </div>

                {/* Book Information */}
                <div className="book-info">
                    <h1 className="book-title">{book.title}</h1>
                    <p className="book-author">by {author.authorName}</p>
                    <p className="book-price">USD {book.price || "Price Unavailable"}</p>

                    <div className="buy-options">
                        <label htmlFor="quantity">Quantity</label>
                        <input type="number" id="quantity" defaultValue={1} min={1} className="quantity-input" />
                        <button onClick={handleAddToCart} className="buy-button">Añadir Carrito</button>
                    </div>

                    <div className="details-links">
                        <a href="#details" className="product-links">Details & Dimensions</a>
                        <a href="#return-policy" className="product-links">Product Free Return</a>
                    </div>
                </div>
            </div>

            {/* Additional Details */}
            <div className="details-container">
                <div className="details-section" id="details">
                    <h3>Details</h3>
                    <p>{book.description || "No description available."}</p>
                </div>
                <div className="characteristics-section">
                    <h3>Characteristics</h3>
                    <p><strong>ISBN:</strong> {book.isbn}</p>
                    <p><strong>Publisher:</strong> {publisher.publisherName} (<a href={publisher.websiteURL} target="_blank" rel="noopener noreferrer">{publisher.websiteURL}</a>)</p>
                    <p><strong>Publication Date:</strong> {book.publicationDate || "N/A"}</p>
                    <p><strong>Genre:</strong> {book.genreName || "N/A"}</p>
                </div>
            </div>

            {/* Author Biography */}
            <div className="author-bio">
                <h3>About the Author: {author.authorName}</h3>
                <p>{author.biography}</p>
            </div>

            {/* Reviews Section */}
            <div className="reviews-section">
                <h3>Customer Reviews</h3>
                {reviews.length > 0 ? (
                    reviews.map(review => (
                        <div key={review.reviewID} className="review-item">
                            <p><strong>Rating:</strong> {review.rating} / 5</p>
                            <p><strong>Review Date:</strong> {new Date(review.reviewDate).toLocaleDateString()}</p>
                            <p><strong>Review Text:</strong> {review.reviewText}</p>
                        </div>
                    ))
                ) : (
                    <p>No reviews available for this book.</p>
                )}
            </div>
        </div>
    );
};

export default BookDetail;
