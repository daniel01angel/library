import React, { useState } from 'react';
import Header from './components/Header/Header';
import BookList from './components/BookList';

const App = () => {
    const [selectedBook, setSelectedBook] = useState(null);
    const [selectedGenre, setSelectedGenre] = useState(null); // Estado para el género seleccionado

    const handleSelectBook = (book) => {
        setSelectedBook(book);
    };

    const handleSelectGenre = (genreId) => {
        setSelectedGenre(genreId);
        setSelectedBook(null); // Limpiar el libro seleccionado si cambiamos de género
    };

    return (
        <div>
            <Header onSelectBook={handleSelectBook} onSelectGenre={handleSelectGenre} />
            <BookList selectedBook={selectedBook} selectedGenre={selectedGenre} />
        </div>
    );
};

export default App;