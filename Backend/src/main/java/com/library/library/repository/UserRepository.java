package com.library.library.repository;

import com.library.library.model.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.BeanPropertyRowMapper;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;

import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.List;

@Repository
public class UserRepository implements IUserRepository {

    @Autowired
    private JdbcTemplate jdbcTemplate;

    // Método para verificar si el email ya existe
    @Override
    public boolean emailExists(String email) throws Exception {
        String SQL = "SELECT COUNT(*) FROM Users WHERE email = ?";
        Integer count = jdbcTemplate.queryForObject(SQL, new Object[]{email}, Integer.class);
        return count != null && count > 0;
    }

    @Override
    public String getLastMembershipCardNumber() {
        String SQL = "SELECT TOP 1 MembershipCardNumber FROM Users ORDER BY CAST(SUBSTRING(MembershipCardNumber, 3, LEN(MembershipCardNumber) - 2) AS INT) DESC";
        try {
            return jdbcTemplate.queryForObject(SQL, String.class);
        } catch (Exception e) {
            return "MC000000"; // Número inicial si no existen registros
        }
    }


    @Override
    public List<User> getUser(int userId, String firstName, String lastName) {
        StringBuilder SQL = new StringBuilder("SELECT * FROM Users WHERE 1=1 ");
        List<Object> params = new ArrayList<>();

        if (userId > 0) {
            SQL.append("AND UserID = ? ");
            params.add(userId);
        }
        if (firstName != null && !firstName.isEmpty()) {
            SQL.append("AND FirstName LIKE ? ");
            params.add("%" + firstName + "%");
        }
        if (lastName != null && !lastName.isEmpty()) {
            SQL.append("AND LastName LIKE ? ");
            params.add("%" + lastName + "%");
        }

        return jdbcTemplate.query(SQL.toString(), params.toArray(), BeanPropertyRowMapper.newInstance(User.class));
    }

    @Override
    public int updateUser(User user) {
        String SQL = "UPDATE Users SET FirstName = ?, LastName = ?, CityID = ?, CountryID = ?, Age = ?, Gender = ?, Profession = ?, MembershipCardNumber = ?, AvailableBalance = ? WHERE UserID = ?";
        return jdbcTemplate.update(SQL,
                user.getFirstName(),
                user.getLastName(),
                user.getCityId(),
                user.getCountryId(),
                user.getAge(),
                user.getGender(),
                user.getProfession(),
                user.getMembershipCardNumber(),
                user.getAvailableBalance(),
                user.getUserId());
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
    public int createUserWithGoogle(User user) {
        String SQL = "INSERT INTO Users (googleId, email, firstName, lastName, cityId, countryId, age, gender, profession, membershipCardNumber, availableBalance) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)";
        return jdbcTemplate.update(SQL,
                user.getGoogleId(),
                user.getEmail(),
                user.getFirstName(),
                user.getLastName(),
                user.getCityId() != 0 ? user.getCityId() : 1,   // Valor predeterminado si es 0
                user.getCountryId() != 0 ? user.getCountryId() : 1, // Valor predeterminado si es 0
                user.getAge() != 0 ? user.getAge() : 0,         // Valor predeterminado si es 0
                user.getGender() != null ? user.getGender() : "",       // Valor predeterminado si es null
                user.getProfession() != null ? user.getProfession() : "", // Valor predeterminado si es null
                user.getMembershipCardNumber(),
                user.getAvailableBalance() != null ? user.getAvailableBalance() : BigDecimal.ZERO);
    }

    // Método para crear un usuario mediante registro tradicional
    @Override
    public int createUser(User user) {
        String SQL = "INSERT INTO Users (email, firstName, lastName, cityId, countryId, age, gender, profession, membershipCardNumber, availableBalance) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)";
        return jdbcTemplate.update(SQL,
                user.getEmail(),
                user.getFirstName(),
                user.getLastName(),
                user.getCityId() != 0 ? user.getCityId() : 1,
                user.getCountryId() != 0 ? user.getCountryId() : 1,
                user.getAge(),
                user.getGender(),
                user.getProfession(),
                user.getMembershipCardNumber(),
                user.getAvailableBalance() != null ? user.getAvailableBalance() : new BigDecimal("150000.00")
        );
    }

}
