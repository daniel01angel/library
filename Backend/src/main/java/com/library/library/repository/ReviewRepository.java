package com.library.library.repository;

import com.library.library.model.Review;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.BeanPropertyRowMapper;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public class ReviewRepository {

    @Autowired
    private JdbcTemplate jdbcTemplate;

    // Obtener todas las reseñas
    public List<Review> getAllReviews() {
        String SQL = "SELECT * FROM Reviews";
        return jdbcTemplate.query(SQL, BeanPropertyRowMapper.newInstance(Review.class));
    }

    // Obtener reseña por ID
    public Review getReviewById(int reviewId) {
        String SQL = "SELECT * FROM Reviews WHERE ReviewID = ?";
        return jdbcTemplate.queryForObject(SQL, new Object[]{reviewId}, BeanPropertyRowMapper.newInstance(Review.class));
    }

    // Obtener reseñas por BookID
    public List<Review> getReviewsByBookId(int bookId) {
        String SQL = "SELECT * FROM Reviews WHERE BookID = ?";
        return jdbcTemplate.query(SQL, new Object[]{bookId}, BeanPropertyRowMapper.newInstance(Review.class));
    }
}