// src/components/BookDetail.js
import React, { useEffect, useState, useContext } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { useTranslation } from 'react-i18next';
import { CartContext } from '../context/CartContext';
import Notification from './Notification';
import '../styles/BookDetail.css';

const BookDetail = () => {
    const { id } = useParams();
    const { addToCart } = useContext(CartContext);
    const { t } = useTranslation();
    const [book, setBook] = useState(null);
    const [author, setAuthor] = useState(null);
    const [publisher, setPublisher] = useState(null);
    const [reviews, setReviews] = useState([]);
    const [showNotification, setShowNotification] = useState(false);
    const [quantity, setQuantity] = useState(1); // Estado para la cantidad

    useEffect(() => {
        const fetchBookDetails = async () => {
            try {
                const bookResponse = await axios.get(`http://localhost:8080/library/book/search?id=${id}`);
                const bookData = bookResponse.data[0];
                setBook(bookData);

                const authorResponse = await axios.get(`http://localhost:8080/api/authors/${bookData.authorID}`);
                setAuthor(authorResponse.data);

                const publisherResponse = await axios.get(`http://localhost:8080/api/publishers/${bookData.publisherID}`);
                setPublisher(publisherResponse.data);

                const reviewsResponse = await axios.get(`http://localhost:8080/api/reviews/book/${id}`);
                setReviews(reviewsResponse.data);

            } catch (error) {
                console.error("Error fetching book details:", error);
            }
        };
        fetchBookDetails();
    }, [id]);

    const handleAddToCart = () => {
        if (book) {
            addToCart({ ...book, quantity: parseInt(quantity) }); // Incluir cantidad
            setShowNotification(true);
        }
    };

    // Función para traducir dinámicamente contenido específico
    const translateContent = (text) => {
        if (!text) return text;
        return text
            .replace(/racial injustice/gi, t('injusticia racial'))
            .replace(/moral growth/gi, t('crecimiento moral'))
            .replace(/compassion/gi, t('compasión'));
    };

    if (!book || !author || !publisher) return <p>{t("Loading")}</p>;

    return (
        <div className="book-detail">
            <div className="breadcrumb">
                <span>{t("Homepage")}</span> &gt; <span>{book.genreName}</span> &gt; <span>{book.title}</span>
            </div>

            <div className="book-detail-container">
                <div className="book-images">
                    <img src={book.imageURL} alt={book.title} className="main-image" />
                </div>

                <div className="book-info">
                    <h1 className="book-title">{book.title}</h1>
                    <p className="book-author">{t("by")} {author.authorName}</p>
                    <p className="book-price">USD {book.price || t("Price Unavailable")}</p>

                    <div className="buy-options">
                        <label htmlFor="quantity">{t("Cantidad")}</label>
                        <input
                            type="number"
                            id="quantity"
                            value={quantity}
                            min={1}
                            className="quantity-input"
                            onChange={(e) => setQuantity(e.target.value)} // Actualizar estado de cantidad
                        />
                        <button onClick={handleAddToCart} className="buy-button">
                            {t("Añadir al Carrito")}
                        </button>
                    </div>

                    <div className="details-links">
                        <a href="#details" className="product-links">{t("Details & Dimensions")}</a>
                        <a href="#return-policy" className="product-links">{t("Product Free Return")}</a>
                    </div>
                </div>
            </div>

            <div className="details-container">
                <div className="details-section" id="details">
                    <h3>{t("Details")}</h3>
                    <p>{translateContent(book.description) || t("No description available.")}</p>
                </div>
                <div className="characteristics-section">
                    <h3>{t("Characteristics")}</h3>
                    <p><strong>{t("ISBN")}:</strong> {book.isbn}</p>
                    <p><strong>{t("Publisher")}:</strong> {publisher.publisherName} (<a href={publisher.websiteURL} target="_blank" rel="noopener noreferrer">{publisher.websiteURL}</a>)</p>
                    <p><strong>{t("Publication Date")}:</strong> {book.publicationDate || "N/A"}</p>
                    <p><strong>{t("Genre")}:</strong> {book.genreName || "N/A"}</p>
                </div>
            </div>

            <div className="author-bio">
                <h3>{t("About the Author")}: {author.authorName}</h3>
                <p>{translateContent(author.biography)}</p>
            </div>

            <div className="reviews-section">
                <h3>{t("Customer Reviews")}</h3>
                {reviews.length > 0 ? (
                    reviews.map(review => (
                        <div key={review.reviewID} className="review-item">
                            <p><strong>{t("Rating")}:</strong> {review.rating} / 5</p>
                            <p><strong>{t("Review Date")}:</strong> {new Date(review.reviewDate).toLocaleDateString()}</p>
                            <p><strong>{t("Review Text")}:</strong> {translateContent(review.reviewText)}</p>
                        </div>
                    ))
                ) : (
                    <p>{t("No reviews available for this book.")}</p>
                )}
            </div>

            <Notification
                message={t("Book added to cart")}
                show={showNotification}
                onClose={() => setShowNotification(false)}
            />
        </div>
    );
};

export default BookDetail;
