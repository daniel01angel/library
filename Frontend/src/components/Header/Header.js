import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import HeaderLogo from './HeaderLogo';
import GenreButtons from './GenreButtons';
import SearchBar from './SearchBar';
import '../../styles/Header/Header.css';

const Header = ({ onSelectGenre, isLoggedIn, setIsLoggedIn }) => {
    const [genres, setGenres] = useState([]);
    const navigate = useNavigate();

    const handleSelectBook = (book) => {
        navigate(`/book/${book.bookID}`);
    };

    const handleSelectGenre = (genreId) => {
        onSelectGenre(genreId);
    };

    const handleLogout = () => {
        setIsLoggedIn(false);
        navigate('/');
    };

    useEffect(() => {
        const fetchGenres = async () => {
            try {
                const response = await axios.get('http://localhost:8080/api/genres/all');
                setGenres(response.data);
            } catch (error) {
                console.error("Error fetching genres:", error);
            }
        };
        fetchGenres();
    }, []);

    return (
        <header className="header" style={{ display: 'flex', alignItems: 'center', padding: '10px 20px' }}>
            <div style={{ display: 'flex', alignItems: 'center' }}>
                <Link to="/" className="logo-container" style={{ display: 'flex', alignItems: 'center' }}>
                    <HeaderLogo />
                </Link>
                {isLoggedIn ? (
                    <button
                        onClick={handleLogout}
                        style={{
                            marginLeft: '10px',
                            padding: '10px 20px',
                            fontSize: '16px',
                            cursor: 'pointer',
                            backgroundColor: '#dc3545',
                            color: 'white',
                            border: 'none',
                            borderRadius: '5px'
                        }}
                    >
                        Logout
                    </button>
                ) : (
                    <button
                        onClick={() => navigate('/login')}
                        style={{
                            marginLeft: '10px',
                            padding: '10px 20px',
                            fontSize: '16px',
                            cursor: 'pointer',
                            backgroundColor: '#007bff',
                            color: 'white',
                            border: 'none',
                            borderRadius: '5px'
                        }}
                    >
                        Login
                    </button>
                )}
            </div>
            <div style={{ flex: 1, display: 'flex', justifyContent: 'center' }}>
                <GenreButtons genres={genres} onSelectGenre={handleSelectGenre} />
            </div>
            <div style={{ marginLeft: '20px' }}>
                <SearchBar onSelectBook={handleSelectBook} />
            </div>
            <Link to="/cart" className="cart-link" style={{ marginLeft: '20px', color: 'inherit', textDecoration: 'none' }}>
                <i className="fa fa-shopping-cart"></i> Carrito
            </Link>
        </header>
    );
};

export default Header;
