package com.library.library.repositoy;

import com.library.library.model.Book;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.BeanPropertyRowMapper;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public class BookRepositoy implements IBookRepository {

    @SuppressWarnings("SpringJavaInjectionPointsAutowiringInspection")
    @Autowired
    private JdbcTemplate jdbcTemplate;

    @Override
    public List<Book> getBook(int id, String title, String isbn) {
        String SQL = "SELECT * FROM Books WHERE 1=1";
        if (id > 0) {
            SQL += " AND BookID = ?";
            return jdbcTemplate.query(SQL, new Object[]{id}, BeanPropertyRowMapper.newInstance(Book.class));
        } else if (title != null && !title.isEmpty()) {
            SQL += " AND title LIKE ?";
            return jdbcTemplate.query(SQL, new Object[]{"%" + title + "%"}, BeanPropertyRowMapper.newInstance(Book.class));
        } else if (isbn != null && !isbn.isEmpty()) {
            SQL += " AND ISBN = ?";
            return jdbcTemplate.query(SQL, new Object[]{isbn}, BeanPropertyRowMapper.newInstance(Book.class));
        } else {
            return jdbcTemplate.query(SQL, BeanPropertyRowMapper.newInstance(Book.class));
        }
    }

    @Override
    public int buyBook(Book book) {
        return 0;
    }

    @Override
    public int updateBook(Book book) {
        return 0;
    }
}

