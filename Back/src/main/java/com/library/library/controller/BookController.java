package com.library.library.controller;

import com.library.library.model.Book;
import com.library.library.service.BookService;
import com.library.library.service.IBookService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("library/book")
public class BookController {

    @Autowired
    private IBookService iBookService;

    @GetMapping("/search")
    public ResponseEntity<List<Book>> searchBooks(
            @RequestParam(required = false) Integer id,
            @RequestParam(required = false) String title,
            @RequestParam(required = false) String isbn) {

        var result = iBookService.getBook(id != null ? id : 0, title, isbn);
        return new ResponseEntity<>(result, HttpStatus.OK);
    }

    @PostMapping("/buy")
    public ResponseEntity<String> buyBooks(@RequestBody Map<Integer, Integer> booksToBuy) {
        try {
            iBookService.buyBooks(booksToBuy);
            return new ResponseEntity<>("Purchase successful", HttpStatus.OK);
        } catch (RuntimeException e) {
            return new ResponseEntity<>(e.getMessage(), HttpStatus.BAD_REQUEST);
        }
    }
}

