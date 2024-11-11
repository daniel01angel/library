package com.library.library.model;

import lombok.Data;
import java.math.BigDecimal;
import java.time.LocalDateTime;

@Data
public class MembershipCardTransaction {
    Long transactionId;
    Long userId;
    LocalDateTime transactionDateTime;
    BigDecimal amount;
}
