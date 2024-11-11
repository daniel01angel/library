// src/components/FeaturedBooks.js
import React from 'react';

const FeaturedBooks = () => {
    return (
        <section className="featured-books">
            <div className="book">
                <img src="sapiens.png" alt="Sapiens: A Brief History of Humankind" />
                <p>Sapiens: A Brief History of Humankind</p>
                <span>$50</span>
            </div>
            <div className="sale-info">
                <h2>2 great books on sale!</h2>
                <p>Deal will close in 2 days</p>
            </div>
            <div className="book">
                <img src="diary.webp" alt="The Diary of a Young Girl" />
                <p>The Diary of a Young Girl</p>
                <span>$100</span>
            </div>
        </section>
    );
};

export default FeaturedBooks;
