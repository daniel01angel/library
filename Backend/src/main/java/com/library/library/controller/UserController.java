package com.library.library.controller;

import com.library.library.model.User;
import com.library.library.service.IUserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.math.BigDecimal;
import java.util.List;

@RestController
@RequestMapping("/api/users")
public class UserController {

    @Autowired
    private IUserService userService;

    @GetMapping("/all")
    public ResponseEntity<List<User>> getUsers(
            @RequestParam(required = false) String firstName,
            @RequestParam(required = false) String lastName) {
        try {
            List<User> users = userService.getUser(0, firstName, lastName);
            return new ResponseEntity<>(users, HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }


    @PutMapping("/{userId}/update-balance")
    public ResponseEntity<String> updateCardBalance(@PathVariable int userId, @RequestBody BigDecimal amount) {
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

            // Actualizar el balance
            user.setAvailableBalance(user.getAvailableBalance().add(amount));
            userService.updateUser(user);

            return new ResponseEntity<>("Card balance updated successfully", HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>("Error updating card balance: " + e.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @PutMapping("/{userId}/update-user")
    public ResponseEntity<String> updateUser(@PathVariable int userId, @RequestBody User updatedUser) {
        try {
            // Validar si el usuario existe
            User user = userService.getUser(userId, null, null).stream().findFirst().orElse(null);
            if (user == null) {
                return new ResponseEntity<>("User not found", HttpStatus.NOT_FOUND);
            }

            // Actualizar los datos del usuario
            updatedUser.setUserId(userId); // Asegurar que el ID no cambia
            userService.updateUser(updatedUser);

            return new ResponseEntity<>("User updated successfully", HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>("Error updating user: " + e.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}