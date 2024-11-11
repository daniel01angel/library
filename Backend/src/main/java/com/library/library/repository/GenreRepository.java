package com.library.library.repository;

import com.library.library.model.Genre;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.BeanPropertyRowMapper;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public class GenreRepository {

    @Autowired
    private JdbcTemplate jdbcTemplate;

    public List<Genre> getAllGenres() {
        String SQL = "SELECT GenreID, GenreName FROM Genres";
        return jdbcTemplate.query(SQL, BeanPropertyRowMapper.newInstance(Genre.class));
    }
}
