package com.library.library.service;

import com.library.library.model.User;

import java.util.List;

public interface IUserService {
    List<User> getUser(int userId, String firstName, String lastName);
    void updateUser(User user);
    void deleteUser(int userId);
}
