package com.library.library.repository;

import com.library.library.model.Author;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.BeanPropertyRowMapper;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public class AuthorRepository {

    @Autowired
    private JdbcTemplate jdbcTemplate;

    // Método para obtener todos los autores
    public List<Author> getAllAuthors() {
        String SQL = "SELECT * FROM Authors";
        return jdbcTemplate.query(SQL, BeanPropertyRowMapper.newInstance(Author.class));
    }

    // Método para obtener un autor por ID
    public Author getAuthorById(int id) {
        String SQL = "SELECT * FROM Authors WHERE AuthorID = ?";
        return jdbcTemplate.queryForObject(SQL, new Object[]{id}, BeanPropertyRowMapper.newInstance(Author.class));
    }

    // Método para obtener autores por nombre
    public List<Author> getAuthorsByName(String name) {
        String SQL = "SELECT * FROM Authors WHERE AuthorName LIKE ?";
        return jdbcTemplate.query(SQL, new Object[]{"%" + name + "%"}, BeanPropertyRowMapper.newInstance(Author.class));
    }
}