package com.library.library.repository;

import com.library.library.model.Publisher;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.BeanPropertyRowMapper;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public class PublisherRepository {

    @Autowired
    private JdbcTemplate jdbcTemplate;

    // Obtener todos los editores
    public List<Publisher> getAllPublishers() {
        String SQL = "SELECT * FROM Publishers";
        return jdbcTemplate.query(SQL, BeanPropertyRowMapper.newInstance(Publisher.class));
    }

    // Obtener un editor por ID
    public Publisher getPublisherById(int publisherId) {
        String SQL = "SELECT * FROM Publishers WHERE PublisherID = ?";
        return jdbcTemplate.queryForObject(SQL, new Object[]{publisherId}, BeanPropertyRowMapper.newInstance(Publisher.class));
    }

    // Obtener editores por nombre (búsqueda parcial)
    public List<Publisher> getPublishersByName(String publisherName) {
        String SQL = "SELECT * FROM Publishers WHERE PublisherName LIKE ?";
        return jdbcTemplate.query(SQL, new Object[]{"%" + publisherName + "%"}, BeanPropertyRowMapper.newInstance(Publisher.class));
    }
}