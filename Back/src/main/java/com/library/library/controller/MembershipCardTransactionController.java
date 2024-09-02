package com.library.library.controller;

import com.library.library.model.MembershipCardTransaction;
import com.library.library.model.User;
import com.library.library.service.IMembershipCardTransactionService;
import com.library.library.service.IUserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.List;

@RestController
@RequestMapping("/api/transactions")
public class MembershipCardTransactionController {

    @Autowired
    private IMembershipCardTransactionService transactionService;

    @Autowired
    private IUserService userService;

    @PostMapping("/{userId}/create-transaction")
    public ResponseEntity<String> createTransaction(@PathVariable int userId, @RequestBody BigDecimal amount) {
        try {
            // Validar si el usuario existe
            User user = userService.getUser(userId, null, null).stream().findFirst().orElse(null);
            if (user == null) {
                return new ResponseEntity<>("User not found", HttpStatus.NOT_FOUND);
            }

            // Validar el monto de recarga
            if (amount.compareTo(new BigDecimal(50000)) < 0 || amount.compareTo(new BigDecimal(200000)) > 0) {
                return new ResponseEntity<>("Amount must be between 50,000 and 200,000", HttpStatus.BAD_REQUEST);
            }

            // Crear la transacción
            MembershipCardTransaction transaction = new MembershipCardTransaction();
            transaction.setUserId((long) userId);
            transaction.setTransactionDateTime(LocalDateTime.now());
            transaction.setAmount(amount);
            transactionService.createTransaction(transaction);

            return new ResponseEntity<>("Transaction created successfully", HttpStatus.CREATED);
        } catch (Exception e) {
            return new ResponseEntity<>("Error creating transaction: " + e.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @GetMapping("/{userId}")
    public ResponseEntity<List<MembershipCardTransaction>> getTransactionsByUserId(@PathVariable int userId) {
        try {
            List<MembershipCardTransaction> transactions = transactionService.getTransactionsByUserId((long) userId);
            if (transactions.isEmpty()) {
                return new ResponseEntity<>(HttpStatus.NOT_FOUND);
            }
            return new ResponseEntity<>(transactions, HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @DeleteMapping("/{transactionId}")
    public ResponseEntity<String> deleteTransaction(@PathVariable Long transactionId) {
        try {
            transactionService.deleteTransaction(transactionId);
            return new ResponseEntity<>("Transaction deleted successfully", HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>("Error deleting transaction: " + e.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}
