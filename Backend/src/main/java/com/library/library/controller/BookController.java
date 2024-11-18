package com.library.library.controller;

import com.library.library.model.Book;
import com.library.library.service.IBookService;
import com.library.library.service.TransactionLogService;
import com.library.library.exception.InsufficientStockException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.util.*;
import jakarta.servlet.http.HttpServletRequest;

@RestController
@RequestMapping("library/book")
public class BookController {

    @Autowired
    private IBookService iBookService;

    @Autowired
    private TransactionLogService transactionLogService;

    // Inicializar el logger
    private static final Logger logger = LoggerFactory.getLogger(BookController.class);

    @GetMapping("/search")
    public ResponseEntity<?> searchBooks(
            @RequestParam(required = false) Integer id,
            @RequestParam(required = false) String title,
            @RequestParam(required = false) String isbn) {
        try {
            List<Book> result = iBookService.getBook(id != null ? id : 0, title, isbn);
            return new ResponseEntity<>(result, HttpStatus.OK);
        } catch (Exception e) {
            logger.error("Error al buscar libros", e);
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(Map.of("error", "Ocurrió un error al buscar libros. Por favor, inténtalo de nuevo más tarde."));
        }
    }

    @PostMapping("/buy")
    public ResponseEntity<?> buyBooks(@RequestBody Map<String, Integer> booksToBuyStringKeys, HttpServletRequest request) {
        try {
            logger.info("buyBooks called with data: {}", booksToBuyStringKeys);
            Long userId = 1L; // ID de usuario simulado o autenticado

            // Validar que el mapa no esté vacío
            if (booksToBuyStringKeys == null || booksToBuyStringKeys.isEmpty()) {
                return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                        .body(Map.of("error", "La lista de libros a comprar no puede estar vacía"));
            }

            // Convertir claves de String a Integer
            Map<Integer, Integer> booksToBuy = new HashMap<>();
            for (Map.Entry<String, Integer> entry : booksToBuyStringKeys.entrySet()) {
                try {
                    Integer bookId = Integer.parseInt(entry.getKey());
                    Integer quantity = entry.getValue();
                    if (quantity <= 0) {
                        return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                                .body(Map.of("error", "La cantidad de libros debe ser mayor que cero"));
                    }
                    booksToBuy.put(bookId, quantity);
                } catch (NumberFormatException ex) {
                    logger.warn("ID de libro inválido: {}", entry.getKey());
                    return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                            .body(Map.of("error", "ID de libro inválido: " + entry.getKey()));
                }
            }

            // Realizar la compra de libros
            iBookService.buyBooks(booksToBuy);

            // Registrar el log de la transacción
            double amount = booksToBuy.values().stream().mapToDouble(Integer::doubleValue).sum();
            String ipAddress = request.getRemoteAddr();

            // Registro de transacción
            transactionLogService.logTransaction(userId, new ArrayList<>(booksToBuy.keySet()), amount, ipAddress);

            return ResponseEntity.ok(Map.of("message", "Compra realizada y transacción registrada exitosamente"));
        } catch (InsufficientStockException e) {
            // Manejar la excepción de stock insuficiente
            logger.warn("Stock insuficiente: {}", e.getMessage());
            return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                    .body(Map.of("error", e.getMessage()));
        } catch (Exception e) {
            logger.error("Error al procesar la compra de libros", e);
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(Map.of("error", "Ocurrió un error al procesar la compra. Por favor, inténtalo de nuevo más tarde."));
        }
    }
}
