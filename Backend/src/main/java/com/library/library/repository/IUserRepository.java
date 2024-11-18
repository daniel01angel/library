package com.library.library.repository;

import com.library.library.model.User;

import java.util.List;
import java.util.Optional;

public interface IUserRepository {
    String getLastMembershipCardNumber();

    List<User> getUser(int userId, String firstName, String lastName);
    int updateUser(User user);
    int deleteUser(int userId);
    int createUserWithGoogle(User newUser);
    int createUser(User user); // Registro tradicional
    List<User> getUserByGoogleId(String googleId);

    boolean emailExists(String email) throws Exception;
    Optional<User> findByEmail(String email);
}