package com.library.library.service;

import com.library.library.model.User;
import java.util.List;

public interface IUserService {
    List<User> getUser(int userId, String firstName, String lastName);
    void updateUser(User updatedUser);
    void deleteUser(int userId);
    User findOrRegisterGoogleUser(String googleId, String email, String firstName, String lastName);
    void registerUser(User user) throws Exception;
    boolean emailExists(String email) throws Exception;
}
