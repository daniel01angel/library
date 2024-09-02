package com.library.library.model;

import lombok.Data;
import java.math.BigDecimal;

@Data
public class User {
    int userId;
    String firstName;
    String lastName;
    int cityId;
    int countryId;
    int age;
    String gender;
    String profession;
    String membershipCardNumber;
    BigDecimal availableBalance;
}
