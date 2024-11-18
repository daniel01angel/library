package com.library.library.controller;

import com.library.library.model.MembershipCardTransaction;
import com.library.library.model.User;
import com.library.library.service.IMembershipCardTransactionService;
import com.library.library.service.IUserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/transactions")
public class MembershipCardTransactionController {

    @Autowired
    private IMembershipCardTransactionService transactionService;

    @Autowired
    private IUserService userService;

    // Inicializar el logger
    private static final Logger logger = LoggerFactory.getLogger(MembershipCardTransactionController.class);

    @PostMapping("/{userId}/create-transaction")
    public ResponseEntity<?> createTransaction(@PathVariable int userId, @RequestBody BigDecimal amount) {
        try {
            // Validar si el usuario existe
            User user = userService.getUser(userId, null, null).stream().findFirst().orElse(null);
            if (user == null) {
                return ResponseEntity.status(HttpStatus.NOT_FOUND)
                        .body(Map.of("error", "Usuario no encontrado"));
            }

            // Validar el monto de recarga
            if (amount.compareTo(new BigDecimal("50000")) < 0 || amount.compareTo(new BigDecimal("200000")) > 0) {
                return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                        .body(Map.of("error", "El monto debe estar entre 50,000 y 200,000"));
            }

            // Crear la transacción
            MembershipCardTransaction transaction = new MembershipCardTransaction();
            transaction.setUserId((long) userId);
            transaction.setTransactionDateTime(LocalDateTime.now());
            transaction.setAmount(amount);
            transactionService.createTransaction(transaction);

            return ResponseEntity.status(HttpStatus.CREATED)
                    .body(Map.of("message", "Transacción creada exitosamente"));
        } catch (Exception e) {
            logger.error("Error al crear la transacción para el usuario con ID {}", userId, e);
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(Map.of("error", "Ocurrió un error al crear la transacción. Por favor, inténtalo de nuevo más tarde."));
        }
    }

    @GetMapping("/{userId}")
    public ResponseEntity<?> getTransactionsByUserId(@PathVariable int userId) {
        try {
            List<MembershipCardTransaction> transactions = transactionService.getTransactionsByUserId((long) userId);
            if (transactions.isEmpty()) {
                return ResponseEntity.status(HttpStatus.NOT_FOUND)
                        .body(Map.of("error", "No se encontraron transacciones para el usuario especificado"));
            }
            return ResponseEntity.ok(transactions);
        } catch (Exception e) {
            logger.error("Error al obtener las transacciones para el usuario con ID {}", userId, e);
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(Map.of("error", "Ocurrió un error al obtener las transacciones. Por favor, inténtalo de nuevo más tarde."));
        }
    }

    @DeleteMapping("/{transactionId}")
    public ResponseEntity<?> deleteTransaction(@PathVariable Long transactionId) {
        try {
            transactionService.deleteTransaction(transactionId);
            return ResponseEntity.ok(Map.of("message", "Transacción eliminada exitosamente"));
        } catch (Exception e) {
            logger.error("Error al eliminar la transacción con ID {}", transactionId, e);
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(Map.of("error", "Ocurrió un error al eliminar la transacción. Por favor, inténtalo de nuevo más tarde."));
        }
    }
}
