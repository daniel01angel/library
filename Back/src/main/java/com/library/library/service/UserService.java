package com.library.library.service;

import com.library.library.model.User;
import com.library.library.repository.IUserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

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
            // Obtener el usuario existente
            User existingUser = iUserRepository.getUser(updatedUser.getUserId(), null, null).stream().findFirst().orElse(null);
            if (existingUser == null) {
                throw new RuntimeException("User not found with ID: " + updatedUser.getUserId());
            }

            // Actualizar solo los campos que no son nulos o tienen valor no predeterminado
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

            // Llamar al repositorio para actualizar el usuario
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
}
