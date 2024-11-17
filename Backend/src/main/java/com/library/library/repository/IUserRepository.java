package com.library.library.repository;

import com.library.library.model.User;

import java.util.List;

public interface IUserRepository {
    String getLastMembershipCardNumber();

    List<User> getUser(int userId, String firstName, String lastName);
    int updateUser(User user);
    int deleteUser(int userId);
    int createUser(User newUser);
    List<User> getUserByGoogleId(String googleId);
}