package com.library.library.controller;

import com.library.library.model.Book;
import com.library.library.service.IBookService;
import com.library.library.service.TransactionLogService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import jakarta.servlet.http.HttpServletRequest;

@RestController
@RequestMapping("library/book")
public class BookController {

    @Autowired
    private IBookService iBookService;

    @Autowired
    private TransactionLogService transactionLogService;

    @GetMapping("/search")
    public ResponseEntity<List<Book>> searchBooks(
            @RequestParam(required = false) Integer id,
            @RequestParam(required = false) String title,
            @RequestParam(required = false) String isbn) {

        var result = iBookService.getBook(id != null ? id : 0, title, isbn);
        return new ResponseEntity<>(result, HttpStatus.OK);
    }

    @PostMapping("/buy")
    public ResponseEntity<String> buyBooks(@RequestBody Map<Integer, Integer> booksToBuy, HttpServletRequest request) {
        try {
            Long userId = 1L; // ID de usuario simulado o autenticado

            // Realizar la compra de libros
            iBookService.buyBooks(booksToBuy);

            // Registrar el log de la transacción
            double amount = booksToBuy.values().stream().mapToDouble(Integer::doubleValue).sum();
            String ipAddress = request.getRemoteAddr(); // Obtener la IP

            // Registro de transacción
            transactionLogService.logTransaction(userId, new ArrayList<>(booksToBuy.keySet()), amount, ipAddress);

            return new ResponseEntity<>("Purchase and transaction log successful", HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>("Error processing purchase: " + e.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}