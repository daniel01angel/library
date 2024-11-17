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
            return iBookRepository.getBook(id, title, isbn);
        } catch (Exception e) {
            throw new RuntimeException("Error retrieving books", e);
        }
    }

    @Override
    public void buyBooks(Map<Integer, Integer> booksToBuy) {
        for (Map.Entry<Integer, Integer> entry : booksToBuy.entrySet()) {
            int bookId = entry.getKey();
            int quantity = entry.getValue();

            // Validar la cantidad
            if (quantity <= 0) {
                throw new IllegalArgumentException("The quantity for book ID " + bookId + " must be greater than 0.");
            }

            // Intentar comprar el libro (descontar stock)
            int rowsUpdated = iBookRepository.buyBook(bookId, quantity);

            if (rowsUpdated == 0) {
                throw new RuntimeException("Failed to buy book with ID: " + bookId + ". Not enough stock.");
            }
        }
    }
}
