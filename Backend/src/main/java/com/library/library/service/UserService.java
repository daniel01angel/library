package com.library.library.service;

import com.library.library.model.User;
import com.library.library.repository.IUserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.util.List;

@Service
public class UserService implements IUserService {

    @Autowired
    private IUserRepository iUserRepository;

    @Override
    public List<User> getUser(int userId, String firstName, String lastName) {
        try {
            return iUserRepository.getUser(userId, firstName, lastName);
        } catch (Exception e) {
            throw new RuntimeException("Error retrieving users", e);
        }
    }

    @Override
    public void updateUser(User updatedUser) {
        try {
            User existingUser = iUserRepository.getUser(updatedUser.getUserId(), null, null)
                    .stream().findFirst().orElse(null);
            if (existingUser == null) {
                throw new RuntimeException("User not found with ID: " + updatedUser.getUserId());
            }

            // Actualizar campos si no son nulos
            if (updatedUser.getFirstName() != null) {
                existingUser.setFirstName(updatedUser.getFirstName());
            }
            if (updatedUser.getLastName() != null) {
                existingUser.setLastName(updatedUser.getLastName());
            }
            if (updatedUser.getCityId() != 0) {
                existingUser.setCityId(updatedUser.getCityId());
            }
            if (updatedUser.getCountryId() != 0) {
                existingUser.setCountryId(updatedUser.getCountryId());
            }
            if (updatedUser.getAge() != 0) {
                existingUser.setAge(updatedUser.getAge());
            }
            if (updatedUser.getGender() != null) {
                existingUser.setGender(updatedUser.getGender());
            }
            if (updatedUser.getProfession() != null) {
                existingUser.setProfession(updatedUser.getProfession());
            }
            if (updatedUser.getMembershipCardNumber() != null) {
                existingUser.setMembershipCardNumber(updatedUser.getMembershipCardNumber());
            }
            if (updatedUser.getAvailableBalance() != null) {
                existingUser.setAvailableBalance(updatedUser.getAvailableBalance());
            }

            int rowsUpdated = iUserRepository.updateUser(existingUser);
            if (rowsUpdated == 0) {
                throw new RuntimeException("Failed to update user with ID: " + updatedUser.getUserId());
            }
        } catch (Exception e) {
            throw new RuntimeException("Error updating user", e);
        }
    }

    @Override
    public void deleteUser(int userId) {
        try {
            int rowsDeleted = iUserRepository.deleteUser(userId);
            if (rowsDeleted == 0) {
                throw new RuntimeException("Failed to delete user with ID: " + userId);
            }
        } catch (Exception e) {
            throw new RuntimeException("Error deleting user", e);
        }
    }

    // Método para autenticación con Google
    @Override
    public User findOrRegisterGoogleUser(String googleId, String email, String firstName, String lastName) {
        try {
            // Buscar al usuario por su Google ID
            List<User> users = iUserRepository.getUserByGoogleId(googleId);
            if (!users.isEmpty()) {
                return users.get(0);
            }

            // Si el usuario no existe, registrarlo
            User newUser = new User();
            newUser.setGoogleId(googleId);
            newUser.setEmail(email);
            newUser.setFirstName(firstName);
            newUser.setLastName(lastName);
            newUser.setCityId(1); // Valor predeterminado, por ejemplo 1 (Unknown City)
            newUser.setCountryId(1); // Valor predeterminado, por ejemplo 1 (Unknown Country)
            newUser.setAvailableBalance(BigDecimal.ZERO);
            newUser.setMembershipCardNumber(generateMembershipCardNumber());

            iUserRepository.createUserWithGoogle(newUser);
            return newUser;
        } catch (Exception e) {
            throw new RuntimeException("Error registering Google user", e);
        }
    }

    // Nuevo método para registro tradicional
    @Override
    public void registerUser(User user) throws Exception {
        // Validaciones
        if (user.getFirstName() == null || user.getFirstName().trim().isEmpty()) {
            throw new IllegalArgumentException("El nombre es obligatorio");
        }
        if (user.getLastName() == null || user.getLastName().trim().isEmpty()) {
            throw new IllegalArgumentException("El apellido es obligatorio");
        }
        if (user.getEmail() == null || user.getEmail().trim().isEmpty()) {
            throw new IllegalArgumentException("El correo electrónico es obligatorio");
        }
        if (emailExists(user.getEmail())) {
            throw new IllegalArgumentException("El correo electrónico ya está registrado");
        }

        // Establecer valores predeterminados si es necesario
        user.setMembershipCardNumber(generateMembershipCardNumber());

        // Crear usuario
        iUserRepository.createUser(user);
    }


    @Override
    public boolean emailExists(String email) throws Exception {
        try {
            return iUserRepository.emailExists(email);
        } catch (Exception e) {
            throw new RuntimeException("Error checking if email exists", e);
        }
    }

    // Método para generar el número de tarjeta de membresía
    private String generateMembershipCardNumber() {
        String lastNumber = iUserRepository.getLastMembershipCardNumber();
        int numericPart = Integer.parseInt(lastNumber.replaceAll("\\D+", ""));
        int newNumber = numericPart + 1;
        String formattedNumber = String.format("MC%06d", newNumber); // Formatea el número con ceros a la izquierda
        return formattedNumber;
    }
}
