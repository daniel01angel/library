package com.library.library.model;

import lombok.Data;
import java.math.BigDecimal;

@Data
public class User {
    private int userId;
    private String firstName;
    private String lastName;
    private int cityId;
    private int countryId;
    private int age;
    private String gender;
    private String profession;
    private String membershipCardNumber;
    private BigDecimal availableBalance;

    // Nuevos campos añadidos para soporte de autenticación con Google
    private String email; // Para almacenar el correo electrónico del usuario
    private String googleId; // Para almacenar el ID único de Google del usuario

    // Getters y Setters adicionales si es necesario
}
