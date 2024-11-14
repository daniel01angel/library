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
                // Agrega todas las traducciones necesarias
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
                // Agrega todas las traducciones necesarias
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
