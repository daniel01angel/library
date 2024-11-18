package com.library.library.repository;

import com.library.library.model.User;

import java.util.List;

public interface IUserRepository {
    String getLastMembershipCardNumber();

    List<User> getUser(int userId, String firstName, String lastName);
    int updateUser(User user);
    int deleteUser(int userId);
    int createUserWithGoogle(User newUser);
    int createUser(User user); // Registro tradicional
    List<User> getUserByGoogleId(String googleId);

    boolean emailExists(String email) throws Exception;

}