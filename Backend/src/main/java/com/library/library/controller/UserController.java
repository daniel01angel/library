package com.library.library.controller;

import com.library.library.model.User;
import com.library.library.service.IUserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.math.BigDecimal;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/users")
public class UserController {

    @Autowired
    private IUserService userService;

    // Inicializar el logger
    private static final Logger logger = LoggerFactory.getLogger(UserController.class);

    private final PasswordEncoder passwordEncoder = new BCryptPasswordEncoder();


    @GetMapping("/all")
    public ResponseEntity<?> getUsers(
            @RequestParam(required = false) String firstName,
            @RequestParam(required = false) String lastName) {
        try {
            List<User> users = userService.getUser(0, firstName, lastName);
            return new ResponseEntity<>(users, HttpStatus.OK);
        } catch (Exception e) {
            logger.error("Error al obtener los usuarios", e);
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(Map.of("error", "Ocurrió un error al obtener los usuarios. Por favor, inténtalo de nuevo más tarde."));
        }
    }

    @PutMapping("/{userId}/update-balance")
    public ResponseEntity<?> updateCardBalance(@PathVariable int userId, @RequestBody BigDecimal amount) {
        try {
            // Validar si el usuario existe
            User user = userService.getUser(userId, null, null).stream().findFirst().orElse(null);
            if (user == null) {
                return ResponseEntity.status(HttpStatus.NOT_FOUND)
                        .body(Map.of("error", "Usuario no encontrado"));
            }

            // Validar el monto de recarga
            if (amount.compareTo(new BigDecimal(50000)) < 0 || amount.compareTo(new BigDecimal(200000)) > 0) {
                return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                        .body(Map.of("error", "El monto debe estar entre 50,000 y 200,000"));
            }

            // Actualizar el balance
            user.setAvailableBalance(user.getAvailableBalance().add(amount));
            userService.updateUser(user);

            return ResponseEntity.ok(Map.of("message", "Saldo de la tarjeta actualizado exitosamente"));
        } catch (Exception e) {
            logger.error("Error al actualizar el saldo de la tarjeta para el usuario con ID {}", userId, e);
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(Map.of("error", "Ocurrió un error al actualizar el saldo de la tarjeta. Por favor, inténtalo de nuevo más tarde."));
        }
    }

    @PutMapping("/{userId}/update-user")
    public ResponseEntity<?> updateUser(@PathVariable int userId, @RequestBody User updatedUser) {
        try {
            // Validar si el usuario existe
            User user = userService.getUser(userId, null, null).stream().findFirst().orElse(null);
            if (user == null) {
                return ResponseEntity.status(HttpStatus.NOT_FOUND)
                        .body(Map.of("error", "Usuario no encontrado"));
            }

            // Actualizar los datos del usuario
            updatedUser.setUserId(userId); // Asegurar que el ID no cambia
            userService.updateUser(updatedUser);

            return ResponseEntity.ok(Map.of("message", "Usuario actualizado exitosamente"));
        } catch (Exception e) {
            logger.error("Error al actualizar el usuario con ID {}", userId, e);
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(Map.of("error", "Ocurrió un error al actualizar el usuario. Por favor, inténtalo de nuevo más tarde."));
        }
    }

    @PostMapping("/register")
    public ResponseEntity<?> registerUser(@RequestBody User user) {
        try {
            // Validaciones
            if (user.getFirstName() == null || user.getFirstName().trim().isEmpty()) {
                return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                        .body(Map.of("error", "El nombre es obligatorio"));
            }
            if (user.getLastName() == null || user.getLastName().trim().isEmpty()) {
                return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                        .body(Map.of("error", "El apellido es obligatorio"));
            }
            if (user.getEmail() == null || user.getEmail().trim().isEmpty()) {
                return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                        .body(Map.of("error", "El correo electrónico es obligatorio"));
            }
            if (user.getGender() == null || user.getGender().trim().isEmpty()) {
                return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                        .body(Map.of("error", "El género es obligatorio"));
            }
            if (user.getProfession() == null || user.getProfession().trim().isEmpty()) {
                return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                        .body(Map.of("error", "La profesión es obligatoria"));
            }
            if (userService.emailExists(user.getEmail())) {
                return ResponseEntity.status(HttpStatus.CONFLICT)
                        .body(Map.of("error", "El correo electrónico ya está registrado"));
            }

            // Encriptar la contraseña antes de guardar
            String encodedPassword = passwordEncoder.encode(user.getPassword());
            user.setPassword(encodedPassword);

            // Registro del usuario
            userService.registerUser(user);

            return ResponseEntity.status(HttpStatus.CREATED)
                    .body(Map.of("message", "Usuario registrado exitosamente"));
        } catch (Exception e) {
            logger.error("Error al registrar el usuario", e);
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(Map.of("error", "Ocurrió un error al registrar el usuario. Por favor, inténtalo de nuevo más tarde."));
        }
    }
}
