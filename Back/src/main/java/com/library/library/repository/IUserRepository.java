package com.library.library.repository;

import com.library.library.model.User;

import java.util.List;

public interface IUserRepository {
    List<User> getUser(int userId, String firstName, String lastName);
    int updateUser(User user);
    int deleteUser(int userId);
}
