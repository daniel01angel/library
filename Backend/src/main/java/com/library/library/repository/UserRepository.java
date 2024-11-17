package com.library.library.repository;

import com.library.library.model.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.BeanPropertyRowMapper;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;

import java.math.BigDecimal;
import java.util.List;

@Repository
public class UserRepository implements IUserRepository {

    @Autowired
    private JdbcTemplate jdbcTemplate;


    @Override
    public String getLastMembershipCardNumber() {
        String SQL = "SELECT TOP 1 MembershipCardNumber FROM Users ORDER BY MembershipCardNumber DESC";
        try {
            return jdbcTemplate.queryForObject(SQL, String.class);
        } catch (Exception e) {
            return "0"; // Si no hay registros, devuelve "0"
        }
    }

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

    @Override
    public List<User> getUserByGoogleId(String googleId) {
        String SQL = "SELECT * FROM Users WHERE googleId = ?";
        return jdbcTemplate.query(SQL, new Object[]{googleId}, BeanPropertyRowMapper.newInstance(User.class));
    }

    @Override
    public int createUser(User user) {
        String SQL = "INSERT INTO Users (googleId, email, firstName, lastName, cityId, countryId, age, gender, profession, membershipCardNumber, availableBalance) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)";
        return jdbcTemplate.update(SQL,
                user.getGoogleId(),
                user.getEmail(),
                user.getFirstName(),
                user.getLastName(),
                user.getCityId() != 0 ? user.getCityId() : 1,  // Utilizar un valor de CityID que sea válido, como 1 (Unknown City)
                user.getCountryId() != 0 ? user.getCountryId() : 1,  // Si no se proporciona, usar 0
                user.getAge() != 0 ? user.getAge() : 0,  // Si no se proporciona, usar 0
                user.getGender() != null ? user.getGender() : "",  // Valor predeterminado vacío si es null
                user.getProfession() != null ? user.getProfession() : "",  // Valor predeterminado vacío si es null
                user.getMembershipCardNumber() != null ? user.getMembershipCardNumber() : "MC4000",  // Valor predeterminado vacío si es null
                user.getAvailableBalance() != null ? user.getAvailableBalance() : BigDecimal.ZERO  // Valor predeterminado 0 si es null
        );
    }
}