package com.library.library.repository;

import com.library.library.model.Book;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.BeanPropertyRowMapper;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;

import java.util.ArrayList;
import java.util.List;

@Repository
public class BookRepository implements IBookRepository {

    @Autowired
    private JdbcTemplate jdbcTemplate;

    @Override
    public List<Book> getBook(int id, String title, String isbn) {
        StringBuilder SQL = new StringBuilder("SELECT * FROM Books WHERE 1=1");
        List<Object> params = new ArrayList<>();

        // Construir la consulta de manera segura, usando parámetros
        if (id > 0) {
            SQL.append(" AND BookID = ?");
            params.add(id);
        }
        if (title != null && !title.isEmpty()) {
            SQL.append(" AND title LIKE ?");
            params.add("%" + title + "%");
        }
        if (isbn != null && !isbn.isEmpty()) {
            SQL.append(" AND ISBN = ?");
            params.add(isbn);
        }

        return jdbcTemplate.query(SQL.toString(), params.toArray(), BeanPropertyRowMapper.newInstance(Book.class));
    }

    @Override
    public int buyBook(int bookId, int quantity) {
        // Registrar detalles para depuración
        System.out.println("Repository - buyBook with bookId: " + bookId + ", quantity: " + quantity);

        // Utilizar una consulta parametrizada para evitar SQL Injection
        String SQL = "UPDATE Books SET Stock = Stock - ? WHERE BookID = ? AND Stock >= ?";
        int result = jdbcTemplate.update(SQL, quantity, bookId, quantity);

        // Registrar el resultado de la operación
        System.out.println("Result of update query: " + result);
        return result;
    }
}
