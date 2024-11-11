package com.library.library.service;

import com.library.library.model.Review;
import com.library.library.repository.ReviewRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ReviewService {

    @Autowired
    private ReviewRepository reviewRepository;

    // Obtener todas las reseñas
    public List<Review> getAllReviews() {
        return reviewRepository.getAllReviews();
    }

    // Obtener reseña por ID
    public Review getReviewById(int reviewId) {
        return reviewRepository.getReviewById(reviewId);
    }

    // Obtener reseñas por BookID
    public List<Review> getReviewsByBookId(int bookId) {
        return reviewRepository.getReviewsByBookId(bookId);
    }
}