package com.library.library.repositoy;

import com.library.library.model.Book;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.BeanPropertyRowMapper;
import org.springframework.jdbc.core.JdbcTemplate;

import java.util.List;

public class BookRepositoy implements IBookRepository{


    @SuppressWarnings("SpringJavaInjectionPointsAutowiringInspection")
    @Autowired
    private JdbcTemplate jdbcTemplate;
    @Override
    public List<Book> getBook(Book book) {
        String SQL = "select * from book";
        return jdbcTemplate.query(SQL, BeanPropertyRowMapper.newInstance(Book.class));
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
