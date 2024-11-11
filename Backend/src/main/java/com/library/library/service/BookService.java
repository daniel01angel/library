package com.library.library.service;

import com.library.library.model.Book;
import com.library.library.repository.IBookRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Map;

@Service
public class BookService implements IBookService {

    @Autowired
    private IBookRepository iBookRepository;

    @Override
    public List<Book> getBook(int id, String title, String isbn) {
        try {
            // Pasar los parámetros al repositorio
            return iBookRepository.getBook(id, title, isbn);
        } catch (Exception e) {
            // Manejo de excepciones, podrías lanzar una excepción personalizada o manejarlo aquí
            throw new RuntimeException("Error retrieving books", e);
        }
    }

    @Override
    public void buyBooks(Map<Integer, Integer> booksToBuy) {
        for (Map.Entry<Integer, Integer> entry : booksToBuy.entrySet()) {
            int bookId = entry.getKey();
            int quantity = entry.getValue();

            // Validación: Asegurarse de que la cantidad sea mayor que 0
            if (quantity <= 0) {
                throw new IllegalArgumentException("The quantity for book ID " + bookId + " must be greater than 0.");
            }

            // Verificar que haya suficiente stock antes de comprar
            List<Book> books = iBookRepository.getBook(bookId, null, null);
            if (books.isEmpty() || books.get(0).getStock() < quantity) {
                throw new RuntimeException("Not enough stock for book with ID: " + bookId);
            }

            // Realizar la compra
            int rowsUpdated = iBookRepository.buyBook(bookId, quantity);
            if (rowsUpdated == 0) {
                throw new RuntimeException("Failed to buy book with ID: " + bookId);
            }
        }
    }

    @Override
    public int updateBook(Book book) {
        // Lógica para actualizar un libro (pendiente de implementación)
        return 0;
    }
}

