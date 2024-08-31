package com.library.library.service;

import com.library.library.model.Book;
import com.library.library.repositoy.IBookRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

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
    public int buyBook(Book book) {
        // Lógica para comprar un libro (pendiente de implementación)
        return 0;
    }

    @Override
    public int updateBook(Book book) {
        // Lógica para actualizar un libro (pendiente de implementación)
        return 0;
    }
}

