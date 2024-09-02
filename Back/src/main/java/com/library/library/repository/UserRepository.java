package com.library.library.repository;

import com.library.library.model.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.BeanPropertyRowMapper;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public class UserRepository implements IUserRepository {

    @Autowired
    private JdbcTemplate jdbcTemplate;

    @Override
    public List<User> getUser(int userId, String firstName, String lastName) {
        String SQL = "SELECT * FROM Users WHERE 1=1";
        if (userId > 0) {
            SQL += " AND UserID = ?";
            return jdbcTemplate.query(SQL, new Object[]{userId}, BeanPropertyRowMapper.newInstance(User.class));
        } else if (firstName != null && !firstName.isEmpty()) {
            SQL += " AND FirstName LIKE ?";
            return jdbcTemplate.query(SQL, new Object[]{"%" + firstName + "%"}, BeanPropertyRowMapper.newInstance(User.class));
        } else if (lastName != null && !lastName.isEmpty()) {
            SQL += " AND LastName LIKE ?";
            return jdbcTemplate.query(SQL, new Object[]{"%" + lastName + "%"}, BeanPropertyRowMapper.newInstance(User.class));
        } else {
            return jdbcTemplate.query(SQL, BeanPropertyRowMapper.newInstance(User.class));
        }
    }

    @Override
    public int updateUser(User user) {
        String SQL = "UPDATE Users SET FirstName = ?, LastName = ?, CityID = ?, CountryID = ?, Age = ?, Gender = ?, Profession = ?, MembershipCardNumber = ?, AvailableBalance = ? WHERE UserID = ?";
        return jdbcTemplate.update(SQL, user.getFirstName(), user.getLastName(), user.getCityId(), user.getCountryId(), user.getAge(), user.getGender(), user.getProfession(), user.getMembershipCardNumber(), user.getAvailableBalance(), user.getUserId());
    }

    @Override
    public int deleteUser(int userId) {
        String SQL = "DELETE FROM Users WHERE UserID = ?";
        return jdbcTemplate.update(SQL, userId);
    }
}
