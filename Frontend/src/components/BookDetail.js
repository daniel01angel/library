import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import '../styles/BookDetail.css';

const BookDetail = () => {
    const { id } = useParams();
    const [book, setBook] = useState(null);

    useEffect(() => {
        const fetchBook = async () => {
            try {
                const response = await axios.get(`http://localhost:8080/library/book/search?id=${id}`);
                setBook(response.data[0]);
            } catch (error) {
                console.error("Error fetching book:", error);
            }
        };
        fetchBook();
    }, [id]);

    if (!book) return <p>Loading...</p>;

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
                    {/* Puedes agregar más imágenes aquí si tu API provee varias imágenes */}
                </div>

                {/* Book Information */}
                <div className="book-info">
                    <h1 className="book-title">{book.title}</h1>
                    <p className="book-author">by {book.author}</p>
                    <p className="book-price">USD {book.price || "Price Unavailable"}</p>

                    <div className="buy-options">
                        <label htmlFor="quantity">Quantity</label>
                        <input type="number" id="quantity" defaultValue={1} min={1} className="quantity-input"/>
                        <button className="buy-button">Add to bag</button>
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
                    <p><strong>Publisher:</strong> {book.publisher}</p>
                    <p><strong>Publication Date:</strong> {book.publishDate || "N/A"}</p>
                    <p><strong>Pages:</strong> {book.pages || "N/A"}</p>
                    <p><strong>Genre:</strong> {book.genreName || "N/A"}</p>
                </div>
            </div>
        </div>
    );
};

export default BookDetail;