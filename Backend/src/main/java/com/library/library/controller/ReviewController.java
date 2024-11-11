package com.library.library.controller;

import com.library.library.model.Review;
import com.library.library.service.ReviewService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/reviews")
public class ReviewController {

    @Autowired
    private ReviewService reviewService;

    // Endpoint para obtener todas las reseñas
    @GetMapping("/all")
    public List<Review> getAllReviews() {
        return reviewService.getAllReviews();
    }

    // Endpoint para obtener una reseña específica por ID
    @GetMapping("/{reviewId}")
    public Review getReviewById(@PathVariable int reviewId) {
        return reviewService.getReviewById(reviewId);
    }

    // Endpoint para obtener reseñas por BookID
    @GetMapping("/book/{bookId}")
    public List<Review> getReviewsByBookId(@PathVariable int bookId) {
        return reviewService.getReviewsByBookId(bookId);
    }
}
