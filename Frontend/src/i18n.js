// src/i18n.js
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

i18n.use(initReactI18next).init({
    resources: {
        en: {
            translation: {
                "Library": "Library",
                "Login": "Login",
                "Logout": "Logout",
                "Cart": "Cart",
                "Add to Cart": "Add to Cart",
                "Quantity": "Quantity",
                "Total": "Total",
                "Purchase": "Purchase",
                "Clear Cart": "Clear Cart",
                "Classic": "Classic",
                "Dystopian": "Dystopian",
                "Epic": "Epic",
                "Historical Fiction": "Historical Fiction",
                "Romance": "Romance",
                "Details": "Details",
                "Characteristics": "Characteristics",
                "by": "by",
                "Price Unavailable": "Price Unavailable",
                "Details & Dimensions": "Details & Dimensions",
                "Product Free Return": "Product Free Return",
                "ISBN": "ISBN",
                "Publisher": "Publisher",
                "Publication Date": "Publication Date",
                "Genre": "Genre",
                "About the Author": "About the Author",
                "Customer Reviews": "Customer Reviews",
                "Rating": "Rating",
                "Review Date": "Review Date",
                "Review Text": "Review Text",
                "No description available.": "No description available.",
                "No reviews available for this book.": "No reviews available for this book.",
                "Book added to cart": "Book added to cart",
                "Loading": "Loading",
                "Clear Car": "Clear Car",
                "Buy": "Buy",
                "Shopping Cart": "Shopping Cart",
                "No items in the cart": "No items in the cart"
            }
        },
        es: {
            translation: {
                "Library": "Biblioteca",
                "Login": "Iniciar sesión",
                "Logout": "Cerrar sesión",
                "Cart": "Carrito",
                "Add to Cart": "Añadir Carrito",
                "Quantity": "Cantidad",
                "Total": "Total",
                "Purchase": "Comprar",
                "Clear Cart": "Vaciar Carrito",
                "Classic": "Clásico",
                "Dystopian": "Distopía",
                "Epic": "Épico",
                "Historical Fiction": "Ficción Histórica",
                "Romance": "Romance",
                "Details": "Detalles",
                "Characteristics": "Características",
                "by": "por",
                "Price Unavailable": "Precio no disponible",
                "Details & Dimensions": "Detalles y Dimensiones",
                "Product Free Return": "Devolución Gratis del Producto",
                "ISBN": "ISBN",
                "Publisher": "Editorial",
                "Publication Date": "Fecha de Publicación",
                "Genre": "Género",
                "About the Author": "Sobre el Autor",
                "Customer Reviews": "Reseñas de Clientes",
                "Rating": "Calificación",
                "Review Date": "Fecha de Reseña",
                "Review Text": "Texto de la Reseña",
                "No description available.": "No hay descripción disponible.",
                "No reviews available for this book.": "No hay reseñas disponibles para este libro.",
                "Book added to cart": "Libro agregado al carrito",
                "Loading": "Cargando",
                "Buy": "Comprar",
                "Shopping Cart": "Carrito de compras",
                "No items in the cart": "Carrito sin artículos"
            }
        }
    },
    lng: "en", // Idioma por defecto
    fallbackLng: "en",
    interpolation: {
        escapeValue: false
    }
});

export default i18n;
